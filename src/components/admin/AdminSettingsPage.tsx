import { useState, useEffect } from 'react';
import { AdminLayout } from './AdminLayout';
import { useAdminAuth } from '../../utils/adminAuth';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { 
  Save, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter,
  Loader2,
  RotateCcw,
  CheckCircle
} from 'lucide-react';

export function AdminSettingsPage() {
  const { hasPermission } = useAdminAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    loadSettings();
  }, []);

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
        setSettings(result.settings);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!hasPermission('admin')) {
      alert('You do not have permission to update settings');
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
        alert('✅ Settings saved successfully!');
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

  const handleReset = async () => {
    if (!confirm('Are you sure you want to reset all settings to default?')) return;

    setSaving(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/settings/reset`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      const result = await response.json();

      if (result.success) {
        alert('✅ Settings reset to default!');
        setSettings(result.settings);
      } else {
        alert('❌ Error: ' + result.error);
      }
    } catch (error) {
      console.error('Error resetting settings:', error);
      alert('❌ Error resetting settings');
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
      <AdminLayout
        title="Settings"
        breadcrumb={[{ label: 'Dashboard', href: '/admin' }, { label: 'Settings' }]}
      >
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-yellow-500 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Settings"
      breadcrumb={[{ label: 'Dashboard', href: '/admin' }, { label: 'Settings' }]}
    >
      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[26px] md:text-[30px] font-medium text-white mb-2">General Settings</h1>
            <p className="text-[15px] text-white/70">
              Manage site information, contact details, and social media links
            </p>
          </div>

          {settings?.updatedAt && (
            <div className="text-[13px] text-white/60">
              Last updated: {new Date(settings.updatedAt).toLocaleString()}
            </div>
          )}
        </div>

        <div className="space-y-6">
          {/* Site Info */}
          <div className="glass p-6 rounded-xl border border-white/10">
            <h3 className="text-[18px] font-medium text-white mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-yellow-500" />
              Site Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[14px] font-medium text-white/70 mb-2">Site Name *</label>
                <input
                  type="text"
                  value={settings?.siteName || ''}
                  onChange={(e) => updateField('siteName', e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-white/70 mb-2">Tagline</label>
                <input
                  type="text"
                  value={settings?.tagline || ''}
                  onChange={(e) => updateField('tagline', e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-white/70 mb-2">Description</label>
                <textarea
                  value={settings?.description || ''}
                  onChange={(e) => updateField('description', e.target.value)}
                  rows={3}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors resize-none"
                />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="glass p-6 rounded-xl border border-white/10">
            <h3 className="text-[18px] font-medium text-white mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-yellow-500" />
              Contact Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[14px] font-medium text-white/70 mb-2">Contact Email *</label>
                <input
                  type="email"
                  value={settings?.contactEmail || ''}
                  onChange={(e) => updateField('contactEmail', e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-white/70 mb-2">Support Email</label>
                <input
                  type="email"
                  value={settings?.supportEmail || ''}
                  onChange={(e) => updateField('supportEmail', e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-white/70 mb-2">Phone</label>
                <input
                  type="tel"
                  value={settings?.contactPhone || ''}
                  onChange={(e) => updateField('contactPhone', e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-white/70 mb-2">WhatsApp</label>
                <input
                  type="tel"
                  value={settings?.whatsapp || ''}
                  onChange={(e) => updateField('whatsapp', e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-white/70 mb-2">Address</label>
                <input
                  type="text"
                  value={settings?.address || ''}
                  onChange={(e) => updateField('address', e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="glass p-6 rounded-xl border border-white/10">
            <h3 className="text-[18px] font-medium text-white mb-4">Social Media Links</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[14px] font-medium text-white/70 mb-2 flex items-center gap-2">
                  <Facebook className="w-4 h-4" />
                  Facebook
                </label>
                <input
                  type="url"
                  value={settings?.facebook || ''}
                  onChange={(e) => updateField('facebook', e.target.value)}
                  placeholder="https://facebook.com/..."
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-white/70 mb-2 flex items-center gap-2">
                  <Instagram className="w-4 h-4" />
                  Instagram
                </label>
                <input
                  type="url"
                  value={settings?.instagram || ''}
                  onChange={(e) => updateField('instagram', e.target.value)}
                  placeholder="https://instagram.com/..."
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-white/70 mb-2 flex items-center gap-2">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={settings?.linkedin || ''}
                  onChange={(e) => updateField('linkedin', e.target.value)}
                  placeholder="https://linkedin.com/company/..."
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-white/70 mb-2 flex items-center gap-2">
                  <Twitter className="w-4 h-4" />
                  Twitter
                </label>
                <input
                  type="url"
                  value={settings?.twitter || ''}
                  onChange={(e) => updateField('twitter', e.target.value)}
                  placeholder="https://twitter.com/..."
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Business Info */}
          <div className="glass p-6 rounded-xl border border-white/10">
            <h3 className="text-[18px] font-medium text-white mb-4">Business Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[14px] font-medium text-white/70 mb-2">Business Type</label>
                <input
                  type="text"
                  value={settings?.businessType || ''}
                  onChange={(e) => updateField('businessType', e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-white/70 mb-2">Founded Year</label>
                <input
                  type="text"
                  value={settings?.foundedYear || ''}
                  onChange={(e) => updateField('foundedYear', e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-white/70 mb-2">Employee Count</label>
                <input
                  type="text"
                  value={settings?.employeeCount || ''}
                  onChange={(e) => updateField('employeeCount', e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-white/70 mb-2">Brand Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={settings?.brandColor || '#eab308'}
                    onChange={(e) => updateField('brandColor', e.target.value)}
                    className="w-16 h-12 bg-black/50 border border-white/10 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings?.brandColor || ''}
                    onChange={(e) => updateField('brandColor', e.target.value)}
                    className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleReset}
              disabled={saving || !hasPermission('admin')}
              className="flex items-center gap-2 bg-white/5 text-white px-6 py-3 rounded-lg font-semibold text-[15px] hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RotateCcw className="w-5 h-5" />
              Reset to Default
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !hasPermission('admin')}
              className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold text-[15px] hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Settings
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
