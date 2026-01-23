import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminLayout } from './AdminLayout';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import {
  Save,
  X,
  Eye,
  Code,
  FileText,
  Tag,
  Link as LinkIcon,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle,
  TrendingUp,
} from 'lucide-react';

// SEO Analysis Function
function analyzeSEO(formData: any) {
  let score = 100;
  const issues = [];
  const warnings = [];
  const successes = [];

  // Title checks
  if (!formData.title) {
    issues.push('Missing title tag');
    score -= 20;
  } else {
    const titleLength = formData.title.length;
    if (titleLength < 30) {
      warnings.push(`Title too short (${titleLength} chars). Recommended: 30-60`);
      score -= 5;
    } else if (titleLength > 60) {
      warnings.push(`Title too long (${titleLength} chars). Recommended: 30-60`);
      score -= 5;
    } else {
      successes.push(`Title length optimal (${titleLength} chars)`);
    }
  }

  // Meta description
  if (!formData.description) {
    issues.push('Missing meta description');
    score -= 15;
  } else {
    const descLength = formData.description.length;
    if (descLength < 120) {
      warnings.push(`Description too short (${descLength} chars). Recommended: 120-160`);
      score -= 5;
    } else if (descLength > 160) {
      warnings.push(`Description too long (${descLength} chars). Recommended: 120-160`);
      score -= 5;
    } else {
      successes.push(`Description length optimal (${descLength} chars)`);
    }
  }

  // Keywords
  if (!formData.keywords || formData.keywords.length === 0) {
    warnings.push('No keywords defined. Add 5-10 relevant keywords');
    score -= 5;
  } else if (formData.keywords.split(',').filter((k: string) => k.trim()).length < 3) {
    warnings.push('Too few keywords. Add more (recommended: 5-10)');
    score -= 3;
  } else {
    successes.push(`${formData.keywords.split(',').length} keywords defined`);
  }

  // H1
  if (!formData.h1) {
    issues.push('No H1 heading defined');
    score -= 10;
  } else {
    successes.push('H1 heading defined');
  }

  // Canonical
  if (!formData.canonical) {
    warnings.push('No canonical URL');
    score -= 5;
  } else {
    successes.push('Canonical URL set');
  }

  // Schema
  if (!formData.schema) {
    warnings.push('No structured data (Schema.org)');
    score -= 10;
  } else {
    successes.push('Structured data present');
  }

  return {
    score: Math.max(0, score),
    grade: score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F',
    issues,
    warnings,
    successes,
  };
}

