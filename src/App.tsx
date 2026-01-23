import { useState, lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Bot } from 'lucide-react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { AnimatedCursor } from './components/AnimatedCursor';
import { PageTransition } from './components/ui/PageTransition';
import { PWAInstallPrompt, IOSInstallInstructions } from './components/ui/PWAInstallPrompt';
import { LenisScroll } from './components/ui/LenisScroll';
import { CursorSpotlight } from './components/ui/CursorSpotlight';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { CodeProtection } from './components/ui/CodeProtection';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { RouteAnnouncer } from './components/ui/RouteAnnouncer';
import { WhatsAppButton } from './components/ui/WhatsAppButton';
import { initRoutePreloader, preloadAllRoutes } from './utils/routePreloader';
import { registerServiceWorker } from './utils/pwaInstaller';
import { AdminAuthProvider, AdminProtectedRoute } from './utils/adminAuth';

// Lazy load all pages for better performance
const HomePage = lazy(() => import('./components/pages/HomePage').then(module => ({ default: module.HomePage })));
const AboutPage = lazy(() => import('./components/pages/AboutPage').then(module => ({ default: module.AboutPage })));
const ServicesPage = lazy(() => import('./components/pages/ServicesPage').then(module => ({ default: module.ServicesPage })));
const ServiceDetailPage = lazy(() => import('./components/pages/ServiceDetailPage').then(module => ({ default: module.ServiceDetailPage })));
const IndustriesPage = lazy(() => import('./components/pages/IndustriesPage').then(module => ({ default: module.IndustriesPage })));
const IndustryDetailPage = lazy(() => import('./components/pages/IndustryDetailPage').then(module => ({ default: module.IndustryDetailPage })));
const BlogsPage = lazy(() => import('./components/pages/BlogsPage').then(module => ({ default: module.BlogsPage })));
const BlogCategoryPage = lazy(() => import('./components/pages/BlogCategoryPage').then(module => ({ default: module.BlogCategoryPage })));
const BlogDetailPage = lazy(() => import('./components/pages/BlogDetailPage').then(module => ({ default: module.BlogDetailPage })));
const FAQsPage = lazy(() => import('./components/pages/FAQsPage').then(module => ({ default: module.FAQsPage })));
const ContactPage = lazy(() => import('./components/pages/ContactPage').then(module => ({ default: module.ContactPage })));
const NotFoundPage = lazy(() => import('./components/pages/NotFoundPage').then(module => ({ default: module.NotFoundPage })));
const AIChatbot = lazy(() => import('./components/AIChatbot').then(module => ({ default: module.AIChatbot })));

// Legal Pages (Already exist)
const PrivacyPolicyPage = lazy(() => import('./components/pages/PrivacyPolicyPage').then(module => ({ default: module.PrivacyPolicyPage })));
const TermsOfServicePage = lazy(() => import('./components/pages/TermsOfServicePage').then(module => ({ default: module.TermsOfServicePage })));
const CookiePolicyPage = lazy(() => import('./components/pages/CookiePolicyPage').then(module => ({ default: module.CookiePolicyPage })));
const DisclaimerPage = lazy(() => import('./components/pages/DisclaimerPage').then(module => ({ default: module.DisclaimerPage })));
const RefundPolicyPage = lazy(() => import('./components/pages/RefundPolicyPage').then(module => ({ default: module.RefundPolicyPage })));

// Company Pages
const CareersPage = lazy(() => import('./components/pages/CareersPage').then(module => ({ default: module.CareersPage })));
const TeamPage = lazy(() => import('./components/pages/TeamPage').then(module => ({ default: module.TeamPage })));
const TestimonialsPage = lazy(() => import('./components/pages/TestimonialsPage').then(module => ({ default: module.TestimonialsPage })));
const CaseStudiesPage = lazy(() => import('./components/pages/CaseStudiesPage').then(module => ({ default: module.CaseStudiesPage })));
const PortfolioPage = lazy(() => import('./components/pages/PortfolioPage').then(module => ({ default: module.PortfolioPage })));
const PressPage = lazy(() => import('./components/pages/PressPage').then(module => ({ default: module.PressPage })));
const PartnersPage = lazy(() => import('./components/pages/PartnersPage').then(module => ({ default: module.PartnersPage })));
const AwardsPage = lazy(() => import('./components/pages/AwardsPage').then(module => ({ default: module.AwardsPage })));

