/**
 * ENTERPRISE CONTROL CENTER
 * Master dashboard for the new unified admin system
 * Phase 1 - Foundation demonstration
 */

import { useState, useEffect } from 'react';
import { 
  Scan, Settings, FileCode, Route, Database, RefreshCw, 
  CheckCircle, AlertCircle, TrendingUp, Zap, Shield, Clock
} from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

export function EnterpriseControlCenter() {
  const [stats, setStats] = useState({
    lastScan: null as any,
    config: null as any,
    routes: [] as any[],
    loading: true
  });

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      // Get latest scan
      const scanRes = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/scanner/latest`,
        { headers: { 'Authorization': `Bearer ${publicAnonKey}` }}
      );
      const scanData = await scanRes.json();

      // Get config
      const configRes = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/config/unified`,
        { headers: { 'Authorization': `Bearer ${publicAnonKey}` }}
      );
      const configData = await configRes.json();

      // Get routes
      const routesRes = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/routes/all`,
        { headers: { 'Authorization': `Bearer ${publicAnonKey}` }}
      );
      const routesData = await routesRes.json();

      setStats({
        lastScan: scanData.scan || null,
        config: configData.config || null,
        routes: routesData.routes || [],
        loading: false
      });
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
      setStats(s => ({ ...s, loading: false }));
    }
  };

  const runFullScan = async () => {
    setStats(s => ({ ...s, loading: true }));
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/scanner/full-scan`,
        {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${publicAnonKey}` }
        }
      );
      const result = await response.json();
      
      if (result.success) {
        alert('✅ Full project scan complete!\nCheck console for details.');
        await loadDashboardStats();
      } else {
        alert('❌ Scan failed: ' + result.error);
      }
    } catch (error: any) {
      alert('❌ Scan error: ' + error.message);
    } finally {
      setStats(s => ({ ...s, loading: false }));
    }
  };

  if (stats.loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <RefreshCw className="w-8 h-8 text-yellow-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[30px] font-medium text-white mb-2">
            Enterprise Control Center
          </h1>
          <p className="text-[15px] text-white/70">
            Unified command center for your entire website
          </p>
        </div>
        <button
          onClick={runFullScan}
          className="px-6 py-3 bg-purple-500 hover:bg-purple-400 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
        >
          <Scan className="w-5 h-5" />
          Run Full Scan
        </button>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Project Scan Status */}
        <div className="glass p-6 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <Database className="w-8 h-8 text-blue-500" />
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-[18px] font-medium text-white mb-2">
            Project Indexed
          </h3>
          <p className="text-[24px] font-bold text-white mb-1">
            {stats.lastScan?.stats?.totalFiles || 0}
          </p>
          <p className="text-[13px] text-white/60">
            Files scanned and indexed
          </p>
        </div>

        {/* Components */}
        <div className="glass p-6 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <FileCode className="w-8 h-8 text-yellow-500" />
            <TrendingUp className="w-5 h-5 text-yellow-500" />
          </div>
          <h3 className="text-[18px] font-medium text-white mb-2">
            Components
          </h3>
          <p className="text-[24px] font-bold text-white mb-1">
            {stats.lastScan?.stats?.totalComponents || 0}
          </p>
          <p className="text-[13px] text-white/60">
            React components discovered
          </p>
        </div>

        {/* Routes */}
        <div className="glass p-6 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <Route className="w-8 h-8 text-green-500" />
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-[18px] font-medium text-white mb-2">
            Routes Managed
          </h3>
          <p className="text-[24px] font-bold text-white mb-1">
            {stats.routes.length}
          </p>
          <p className="text-[13px] text-white/60">
            Centrally controlled routes
          </p>
        </div>

        {/* Configuration */}
        <div className="glass p-6 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <Settings className="w-8 h-8 text-purple-500" />
            {stats.config ? (
              <Shield className="w-5 h-5 text-green-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500" />
            )}
          </div>
          <h3 className="text-[18px] font-medium text-white mb-2">
            Configuration
          </h3>
          <p className="text-[24px] font-bold text-white mb-1">
            {stats.config ? 'Active' : 'Not Set'}
          </p>
          <p className="text-[13px] text-white/60">
            Unified config system status
          </p>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Code Scanner */}
        <div className="glass p-6 rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Scan className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="text-[18px] font-medium text-white">
                Code Scanner & Indexing
              </h3>
              <p className="text-[13px] text-white/60">
                Deep project analysis system
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-white/10">
              <span className="text-[14px] text-white/70">Files Indexed</span>
              <span className="text-[14px] font-semibold text-white">
                {stats.lastScan?.stats?.totalFiles || 0}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-white/10">
              <span className="text-[14px] text-white/70">Components Found</span>
              <span className="text-[14px] font-semibold text-white">
                {stats.lastScan?.stats?.totalComponents || 0}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-white/10">
              <span className="text-[14px] text-white/70">SEO Pages</span>
              <span className="text-[14px] font-semibold text-white">
                {stats.lastScan?.stats?.totalSEOPages || 0}
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-[14px] text-white/70">Media Assets</span>
              <span className="text-[14px] font-semibold text-white">
                {stats.lastScan?.stats?.totalMedia || 0}
              </span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-[13px] text-white/60">
            <Clock className="w-4 h-4" />
            Last scan: {stats.lastScan ? new Date(stats.lastScan.timestamp).toLocaleString() : 'Never'}
          </div>
        </div>

        {/* Unified Config */}
        <div className="glass p-6 rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <Settings className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <h3 className="text-[18px] font-medium text-white">
                Unified Configuration
              </h3>
              <p className="text-[13px] text-white/60">
                Single source of truth
              </p>
            </div>
          </div>
          {stats.config ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-white/10">
                <span className="text-[14px] text-white/70">Site Name</span>
                <span className="text-[14px] font-semibold text-white">
                  {stats.config.site?.name || 'Not set'}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/10">
                <span className="text-[14px] text-white/70">Domain</span>
                <span className="text-[14px] font-semibold text-white">
                  {stats.config.site?.domain || 'Not set'}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/10">
                <span className="text-[14px] text-white/70">Features</span>
                <span className="text-[14px] font-semibold text-white">
                  {Object.values(stats.config.features || {}).filter(Boolean).length} enabled
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-[14px] text-white/70">Integrations</span>
                <span className="text-[14px] font-semibold text-white">
                  {Object.values(stats.config.integrations || {}).filter(Boolean).length} active
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
              <p className="text-[14px] text-white/60">
                Configuration not initialized
              </p>
            </div>
          )}
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-[13px] text-white/60">
            <Shield className="w-4 h-4" />
            Last updated: {stats.config?.updatedAt ? new Date(stats.config.updatedAt).toLocaleString() : 'Never'}
          </div>
        </div>

        {/* Route Manager */}
        <div className="glass p-6 rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <Route className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h3 className="text-[18px] font-medium text-white">
                Route Management
              </h3>
              <p className="text-[13px] text-white/60">
                Centralized routing control
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-white/10">
              <span className="text-[14px] text-white/70">Total Routes</span>
              <span className="text-[14px] font-semibold text-white">
                {stats.routes.length}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-white/10">
              <span className="text-[14px] text-white/70">Published</span>
              <span className="text-[14px] font-semibold text-green-500">
                {stats.routes.filter(r => r.status === 'published').length}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-white/10">
              <span className="text-[14px] text-white/70">Draft</span>
              <span className="text-[14px] font-semibold text-yellow-500">
                {stats.routes.filter(r => r.status === 'draft').length}
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-[14px] text-white/70">Archived</span>
              <span className="text-[14px] font-semibold text-white/60">
                {stats.routes.filter(r => r.status === 'archived').length}
              </span>
            </div>
          </div>
        </div>

        {/* File Manager */}
        <div className="glass p-6 rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-yellow-500/20 rounded-lg">
              <FileCode className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <h3 className="text-[18px] font-medium text-white">
                File Manager
              </h3>
              <p className="text-[13px] text-white/60">
                Safe code editing with versioning
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[14px] font-medium text-white">
                  Version Control
                </p>
                <p className="text-[13px] text-white/60">
                  Every change is versioned
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[14px] font-medium text-white">
                  Automatic Backups
                </p>
                <p className="text-[13px] text-white/60">
                  Pre-write backup for safety
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[14px] font-medium text-white">
                  Rollback Capable
                </p>
                <p className="text-[13px] text-white/60">
                  Restore any previous version
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="glass p-6 rounded-xl border border-yellow-500/30 bg-yellow-500/5">
        <div className="flex items-start gap-4">
          <Zap className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="text-[18px] font-medium text-white mb-2">
              🎉 Phase 1 Complete - Foundation Ready
            </h3>
            <p className="text-[14px] text-white/70 leading-relaxed mb-3">
              The backend infrastructure is now complete! You have:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[13px] text-white/80">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Code scanner & project indexing
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Unified configuration system
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Safe file operations with versioning
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Route & slug management
              </li>
            </ul>
            <p className="text-[13px] text-yellow-500 mt-3">
              📚 See /ENTERPRISE_ADMIN_PANEL_PHASE_1_COMPLETE.md for full documentation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
