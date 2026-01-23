import { useState } from 'react';
import { Brain, Zap, Target, CheckCircle, AlertCircle, TrendingUp, Lightbulb } from 'lucide-react';

export function AIContentOptimizer() {
  const [url, setUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const analyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setResults({
        score: 78,
        improvements: [
          { type: 'critical', text: 'Add 3 more internal links to related pages', impact: 'High' },
          { type: 'warning', text: 'Title tag is 72 characters (optimal: 50-60)', impact: 'Medium' },
          { type: 'info', text: 'Add FAQ schema for better SERP features', impact: 'High' },
          { type: 'warning', text: 'Use primary keyword 2 more times in content', impact: 'Medium' },
        ],
        keywords: [
          { word: 'digital marketing', density: 2.3, optimal: 2.5, status: 'good' },
          { word: 'SEO services', density: 1.1, optimal: 1.5, status: 'low' },
          { word: 'marketing agency', density: 3.2, optimal: 2.0, status: 'high' },
        ]
      });
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[20px] font-bold text-white mb-1">AI Content Optimizer</h2>
        <p className="text-[13px] text-white/60">Get AI-powered suggestions to improve your content</p>
      </div>

      <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter page URL to analyze..."
            className="flex-1 bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-yellow-500 focus:outline-none"
          />
          <button
            onClick={analyze}
            disabled={analyzing || !url}
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50"
          >
            {analyzing ? (
              <>
                <Brain className="w-4 h-4 animate-pulse" />
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4" />
                Analyze with AI
              </>
            )}
          </button>
        </div>
      </div>

      {results && (
        <>
          <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <span className="text-[24px] font-bold text-yellow-400">{results.score}</span>
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-white">Content Score</h3>
                  <p className="text-[13px] text-white/60">Good, but can be improved</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[14px] text-white/60">Potential Increase</div>
                <div className="text-[24px] font-bold text-green-400">+22 points</div>
              </div>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
            <h3 className="text-[16px] font-bold text-white mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              AI-Powered Improvements
            </h3>
            <div className="space-y-3">
              {results.improvements.map((imp: any, idx: number) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-black/30 rounded-lg">
                  {imp.type === 'critical' ? (
                    <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                  ) : imp.type === 'warning' ? (
                    <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="text-[14px] text-white mb-1">{imp.text}</p>
                    <span className={`text-[12px] px-2 py-0.5 rounded ${
                      imp.impact === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {imp.impact} Impact
                    </span>
                  </div>
                  <button className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-[12px] rounded">Apply</button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
            <h3 className="text-[16px] font-bold text-white mb-4">Keyword Density Analysis</h3>
            <div className="space-y-3">
              {results.keywords.map((kw: any, idx: number) => (
                <div key={idx} className="p-4 bg-black/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[14px] text-white font-medium">{kw.word}</span>
                    <span className={`text-[12px] px-2 py-0.5 rounded ${
                      kw.status === 'good' ? 'bg-green-500/20 text-green-400' :
                      kw.status === 'low' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {kw.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${
                        kw.status === 'good' ? 'bg-green-400' :
                        kw.status === 'low' ? 'bg-yellow-400' :
                        'bg-red-400'
                      }`} style={{ width: `${(kw.density / kw.optimal) * 100}%` }} />
                    </div>
                    <span className="text-[12px] text-white/60">{kw.density}% / {kw.optimal}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {!results && (
        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-12 text-center">
          <Brain className="w-16 h-16 text-white/40 mx-auto mb-4" />
          <h3 className="text-[16px] font-bold text-white mb-2">Enter a URL to Start</h3>
          <p className="text-[14px] text-white/60">
            AI will analyze your content and provide actionable optimization suggestions
          </p>
        </div>
      )}
    </div>
  );
}
