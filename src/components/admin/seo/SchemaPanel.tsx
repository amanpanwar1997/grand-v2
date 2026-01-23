import { useState, useEffect } from 'react';
import { Code, Sparkles, Plus, Save, Loader2, Edit, Trash2, Copy, CheckCircle } from 'lucide-react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

interface SchemaTemplate {
  type: string;
  name: string;
  description: string;
  template: any;
}

export function SchemaPanel() {
  const [templates, setTemplates] = useState<SchemaTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState('');
  const [pages, setPages] = useState<any[]>([]);
  const [schemaCode, setSchemaCode] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadTemplates();
    loadPages();
  }, []);

  const loadTemplates = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/seo-system/schema/templates`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      const result = await response.json();

      if (result.success) {
        setTemplates(result.templates);
      }
    } catch (error) {
      console.error('Error loading templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadPages = async () => {
    try {
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
        // Handle both response formats for compatibility
        const pagesList = result.pages || result.data?.pages || [];
        setPages(pagesList);
        console.log(`✅ Loaded ${pagesList.length} pages for schema editor`);
      } else {
        console.error('Failed to load pages:', result.error);
        alert('⚠️ Failed to load pages. Using empty list.');
      }
    } catch (error) {
      console.error('Error loading pages:', error);
      alert('❌ Error loading pages. Please check your connection.');
    }
  };

  const applyTemplate = (template: SchemaTemplate) => {
    const formattedSchema = JSON.stringify(template.template, null, 2);
    setSchemaCode(formattedSchema);
  };

  const saveSchema = async () => {
    if (!selectedPage || !schemaCode) {
      alert('Please select a page and enter schema code');
      return;
    }

    // Validate JSON
    try {
      JSON.parse(schemaCode);
    } catch (error) {
      alert('❌ Invalid JSON schema. Please check your code.');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/seo-system/page/update`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            slug: selectedPage,
            updates: {
              schema: schemaCode
            }
          })
        }
      );

      const result = await response.json();

      if (result.success) {
        alert('✅ Schema saved successfully!');
      } else {
        alert('❌ Error: ' + result.error);
      }
    } catch (error) {
      console.error('Error saving schema:', error);
      alert('❌ Error saving schema');
    } finally {
      setSaving(false);
    }
  };

  const loadPageSchema = async (slug: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/seo-system/page/get`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ slug })
        }
      );

      const result = await response.json();

      if (result.success && result.page && result.page.schema) {
        const formatted = typeof result.page.schema === 'string' 
          ? result.page.schema 
          : JSON.stringify(result.page.schema, null, 2);
        setSchemaCode(formatted);
      } else {
        setSchemaCode('');
      }
    } catch (error) {
      console.error('Error loading page schema:', error);
    }
  };

  const handlePageChange = (slug: string) => {
    setSelectedPage(slug);
    if (slug) {
      loadPageSchema(slug);
    } else {
      setSchemaCode('');
    }
  };

  const copySchema = () => {
    navigator.clipboard.writeText(schemaCode);
    alert('✅ Schema copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[20px] font-bold text-white">Schema Builder</h2>
        <p className="text-[13px] text-white/60 mt-1">
          Create and manage structured data (JSON-LD) for your pages
        </p>
      </div>

      {/* Schema Templates */}
      <div className="glass p-6 rounded-xl border border-white/10">
        <h3 className="text-[16px] font-semibold text-white mb-4">Quick Start Templates</h3>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 text-yellow-500 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templates.map((template) => (
              <button
                key={template.type}
                onClick={() => applyTemplate(template)}
                className="glass p-4 rounded-lg border border-white/10 text-left hover:border-yellow-500 transition-all group"
              >
                <Code className="w-5 h-5 text-purple-500 mb-2" />
                <h4 className="text-[14px] font-semibold text-white mb-1 group-hover:text-yellow-500 transition-colors">
                  {template.name}
                </h4>
                <p className="text-[12px] text-white/60">{template.description}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Schema Editor */}
      <div className="glass p-6 rounded-xl border border-white/10">
        <h3 className="text-[16px] font-semibold text-white mb-4">Schema Editor</h3>

        {/* Page Selector */}
        <div className="mb-4">
          <label className="block text-[14px] font-medium text-white/70 mb-2">
            Select Page
          </label>
          <select
            value={selectedPage}
            onChange={(e) => handlePageChange(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white focus:outline-none focus:border-yellow-500 transition-colors"
          >
            <option value="">Choose a page...</option>
            {pages.map((page) => (
              <option key={page.slug} value={page.slug}>
                {page.slug} - {page.title || 'Untitled'}
              </option>
            ))}
          </select>
        </div>

        {/* Code Editor */}
        <div className="relative">
          <div className="absolute top-3 right-3 flex gap-2 z-10">
            <button
              onClick={copySchema}
              disabled={!schemaCode}
              className="p-2 bg-white/5 text-white/60 rounded-lg hover:bg-white/10 hover:text-white transition-all disabled:opacity-30"
              title="Copy schema"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <textarea
            value={schemaCode}
            onChange={(e) => setSchemaCode(e.target.value)}
            placeholder={`{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Your Company",
  "url": "https://example.com"
}`}
            rows={20}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[14px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors font-mono resize-none"
          />
        </div>

        {/* Validation */}
        {schemaCode && (
          <div className="mt-3 flex items-center gap-2 text-[13px]">
            {(() => {
              try {
                JSON.parse(schemaCode);
                return (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-green-500">Valid JSON</span>
                  </>
                );
              } catch (e) {
                return (
                  <>
                    <Code className="w-4 h-4 text-red-500" />
                    <span className="text-red-500">Invalid JSON - please check syntax</span>
                  </>
                );
              }
            })()}
          </div>
        )}

        {/* Save Button */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => {
              setSelectedPage('');
              setSchemaCode('');
            }}
            className="px-6 py-3 bg-white/5 text-white rounded-lg font-semibold text-[15px] hover:bg-white/10 transition-colors"
          >
            Clear
          </button>
          <button
            onClick={saveSchema}
            disabled={saving || !selectedPage || !schemaCode}
            className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold text-[15px] hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Schema
              </>
            )}
          </button>
        </div>
      </div>

      {/* Schema Info */}
      <div className="glass p-6 rounded-xl border border-white/10">
        <h3 className="text-[16px] font-semibold text-white mb-3">Schema.org Structured Data</h3>
        <div className="space-y-2 text-[14px] text-white/70">
          <p>
            ✅ Structured data helps search engines understand your content better
          </p>
          <p>
            ✅ Improves rich snippets in search results (ratings, prices, etc.)
          </p>
          <p>
            ✅ Increases click-through rates and visibility
          </p>
          <p>
            ✅ Required for Google rich results eligibility
          </p>
        </div>
        <div className="mt-4">
          <a
            href="https://schema.org/docs/schemas.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14px] text-yellow-500 hover:text-yellow-400 transition-colors"
          >
            Learn more about Schema.org →
          </a>
        </div>
      </div>
    </div>
  );
}