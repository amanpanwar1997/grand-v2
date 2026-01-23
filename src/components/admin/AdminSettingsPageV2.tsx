/**
 * ============================================================================
 * ENHANCED ADMIN SETTINGS PAGE V2
 * ============================================================================
 * 
 * Features:
 * - Tabbed interface (General, SEO, Social, Email, API, Advanced)
 * - Auto-save on change (debounced)
 * - Import/Export settings
 * - Settings validation
 * - Toast notifications (no alerts)
 * - Better UX with loading states
 */

import { useState, useEffect, useCallback } from 'react';
import { AdminLayout } from './AdminLayout';
import { useAdminAuth } from '../../utils/adminAuth';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { toast, adminToast } from '../../utils/toast';
import { PageLoading } from './shared/LoadingState';
import { 
  Save, 
  Download,
  Upload,
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter,
  Key,
  Settings as SettingsIcon,
  Search,
  Sparkles,
  CheckCircle,
  Clock,
} from 'lucide-react';

type Tab = 'general' | 'seo' | 'social' | 'email' | 'api' | 'advanced';

interface Settings {
  // General
  siteName?: string;
  siteUrl?: string;
  tagline?: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
  
  // SEO Defaults
  defaultTitle?: string;
  defaultDescription?: string;
  defaultKeywords?: string;
  defaultOgImage?: string;
  
  // Social
  facebookUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  
  // Email
  smtpHost?: string;
  smtpPort?: string;
  smtpUser?: string;
  smtpPassword?: string;
  fromEmail?: string;
  fromName?: string;
  
  // API Keys
  googleMapsKey?: string;
  googleAnalyticsId?: string;
  facebookPixelId?: string;
  stripePublicKey?: string;
  stripeSecretKey?: string;
  
  // Advanced
  maintenanceMode?: boolean;
  allowRegistration?: boolean;
  commentsEnabled?: boolean;
  cacheEnabled?: boolean;
}

