/**
 * ============================================================================
 * TECHNICAL SEO ANALYZER - REAL BACKEND INTEGRATION
 * ============================================================================
 * 
 * NOW USES REAL BACKEND FOR:
 * - Page speed analysis
 * - Core Web Vitals (LCP, FID, CLS)
 * - Mobile-friendliness
 * - Security checks (HTTPS, headers)
 * - HTML validation
 * - Structured data detection
 * - Performance optimization recommendations
 */

import { useState } from 'react';
import { Zap, Activity, Clock, Shield, Smartphone, Code, CheckCircle, AlertCircle, XCircle, Loader2, RefreshCw } from 'lucide-react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

interface TechnicalAnalysis {
  url: string;
  score: number;
  grade: string;
  security: {
    https: boolean;
    hsts: boolean;
    csp: boolean;
    xFrameOptions: boolean;
    mixedContent: boolean;
    score: number;
  };
  performance: {
    loadTime: number;
    gzip: boolean;
    cacheControl: boolean;
    etag: boolean;
    renderBlocking: boolean;
    imageOptimization: {
      total: number;
      lazy: number;
      percentage: number;
    };
  };
  mobile: {
    hasViewport: boolean;
    responsive: boolean;
    hasMediaQueries: boolean;
    score: number;
  };
  htmlValidation: {
    errors: number;
    warnings: number;
    errorMessages: string[];
    warningMessages: string[];
  };
  coreWebVitals: {
    lcp: number;
    fid: number;
    cls: number;
    status: {
      lcp: string;
      fid: string;
      cls: string;
    };
  };
  metadata: {
    hasTitle: boolean;
    title: string;
    hasDescription: boolean;
    description: string;
    hasCanonical: boolean;
    canonical: string;
    hasOG: boolean;
    ogTitle: string;
    robots: string;
  };
  structured: {
    hasSchema: boolean;
    jsonLdCount: number;
    microdataCount: number;
    schemas: string[];
  };
  issues: Array<{
    type: string;
    category: string;
    message: string;
  }>;
  recommendations: string[];
  analyzedAt: string;
}

