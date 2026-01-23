/**
 * 404 ERROR MONITOR V2 - FULLY FUNCTIONAL
 * Track and fix broken links with backend integration
 */

import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import {
  AlertTriangle,
  Search,
  ArrowRight,
  Eye,
  EyeOff,
  Trash2,
  Loader2,
  RefreshCw,
  TrendingDown
} from 'lucide-react';

interface Error404 {
  id: string;
  url: string;
  referrer: string;
  hits: number;
  firstSeen: string;
  lastSeen: string;
  ignored: boolean;
}

export function Error404PanelV2() {
  const [errors, setErrors] = useState<Error404[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showIgnored, setShowIgnored] = useState(false);

  useEffect(() => {
    loadErrors();
  }, []);

  const loadErrors = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/seo-system/404/all`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      const result = await response.json();

      if (result.success) {
        setErrors(result.errors || []);
      }
    } catch (error) {
      console.error('Error loading 404 errors:', error);
      alert('❌ Error loading 404 errors. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleIgnore = async (id: string, ignored: boolean) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/seo-system/404/ignore`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id, ignored })
        }
      );

      const result = await response.json();

      if (result.success) {
        loadErrors();
      } else {
        alert('❌ Error: ' + result.error);
      }
    } catch (error) {
      console.error('Error toggling ignore:', error);
      alert('❌ Error updating 404');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this 404 error?')) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/seo-system/404/delete`,
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
        alert('✅ 404 error deleted');
        loadErrors();
      } else {
        alert('❌ Error: ' + result.error);
      }
    } catch (error) {
      console.error('Error deleting 404:', error);
      alert('❌ Error deleting 404');
    }
  };

  const handleClearAll = async () => {
    if (!confirm('Are you sure you want to clear ALL 404 errors? This cannot be undone.')) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/seo-system/404/clear`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const result = await response.json();

      if (result.success) {
        alert('✅ All 404 errors cleared');
        loadErrors();
      } else {
        alert('❌ Error: ' + result.error);
      }
    } catch (error) {
      console.error('Error clearing 404s:', error);
      alert('❌ Error clearing 404s');
    }
  };

  const createRedirect = async (sourceUrl: string) => {
    const targetUrl = prompt('Enter the target URL for this redirect:', '/');
    if (!targetUrl) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/seo-system/redirect/create`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            sourceUrl,
            targetUrl,
            type: 301,
            enabled: true
          })
        }
      );

      const result = await response.json();

      if (result.success) {
        alert('✅ Redirect created successfully!');
        handleIgnore(errors.find(e => e.url === sourceUrl)?.id || '', true);
      } else {
        alert('❌ Error: ' + result.error);
      }
    } catch (error) {
      console.error('Error creating redirect:', error);
      alert('❌ Error creating redirect');
    }
  };

  const filteredErrors = errors.filter(e => {
    const matchesSearch = e.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         e.referrer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIgnored = showIgnored || !e.ignored;
    return matchesSearch && matchesIgnored;
  });

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
          <h2 className="text-[20px] font-bold text-white">404 Error Monitor</h2>
          <p className="text-[13px] text-white/60 mt-1">
            Track and fix broken links ({errors.length} total, {errors.filter(e => !e.ignored).length} active)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadErrors}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button
            onClick={handleClearAll}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-500 rounded-lg transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="glass p-4 rounded-lg">
          <div className="text-[24px] font-bold text-red-500">{errors.length}</div>
          <div className="text-[12px] text-white/60">Total Errors</div>
        </div>
        <div className="glass p-4 rounded-lg">
          <div className="text-[24px] font-bold text-yellow-500">
            {errors.filter(e => !e.ignored).length}
          </div>
          <div className="text-[12px] text-white/60">Active</div>
        </div>
        <div className="glass p-4 rounded-lg">
          <div className="text-[24px] font-bold text-white/40">
            {errors.filter(e => e.ignored).length}
          </div>
          <div className="text-[12px] text-white/60">Ignored</div>
        </div>
        <div className="glass p-4 rounded-lg">
          <div className="text-[24px] font-bold text-white">
            {errors.reduce((sum, e) => sum + e.hits, 0)}
          </div>
          <div className="text-[12px] text-white/60">Total Hits</div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 404 errors..."
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
          />
        </div>
        <label className="flex items-center gap-2 px-4 py-3 glass rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
          <input
            type="checkbox"
            checked={showIgnored}
            onChange={(e) => setShowIgnored(e.target.checked)}
            className="rounded bg-white/5 border-white/10 text-yellow-500"
          />
          <span className="text-[14px] text-white">Show Ignored</span>
        </label>
      </div>

      {/* Errors List */}
      {filteredErrors.length === 0 ? (
        <div className="glass p-12 rounded-xl text-center">
          <AlertTriangle className="w-12 h-12 text-green-500/50 mx-auto mb-4" />
          <h3 className="text-[18px] font-medium text-white mb-2">
            {searchQuery ? 'No matching errors' : 'No 404 errors found'}
          </h3>
          <p className="text-[14px] text-white/60">
            {searchQuery ? 'Try a different search query' : 'Great! Your site has no broken links'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredErrors.map((error) => (
            <div
              key={error.id}
              className={`glass rounded-xl p-4 border-2 transition-all ${
                error.ignored
                  ? 'border-transparent opacity-50'
                  : 'border-red-500/20 hover:border-red-500/40'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                {/* Left: Error Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <div className="text-[16px] font-medium text-white font-mono truncate">
                      {error.url}
                    </div>
                    {error.ignored && (
                      <span className="px-2 py-1 bg-white/10 rounded text-[11px] text-white/60">
                        IGNORED
                      </span>
                    )}
                  </div>
                  
                  {error.referrer && (
                    <div className="flex items-center gap-2 text-[13px] text-white/60 mb-2">
                      <span>Referrer:</span>
                      <span className="font-mono truncate">{error.referrer}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4 text-[12px] text-white/50">
                    <div className="flex items-center gap-1">
                      <TrendingDown className="w-3 h-3" />
                      {error.hits} hits
                    </div>
                    <div>First: {new Date(error.firstSeen).toLocaleDateString()}</div>
                    <div>Last: {new Date(error.lastSeen).toLocaleDateString()}</div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => createRedirect(error.url)}
                    className="px-3 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-500 rounded-lg transition-colors flex items-center gap-2 text-[13px] font-medium"
                    title="Create Redirect"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Fix
                  </button>
                  <button
                    onClick={() => handleIgnore(error.id, !error.ignored)}
                    className={`p-2 rounded-lg transition-all ${
                      error.ignored
                        ? 'text-white/40 hover:text-white hover:bg-white/10'
                        : 'text-white/60 hover:text-yellow-500 hover:bg-yellow-500/10'
                    }`}
                    title={error.ignored ? 'Unignore' : 'Ignore'}
                  >
                    {error.ignored ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(error.id)}
                    className="p-2 text-white/60 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
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