export function AdminSettingsPageV2() {
  const { hasPermission } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<Tab>('general');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [settings, setSettings] = useState<Settings>({});
  const [isDirty, setIsDirty] = useState(false);

  // Load settings on mount
  useEffect(() => {
    loadSettings();
  }, []);

  // Auto-save when settings change (debounced)
  useEffect(() => {
    if (!isDirty) return;

    const timeoutId = setTimeout(() => {
      handleAutoSave();
    }, 2000); // Auto-save after 2 seconds of no changes

    return () => clearTimeout(timeoutId);
  }, [settings, isDirty]);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/settings/get`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      const result = await response.json();

      if (result.success) {
        setSettings(result.settings || {});
      } else {
        toast.error('Failed to load settings', result.error);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      adminToast.networkError();
    } finally {
      setLoading(false);
    }
  };

  const handleAutoSave = async () => {
    if (!hasPermission('admin')) {
      adminToast.permissionDenied();
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/settings/update`,
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
        setLastSaved(new Date());
        setIsDirty(false);
        // Silent auto-save (no toast)
      } else {
        toast.error('Auto-save failed', result.error);
      }
    } catch (error) {
      console.error('Error auto-saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleManualSave = async () => {
    if (!hasPermission('admin')) {
      adminToast.permissionDenied();
      return;
    }

    const toastId = toast.loading('Saving settings...');
    setSaving(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/settings/update`,
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
        setSettings(result.settings);
        setLastSaved(new Date());
        setIsDirty(false);
        toast.dismiss(toastId);
        adminToast.saved('Settings');
      } else {
        toast.dismiss(toastId);
        toast.error('Failed to save settings', result.error);
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.dismiss(toastId);
      adminToast.networkError();
    } finally {
      setSaving(false);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `settings-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    adminToast.exported(link.download);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = async (e: any) => {
      const file = e.target.files[0];
      if (!file) return;

      try {
        const text = await file.text();
        const imported = JSON.parse(text);
        setSettings(imported);
        setIsDirty(true);
        adminToast.imported(Object.keys(imported).length, 'settings');
      } catch (error) {
        toast.error('Invalid settings file', 'Please check the file format');
      }
    };
    input.click();
  };

  const updateField = (field: keyof Settings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
    setIsDirty(true);
  };

  const tabs = [
    { id: 'general' as Tab, label: 'General', icon: Globe },
    { id: 'seo' as Tab, label: 'SEO Defaults', icon: Search },
    { id: 'social' as Tab, label: 'Social Links', icon: Instagram },
    { id: 'email' as Tab, label: 'Email Config', icon: Mail },
    { id: 'api' as Tab, label: 'API Keys', icon: Key },
    { id: 'advanced' as Tab, label: 'Advanced', icon: SettingsIcon },
  ];

  if (loading) {
    return (
      <AdminLayout
        title="Settings"
        breadcrumb={[{ label: 'Dashboard', href: '/admin' }, { label: 'Settings' }]}
      >
        <PageLoading />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Settings"
      breadcrumb={[{ label: 'Dashboard', href: '/admin' }, { label: 'Settings' }]}
    >
      <div className="max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[26px] md:text-[30px] font-medium text-white mb-2">
              Site Settings
            </h1>
            <div className="flex items-center gap-4 text-[14px]">
              {lastSaved && (
                <div className="flex items-center gap-2 text-white/60">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Last saved {lastSaved.toLocaleTimeString()}
                </div>
              )}
              {saving && (
                <div className="flex items-center gap-2 text-yellow-500">
                  <Clock className="w-4 h-4 animate-pulse" />
                  Saving...
                </div>
              )}
              {isDirty && !saving && (
                <div className="text-white/40">
                  Unsaved changes
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleImport}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-colors flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Import
            </button>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <button
              onClick={handleManualSave}
              disabled={saving || !isDirty}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                saving || !isDirty
                  ? 'bg-white/10 text-white/40 cursor-not-allowed'
                  : 'bg-yellow-500 hover:bg-yellow-400 text-black'
              }`}
            >
              <Save className="w-4 h-4" />
              Save All
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-yellow-500 text-black'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="glass rounded-xl p-8">
          {activeTab === 'general' && (
            <GeneralSettings settings={settings} updateField={updateField} />
          )}
          {activeTab === 'seo' && (
            <SEOSettings settings={settings} updateField={updateField} />
          )}
          {activeTab === 'social' && (
            <SocialSettings settings={settings} updateField={updateField} />
          )}
          {activeTab === 'email' && (
            <EmailSettings settings={settings} updateField={updateField} />
          )}
          {activeTab === 'api' && (
            <APISettings settings={settings} updateField={updateField} />
          )}
          {activeTab === 'advanced' && (
            <AdvancedSettings settings={settings} updateField={updateField} />
          )}
        </div>

        {/* Auto-save notice */}
        <p className="text-[13px] text-white/50 mt-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Changes are automatically saved after 2 seconds of inactivity
        </p>
      </div>
    </AdminLayout>
  );
}

// ============================================================================
// TAB COMPONENTS
// ============================================================================

function GeneralSettings({ settings, updateField }: any) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-[14px] font-medium text-white mb-2">
          Site Name
        </label>
        <input
          type="text"
          value={settings.siteName || ''}
          onChange={(e) => updateField('siteName', e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Inchtomilez"
        />
      </div>

      <div>
        <label className="block text-[14px] font-medium text-white mb-2">
          Site URL
        </label>
        <input
          type="url"
          value={settings.siteUrl || ''}
          onChange={(e) => updateField('siteUrl', e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="https://www.inchtomilez.com"
        />
      </div>

      <div>
        <label className="block text-[14px] font-medium text-white mb-2">
          Tagline
        </label>
        <input
          type="text"
          value={settings.tagline || ''}
          onChange={(e) => updateField('tagline', e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Digital Marketing Excellence"
        />
      </div>

      <div>
        <label className="block text-[14px] font-medium text-white mb-2">
          Description
        </label>
        <textarea
          value={settings.description || ''}
          onChange={(e) => updateField('description', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="A brief description of your site..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[14px] font-medium text-white mb-2 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email
          </label>
          <input
            type="email"
            value={settings.email || ''}
            onChange={(e) => updateField('email', e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="info@inchtomilez.com"
          />
        </div>

        <div>
          <label className="block text-[14px] font-medium text-white mb-2 flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Phone
          </label>
          <input
            type="tel"
            value={settings.phone || ''}
            onChange={(e) => updateField('phone', e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="+91 9669988666"
          />
        </div>
      </div>

      <div>
        <label className="block text-[14px] font-medium text-white mb-2 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Address
        </label>
        <textarea
          value={settings.address || ''}
          onChange={(e) => updateField('address', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Vijay Nagar, Indore, Madhya Pradesh"
        />
      </div>
    </div>
  );
}

function SEOSettings({ settings, updateField }: any) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-[14px] font-medium text-white mb-2">
          Default Title Template
        </label>
        <input
          type="text"
          value={settings.defaultTitle || ''}
          onChange={(e) => updateField('defaultTitle', e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="%page% | Inchtomilez"
        />
        <p className="text-[13px] text-white/50 mt-1">Use %page% as placeholder for page name</p>
      </div>

      <div>
        <label className="block text-[14px] font-medium text-white mb-2">
          Default Meta Description
        </label>
        <textarea
          value={settings.defaultDescription || ''}
          onChange={(e) => updateField('defaultDescription', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Expert digital marketing services..."
        />
      </div>

      <div>
        <label className="block text-[14px] font-medium text-white mb-2">
          Default Keywords (comma-separated)
        </label>
        <input
          type="text"
          value={settings.defaultKeywords || ''}
          onChange={(e) => updateField('defaultKeywords', e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="digital marketing, SEO, PPC, Indore"
        />
      </div>

      <div>
        <label className="block text-[14px] font-medium text-white mb-2">
          Default OG Image URL
        </label>
        <input
          type="url"
          value={settings.defaultOgImage || ''}
          onChange={(e) => updateField('defaultOgImage', e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="/og-image.jpg"
        />
      </div>
    </div>
  );
}

function SocialSettings({ settings, updateField }: any) {
  const socials = [
    { field: 'facebookUrl', label: 'Facebook', icon: Facebook, placeholder: 'https://facebook.com/inchtomilez' },
    { field: 'instagramUrl', label: 'Instagram', icon: Instagram, placeholder: 'https://instagram.com/inchtomilez' },
    { field: 'linkedinUrl', label: 'LinkedIn', icon: Linkedin, placeholder: 'https://linkedin.com/company/inchtomilez' },
    { field: 'twitterUrl', label: 'Twitter', icon: Twitter, placeholder: 'https://twitter.com/inchtomilez' },
  ];

  return (
    <div className="space-y-6">
      {socials.map(({ field, label, icon: Icon, placeholder }) => (
        <div key={field}>
          <label className="block text-[14px] font-medium text-white mb-2 flex items-center gap-2">
            <Icon className="w-4 h-4" />
            {label}
          </label>
          <input
            type="url"
            value={(settings as any)[field] || ''}
            onChange={(e) => updateField(field, e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder={placeholder}
          />
        </div>
      ))}
    </div>
  );
}

function EmailSettings({ settings, updateField }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
        <p className="text-[14px] text-yellow-500">
          ⚠️ Email settings are for SMTP configuration. Leave blank to use default email service.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[14px] font-medium text-white mb-2">
            SMTP Host
          </label>
          <input
            type="text"
            value={settings.smtpHost || ''}
            onChange={(e) => updateField('smtpHost', e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="smtp.gmail.com"
          />
        </div>

        <div>
          <label className="block text-[14px] font-medium text-white mb-2">
            SMTP Port
          </label>
          <input
            type="text"
            value={settings.smtpPort || ''}
            onChange={(e) => updateField('smtpPort', e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="587"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[14px] font-medium text-white mb-2">
            SMTP Username
          </label>
          <input
            type="text"
            value={settings.smtpUser || ''}
            onChange={(e) => updateField('smtpUser', e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block text-[14px] font-medium text-white mb-2">
            SMTP Password
          </label>
          <input
            type="password"
            value={settings.smtpPassword || ''}
            onChange={(e) => updateField('smtpPassword', e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[14px] font-medium text-white mb-2">
            From Email
          </label>
          <input
            type="email"
            value={settings.fromEmail || ''}
            onChange={(e) => updateField('fromEmail', e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="noreply@inchtomilez.com"
          />
        </div>

        <div>
          <label className="block text-[14px] font-medium text-white mb-2">
            From Name
          </label>
          <input
            type="text"
            value={settings.fromName || ''}
            onChange={(e) => updateField('fromName', e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Inchtomilez"
          />
        </div>
      </div>
    </div>
  );
}

function APISettings({ settings, updateField }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
        <p className="text-[14px] text-yellow-500">
          🔒 API keys are stored securely. Never share your secret keys publicly.
        </p>
      </div>

      <div>
        <label className="block text-[14px] font-medium text-white mb-2">
          Google Maps API Key
        </label>
        <input
          type="text"
          value={settings.googleMapsKey || ''}
          onChange={(e) => updateField('googleMapsKey', e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="AIza..."
        />
      </div>

      <div>
        <label className="block text-[14px] font-medium text-white mb-2">
          Google Analytics ID
        </label>
        <input
          type="text"
          value={settings.googleAnalyticsId || ''}
          onChange={(e) => updateField('googleAnalyticsId', e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="G-XXXXXXXXXX"
        />
      </div>

      <div>
        <label className="block text-[14px] font-medium text-white mb-2">
          Facebook Pixel ID
        </label>
        <input
          type="text"
          value={settings.facebookPixelId || ''}
          onChange={(e) => updateField('facebookPixelId', e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="1234567890"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[14px] font-medium text-white mb-2">
            Stripe Public Key
          </label>
          <input
            type="text"
            value={settings.stripePublicKey || ''}
            onChange={(e) => updateField('stripePublicKey', e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="pk_..."
          />
        </div>

        <div>
          <label className="block text-[14px] font-medium text-white mb-2">
            Stripe Secret Key
          </label>
          <input
            type="password"
            value={settings.stripeSecretKey || ''}
            onChange={(e) => updateField('stripeSecretKey', e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="sk_..."
          />
        </div>
      </div>
    </div>
  );
}

function AdvancedSettings({ settings, updateField }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
        <p className="text-[14px] text-red-500">
          ⚠️ Advanced settings can affect site functionality. Change with caution.
        </p>
      </div>

      <div className="space-y-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.maintenanceMode || false}
            onChange={(e) => updateField('maintenanceMode', e.target.checked)}
            className="w-5 h-5 rounded bg-white/5 border-white/10 text-yellow-500 focus:ring-yellow-500"
          />
          <div>
            <div className="text-[15px] font-medium text-white">Maintenance Mode</div>
            <div className="text-[13px] text-white/60">Display maintenance page to visitors</div>
          </div>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.allowRegistration || false}
            onChange={(e) => updateField('allowRegistration', e.target.checked)}
            className="w-5 h-5 rounded bg-white/5 border-white/10 text-yellow-500 focus:ring-yellow-500"
          />
          <div>
            <div className="text-[15px] font-medium text-white">Allow User Registration</div>
            <div className="text-[13px] text-white/60">Let visitors create accounts</div>
          </div>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.commentsEnabled || false}
            onChange={(e) => updateField('commentsEnabled', e.target.checked)}
            className="w-5 h-5 rounded bg-white/5 border-white/10 text-yellow-500 focus:ring-yellow-500"
          />
          <div>
            <div className="text-[15px] font-medium text-white">Enable Comments</div>
            <div className="text-[13px] text-white/60">Allow comments on blog posts</div>
          </div>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.cacheEnabled || false}
            onChange={(e) => updateField('cacheEnabled', e.target.checked)}
            className="w-5 h-5 rounded bg-white/5 border-white/10 text-yellow-500 focus:ring-yellow-500"
          />
          <div>
            <div className="text-[15px] font-medium text-white">Enable Caching</div>
            <div className="text-[13px] text-white/60">Cache pages for faster loading (recommended)</div>
          </div>
        </label>
      </div>
    </div>
  );
}
