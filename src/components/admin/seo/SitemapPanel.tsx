import { useState, useEffect } from 'react';
import { Loader2, RefreshCw, Download, Eye, CheckCircle, Globe } from 'lucide-react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

export function SitemapPanel() {
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [sitemap, setSitemap] = useState<any>(null);

  useEffect(() => {
    loadSitemap();
  }, []);

  const loadSitemap = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/seo-system/sitemap/get`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      const result = await response.json();

      if (result.success) {
        setSitemap(result);
      }
    } catch (error) {
      console.error('Error loading sitemap:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSitemap = async () => {
    setGenerating(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/seo-system/sitemap/generate`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({})
        }
      );

      const result = await response.json();

      if (result.success) {
        alert(`✅ Sitemap generated successfully!\n\n${result.count} URLs included`);
        setSitemap(result);
      } else {
        alert('❌ Error: ' + result.error);
      }
    } catch (error: any) {
      console.error('Error generating sitemap:', error);
      alert('❌ Error generating sitemap');
    } finally {
      setGenerating(false);
    }
  };

  const downloadSitemap = () => {
    if (!sitemap?.xml) return;

    const blob = new Blob([sitemap.xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copySitemap = () => {
    if (!sitemap?.xml) return;

    navigator.clipboard.writeText(sitemap.xml);
    alert('✅ Sitemap XML copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-yellow-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[20px] font-bold text-white">XML Sitemap Management</h2>
          <p className="text-[13px] text-white/60 mt-1">
            Generate and manage your website sitemap for search engines
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass p-4 rounded-lg border border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Globe className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-[13px] text-white/60">URLs in Sitemap</p>
              <p className="text-[20px] font-bold text-white">
                {sitemap?.count || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="glass p-4 rounded-lg border border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <RefreshCw className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-[13px] text-white/60">Last Generated</p>
              <p className="text-[14px] font-medium text-white">
                {sitemap?.generatedAt 
                  ? new Date(sitemap.generatedAt).toLocaleDateString()
                  : 'Never'
                }
              </p>
            </div>
          </div>
        </div>

        <div className="glass p-4 rounded-lg border border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <CheckCircle className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-[13px] text-white/60">Status</p>
              <p className="text-[14px] font-medium text-white">
                {sitemap?.xml ? 'Ready' : 'Not Generated'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="glass p-6 rounded-xl border border-white/10 space-y-4">
        <h3 className="text-[18px] font-bold text-white">Sitemap Actions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={generateSitemap}
            disabled={generating}
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {generating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <RefreshCw className="w-5 h-5" />
                Generate Sitemap
              </>
            )}
          </button>

          <button
            onClick={downloadSitemap}
            disabled={!sitemap?.xml}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Download className="w-5 h-5" />
            Download XML
          </button>
        </div>

        <div className="pt-4 border-t border-white/10">
          <p className="text-[13px] text-white/60 mb-3">
            📌 <strong>Important:</strong> After generating, submit your sitemap to:
          </p>
          <ul className="space-y-2 text-[13px] text-white/70">
            <li>• Google Search Console: <code className="text-yellow-500">https://www.inchtomilez.com/sitemap.xml</code></li>
            <li>• Bing Webmaster Tools: Same URL</li>
            <li>• Yandex Webmaster: Same URL</li>
          </ul>
        </div>
      </div>

      {/* Preview */}
      {sitemap?.xml && (
        <div className="glass p-6 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[18px] font-bold text-white">Sitemap Preview</h3>
            <button
              onClick={copySitemap}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors text-[13px]"
            >
              Copy XML
            </button>
          </div>
          
          <div className="bg-black/50 border border-white/10 rounded-lg p-4 overflow-x-auto max-h-[400px] overflow-y-auto">
            <pre className="text-[12px] text-green-400 font-mono whitespace-pre">
              {sitemap.xml}
            </pre>
          </div>

          <div className="mt-4 flex items-center gap-2 text-[13px] text-white/60">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Valid XML sitemap with {sitemap.count} URLs
          </div>
        </div>
      )}

      {/* No Sitemap Message */}
      {!sitemap?.xml && !loading && (
        <div className="text-center py-12 glass rounded-xl border border-white/10">
          <Globe className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <h3 className="text-[18px] font-medium text-white mb-2">
            No Sitemap Generated Yet
          </h3>
          <p className="text-[14px] text-white/60 mb-6">
            Click "Generate Sitemap" to create your XML sitemap
          </p>
          <button
            onClick={generateSitemap}
            disabled={generating}
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Generate Now
          </button>
        </div>
      )}

      {/* SEO Tips */}
      <div className="glass p-6 rounded-xl border border-white/10">
        <h3 className="text-[18px] font-bold text-white mb-4">
          Sitemap Best Practices
        </h3>
        <div className="space-y-3 text-[13px] text-white/70">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
            <p>Regenerate sitemap after adding or updating pages</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
            <p>Submit sitemap URL to Google Search Console for faster indexing</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
            <p>Set priority (0.0-1.0) to indicate important pages</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
            <p>Use change frequency to tell search engines how often to crawl</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
            <p>Exclude pages with "noindex" from sitemap</p>
          </div>
        </div>
      </div>
    </div>
  );
}
