import { useState, useEffect } from 'react';
import { Share2, Save, Loader2, Facebook, Twitter, Linkedin, Eye } from 'lucide-react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { SocialPreview } from '../SocialPreview';

export function SocialMetaPanel() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
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
      }
    } catch (error) {
      console.error('Error loading settings:', error);
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
          body: JSON.stringify(settings)
        }
      );

      const result = await response.json();

      if (result.success) {
        alert('✅ Social meta settings saved successfully!');
        setSettings(result.settings);
      } else {
        alert('❌ Error: ' + result.error);
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('❌ Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setSettings((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-yellow-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[20px] font-bold text-white">Social Meta Management</h2>
          <p className="text-[13px] text-white/60 mt-1">
            Manage Open Graph and Twitter Card settings for social sharing
          </p>
        </div>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors text-[14px]"
        >
          <Eye className="w-4 h-4" />
          {showPreview ? 'Hide' : 'Show'} Preview
        </button>
      </div>

      {/* Preview */}
      {showPreview && (
        <div className="glass p-6 rounded-xl border border-white/10">
          <h3 className="text-[16px] font-semibold text-white mb-4">Live Preview</h3>
          <SocialPreview
            title={settings?.defaultTitle || 'Your Page Title'}
            description={settings?.defaultDescription || 'Your page description'}
            image={settings?.defaultOgImage || ''}
            url="https://yoursite.com/page"
          />
        </div>
      )}

      {/* Open Graph Settings */}
      <div className="glass p-6 rounded-xl border border-white/10">
        <h3 className="text-[16px] font-semibold text-white mb-4 flex items-center gap-2">
          <Facebook className="w-5 h-5 text-blue-500" />
          Open Graph (Facebook, LinkedIn)
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-[14px] font-medium text-white/70 mb-2">
              Default OG Title
            </label>
            <input
              type="text"
              value={settings?.defaultOgTitle || settings?.defaultTitle || ''}
              onChange={(e) => updateField('defaultOgTitle', e.target.value)}
              placeholder="Your Site Name | Tagline"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
            />
            <div className="text-[12px] text-white/50 mt-1">
              Recommended: 60-90 characters
            </div>
          </div>

          <div>
            <label className="block text-[14px] font-medium text-white/70 mb-2">
              Default OG Description
            </label>
            <textarea
              value={settings?.defaultOgDescription || settings?.defaultDescription || ''}
              onChange={(e) => updateField('defaultOgDescription', e.target.value)}
              placeholder="A brief description of your site"
              rows={3}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors resize-none"
            />
            <div className="text-[12px] text-white/50 mt-1">
              Recommended: 150-200 characters
            </div>
          </div>

          <div>
            <label className="block text-[14px] font-medium text-white/70 mb-2">
              Default OG Image URL
            </label>
            <input
              type="url"
              value={settings?.defaultOgImage || ''}
              onChange={(e) => updateField('defaultOgImage', e.target.value)}
              placeholder="https://yoursite.com/og-image.jpg"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
            />
            <div className="text-[12px] text-white/50 mt-1">
              Recommended: 1200x630px, max 8MB
            </div>
          </div>

          <div>
            <label className="block text-[14px] font-medium text-white/70 mb-2">
              OG Type
            </label>
            <select
              value={settings?.ogType || 'website'}
              onChange={(e) => updateField('ogType', e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white focus:outline-none focus:border-yellow-500 transition-colors"
            >
              <option value="website">Website</option>
              <option value="article">Article</option>
              <option value="product">Product</option>
              <option value="profile">Profile</option>
            </select>
          </div>
        </div>
      </div>

      {/* Twitter Card Settings */}
      <div className="glass p-6 rounded-xl border border-white/10">
        <h3 className="text-[16px] font-semibold text-white mb-4 flex items-center gap-2">
          <Twitter className="w-5 h-5 text-sky-500" />
          Twitter Card Settings
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-[14px] font-medium text-white/70 mb-2">
              Twitter Card Type
            </label>
            <select
              value={settings?.twitterCard || 'summary_large_image'}
              onChange={(e) => updateField('twitterCard', e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white focus:outline-none focus:border-yellow-500 transition-colors"
            >
              <option value="summary">Summary</option>
              <option value="summary_large_image">Summary Large Image</option>
              <option value="player">Player</option>
              <option value="app">App</option>
            </select>
          </div>

          <div>
            <label className="block text-[14px] font-medium text-white/70 mb-2">
              Twitter Handle
            </label>
            <input
              type="text"
              value={settings?.twitterHandle || ''}
              onChange={(e) => updateField('twitterHandle', e.target.value)}
              placeholder="@yourusername"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
            />
            <div className="text-[12px] text-white/50 mt-1">
              Your Twitter/X username (with @)
            </div>
          </div>

          <div>
            <label className="block text-[14px] font-medium text-white/70 mb-2">
              Twitter Site
            </label>
            <input
              type="text"
              value={settings?.twitterSite || ''}
              onChange={(e) => updateField('twitterSite', e.target.value)}
              placeholder="@yourbrand"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
            />
            <div className="text-[12px] text-white/50 mt-1">
              The Twitter handle of your site
            </div>
          </div>
        </div>
      </div>

      {/* Facebook Settings */}
      <div className="glass p-6 rounded-xl border border-white/10">
        <h3 className="text-[16px] font-semibold text-white mb-4 flex items-center gap-2">
          <Facebook className="w-5 h-5 text-blue-600" />
          Facebook Settings
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-[14px] font-medium text-white/70 mb-2">
              Facebook App ID
            </label>
            <input
              type="text"
              value={settings?.fbAppId || ''}
              onChange={(e) => updateField('fbAppId', e.target.value)}
              placeholder="123456789012345"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
            />
            <div className="text-[12px] text-white/50 mt-1">
              Optional: Facebook App ID for analytics
            </div>
          </div>

          <div>
            <label className="block text-[14px] font-medium text-white/70 mb-2">
              Facebook Admins
            </label>
            <input
              type="text"
              value={settings?.fbAdmins || ''}
              onChange={(e) => updateField('fbAdmins', e.target.value)}
              placeholder="Comma-separated Facebook user IDs"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
            />
            <div className="text-[12px] text-white/50 mt-1">
              Optional: Admin user IDs for moderation
            </div>
          </div>
        </div>
      </div>

      {/* Additional Settings */}
      <div className="glass p-6 rounded-xl border border-white/10">
        <h3 className="text-[16px] font-semibold text-white mb-4">Additional Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-[14px] font-medium text-white/70 mb-2">
              Locale
            </label>
            <input
              type="text"
              value={settings?.locale || 'en_US'}
              onChange={(e) => updateField('locale', e.target.value)}
              placeholder="en_US"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[14px] font-medium text-white/70 mb-2">
              Site Name
            </label>
            <input
              type="text"
              value={settings?.siteName || ''}
              onChange={(e) => updateField('siteName', e.target.value)}
              placeholder="Your Site Name"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold text-[15px] hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save Social Settings
            </>
          )}
        </button>
      </div>

      {/* Help Section */}
      <div className="glass p-6 rounded-xl border border-white/10">
        <h3 className="text-[16px] font-semibold text-white mb-3">Testing & Validation</h3>
        <div className="space-y-2 text-[14px] text-white/70">
          <p>
            ✅ <strong>Facebook Debugger:</strong>{' '}
            <a
              href="https://developers.facebook.com/tools/debug/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-500 hover:text-yellow-400"
            >
              Test your OG tags
            </a>
          </p>
          <p>
            ✅ <strong>Twitter Card Validator:</strong>{' '}
            <a
              href="https://cards-dev.twitter.com/validator"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-500 hover:text-yellow-400"
            >
              Test your Twitter cards
            </a>
          </p>
          <p>
            ✅ <strong>LinkedIn Post Inspector:</strong>{' '}
            <a
              href="https://www.linkedin.com/post-inspector/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-500 hover:text-yellow-400"
            >
              Test LinkedIn sharing
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
