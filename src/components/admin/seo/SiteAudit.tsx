/**
 * ============================================================================
 * SITE AUDIT - REAL BACKEND INTEGRATION
 * ============================================================================
 * 
 * NOW USES REAL BACKEND FOR:
 * - Full site crawling (up to 100 pages)
 * - SEO issue detection
 * - Real-time progress tracking
 * - Comprehensive audit reports
 * - Issue categorization
 * - Actionable recommendations
 */

import { useState, useEffect } from 'react';
import { Search, AlertTriangle, CheckCircle, AlertCircle, XCircle, Zap, RefreshCw, Download, Loader2, TrendingUp } from 'lucide-react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

interface AuditSummary {
  totalPages: number;
  pagesChecked: number;
  healthyPages: number;
  pagesWithIssues: number;
  errors: number;
  warnings: number;
  info: number;
  totalIssues: number;
  avgLoadTime: number;
  score: number;
  grade: string;
}

interface AuditIssue {
  type: 'error' | 'warning' | 'info';
  category: string;
  page: string;
  issue: string;
  impact: 'high' | 'medium' | 'low';
}

interface AuditResults {
  summary: AuditSummary;
  pages: any[];
  issues: AuditIssue[];
  categories: Record<string, any>;
}

interface AuditStatus {
  auditId: string;
  baseUrl: string;
  status: 'running' | 'completed' | 'failed';
  progress: number;
  pagesScanned: number;
  maxPages: number;
  startedAt?: string;
  completedAt?: string;
  error?: string;
}

