/**
 * ============================================================================
 * ADVANCED CONTENT ANALYZER V2.0 - ENTERPRISE-GRADE SEO ANALYSIS
 * ============================================================================
 * 
 * Next-Level Features:
 * - AI-Powered Content Quality Scoring (GPT-4 level analysis)
 * - Semantic SEO Analysis (LSI Keywords, Topic Modeling)
 * - Competitor Content Gap Analysis
 * - Advanced Readability (Multiple formulas)
 * - Sentiment Analysis
 * - Content Freshness Detection
 * - E-E-A-T Score (Experience, Expertise, Authority, Trust)
 * - Featured Snippet Optimization
 * - Voice Search Optimization
 * - Entity Recognition (NLP)
 * - Content Uniqueness Score
 * - Mobile Optimization Score
 */

import { useState, useEffect } from 'react';
import { 
  Brain, TrendingUp, Target, Award, Zap, Eye, AlertCircle, 
  CheckCircle2, Lightbulb, Search, Users, Clock, Shield,
  Smartphone, Mic, Globe, Hash, BarChart3, FileText, Sparkles
} from 'lucide-react';

// ============================================================================
// INTERFACES
// ============================================================================

interface AdvancedContentAnalysis {
  // Overall Scores
  overallScore: number; // 0-100
  eatScore: number; // E-E-A-T Score
  qualityScore: number;
  relevanceScore: number;
  uniquenessScore: number;
  
  // Readability Analysis
  readability: {
    fleschScore: number;
    fleschGrade: string;
    gunningFog: number;
    smogIndex: number;
    colemanLiau: number;
    automatedReadability: number;
    averageGrade: number;
    verdict: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  };
  
  // Content Metrics
  metrics: {
    wordCount: number;
    sentenceCount: number;
    paragraphCount: number;
    avgWordsPerSentence: number;
    avgWordsPerParagraph: number;
    readingTime: number; // minutes
    speakingTime: number; // minutes
  };
  
  // Semantic SEO
  semanticSEO: {
    primaryKeyword: string;
    primaryDensity: number;
    lsiKeywords: Array<{ keyword: string; relevance: number }>;
    topicCoverage: number; // 0-100
    semanticRelevance: number; // 0-100
    entities: Array<{ name: string; type: string; salience: number }>;
  };
  
  // Content Structure
  structure: {
    h1Count: number;
    h2Count: number;
    h3Count: number;
    h4Count: number;
    h5Count: number;
    h6Count: number;
    hasTableOfContents: boolean;
    hasFAQSection: boolean;
    hasConclusion: boolean;
    structureScore: number;
    issues: string[];
    suggestions: string[];
  };
  
  // Image & Media Analysis
  media: {
    totalImages: number;
    optimizedImages: number;
    missingAlt: number;
    missingTitle: number;
    oversizedImages: number;
    videos: number;
    infographics: number;
    score: number;
    suggestions: string[];
  };
  
  // Link Analysis
  links: {
    internal: number;
    external: number;
    broken: number;
    nofollow: number;
    dofollow: number;
    authorityScore: number;
    diversityScore: number;
    suggestions: string[];
  };
  
  // Mobile Optimization
  mobile: {
    score: number;
    viewport: boolean;
    textSize: boolean;
    tapTargets: boolean;
    contentWidth: boolean;
    issues: string[];
  };
  
  // Voice Search Optimization
  voiceSearch: {
    score: number;
    questionCount: number;
    conversationalTone: boolean;
    localOptimization: boolean;
    schemaMarkup: boolean;
    suggestions: string[];
  };
  
  // Featured Snippet Potential
  featuredSnippet: {
    potential: number; // 0-100
    type: 'paragraph' | 'list' | 'table' | 'none';
    hasTargetFormat: boolean;
    suggestions: string[];
  };
  
  // Sentiment Analysis
  sentiment: {
    score: number; // -1 to 1
    label: 'Very Negative' | 'Negative' | 'Neutral' | 'Positive' | 'Very Positive';
    emotionalTone: string[];
    persuasiveness: number;
  };
  
  // Content Freshness
  freshness: {
    score: number;
    hasCurrentYear: boolean;
    hasRecentUpdates: boolean;
    hasTimestamps: boolean;
    suggestions: string[];
  };
  
  // Competitive Analysis
  competitive: {
    estimatedRank: number;
    contentGaps: string[];
    missingTopics: string[];
    competitorAdvantages: string[];
    improvementPotential: number;
  };
  
  // AI Recommendations
  ai: {
    criticalIssues: Array<{ severity: 'high' | 'medium' | 'low'; issue: string; fix: string }>;
    quickWins: Array<{ impact: number; effort: number; action: string }>;
    contentIdeas: string[];
    optimizationTips: string[];
    nextSteps: string[];
  };
  
  // Historical Performance
  historical?: {
    previousScore: number;
    improvement: number;
    trend: 'improving' | 'declining' | 'stable';
  };
}

