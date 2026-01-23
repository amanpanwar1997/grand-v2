import { useState } from 'react';
import { BarChart3, TrendingUp, Target, Calendar } from 'lucide-react';

export function SEOForecasting() {
  const [timeframe, setTimeframe] = useState<'3months' | '6months' | '12months'>('6months');

  const forecasts = {
    traffic: { current: 245000, predicted: 325000, growth: 32.7 },
    rankings: { current: 18542, predicted: 24300, growth: 31.0 },
    conversions: { current: 3420, predicted: 4850, growth: 41.8 }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[20px] font-bold text-white">AI SEO Forecasting</h2>
          <p className="text-[13px] text-white/60">Predict future performance based on current trends</p>
        </div>
        <select value={timeframe} onChange={(e) => setTimeframe(e.target.value as any)} className="px-4 py-2 bg-white/10 border border-white/10 text-white rounded-lg">
          <option value="3months">3 Months</option>
          <option value="6months">6 Months</option>
          <option value="12months">12 Months</option>
        </select>
      </div>

      <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-6 h-6 text-yellow-400" />
          <h3 className="text-[18px] font-bold text-white">Predicted Growth (Next {timeframe === '3months' ? '3' : timeframe === '6months' ? '6' : '12'} Months)</h3>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-black/30 rounded-lg p-6">
            <div className="text-[13px] text-white/60 mb-2">Organic Traffic</div>
            <div className="text-[32px] font-bold text-white mb-1">325K</div>
            <div className="flex items-center gap-1 text-[14px] text-green-400">
              <TrendingUp className="w-4 h-4" />
              +32.7%
            </div>
            <div className="text-[12px] text-white/40 mt-2">Current: 245K</div>
          </div>

          <div className="bg-black/30 rounded-lg p-6">
            <div className="text-[13px] text-white/60 mb-2">Ranking Keywords</div>
            <div className="text-[32px] font-bold text-white mb-1">24.3K</div>
            <div className="flex items-center gap-1 text-[14px] text-green-400">
              <TrendingUp className="w-4 h-4" />
              +31.0%
            </div>
            <div className="text-[12px] text-white/40 mt-2">Current: 18.5K</div>
          </div>

          <div className="bg-black/30 rounded-lg p-6">
            <div className="text-[13px] text-white/60 mb-2">Conversions</div>
            <div className="text-[32px] font-bold text-white mb-1">4,850</div>
            <div className="flex items-center gap-1 text-[14px] text-green-400">
              <TrendingUp className="w-4 h-4" />
              +41.8%
            </div>
            <div className="text-[12px] text-white/40 mt-2">Current: 3,420</div>
          </div>
        </div>
      </div>

      <div className="bg-[#0a0a0a] border border-blue-500/30 rounded-xl p-6">
        <h3 className="text-[16px] font-bold text-white mb-4">AI Recommendations for Growth</h3>
        <div className="space-y-3">
          {[
            'Focus on long-tail keywords to capture 35% more traffic',
            'Optimize 15 high-potential pages for featured snippets',
            'Build 50 quality backlinks to increase DA to 78',
            'Improve Core Web Vitals on 12 pages for +8% ranking boost'
          ].map((rec, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-black/30 rounded-lg">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5" />
              <span className="text-[14px] text-white">{rec}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