export function TechnicalSEO() {
  const [url, setUrl] = useState('https://www.inchtomilez.com');
  const [analysis, setAnalysis] = useState<TechnicalAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeURL = async () => {
    if (!url || url.trim().length === 0) {
      setError('Please provide a URL to analyze');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/technical-seo/analyze`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ url })
        }
      );

      const result = await response.json();

      if (result.success) {
        setAnalysis(result.analysis);
        console.log('✅ Technical SEO analyzed successfully');
      } else {
        setError(result.error || 'Failed to analyze URL');
        console.error('❌ Technical SEO analysis failed:', result.error);
      }
    } catch (err: any) {
      setError(err.message || 'Network error');
      console.error('❌ Technical SEO error:', err);
    } finally {
      setLoading(false);
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

  const getVitalStatus = (status: string) => {
    if (status === 'good') return { color: 'text-green-500', bg: 'bg-green-500/10', icon: CheckCircle };
    if (status === 'needs-improvement') return { color: 'text-yellow-500', bg: 'bg-yellow-500/10', icon: AlertCircle };
    return { color: 'text-red-500', bg: 'bg-red-500/10', icon: XCircle };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-[20px] font-bold text-white mb-2">Technical SEO Analyzer</h2>
        <p className="text-[13px] text-white/60">
          Analyze Core Web Vitals, performance, mobile-friendliness, and technical health
        </p>
      </div>

      {/* URL Input */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
        <label className="block text-[14px] font-medium text-white mb-3">
          Enter URL to Analyze
        </label>
        <div className="flex gap-3">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.example.com"
            className="flex-1 px-4 py-3 bg-black border border-white/10 rounded-lg text-white text-[14px] focus:outline-none focus:border-yellow-500/50"
          />
          <button
            onClick={analyzeURL}
            disabled={loading}
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                Analyze
              </>
            )}
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 text-yellow-500 animate-spin" />
            <h3 className="text-[18px] font-semibold text-white">Analyzing Technical SEO...</h3>
            <p className="text-[14px] text-white/60">
              Checking performance, mobile, security, and more...
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-[16px] font-semibold text-red-500 mb-2">Analysis Failed</h4>
              <p className="text-[14px] text-red-400">{error}</p>
              <button
                onClick={analyzeURL}
                className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg font-medium transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Analysis Results */}
      {analysis && !loading && (
        <div className="space-y-6">
          {/* Header with Re-analyze */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[18px] font-bold text-white">Analysis Results</h3>
              <p className="text-[13px] text-white/60">
                Analyzed {new Date(analysis.analyzedAt).toLocaleString()}
              </p>
            </div>
            <button
              onClick={analyzeURL}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Re-analyze
            </button>
          </div>

          {/* Overall Score */}
          <div className={`border rounded-xl p-6 ${getScoreBgColor(analysis.score)}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] text-white/60 mb-1">Overall Technical Score</p>
                <div className="flex items-baseline gap-3">
                  <span className={`text-[48px] font-bold ${getScoreColor(analysis.score)}`}>
                    {analysis.score}
                  </span>
                  <span className="text-[24px] font-semibold text-white/40">/100</span>
                  <span className={`text-[20px] font-bold ${getScoreColor(analysis.score)}`}>
                    {analysis.grade}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[13px] text-white/60 mb-1">Load Time</p>
                <p className="text-[24px] font-bold text-white">{analysis.performance.loadTime}ms</p>
              </div>
            </div>
          </div>

          {/* Core Web Vitals */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-5 h-5 text-blue-500" />
              <h4 className="text-[18px] font-bold text-white">Core Web Vitals</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* LCP */}
              <div className={`border rounded-lg p-4 ${getVitalStatus(analysis.coreWebVitals.status.lcp).bg}`}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[13px] text-white/60">LCP</p>
                  {(() => {
                    const Icon = getVitalStatus(analysis.coreWebVitals.status.lcp).icon;
                    return <Icon className={`w-5 h-5 ${getVitalStatus(analysis.coreWebVitals.status.lcp).color}`} />;
                  })()}
                </div>
                <p className={`text-[28px] font-bold ${getVitalStatus(analysis.coreWebVitals.status.lcp).color}`}>
                  {analysis.coreWebVitals.lcp}s
                </p>
                <p className="text-[12px] text-white/40">Largest Contentful Paint</p>
                <p className="text-[11px] text-white/30 mt-1">Target: {'<'} 2.5s</p>
              </div>

              {/* FID */}
              <div className={`border rounded-lg p-4 ${getVitalStatus(analysis.coreWebVitals.status.fid).bg}`}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[13px] text-white/60">FID</p>
                  {(() => {
                    const Icon = getVitalStatus(analysis.coreWebVitals.status.fid).icon;
                    return <Icon className={`w-5 h-5 ${getVitalStatus(analysis.coreWebVitals.status.fid).color}`} />;
                  })()}
                </div>
                <p className={`text-[28px] font-bold ${getVitalStatus(analysis.coreWebVitals.status.fid).color}`}>
                  {analysis.coreWebVitals.fid}ms
                </p>
                <p className="text-[12px] text-white/40">First Input Delay</p>
                <p className="text-[11px] text-white/30 mt-1">Target: {'<'} 100ms</p>
              </div>

              {/* CLS */}
              <div className={`border rounded-lg p-4 ${getVitalStatus(analysis.coreWebVitals.status.cls).bg}`}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[13px] text-white/60">CLS</p>
                  {(() => {
                    const Icon = getVitalStatus(analysis.coreWebVitals.status.cls).icon;
                    return <Icon className={`w-5 h-5 ${getVitalStatus(analysis.coreWebVitals.status.cls).color}`} />;
                  })()}
                </div>
                <p className={`text-[28px] font-bold ${getVitalStatus(analysis.coreWebVitals.status.cls).color}`}>
                  {analysis.coreWebVitals.cls.toFixed(3)}
                </p>
                <p className="text-[12px] text-white/40">Cumulative Layout Shift</p>
                <p className="text-[11px] text-white/30 mt-1">Target: {'<'} 0.1</p>
              </div>
            </div>
          </div>

          {/* Category Scores */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Security */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-cyan-500" />
                <p className="text-[14px] font-semibold text-white">Security</p>
              </div>
              <p className="text-[32px] font-bold text-cyan-500">{analysis.security.score}</p>
              <div className="mt-3 space-y-1">
                <div className="flex items-center gap-2 text-[12px]">
                  {analysis.security.https ? <CheckCircle className="w-3 h-3 text-green-500" /> : <XCircle className="w-3 h-3 text-red-500" />}
                  <span className="text-white/60">HTTPS</span>
                </div>
                <div className="flex items-center gap-2 text-[12px]">
                  {analysis.security.hsts ? <CheckCircle className="w-3 h-3 text-green-500" /> : <XCircle className="w-3 h-3 text-red-500" />}
                  <span className="text-white/60">HSTS</span>
                </div>
              </div>
            </div>

            {/* Mobile */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Smartphone className="w-5 h-5 text-purple-500" />
                <p className="text-[14px] font-semibold text-white">Mobile</p>
              </div>
              <p className="text-[32px] font-bold text-purple-500">{analysis.mobile.score}</p>
              <div className="mt-3 space-y-1">
                <div className="flex items-center gap-2 text-[12px]">
                  {analysis.mobile.hasViewport ? <CheckCircle className="w-3 h-3 text-green-500" /> : <XCircle className="w-3 h-3 text-red-500" />}
                  <span className="text-white/60">Viewport</span>
                </div>
                <div className="flex items-center gap-2 text-[12px]">
                  {analysis.mobile.responsive ? <CheckCircle className="w-3 h-3 text-green-500" /> : <XCircle className="w-3 h-3 text-red-500" />}
                  <span className="text-white/60">Responsive</span>
                </div>
              </div>
            </div>

            {/* Performance */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-yellow-500" />
                <p className="text-[14px] font-semibold text-white">Performance</p>
              </div>
              <p className="text-[32px] font-bold text-yellow-500">{analysis.performance.loadTime}ms</p>
              <div className="mt-3 space-y-1">
                <div className="flex items-center gap-2 text-[12px]">
                  {analysis.performance.gzip ? <CheckCircle className="w-3 h-3 text-green-500" /> : <XCircle className="w-3 h-3 text-red-500" />}
                  <span className="text-white/60">Gzip</span>
                </div>
                <div className="flex items-center gap-2 text-[12px]">
                  {!analysis.performance.renderBlocking ? <CheckCircle className="w-3 h-3 text-green-500" /> : <XCircle className="w-3 h-3 text-red-500" />}
                  <span className="text-white/60">No Blocking</span>
                </div>
              </div>
            </div>

            {/* HTML */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Code className="w-5 h-5 text-green-500" />
                <p className="text-[14px] font-semibold text-white">HTML</p>
              </div>
              <p className="text-[32px] font-bold text-green-500">{analysis.htmlValidation.errors}</p>
              <p className="text-[12px] text-white/60">Errors</p>
              <div className="mt-3 space-y-1">
                <div className="flex items-center gap-2 text-[12px]">
                  <span className="text-white/60">{analysis.htmlValidation.warnings} Warnings</span>
                </div>
              </div>
            </div>
          </div>

          {/* Issues */}
          {analysis.issues.length > 0 && (
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
              <h4 className="text-[16px] font-bold text-white mb-4">Issues Found ({analysis.issues.length})</h4>
              <div className="space-y-2">
                {analysis.issues.map((issue, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 p-3 rounded-lg ${
                      issue.type === 'error' ? 'bg-red-500/10 border border-red-500/20' :
                      issue.type === 'warning' ? 'bg-yellow-500/10 border border-yellow-500/20' :
                      'bg-blue-500/10 border border-blue-500/20'
                    }`}
                  >
                    {issue.type === 'error' ? <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" /> :
                     issue.type === 'warning' ? <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" /> :
                     <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />}
                    <div className="flex-1">
                      <p className="text-[13px] text-white/80">{issue.message}</p>
                      <p className="text-[11px] text-white/40 mt-1">Category: {issue.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {analysis.recommendations.length > 0 && (
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-blue-500" />
                <h4 className="text-[16px] font-bold text-white">Recommendations</h4>
              </div>
              <div className="space-y-2">
                {analysis.recommendations.map((rec, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">•</span>
                    <p className="text-[14px] text-white/80">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Metadata & Structured Data */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Metadata */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
              <h4 className="text-[16px] font-bold text-white mb-4">Metadata</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-white/60">Title Tag</span>
                  {analysis.metadata.hasTitle ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-500" />}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-white/60">Meta Description</span>
                  {analysis.metadata.hasDescription ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-500" />}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-white/60">Canonical URL</span>
                  {analysis.metadata.hasCanonical ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-500" />}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-white/60">Open Graph Tags</span>
                  {analysis.metadata.hasOG ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-500" />}
                </div>
              </div>
            </div>

            {/* Structured Data */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
              <h4 className="text-[16px] font-bold text-white mb-4">Structured Data</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-white/60">Has Schema</span>
                  {analysis.structured.hasSchema ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-500" />}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-white/60">JSON-LD Count</span>
                  <span className="text-[14px] font-semibold text-white">{analysis.structured.jsonLdCount}</span>
                </div>
                {analysis.structured.schemas.length > 0 && (
                  <div className="mt-3">
                    <p className="text-[13px] text-white/60 mb-2">Schema Types:</p>
                    <div className="flex flex-wrap gap-2">
                      {analysis.structured.schemas.map((schema, idx) => (
                        <span key={idx} className="px-2 py-1 bg-purple-500/20 text-purple-400 text-[12px] rounded">
                          {schema}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}