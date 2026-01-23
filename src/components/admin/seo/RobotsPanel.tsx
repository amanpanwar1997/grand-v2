import { useState, useEffect } from 'react';
import { Loader2, Save, RotateCcw, Eye, Copy, FileCode } from 'lucide-react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

export function RobotsPanel() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState('');
  const [originalContent, setOriginalContent] = useState('');

  useEffect(() => {
    loadRobots();
  }, []);

  const loadRobots = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/seo-system/robots`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      const result = await response.json();

      if (result.success) {
        setContent(result.content);
        setOriginalContent(result.content);
      }
    } catch (error) {
      console.error('Error loading robots.txt:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveRobots = async () => {
    setSaving(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/seo-system/robots`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ content })
        }
      );

      const result = await response.json();

      if (result.success) {
        alert('✅ Robots.txt saved successfully!');
        setOriginalContent(content);
      } else {
        alert('❌ Error: ' + result.error);
      }
    } catch (error: any) {
      console.error('Error saving robots.txt:', error);
      alert('❌ Error saving robots.txt');
    } finally {
      setSaving(false);
    }
  };

  const resetToDefault = async () => {
    if (!confirm('Are you sure you want to reset robots.txt to default? This cannot be undone.')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/seo-system/robots/reset`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const result = await response.json();

      if (result.success) {
        alert('✅ Robots.txt reset to default!');
        setContent(result.content);
        setOriginalContent(result.content);
      } else {
        alert('❌ Error: ' + result.error);
      }
    } catch (error: any) {
      console.error('Error resetting robots.txt:', error);
      alert('❌ Error resetting robots.txt');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    alert('✅ Robots.txt copied to clipboard!');
  };

  const hasChanges = content !== originalContent;

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
          <h2 className="text-[20px] font-bold text-white">Robots.txt Editor</h2>
          <p className="text-[13px] text-white/60 mt-1">
            Control how search engines crawl your website
          </p>
        </div>
        <div className="flex items-center gap-3">
          {hasChanges && (
            <span className="text-[13px] text-yellow-500 font-medium">
              • Unsaved changes
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={saveRobots}
          disabled={saving || !hasChanges}
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg font-semibold transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Save Changes
        </button>

        <button
          onClick={resetToDefault}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset to Default
        </button>

        <button
          onClick={copyToClipboard}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <Copy className="w-4 h-4" />
          Copy
        </button>

        <a
          href="/robots.txt"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <Eye className="w-4 h-4" />
          Preview Live
        </a>
      </div>

      {/* Editor */}
      <div className="glass p-6 rounded-xl border border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <FileCode className="w-5 h-5 text-yellow-500" />
          <h3 className="text-[16px] font-bold text-white">robots.txt Content</h3>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-[400px] bg-black/50 border border-white/10 rounded-lg p-4 text-[13px] text-white/90 font-mono focus:outline-none focus:border-yellow-500 resize-none"
          placeholder="User-agent: *
Allow: /
Disallow: /admin/

Sitemap: https://www.inchtomilez.com/sitemap.xml"
        />

        <div className="mt-4 flex items-center justify-between text-[13px] text-white/60">
          <span>{content.split('\n').length} lines</span>
          <span>{content.length} characters</span>
        </div>
      </div>

      {/* Common Rules */}
      <div className="glass p-6 rounded-xl border border-white/10">
        <h3 className="text-[18px] font-bold text-white mb-4">
          Common Robots.txt Rules
        </h3>

        <div className="space-y-4">
          <div className="p-4 bg-white/5 rounded-lg">
            <h4 className="text-[14px] font-semibold text-white mb-2">
              Allow All Bots (Default)
            </h4>
            <pre className="text-[12px] text-green-400 font-mono bg-black/30 p-3 rounded overflow-x-auto">
{`User-agent: *
Allow: /`}
            </pre>
          </div>

          <div className="p-4 bg-white/5 rounded-lg">
            <h4 className="text-[14px] font-semibold text-white mb-2">
              Block Specific Folders
            </h4>
            <pre className="text-[12px] text-green-400 font-mono bg-black/30 p-3 rounded overflow-x-auto">
{`User-agent: *
Disallow: /admin/
Disallow: /api/
Disallow: /private/`}
            </pre>
          </div>

          <div className="p-4 bg-white/5 rounded-lg">
            <h4 className="text-[14px] font-semibold text-white mb-2">
              Block Specific Bot
            </h4>
            <pre className="text-[12px] text-green-400 font-mono bg-black/30 p-3 rounded overflow-x-auto">
{`User-agent: BadBot
Disallow: /`}
            </pre>
          </div>

          <div className="p-4 bg-white/5 rounded-lg">
            <h4 className="text-[14px] font-semibold text-white mb-2">
              Add Sitemap
            </h4>
            <pre className="text-[12px] text-green-400 font-mono bg-black/30 p-3 rounded overflow-x-auto">
{`Sitemap: https://www.inchtomilez.com/sitemap.xml`}
            </pre>
          </div>

          <div className="p-4 bg-white/5 rounded-lg">
            <h4 className="text-[14px] font-semibold text-white mb-2">
              Crawl Delay (for specific bots)
            </h4>
            <pre className="text-[12px] text-green-400 font-mono bg-black/30 p-3 rounded overflow-x-auto">
{`User-agent: Googlebot
Crawl-delay: 10`}
            </pre>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="glass p-6 rounded-xl border border-white/10">
        <h3 className="text-[18px] font-bold text-white mb-4">
          Robots.txt Best Practices
        </h3>

        <div className="space-y-3 text-[13px] text-white/70">
          <div className="flex items-start gap-3">
            <span className="text-yellow-500">✓</span>
            <p><strong>Always include sitemap URL</strong> at the bottom of robots.txt</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-yellow-500">✓</span>
            <p><strong>Use Disallow carefully</strong> - It blocks search engines from indexing</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-yellow-500">✓</span>
            <p><strong>Test your robots.txt</strong> using Google Search Console's robots.txt Tester</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-yellow-500">✓</span>
            <p><strong>Don't block CSS/JS files</strong> - Google needs them to render pages</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-yellow-500">✓</span>
            <p><strong>Use Disallow for admin areas</strong> and private content</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-red-400">✗</span>
            <p><strong>Don't use robots.txt for security</strong> - It's publicly visible</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-red-400">✗</span>
            <p><strong>Don't block entire site</strong> unless intentional (staging sites)</p>
          </div>
        </div>
      </div>

      {/* Save Button (Bottom) */}
      {hasChanges && (
        <div className="sticky bottom-0 pt-6 bg-gradient-to-t from-black via-black to-transparent">
          <button
            onClick={saveRobots}
            disabled={saving}
            className="w-full px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg font-bold text-[15px] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving Changes...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Robots.txt
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