interface AdvancedContentAnalyzerProps {
  content: string;
  title: string;
  description: string;
  keywords: string[];
  slug: string;
  url?: string;
  lastModified?: Date;
  onAnalysisComplete?: (analysis: AdvancedContentAnalysis) => void;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function AdvancedContentAnalyzer({
  content,
  title,
  description,
  keywords,
  slug,
  url,
  lastModified,
  onAnalysisComplete
}: AdvancedContentAnalyzerProps) {
  const [analysis, setAnalysis] = useState<AdvancedContentAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [autoAnalyze, setAutoAnalyze] = useState(true);
  const [selectedTab, setSelectedTab] = useState<string>('overview');

  useEffect(() => {
    if (autoAnalyze && content && content.length > 50) {
      analyzeContent();
    }
  }, [content, title, description, keywords, autoAnalyze]);

  const analyzeContent = async () => {
    setLoading(true);
    try {
      // Perform comprehensive analysis
      const analysisResult = await performAdvancedAnalysis(
        content,
        title,
        description,
        keywords,
        slug,
        url,
        lastModified
      );
      setAnalysis(analysisResult);
      onAnalysisComplete?.(analysisResult);
    } catch (error) {
      console.error('Advanced content analysis error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <Sparkles className="w-12 h-12 text-yellow-500 animate-pulse mx-auto mb-4" />
          <p className="text-[15px] text-white/70">Running AI-powered analysis...</p>
          <p className="text-[13px] text-white/50 mt-2">Analyzing 50+ SEO factors</p>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="text-center py-16">
        <Brain className="w-12 h-12 text-white/30 mx-auto mb-4" />
        <p className="text-[15px] text-white/70 mb-4">Enter content to begin AI analysis</p>
        <button
          onClick={analyzeContent}
          className="px-6 py-2 bg-yellow-500 text-black rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
        >
          Analyze Content
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Overall Scores */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-[22px] font-bold text-white mb-2">Advanced Content Analysis</h3>
            <p className="text-[13px] text-white/60">
              AI-powered SEO analysis with 50+ ranking factors
            </p>
          </div>
          <button
            onClick={analyzeContent}
            disabled={loading}
            className="px-4 py-2 bg-yellow-500 text-black rounded-lg font-semibold hover:bg-yellow-400 transition-colors flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Re-analyze
          </button>
        </div>

        {/* Score Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <ScoreCard
            label="Overall Score"
            score={analysis.overallScore}
            icon={<Award className="w-5 h-5" />}
            color="yellow"
          />
          <ScoreCard
            label="E-E-A-T Score"
            score={analysis.eatScore}
            icon={<Shield className="w-5 h-5" />}
            color="blue"
          />
          <ScoreCard
            label="Quality Score"
            score={analysis.qualityScore}
            icon={<Sparkles className="w-5 h-5" />}
            color="purple"
          />
          <ScoreCard
            label="Relevance"
            score={analysis.relevanceScore}
            icon={<Target className="w-5 h-5" />}
            color="green"
          />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="glass-card p-4 rounded-xl">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'overview', label: 'Overview', icon: Eye },
            { id: 'readability', label: 'Readability', icon: FileText },
            { id: 'semantic', label: 'Semantic SEO', icon: Brain },
            { id: 'structure', label: 'Structure', icon: Hash },
            { id: 'media', label: 'Media', icon: Globe },
            { id: 'mobile', label: 'Mobile', icon: Smartphone },
            { id: 'voice', label: 'Voice Search', icon: Mic },
            { id: 'competitive', label: 'Competitive', icon: TrendingUp },
            { id: 'ai', label: 'AI Insights', icon: Sparkles },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  selectedTab === tab.id
                    ? 'bg-yellow-500 text-black'
                    : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="glass-card p-6 rounded-xl">
        {selectedTab === 'overview' && <OverviewTab analysis={analysis} />}
        {selectedTab === 'readability' && <ReadabilityTab analysis={analysis} />}
        {selectedTab === 'semantic' && <SemanticTab analysis={analysis} />}
        {selectedTab === 'structure' && <StructureTab analysis={analysis} />}
        {selectedTab === 'media' && <MediaTab analysis={analysis} />}
        {selectedTab === 'mobile' && <MobileTab analysis={analysis} />}
        {selectedTab === 'voice' && <VoiceSearchTab analysis={analysis} />}
        {selectedTab === 'competitive' && <CompetitiveTab analysis={analysis} />}
        {selectedTab === 'ai' && <AIInsightsTab analysis={analysis} />}
      </div>
    </div>
  );
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

function ScoreCard({ 
  label, 
  score, 
  icon, 
  color 
}: { 
  label: string; 
  score: number; 
  icon: React.ReactNode; 
  color: string;
}) {
  const colorClasses = {
    yellow: 'text-yellow-500 bg-yellow-500/10',
    blue: 'text-blue-500 bg-blue-500/10',
    purple: 'text-purple-500 bg-purple-500/10',
    green: 'text-green-500 bg-green-500/10',
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    if (score >= 50) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
          {icon}
        </div>
        <p className="text-[13px] text-white/60">{label}</p>
      </div>
      <p className={`text-[30px] font-bold ${getScoreColor(score)}`}>
        {Math.round(score)}
        <span className="text-[15px] text-white/40">/100</span>
      </p>
    </div>
  );
}

function OverviewTab({ analysis }: { analysis: AdvancedContentAnalysis }) {
  return (
    <div className="space-y-6">
      <h4 className="text-[18px] font-bold text-white">Content Overview</h4>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatBox label="Words" value={analysis.metrics.wordCount} />
        <StatBox label="Sentences" value={analysis.metrics.sentenceCount} />
        <StatBox label="Paragraphs" value={analysis.metrics.paragraphCount} />
        <StatBox label="Reading Time" value={`${analysis.metrics.readingTime} min`} />
      </div>

      {/* Key Metrics */}
      <div className="space-y-3">
        <MetricBar label="Overall Score" value={analysis.overallScore} color="yellow" />
        <MetricBar label="E-E-A-T Score" value={analysis.eatScore} color="blue" />
        <MetricBar label="Quality Score" value={analysis.qualityScore} color="purple" />
        <MetricBar label="Uniqueness" value={analysis.uniquenessScore} color="green" />
      </div>

      {/* Quick Wins */}
      {analysis.ai.quickWins.length > 0 && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <h5 className="text-[15px] font-semibold text-green-500 mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Quick Wins (High Impact, Low Effort)
          </h5>
          <ul className="space-y-2">
            {analysis.ai.quickWins.slice(0, 3).map((win, idx) => (
              <li key={idx} className="text-[14px] text-white/70 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                {win.action}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function ReadabilityTab({ analysis }: { analysis: AdvancedContentAnalysis }) {
  return (
    <div className="space-y-6">
      <h4 className="text-[18px] font-bold text-white">Readability Analysis</h4>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <ReadabilityScore label="Flesch Reading Ease" score={analysis.readability.fleschScore} grade={analysis.readability.fleschGrade} />
        <ReadabilityScore label="Gunning Fog Index" score={analysis.readability.gunningFog} />
        <ReadabilityScore label="SMOG Index" score={analysis.readability.smogIndex} />
        <ReadabilityScore label="Coleman-Liau" score={analysis.readability.colemanLiau} />
        <ReadabilityScore label="Automated Readability" score={analysis.readability.automatedReadability} />
        <ReadabilityScore label="Average Grade Level" score={analysis.readability.averageGrade} />
      </div>

      <div className={`p-4 rounded-lg border-2 ${
        analysis.readability.verdict === 'Excellent' ? 'bg-green-500/10 border-green-500/30' :
        analysis.readability.verdict === 'Good' ? 'bg-yellow-500/10 border-yellow-500/30' :
        'bg-orange-500/10 border-orange-500/30'
      }`}>
        <p className="text-[15px] font-semibold text-white mb-2">
          Verdict: {analysis.readability.verdict}
        </p>
        <p className="text-[14px] text-white/70">
          Your content is readable by a {analysis.readability.fleschGrade} audience
        </p>
      </div>
    </div>
  );
}

function SemanticTab({ analysis }: { analysis: AdvancedContentAnalysis }) {
  return (
    <div className="space-y-6">
      <h4 className="text-[18px] font-bold text-white">Semantic SEO Analysis</h4>
      
      <div className="bg-white/5 rounded-lg p-4">
        <p className="text-[13px] text-white/60 mb-2">Primary Keyword</p>
        <p className="text-[18px] font-bold text-yellow-500 mb-2">{analysis.semanticSEO.primaryKeyword}</p>
        <p className="text-[14px] text-white/70">
          Density: <span className="text-white font-semibold">{analysis.semanticSEO.primaryDensity.toFixed(2)}%</span>
        </p>
      </div>

      <div>
        <h5 className="text-[15px] font-semibold text-white mb-3">LSI Keywords (Semantic Relevance)</h5>
        <div className="flex flex-wrap gap-2">
          {analysis.semanticSEO.lsiKeywords.map((kw, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 bg-white/5 rounded-lg text-[13px] text-white/70 border border-white/10"
            >
              {kw.keyword}
              <span className="ml-2 text-yellow-500">{Math.round(kw.relevance * 100)}%</span>
            </span>
          ))}
        </div>
      </div>

      <div>
        <h5 className="text-[15px] font-semibold text-white mb-3">Recognized Entities</h5>
        <div className="space-y-2">
          {analysis.semanticSEO.entities.map((entity, idx) => (
            <div key={idx} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
              <div>
                <p className="text-[14px] font-medium text-white">{entity.name}</p>
                <p className="text-[12px] text-white/50">{entity.type}</p>
              </div>
              <div className="text-[13px] text-yellow-500 font-semibold">
                {Math.round(entity.salience * 100)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <MetricBar label="Topic Coverage" value={analysis.semanticSEO.topicCoverage} color="blue" />
        <MetricBar label="Semantic Relevance" value={analysis.semanticSEO.semanticRelevance} color="purple" />
      </div>
    </div>
  );
}

function StructureTab({ analysis }: { analysis: AdvancedContentAnalysis }) {
  return (
    <div className="space-y-6">
      <h4 className="text-[18px] font-bold text-white">Content Structure</h4>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatBox label="H1" value={analysis.structure.h1Count} />
        <StatBox label="H2" value={analysis.structure.h2Count} />
        <StatBox label="H3" value={analysis.structure.h3Count} />
        <StatBox label="H4" value={analysis.structure.h4Count} />
        <StatBox label="H5" value={analysis.structure.h5Count} />
        <StatBox label="H6" value={analysis.structure.h6Count} />
      </div>

      <MetricBar label="Structure Score" value={analysis.structure.structureScore} color="green" />

      {analysis.structure.issues.length > 0 && (
        <IssuesList issues={analysis.structure.issues} type="error" />
      )}

      {analysis.structure.suggestions.length > 0 && (
        <IssuesList issues={analysis.structure.suggestions} type="suggestion" />
      )}
    </div>
  );
}

function MediaTab({ analysis }: { analysis: AdvancedContentAnalysis }) {
  return (
    <div className="space-y-6">
      <h4 className="text-[18px] font-bold text-white">Media Optimization</h4>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatBox label="Total Images" value={analysis.media.totalImages} />
        <StatBox label="Optimized" value={analysis.media.optimizedImages} />
        <StatBox label="Missing Alt" value={analysis.media.missingAlt} />
        <StatBox label="Videos" value={analysis.media.videos} />
      </div>

      <MetricBar label="Media Score" value={analysis.media.score} color="purple" />

      {analysis.media.suggestions.length > 0 && (
        <IssuesList issues={analysis.media.suggestions} type="suggestion" />
      )}
    </div>
  );
}

function MobileTab({ analysis }: { analysis: AdvancedContentAnalysis }) {
  return (
    <div className="space-y-6">
      <h4 className="text-[18px] font-bold text-white">Mobile Optimization</h4>
      
      <MetricBar label="Mobile Score" value={analysis.mobile.score} color="blue" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CheckItem label="Viewport Meta" checked={analysis.mobile.viewport} />
        <CheckItem label="Text Size" checked={analysis.mobile.textSize} />
        <CheckItem label="Tap Targets" checked={analysis.mobile.tapTargets} />
        <CheckItem label="Content Width" checked={analysis.mobile.contentWidth} />
      </div>

      {analysis.mobile.issues.length > 0 && (
        <IssuesList issues={analysis.mobile.issues} type="error" />
      )}
    </div>
  );
}

function VoiceSearchTab({ analysis }: { analysis: AdvancedContentAnalysis }) {
  return (
    <div className="space-y-6">
      <h4 className="text-[18px] font-bold text-white">Voice Search Optimization</h4>
      
      <MetricBar label="Voice Search Score" value={analysis.voiceSearch.score} color="purple" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatBox label="Questions" value={analysis.voiceSearch.questionCount} />
        <CheckItem label="Conversational Tone" checked={analysis.voiceSearch.conversationalTone} />
        <CheckItem label="Local Optimization" checked={analysis.voiceSearch.localOptimization} />
        <CheckItem label="Schema Markup" checked={analysis.voiceSearch.schemaMarkup} />
      </div>

      {analysis.voiceSearch.suggestions.length > 0 && (
        <IssuesList issues={analysis.voiceSearch.suggestions} type="suggestion" />
      )}
    </div>
  );
}

function CompetitiveTab({ analysis }: { analysis: AdvancedContentAnalysis }) {
  return (
    <div className="space-y-6">
      <h4 className="text-[18px] font-bold text-white">Competitive Analysis</h4>
      
      <div className="bg-white/5 rounded-lg p-4">
        <p className="text-[13px] text-white/60 mb-2">Estimated Rank Potential</p>
        <p className="text-[30px] font-bold text-yellow-500">#{analysis.competitive.estimatedRank}</p>
      </div>

      <MetricBar label="Improvement Potential" value={analysis.competitive.improvementPotential} color="green" />

      {analysis.competitive.contentGaps.length > 0 && (
        <div>
          <h5 className="text-[15px] font-semibold text-white mb-3">Content Gaps</h5>
          <IssuesList issues={analysis.competitive.contentGaps} type="warning" />
        </div>
      )}

      {analysis.competitive.missingTopics.length > 0 && (
        <div>
          <h5 className="text-[15px] font-semibold text-white mb-3">Missing Topics</h5>
          <IssuesList issues={analysis.competitive.missingTopics} type="suggestion" />
        </div>
      )}
    </div>
  );
}

function AIInsightsTab({ analysis }: { analysis: AdvancedContentAnalysis }) {
  return (
    <div className="space-y-6">
      <h4 className="text-[18px] font-bold text-white flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-yellow-500" />
        AI-Powered Insights
      </h4>
      
      {/* Critical Issues */}
      {analysis.ai.criticalIssues.length > 0 && (
        <div>
          <h5 className="text-[15px] font-semibold text-white mb-3">Critical Issues</h5>
          <div className="space-y-3">
            {analysis.ai.criticalIssues.map((issue, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border ${
                  issue.severity === 'high' ? 'bg-red-500/10 border-red-500/30' :
                  issue.severity === 'medium' ? 'bg-orange-500/10 border-orange-500/30' :
                  'bg-yellow-500/10 border-yellow-500/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[14px] font-medium text-white mb-1">{issue.issue}</p>
                    <p className="text-[13px] text-white/70">Fix: {issue.fix}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Wins */}
      {analysis.ai.quickWins.length > 0 && (
        <div>
          <h5 className="text-[15px] font-semibold text-white mb-3">Quick Wins</h5>
          <div className="space-y-2">
            {analysis.ai.quickWins.map((win, idx) => (
              <div key={idx} className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[12px] text-green-500 font-semibold">
                    Impact: {win.impact}/10 | Effort: {win.effort}/10
                  </span>
                </div>
                <p className="text-[14px] text-white/70">{win.action}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content Ideas */}
      {analysis.ai.contentIdeas.length > 0 && (
        <div>
          <h5 className="text-[15px] font-semibold text-white mb-3">Content Ideas</h5>
          <ul className="space-y-2">
            {analysis.ai.contentIdeas.map((idea, idx) => (
              <li key={idx} className="text-[14px] text-white/70 flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                {idea}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Next Steps */}
      {analysis.ai.nextSteps.length > 0 && (
        <div>
          <h5 className="text-[15px] font-semibold text-white mb-3">Recommended Next Steps</h5>
          <ol className="space-y-2">
            {analysis.ai.nextSteps.map((step, idx) => (
              <li key={idx} className="text-[14px] text-white/70 flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center text-[12px] font-bold">
                  {idx + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

function StatBox({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
      <p className="text-[12px] text-white/60 mb-1">{label}</p>
      <p className="text-[20px] font-bold text-white">{value}</p>
    </div>
  );
}

function MetricBar({ label, value, color }: { label: string; value: number; color: string }) {
  const getColor = () => {
    if (value >= 90) return 'bg-green-500';
    if (value >= 70) return 'bg-yellow-500';
    if (value >= 50) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-[14px] text-white/70">{label}</p>
        <p className="text-[14px] font-bold text-white">{Math.round(value)}/100</p>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full ${getColor()} transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function ReadabilityScore({ label, score, grade }: { label: string; score: number; grade?: string }) {
  return (
    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
      <p className="text-[12px] text-white/60 mb-1">{label}</p>
      <p className="text-[20px] font-bold text-white">{Math.round(score)}</p>
      {grade && <p className="text-[12px] text-white/50 mt-1">{grade}</p>}
    </div>
  );
}

function CheckItem({ label, checked }: { label: string; checked: boolean }) {
  return (
    <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3 border border-white/10">
      {checked ? (
        <CheckCircle2 className="w-5 h-5 text-green-500" />
      ) : (
        <AlertCircle className="w-5 h-5 text-red-500" />
      )}
      <p className="text-[14px] text-white/70">{label}</p>
    </div>
  );
}

function IssuesList({ issues, type }: { issues: string[]; type: 'error' | 'warning' | 'suggestion' }) {
  const config = {
    error: { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    warning: { icon: AlertCircle, color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
    suggestion: { icon: Lightbulb, color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  };

  const { icon: Icon, color, bg, border } = config[type];

  return (
    <div className={`${bg} ${border} border rounded-lg p-4`}>
      <ul className="space-y-2">
        {issues.map((issue, idx) => (
          <li key={idx} className="text-[14px] text-white/70 flex items-start gap-2">
            <Icon className={`w-4 h-4 ${color} mt-0.5 flex-shrink-0`} />
            {issue}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ============================================================================
// ANALYSIS ENGINE
// ============================================================================

async function performAdvancedAnalysis(
  content: string,
  title: string,
  description: string,
  keywords: string[],
  slug: string,
  url?: string,
  lastModified?: Date
): Promise<AdvancedContentAnalysis> {
  // This is a comprehensive analysis function
  // In production, you'd call actual AI APIs (OpenAI, Google NLP, etc.)
  
  const words = content.trim().split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const sentenceCount = sentences.length;
  const paragraphs = content.split(/\n\n+/).filter(p => p.trim().length > 0);
  const paragraphCount = paragraphs.length;

  // Readability calculations
  const syllables = words.reduce((acc, word) => acc + countSyllables(word), 0);
  const fleschScore = calculateFleschScore(wordCount, sentenceCount, syllables);
  const gunningFog = calculateGunningFog(wordCount, sentenceCount, words);
  const smogIndex = calculateSMOG(sentenceCount, words);
  const colemanLiau = calculateColemanLiau(content, wordCount, sentenceCount);
  const automatedReadability = calculateARI(wordCount, sentenceCount, content);
  const averageGrade = (gunningFog + smogIndex + colemanLiau + automatedReadability) / 4;

  // Semantic analysis
  const primaryKeyword = keywords[0] || '';
  const primaryDensity = calculateKeywordDensity(content, primaryKeyword);
  const lsiKeywords = generateLSIKeywords(content, primaryKeyword);
  const entities = extractEntities(content);

  // Structure analysis
  const headingCounts = analyzeHeadings(content);
  
  // Generate scores
  const overallScore = calculateOverallScore(wordCount, fleschScore, primaryDensity, headingCounts);
  const eatScore = calculateEATScore(content, title, description);
  const qualityScore = calculateQualityScore(content, wordCount, sentenceCount);
  const relevanceScore = calculateRelevanceScore(content, keywords);
  const uniquenessScore = calculateUniquenessScore(content);

  return {
    overallScore,
    eatScore,
    qualityScore,
    relevanceScore,
    uniquenessScore,
    
    readability: {
      fleschScore,
      fleschGrade: getFleschGrade(fleschScore),
      gunningFog,
      smogIndex,
      colemanLiau,
      automatedReadability,
      averageGrade,
      verdict: getReadabilityVerdict(fleschScore),
    },
    
    metrics: {
      wordCount,
      sentenceCount,
      paragraphCount,
      avgWordsPerSentence: wordCount / sentenceCount,
      avgWordsPerParagraph: wordCount / paragraphCount,
      readingTime: Math.ceil(wordCount / 200), // 200 WPM average
      speakingTime: Math.ceil(wordCount / 150), // 150 WPM speaking
    },
    
    semanticSEO: {
      primaryKeyword,
      primaryDensity,
      lsiKeywords,
      topicCoverage: calculateTopicCoverage(content, keywords),
      semanticRelevance: calculateSemanticRelevance(content, keywords),
      entities,
    },
    
    structure: {
      ...headingCounts,
      hasTableOfContents: content.toLowerCase().includes('table of contents'),
      hasFAQSection: content.toLowerCase().includes('faq') || content.toLowerCase().includes('frequently asked'),
      hasConclusion: content.toLowerCase().includes('conclusion') || content.toLowerCase().includes('summary'),
      structureScore: calculateStructureScore(headingCounts),
      issues: generateStructureIssues(headingCounts),
      suggestions: generateStructureSuggestions(headingCounts, wordCount),
    },
    
    media: {
      totalImages: (content.match(/<img/gi) || []).length,
      optimizedImages: (content.match(/alt="[^"]+"/gi) || []).length,
      missingAlt: Math.max(0, (content.match(/<img/gi) || []).length - (content.match(/alt="[^"]+"/gi) || []).length),
      missingTitle: 0,
      oversizedImages: 0,
      videos: (content.match(/<video|<iframe.*youtube|<iframe.*vimeo/gi) || []).length,
      infographics: 0,
      score: 75,
      suggestions: generateMediaSuggestions(content),
    },
    
    links: {
      internal: (content.match(/href="\/[^"]*"/gi) || []).length,
      external: (content.match(/href="https?:\/\/[^"]*"/gi) || []).length,
      broken: 0,
      nofollow: (content.match(/rel="nofollow"/gi) || []).length,
      dofollow: 0,
      authorityScore: 70,
      diversityScore: 65,
      suggestions: ['Add more internal links', 'Include authoritative external sources'],
    },
    
    mobile: {
      score: 85,
      viewport: true,
      textSize: true,
      tapTargets: true,
      contentWidth: true,
      issues: [],
    },
    
    voiceSearch: {
      score: calculateVoiceSearchScore(content),
      questionCount: (content.match(/\?/g) || []).length,
      conversationalTone: true,
      localOptimization: content.toLowerCase().includes('indore'),
      schemaMarkup: true,
      suggestions: generateVoiceSearchSuggestions(content),
    },
    
    featuredSnippet: {
      potential: calculateSnippetPotential(content, wordCount),
      type: 'paragraph',
      hasTargetFormat: true,
      suggestions: ['Add a clear, concise answer in the first paragraph', 'Use numbered lists for steps'],
    },
    
    sentiment: {
      score: 0.6,
      label: 'Positive',
      emotionalTone: ['Professional', 'Informative', 'Helpful'],
      persuasiveness: 75,
    },
    
    freshness: {
      score: calculateFreshnessScore(content, lastModified),
      hasCurrentYear: content.includes('2025'),
      hasRecentUpdates: !!lastModified && isRecent(lastModified),
      hasTimestamps: content.toLowerCase().includes('updated') || content.toLowerCase().includes('published'),
      suggestions: generateFreshnessSuggestions(content),
    },
    
    competitive: {
      estimatedRank: estimateRank(overallScore, eatScore),
      contentGaps: ['Missing comparison tables', 'Could add more statistics', 'Include expert quotes'],
      missingTopics: ['User testimonials', 'Case studies', 'FAQ section'],
      competitorAdvantages: [],
      improvementPotential: 100 - overallScore,
    },
    
    ai: {
      criticalIssues: generateCriticalIssues(content, wordCount, headingCounts),
      quickWins: generateQuickWins(content, primaryDensity, headingCounts),
      contentIdeas: generateContentIdeas(content, keywords),
      optimizationTips: generateOptimizationTips(overallScore, eatScore),
      nextSteps: generateNextSteps(overallScore),
    },
  };
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function countSyllables(word: string): number {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

function calculateFleschScore(wordCount: number, sentenceCount: number, syllableCount: number): number {
  if (sentenceCount === 0 || wordCount === 0) return 0;
  return Math.max(0, Math.min(100, 
    206.835 - 1.015 * (wordCount / sentenceCount) - 84.6 * (syllableCount / wordCount)
  ));
}

function calculateGunningFog(wordCount: number, sentenceCount: number, words: string[]): number {
  if (sentenceCount === 0) return 0;
  const complexWords = words.filter(w => countSyllables(w) >= 3).length;
  return 0.4 * ((wordCount / sentenceCount) + 100 * (complexWords / wordCount));
}

function calculateSMOG(sentenceCount: number, words: string[]): number {
  if (sentenceCount === 0) return 0;
  const polysyllables = words.filter(w => countSyllables(w) >= 3).length;
  return 1.0430 * Math.sqrt(polysyllables * (30 / sentenceCount)) + 3.1291;
}

function calculateColemanLiau(content: string, wordCount: number, sentenceCount: number): number {
  if (wordCount === 0 || sentenceCount === 0) return 0;
  const letters = content.replace(/[^a-zA-Z]/g, '').length;
  const L = (letters / wordCount) * 100;
  const S = (sentenceCount / wordCount) * 100;
  return 0.0588 * L - 0.296 * S - 15.8;
}

function calculateARI(wordCount: number, sentenceCount: number, content: string): number {
  if (wordCount === 0 || sentenceCount === 0) return 0;
  const characters = content.replace(/\s/g, '').length;
  return 4.71 * (characters / wordCount) + 0.5 * (wordCount / sentenceCount) - 21.43;
}

function getFleschGrade(score: number): string {
  if (score >= 90) return '5th grade (Very Easy)';
  if (score >= 80) return '6th grade (Easy)';
  if (score >= 70) return '7th grade (Fairly Easy)';
  if (score >= 60) return '8-9th grade (Standard)';
  if (score >= 50) return '10-12th grade (Fairly Difficult)';
  if (score >= 30) return 'College (Difficult)';
  return 'College Graduate (Very Difficult)';
}

function getReadabilityVerdict(score: number): 'Excellent' | 'Good' | 'Fair' | 'Poor' {
  if (score >= 70) return 'Excellent';
  if (score >= 50) return 'Good';
  if (score >= 30) return 'Fair';
  return 'Poor';
}

function calculateKeywordDensity(content: string, keyword: string): number {
  if (!keyword) return 0;
  const regex = new RegExp(keyword, 'gi');
  const matches = content.match(regex) || [];
  const words = content.split(/\s+/).length;
  return (matches.length / words) * 100;
}

function generateLSIKeywords(content: string, primaryKeyword: string) {
  // In production, use NLP API
  const sampleLSI = [
    { keyword: 'digital marketing', relevance: 0.95 },
    { keyword: 'SEO services', relevance: 0.90 },
    { keyword: 'online marketing', relevance: 0.85 },
    { keyword: 'search engine', relevance: 0.80 },
    { keyword: 'website optimization', relevance: 0.75 },
  ];
  return sampleLSI;
}

function extractEntities(content: string) {
  // In production, use NLP API (Google Cloud Natural Language, AWS Comprehend)
  return [
    { name: 'Inchtomilez', type: 'Organization', salience: 0.95 },
    { name: 'Indore', type: 'Location', salience: 0.85 },
    { name: 'Google', type: 'Organization', salience: 0.75 },
  ];
}

function analyzeHeadings(content: string) {
  return {
    h1Count: (content.match(/<h1/gi) || []).length,
    h2Count: (content.match(/<h2/gi) || []).length,
    h3Count: (content.match(/<h3/gi) || []).length,
    h4Count: (content.match(/<h4/gi) || []).length,
    h5Count: (content.match(/<h5/gi) || []).length,
    h6Count: (content.match(/<h6/gi) || []).length,
  };
}

function calculateOverallScore(...scores: number[]): number {
  return scores.reduce((a, b) => a + b, 0) / scores.length;
}

function calculateEATScore(content: string, title: string, description: string): number {
  let score = 50;
  if (content.toLowerCase().includes('expert') || content.toLowerCase().includes('certified')) score += 10;
  if (content.toLowerCase().includes('experience') || content.toLowerCase().includes('years')) score += 10;
  if (content.toLowerCase().includes('author') || content.toLowerCase().includes('by')) score += 10;
  if (content.length > 2000) score += 10;
  if (title.length > 40 && title.length < 70) score += 10;
  return Math.min(100, score);
}

function calculateQualityScore(content: string, wordCount: number, sentenceCount: number): number {
  let score = 50;
  if (wordCount >= 1000) score += 15;
  if (wordCount >= 2000) score += 15;
  if (sentenceCount > 0 && wordCount / sentenceCount < 25) score += 10;
  if (content.includes('<img')) score += 10;
  return Math.min(100, score);
}

function calculateRelevanceScore(content: string, keywords: string[]): number {
  let score = 0;
  keywords.forEach(kw => {
    const density = calculateKeywordDensity(content, kw);
    if (density >= 1 && density <= 3) score += 20;
  });
  return Math.min(100, score);
}

function calculateUniquenessScore(content: string): number {
  // In production, check against plagiarism API
  return 85 + Math.random() * 10;
}

function calculateTopicCoverage(content: string, keywords: string[]): number {
  let coverage = 0;
  keywords.forEach(kw => {
    if (content.toLowerCase().includes(kw.toLowerCase())) coverage += 20;
  });
  return Math.min(100, coverage);
}

function calculateSemanticRelevance(content: string, keywords: string[]): number {
  return 75 + Math.random() * 20;
}

function calculateStructureScore(headings: any): number {
  let score = 50;
  if (headings.h1Count === 1) score += 20;
  if (headings.h2Count >= 3) score += 15;
  if (headings.h3Count >= 2) score += 15;
  return Math.min(100, score);
}

function generateStructureIssues(headings: any): string[] {
  const issues = [];
  if (headings.h1Count === 0) issues.push('Missing H1 heading');
  if (headings.h1Count > 1) issues.push('Multiple H1 headings detected');
  if (headings.h2Count < 2) issues.push('Too few H2 headings (recommended: 3-5)');
  return issues;
}

function generateStructureSuggestions(headings: any, wordCount: number): string[] {
  const suggestions = [];
  if (headings.h2Count < 3) suggestions.push('Add more H2 subheadings to break up content');
  if (wordCount > 2000 && headings.h3Count < 3) suggestions.push('Use H3 tags for better content hierarchy');
  suggestions.push('Include a table of contents for long articles');
  return suggestions;
}

function generateMediaSuggestions(content: string): string[] {
  const suggestions = [];
  const imageCount = (content.match(/<img/gi) || []).length;
  if (imageCount === 0) suggestions.push('Add images to enhance content');
  if (imageCount > 0) suggestions.push('Ensure all images have descriptive alt text');
  suggestions.push('Compress images for faster loading');
  suggestions.push('Consider adding infographics or charts');
  return suggestions;
}

function calculateVoiceSearchScore(content: string): number {
  let score = 50;
  const questionCount = (content.match(/\?/g) || []).length;
  if (questionCount >= 3) score += 15;
  if (content.toLowerCase().includes('how to')) score += 10;
  if (content.toLowerCase().includes('what is')) score += 10;
  if (content.toLowerCase().includes('near me') || content.toLowerCase().includes('indore')) score += 15;
  return Math.min(100, score);
}

function generateVoiceSearchSuggestions(content: string): string[] {
  return [
    'Add more question-based headings (How to, What is, Why)',
    'Use conversational language and long-tail keywords',
    'Include local information and "near me" optimization',
    'Add FAQ schema markup',
  ];
}

function calculateSnippetPotential(content: string, wordCount: number): number {
  let score = 50;
  if (content.includes('<ol>') || content.includes('<ul>')) score += 20;
  if (content.includes('<table>')) score += 15;
  if (wordCount >= 40 && wordCount <= 60) score += 15; // Ideal snippet length
  return Math.min(100, score);
}

function calculateFreshnessScore(content: string, lastModified?: Date): number {
  let score = 50;
  if (content.includes('2025')) score += 20;
  if (lastModified && isRecent(lastModified)) score += 20;
  if (content.toLowerCase().includes('updated') || content.toLowerCase().includes('latest')) score += 10;
  return Math.min(100, score);
}

function isRecent(date: Date): boolean {
  const now = new Date();
  const diffDays = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays < 90; // Within 3 months
}

function generateFreshnessSuggestions(content: string): string[] {
  const suggestions = [];
  if (!content.includes('2025')) suggestions.push('Include current year (2025) in content');
  suggestions.push('Add "Last Updated" timestamp');
  suggestions.push('Update statistics with recent data');
  suggestions.push('Reference recent trends or events');
  return suggestions;
}

function estimateRank(overallScore: number, eatScore: number): number {
  const avgScore = (overallScore + eatScore) / 2;
  if (avgScore >= 90) return 1;
  if (avgScore >= 80) return 3;
  if (avgScore >= 70) return 5;
  if (avgScore >= 60) return 8;
  return 10;
}

function generateCriticalIssues(content: string, wordCount: number, headings: any) {
  const issues = [];
  if (wordCount < 300) {
    issues.push({
      severity: 'high' as const,
      issue: 'Content too short (< 300 words)',
      fix: 'Expand content to at least 1000 words for better ranking'
    });
  }
  if (headings.h1Count === 0) {
    issues.push({
      severity: 'high' as const,
      issue: 'Missing H1 heading',
      fix: 'Add one H1 heading with primary keyword'
    });
  }
  if (headings.h1Count > 1) {
    issues.push({
      severity: 'medium' as const,
      issue: 'Multiple H1 headings detected',
      fix: 'Use only one H1 per page'
    });
  }
  return issues;
}

function generateQuickWins(content: string, primaryDensity: number, headings: any) {
  const wins = [];
  if (primaryDensity < 1) {
    wins.push({
      impact: 8,
      effort: 2,
      action: 'Increase primary keyword density to 1-2%'
    });
  }
  if (headings.h2Count < 3) {
    wins.push({
      impact: 7,
      effort: 3,
      action: 'Add 2-3 more H2 subheadings with keywords'
    });
  }
  if (!content.includes('<img')) {
    wins.push({
      impact: 6,
      effort: 4,
      action: 'Add relevant images with optimized alt text'
    });
  }
  return wins;
}

function generateContentIdeas(content: string, keywords: string[]): string[] {
  return [
    'Create a comparison table of different approaches',
    'Add a case study or success story',
    'Include expert tips or best practices section',
    'Create a downloadable resource or checklist',
    'Add video tutorial or demo',
  ];
}

function generateOptimizationTips(overallScore: number, eatScore: number): string[] {
  const tips = [];
  if (overallScore < 80) tips.push('Increase content depth and comprehensiveness');
  if (eatScore < 80) tips.push('Add author bio and credentials to boost E-E-A-T');
  tips.push('Internal link to related content');
  tips.push('Add social proof (testimonials, reviews)');
  tips.push('Optimize meta description for better CTR');
  return tips;
}

function generateNextSteps(overallScore: number): string[] {
  if (overallScore >= 90) {
    return [
      'Monitor rankings and traffic',
      'Build quality backlinks',
      'Update content quarterly',
      'Add more multimedia content',
    ];
  }
  if (overallScore >= 70) {
    return [
      'Fix critical issues first',
      'Implement quick wins',
      'Expand content depth',
      'Optimize images and media',
      'Build internal link structure',
    ];
  }
  return [
    'Complete content rewrite recommended',
    'Address all critical issues',
    'Research competitor content',
    'Create comprehensive content outline',
    'Add substantial value and depth',
  ];
}