export function AdminPageEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    keywords: '',
    h1: '',
    canonical: '',
    ogType: 'website',
    ogImage: '',
    schema: 'website',
    noindex: false,
    slug: ''
  });

  const [seoAnalysis, setSeoAnalysis] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'basic' | 'seo' | 'advanced'>('basic');
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Load existing page data if editing
  useEffect(() => {
    if (isEditMode && id) {
      const decodedId = decodeURIComponent(id);
      
      // Try to find page with exact match first
      let pageConfig = SEO_CONFIG[decodedId];
      
      // If not found, try URL mappings for sub-service pages
      if (!pageConfig) {
        // Map long URLs to short seoConfig keys
        const urlMappings: Record<string, string> = {
          '/services/search-engine-optimization-seo/local-seo': '/services/seo/local-seo',
          '/services/search-engine-optimization-seo/technical-seo': '/services/seo/technical-seo',
          '/services/ppc-google-ads/google-shopping': '/services/ppc/google-shopping',
          '/services/ppc-google-ads/display-ads': '/services/ppc/display-ads',
          '/services/social-media-marketing/instagram': '/services/social-media/instagram',
          '/services/social-media-marketing/facebook': '/services/social-media/facebook',
          '/services/social-media-marketing/influencer-marketing': '/services/influencer-marketing',
          '/services/content-marketing/copywriting': '/services/content-writing/copywriting',
          '/services/content-marketing/blog-writing': '/services/content-writing/blog-writing',
          '/services/web-design-development/ecommerce': '/services/ecommerce-development',
          '/services/web-design-development/wordpress': '/services/wordpress-development',
        };
        
        const mappedKey = urlMappings[decodedId];
        if (mappedKey) {
          pageConfig = SEO_CONFIG[mappedKey];
        }
      }
      
      if (pageConfig) {
        setFormData({
          title: pageConfig.title || '',
          description: pageConfig.description || '',
          keywords: Array.isArray(pageConfig.keywords) ? pageConfig.keywords.join(', ') : '',
          h1: pageConfig.h1 || '',
          canonical: pageConfig.canonical || `https://www.inchtomilez.com${decodedId}`,
          ogType: pageConfig.ogType || 'website',
          ogImage: pageConfig.ogImage || '/og-image.jpg',
          schema: typeof pageConfig.schema === 'string' ? pageConfig.schema : 'website',
          noindex: pageConfig.noindex || false,
          slug: decodedId
        });
      }
    }
  }, [id, isEditMode]);

  // Analyze SEO whenever form data changes
  useEffect(() => {
    const analysis = analyzeSEO(formData);
    setSeoAnalysis(analysis);
  }, [formData]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    
    try {
      const slug = isEditMode ? decodeURIComponent(id!) : formData.slug || '/new-page';
      
      // Prepare keywords array
      const keywordsArray = formData.keywords
        .split(',')
        .map(k => k.trim())
        .filter(k => k.length > 0);

      // Prepare page data for backend
      const pageData = {
        pageId: `page_${slug.replace(/\//g, '_')}`,
        slug: slug,
        title: formData.title,
        description: formData.description,
        keywords: keywordsArray.join(', '),
        h1: formData.h1,
        canonical: formData.canonical,
        ogTitle: formData.title,
        ogDescription: formData.description,
        ogImage: formData.ogImage,
        ogType: formData.ogType,
        twitterTitle: formData.title,
        twitterDescription: formData.description,
        twitterImage: formData.ogImage,
        twitterCard: 'summary_large_image',
        schemaType: formData.schema,
        schemaData: null,
        index: !formData.noindex,
        follow: true,
        archive: true,
        includeSitemap: true,
        sitemapPriority: 0.8,
        sitemapChangeFreq: 'weekly'
      };

      // Save to backend
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/seo-system/page/update`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(pageData)
        }
      );

      const result = await response.json();

      if (result.success) {
        alert(`✅ Page ${isEditMode ? 'updated' : 'created'} successfully!`);
        navigate('/admin/pages');
      } else {
        alert('❌ Error: ' + result.error);
      }
    } catch (error) {
      console.error('Error saving page:', error);
      alert('❌ Error saving page. Make sure backend is running.');
    } finally {
      setSaving(false);
    }
  };

  const getSEOScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500 bg-green-500/20';
    if (score >= 80) return 'text-blue-500 bg-blue-500/20';
    if (score >= 70) return 'text-yellow-500 bg-yellow-500/20';
    if (score >= 60) return 'text-orange-500 bg-orange-500/20';
    return 'text-red-500 bg-red-500/20';
  };

  return (
    <AdminLayout
      title={isEditMode ? 'Edit Page' : 'Create New Page'}
      breadcrumb={[
        { label: 'Dashboard', href: '/admin' },
        { label: 'Pages', href: '/admin/pages' },
        { label: isEditMode ? 'Edit' : 'New' },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Page Info Card */}
          <div className="glass p-6 rounded-xl border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[22px] font-bold text-white">
                {isEditMode ? `Editing: ${decodeURIComponent(id!)}` : 'Create New Page'}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  title="Preview"
                >
                  <Eye className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={() => navigate('/admin/pages')}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  title="Cancel"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-white/10">
              <button
                onClick={() => setActiveTab('basic')}
                className={`px-4 py-2 text-[15px] font-medium transition-colors ${
                  activeTab === 'basic'
                    ? 'text-yellow-500 border-b-2 border-yellow-500'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Basic Info
              </button>
              <button
                onClick={() => setActiveTab('seo')}
                className={`px-4 py-2 text-[15px] font-medium transition-colors ${
                  activeTab === 'seo'
                    ? 'text-yellow-500 border-b-2 border-yellow-500'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                SEO Settings
              </button>
              <button
                onClick={() => setActiveTab('advanced')}
                className={`px-4 py-2 text-[15px] font-medium transition-colors ${
                  activeTab === 'advanced'
                    ? 'text-yellow-500 border-b-2 border-yellow-500'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Advanced
              </button>
            </div>

            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-[14px] font-semibold text-white mb-2">
                    Page Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter page title (30-60 characters)"
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500"
                  />
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-[13px] text-white/60">
                      {formData.title.length} / 60 characters
                    </p>
                    {formData.title.length >= 30 && formData.title.length <= 60 && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </div>

                {/* Meta Description */}
                <div>
                  <label className="block text-[14px] font-semibold text-white mb-2">
                    Meta Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Enter meta description (120-160 characters)"
                    rows={4}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500"
                  />
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-[13px] text-white/60">
                      {formData.description.length} / 160 characters
                    </p>
                    {formData.description.length >= 120 && formData.description.length <= 160 && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </div>

                {/* H1 Heading */}
                <div>
                  <label className="block text-[14px] font-semibold text-white mb-2">
                    H1 Heading *
                  </label>
                  <input
                    type="text"
                    value={formData.h1}
                    onChange={(e) => handleInputChange('h1', e.target.value)}
                    placeholder="Main heading for the page"
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500"
                  />
                </div>
              </div>
            )}

            {/* SEO Settings Tab */}
            {activeTab === 'seo' && (
              <div className="space-y-6">
                {/* Keywords */}
                <div>
                  <label className="block text-[14px] font-semibold text-white mb-2">
                    Keywords (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.keywords}
                    onChange={(e) => handleInputChange('keywords', e.target.value)}
                    placeholder="keyword1, keyword2, keyword3, ..."
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500"
                  />
                  <p className="mt-2 text-[13px] text-white/60">
                    {formData.keywords.split(',').filter(k => k.trim()).length} keywords
                  </p>
                </div>

                {/* Canonical URL */}
                <div>
                  <label className="block text-[14px] font-semibold text-white mb-2">
                    Canonical URL
                  </label>
                  <input
                    type="text"
                    value={formData.canonical}
                    onChange={(e) => handleInputChange('canonical', e.target.value)}
                    placeholder="https://www.inchtomilez.com/page-url"
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500"
                  />
                </div>

                {/* OG Type */}
                <div>
                  <label className="block text-[14px] font-semibold text-white mb-2">
                    Open Graph Type
                  </label>
                  <select
                    value={formData.ogType}
                    onChange={(e) => handleInputChange('ogType', e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white focus:outline-none focus:border-yellow-500"
                  >
                    <option value="website">Website</option>
                    <option value="article">Article</option>
                    <option value="service">Service</option>
                    <option value="product">Product</option>
                  </select>
                </div>

                {/* OG Image */}
                <div>
                  <label className="block text-[14px] font-semibold text-white mb-2">
                    Open Graph Image
                  </label>
                  <input
                    type="text"
                    value={formData.ogImage}
                    onChange={(e) => handleInputChange('ogImage', e.target.value)}
                    placeholder="/og-image.jpg"
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500"
                  />
                </div>
              </div>
            )}

            {/* Advanced Tab */}
            {activeTab === 'advanced' && (
              <div className="space-y-6">
                {/* Schema Type */}
                <div>
                  <label className="block text-[14px] font-semibold text-white mb-2">
                    Schema.org Type
                  </label>
                  <select
                    value={formData.schema}
                    onChange={(e) => handleInputChange('schema', e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white focus:outline-none focus:border-yellow-500"
                  >
                    <option value="website">Website</option>
                    <option value="organization">Organization</option>
                    <option value="localBusiness">Local Business</option>
                    <option value="article">Article</option>
                    <option value="service">Service</option>
                  </select>
                </div>

                {/* No Index */}
                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.noindex}
                      onChange={(e) => handleInputChange('noindex', e.target.checked)}
                      className="w-5 h-5 rounded border-white/20 bg-black/50 checked:bg-yellow-500 focus:ring-2 focus:ring-yellow-500"
                    />
                    <div>
                      <span className="text-[15px] font-medium text-white">No Index</span>
                      <p className="text-[13px] text-white/60">
                        Prevent search engines from indexing this page
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-8 flex gap-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold text-[15px] hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    {isEditMode ? 'Update Page' : 'Create Page'}
                  </>
                )}
              </button>
              <button
                onClick={() => navigate('/admin/pages')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold text-[15px] transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar - SEO Analysis */}
        <div className="space-y-6">
          {/* SEO Score Card */}
          {seoAnalysis && (
            <div className="glass p-6 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-yellow-500" />
                <h3 className="text-[18px] font-bold text-white">SEO Score</h3>
              </div>

              <div className={`w-full h-32 rounded-xl flex flex-col items-center justify-center ${getSEOScoreColor(seoAnalysis.score)}`}>
                <div className="text-[48px] font-bold">{seoAnalysis.grade}</div>
                <div className="text-[18px] font-semibold">{seoAnalysis.score}%</div>
              </div>

              <div className="mt-6 space-y-4">
                {seoAnalysis.issues.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-[14px] font-semibold text-red-500">
                        Issues ({seoAnalysis.issues.length})
                      </span>
                    </div>
                    {seoAnalysis.issues.map((issue: string, i: number) => (
                      <p key={i} className="text-[13px] text-white/70 ml-6">• {issue}</p>
                    ))}
                  </div>
                )}

                {seoAnalysis.warnings.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-yellow-500" />
                      <span className="text-[14px] font-semibold text-yellow-500">
                        Warnings ({seoAnalysis.warnings.length})
                      </span>
                    </div>
                    {seoAnalysis.warnings.map((warning: string, i: number) => (
                      <p key={i} className="text-[13px] text-white/70 ml-6">• {warning}</p>
                    ))}
                  </div>
                )}

                {seoAnalysis.successes.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-[14px] font-semibold text-green-500">
                        Optimized ({seoAnalysis.successes.length})
                      </span>
                    </div>
                    {seoAnalysis.successes.map((success: string, i: number) => (
                      <p key={i} className="text-[13px] text-white/70 ml-6">• {success}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Quick Tips */}
          <div className="glass p-6 rounded-xl border border-white/10">
            <h3 className="text-[18px] font-bold text-white mb-4">Quick Tips</h3>
            <div className="space-y-3 text-[13px] text-white/70">
              <p>• Title: 30-60 characters for best results</p>
              <p>• Description: 120-160 characters</p>
              <p>• Keywords: 5-10 relevant keywords</p>
              <p>• H1: One per page, include main keyword</p>
              <p>• Canonical: Always set to prevent duplicates</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}