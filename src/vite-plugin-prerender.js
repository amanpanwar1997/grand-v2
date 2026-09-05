/**
 * ============================================================================
 * INCHTOMILEZ - ADVANCED PRODUCTION PRERENDERER
 * ============================================================================
 *
 * Version: 6.0
 *
 * File:
 * src/vite-plugin-prerender.js
 *
 * PURPOSE
 * -------
 * Converts important/public React SPA routes into fully-rendered static HTML
 * after the normal Vite production build.
 *
 * Designed for:
 *
 * - React
 * - React Router
 * - Vite
 * - React Helmet Async
 * - Vercel
 * - Puppeteer 25+
 *
 * ============================================================================
 *
 * FEATURES
 * ============================================================================
 *
 * ✅ Handles nested React Router routes
 * ✅ Preserves the original SPA shell while rendering
 * ✅ Puppeteer 25 compatible
 * ✅ Does NOT use removed page.waitForTimeout()
 * ✅ Avoids fragile networkidle0
 * ✅ Waits for React root content
 * ✅ Waits for title / description / canonical
 * ✅ Detects blank React pages
 * ✅ Captures runtime errors
 * ✅ Captures browser console errors
 * ✅ Validates H1
 * ✅ Validates canonical
 * ✅ Validates robots metadata
 * ✅ Counts JSON-LD schemas
 * ✅ Supports hundreds of routes
 * ✅ Generates Vercel clean-URL HTML
 * ✅ Never prerenders admin/private routes
 * ✅ Browser/server cleanup even on failure
 * ✅ Can keep Vercel deployment alive if one page fails
 *
 * IMPORTANT
 * ---------
 *
 * This file is the PRERENDER ENGINE.
 *
 * Do NOT hardcode 300 URLs here.
 *
 * Pass all routes from:
 *
 * src/prerender-routes.ts
 *
 * ============================================================================
 */

import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { createServer } from "http";
import handler from "serve-handler";


// ============================================================================
// CONSTANTS
// ============================================================================

const DEFAULT_SITE_URL =
  "https://www.inchtomilez.com";


// ============================================================================
// DELAY
// ============================================================================

/**
 * Puppeteer removed page.waitForTimeout().
 *
 * Use a normal Promise instead.
 */
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}


// ============================================================================
// ROUTE NORMALIZATION
// ============================================================================

function normalizeRoute(route) {

  if (!route) {
    return "/";
  }

  let normalized =
    String(route).trim();


  // --------------------------------------------------------------------------
  // ABSOLUTE URL -> PATHNAME
  // --------------------------------------------------------------------------

  if (
    normalized.startsWith("http://") ||
    normalized.startsWith("https://")
  ) {

    try {

      const parsed =
        new URL(normalized);

      normalized =
        parsed.pathname;

    } catch {

      return "/";

    }

  }


  // --------------------------------------------------------------------------
  // REMOVE QUERY/HASH
  // --------------------------------------------------------------------------

  normalized =
    normalized.split("?")[0];

  normalized =
    normalized.split("#")[0];


  // --------------------------------------------------------------------------
  // LEADING SLASH
  // --------------------------------------------------------------------------

  if (
    !normalized.startsWith("/")
  ) {

    normalized =
      `/${normalized}`;

  }


  // --------------------------------------------------------------------------
  // DUPLICATE SLASHES
  // --------------------------------------------------------------------------

  normalized =
    normalized.replace(
      /\/{2,}/g,
      "/"
    );


  // --------------------------------------------------------------------------
  // SECURITY - PREVENT PATH TRAVERSAL
  // --------------------------------------------------------------------------

  if (
    normalized.includes("..")
  ) {

    throw new Error(
      `Unsafe prerender route: ${normalized}`
    );

  }


  // --------------------------------------------------------------------------
  // REMOVE TRAILING SLASH
  // --------------------------------------------------------------------------

  if (
    normalized.length > 1 &&
    normalized.endsWith("/")
  ) {

    normalized =
      normalized.slice(
        0,
        -1
      );

  }


  return normalized;
}


// ============================================================================
// PRIVATE / NON-SEO ROUTES
// ============================================================================

