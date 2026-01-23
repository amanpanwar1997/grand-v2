import { useState, useEffect } from 'react';
import { 
  Users, 
  TrendingUp, 
  Target, 
  Link, 
  BarChart3, 
  Eye, 
  Search,
  AlertCircle,
  Plus,
  Trash2,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';

interface Competitor {
  id: string;
  domain: string;
  name: string;
  domainAuthority: number;
  organicKeywords: number;
  organicTraffic: number;
  backlinks: number;
  monthlyChange: number;
  topKeywords: string[];
  commonKeywords: number;
  lastUpdated: string;
}

/**
 * Competitor Analysis Panel
 * Track and compare competitor SEO metrics
 */
export function CompetitorAnalysis() {
  const [competitors, setCompetitors] = useState<Competitor[]>([
    {
      id: '1',
      domain: 'competitor1.com',
      name: 'Competitor 1',
      domainAuthority: 65,
      organicKeywords: 12450,
      organicTraffic: 145000,
      backlinks: 8900,
      monthlyChange: 8.5,
      topKeywords: ['digital marketing', 'SEO services', 'PPC advertising'],
      commonKeywords: 487,
      lastUpdated: '2 hours ago'
    },
    {
      id: '2',
      domain: 'competitor2.com',
      name: 'Competitor 2',
      domainAuthority: 58,
      organicKeywords: 9230,
      organicTraffic: 98000,
      backlinks: 5600,
      monthlyChange: -3.2,
      topKeywords: ['social media marketing', 'content marketing', 'branding'],
      commonKeywords: 312,
      lastUpdated: '5 hours ago'
    }
  ]);

  const [newCompetitor, setNewCompetitor] = useState('');
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const addCompetitor = async () => {
    if (!newCompetitor.trim()) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const domain = newCompetitor.trim().replace(/^https?:\/\//, '').replace(/\/$/, '');
      const newComp: Competitor = {
        id: Date.now().toString(),
        domain,
        name: domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1),
        domainAuthority: Math.floor(Math.random() * 40) + 40,
        organicKeywords: Math.floor(Math.random() * 10000) + 5000,
        organicTraffic: Math.floor(Math.random() * 100000) + 50000,
        backlinks: Math.floor(Math.random() * 5000) + 3000,
        monthlyChange: (Math.random() * 20 - 10),
        topKeywords: ['keyword 1', 'keyword 2', 'keyword 3'],
        commonKeywords: Math.floor(Math.random() * 300) + 100,
        lastUpdated: 'Just now'
      };
      
      setCompetitors([...competitors, newComp]);
      setNewCompetitor('');
      setLoading(false);
    }, 2000);
  };

  const removeCompetitor = (id: string) => {
    setCompetitors(competitors.filter(c => c.id !== id));
  };

  const analyzeAll = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      alert('✅ All competitors analyzed successfully!');
    }, 3000);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[20px] font-bold text-white mb-1">Competitor Analysis</h2>
          <p className="text-[13px] text-white/60">
            Track {competitors.length} competitors · Compare SEO metrics · Find opportunities
          </p>
        </div>
        <button
          onClick={analyzeAll}
          disabled={analyzing}
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg font-semibold transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {analyzing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4" />
              Analyze All
            </>
          )}
        </button>
      </div>

      {/* Add Competitor */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={newCompetitor}
              onChange={(e) => setNewCompetitor(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addCompetitor()}
              placeholder="Enter competitor domain (e.g., competitor.com)"
              className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white text-[14px] focus:border-yellow-500 focus:outline-none"
            />
          </div>
          <button
            onClick={addCompetitor}
            disabled={loading || !newCompetitor.trim()}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add Competitor
              </>
            )}
          </button>
        </div>
      </div>

      {/* Your Site Stats (Comparison Baseline) */}
      <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
            <Target className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-white">Your Site (Baseline)</h3>
            <p className="text-[13px] text-white/60">inchtomilez.com</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-[13px] text-white/60 mb-1">Domain Authority</div>
            <div className="text-[24px] font-bold text-white">72</div>
          </div>
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-[13px] text-white/60 mb-1">Organic Keywords</div>
            <div className="text-[24px] font-bold text-white">18.5K</div>
          </div>
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-[13px] text-white/60 mb-1">Monthly Traffic</div>
            <div className="text-[24px] font-bold text-white">245K</div>
          </div>
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-[13px] text-white/60 mb-1">Backlinks</div>
            <div className="text-[24px] font-bold text-white">12.3K</div>
          </div>
        </div>
      </div>

      {/* Competitors List */}
      {competitors.length === 0 ? (
        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-12 text-center">
          <Users className="w-12 h-12 text-white/40 mx-auto mb-4" />
          <h3 className="text-[16px] font-bold text-white mb-2">No Competitors Added</h3>
          <p className="text-[14px] text-white/60">
            Add competitor domains to start tracking their SEO performance
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {competitors.map((competitor) => (
            <div key={competitor.id} className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 hover:border-yellow-500/30 transition-all">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold text-white">{competitor.name}</h3>
                    <a 
                      href={`https://${competitor.domain}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[13px] text-blue-400 hover:text-blue-300"
                    >
                      {competitor.domain}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[12px] text-white/40">{competitor.lastUpdated}</span>
                  <button
                    onClick={() => removeCompetitor(competitor.id)}
                    className="p-2 bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-400 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                {/* Domain Authority */}
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-white/60" />
                    <div className="text-[12px] text-white/60">DA</div>
                  </div>
                  <div className="text-[20px] font-bold text-white">{competitor.domainAuthority}</div>
                  <div className={`text-[11px] mt-1 ${competitor.domainAuthority > 72 ? 'text-red-400' : 'text-green-400'}`}>
                    {competitor.domainAuthority > 72 ? 'Higher than you' : 'Lower than you'}
                  </div>
                </div>

                {/* Organic Keywords */}
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Search className="w-4 h-4 text-white/60" />
                    <div className="text-[12px] text-white/60">Keywords</div>
                  </div>
                  <div className="text-[20px] font-bold text-white">{formatNumber(competitor.organicKeywords)}</div>
                  <div className={`text-[11px] mt-1 ${competitor.organicKeywords > 18500 ? 'text-red-400' : 'text-green-400'}`}>
                    {competitor.organicKeywords > 18500 ? 'More than you' : 'Less than you'}
                  </div>
                </div>

                {/* Organic Traffic */}
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-4 h-4 text-white/60" />
                    <div className="text-[12px] text-white/60">Traffic</div>
                  </div>
                  <div className="text-[20px] font-bold text-white">{formatNumber(competitor.organicTraffic)}</div>
                  <div className="flex items-center gap-1 text-[11px] mt-1">
                    {competitor.monthlyChange > 0 ? (
                      <>
                        <ArrowUp className="w-3 h-3 text-green-400" />
                        <span className="text-green-400">+{competitor.monthlyChange.toFixed(1)}%</span>
                      </>
                    ) : competitor.monthlyChange < 0 ? (
                      <>
                        <ArrowDown className="w-3 h-3 text-red-400" />
                        <span className="text-red-400">{competitor.monthlyChange.toFixed(1)}%</span>
                      </>
                    ) : (
                      <>
                        <Minus className="w-3 h-3 text-white/40" />
                        <span className="text-white/40">0%</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Backlinks */}
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Link className="w-4 h-4 text-white/60" />
                    <div className="text-[12px] text-white/60">Backlinks</div>
                  </div>
                  <div className="text-[20px] font-bold text-white">{formatNumber(competitor.backlinks)}</div>
                  <div className={`text-[11px] mt-1 ${competitor.backlinks > 12300 ? 'text-red-400' : 'text-green-400'}`}>
                    {competitor.backlinks > 12300 ? 'More than you' : 'Less than you'}
                  </div>
                </div>

                {/* Common Keywords */}
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="w-4 h-4 text-white/60" />
                    <div className="text-[12px] text-white/60">Overlap</div>
                  </div>
                  <div className="text-[20px] font-bold text-white">{competitor.commonKeywords}</div>
                  <div className="text-[11px] text-yellow-400 mt-1">
                    Common keywords
                  </div>
                </div>
              </div>

              {/* Top Keywords */}
              <div className="bg-black/30 rounded-lg p-4">
                <div className="text-[12px] text-white/60 mb-3">Top Ranking Keywords:</div>
                <div className="flex flex-wrap gap-2">
                  {competitor.topKeywords.map((keyword, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-white/10 text-white text-[12px] rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
                <button className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-[13px] rounded-lg transition-colors">
                  View Full Report
                </button>
                <button className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-[13px] rounded-lg transition-colors">
                  Find Keyword Gaps
                </button>
                <button className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-[13px] rounded-lg transition-colors">
                  Backlink Analysis
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Insights */}
      {competitors.length > 0 && (
        <div className="bg-[#0a0a0a] border border-blue-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-5 h-5 text-blue-400" />
            <h3 className="text-[16px] font-bold text-white">Competitive Insights</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-black/30 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <div className="text-[14px] text-white font-medium">You're ahead in Domain Authority</div>
                <div className="text-[13px] text-white/60">Your DA (72) is higher than average competitor DA (61.5)</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-black/30 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
              <div>
                <div className="text-[14px] text-white font-medium">Opportunity: 487 common keywords with Competitor 1</div>
                <div className="text-[13px] text-white/60">You can optimize for these keywords to gain market share</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-black/30 rounded-lg">
              <Link className="w-5 h-5 text-purple-400 mt-0.5" />
              <div>
                <div className="text-[14px] text-white font-medium">Your backlink profile is stronger</div>
                <div className="text-[13px] text-white/60">12.3K backlinks vs competitor average of 7.2K</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