// Resource Pages
const ResourcesPage = lazy(() => import('./components/pages/ResourcesPage').then(module => ({ default: module.ResourcesPage })));
const DownloadsPage = lazy(() => import('./components/pages/DownloadsPage').then(module => ({ default: module.DownloadsPage })));
const EbooksPage = lazy(() => import('./components/pages/EbooksPage').then(module => ({ default: module.EbooksPage })));
const WebinarsPage = lazy(() => import('./components/pages/WebinarsPage').then(module => ({ default: module.WebinarsPage })));
const ToolsPage = lazy(() => import('./components/pages/ToolsPage').then(module => ({ default: module.ToolsPage })));
const GlossaryPage = lazy(() => import('./components/pages/GlossaryPage').then(module => ({ default: module.GlossaryPage })));
const SitemapHTMLPage = lazy(() => import('./components/pages/SitemapHTMLPage').then(module => ({ default: module.SitemapHTMLPage })));

// Service Sub-Pages
const LocalSEOPage = lazy(() => import('./components/pages/LocalSEOPage').then(module => ({ default: module.LocalSEOPage })));
const TechnicalSEOPage = lazy(() => import('./components/pages/TechnicalSEOPage').then(module => ({ default: module.TechnicalSEOPage })));
const GoogleShoppingAdsPage = lazy(() => import('./components/pages/GoogleShoppingAdsPage').then(module => ({ default: module.GoogleShoppingAdsPage })));
const DisplayAdsPage = lazy(() => import('./components/pages/DisplayAdsPage').then(module => ({ default: module.DisplayAdsPage })));
const InstagramMarketingPage = lazy(() => import('./components/pages/InstagramMarketingPage').then(module => ({ default: module.InstagramMarketingPage })));
const FacebookMarketingPage = lazy(() => import('./components/pages/FacebookMarketingPage').then(module => ({ default: module.FacebookMarketingPage })));
const InfluencerMarketingPage = lazy(() => import('./components/pages/InfluencerMarketingPage').then(module => ({ default: module.InfluencerMarketingPage })));
const CopywritingPage = lazy(() => import('./components/pages/CopywritingPage').then(module => ({ default: module.CopywritingPage })));
const BlogWritingPage = lazy(() => import('./components/pages/BlogWritingPage').then(module => ({ default: module.BlogWritingPage })));
const EcommerceDevelopmentPage = lazy(() => import('./components/pages/EcommerceDevelopmentPage').then(module => ({ default: module.EcommerceDevelopmentPage })));
const WordPressDevelopmentPage = lazy(() => import('./components/pages/WordPressDevelopmentPage').then(module => ({ default: module.WordPressDevelopmentPage })));

// Admin Pages
const AdminLoginPage = lazy(() => import('./components/admin/AdminLoginPage').then(module => ({ default: module.AdminLoginPage })));
const AdminForgotPasswordPage = lazy(() => import('./components/admin/AdminForgotPasswordPage').then(module => ({ default: module.AdminForgotPasswordPage })));
const AdminDashboardPage = lazy(() => import('./components/admin/AdminDashboardPage').then(module => ({ default: module.AdminDashboardPage })));
const AdminCMSPage = lazy(() => import('./components/admin/AdminCMSPage').then(module => ({ default: module.AdminCMSPage })));
const AdminPagesListPage = lazy(() => import('./components/admin/AdminPagesListPageV3').then(module => ({ default: module.AdminPagesListPageV3 })));
const AdminPageEditorPageV2 = lazy(() => import('./components/admin/AdminPageEditorPageV2').then(module => ({ default: module.AdminPageEditorPageV2 })));
const AdminMediaLibraryPage = lazy(() => import('./components/admin/AdminMediaLibraryPage').then(module => ({ default: module.AdminMediaLibraryPage })));
const AdminLeadsPage = lazy(() => import('./components/admin/AdminLeadsPage').then(module => ({ default: module.AdminLeadsPage })));
const AdminUsersPage = lazy(() => import('./components/admin/AdminUsersPage').then(module => ({ default: module.AdminUsersPage })));
const AdminSEOPage = lazy(() => import('./components/admin/AdminSEOPageV3').then(module => ({ default: module.AdminSEOPageV3 }))); // ✅ FIXED: Changed from V2 to V3
const AdminSettingsPage = lazy(() => import('./components/admin/AdminSettingsPage').then(module => ({ default: module.AdminSettingsPage })));
const AdminCodeEditorPage = lazy(() => import('./components/admin/AdminCodeEditorPage').then(module => ({ default: module.AdminCodeEditorPage })));
const AdminDebugPage = lazy(() => import('./components/admin/AdminDebugPage').then(module => ({ default: module.AdminDebugPage })));

