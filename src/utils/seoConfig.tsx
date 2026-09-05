/**
 * ============================================================================
 * LEGACY SEO COMPATIBILITY BRIDGE
 * ============================================================================
 *
 * Version: 5.0
 *
 * IMPORTANT:
 * seo-master.tsx is the SINGLE SOURCE OF TRUTH for frontend SEO.
 *
 * This file exists only because some older/admin components still import:
 *
 *   SEO_CONFIG
 *   getSEOConfig()
 *   updateSEOConfig()
 *   getAllSEOConfigs()
 *
 * DO NOT create a second SEO database here.
 *
 * ============================================================================
 */

import {
  SEO_DATABASE,
  SITE_CONFIG,
} from "./seo-master";

import {
  projectId,
  publicAnonKey,
} from "./supabase/info";


// ============================================================================
// RE-EXPORT MASTER SEO FUNCTIONS / CONSTANTS
// ============================================================================

export {
  useSEO,
  SITE_CONFIG,
  SEO_DATABASE,
  generateBreadcrumbs,
  SITELINKS_SEARCH_BOX,
  ORGANIZATION_SCHEMA,
  LOCAL_BUSINESS_SCHEMA,
  generateArticleSchema,
  generateServiceSchema,
} from "./seo-master";


// ============================================================================
// LEGACY SEO_CONFIG ALIAS
// ============================================================================

/**
 * Older admin components still use:
 *
 * SEO_CONFIG[path]
 *
 * Keep the alias so those components continue working without modification.
 */
export const SEO_CONFIG =
  SEO_DATABASE;


// ============================================================================
// PATH NORMALIZATION
// ============================================================================

/**
 * Converts different URL/path variations into one predictable pathname.
 *
 * Examples:
 *
 * "/about/"       -> "/about"
 * "/about?q=test" -> "/about"
 * "about"         -> "/about"
 * "/"             -> "/"
 *
 * This prevents valid pages accidentally receiving homepage SEO merely
 * because a trailing slash or query string was supplied.
 */
function normalizeSEOPath(
  inputPath: string
): string {

  if (!inputPath) {
    return "/";
  }

  let path =
    inputPath.trim();


  // --------------------------------------------------------------------------
  // HANDLE ABSOLUTE URL
  // --------------------------------------------------------------------------

  try {

    if (
      path.startsWith("http://") ||
      path.startsWith("https://")
    ) {
      const parsed =
        new URL(path);

      path =
        parsed.pathname;
    }

  } catch {

    // Invalid absolute URL.
    // Continue safely using the original value.

  }


  // --------------------------------------------------------------------------
  // REMOVE QUERY STRING
  // --------------------------------------------------------------------------

  const queryIndex =
    path.indexOf("?");

  if (
    queryIndex !== -1
  ) {
    path =
      path.substring(
        0,
        queryIndex
      );
  }


  // --------------------------------------------------------------------------
  // REMOVE HASH
  // --------------------------------------------------------------------------

  const hashIndex =
    path.indexOf("#");

  if (
    hashIndex !== -1
  ) {
    path =
      path.substring(
        0,
        hashIndex
      );
  }


  // --------------------------------------------------------------------------
  // ENSURE LEADING SLASH
  // --------------------------------------------------------------------------

  if (
    !path.startsWith("/")
  ) {
    path =
      `/${path}`;
  }


  // --------------------------------------------------------------------------
  // REMOVE DUPLICATE SLASHES
  // --------------------------------------------------------------------------

  path =
    path.replace(
      /\/{2,}/g,
      "/"
    );


  // --------------------------------------------------------------------------
  // REMOVE TRAILING SLASH
  // EXCEPT HOMEPAGE
  // --------------------------------------------------------------------------

  if (
    path.length > 1 &&
    path.endsWith("/")
  ) {
    path =
      path.slice(
        0,
        -1
      );
  }


  return path || "/";
}


// ============================================================================
// GET SEO CONFIG
// ============================================================================

/**
 * Backward-compatible SEO lookup.
 *
 * seo-master / SEO_DATABASE remains authoritative.
 */
export function getSEOConfig(
  path: string
) {

  const normalizedPath =
    normalizeSEOPath(
      path
    );


  const pageSEO =
    SEO_DATABASE[
      normalizedPath
    ];


  if (pageSEO) {
    return pageSEO;
  }


  /**
   * We retain homepage fallback for compatibility with the existing
   * application architecture.
   *
   * Later, once all routes are audited, we can replace this with
   * route-specific fallback/noindex behavior.
   */
  return SEO_DATABASE["/"];
}


// ============================================================================
// UPDATE SEO CONFIG
// ============================================================================

/**
 * Backward-compatible API helper used by older admin components.
 *
 * IMPORTANT:
 *
 * We use the same Supabase project configuration already used throughout
 * the application instead of process.env, which is unsafe in browser-side
 * Vite code.
 */
export async function updateSEOConfig(
  path: string,
  config: any
) {

  const normalizedPath =
    normalizeSEOPath(
      path
    );


  const endpoint =
    `https://${projectId}.supabase.co/functions/v1/` +
    `make-server-9c8e64e4/seo-system/page/update`;


  const payload = {
    slug: normalizedPath,
    ...config,
  };


  const response =
    await fetch(
      endpoint,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${publicAnonKey}`,
        },

        body:
          JSON.stringify(
            payload
          ),
      }
    );


  // --------------------------------------------------------------------------
  // PARSE RESPONSE SAFELY
  // --------------------------------------------------------------------------

  let result: any =
    null;


  try {

    result =
      await response.json();

  } catch {

    result =
      null;

  }


  // --------------------------------------------------------------------------
  // API ERROR
  // --------------------------------------------------------------------------

  if (
    !response.ok
  ) {

    const message =
      result?.error ||
      result?.message ||
      `SEO update failed with HTTP ${response.status}`;


    throw new Error(
      message
    );
  }


  // --------------------------------------------------------------------------
  // BACKEND LOGICAL ERROR
  // --------------------------------------------------------------------------

  if (
    result &&
    result.success === false
  ) {

    throw new Error(
      result.error ||
      result.message ||
      "Failed to update SEO configuration"
    );
  }


  return result;
}


// ============================================================================
// GET ALL SEO CONFIGS
// ============================================================================

/**
 * Used by legacy CMS/admin interfaces.
 */
export function getAllSEOConfigs() {

  return Object.entries(
    SEO_DATABASE
  ).map(
    ([path, config]) => ({
      path,
      ...config,
    })
  );
}


// ============================================================================
// HELPER: CHECK WHETHER ROUTE HAS EXPLICIT SEO
// ============================================================================

/**
 * Useful for admin/debugging tools.
 *
 * This prevents developers from confusing the homepage fallback with
 * genuinely configured metadata.
 */
export function hasSEOConfig(
  path: string
): boolean {

  const normalizedPath =
    normalizeSEOPath(
      path
    );

  return Boolean(
    SEO_DATABASE[
      normalizedPath
    ]
  );
}


// ============================================================================
// HELPER: GET ALL CONFIGURED SEO ROUTES
// ============================================================================

export function getSEORoutes():
  string[] {

  return Object.keys(
    SEO_DATABASE
  );
}


// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export {
  SITE_CONFIG as default,
};
