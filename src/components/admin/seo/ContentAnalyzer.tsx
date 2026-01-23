/**
 * ============================================================================
 * CONTENT ANALYZER - REAL BACKEND INTEGRATION
 * ============================================================================
 * 
 * NOW USES REAL BACKEND FOR:
 * - Readability scoring (Flesch-Kincaid)
 * - Keyword density analysis
 * - Content length recommendations
 * - Heading structure analysis
 * - Image optimization checks
 * - Internal/external link analysis
 * - SEO scoring & recommendations
 */

import { useState } from 'react';
import { FileText, TrendingUp, AlertTriangle, CheckCircle, Zap, Brain, Loader2, RefreshCw } from 'lucide-react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

interface ContentAnalysis {
  summary: {
    wordCount: number;
    sentenceCount: number;
    avgWordsPerSentence: number;
    score: number;
    grade: string;
  };
  readability: {
    fleschKincaid: number;
    grade: string;
    difficulty: string;
  };
  headings: {
    h1Count: number;
    h2Count: number;
    h3Count: number;
    h4Count: number;
    issues: string[];
  };
  images: {
    total: number;
    missingAlt: number;
    withAlt: number;
    issues: string[];
  };
  links: {
    total: number;
    internal: number;
    external: number;
    issues: string[];
  };
  keywords: {
    keyword: string;
    count: number;
    density: number;
    inTitle: boolean;
    inFirstParagraph: boolean;
    status: string;
  } | null;
  recommendations: string[];
  analyzedAt: string;
}

interface ContentAnalyzerProps {
  content: string;
  url?: string;
  targetKeywords?: string;
}

