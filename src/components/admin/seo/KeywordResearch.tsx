/**
 * ============================================================================
 * KEYWORD RESEARCH TOOL - ADVANCED KEYWORD ANALYSIS
 * ============================================================================
 * 
 * Features:
 * - Keyword suggestions based on seed keyword
 * - Search volume estimates
 * - Keyword difficulty scoring
 * - Related keywords
 * - Long-tail keyword ideas
 * - Questions people ask
 * - Competitor keyword analysis
 * - Keyword grouping
 */

import { useState } from 'react';
import { Search, TrendingUp, Target, Lightbulb, HelpCircle, Users, BarChart3, Download } from 'lucide-react';

interface Keyword {
  keyword: string;
  searchVolume: number;
  difficulty: number;
  cpc: number;
  trend: 'up' | 'down' | 'stable';
  competition: 'low' | 'medium' | 'high';
  intent: 'informational' | 'navigational' | 'commercial' | 'transactional';
}

interface KeywordGroup {
  topic: string;
  keywords: Keyword[];
}

export function KeywordResearch() {
  const [seedKeyword, setSeedKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{
    mainKeywords: Keyword[];
    relatedKeywords: Keyword[];
    longTailKeywords: Keyword[];
    questions: Keyword[];
    groups: KeywordGroup[];
  } | null>(null);
  const [selectedTab, setSelectedTab] = useState<'all' | 'related' | 'longtail' | 'questions' | 'groups'>('all');

  const handleResearch = async () => {
    if (!seedKeyword.trim()) return;

    setLoading(true);
    try {
      // Simulate API call (in production, call actual keyword research API)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockResults = generateMockKeywordData(seedKeyword);
      setResults(mockResults);
    } catch (error) {
      console.error('Keyword research error:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateMockKeywordData = (seed: string) => {
    const base = seed.toLowerCase();
    
    return {
      mainKeywords: [
        {
          keyword: base,
          searchVolume: 10000,
          difficulty: 65,
          cpc: 2.50,
          trend: 'up' as const,
          competition: 'high' as const,
          intent: 'commercial' as const
        },
        {
          keyword: `${base} services`,
          searchVolume: 5000,
          difficulty: 58,
          cpc: 3.20,
          trend: 'up' as const,
          competition: 'medium' as const,
          intent: 'commercial' as const
        },
        {
          keyword: `best ${base}`,
          searchVolume: 8000,
          difficulty: 72,
          cpc: 4.10,
          trend: 'stable' as const,
          competition: 'high' as const,
          intent: 'commercial' as const
        }
      ],
      relatedKeywords: [
        {
          keyword: `${base} company`,
          searchVolume: 3000,
          difficulty: 55,
          cpc: 2.80,
          trend: 'up' as const,
          competition: 'medium' as const,
          intent: 'commercial' as const
        },
        {
          keyword: `${base} agency`,
          searchVolume: 4500,
          difficulty: 60,
          cpc: 3.50,
          trend: 'up' as const,
          competition: 'high' as const,
          intent: 'commercial' as const
        },
        {
          keyword: `${base} solutions`,
          searchVolume: 2800,
          difficulty: 52,
          cpc: 2.90,
          trend: 'stable' as const,
          competition: 'medium' as const,
          intent: 'commercial' as const
        },
        {
          keyword: `professional ${base}`,
          searchVolume: 3200,
          difficulty: 48,
          cpc: 2.60,
          trend: 'up' as const,
          competition: 'medium' as const,
          intent: 'commercial' as const
        }
      ],
      longTailKeywords: [
        {
          keyword: `best ${base} company in indore`,
          searchVolume: 500,
          difficulty: 35,
          cpc: 1.80,
          trend: 'up' as const,
          competition: 'low' as const,
          intent: 'commercial' as const
        },
        {
          keyword: `affordable ${base} services near me`,
          searchVolume: 800,
          difficulty: 28,
          cpc: 1.50,
          trend: 'up' as const,
          competition: 'low' as const,
          intent: 'transactional' as const
        },
        {
          keyword: `top ${base} agency for small business`,
          searchVolume: 400,
          difficulty: 32,
          cpc: 2.20,
          trend: 'stable' as const,
          competition: 'low' as const,
          intent: 'commercial' as const
        }
      ],
      questions: [
        {
          keyword: `what is ${base}?`,
          searchVolume: 2000,
          difficulty: 25,
          cpc: 0.50,
          trend: 'stable' as const,
          competition: 'low' as const,
          intent: 'informational' as const
        },
        {
          keyword: `how does ${base} work?`,
          searchVolume: 1500,
          difficulty: 30,
          cpc: 0.80,
          trend: 'up' as const,
          competition: 'low' as const,
          intent: 'informational' as const
        },
        {
          keyword: `why is ${base} important?`,
          searchVolume: 1200,
          difficulty: 28,
          cpc: 0.60,
          trend: 'stable' as const,
          competition: 'low' as const,
          intent: 'informational' as const
        },
        {
          keyword: `how much does ${base} cost?`,
          searchVolume: 1800,
          difficulty: 35,
          cpc: 1.20,
          trend: 'up' as const,
          competition: 'medium' as const,
          intent: 'commercial' as const
        }
      ],
      groups: [
        {
          topic: 'Service-based keywords',
          keywords: [
            {
              keyword: `${base} services`,
              searchVolume: 5000,
              difficulty: 58,
              cpc: 3.20,
              trend: 'up' as const,
              competition: 'medium' as const,
              intent: 'commercial' as const
            },
            {
              keyword: `${base} solutions`,
              searchVolume: 2800,
              difficulty: 52,
              cpc: 2.90,
              trend: 'stable' as const,
              competition: 'medium' as const,
              intent: 'commercial' as const
            }
          ]
        },
        {
          topic: 'Location-based keywords',
          keywords: [
            {
              keyword: `${base} in indore`,
              searchVolume: 800,
              difficulty: 40,
              cpc: 2.00,
              trend: 'up' as const,
              competition: 'low' as const,
              intent: 'commercial' as const
            },
            {
              keyword: `${base} near me`,
              searchVolume: 1200,
              difficulty: 45,
              cpc: 2.50,
              trend: 'up' as const,
              competition: 'medium' as const,
              intent: 'transactional' as const
            }
          ]
        }
      ]
    };
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 30) return 'text-green-500';
    if (difficulty < 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getDifficultyLabel = (difficulty: number) => {
    if (difficulty < 30) return 'Easy';
    if (difficulty < 60) return 'Medium';
    return 'Hard';
  };

  const exportKeywords = () => {
    if (!results) return;

    const allKeywords = [
      ...results.mainKeywords,
      ...results.relatedKeywords,
      ...results.longTailKeywords,
      ...results.questions
    ];

    const csv = [
      ['Keyword', 'Search Volume', 'Difficulty', 'CPC', 'Competition', 'Intent'].join(','),
      ...allKeywords.map(k =>
        [k.keyword, k.searchVolume, k.difficulty, k.cpc, k.competition, k.intent].join(',')
      )
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `keywords-${seedKeyword}.csv`;
    a.click();
  };

  const renderKeywordCard = (keyword: Keyword, showIntent: boolean = true) => (
    <div
      key={keyword.keyword}
      className="glass p-4 rounded-lg border border-white/10 hover:border-yellow-500/50 transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="text-[14px] font-semibold text-white mb-1">{keyword.keyword}</h4>
          {showIntent && (
            <span className={`text-[11px] px-2 py-0.5 rounded-full ${
              keyword.intent === 'transactional'
                ? 'bg-green-500/20 text-green-400'
                : keyword.intent === 'commercial'
                ? 'bg-blue-500/20 text-blue-400'
                : 'bg-purple-500/20 text-purple-400'
            }`}>
              {keyword.intent}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {keyword.trend === 'up' && <TrendingUp className="w-3 h-3 text-green-500" />}
          {keyword.trend === 'down' && <TrendingUp className="w-3 h-3 text-red-500 transform rotate-180" />}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <p className="text-[11px] text-white/50 mb-1">Volume</p>
          <p className="text-[13px] font-semibold text-white">
            {keyword.searchVolume.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-[11px] text-white/50 mb-1">Difficulty</p>
          <p className={`text-[13px] font-semibold ${getDifficultyColor(keyword.difficulty)}`}>
            {keyword.difficulty} <span className="text-[11px]">({getDifficultyLabel(keyword.difficulty)})</span>
          </p>
        </div>
        <div>
          <p className="text-[11px] text-white/50 mb-1">CPC</p>
          <p className="text-[13px] font-semibold text-white">
            ${keyword.cpc.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-white/5">
        <span className={`text-[11px] px-2 py-1 rounded ${
          keyword.competition === 'low'
            ? 'bg-green-500/10 text-green-400'
            : keyword.competition === 'medium'
            ? 'bg-yellow-500/10 text-yellow-400'
            : 'bg-red-500/10 text-red-400'
        }`}>
          {keyword.competition.toUpperCase()} competition
        </span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[20px] font-bold text-white mb-1">Keyword Research</h2>
          <p className="text-[13px] text-white/60">
            Discover high-value keywords for your content strategy
          </p>
        </div>
        {results && (
          <button
            onClick={exportKeywords}
            className="px-4 py-2 bg-green-500 hover:bg-green-400 text-white rounded-lg text-[13px] font-semibold transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="glass p-6 rounded-xl border border-white/10">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              value={seedKeyword}
              onChange={(e) => setSeedKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleResearch()}
              placeholder="Enter seed keyword (e.g., 'digital marketing')"
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
            />
          </div>
          <button
            onClick={handleResearch}
            disabled={loading || !seedKeyword.trim()}
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed text-black rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black" />
                Researching...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Research
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results */}
      {results && (
        <>
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="glass p-4 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-blue-500" />
                <p className="text-[12px] text-white/60">Total Keywords</p>
              </div>
              <p className="text-[24px] font-bold text-white">
                {results.mainKeywords.length + results.relatedKeywords.length + results.longTailKeywords.length + results.questions.length}
              </p>
            </div>
            <div className="glass p-4 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-4 h-4 text-green-500" />
                <p className="text-[12px] text-white/60">Avg. Volume</p>
              </div>
              <p className="text-[24px] font-bold text-white">
                {Math.round(
                  [...results.mainKeywords, ...results.relatedKeywords, ...results.longTailKeywords, ...results.questions]
                    .reduce((sum, k) => sum + k.searchVolume, 0) /
                  (results.mainKeywords.length + results.relatedKeywords.length + results.longTailKeywords.length + results.questions.length)
                ).toLocaleString()}
              </p>
            </div>
            <div className="glass p-4 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-purple-500" />
                <p className="text-[12px] text-white/60">Avg. Difficulty</p>
              </div>
              <p className="text-[24px] font-bold text-white">
                {Math.round(
                  [...results.mainKeywords, ...results.relatedKeywords, ...results.longTailKeywords, ...results.questions]
                    .reduce((sum, k) => sum + k.difficulty, 0) /
                  (results.mainKeywords.length + results.relatedKeywords.length + results.longTailKeywords.length + results.questions.length)
                )}
              </p>
            </div>
            <div className="glass p-4 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-orange-500" />
                <p className="text-[12px] text-white/60">Avg. CPC</p>
              </div>
              <p className="text-[24px] font-bold text-white">
                $
                {(
                  [...results.mainKeywords, ...results.relatedKeywords, ...results.longTailKeywords, ...results.questions]
                    .reduce((sum, k) => sum + k.cpc, 0) /
                  (results.mainKeywords.length + results.relatedKeywords.length + results.longTailKeywords.length + results.questions.length)
                ).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 border-b border-white/10">
            <button
              onClick={() => setSelectedTab('all')}
              className={`px-4 py-2 text-[13px] font-semibold transition-colors border-b-2 ${
                selectedTab === 'all'
                  ? 'text-yellow-500 border-yellow-500'
                  : 'text-white/60 border-transparent hover:text-white'
              }`}
            >
              Main Keywords ({results.mainKeywords.length})
            </button>
            <button
              onClick={() => setSelectedTab('related')}
              className={`px-4 py-2 text-[13px] font-semibold transition-colors border-b-2 ${
                selectedTab === 'related'
                  ? 'text-yellow-500 border-yellow-500'
                  : 'text-white/60 border-transparent hover:text-white'
              }`}
            >
              Related ({results.relatedKeywords.length})
            </button>
            <button
              onClick={() => setSelectedTab('longtail')}
              className={`px-4 py-2 text-[13px] font-semibold transition-colors border-b-2 ${
                selectedTab === 'longtail'
                  ? 'text-yellow-500 border-yellow-500'
                  : 'text-white/60 border-transparent hover:text-white'
              }`}
            >
              Long-tail ({results.longTailKeywords.length})
            </button>
            <button
              onClick={() => setSelectedTab('questions')}
              className={`px-4 py-2 text-[13px] font-semibold transition-colors border-b-2 ${
                selectedTab === 'questions'
                  ? 'text-yellow-500 border-yellow-500'
                  : 'text-white/60 border-transparent hover:text-white'
              }`}
            >
              Questions ({results.questions.length})
            </button>
            <button
              onClick={() => setSelectedTab('groups')}
              className={`px-4 py-2 text-[13px] font-semibold transition-colors border-b-2 ${
                selectedTab === 'groups'
                  ? 'text-yellow-500 border-yellow-500'
                  : 'text-white/60 border-transparent hover:text-white'
              }`}
            >
              Groups ({results.groups.length})
            </button>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedTab === 'all' && results.mainKeywords.map(k => renderKeywordCard(k))}
            {selectedTab === 'related' && results.relatedKeywords.map(k => renderKeywordCard(k))}
            {selectedTab === 'longtail' && results.longTailKeywords.map(k => renderKeywordCard(k))}
            {selectedTab === 'questions' && results.questions.map(k => renderKeywordCard(k))}
            {selectedTab === 'groups' && (
              <div className="col-span-full space-y-6">
                {results.groups.map((group, idx) => (
                  <div key={idx} className="glass p-6 rounded-xl border border-white/10">
                    <h3 className="text-[16px] font-bold text-white mb-4">{group.topic}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {group.keywords.map(k => renderKeywordCard(k, false))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Empty State */}
      {!results && !loading && (
        <div className="glass p-12 rounded-xl border border-white/10 text-center">
          <Lightbulb className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-[18px] font-semibold text-white mb-2">Start Your Keyword Research</h3>
          <p className="text-[14px] text-white/60 mb-6">
            Enter a seed keyword to discover hundreds of related keywords, search volumes, and opportunities
          </p>
          <div className="flex items-center justify-center gap-4 text-[13px] text-white/50">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span>Smart Suggestions</span>
            </div>
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              <span>Question Keywords</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span>Search Volumes</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
