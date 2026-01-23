/**
 * VITE PLUGIN - STATIC HTML PRERENDERER WITH META TAGS
 * 
 * This plugin:
 * 1. Runs after Vite build completes
 * 2. Starts a local server
 * 3. Uses Puppeteer to render each route
 * 4. Waits for React + Helmet to fully load
 * 5. Captures complete HTML with meta tags
 * 6. Saves to /dist
 * 
 * Result: Perfect static HTML files with ALL meta tags for Google
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { createServer } from 'http';
import handler from 'serve-handler';

export function prerenderPlugin(options = {}) {
  const {
    routes = [],
    waitTime = 2000,
    port = 5556
  } = options;

  let config;

  return {
    name: 'vite-plugin-prerender',
    
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },

    async closeBundle() {
      if (config.command !== 'build' || !routes.length) {
        return;
      }

      const distPath = path.resolve(config.root, config.build.outDir);

      console.log('');
      console.log('🎯 PRERENDERING WITH META TAGS...');
      console.log(`   Routes: ${routes.length}`);
      console.log(`   Wait time: ${waitTime}ms`);
      console.log('');

      // Start local server
      const server = createServer((req, res) => {
        return handler(req, res, { public: distPath });
      });

      await new Promise((resolve) => server.listen(port, resolve));
      console.log(`✅ Server started on http://localhost:${port}`);

      // Launch browser
      const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      console.log('✅ Browser launched');
      console.log('');

      let successCount = 0;
      let withMetaCount = 0;

      // Prerender each route
      for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        const page = await browser.newPage();

        try {
          const url = `http://localhost:${port}${route}`;
          await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
          await page.waitForTimeout(waitTime);

          const html = await page.content();

          // Save HTML
          const outputPath = route === '/'
            ? path.join(distPath, 'index.html')
            : path.join(distPath, route.slice(1), 'index.html');

          const outputDir = path.dirname(outputPath);
          if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
          }

          fs.writeFileSync(outputPath, html, 'utf-8');

          // Check meta tags
          const hasMeta = html.includes('<meta name="description"');
          if (hasMeta) withMetaCount++;

          successCount++;

          if ((i + 1) % 25 === 0) {
            console.log(`   Progress: ${i + 1}/${routes.length}`);
          }
        } catch (error) {
          console.error(`❌ Failed: ${route} - ${error.message}`);
        } finally {
          await page.close();
        }
      }

      // Cleanup
      await browser.close();
      server.close();

      console.log('');
      console.log(`✅ Prerendering complete!`);
      console.log(`   Success: ${successCount}/${routes.length}`);
      console.log(`   With meta tags: ${withMetaCount}/${routes.length}`);
      console.log('');
    }
  };
}
