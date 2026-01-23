import { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Target, Search, Plus, RefreshCw } from 'lucide-react';

export function RankTracking() {
  const [keywords] = useState([
    { keyword: 'digital marketing agency', position: 3, change: 2, searches: 8100, difficulty: 72, url: '/services' },
    { keyword: 'SEO services Indore', position: 1, change: 0, searches: 590, difficulty: 45, url: '/services/seo' },
    { keyword: 'PPC management', position: 7, change: -1, searches: 2400, difficulty: 68, url: '/services/ppc' },
    { keyword: 'social media marketing', position: 12, change: 3, searches: 9900, difficulty: 75, url: '/services/social-media' },
    { keyword: 'content marketing services', position: 5, change: 1, searches: 1300, difficulty: 58, url: '/services/content' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[20px] font-bold text-white">Keyword Rank Tracking</h2>
          <p className="text-[13px] text-white/60">{keywords.length} keywords tracked · Updated daily</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Keyword
          </button>
          <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg font-semibold flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Update Rankings
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
          <div className="text-[28px] font-bold text-white mb-1">2.3</div>
          <div className="text-[13px] text-white/60">Avg Position</div>
          <div className="flex items-center gap-1 text-[12px] text-green-400 mt-1">
            <TrendingUp className="w-3 h-3" />
            +1.2 improved
          </div>
        </div>
        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
          <div className="text-[28px] font-bold text-white mb-1">3</div>
          <div className="text-[13px] text-white/60">Top 3 Rankings</div>
          <div className="text-[12px] text-white/40 mt-1">60% of keywords</div>
        </div>
        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
          <div className="text-[28px] font-bold text-white mb-1">18</div>
          <div className="text-[13px] text-white/60">Top 10 Rankings</div>
          <div className="text-[12px] text-white/40 mt-1">80% of keywords</div>
        </div>
        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
          <div className="text-[28px] font-bold text-white mb-1">22K</div>
          <div className="text-[13px] text-white/60">Monthly Searches</div>
          <div className="text-[12px] text-white/40 mt-1">Total volume</div>
        </div>
      </div>

      <div className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/10 bg-black/30">
          <div className="col-span-4 text-[13px] text-white/60 font-medium">Keyword</div>
          <div className="col-span-2 text-[13px] text-white/60 font-medium">Position</div>
          <div className="col-span-2 text-[13px] text-white/60 font-medium">Change</div>
          <div className="col-span-2 text-[13px] text-white/60 font-medium">Volume</div>
          <div className="col-span-2 text-[13px] text-white/60 font-medium">Difficulty</div>
        </div>

        {keywords.map((kw, idx) => (
          <div key={idx} className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/10 hover:bg-white/5 transition-colors">
            <div className="col-span-4">
              <div className="text-[14px] text-white font-medium mb-1">{kw.keyword}</div>
              <div className="text-[12px] text-white/40">{kw.url}</div>
            </div>
            <div className="col-span-2 flex items-center">
              <div className={`text-[20px] font-bold ${
                kw.position <= 3 ? 'text-green-400' :
                kw.position <= 10 ? 'text-yellow-400' :
                'text-white/60'
              }`}>
                #{kw.position}
              </div>
            </div>
            <div className="col-span-2 flex items-center">
              {kw.change > 0 ? (
                <div className="flex items-center gap-1 text-green-400">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-[14px] font-medium">+{kw.change}</span>
                </div>
              ) : kw.change < 0 ? (
                <div className="flex items-center gap-1 text-red-400">
                  <TrendingDown className="w-4 h-4" />
                  <span className="text-[14px] font-medium">{kw.change}</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-white/40">
                  <Minus className="w-4 h-4" />
                  <span className="text-[14px] font-medium">0</span>
                </div>
              )}
            </div>
            <div className="col-span-2 flex items-center">
              <span className="text-[14px] text-white">{kw.searches.toLocaleString()}/mo</span>
            </div>
            <div className="col-span-2 flex items-center">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden w-16">
                  <div className={`h-full rounded-full ${
                    kw.difficulty < 40 ? 'bg-green-400' :
                    kw.difficulty < 70 ? 'bg-yellow-400' :
                    'bg-red-400'
                  }`} style={{ width: `${kw.difficulty}%` }} />
                </div>
                <span className="text-[14px] text-white/60">{kw.difficulty}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
