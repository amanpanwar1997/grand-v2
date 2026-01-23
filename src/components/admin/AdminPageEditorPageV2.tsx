import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminLayout } from './AdminLayout';
import { SERPPreview } from './SERPPreview';
import { SocialPreview } from './SocialPreview';
import { useAutoSave, formatTimeAgo } from '../../hooks/useAutoSave';
import { validateSEOData, getSEOScoreColor, getGradeColor } from '../../utils/seo-system';
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
  Clock,
  History,
  Loader2,
} from 'lucide-react';

export function AdminPageEditorPageV2() {
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
  });

  const [activeTab, setActiveTab] = useState<'basic' | 'seo' | 'advanced'>('basic');
  const [previewTab, setPreviewTab] = useState<'serp' | 'social'>('serp');
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [validationResult, setValidationResult] = useState<any>(null);

  // Auto-save integration
  const { lastSaved, isSaving, hasUnsavedChanges } = useAutoSave({
    slug: id ? decodeURIComponent(id) : '',
    formData,
    enabled: isEditMode,
  });

  // Load existing page data if editing
  useEffect(() => {
    if (isEditMode && id) {
      const decodedId = decodeURIComponent(id);
      
      // Try to find page with exact match first
      let pageConfig = SEO_CONFIG[decodedId];
      
      // If not found, try URL mappings
      if (!pageConfig) {
        const urlMappings: Record<string, string> = {
          '/services/search-engine-optimization-seo/local-seo': '/services/seo/local-seo',
          '/services/search-engine-optimization-seo/technical-seo': '/services/seo/technical-seo',
          '/services/ppc-google-ads/google-shopping': '/services/ppc/google-shopping',
          '/services/ppc-google-ads/display-ads': '/services/ppc/display-ads',
          '/services/social-media-marketing/instagram': '/services/social-media/instagram',
          '/services/social-media-marketing/facebook': '/services/social-media/facebook',
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
        });
      }
    }
  }, [id, isEditMode]);

  // Validate whenever form data changes
  useEffect(() => {
    const result = validateSEOData(formData);
    setValidationResult(result);
  }, [formData]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!validationResult?.isValid) {
      alert('Please fix validation errors before saving');
      return;
    }

    setSaving(true);
    
    try {
      const slug = isEditMode ? decodeURIComponent(id!) : '/new-page';
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/seo-system/page/update`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            slug,
            data: formData,
            user: 'admin'
          })
        }
      );

      const result = await response.json();

      if (result.success) {
        alert(`✅ Page ${isEditMode ? 'updated' : 'created'} successfully!\n\nVersion: ${result.version}\n\nThe changes are now saved in the system.`);
        
        if (!isEditMode) {
          navigate('/admin/pages');
        }
      } else {
        throw new Error(result.error || 'Save failed');
      }
    } catch (error: any) {
      console.error('Save error:', error);
      alert(`❌ Error saving page: ${error.message}`);
    } finally {
      setSaving(false);
    }
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
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Editor - 2 columns */}
        <div className="xl:col-span-2 space-y-6">
          {/* Page Info Card */}
          <div className="glass p-6 rounded-xl border border-white/10">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-[22px] font-bold text-white">
                  {isEditMode ? `Editing: ${decodeURIComponent(id!)}` : 'Create New Page'}
                </h2>
                {isEditMode && (
                  <div className="flex items-center gap-4 mt-2 text-[13px]">
                    {isSaving && (
                      <span className="text-yellow-500 flex items-center gap-2">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Auto-saving...
                      </span>
                    )}
                    {!isSaving && lastSaved && (
                      <span className="text-green-500 flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Saved {formatTimeAgo(lastSaved)}
                      </span>
                    )}
                    {hasUnsavedChanges && !isSaving && (
                      <span className="text-orange-500">• Unsaved changes</span>
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className={`p-2 rounded-lg transition-colors ${
                    showPreview ? 'bg-yellow-500 text-black' : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                  title="Toggle Preview"
                >
                  <Eye className="w-5 h-5" />
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
                    Page Title * <span className="text-red-500">({formData.title.length}/60)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter page title (30-60 characters)"
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500"
                  />
                  {formData.title.length >= 30 && formData.title.length <= 60 && (
                    <p className="mt-2 text-[13px] text-green-500 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Perfect length!
                    </p>
                  )}
                </div>

                {/* Meta Description */}
                <div>
                  <label className="block text-[14px] font-semibold text-white mb-2">
                    Meta Description * <span className="text-red-500">({formData.description.length}/160)</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Enter meta description (120-160 characters)"
                    rows={4}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 resize-none"
                  />
                  {formData.description.length >= 120 && formData.description.length <= 160 && (
                    <p className="mt-2 text-[13px] text-green-500 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Perfect length!
                    </p>
                  )}
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
                    {formData.keywords.split(',').filter(k => k.trim()).length} keywords (recommended: 5-10)
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
                      className="w-5 h-5 rounded border-white/20 bg-black/50 checked:bg-yellow-500"
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
                disabled={saving || !validationResult?.isValid}
                className="flex-1 bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold text-[15px] hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    {isEditMode ? 'Save Changes' : 'Create Page'}
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

        {/* Sidebar - Preview & SEO Score */}
        <div className="space-y-6">
          {/* SEO Score Card */}
          {validationResult && (
            <div className="glass p-6 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-yellow-500" />
                <h3 className="text-[18px] font-bold text-white">SEO Score</h3>
              </div>

              <div className={`w-full h-32 rounded-xl flex flex-col items-center justify-center mb-6 ${getGradeColor(validationResult.grade)}`}>
                <div className="text-[48px] font-bold">{validationResult.grade}</div>
                <div className="text-[18px] font-semibold">{validationResult.score}%</div>
              </div>

              <div className="space-y-4">
                {validationResult.errors.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-[14px] font-semibold text-red-500">
                        Issues ({validationResult.errors.length})
                      </span>
                    </div>
                    {validationResult.errors.map((error: any, i: number) => (
                      <p key={i} className="text-[13px] text-white/70 ml-6">• {error.message}</p>
                    ))}
                  </div>
                )}

                {validationResult.warnings.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-yellow-500" />
                      <span className="text-[14px] font-semibold text-yellow-500">
                        Warnings ({validationResult.warnings.length})
                      </span>
                    </div>
                    {validationResult.warnings.slice(0, 3).map((warning: any, i: number) => (
                      <p key={i} className="text-[13px] text-white/70 ml-6">• {warning.message}</p>
                    ))}
                  </div>
                )}

                {validationResult.successes.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-[14px] font-semibold text-green-500">
                        Optimized ({validationResult.successes.length})
                      </span>
                    </div>
                    {validationResult.successes.slice(0, 3).map((success: string, i: number) => (
                      <p key={i} className="text-[13px] text-white/70 ml-6">{success}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Preview Panels */}
          {showPreview && (
            <div className="space-y-6">
              {/* Preview Tabs */}
              <div className="flex gap-2">
                <button
                  onClick={() => setPreviewTab('serp')}
                  className={`flex-1 px-4 py-2 rounded-lg text-[14px] font-medium transition-colors ${
                    previewTab === 'serp'
                      ? 'bg-yellow-500 text-black'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Google SERP
                </button>
                <button
                  onClick={() => setPreviewTab('social')}
                  className={`flex-1 px-4 py-2 rounded-lg text-[14px] font-medium transition-colors ${
                    previewTab === 'social'
                      ? 'bg-yellow-500 text-black'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Social Media
                </button>
              </div>

              {/* Preview Content */}
              {previewTab === 'serp' && (
                <SERPPreview
                  title={formData.title}
                  description={formData.description}
                  url={formData.canonical}
                />
              )}

              {previewTab === 'social' && (
                <SocialPreview
                  title={formData.title}
                  description={formData.description}
                  url={formData.canonical}
                  image={formData.ogImage}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}