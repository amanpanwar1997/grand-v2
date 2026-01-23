/**
 * REDIRECTS PANEL V2 - FULLY FUNCTIONAL
 * Complete redirect management with backend integration
 */

import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import {
  ArrowRight,
  Plus,
  Edit,
  Trash2,
  Search,
  Download,
  Upload,
  TrendingUp,
  Loader2,
  Save,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface Redirect {
  id: string;
  sourceUrl: string;
  targetUrl: string;
  type: 301 | 302 | 307;
  hits: number;
  enabled: boolean;
  createdAt: string;
  createdBy: string;
}

export function RedirectsPanelV2() {
  const [redirects, setRedirects] = useState<Redirect[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    sourceUrl: '',
    targetUrl: '',
    type: 301 as 301 | 302 | 307,
    enabled: true
  });

  useEffect(() => {
    loadRedirects();
  }, []);

  const loadRedirects = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/seo-system/redirects`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      const result = await response.json();

      if (result.success) {
        setRedirects(result.redirects || []);
      }
    } catch (error) {
      console.error('Error loading redirects:', error);
      alert('❌ Error loading redirects. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!formData.sourceUrl || !formData.targetUrl) {
      alert('❌ Source and target URLs are required');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/seo-system/redirect/create`,
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
        alert('✅ Redirect created successfully!');
        setCreating(false);
        resetForm();
        loadRedirects();
      } else {
        alert('❌ Error: ' + result.error);
      }
    } catch (error) {
      console.error('Error creating redirect:', error);
      alert('❌ Error creating redirect');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (id: string) => {
    setSaving(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/seo-system/redirect/update`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id, ...formData })
        }
      );

      const result = await response.json();

      if (result.success) {
        alert('✅ Redirect updated successfully!');
        setEditing(null);
        resetForm();
        loadRedirects();
      } else {
        alert('❌ Error: ' + result.error);
      }
    } catch (error) {
      console.error('Error updating redirect:', error);
      alert('❌ Error updating redirect');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this redirect?')) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/seo-system/redirect/delete`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id })
        }
      );

      const result = await response.json();

      if (result.success) {
        alert('✅ Redirect deleted successfully!');
        loadRedirects();
      } else {
        alert('❌ Error: ' + result.error);
      }
    } catch (error) {
      console.error('Error deleting redirect:', error);
      alert('❌ Error deleting redirect');
    }
  };

  const handleToggle = async (id: string, enabled: boolean) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/seo-system/redirect/toggle`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id, enabled })
        }
      );

      const result = await response.json();

      if (result.success) {
        loadRedirects();
      } else {
        alert('❌ Error: ' + result.error);
      }
    } catch (error) {
      console.error('Error toggling redirect:', error);
      alert('❌ Error toggling redirect');
    }
  };

  const resetForm = () => {
    setFormData({
      sourceUrl: '',
      targetUrl: '',
      type: 301,
      enabled: true
    });
  };

  const startEdit = (redirect: Redirect) => {
    setEditing(redirect.id);
    setFormData({
      sourceUrl: redirect.sourceUrl,
      targetUrl: redirect.targetUrl,
      type: redirect.type,
      enabled: redirect.enabled
    });
  };

  const cancelEdit = () => {
    setEditing(null);
    setCreating(false);
    resetForm();
  };

  const exportCSV = () => {
    const csv = [
      'Source URL,Target URL,Type,Hits,Enabled,Created',
      ...redirects.map(r =>
        `${r.sourceUrl},${r.targetUrl},${r.type},${r.hits},${r.enabled},${r.createdAt}`
      )
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'redirects.csv';
    a.click();
  };

  const filteredRedirects = redirects.filter(r =>
    r.sourceUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.targetUrl.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-yellow-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[20px] font-bold text-white">Redirect Manager</h2>
          <p className="text-[13px] text-white/60 mt-1">
            Manage 301/302/307 redirects ({redirects.length} total)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={exportCSV}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          <button
            onClick={() => setCreating(true)}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Redirect
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="glass p-4 rounded-lg">
          <div className="text-[24px] font-bold text-white">{redirects.length}</div>
          <div className="text-[12px] text-white/60">Total Redirects</div>
        </div>
        <div className="glass p-4 rounded-lg">
          <div className="text-[24px] font-bold text-green-500">
            {redirects.filter(r => r.enabled).length}
          </div>
          <div className="text-[12px] text-white/60">Active</div>
        </div>
        <div className="glass p-4 rounded-lg">
          <div className="text-[24px] font-bold text-white/40">
            {redirects.filter(r => !r.enabled).length}
          </div>
          <div className="text-[12px] text-white/60">Disabled</div>
        </div>
        <div className="glass p-4 rounded-lg">
          <div className="text-[24px] font-bold text-yellow-500">
            {redirects.reduce((sum, r) => sum + r.hits, 0)}
          </div>
          <div className="text-[12px] text-white/60">Total Hits</div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search redirects..."
          className="w-full bg-white/5 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
        />
      </div>

      {/* Create/Edit Form */}
      {(creating || editing) && (
        <div className="glass p-6 rounded-xl border-2 border-yellow-500/20">
          <h3 className="text-[18px] font-medium text-white mb-4">
            {creating ? 'Create New Redirect' : 'Edit Redirect'}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[14px] font-medium text-white mb-2">
                Source URL
              </label>
              <input
                type="text"
                value={formData.sourceUrl}
                onChange={(e) => setFormData({ ...formData, sourceUrl: e.target.value })}
                placeholder="/old-page"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block text-[14px] font-medium text-white mb-2">
                Target URL
              </label>
              <input
                type="text"
                value={formData.targetUrl}
                onChange={(e) => setFormData({ ...formData, targetUrl: e.target.value })}
                placeholder="/new-page"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label className="block text-[14px] font-medium text-white mb-2">
                Redirect Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: parseInt(e.target.value) as any })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="301">301 - Permanent</option>
                <option value="302">302 - Temporary</option>
                <option value="307">307 - Temporary (Preserve Method)</option>
              </select>
            </div>

            <label className="flex items-center gap-2 text-[14px] text-white">
              <input
                type="checkbox"
                checked={formData.enabled}
                onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                className="rounded bg-white/5 border-white/10 text-yellow-500"
              />
              Enabled
            </label>

            <div className="flex items-center gap-3 pt-4">
              <button
                onClick={creating ? handleCreate : () => handleUpdate(editing!)}
                disabled={saving}
                className="flex-1 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saving ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                ) : (
                  <><Save className="w-4 h-4" /> {creating ? 'Create' : 'Update'}</>
                )}
              </button>
              <button
                onClick={cancelEdit}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Redirects List */}
      {filteredRedirects.length === 0 ? (
        <div className="glass p-12 rounded-xl text-center">
          <AlertCircle className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <h3 className="text-[18px] font-medium text-white mb-2">No redirects found</h3>
          <p className="text-[14px] text-white/60 mb-6">
            {searchQuery ? 'Try a different search query' : 'Create your first redirect to get started'}
          </p>
          {!searchQuery && (
            <button
              onClick={() => setCreating(true)}
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg font-semibold transition-colors"
            >
              Create Redirect
            </button>
          )}
        </div>
      ) : (
        <div className="glass rounded-xl border border-white/10 overflow-hidden">
          <table className="w-full">
            <thead className="bg-black/30 border-b border-white/10">
              <tr>
                <th className="text-left p-4 text-[13px] font-semibold text-white/70">SOURCE</th>
                <th className="text-left p-4 text-[13px] font-semibold text-white/70">TARGET</th>
                <th className="text-center p-4 text-[13px] font-semibold text-white/70">TYPE</th>
                <th className="text-center p-4 text-[13px] font-semibold text-white/70">HITS</th>
                <th className="text-center p-4 text-[13px] font-semibold text-white/70">STATUS</th>
                <th className="text-center p-4 text-[13px] font-semibold text-white/70">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredRedirects.map((redirect) => (
                <tr
                  key={redirect.id}
                  className="border-b border-white/10 hover:bg-white/5 transition-colors"
                >
                  <td className="p-4">
                    <div className="text-[14px] text-white font-mono truncate max-w-xs">
                      {redirect.sourceUrl}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-white/40 flex-shrink-0" />
                      <div className="text-[14px] text-white/80 font-mono truncate max-w-xs">
                        {redirect.targetUrl}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-1 rounded text-[12px] font-medium ${
                      redirect.type === 301 ? 'bg-green-500/20 text-green-500' :
                      redirect.type === 302 ? 'bg-blue-500/20 text-blue-500' :
                      'bg-purple-500/20 text-purple-500'
                    }`}>
                      {redirect.type}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1 text-[14px] text-white/70">
                      <TrendingUp className="w-4 h-4" />
                      {redirect.hits}
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleToggle(redirect.id, !redirect.enabled)}
                      className={`px-3 py-1 rounded-full text-[12px] font-medium transition-colors ${
                        redirect.enabled
                          ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30'
                          : 'bg-white/10 text-white/40 hover:bg-white/20'
                      }`}
                    >
                      {redirect.enabled ? 'Active' : 'Disabled'}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => startEdit(redirect)}
                        className="p-2 text-white/60 hover:text-yellow-500 hover:bg-yellow-500/10 rounded-lg transition-all"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(redirect.id)}
                        className="p-2 text-white/60 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
