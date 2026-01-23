import { useState, useEffect } from 'react';
import { Search, Edit, Eye, Save, AlertCircle, CheckCircle, Loader2, BarChart3, Database, Zap, RefreshCw } from 'lucide-react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { SERPPreview } from '../SERPPreview';
import { getAllPages } from '../../../utils/seo/seedAllPages';
import { SEO_CONFIG } from '../../../utils/seoConfig';

export function PageSEOPanel() {
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState<any[]>([]);
  const [filteredPages, setFilteredPages] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPage, setSelectedPage] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadPages();
    
    // Check if there's a page parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const pageSlug = urlParams.get('page');
    
    if (pageSlug) {
      // Auto-open this page for editing after pages load
      setTimeout(() => {
        const pageToEdit = pages.find(p => p.slug === pageSlug);
        if (pageToEdit) {
          loadPageSEO(pageToEdit.pageId, pageToEdit.slug);
        }
      }, 500);
    }
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredPages(
        pages.filter(p => 
          p.slug?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.title?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredPages(pages);
    }
  }, [searchQuery, pages]);

  /**
   * Load pages from STATIC CONFIG (no backend needed!)
   * Then merge with any database overrides
   */
  const loadPages = async () => {
    setLoading(true);
    try {
      // Get all pages from static config
      const staticPages = getAllPages();
      
      // Transform to SEO format with defaults from SEO_CONFIG
      const pagesWithSEO = staticPages.map(page => {
        const seoConfig = SEO_CONFIG[page.slug] || {};
        
        return {
          pageId: `page_${page.slug.replace(/\//g, '_')}`,
          slug: page.slug,
          title: seoConfig.title || `${page.title} | Inchtomilez`,
          description: seoConfig.description || `Expert ${page.type} services from Inchtomilez.`,
          keywords: seoConfig.keywords?.join(', ') || `${page.type}, digital marketing`,
          canonical: `https://www.inchtomilez.com${page.slug}`,
          index: true,
          follow: true,
          archive: true,
          ogTitle: seoConfig.title || page.title,
          ogDescription: seoConfig.description || `${page.title} - Inchtomilez`,
          ogImage: '/og-image.jpg',
          ogType: page.type === 'blog' ? 'article' : 'website',
          twitterTitle: page.title,
          twitterDescription: `${page.title} - Inchtomilez`,
          twitterImage: '/og-image.jpg',
          twitterCard: 'summary_large_image',
          schemaType: page.type === 'blog' ? 'Article' : 'WebPage',
          schemaData: null,
          includeSitemap: true,
          sitemapPriority: page.priority || 0.5,
          sitemapChangeFreq: page.changefreq || (page.type === 'blog' ? 'weekly' : 'monthly'),
          score: 85, // Default good score
          issues: [],
          source: 'static' // Indicates this is from static config
        };
      });

      // Try to fetch database overrides (optional - don't fail if backend is down)
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/seo-system/pages/all`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`
            }
          }
        );

        const result = await response.json();

        if (result.success && result.pages?.length > 0) {
          // Merge database overrides with static pages
          const mergedPages = pagesWithSEO.map(staticPage => {
            const dbOverride = result.pages.find((p: any) => p.slug === staticPage.slug);
            return dbOverride ? { ...staticPage, ...dbOverride, source: 'database' } : staticPage;
          });
          
          setPages(mergedPages);
          setFilteredPages(mergedPages);
          console.log('✅ Loaded pages from static config + database overrides');
        } else {
          // No database data, use static config only
          setPages(pagesWithSEO);
          setFilteredPages(pagesWithSEO);
          console.log('✅ Loaded pages from static config only');
        }
      } catch (dbError) {
        // Backend not available, use static config only
        console.log('⚠️ Backend not available, using static config only');
        setPages(pagesWithSEO);
        setFilteredPages(pagesWithSEO);
      }
    } catch (error) {
      console.error('Error loading pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadPageSEO = async (pageId: string, slug: string) => {
    try {
      // First, try to find the page in our loaded pages array
      const existingPage = pages.find(p => p.slug === slug || p.pageId === pageId);
      
      if (existingPage) {
        // Use the existing page data as a starting point
        setSelectedPage({
          ...existingPage,
          // Ensure all required fields exist
          canonical: existingPage.canonical || `https://www.inchtomilez.com${slug}`,
          index: existingPage.index !== undefined ? existingPage.index : true,
          follow: existingPage.follow !== undefined ? existingPage.follow : true,
          ogTitle: existingPage.ogTitle || existingPage.title || '',
          ogDescription: existingPage.ogDescription || existingPage.description || '',
          ogImage: existingPage.ogImage || '/og-image.jpg',
          includeSitemap: existingPage.includeSitemap !== undefined ? existingPage.includeSitemap : true,
          sitemapPriority: existingPage.sitemapPriority || 0.5,
          sitemapChangeFreq: existingPage.sitemapChangeFreq || 'weekly'
        });
        setEditMode(true);
        console.log('✅ Loaded page for editing:', slug);
        return;
      }

      // Fallback: try to load from backend
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/seo-system/page/get`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ pageId, slug })
        }
      );

      const result = await response.json();

      if (result.success) {
        setSelectedPage(result.seo);
        setEditMode(true);
      } else {
        // Create new SEO entry
        setSelectedPage({
          pageId,
          slug,
          title: '',
          description: '',
          keywords: '',
          canonical: `https://www.inchtomilez.com${slug}`,
          index: true,
          follow: true,
          ogTitle: '',
          ogDescription: '',
          ogImage: '/og-image.jpg',
          includeSitemap: true,
          sitemapPriority: 0.5,
          sitemapChangeFreq: 'weekly'
        });
        setEditMode(true);
      }
    } catch (error) {
      console.error('Error loading page SEO:', error);
      alert('❌ Error loading page. Make sure backend is running.');
    }
  };

  const savePage = async () => {
    if (!selectedPage) return;

    setSaving(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/seo-system/page/update`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(selectedPage)
        }
      );

      const result = await response.json();

      if (result.success) {
        alert('✅ Page SEO saved successfully!');
        setEditMode(false);
        loadPages(); // Refresh list
      } else {
        alert('❌ Error: ' + result.error);
      }
    } catch (error: any) {
      console.error('Error saving page SEO:', error);
      alert('❌ Error saving page');
    } finally {
      setSaving(false);
    }
  };

  const getSEOScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getSEOScoreLabel = (score: number) => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    if (score >= 50) return 'E';
    return 'F';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-yellow-500 animate-spin" />
      </div>
    );
  }

  // Edit Mode View
  if (editMode && selectedPage) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[20px] font-bold text-white">
              Edit Page SEO: {selectedPage.slug}
            </h2>
            <p className="text-[13px] text-white/60 mt-1">
              SEO Score: <span className={getSEOScoreColor(selectedPage.score || 0)}>
                {selectedPage.score || 0}/100 ({getSEOScoreLabel(selectedPage.score || 0)})
              </span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setEditMode(false);
                setSelectedPage(null);
              }}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={savePage}
              disabled={saving}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg font-semibold transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save Changes
            </button>
          </div>
        </div>

        {/* SEO Issues */}
        {selectedPage.issues && selectedPage.issues.length > 0 && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-[14px] font-semibold text-red-500 mb-2">SEO Issues Found:</h4>
                <ul className="space-y-1">
                  {selectedPage.issues.map((issue: string, idx: number) => (
                    <li key={idx} className="text-[13px] text-red-400">• {issue}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Meta */}
            <div className="space-y-4">
              <h3 className="text-[18px] font-bold text-white">Basic Meta Tags</h3>
              
              <div>
                <label className="block text-[14px] font-medium text-white mb-2">
                  Page Title *
                </label>
                <input
                  type="text"
                  value={selectedPage.title || ''}
                  onChange={(e) => setSelectedPage({ ...selectedPage, title: e.target.value })}
                  placeholder="Page title for search engines"
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500"
                />
                <p className="text-[12px] text-white/60 mt-1">
                  {selectedPage.title?.length || 0} characters 
                  {selectedPage.title?.length < 30 && <span className="text-red-400"> (too short)</span>}
                  {selectedPage.title?.length > 60 && <span className="text-red-400"> (too long)</span>}
                  {selectedPage.title?.length >= 30 && selectedPage.title?.length <= 60 && <span className="text-green-400"> ✓ good</span>}
                </p>
              </div>

              <div>
                <label className="block text-[14px] font-medium text-white mb-2">
                  Meta Description *
                </label>
                <textarea
                  value={selectedPage.description || ''}
                  onChange={(e) => setSelectedPage({ ...selectedPage, description: e.target.value })}
                  placeholder="Description for search results"
                  rows={3}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 resize-none"
                />
                <p className="text-[12px] text-white/60 mt-1">
                  {selectedPage.description?.length || 0} characters
                  {selectedPage.description?.length < 120 && <span className="text-red-400"> (too short)</span>}
                  {selectedPage.description?.length > 160 && <span className="text-red-400"> (too long)</span>}
                  {selectedPage.description?.length >= 120 && selectedPage.description?.length <= 160 && <span className="text-green-400"> ✓ good</span>}
                </p>
              </div>

              <div>
                <label className="block text-[14px] font-medium text-white mb-2">
                  Focus Keywords (comma-separated)
                </label>
                <input
                  type="text"
                  value={selectedPage.keywords || ''}
                  onChange={(e) => setSelectedPage({ ...selectedPage, keywords: e.target.value })}
                  placeholder="keyword1, keyword2, keyword3"
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-white mb-2">
                  Canonical URL
                </label>
                <input
                  type="url"
                  value={selectedPage.canonical || ''}
                  onChange={(e) => setSelectedPage({ ...selectedPage, canonical: e.target.value })}
                  placeholder="https://www.inchtomilez.com/page"
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500"
                />
              </div>
            </div>

            {/* Open Graph */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <h3 className="text-[18px] font-bold text-white">Open Graph (Facebook/LinkedIn)</h3>
              
              <div>
                <label className="block text-[14px] font-medium text-white mb-2">
                  OG Title
                </label>
                <input
                  type="text"
                  value={selectedPage.ogTitle || ''}
                  onChange={(e) => setSelectedPage({ ...selectedPage, ogTitle: e.target.value })}
                  placeholder="Leave blank to use page title"
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-white mb-2">
                  OG Description
                </label>
                <textarea
                  value={selectedPage.ogDescription || ''}
                  onChange={(e) => setSelectedPage({ ...selectedPage, ogDescription: e.target.value })}
                  placeholder="Leave blank to use meta description"
                  rows={2}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-white mb-2">
                  OG Image URL
                </label>
                <input
                  type="url"
                  value={selectedPage.ogImage || ''}
                  onChange={(e) => setSelectedPage({ ...selectedPage, ogImage: e.target.value })}
                  placeholder="https://www.inchtomilez.com/og-image.jpg"
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500"
                />
                <p className="text-[12px] text-white/60 mt-1">
                  Recommended: 1200x630px
                </p>
              </div>
            </div>

            {/* Indexing */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <h3 className="text-[18px] font-bold text-white">Indexing Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center gap-3 p-4 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedPage.index || false}
                    onChange={(e) => setSelectedPage({ ...selectedPage, index: e.target.checked })}
                    className="w-4 h-4 rounded border-white/20 text-yellow-500 focus:ring-yellow-500"
                  />
                  <div>
                    <p className="text-[14px] font-medium text-white">Index Page</p>
                    <p className="text-[12px] text-white/60">Allow search engines to index</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedPage.follow || false}
                    onChange={(e) => setSelectedPage({ ...selectedPage, follow: e.target.checked })}
                    className="w-4 h-4 rounded border-white/20 text-yellow-500 focus:ring-yellow-500"
                  />
                  <div>
                    <p className="text-[14px] font-medium text-white">Follow Links</p>
                    <p className="text-[12px] text-white/60">Allow following links on page</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Sitemap */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <h3 className="text-[18px] font-bold text-white">Sitemap Settings</h3>
              
              <label className="flex items-center gap-3 p-4 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                <input
                  type="checkbox"
                  checked={selectedPage.includeSitemap || false}
                  onChange={(e) => setSelectedPage({ ...selectedPage, includeSitemap: e.target.checked })}
                  className="w-4 h-4 rounded border-white/20 text-yellow-500 focus:ring-yellow-500"
                />
                <div>
                  <p className="text-[14px] font-medium text-white">Include in Sitemap</p>
                  <p className="text-[12px] text-white/60">Add this page to sitemap.xml</p>
                </div>
              </label>

              {selectedPage.includeSitemap && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[14px] font-medium text-white mb-2">
                      Priority (0.0 - 1.0)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="1"
                      step="0.1"
                      value={selectedPage.sitemapPriority || 0.5}
                      onChange={(e) => setSelectedPage({ ...selectedPage, sitemapPriority: parseFloat(e.target.value) })}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-yellow-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] font-medium text-white mb-2">
                      Change Frequency
                    </label>
                    <select
                      value={selectedPage.sitemapChangeFreq || 'weekly'}
                      onChange={(e) => setSelectedPage({ ...selectedPage, sitemapChangeFreq: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-yellow-500"
                    >
                      <option value="always">Always</option>
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                      <option value="never">Never</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Preview */}
          <div className="lg:col-span-1 space-y-6">
            <div className="sticky top-6">
              <h3 className="text-[18px] font-bold text-white mb-4">Live Preview</h3>
              
              {/* SERP Preview */}
              <div className="mb-6">
                <h4 className="text-[14px] font-medium text-white mb-3">Google Search Result:</h4>
                <SERPPreview
                  title={selectedPage.title || 'Page Title'}
                  description={selectedPage.description || 'Meta description'}
                  url={selectedPage.canonical || selectedPage.slug}
                />
              </div>

              {/* OG Preview */}
              <div>
                <h4 className="text-[14px] font-medium text-white mb-3">Facebook/LinkedIn:</h4>
                <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                  {selectedPage.ogImage && (
                    <div className="aspect-[1.91/1] bg-white/10 flex items-center justify-center">
                      <img 
                        src={selectedPage.ogImage} 
                        alt="OG Preview" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <div className="p-3">
                    <p className="text-[11px] text-white/40 mb-1">www.inchtomilez.com</p>
                    <p className="text-[13px] font-medium text-white mb-1 line-clamp-1">
                      {selectedPage.ogTitle || selectedPage.title || 'Page Title'}
                    </p>
                    <p className="text-[11px] text-white/60 line-clamp-2">
                      {selectedPage.ogDescription || selectedPage.description || 'Meta description'}
                    </p>
                  </div>
                </div>
              </div>

              {/* SEO Score Card */}
              <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-[14px] font-medium text-white">SEO Health</h4>
                  <div className={`text-[24px] font-bold ${getSEOScoreColor(selectedPage.score || 0)}`}>
                    {getSEOScoreLabel(selectedPage.score || 0)}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-white/60" />
                  <div className="flex-1 bg-black/50 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transition-all"
                      style={{ width: `${selectedPage.score || 0}%` }}
                    />
                  </div>
                  <span className="text-[13px] text-white/60">{selectedPage.score || 0}/100</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-6 border-t border-white/10">
          <button
            onClick={savePage}
            disabled={saving}
            className="w-full px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg font-bold text-[15px] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving Changes...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Save Page SEO
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  // List View
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[20px] font-bold text-white">Per-Page SEO Management</h2>
          <p className="text-[13px] text-white/60 mt-1">
            ✅ {filteredPages.length} pages loaded from static config
          </p>
        </div>
        <button
          onClick={loadPages}
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg font-semibold transition-colors flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search pages by URL or title..."
          className="w-full bg-black/50 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500"
        />
      </div>

      {/* Pages List */}
      {filteredPages.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-[15px] text-white/60">
            No pages found. Pages will appear here after they're created.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredPages.map((page) => (
            <div
              key={page.pageId || page.slug}
              className="glass p-4 rounded-lg border border-white/10 hover:border-yellow-500/50 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-[15px] font-medium text-white">
                      {page.title || page.slug || 'Untitled Page'}
                    </h3>
                    {page.score !== undefined && (
                      <span className={`text-[12px] font-bold ${getSEOScoreColor(page.score)}`}>
                        {getSEOScoreLabel(page.score)} ({page.score}/100)
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-white/60">
                    {page.slug || page.pageId}
                  </p>
                  {page.issues && page.issues.length > 0 && (
                    <div className="flex items-center gap-2 mt-2">
                      <AlertCircle className="w-3 h-3 text-red-400" />
                      <span className="text-[12px] text-red-400">
                        {page.issues.length} issue{page.issues.length > 1 ? 's' : ''} found
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.open(page.slug, '_blank')}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Preview page"
                  >
                    <Eye className="w-4 h-4 text-white/60" />
                  </button>
                  <button
                    onClick={() => loadPageSEO(page.pageId, page.slug)}
                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit SEO
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}