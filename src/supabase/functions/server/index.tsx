import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { cmsApi } from "./cms-api.tsx";
import * as seoEditor from "./seo-editor.tsx";
import * as fileSystem from "./file-system.tsx";
import * as seoSystem from "./seo-system.tsx";
import * as usersApi from "./users-api.tsx";
import * as settingsApi from "./settings-api.tsx";
import * as mediaApi from "./media-api.tsx";
import * as contentAnalyzer from "./content-analyzer.tsx";
import * as technicalSEO from "./technical-seo.tsx";
import * as siteAudit from "./site-audit.tsx";
import { forceHTTPSandWWW, securityHeaders } from "./redirect-middleware.tsx";
import rolesApi from "./roles-api.tsx";
import menusApi from "./menus-api.tsx";
import authApi from "./auth-api.tsx";
import errorLogsApi from "./error-logs-api.tsx";
import * as seedData from "./seed-data.tsx";
import * as autoInit from "./auto-init.tsx";
// NEW: File-editing SEO system
import seoApi from "./seo-api.tsx";
import sitemapGenerator from "./sitemap-generator.tsx";
// NEW: Optimized dashboard API
import dashboardApi from "./dashboard-api.tsx";
// NEW: Security & Performance Optimizations
import contactApi from "./contact-api.tsx";
import pushNotificationsApi from "./push-notifications-api.tsx";
import { apiLimiter, rateLimitMiddleware } from "./rate-limiter.tsx";

const port = parseInt(Deno.env.get("PORT") || "8000");
const isDevelopment = Deno.env.get("NODE_ENV") !== "production";

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("🚀 Inchtomilez Backend Server v3.0 (OPTIMIZED)");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log(`📡 Environment: ${isDevelopment ? "Development" : "Production"}`);
console.log(`🌐 Port: ${port}`);
console.log(`✅ Health Check: /make-server-9c8e64e4/health`);
console.log(`📊 Total APIs: 120+ endpoints`);
console.log(`🆕 Latest: Rate Limiting, Honeypot, Push Notifications`);
console.log(`🔒 Security: Headers + Rate Limits + Bot Protection`);
console.log(`⚡ Performance: Optimized queries + Smart caching`);
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("");
console.log("✅ Server started successfully!");
console.log(`🔗 Access at: http://localhost:${port}`);
console.log("");

const app = new Hono();

// ============================================================
// MIDDLEWARE
// ============================================================

// Force HTTPS and WWW
app.use('*', forceHTTPSandWWW);

// Security headers
app.use('*', securityHeaders);

// CORS - Open for all origins (NO RESTRICTIONS)
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length', 'X-Request-Id'],
  credentials: true,
  maxAge: 86400 // 24 hours
}));

// Enable logger
app.use('*', logger(console.log));

// ============================================================================
// SYSTEM INITIALIZATION (AUTO-RUN ON FIRST REQUEST)
// ============================================================================