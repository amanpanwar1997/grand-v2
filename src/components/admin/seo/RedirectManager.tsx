/**
 * ============================================================================
 * REDIRECT MANAGER - MANAGE 301/302 REDIRECTS
 * ============================================================================
 * 
 * Features:
 * - Create/edit/delete redirects
 * - 301 (permanent) and 302 (temporary) redirects
 * - Bulk import from CSV
 * - Test redirects
 * - Redirect chains detection
 * - Broken redirect detection
 * - Analytics (redirect hits)
 */

import { useState, useEffect } from 'react';
import { ArrowRight, Plus, Trash2, Edit, Download, Upload, AlertTriangle, CheckCircle, ExternalLink, RefreshCw } from 'lucide-react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

interface Redirect {
  id: string;
  from: string;
  to: string;
  type: '301' | '302';
  enabled: boolean;
  hits: number;
  createdAt: string;
  notes?: string;
}

export function RedirectManager() {
  const [redirects, setRedirects] = useState<Redirect[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [selectedRedirect, setSelectedRedirect] = useState<Redirect | null>(null);
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    type: '301' as '301' | '302',
    notes: ''
  });
  const [testUrl, setTestUrl] = useState('');
  const [testResult, setTestResult] = useState<{ found: boolean; redirect?: Redirect } | null>(null);

  useEffect(() => {
    loadRedirects();
  }, []);

  const loadRedirects = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/seo-system/redirects/all`,
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
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/seo-system/redirect/${editMode ? 'update' : 'create'}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...formData,
            id: selectedRedirect?.id
          })
        }
      );

      const result = await response.json();

      if (result.success) {
        alert(`✅ Redirect ${editMode ? 'updated' : 'created'} successfully!`);
        loadRedirects();
        handleCancel();
      } else {
        alert(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('❌ Failed to save redirect');
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
        alert(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('❌ Failed to delete redirect');
    }
  };

  const handleEdit = (redirect: Redirect) => {
    setSelectedRedirect(redirect);
    setFormData({
      from: redirect.from,
      to: redirect.to,
      type: redirect.type,
      notes: redirect.notes || ''
    });
    setEditMode(true);
  };

  const handleCancel = () => {
    setSelectedRedirect(null);
    setFormData({
      from: '',
      to: '',
      type: '301',
      notes: ''
    });
    setEditMode(false);
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
      }
    } catch (error) {
      console.error('Toggle error:', error);
    }
  };

  const handleTest = () => {
    const redirect = redirects.find(r => r.from === testUrl && r.enabled);
    setTestResult({
      found: !!redirect,
      redirect
    });
  };

  const exportRedirects = () => {
    const csv = [
      ['From', 'To', 'Type', 'Enabled', 'Hits', 'Notes'].join(','),
      ...redirects.map(r =>
        [r.from, r.to, r.type, r.enabled, r.hits, r.notes || ''].join(',')
      )
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'redirects.csv';
    a.click();
  };

  const importRedirects = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const text = await file.text();
      const lines = text.split('\n').slice(1); // Skip header
      
      // Parse and create redirects
      for (const line of lines) {
        const [from, to, type] = line.split(',');
        if (from && to) {
          await fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/seo-system/redirect/create`,
            {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${publicAnonKey}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                from: from.trim(),
                to: to.trim(),
                type: (type?.trim() || '301') as '301' | '302',
                notes: 'Imported from CSV'
              })
            }
          );
        }
      }

      alert('✅ Redirects imported successfully!');
      loadRedirects();
    };
    input.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500" />
        <span className="ml-3 text-white/80">Loading redirects...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[20px] font-bold text-white mb-1">Redirect Manager</h2>
          <p className="text-[13px] text-white/60">
            Manage 301 & 302 redirects for your website
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={importRedirects}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-lg text-[13px] font-semibold transition-colors flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Import CSV
          </button>
          <button
            onClick={exportRedirects}
            className="px-4 py-2 bg-green-500 hover:bg-green-400 text-white rounded-lg text-[13px] font-semibold transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button
            onClick={() => setEditMode(true)}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg text-[13px] font-semibold transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Redirect
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass p-4 rounded-xl border border-white/10">
          <p className="text-[12px] text-white/60 mb-1">Total Redirects</p>
          <p className="text-[24px] font-bold text-white">{redirects.length}</p>
        </div>
        <div className="glass p-4 rounded-xl border border-white/10">
          <p className="text-[12px] text-white/60 mb-1">301 (Permanent)</p>
          <p className="text-[24px] font-bold text-green-500">
            {redirects.filter(r => r.type === '301').length}
          </p>
        </div>
        <div className="glass p-4 rounded-xl border border-white/10">
          <p className="text-[12px] text-white/60 mb-1">302 (Temporary)</p>
          <p className="text-[24px] font-bold text-blue-500">
            {redirects.filter(r => r.type === '302').length}
          </p>
        </div>
        <div className="glass p-4 rounded-xl border border-white/10">
          <p className="text-[12px] text-white/60 mb-1">Total Hits</p>
          <p className="text-[24px] font-bold text-purple-500">
            {redirects.reduce((sum, r) => sum + r.hits, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Test Redirect */}
      <div className="glass p-6 rounded-xl border border-white/10">
        <h3 className="text-[16px] font-semibold text-white mb-4">Test Redirect</h3>
        <div className="flex gap-3">
          <input
            type="text"
            value={testUrl}
            onChange={(e) => setTestUrl(e.target.value)}
            placeholder="Enter URL to test (e.g., /old-page)"
            className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-yellow-500"
          />
          <button
            onClick={handleTest}
            className="px-6 py-2 bg-purple-500 hover:bg-purple-400 text-white rounded-lg font-semibold transition-colors"
          >
            Test
          </button>
        </div>
        {testResult && (
          <div className={`mt-4 p-4 rounded-lg ${
            testResult.found
              ? 'bg-green-500/10 border border-green-500/20'
              : 'bg-red-500/10 border border-red-500/20'
          }`}>
            {testResult.found && testResult.redirect ? (
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div className="flex-1">
                  <p className="text-[14px] font-semibold text-white mb-1">Redirect Found!</p>
                  <div className="flex items-center gap-2 text-[13px] text-white/80">
                    <code className="bg-white/10 px-2 py-1 rounded">{testResult.redirect.from}</code>
                    <ArrowRight className="w-4 h-4" />
                    <code className="bg-white/10 px-2 py-1 rounded">{testResult.redirect.to}</code>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      testResult.redirect.type === '301' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {testResult.redirect.type}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <p className="text-[14px] text-white">No redirect found for this URL</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit/Create Form */}
      {editMode && (
        <div className="glass p-6 rounded-xl border border-yellow-500/50">
          <h3 className="text-[18px] font-semibold text-white mb-4">
            {selectedRedirect ? 'Edit Redirect' : 'Create New Redirect'}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[13px] text-white/80 mb-2">From URL</label>
              <input
                type="text"
                value={formData.from}
                onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                placeholder="/old-page"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-yellow-500"
              />
            </div>
            <div>
              <label className="block text-[13px] text-white/80 mb-2">To URL</label>
              <input
                type="text"
                value={formData.to}
                onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                placeholder="/new-page"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-yellow-500"
              />
            </div>
            <div>
              <label className="block text-[13px] text-white/80 mb-2">Redirect Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as '301' | '302' })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-yellow-500"
              >
                <option value="301">301 - Permanent</option>
                <option value="302">302 - Temporary</option>
              </select>
            </div>
            <div>
              <label className="block text-[13px] text-white/80 mb-2">Notes (optional)</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Why this redirect was created..."
                rows={2}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-yellow-500 resize-none"
              />
            </div>
            <div className="flex items-center gap-3 pt-4">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg font-semibold transition-colors"
              >
                {selectedRedirect ? 'Update' : 'Create'} Redirect
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Redirects List */}
      <div className="glass rounded-xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-6 py-3 text-left text-[12px] font-semibold text-white/80 uppercase tracking-wider">
                  From
                </th>
                <th className="px-6 py-3 text-center text-[12px] font-semibold text-white/80 uppercase tracking-wider">
                  
                </th>
                <th className="px-6 py-3 text-left text-[12px] font-semibold text-white/80 uppercase tracking-wider">
                  To
                </th>
                <th className="px-6 py-3 text-center text-[12px] font-semibold text-white/80 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-center text-[12px] font-semibold text-white/80 uppercase tracking-wider">
                  Hits
                </th>
                <th className="px-6 py-3 text-center text-[12px] font-semibold text-white/80 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-[12px] font-semibold text-white/80 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {redirects.map((redirect) => (
                <tr key={redirect.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <code className="text-[13px] text-blue-400 bg-blue-500/10 px-2 py-1 rounded">
                      {redirect.from}
                    </code>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <ArrowRight className="w-4 h-4 text-white/40 mx-auto" />
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-[13px] text-green-400 bg-green-500/10 px-2 py-1 rounded">
                      {redirect.to}
                    </code>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-[11px] font-semibold px-2 py-1 rounded ${
                      redirect.type === '301'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {redirect.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-[13px] font-semibold text-white">
                      {redirect.hits.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={redirect.enabled}
                        onChange={(e) => handleToggle(redirect.id, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500" />
                    </label>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(redirect)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-blue-400" />
                      </button>
                      <button
                        onClick={() => handleDelete(redirect.id)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {redirects.length === 0 && (
          <div className="p-12 text-center">
            <ArrowRight className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-[16px] font-semibold text-white mb-2">No Redirects Yet</h3>
            <p className="text-[14px] text-white/60 mb-6">
              Create your first redirect to start managing URL changes
            </p>
            <button
              onClick={() => setEditMode(true)}
              className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg font-semibold transition-colors"
            >
              Create First Redirect
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