function shouldSkipRoute(route) {

  const blockedPrefixes = [

    "/admin",

    "/api",

    "/auth",

  ];


  if (
    blockedPrefixes.some(
      (prefix) =>
        route === prefix ||
        route.startsWith(
          `${prefix}/`
        )
    )
  ) {

    return true;

  }


  const blockedExactRoutes = [

    "/preview_page.html",

  ];


  if (
    blockedExactRoutes.includes(
      route
    )
  ) {

    return true;

  }


  return false;
}


// ============================================================================
// STATIC FILE DETECTION
// ============================================================================

function looksLikeStaticAsset(
  pathname
) {

  /**
   * Examples:
   *
   * /logo.png
   * /assets/main.js
   * /assets/main.css
   * /robots.txt
   * /sitemap.xml
   * /manifest.webmanifest
   */

  return Boolean(
    path.extname(pathname)
  );
}


// ============================================================================
// OUTPUT PATH
// ============================================================================

/**
 * Vercel cleanUrls: true
 *
 * build/about.html
 * ->
 * /about
 *
 * build/services/seo.html
 * ->
 * /services/seo
 */

function getOutputPath(
  distPath,
  route
) {

  if (
    route === "/"
  ) {

    return path.join(
      distPath,
      "index.html"
    );

  }


  const cleanRoute =
    route.replace(
      /^\/+|\/+$/g,
      ""
    );


  return path.join(
    distPath,
    `${cleanRoute}.html`
  );
}


// ============================================================================
// SAFE DIRECTORY CREATION
// ============================================================================

function ensureDirectory(
  filePath
) {

  const directory =
    path.dirname(
      filePath
    );


  fs.mkdirSync(
    directory,
    {
      recursive: true,
    }
  );
}


// ============================================================================
// MAIN PLUGIN
// ============================================================================

