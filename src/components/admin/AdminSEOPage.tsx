import { useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { useAdminAuth } from '../../utils/adminAuth';
import { Search, Save, Globe, FileText, Code } from 'lucide-react';

export function AdminSEOPage() {
  const { hasPermission } = useAdminAuth();
  const [isSaving, setIsSaving] = useState(false);

  const [seoSettings, setSeoSettings] = useState({
    defaultTitle: 'Inchtomilez | Leading Digital Marketing Agency in Indore',
    defaultDescription: 'Expert digital marketing services including SEO, PPC, social media marketing, and web development.',
    defaultKeywords: 'digital marketing, seo, ppc, social media, indore',
    defaultOgImage: '/og-image.jpg',
    googleSearchConsole: 'google-site-verification-code',
    bingWebmaster: 'bing-verification-code',
    googleAnalytics: 'G-XXXXXXXXXX',
    facebookPixel: '1234567890',
    robots: `User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: https://www.inchtomilez.com/sitemap.xml`,
    structuredData: `{\n  "@context": "https://schema.org",\n  "@type": "Organization",\n  "name": "Inchtomilez",\n  "url": "https://www.inchtomilez.com"\n}`,
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert('SEO settings saved successfully!');
    setIsSaving(false);
  };

  return (
    <AdminLayout
      title="SEO Settings"
      breadcrumb={[{ label: 'Dashboard', href: '/admin' }, { label: 'SEO' }]}
    >
      <div className="max-w-4xl">
        <h1 className="text-[26px] md:text-[30px] font-medium text-white mb-2">Global SEO Settings</h1>
        <p className="text-[15px] text-white/70 mb-8">
          Manage global SEO settings, meta tags, and integrations
        </p>

        <div className="space-y-6">
          {/* Default Meta Tags */}
          <div className="glass p-6 rounded-xl border border-white/10">
            <h3 className="text-[18px] font-medium text-white mb-4">Default Meta Tags</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[14px] font-medium text-white mb-2">Default Title</label>
                <input
                  type="text"
                  value={seoSettings.defaultTitle}
                  onChange={(e) => setSeoSettings({ ...seoSettings, defaultTitle: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white focus:outline-none focus:border-yellow-500"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-white mb-2">Default Description</label>
                <textarea
                  rows={3}
                  value={seoSettings.defaultDescription}
                  onChange={(e) => setSeoSettings({ ...seoSettings, defaultDescription: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white focus:outline-none focus:border-yellow-500 resize-none"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-white mb-2">Default Keywords</label>
                <input
                  type="text"
                  value={seoSettings.defaultKeywords}
                  onChange={(e) => setSeoSettings({ ...seoSettings, defaultKeywords: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white focus:outline-none focus:border-yellow-500"
                />
              </div>
            </div>
          </div>

          {/* Verification Codes */}
          <div className="glass p-6 rounded-xl border border-white/10">
            <h3 className="text-[18px] font-medium text-white mb-4">Search Engine Verification</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[14px] font-medium text-white mb-2">Google Search Console</label>
                <input
                  type="text"
                  value={seoSettings.googleSearchConsole}
                  onChange={(e) => setSeoSettings({ ...seoSettings, googleSearchConsole: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white focus:outline-none focus:border-yellow-500"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-white mb-2">Bing Webmaster Tools</label>
                <input
                  type="text"
                  value={seoSettings.bingWebmaster}
                  onChange={(e) => setSeoSettings({ ...seoSettings, bingWebmaster: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white focus:outline-none focus:border-yellow-500"
                />
              </div>
            </div>
          </div>

          {/* Analytics */}
          <div className="glass p-6 rounded-xl border border-white/10">
            <h3 className="text-[18px] font-medium text-white mb-4">Analytics & Tracking</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[14px] font-medium text-white mb-2">Google Analytics ID</label>
                <input
                  type="text"
                  value={seoSettings.googleAnalytics}
                  onChange={(e) => setSeoSettings({ ...seoSettings, googleAnalytics: e.target.value })}
                  placeholder="G-XXXXXXXXXX"
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white focus:outline-none focus:border-yellow-500"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-white mb-2">Facebook Pixel ID</label>
                <input
                  type="text"
                  value={seoSettings.facebookPixel}
                  onChange={(e) => setSeoSettings({ ...seoSettings, facebookPixel: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white focus:outline-none focus:border-yellow-500"
                />
              </div>
            </div>
          </div>

          {/* Robots.txt */}
          <div className="glass p-6 rounded-xl border border-white/10">
            <h3 className="text-[18px] font-medium text-white mb-4">Robots.txt</h3>
            <textarea
              rows={8}
              value={seoSettings.robots}
              onChange={(e) => setSeoSettings({ ...seoSettings, robots: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white font-mono focus:outline-none focus:border-yellow-500 resize-none"
            />
          </div>

          {/* Structured Data */}
          <div className="glass p-6 rounded-xl border border-white/10">
            <h3 className="text-[18px] font-medium text-white mb-4">Global Structured Data (Schema.org JSON-LD)</h3>
            <textarea
              rows={12}
              value={seoSettings.structuredData}
              onChange={(e) => setSeoSettings({ ...seoSettings, structuredData: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white font-mono focus:outline-none focus:border-yellow-500 resize-none"
            />
          </div>

          {/* Save Button */}
          {hasPermission('admin') && (
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full bg-yellow-500 text-black py-3 rounded-lg font-semibold text-[15px] hover:bg-yellow-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              {isSaving ? 'Saving...' : 'Save SEO Settings'}
            </button>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
