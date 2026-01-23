import { AlertTriangle, Sparkles } from 'lucide-react';

export function Error404Panel() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[20px] font-bold text-white">404 Error Monitor</h2>
        <p className="text-[13px] text-white/60 mt-1">
          Track and fix broken links on your website
        </p>
      </div>

      <div className="glass p-12 rounded-xl border border-white/10 text-center">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        <h3 className="text-[18px] font-bold text-white mb-2">
          404 Monitor Coming Soon
        </h3>
        <p className="text-[14px] text-white/60 mb-6 max-w-md mx-auto">
          Comprehensive 404 error tracking system with referrer tracking, hit counts, ignore list, and one-click redirect creation.
        </p>
        <div className="flex items-center justify-center gap-2 text-[13px] text-yellow-500">
          <Sparkles className="w-4 h-4" />
          <span>In Development</span>
        </div>
      </div>

      {/* Features Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { name: 'Error Tracking', desc: 'Log all 404 errors' },
          { name: 'Referrer Data', desc: 'See where users came from' },
          { name: 'Hit Counter', desc: 'Track frequency' },
          { name: 'Quick Fix', desc: 'Create redirects instantly' },
        ].map((feature) => (
          <div key={feature.name} className="glass p-4 rounded-lg border border-white/10 opacity-50">
            <AlertTriangle className="w-5 h-5 text-red-500 mb-2" />
            <h4 className="text-[14px] font-semibold text-white mb-1">{feature.name}</h4>
            <p className="text-[12px] text-white/60">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
