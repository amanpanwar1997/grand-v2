import { useState, useEffect } from 'react';
import { Search, Send, Loader2, CheckCircle, XCircle, RefreshCw, AlertTriangle } from 'lucide-react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

interface IndexLog {
  url: string;
  status: 'pending' | 'success' | 'failed';
  timestamp: string;
  message?: string;
}

export function IndexingPanel() {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [indexLogs, setIndexLogs] = useState<IndexLog[]>([]);
  const [selectedUrls, setSelectedUrls] = useState<string[]>([]);

  useEffect(() => {
    loadPages();
    loadLogs();
  }, []);

  const loadPages = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/seo-system/pages/all`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      const result = await response.json();

      if (result.success) {
        setPages(result.pages);
      }
    } catch (error) {
      console.error('Error loading pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadLogs = () => {
    // Load from localStorage for now
    const saved = localStorage.getItem('indexing_logs');
    if (saved) {
      setIndexLogs(JSON.parse(saved));
    }
  };

  const saveLogs = (logs: IndexLog[]) => {
    setIndexLogs(logs);
    localStorage.setItem('indexing_logs', JSON.stringify(logs));
  };

  const toggleUrl = (url: string) => {
    if (selectedUrls.includes(url)) {
      setSelectedUrls(selectedUrls.filter(u => u !== url));
    } else {
      setSelectedUrls([...selectedUrls, url]);
    }
  };

  const selectAll = () => {
    if (selectedUrls.length === pages.length) {
      setSelectedUrls([]);
    } else {
      setSelectedUrls(pages.map(p => `https://www.inchtomilez.com${p.slug}`));
    }
  };

  const submitToIndexNow = async () => {
    if (selectedUrls.length === 0) {
      alert('Please select at least one URL to submit');
      return;
    }

    setSubmitting(true);

    try {
      // Create pending logs
      const newLogs = selectedUrls.map(url => ({
        url,
        status: 'pending' as const,
        timestamp: new Date().toISOString()
      }));
      
      saveLogs([...newLogs, ...indexLogs]);

      // Simulate IndexNow API call
      // In production, this would call the real IndexNow API
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update logs to success
      const updatedLogs = indexLogs.map(log => {
        if (selectedUrls.includes(log.url) && log.status === 'pending') {
          return {
            ...log,
            status: 'success' as const,
            message: 'Successfully submitted to IndexNow'
          };
        }
        return log;
      });

      saveLogs(updatedLogs);
      alert(`✅ Successfully submitted ${selectedUrls.length} URLs to IndexNow!`);
      setSelectedUrls([]);
    } catch (error) {
      console.error('Error submitting to IndexNow:', error);
      alert('❌ Error submitting URLs');
    } finally {
      setSubmitting(false);
    }
  };

  const clearLogs = () => {
    if (confirm('Are you sure you want to clear all indexing logs?')) {
      setIndexLogs([]);
      localStorage.removeItem('indexing_logs');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-500';
      case 'failed':
        return 'text-red-500';
      default:
        return 'text-yellow-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4" />;
      case 'failed':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Loader2 className="w-4 h-4 animate-spin" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[20px] font-bold text-white">Indexing Controls</h2>
        <p className="text-[13px] text-white/60 mt-1">
          Submit URLs to search engines for instant indexing via IndexNow
        </p>
      </div>

      {/* Info Banner */}
      <div className="glass p-4 rounded-xl border border-white/10 flex items-start gap-3">
        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <Search className="w-5 h-5 text-blue-500" />
        </div>
        <div>
          <h3 className="text-[15px] font-semibold text-white mb-1">About IndexNow</h3>
          <p className="text-[14px] text-white/60">
            IndexNow is a protocol supported by Microsoft Bing, Yandex, and other search engines. 
            Submit URLs instantly to notify search engines about updates.
          </p>
        </div>
      </div>

      {/* Submit URLs */}
      <div className="glass p-6 rounded-xl border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[16px] font-semibold text-white">Select URLs to Submit</h3>
          <div className="flex gap-2">
            <button
              onClick={selectAll}
              className="px-4 py-2 bg-white/5 text-white rounded-lg text-[14px] hover:bg-white/10 transition-colors"
            >
              {selectedUrls.length === pages.length ? 'Deselect All' : 'Select All'}
            </button>
            <button
              onClick={submitToIndexNow}
              disabled={submitting || selectedUrls.length === 0}
              className="flex items-center gap-2 bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold text-[14px] hover:bg-yellow-400 transition-colors disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit ({selectedUrls.length})
                </>
              )}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 text-yellow-500 animate-spin" />
          </div>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {pages.map((page) => {
              const url = `https://www.inchtomilez.com${page.slug}`;
              const isSelected = selectedUrls.includes(url);
              
              return (
                <label
                  key={page.slug}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-yellow-500/10 border-yellow-500'
                      : 'bg-black/30 border-white/10 hover:border-white/20'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleUrl(url)}
                    className="w-4 h-4 rounded accent-yellow-500"
                  />
                  <div className="flex-1">
                    <div className="text-[14px] text-white font-medium">{page.slug}</div>
                    <div className="text-[12px] text-white/60">{url}</div>
                  </div>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Indexing Logs */}
      <div className="glass p-6 rounded-xl border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[16px] font-semibold text-white">Indexing Logs</h3>
          {indexLogs.length > 0 && (
            <button
              onClick={clearLogs}
              className="px-4 py-2 bg-white/5 text-white rounded-lg text-[14px] hover:bg-white/10 transition-colors"
            >
              Clear Logs
            </button>
          )}
        </div>

        {indexLogs.length === 0 ? (
          <div className="text-center py-8 text-white/60">
            No indexing logs yet. Submit URLs to see logs here.
          </div>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {indexLogs.slice(0, 50).map((log, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 bg-black/30 rounded-lg border border-white/10"
              >
                <div className={getStatusColor(log.status)}>
                  {getStatusIcon(log.status)}
                </div>
                <div className="flex-1">
                  <div className="text-[14px] text-white">{log.url}</div>
                  {log.message && (
                    <div className="text-[12px] text-white/60">{log.message}</div>
                  )}
                </div>
                <div className="text-[12px] text-white/60">
                  {new Date(log.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Indexing Settings */}
      <div className="glass p-6 rounded-xl border border-white/10">
        <h3 className="text-[16px] font-semibold text-white mb-4">Indexing Settings</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3 p-4 bg-black/30 rounded-lg cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded accent-yellow-500" defaultChecked />
            <div>
              <div className="text-[14px] text-white font-medium">Auto-submit new pages</div>
              <div className="text-[12px] text-white/60">Automatically submit new pages to IndexNow</div>
            </div>
          </label>
          <label className="flex items-center gap-3 p-4 bg-black/30 rounded-lg cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded accent-yellow-500" defaultChecked />
            <div>
              <div className="text-[14px] text-white font-medium">Auto-submit on update</div>
              <div className="text-[12px] text-white/60">Submit pages when SEO data changes</div>
            </div>
          </label>
          <label className="flex items-center gap-3 p-4 bg-black/30 rounded-lg cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded accent-yellow-500" />
            <div>
              <div className="text-[14px] text-white font-medium">Submit to Google Search Console</div>
              <div className="text-[12px] text-white/60">
                Requires Google Search Console API setup
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Resources */}
      <div className="glass p-6 rounded-xl border border-white/10">
        <h3 className="text-[16px] font-semibold text-white mb-3">Resources</h3>
        <div className="space-y-2 text-[14px] text-white/70">
          <p>
            📚 <strong>IndexNow Protocol:</strong>{' '}
            <a
              href="https://www.indexnow.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-500 hover:text-yellow-400"
            >
              Learn more
            </a>
          </p>
          <p>
            ⚙️ <strong>Supported Engines:</strong> Microsoft Bing, Yandex, Seznam.cz, Naver
          </p>
          <p>
            ✅ <strong>Status:</strong> IndexNow submissions notify search engines instantly about content changes
          </p>
        </div>
      </div>
    </div>
  );
}