export function prerenderPlugin(
  options = {}
) {

  const {

    // ------------------------------------------------------------------------
    // ROUTES
    // ------------------------------------------------------------------------

    routes = [],


    // ------------------------------------------------------------------------
    // SMALL POST-RENDER DELAY
    // ------------------------------------------------------------------------

    waitTime = 300,


    // ------------------------------------------------------------------------
    // PAGE NAVIGATION TIMEOUT
    // ------------------------------------------------------------------------

    navigationTimeout = 45000,


    // ------------------------------------------------------------------------
    // REACT RENDER TIMEOUT
    // ------------------------------------------------------------------------

    renderTimeout = 20000,


    // ------------------------------------------------------------------------
    // BLANK PAGE DETECTION
    // ------------------------------------------------------------------------

    minimumTextLength = 40,


    // ------------------------------------------------------------------------
    // BUILD FAILURE POLICY
    //
    // KEEP FALSE INITIALLY.
    // ------------------------------------------------------------------------

    failOnError = false,


    // ------------------------------------------------------------------------
    // SEO VALIDATION
    // ------------------------------------------------------------------------

    validateSEO = true,


    // ------------------------------------------------------------------------
    // SITE
    // ------------------------------------------------------------------------

    siteUrl =
      DEFAULT_SITE_URL,


    // ------------------------------------------------------------------------
    // SERVER PORT
    //
    // 0 = automatically choose available port
    // ------------------------------------------------------------------------

    port = 0,


    // ------------------------------------------------------------------------
    // REDUCE BUILD BANDWIDTH
    //
    // HTML/JS/CSS/XHR remain available.
    // ------------------------------------------------------------------------

    blockHeavyAssets = true,

  } = options;


  let viteConfig =
    null;


  return {

    name:
      "inchtomilez-advanced-prerender",


    /**
     * Only participate in production builds.
     */
    apply:
      "build",


    // ========================================================================
    // RECEIVE VITE CONFIG
    // ========================================================================

    configResolved(
      resolvedConfig
    ) {

      viteConfig =
        resolvedConfig;

    },


    // ========================================================================
    // RUN AFTER VITE BUILD
    // ========================================================================

    async closeBundle() {

      if (
        !viteConfig ||
        viteConfig.command !==
          "build"
      ) {

        return;

      }


      if (
        !Array.isArray(routes) ||
        routes.length === 0
      ) {

        console.log(
          "ℹ️ No prerender routes configured."
        );

        return;

      }


      // ======================================================================
      // NORMALIZE ROUTES
      // ======================================================================

      let normalizedRoutes =
        routes
          .map(
            normalizeRoute
          )
          .filter(
            (route) =>
              !shouldSkipRoute(
                route
              )
          );


      /**
       * Remove duplicates.
       */
      normalizedRoutes =
        Array.from(
          new Set(
            normalizedRoutes
          )
        );


      /**
       * Render homepage LAST.
       *
       * build/index.html is our original SPA entry.
       *
       * Keeping "/" until last provides additional safety.
       */
      normalizedRoutes.sort(
        (a, b) => {

          if (a === "/") {
            return 1;
          }

          if (b === "/") {
            return -1;
          }

          return (
            a.localeCompare(b)
          );

        }
      );


      // ======================================================================
      // BUILD DIRECTORY
      // ======================================================================

      const distPath =
        path.resolve(
          viteConfig.root,
          viteConfig.build.outDir
        );


      const indexPath =
        path.join(
          distPath,
          "index.html"
        );


      if (
        !fs.existsSync(
          indexPath
        )
      ) {

        const message =
          `Vite build index not found: ${indexPath}`;


        if (
          failOnError
        ) {

          throw new Error(
            message
          );

        }


        console.error(
          `❌ ${message}`
        );

        return;

      }


      // ======================================================================
      // SAVE ORIGINAL SPA SHELL
      // ======================================================================

      const originalIndexHTML =
        fs.readFileSync(
          indexPath,
          "utf8"
        );


      // ======================================================================
      // LOG HEADER
      // ======================================================================

      console.log("");

      console.log(
        "=============================================================="
      );

      console.log(
        "🚀 INCHTOMILEZ ADVANCED SEO PRERENDER"
      );

      console.log(
        "=============================================================="
      );

      console.log(
        `Routes: ${normalizedRoutes.length}`
      );

      console.log(
        `Build directory: ${distPath}`
      );

      console.log(
        `Site: ${siteUrl}`
      );

      console.log(
        `Fail build on page error: ${failOnError}`
      );

      console.log(
        "=============================================================="
      );

      console.log("");


      // ======================================================================
      // SERVER / BROWSER REFERENCES
      // ======================================================================

      let server =
        null;

      let browser =
        null;


      const results =
        [];


      // ======================================================================
      // START TEMPORARY SPA SERVER
      // ======================================================================

      try {

        server =
          createServer(
            async (
              req,
              res
            ) => {

              try {

                const requestUrl =
                  new URL(
                    req.url || "/",
                    "http://127.0.0.1"
                  );


                const pathname =
                  decodeURIComponent(
                    requestUrl.pathname
                  );


                /**
                 * ------------------------------------------------------------
                 * REACT ROUTE
                 * ------------------------------------------------------------
                 *
                 * Any extensionless request gets the original Vite SPA shell.
                 *
                 * Examples:
                 *
                 * /
                 * /about
                 * /services
                 * /services/content-marketing/blog-writing
                 */
                if (
                  !looksLikeStaticAsset(
                    pathname
                  )
                ) {

                  res.writeHead(
                    200,
                    {
                      "Content-Type":
                        "text/html; charset=utf-8",

                      "Cache-Control":
                        "no-store",
                    }
                  );


                  res.end(
                    originalIndexHTML
                  );


                  return;

                }


                /**
                 * ------------------------------------------------------------
                 * STATIC FILE
                 * ------------------------------------------------------------
                 */
                await handler(
                  req,
                  res,
                  {
                    public:
                      distPath,

                    cleanUrls:
                      false,
                  }
                );


              } catch (
                serverError
              ) {

                console.error(
                  "❌ Prerender server error:",
                  serverError.message
                );


                if (
                  !res.headersSent
                ) {

                  res.writeHead(
                    500,
                    {
                      "Content-Type":
                        "text/plain",
                    }
                  );

                }


                res.end(
                  "Prerender server error"
                );

              }

            }
          );


        // ====================================================================
        // LISTEN
        // ====================================================================

        await new Promise(
          (
            resolve,
            reject
          ) => {

            server.once(
              "error",
              reject
            );


            server.listen(
              port,
              "127.0.0.1",
              () => {

                server.removeListener(
                  "error",
                  reject
                );

                resolve();

              }
            );

          }
        );


        const address =
          server.address();


        if (
          !address ||
          typeof address ===
            "string"
        ) {

          throw new Error(
            "Unable to determine prerender server port."
          );

        }


        const actualPort =
          address.port;


        const localOrigin =
          `http://127.0.0.1:${actualPort}`;


        console.log(
          `✅ Temporary React server: ${localOrigin}`
        );


        // ====================================================================
        // START CHROME
        // ====================================================================

        try {

          browser =
            await puppeteer.launch(
              {

                /**
                 * Puppeteer 25 uses modern Chrome headless mode by default.
                 */
                headless:
                  true,

                args: [

                  "--no-sandbox",

                  "--disable-setuid-sandbox",

                  "--disable-dev-shm-usage",

                  "--disable-gpu",

                  "--no-first-run",

                  "--no-zygote",

                ],

                timeout:
                  30000,

              }
            );


        } catch (
          browserError
        ) {

          console.error(
            ""
          );

          console.error(
            "❌ PUPPETEER COULD NOT START CHROME"
          );

          console.error(
            browserError.message
          );

          console.error(
            ""
          );


          if (
            failOnError
          ) {

            throw browserError;

          }


          /**
           * The normal Vite build remains usable.
           *
           * This keeps Vercel from taking production offline.
           */
          return;

        }


        console.log(
          "✅ Chrome launched"
        );

        console.log("");


        // ====================================================================
        // PROCESS ROUTES
        // ====================================================================

        for (
          let index = 0;
          index <
          normalizedRoutes.length;
          index++
        ) {

          const route =
            normalizedRoutes[
              index
            ];


          const page =
            await browser.newPage();


          const runtimeErrors =
            [];


          const consoleErrors =
            [];


          // ==================================================================
          // PAGE SETTINGS
          // ==================================================================

          await page.setViewport(
            {
              width:
                1440,

              height:
                1000,

              deviceScaleFactor:
                1,
            }
          );


          // ==================================================================
          // OPTIONAL ASSET BLOCKING
          // ==================================================================

          if (
            blockHeavyAssets
          ) {

            await page.setRequestInterception(
              true
            );


            page.on(
              "request",
              (request) => {

                const type =
                  request.resourceType();


                /**
                 * These are not required to generate SEO HTML.
                 */
                if (
                  type === "media" ||
                  type === "font"
                ) {

                  request.abort();

                  return;

                }


                request.continue();

              }
            );

          }


          // ==================================================================
          // CAPTURE RUNTIME ERRORS
          // ==================================================================

          page.on(
            "pageerror",
            (error) => {

              runtimeErrors.push(
                error.message ||
                String(error)
              );

            }
          );


          page.on(
            "console",
            (message) => {

              if (
                message.type() ===
                "error"
              ) {

                consoleErrors.push(
                  message.text()
                );

              }

            }
          );


          // ==================================================================
          // RENDER
          // ==================================================================

          try {

            console.log(
              `⏳ ${index + 1}/${normalizedRoutes.length} ${route}`
            );


            const localUrl =
              `${localOrigin}${route}`;


            // ================================================================
            // NAVIGATE
            // ================================================================

            const response =
              await page.goto(
                localUrl,
                {

                  /**
                   * IMPORTANT:
                   *
                   * Do NOT use networkidle0.
                   *
                   * API requests, Supabase, chat systems and analytics can
                   * keep network connections active.
                   */
                  waitUntil:
                    "domcontentloaded",

                  timeout:
                    navigationTimeout,

                }
              );


            if (
              response &&
              response.status() >=
                400
            ) {

              throw new Error(
                `HTTP ${response.status()}`
              );

            }


            // ================================================================
            // WAIT FOR ROOT
            // ================================================================

            await page.waitForSelector(
              "#root",
              {
                timeout:
                  renderTimeout,
              }
            );


            // ================================================================
            // WAIT FOR REACT CONTENT
            // ================================================================

            await page.waitForFunction(
              (minLength) => {

                const root =
                  document.querySelector(
                    "#root"
                  );


                if (!root) {
                  return false;
                }


                const text =
                  (
                    root.textContent ||
                    ""
                  ).trim();


                return (
                  text.length >=
                  minLength
                );

              },

              {
                timeout:
                  renderTimeout,
              },

              minimumTextLength
            );


            // ================================================================
            // WAIT FOR HELMET
            // ================================================================

            await page.waitForFunction(
              () => {

                const title =
                  document.title
                    ?.trim();


                const description =
                  document
                    .querySelector(
                      'meta[name="description"]'
                    )
                    ?.getAttribute(
                      "content"
                    )
                    ?.trim();


                const canonical =
                  document
                    .querySelector(
                      'link[rel="canonical"]'
                    )
                    ?.getAttribute(
                      "href"
                    )
                    ?.trim();


                return Boolean(
                  title &&
                  description &&
                  canonical
                );

              },

              {
                timeout:
                  renderTimeout,
              }
            );


            // ================================================================
            // STABILIZATION
            // ================================================================

            if (
              waitTime > 0
            ) {

              await delay(
                waitTime
              );

            }


            // ================================================================
            // EXTRACT SEO INFORMATION
            // ================================================================

            const seo =
              await page.evaluate(
                () => {

                  const getMeta =
                    (
                      selector
                    ) =>
                      document
                        .querySelector(
                          selector
                        )
                        ?.getAttribute(
                          "content"
                        )
                        ?.trim() ||
                      "";


                  const title =
                    document.title
                      .trim();


                  const description =
                    getMeta(
                      'meta[name="description"]'
                    );


                  const robots =
                    getMeta(
                      'meta[name="robots"]'
                    );


                  const canonical =
                    document
                      .querySelector(
                        'link[rel="canonical"]'
                      )
                      ?.getAttribute(
                        "href"
                      )
                      ?.trim() ||
                    "";


                  const h1 =
                    document
                      .querySelector(
                        "h1"
                      )
                      ?.textContent
                      ?.trim() ||
                    "";


                  const root =
                    document.querySelector(
                      "#root"
                    );


                  const visibleText =
                    (
                      root?.textContent ||
                      ""
                    ).trim();


                  const schemaCount =
                    document
                      .querySelectorAll(
                        'script[type="application/ld+json"]'
                      )
                      .length;


                  return {

                    title,

                    description,

                    canonical,

                    robots,

                    h1,

                    textLength:
                      visibleText.length,

                    schemaCount,

                  };

                }
              );


            // ================================================================
            // BLANK PAGE CHECK
            // ================================================================

            if (
              seo.textLength <
              minimumTextLength
            ) {

              throw new Error(
                `React page appears blank: only ${seo.textLength} characters rendered.`
              );

            }


            // ================================================================
            // SEO WARNINGS
            // ================================================================

            const seoWarnings =
              [];


            if (
              validateSEO
            ) {

              if (
                !seo.title
              ) {

                seoWarnings.push(
                  "Missing <title>"
                );

              }


              if (
                !seo.description
              ) {

                seoWarnings.push(
                  "Missing meta description"
                );

              }


              if (
                !seo.canonical
              ) {

                seoWarnings.push(
                  "Missing canonical"
                );

              }


              if (
                !seo.h1
              ) {

                seoWarnings.push(
                  "Missing H1"
                );

              }


              if (
                seo.canonical &&
                !seo.canonical.startsWith(
                  siteUrl
                )
              ) {

                seoWarnings.push(
                  `Unexpected canonical: ${seo.canonical}`
                );

              }


              if (
                seo.robots
                  .toLowerCase()
                  .includes(
                    "noindex"
                  )
              ) {

                seoWarnings.push(
                  "Page contains noindex"
                );

              }

            }


            // ================================================================
            // HTML
            // ================================================================

            const html =
              await page.content();


            if (
              !html ||
              html.length < 500
            ) {

              throw new Error(
                "Generated HTML is unexpectedly small."
              );

            }


            // ================================================================
            // WRITE STATIC HTML
            // ================================================================

            const outputPath =
              getOutputPath(
                distPath,
                route
              );


            ensureDirectory(
              outputPath
            );


            fs.writeFileSync(
              outputPath,
              html,
              "utf8"
            );


            // ================================================================
            // SUCCESS
            // ================================================================

            results.push(
              {

                route,

                status:
                  "success",

                outputPath,

                seo,

                seoWarnings,

                runtimeErrors,

                consoleErrors,

              }
            );


            console.log(
              `✅ ${route}`
            );


            console.log(
              `   Title: ${seo.title}`
            );


            console.log(
              `   H1: ${
                seo.h1 ||
                "MISSING"
              }`
            );


            console.log(
              `   Canonical: ${
                seo.canonical ||
                "MISSING"
              }`
            );


            console.log(
              `   Text: ${seo.textLength} chars`
            );


            console.log(
              `   JSON-LD: ${seo.schemaCount}`
            );


            if (
              seoWarnings.length
            ) {

              seoWarnings.forEach(
                (warning) => {

                  console.warn(
                    `   ⚠️ SEO: ${warning}`
                  );

                }
              );

            }


            if (
              runtimeErrors.length
            ) {

              runtimeErrors.forEach(
                (error) => {

                  console.warn(
                    `   ⚠️ Runtime: ${error}`
                  );

                }
              );

            }


            console.log("");


          } catch (
            error
          ) {

            // ================================================================
            // FAILED ROUTE
            // ================================================================

            results.push(
              {

                route,

                status:
                  "failed",

                error:
                  error.message,

                runtimeErrors,

                consoleErrors,

              }
            );


            console.error(
              `❌ ${route}`
            );


            console.error(
              `   ${error.message}`
            );


            runtimeErrors.forEach(
              (runtimeError) => {

                console.error(
                  `   React: ${runtimeError}`
                );

              }
            );


            console.log("");


          } finally {

            try {

              await page.close();

            } catch {

              // No action required.

            }

          }

        }


      } catch (
        fatalError
      ) {

        console.error(
          "❌ Fatal prerender error:"
        );

        console.error(
          fatalError
        );


        if (
          failOnError
        ) {

          throw fatalError;

        }


      } finally {

        // ====================================================================
        // CLOSE BROWSER
        // ====================================================================

        if (
          browser
        ) {

          try {

            await browser.close();

          } catch (
            error
          ) {

            console.warn(
              `⚠️ Browser cleanup: ${error.message}`
            );

          }

        }


        // ====================================================================
        // CLOSE SERVER
        // ====================================================================

        if (
          server
        ) {

          await new Promise(
            (resolve) => {

              try {

                server.close(
                  () => {
                    resolve();
                  }
                );

              } catch {

                resolve();

              }

            }
          );

        }

      }


      // ======================================================================
      // FINAL REPORT
      // ======================================================================

      const successes =
        results.filter(
          (result) =>
            result.status ===
            "success"
        );


      const failures =
        results.filter(
          (result) =>
            result.status ===
            "failed"
        );


      const warningPages =
        successes.filter(
          (result) =>
            result.seoWarnings
              ?.length > 0
        );


      const runtimeProblemPages =
        successes.filter(
          (result) =>
            result.runtimeErrors
              ?.length > 0
        );


      console.log("");

      console.log(
        "=============================================================="
      );

      console.log(
        "📊 INCHTOMILEZ PRERENDER REPORT"
      );

      console.log(
        "=============================================================="
      );


      console.log(
        `Total routes:      ${normalizedRoutes.length}`
      );


      console.log(
        `✅ Successful:     ${successes.length}`
      );


      console.log(
        `❌ Failed:         ${failures.length}`
      );


      console.log(
        `⚠️ SEO warnings:  ${warningPages.length}`
      );


      console.log(
        `⚠️ Runtime issues: ${runtimeProblemPages.length}`
      );


      // ======================================================================
      // FAILED ROUTE LIST
      // ======================================================================

      if (
        failures.length > 0
      ) {

        console.log("");

        console.log(
          "FAILED ROUTES"
        );


        failures.forEach(
          (failure) => {

            console.log(
              `❌ ${failure.route}`
            );

            console.log(
              `   ${failure.error}`
            );

          }
        );

      }


      console.log(
        "=============================================================="
      );

      console.log("");


      // ======================================================================
      // STRICT MODE
      // ======================================================================

      if (
        failOnError &&
        failures.length > 0
      ) {

        throw new Error(
          `Prerender failed for ${failures.length} route(s).`
        );

      }

    },

  };

}
