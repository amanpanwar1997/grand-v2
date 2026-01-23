import { ArrowRight, Sparkles } from 'lucide-react';

export function RedirectsPanel() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[20px] font-bold text-white">Redirect Manager</h2>
        <p className="text-[13px] text-white/60 mt-1">
          Create and manage 301/302/307 redirects for your website
        </p>
      </div>

      <div className="glass p-12 rounded-xl border border-white/10 text-center">
        <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <ArrowRight className="w-8 h-8 text-blue-500" />
        </div>
        <h3 className="text-[18px] font-bold text-white mb-2">
          Redirect Manager Coming Soon
        </h3>
        <p className="text-[14px] text-white/60 mb-6 max-w-md mx-auto">
          Powerful redirect management system with bulk import, redirect chains detection, hit tracking, and automatic redirect creation on URL changes.
        </p>
        <div className="flex items-center justify-center gap-2 text-[13px] text-yellow-500">
          <Sparkles className="w-4 h-4" />
          <span>In Development</span>
        </div>
      </div>

      {/* Features Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { name: '301 Redirects', desc: 'Permanent URL changes' },
          { name: '302 Redirects', desc: 'Temporary redirects' },
          { name: 'Bulk Import', desc: 'CSV import support' },
          { name: 'Hit Tracking', desc: 'Monitor redirect usage' },
        ].map((feature) => (
          <div key={feature.name} className="glass p-4 rounded-lg border border-white/10 opacity-50">
            <ArrowRight className="w-5 h-5 text-blue-500 mb-2" />
            <h4 className="text-[14px] font-semibold text-white mb-1">{feature.name}</h4>
            <p className="text-[12px] text-white/60">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