export function SiteAudit() {
  const [baseUrl, setBaseUrl] = useState('https://www.inchtomilez.com');
  const [maxPages, setMaxPages] = useState(50);
  const [auditId, setAuditId] = useState<string | null>(null);
  const [status, setStatus] = useState<AuditStatus | null>(null);
  const [results, setResults] = useState<AuditResults | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [polling, setPolling] = useState(false);

  // Poll for audit status
  useEffect(() => {
    if (!auditId || !polling) return;

    const interval = setInterval(async () => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/site-audit/status/${auditId}`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`
            }
          }
        );

        const result = await response.json();

        if (result.success) {
          setStatus(result.status);

          if (result.status.status === 'completed') {
            setPolling(false);
            loadResults();
          } else if (result.status.status === 'failed') {
            setPolling(false);
            setError(result.status.error || 'Audit failed');
          }
        }
      } catch (err: any) {
        console.error('Status poll error:', err);
      }
    }, 2000); // Poll every 2 seconds

    return () => clearInterval(interval);
  }, [auditId, polling]);

  const startAudit = async () => {
    if (!baseUrl || baseUrl.trim().length === 0) {
      setError('Please provide a URL to audit');
      return;
    }

    setError(null);
    setResults(null);
    setStatus(null);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/site-audit/start`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            baseUrl,
            maxPages
          })
        }
      );

      const result = await response.json();

      if (result.success) {
        setAuditId(result.auditId);
        setPolling(true);
        console.log('✅ Audit started:', result.auditId);
      } else {
        setError(result.error || 'Failed to start audit');
        console.error('❌ Audit start failed:', result.error);
      }
    } catch (err: any) {
      setError(err.message || 'Network error');
      console.error('❌ Audit start error:', err);
    }
  };

  const loadResults = async () => {
    if (!auditId) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/site-audit/results/${auditId}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      const result = await response.json();

      if (result.success) {
        setResults(result.results);
        console.log('✅ Results loaded');
      } else {
        setError(result.error || 'Failed to load results');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load results');
      console.error('❌ Results load error:', err);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    if (score >= 50) return 'text-orange-500';
    return 'text-red-500';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 85) return 'bg-green-500/10 border-green-500/20';
    if (score >= 70) return 'bg-yellow-500/10 border-yellow-500/20';
    if (score >= 50) return 'bg-orange-500/10 border-orange-500/20';
    return 'bg-red-500/10 border-red-500/20';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-[20px] font-bold text-white mb-2">Site Audit</h2>
        <p className="text-[13px] text-white/60">
          Crawl your entire website and identify SEO issues
        </p>
      </div>

      {/* Audit Settings */}
      {!polling && !results && (
        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
          <h3 className="text-[16px] font-bold text-white mb-4">Start New Audit</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[14px] font-medium text-white mb-2">
                Base URL
              </label>
              <input
                type="url"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="https://www.example.com"
                className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white text-[14px] focus:outline-none focus:border-yellow-500/50"
              />
            </div>
            <div>
              <label className="block text-[14px] font-medium text-white mb-2">
                Maximum Pages to Scan
              </label>
              <select
                value={maxPages}
                onChange={(e) => setMaxPages(parseInt(e.target.value))}
                className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white text-[14px] focus:outline-none focus:border-yellow-500/50"
              >
                <option value="10">10 pages (Quick)</option>
                <option value="50">50 pages (Standard)</option>
                <option value="100">100 pages (Deep)</option>
              </select>
            </div>
            <button
              onClick={startAudit}
              className="w-full px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Start Site Audit
            </button>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !polling && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-[16px] font-semibold text-red-500 mb-2">Audit Failed</h4>
              <p className="text-[14px] text-red-400">{error}</p>
              <button
                onClick={() => {
                  setError(null);
                  setAuditId(null);
                  setStatus(null);
                }}
                className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg font-medium transition-colors"
              >
                Start New Audit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Progress State */}
      {polling && status && (
        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8">
          <div className="flex flex-col items-center gap-6">
            <Loader2 className="w-16 h-16 text-yellow-500 animate-spin" />
            <div className="text-center">
              <h3 className="text-[20px] font-bold text-white mb-2">
                Crawling Website...
              </h3>
              <p className="text-[14px] text-white/60 mb-4">
                Scanned {status.pagesScanned} of {status.maxPages} pages
              </p>
              <div className="w-full max-w-md mx-auto">
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-500 transition-all duration-300"
                    style={{ width: `${status.progress}%` }}
                  />
                </div>
                <p className="text-[13px] text-white/40 mt-2">{status.progress}% Complete</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {results && !polling && (
        <div className="space-y-6">
          {/* Header with New Audit Button */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[18px] font-bold text-white">Audit Results</h3>
              <p className="text-[13px] text-white/60">
                {results.summary.pagesChecked} pages checked
              </p>
            </div>
            <button
              onClick={() => {
                setResults(null);
                setStatus(null);
                setAuditId(null);
              }}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              New Audit
            </button>
          </div>

          {/* Overall Score */}
          <div className={`border rounded-xl p-6 ${getScoreBgColor(results.summary.score)}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] text-white/60 mb-1">Overall Site Health</p>
                <div className="flex items-baseline gap-3">
                  <span className={`text-[48px] font-bold ${getScoreColor(results.summary.score)}`}>
                    {results.summary.score}
                  </span>
                  <span className="text-[24px] font-semibold text-white/40">/100</span>
                  <span className={`text-[20px] font-bold ${getScoreColor(results.summary.score)}`}>
                    {results.summary.grade}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[13px] text-white/60 mb-1">Avg Load Time</p>
                <p className="text-[24px] font-bold text-white">{results.summary.avgLoadTime}ms</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-4">
              <p className="text-[13px] text-white/60 mb-1">Total Pages</p>
              <p className="text-[24px] font-bold text-white">{results.summary.totalPages}</p>
            </div>
            <div className="bg-[#0a0a0a] border border-green-500/20 rounded-lg p-4">
              <p className="text-[13px] text-white/60 mb-1">Healthy</p>
              <p className="text-[24px] font-bold text-green-500">{results.summary.healthyPages}</p>
            </div>
            <div className="bg-[#0a0a0a] border border-red-500/20 rounded-lg p-4">
              <p className="text-[13px] text-white/60 mb-1">Errors</p>
              <p className="text-[24px] font-bold text-red-500">{results.summary.errors}</p>
            </div>
            <div className="bg-[#0a0a0a] border border-yellow-500/20 rounded-lg p-4">
              <p className="text-[13px] text-white/60 mb-1">Warnings</p>
              <p className="text-[24px] font-bold text-yellow-500">{results.summary.warnings}</p>
            </div>
            <div className="bg-[#0a0a0a] border border-blue-500/20 rounded-lg p-4">
              <p className="text-[13px] text-white/60 mb-1">Info</p>
              <p className="text-[24px] font-bold text-blue-500">{results.summary.info}</p>
            </div>
          </div>

          {/* Issues by Category */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
            <h4 className="text-[16px] font-bold text-white mb-4">Issues by Category</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(results.categories).map(([category, data]: [string, any]) => (
                <div key={category} className="bg-black/30 rounded-lg p-4">
                  <h5 className="text-[14px] font-semibold text-white mb-3 capitalize">{category}</h5>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="text-red-400">Errors</span>
                      <span className="font-semibold text-red-400">{data.errors}</span>
                    </div>
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="text-yellow-400">Warnings</span>
                      <span className="font-semibold text-yellow-400">{data.warnings}</span>
                    </div>
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="text-blue-400">Info</span>
                      <span className="font-semibold text-blue-400">{data.info}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Issues */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-[16px] font-bold text-white">All Issues ({results.issues.length})</h4>
              <div className="flex items-center gap-2">
                <button className="text-[13px] px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded">
                  Filter
                </button>
                <button className="text-[13px] px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  Export
                </button>
              </div>
            </div>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {results.issues.slice(0, 50).map((issue, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 p-3 rounded-lg ${
                    issue.type === 'error' ? 'bg-red-500/10 border border-red-500/20' :
                    issue.type === 'warning' ? 'bg-yellow-500/10 border border-yellow-500/20' :
                    'bg-blue-500/10 border border-blue-500/20'
                  }`}
                >
                  {issue.type === 'error' ? <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" /> :
                   issue.type === 'warning' ? <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" /> :
                   <AlertCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-white/80">{issue.issue}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-[11px] text-white/40 truncate">{issue.page}</p>
                      <span className="text-[11px] px-2 py-0.5 bg-white/10 rounded text-white/60 capitalize">
                        {issue.category}
                      </span>
                      <span className={`text-[11px] px-2 py-0.5 rounded capitalize ${
                        issue.impact === 'high' ? 'bg-red-500/20 text-red-400' :
                        issue.impact === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {issue.impact} impact
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {results.issues.length > 50 && (
              <p className="text-[13px] text-white/60 mt-4 text-center">
                Showing first 50 of {results.issues.length} issues
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