export function ContentAnalyzer({ content, url, targetKeywords }: ContentAnalyzerProps) {
  const [analysis, setAnalysis] = useState<ContentAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeContent = async () => {
    if (!content || content.trim().length === 0) {
      setError('Please provide content to analyze');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/content-analyzer/analyze`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            content,
            url: url || '',
            targetKeywords: targetKeywords || ''
          })
        }
      );

      const result = await response.json();

      if (result.success) {
        setAnalysis(result.analysis);
        console.log('✅ Content analyzed successfully');
      } else {
        setError(result.error || 'Failed to analyze content');
        console.error('❌ Content analysis failed:', result.error);
      }
    } catch (err: any) {
      setError(err.message || 'Network error');
      console.error('❌ Content analysis error:', err);
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

  if (!analysis && !loading && !error) {
    return (
      <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center">
            <Brain className="w-8 h-8 text-purple-500" />
          </div>
          <h3 className="text-[20px] font-bold text-white">Content Analyzer</h3>
          <p className="text-[14px] text-white/60 max-w-md">
            Get instant SEO analysis of your content including readability scores, keyword density, 
            heading structure, and actionable recommendations.
          </p>
          <button
            onClick={analyzeContent}
            disabled={!content || content.trim().length === 0}
            className="px-6 py-3 bg-purple-500 hover:bg-purple-400 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Zap className="w-4 h-4" />
            Analyze Content
          </button>
          {!content && (
            <p className="text-[13px] text-red-400">
              No content provided. Please add content to analyze.
            </p>
          )}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
          <h3 className="text-[18px] font-semibold text-white">Analyzing Content...</h3>
          <p className="text-[14px] text-white/60">
            Calculating readability, analyzing keywords, checking structure...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-[16px] font-semibold text-red-500 mb-2">Analysis Failed</h4>
            <p className="text-[14px] text-red-400">{error}</p>
            <button
              onClick={analyzeContent}
              className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <div className="space-y-6">
      {/* Header with Score */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Brain className="w-6 h-6 text-purple-500" />
            <h3 className="text-[20px] font-bold text-white">Content Analysis Results</h3>
          </div>
          <p className="text-[13px] text-white/60">
            Analyzed {new Date(analysis.analyzedAt).toLocaleString()}
          </p>
        </div>
        <button
          onClick={analyzeContent}
          disabled={loading}
          className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Re-analyze
        </button>
      </div>

      {/* Overall Score */}
      <div className={`border rounded-xl p-6 ${getScoreBgColor(analysis.summary.score)}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[13px] text-white/60 mb-1">Overall SEO Score</p>
            <div className="flex items-baseline gap-3">
              <span className={`text-[48px] font-bold ${getScoreColor(analysis.summary.score)}`}>
                {analysis.summary.score}
              </span>
              <span className="text-[24px] font-semibold text-white/40">/100</span>
              <span className={`text-[20px] font-bold ${getScoreColor(analysis.summary.score)}`}>
                {analysis.summary.grade}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[13px] text-white/60 mb-1">Word Count</p>
            <p className="text-[24px] font-bold text-white">{analysis.summary.wordCount}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-4">
          <p className="text-[13px] text-white/60 mb-1">Readability</p>
          <p className="text-[20px] font-bold text-white">{analysis.readability.fleschKincaid}</p>
          <p className="text-[12px] text-white/40">{analysis.readability.difficulty}</p>
        </div>
        
        <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-4">
          <p className="text-[13px] text-white/60 mb-1">Images</p>
          <p className="text-[20px] font-bold text-white">{analysis.images.total}</p>
          <p className="text-[12px] text-white/40">{analysis.images.missingAlt} missing alt</p>
        </div>
        
        <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-4">
          <p className="text-[13px] text-white/60 mb-1">Links</p>
          <p className="text-[20px] font-bold text-white">{analysis.links.total}</p>
          <p className="text-[12px] text-white/40">{analysis.links.internal} internal</p>
        </div>
        
        <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-4">
          <p className="text-[13px] text-white/60 mb-1">Headings</p>
          <p className="text-[20px] font-bold text-white">
            {analysis.headings.h1Count + analysis.headings.h2Count + analysis.headings.h3Count}
          </p>
          <p className="text-[12px] text-white/40">H1/H2/H3</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Readability */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-blue-500" />
            <h4 className="text-[16px] font-bold text-white">Readability Analysis</h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[14px] text-white/60">Flesch-Kincaid Score</span>
              <span className="text-[14px] font-semibold text-white">{analysis.readability.fleschKincaid}/100</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[14px] text-white/60">Reading Grade</span>
              <span className="text-[14px] font-semibold text-white">{analysis.readability.grade}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[14px] text-white/60">Difficulty</span>
              <span className="text-[14px] font-semibold text-white">{analysis.readability.difficulty}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[14px] text-white/60">Avg Words/Sentence</span>
              <span className="text-[14px] font-semibold text-white">{analysis.summary.avgWordsPerSentence}</span>
            </div>
          </div>
        </div>

        {/* Heading Structure */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <h4 className="text-[16px] font-bold text-white">Heading Structure</h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[14px] text-white/60">H1 Tags</span>
              <span className={`text-[14px] font-semibold ${analysis.headings.h1Count === 1 ? 'text-green-500' : 'text-yellow-500'}`}>
                {analysis.headings.h1Count}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[14px] text-white/60">H2 Tags</span>
              <span className="text-[14px] font-semibold text-white">{analysis.headings.h2Count}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[14px] text-white/60">H3 Tags</span>
              <span className="text-[14px] font-semibold text-white">{analysis.headings.h3Count}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[14px] text-white/60">H4 Tags</span>
              <span className="text-[14px] font-semibold text-white">{analysis.headings.h4Count}</span>
            </div>
          </div>
          {analysis.headings.issues.length > 0 && (
            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-[13px] text-yellow-500 font-medium mb-1">Issues:</p>
              {analysis.headings.issues.map((issue, idx) => (
                <p key={idx} className="text-[12px] text-yellow-400">• {issue}</p>
              ))}
            </div>
          )}
        </div>

        {/* Images */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-purple-500" />
            <h4 className="text-[16px] font-bold text-white">Image Analysis</h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[14px] text-white/60">Total Images</span>
              <span className="text-[14px] font-semibold text-white">{analysis.images.total}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[14px] text-white/60">With Alt Text</span>
              <span className="text-[14px] font-semibold text-green-500">{analysis.images.withAlt}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[14px] text-white/60">Missing Alt Text</span>
              <span className={`text-[14px] font-semibold ${analysis.images.missingAlt > 0 ? 'text-red-500' : 'text-green-500'}`}>
                {analysis.images.missingAlt}
              </span>
            </div>
          </div>
          {analysis.images.issues.length > 0 && (
            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              {analysis.images.issues.map((issue, idx) => (
                <p key={idx} className="text-[12px] text-yellow-400">• {issue}</p>
              ))}
            </div>
          )}
        </div>

        {/* Links */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-yellow-500" />
            <h4 className="text-[16px] font-bold text-white">Link Analysis</h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[14px] text-white/60">Total Links</span>
              <span className="text-[14px] font-semibold text-white">{analysis.links.total}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[14px] text-white/60">Internal Links</span>
              <span className="text-[14px] font-semibold text-blue-500">{analysis.links.internal}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[14px] text-white/60">External Links</span>
              <span className="text-[14px] font-semibold text-purple-500">{analysis.links.external}</span>
            </div>
          </div>
          {analysis.links.issues.length > 0 && (
            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              {analysis.links.issues.map((issue, idx) => (
                <p key={idx} className="text-[12px] text-yellow-400">• {issue}</p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Keyword Analysis */}
      {analysis.keywords && (
        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-cyan-500" />
            <h4 className="text-[16px] font-bold text-white">Keyword Analysis</h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <p className="text-[13px] text-white/60 mb-1">Target Keyword</p>
              <p className="text-[14px] font-semibold text-white">{analysis.keywords.keyword}</p>
            </div>
            <div>
              <p className="text-[13px] text-white/60 mb-1">Occurrences</p>
              <p className="text-[14px] font-semibold text-white">{analysis.keywords.count}x</p>
            </div>
            <div>
              <p className="text-[13px] text-white/60 mb-1">Density</p>
              <p className={`text-[14px] font-semibold ${
                analysis.keywords.status === 'optimal' ? 'text-green-500' :
                analysis.keywords.status === 'low' ? 'text-yellow-500' : 'text-red-500'
              }`}>
                {analysis.keywords.density}%
              </p>
            </div>
            <div>
              <p className="text-[13px] text-white/60 mb-1">In Title</p>
              <p className={`text-[14px] font-semibold ${analysis.keywords.inTitle ? 'text-green-500' : 'text-red-500'}`}>
                {analysis.keywords.inTitle ? 'Yes' : 'No'}
              </p>
            </div>
            <div>
              <p className="text-[13px] text-white/60 mb-1">In First ¶</p>
              <p className={`text-[14px] font-semibold ${analysis.keywords.inFirstParagraph ? 'text-green-500' : 'text-red-500'}`}>
                {analysis.keywords.inFirstParagraph ? 'Yes' : 'No'}
              </p>
            </div>
          </div>
          <div className="mt-4 p-3 rounded-lg" style={{
            backgroundColor: analysis.keywords.status === 'optimal' ? 'rgba(34, 197, 94, 0.1)' :
                           analysis.keywords.status === 'low' ? 'rgba(234, 179, 8, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            borderColor: analysis.keywords.status === 'optimal' ? 'rgba(34, 197, 94, 0.2)' :
                        analysis.keywords.status === 'low' ? 'rgba(234, 179, 8, 0.2)' : 'rgba(239, 68, 68, 0.2)',
            borderWidth: '1px'
          }}>
            <p className="text-[13px] font-medium" style={{
              color: analysis.keywords.status === 'optimal' ? 'rgb(34, 197, 94)' :
                    analysis.keywords.status === 'low' ? 'rgb(234, 179, 8)' : 'rgb(239, 68, 68)'
            }}>
              Status: {analysis.keywords.status === 'optimal' ? '✓ Optimal' : 
                       analysis.keywords.status === 'low' ? '⚠ Too Low' : '✗ Too High'}
            </p>
          </div>
        </div>
      )}

      {/* Recommendations */}
      {analysis.recommendations.length > 0 && (
        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-purple-500" />
            <h4 className="text-[16px] font-bold text-white">Recommendations</h4>
          </div>
          <div className="space-y-2">
            {analysis.recommendations.map((rec, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-purple-400 mt-0.5">•</span>
                <p className="text-[14px] text-white/80">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