// Loading component - Fast, minimal skeleton
function PageLoader() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div 
          className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full"
          style={{
            animation: 'spin 0.6s linear infinite',
            willChange: 'transform'
          }}
        />
        <p className="text-white/60 text-sm">Loading...</p>
      </div>
    </div>
  );
}

// Add spin keyframes if not in CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

// Main routes wrapper with transition
function AppRoutes() {
  const location = useLocation();

  return (
    <PageTransition key={location.pathname}>
      <Routes location={location}>
        {/* Main Pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/preview_page.html" element={<Navigate to="/" replace />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        
        {/* ⚠️ IMPORTANT: Service Sub-Pages MUST come BEFORE /services/:slug */}
        {/* SEO Sub-Services */}
        <Route path="/services/search-engine-optimization-seo/local-seo" element={<LocalSEOPage />} />
        <Route path="/services/search-engine-optimization-seo/technical-seo" element={<TechnicalSEOPage />} />
        
        {/* PPC Sub-Services */}
        <Route path="/services/ppc-google-ads/google-shopping" element={<GoogleShoppingAdsPage />} />
        <Route path="/services/ppc-google-ads/display-ads" element={<DisplayAdsPage />} />
        
        {/* Social Media Sub-Services */}
        <Route path="/services/social-media-marketing/instagram" element={<InstagramMarketingPage />} />
        <Route path="/services/social-media-marketing/facebook" element={<FacebookMarketingPage />} />
        <Route path="/services/social-media-marketing/influencer-marketing" element={<InfluencerMarketingPage />} />
        
        {/* Content Sub-Services */}
        <Route path="/services/content-marketing/copywriting" element={<CopywritingPage />} />
        <Route path="/services/content-marketing/blog-writing" element={<BlogWritingPage />} />
        
        {/* Web Development Sub-Services */}
        <Route path="/services/web-design-development/ecommerce" element={<EcommerceDevelopmentPage />} />
        <Route path="/services/web-design-development/wordpress" element={<WordPressDevelopmentPage />} />
        
        {/* Main Service Detail Page - MUST be AFTER all sub-services */}
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/industries/:slug" element={<IndustryDetailPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:category" element={<BlogCategoryPage />} />
        <Route path="/blogs/:category/:slug" element={<BlogDetailPage />} />
        <Route path="/faqs" element={<FAQsPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Legal Pages */}
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/cookie-policy" element={<CookiePolicyPage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
        <Route path="/refund-policy" element={<RefundPolicyPage />} />

        {/* Company Pages */}
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/press" element={<PressPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/awards" element={<AwardsPage />} />

        {/* Resource Pages */}
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/downloads" element={<DownloadsPage />} />
        <Route path="/ebooks" element={<EbooksPage />} />
        <Route path="/webinars" element={<WebinarsPage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/glossary" element={<GlossaryPage />} />
        <Route path="/sitemap-page" element={<SitemapHTMLPage />} />

        {/* Admin Panel Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/forgot-password" element={<AdminForgotPasswordPage />} />
        <Route path="/admin" element={<AdminProtectedRoute><AdminDashboardPage /></AdminProtectedRoute>} />
        <Route path="/admin/cms" element={<AdminProtectedRoute requiredRole="viewer"><AdminCMSPage /></AdminProtectedRoute>} />
        <Route path="/admin/pages" element={<AdminProtectedRoute requiredRole="viewer"><AdminPagesListPage /></AdminProtectedRoute>} />
        <Route path="/admin/pages/new" element={<AdminProtectedRoute requiredRole="editor"><AdminPageEditorPageV2 /></AdminProtectedRoute>} />
        <Route path="/admin/pages/edit/:id" element={<AdminProtectedRoute requiredRole="editor"><AdminPageEditorPageV2 /></AdminProtectedRoute>} />
        <Route path="/admin/media" element={<AdminProtectedRoute requiredRole="viewer"><AdminMediaLibraryPage /></AdminProtectedRoute>} />
        <Route path="/admin/leads" element={<AdminProtectedRoute requiredRole="viewer"><AdminLeadsPage /></AdminProtectedRoute>} />
        <Route path="/admin/users" element={<AdminProtectedRoute requiredRole="admin"><AdminUsersPage /></AdminProtectedRoute>} />
        <Route path="/admin/seo" element={<AdminProtectedRoute requiredRole="editor"><AdminSEOPage /></AdminProtectedRoute>} />
        <Route path="/admin/settings" element={<AdminProtectedRoute requiredRole="admin"><AdminSettingsPage /></AdminProtectedRoute>} />
        <Route path="/admin/code-editor" element={<AdminProtectedRoute requiredRole="admin"><AdminCodeEditorPage /></AdminProtectedRoute>} />
        <Route path="/admin/debug" element={<AdminProtectedRoute requiredRole="admin"><AdminDebugPage /></AdminProtectedRoute>} />

        {/* 404 - Must be last */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </PageTransition>
  );
}

export default function App() {
  const [chatbotOpen, setChatbotOpen] = useState(false);

  // ⚡ PERFORMANCE: Initialize route preloader
  useEffect(() => {
    // Start preloading routes on link hover
    const cleanup = initRoutePreloader();

    // Preload all routes after initial page load
    preloadAllRoutes();

    return cleanup;
  }, []);

  // 📱 PWA: Register service worker
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      registerServiceWorker();
    }
  }, []);



  return (
    <HelmetProvider>
      <Router>
        <AdminAuthProvider>
          {/* ⚡ ROUTING ENHANCEMENTS */}
          <ScrollToTop />
          <RouteAnnouncer />
          
          <LenisScroll>
            <div className="min-h-screen text-white flex flex-col select-none">
              {/* ⚠️ REMOVED bg-black - Using body background with grid pattern from globals.css */}
              
              {/* 🔒 CODE PROTECTION - Bot-Friendly (Allows Googlebot/Bingbot) */}
              <CodeProtection />
            
            {/* ⭐ PREMIUM VISUAL ENHANCEMENTS ⭐ */}
            {/* Animated Cursor Trail - Desktop Only */}
            <AnimatedCursor />
            
            {/* Cursor Spotlight Effect (Enhancement #2) */}
            <CursorSpotlight />
            
            {/* Scroll Progress Indicators (Enhancement #5) */}
            <ScrollProgress />
            
            <Navigation />
            <main className="flex-1">
              <Suspense fallback={<PageLoader />}>
                <AppRoutes />
              </Suspense>
            </main>
            <Footer />

          {/* AI Chatbot - Lazy loaded */}
          {chatbotOpen && (
            <Suspense fallback={null}>
              <AIChatbot isOpen={chatbotOpen} onClose={() => setChatbotOpen(false)} />
            </Suspense>
          )}

          {/* PWA Install Prompts */}
          <PWAInstallPrompt />
          <IOSInstallInstructions />

          {/* WhatsApp Floating Button - Bottom Left */}
          <WhatsAppButton />

          {/* Floating Chatbot Button - Bottom Right */}
          {!chatbotOpen && (
            <button
              onClick={() => setChatbotOpen(true)}
              className="fixed bottom-6 right-6 z-[9000] bg-yellow-500 hover:bg-yellow-400 text-black p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group"
              aria-label="Open AI Chatbot"
              style={{
                boxShadow: '0 0 30px rgba(234, 179, 8, 0.5)',
              }}
            >
              <Bot className="w-7 h-7" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black animate-pulse" />
              
              {/* Tooltip */}
              <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-white text-black text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl">
                  Chat with us! 💬
                  <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white" />
                </div>
              </div>
            </button>
          )}
          </div>
        </LenisScroll>
      </AdminAuthProvider>
      </Router>
    </HelmetProvider>
  );
}