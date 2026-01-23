import { useState, useEffect } from 'react';
import { Save, RotateCcw, CheckCircle, Loader2 } from 'lucide-react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

export function GlobalSEOPanel() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<any>(null);
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/seo-system/global`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      const result = await response.json();

      if (result.success) {
        setSettings(result.settings);
        setFormData(result.settings);
      }
    } catch (error) {
      console.error('Error loading global SEO:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/seo-system/global`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        }
      );

      const result = await response.json();

      if (result.success) {
        alert('✅ Global SEO saved successfully!');
        // Reload to get fresh data
        await loadSettings();
      } else {
        alert('❌ Error saving: ' + (result.error || 'Save failed'));
      }
    } catch (error) {
      console.error('Error saving global SEO:', error);
      alert('❌ Failed to save: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-yellow-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <h2 className="text-[20px] font-bold text-white">Global SEO Settings</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={loadSettings}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={handleSave}
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

      {/* Default Meta Configuration */}
      <div className="space-y-4">
        <h3 className="text-[18px] font-bold text-white">Default Meta Configuration</h3>
        
        <div>
          <label className="block text-[14px] font-medium text-white mb-2">
            Default Title Template
          </label>
          <input
            type="text"
            value={formData?.defaultTitle || ''}
            onChange={(e) => setFormData({ ...formData, defaultTitle: e.target.value })}
            placeholder="Your Site Name | Tagline"
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500"
          />
          <p className="text-[12px] text-white/60 mt-1">
            {formData?.defaultTitle?.length || 0} characters (30-60 recommended)
          </p>
        </div>

        <div>
          <label className="block text-[14px] font-medium text-white mb-2">
            Default Meta Description
          </label>
          <textarea
            value={formData?.defaultDescription || ''}
            onChange={(e) => setFormData({ ...formData, defaultDescription: e.target.value })}
            placeholder="Describe your website..."
            rows={3}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 resize-none"
          />
          <p className="text-[12px] text-white/60 mt-1">
            {formData?.defaultDescription?.length || 0} characters (120-160 recommended)
          </p>
        </div>

        <div>
          <label className="block text-[14px] font-medium text-white mb-2">
            Default Keywords (comma-separated)
          </label>
          <input
            type="text"
            value={formData?.defaultKeywords || ''}
            onChange={(e) => setFormData({ ...formData, defaultKeywords: e.target.value })}
            placeholder="keyword1, keyword2, keyword3"
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[14px] font-medium text-white mb-2">
              Title Separator
            </label>
            <select
              value={formData?.titleSeparator || '|'}
              onChange={(e) => setFormData({ ...formData, titleSeparator: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-yellow-500"
            >
              <option value="|">Pipe (|)</option>
              <option value="-">Dash (-)</option>
              <option value="–">En Dash (–)</option>
              <option value="—">Em Dash (—)</option>
              <option value="·">Middot (·)</option>
              <option value="•">Bullet (•)</option>
            </select>
          </div>

          <div>
            <label className="block text-[14px] font-medium text-white mb-2">
              Canonical Base URL
            </label>
            <input
              type="url"
              value={formData?.canonicalBaseUrl || ''}
              onChange={(e) => setFormData({ ...formData, canonicalBaseUrl: e.target.value })}
              placeholder="https://www.yourdomain.com"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500"
            />
          </div>
        </div>
      </div>

      {/* Homepage Override */}
      <div className="space-y-4 pt-6 border-t border-white/10">
        <h3 className="text-[18px] font-bold text-white">Homepage SEO Override</h3>
        
        <div>
          <label className="block text-[14px] font-medium text-white mb-2">
            Homepage Title
          </label>
          <input
            type="text"
            value={formData?.homepageTitle || ''}
            onChange={(e) => setFormData({ ...formData, homepageTitle: e.target.value })}
            placeholder="Best Digital Marketing Agency | Your Brand"
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500"
          />
        </div>

        <div>
          <label className="block text-[14px] font-medium text-white mb-2">
            Homepage Description
          </label>
          <textarea
            value={formData?.homepageDescription || ''}
            onChange={(e) => setFormData({ ...formData, homepageDescription: e.target.value })}
            placeholder="Homepage-specific description..."
            rows={2}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 resize-none"
          />
        </div>
      </div>

      {/* Indexing Controls */}
      <div className="space-y-4 pt-6 border-t border-white/10">
        <h3 className="text-[18px] font-bold text-white">Indexing & Robot Controls</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center gap-3 p-4 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
            <input
              type="checkbox"
              checked={formData?.globalIndex || false}
              onChange={(e) => setFormData({ ...formData, globalIndex: e.target.checked })}
              className="w-4 h-4 rounded border-white/20 text-yellow-500 focus:ring-yellow-500"
            />
            <div>
              <p className="text-[14px] font-medium text-white">Global Index</p>
              <p className="text-[12px] text-white/60">Allow search engines to index site</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-4 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
            <input
              type="checkbox"
              checked={formData?.globalFollow || false}
              onChange={(e) => setFormData({ ...formData, globalFollow: e.target.checked })}
              className="w-4 h-4 rounded border-white/20 text-yellow-500 focus:ring-yellow-500"
            />
            <div>
              <p className="text-[14px] font-medium text-white">Global Follow</p>
              <p className="text-[12px] text-white/60">Allow following links</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-4 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
            <input
              type="checkbox"
              checked={formData?.indexCategories || false}
              onChange={(e) => setFormData({ ...formData, indexCategories: e.target.checked })}
              className="w-4 h-4 rounded border-white/20 text-yellow-500 focus:ring-yellow-500"
            />
            <div>
              <p className="text-[14px] font-medium text-white">Index Categories</p>
              <p className="text-[12px] text-white/60">Index category pages</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-4 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
            <input
              type="checkbox"
              checked={formData?.indexTags || false}
              onChange={(e) => setFormData({ ...formData, indexTags: e.target.checked })}
              className="w-4 h-4 rounded border-white/20 text-yellow-500 focus:ring-yellow-500"
            />
            <div>
              <p className="text-[14px] font-medium text-white">Index Tags</p>
              <p className="text-[12px] text-white/60">Index tag pages</p>
            </div>
          </label>
        </div>
      </div>

      {/* Search Engine Verification */}
      <div className="space-y-4 pt-6 border-t border-white/10">
        <h3 className="text-[18px] font-bold text-white">Search Engine Verification</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[14px] font-medium text-white mb-2">
              Google Search Console
            </label>
            <input
              type="text"
              value={formData?.googleSearchConsole || ''}
              onChange={(e) => setFormData({ ...formData, googleSearchConsole: e.target.value })}
              placeholder="google-site-verification-code"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="block text-[14px] font-medium text-white mb-2">
              Bing Webmaster Tools
            </label>
            <input
              type="text"
              value={formData?.bingWebmaster || ''}
              onChange={(e) => setFormData({ ...formData, bingWebmaster: e.target.value })}
              placeholder="bing-verification-code"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="block text-[14px] font-medium text-white mb-2">
              Facebook App ID
            </label>
            <input
              type="text"
              value={formData?.facebookAppId || ''}
              onChange={(e) => setFormData({ ...formData, facebookAppId: e.target.value })}
              placeholder="1234567890"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="block text-[14px] font-medium text-white mb-2">
              Pinterest Verification
            </label>
            <input
              type="text"
              value={formData?.pinterestVerification || ''}
              onChange={(e) => setFormData({ ...formData, pinterestVerification: e.target.value })}
              placeholder="pinterest-verification-code"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500"
            />
          </div>
        </div>
      </div>

      {/* Social Profiles */}
      <div className="space-y-4 pt-6 border-t border-white/10">
        <h3 className="text-[18px] font-bold text-white">Social Media Profiles</h3>
        <p className="text-[13px] text-white/60">Used for schema.org sameAs property</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[14px] font-medium text-white mb-2">
              Facebook URL
            </label>
            <input
              type="url"
              value={formData?.facebookUrl || ''}
              onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
              placeholder="https://facebook.com/yourpage"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="block text-[14px] font-medium text-white mb-2">
              Twitter/X URL
            </label>
            <input
              type="url"
              value={formData?.twitterUrl || ''}
              onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
              placeholder="https://twitter.com/yourhandle"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="block text-[14px] font-medium text-white mb-2">
              Instagram URL
            </label>
            <input
              type="url"
              value={formData?.instagramUrl || ''}
              onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
              placeholder="https://instagram.com/yourhandle"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="block text-[14px] font-medium text-white mb-2">
              LinkedIn URL
            </label>
            <input
              type="url"
              value={formData?.linkedinUrl || ''}
              onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
              placeholder="https://linkedin.com/company/yourcompany"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500"
            />
          </div>
        </div>
      </div>

      {/* Save Button (Bottom) */}
      <div className="pt-6 border-t border-white/10">
        <button
          onClick={handleSave}
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
              Save All Changes
            </>
          )}
        </button>
      </div>
    </div>
  );
}