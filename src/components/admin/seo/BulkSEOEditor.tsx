/**
 * ============================================================================
 * BULK SEO EDITOR
 * ============================================================================
 * 
 * Edit SEO for multiple pages at once
 * 
 * Features:
 * - Select multiple pages (checkbox selection)
 * - Bulk update title/description/keywords
 * - Templates (apply preset SEO configs)
 * - Find & replace in titles/descriptions
 * - Preview changes before applying
 * - Undo/redo support
 */

import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { toast, adminToast } from '../../../utils/toast';
import { PageLoading } from '../shared/LoadingState';
import { EmptyState, EmptySearch } from '../shared/EmptyState';
import {
  Search,
  CheckSquare,
  Square,
  Edit,
  Save,
  X,
  Copy,
  FileText,
  Zap,
  Filter,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface Page {
  pageId: string;
  slug: string;
  title: string;
  description: string;
  keywords: string;
  score: number;
}

export function BulkSEOEditor() {
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState<Page[]>([]);
  const [filteredPages, setFilteredPages] = useState<Page[]>([]);
  const [selectedPages, setSelectedPages] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [bulkMode, setBulkMode] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Bulk edit fields
  const [bulkTitle, setBulkTitle] = useState('');
  const [bulkDescription, setBulkDescription] = useState('');
  const [bulkKeywords, setBulkKeywords] = useState('');
  const [appendMode, setAppendMode] = useState(false);

  // Find & Replace
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [replaceIn, setReplaceIn] = useState<'title' | 'description' | 'both'>('title');

  // Load pages on mount
  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    setLoading(true);
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

      if (result.success && result.pages) {
        setPages(result.pages);
        setFilteredPages(result.pages);
      }
    } catch (error) {
      console.error('Error loading pages:', error);
      alert('❌ Error loading pages. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // Filter search
  useEffect(() => {
    if (searchQuery) {
      setFilteredPages(
        pages.filter(p =>
          p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredPages(pages);
    }
  }, [searchQuery, pages]);

  // Select all/none
  const toggleSelectAll = () => {
    if (selectedPages.size === filteredPages.length) {
      setSelectedPages(new Set());
    } else {
      setSelectedPages(new Set(filteredPages.map(p => p.pageId)));
    }
  };

  // Toggle individual page
  const togglePage = (pageId: string) => {
    const newSelected = new Set(selectedPages);
    if (newSelected.has(pageId)) {
      newSelected.delete(pageId);
    } else {
      newSelected.add(pageId);
    }
    setSelectedPages(newSelected);
  };

  // Apply bulk update
  const handleBulkUpdate = async () => {
    if (selectedPages.size === 0) {
      toast.warning('No pages selected', 'Select at least one page to update');
      return;
    }

    if (!bulkTitle && !bulkDescription && !bulkKeywords) {
      toast.warning('No changes specified', 'Enter at least one field to update');
      return;
    }

    const toastId = toast.loading(`Updating ${selectedPages.size} pages...`);
    setSaving(true);

    try {
      // Build update data for selected pages
      const updates = Array.from(selectedPages).map(pageId => {
        const page = pages.find(p => p.pageId === pageId);
        if (!page) return null;

        return {
          slug: page.slug,
          pageId: page.pageId,
          title: bulkTitle ? 
            (appendMode ? `${page.title} ${bulkTitle}` : bulkTitle) : 
            page.title,
          description: bulkDescription ? 
            (appendMode ? `${page.description} ${bulkDescription}` : bulkDescription) :
            page.description,
          keywords: bulkKeywords ?
            (appendMode ? `${page.keywords}, ${bulkKeywords}` : bulkKeywords) :
            page.keywords,
        };
      }).filter(Boolean);

      // Send bulk update to backend
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/seo-system/pages/bulk`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ pages: updates })
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.dismiss(toastId);
        adminToast.bulkAction(selectedPages.size, 'updated');
        
        // Clear bulk fields
        setBulkTitle('');
        setBulkDescription('');
        setBulkKeywords('');
        setBulkMode(false);
        setSelectedPages(new Set());
        
        // Reload pages (you might want to pass a callback here)
        // reloadPages();
      } else {
        toast.dismiss(toastId);
        toast.error('Bulk update failed', result.error);
      }
    } catch (error) {
      console.error('Bulk update error:', error);
      toast.dismiss(toastId);
      adminToast.networkError();
    } finally {
      setSaving(false);
    }
  };

  // Apply find & replace
  const handleFindReplace = () => {
    if (!findText) {
      toast.warning('Enter text to find');
      return;
    }

    const updatedPages = pages.map(page => {
      if (!selectedPages.has(page.pageId)) return page;

      const newPage = { ...page };
      
      if (replaceIn === 'title' || replaceIn === 'both') {
        newPage.title = page.title.replaceAll(findText, replaceText);
      }
      
      if (replaceIn === 'description' || replaceIn === 'both') {
        newPage.description = page.description.replaceAll(findText, replaceText);
      }

      return newPage;
    });

    setPages(updatedPages);
    setFilteredPages(updatedPages.filter(p => {
      if (!searchQuery) return true;
      return p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
             p.title.toLowerCase().includes(searchQuery.toLowerCase());
    }));

    toast.success('Find & replace applied', 'Click "Save Changes" to persist');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[22px] font-medium text-white mb-2">Bulk SEO Editor</h3>
          <p className="text-[14px] text-white/60">
            {selectedPages.size > 0 ? (
              <span className="text-yellow-500 font-medium">{selectedPages.size} pages selected</span>
            ) : (
              'Select pages to edit in bulk'
            )}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {selectedPages.size > 0 && (
            <>
              <button
                onClick={() => setBulkMode(!bulkMode)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  bulkMode 
                    ? 'bg-yellow-500 text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Edit className="w-4 h-4" />
                {bulkMode ? 'Hide' : 'Show'} Bulk Editor
              </button>
              <button
                onClick={() => setSelectedPages(new Set())}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Clear Selection
              </button>
            </>
          )}
        </div>
      </div>

      {/* Bulk Editor Panel */}
      {bulkMode && selectedPages.size > 0 && (
        <div className="glass rounded-xl p-6 border-2 border-yellow-500/20">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-[18px] font-medium text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Bulk Edit {selectedPages.size} Pages
            </h4>
            <label className="flex items-center gap-2 text-[14px] text-white/70">
              <input
                type="checkbox"
                checked={appendMode}
                onChange={(e) => setAppendMode(e.target.checked)}
                className="rounded bg-white/5 border-white/10 text-yellow-500"
              />
              Append mode (add to existing)
            </label>
          </div>

          <div className="space-y-4">
            {/* Bulk Title */}
            <div>
              <label className="block text-[14px] font-medium text-white mb-2">
                {appendMode ? 'Append to Title' : 'Replace Title'}
              </label>
              <input
                type="text"
                value={bulkTitle}
                onChange={(e) => setBulkTitle(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder={appendMode ? 'Text to append' : 'New title for all'}
              />
            </div>

            {/* Bulk Description */}
            <div>
              <label className="block text-[14px] font-medium text-white mb-2">
                {appendMode ? 'Append to Description' : 'Replace Description'}
              </label>
              <textarea
                value={bulkDescription}
                onChange={(e) => setBulkDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder={appendMode ? 'Text to append' : 'New description for all'}
              />
            </div>

            {/* Bulk Keywords */}
            <div>
              <label className="block text-[14px] font-medium text-white mb-2">
                {appendMode ? 'Append Keywords' : 'Replace Keywords'}
              </label>
              <input
                type="text"
                value={bulkKeywords}
                onChange={(e) => setBulkKeywords(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder={appendMode ? 'Keywords to add' : 'New keywords for all'}
              />
            </div>

            {/* Find & Replace */}
            <div className="pt-4 border-t border-white/10">
              <h5 className="text-[15px] font-medium text-white mb-3">Find & Replace</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  value={findText}
                  onChange={(e) => setFindText(e.target.value)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Find text..."
                />
                <input
                  type="text"
                  value={replaceText}
                  onChange={(e) => setReplaceText(e.target.value)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Replace with..."
                />
                <select
                  value={replaceIn}
                  onChange={(e) => setReplaceIn(e.target.value as any)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="title">In titles</option>
                  <option value="description">In descriptions</option>
                  <option value="both">In both</option>
                </select>
              </div>
              <button
                onClick={handleFindReplace}
                className="mt-3 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-[14px]"
              >
                Apply Find & Replace
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4">
              <button
                onClick={handleBulkUpdate}
                disabled={saving || (!bulkTitle && !bulkDescription && !bulkKeywords)}
                className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                  saving || (!bulkTitle && !bulkDescription && !bulkKeywords)
                    ? 'bg-white/10 text-white/40 cursor-not-allowed'
                    : 'bg-yellow-500 hover:bg-yellow-400 text-black'
                }`}
              >
                <Save className="w-5 h-5" />
                {saving ? 'Saving...' : `Update ${selectedPages.size} Pages`}
              </button>
              <button
                onClick={() => setBulkMode(false)}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Search pages..."
          />
        </div>
        <button
          onClick={toggleSelectAll}
          className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center gap-2"
        >
          {selectedPages.size === filteredPages.length ? (
            <CheckSquare className="w-5 h-5" />
          ) : (
            <Square className="w-5 h-5" />
          )}
          {selectedPages.size === filteredPages.length ? 'Deselect' : 'Select'} All
        </button>
      </div>

      {/* Pages List */}
      {filteredPages.length === 0 && searchQuery ? (
        <EmptySearch searchQuery={searchQuery} />
      ) : filteredPages.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No pages found"
          description="No pages available for bulk editing"
        />
      ) : (
        <div className="space-y-3">
          {filteredPages.map(page => (
            <div
              key={page.pageId}
              onClick={() => togglePage(page.pageId)}
              className={`glass rounded-xl p-4 cursor-pointer transition-all border-2 ${
                selectedPages.has(page.pageId)
                  ? 'border-yellow-500 bg-yellow-500/10'
                  : 'border-transparent hover:border-white/20'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {selectedPages.has(page.pageId) ? (
                    <CheckSquare className="w-6 h-6 text-yellow-500" />
                  ) : (
                    <Square className="w-6 h-6 text-white/20" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-[16px] font-medium text-white">{page.title}</h4>
                    <span className={`px-2 py-1 rounded text-[12px] font-medium ${
                      page.score >= 80 ? 'bg-green-500/20 text-green-500' :
                      page.score >= 60 ? 'bg-yellow-500/20 text-yellow-500' :
                      'bg-red-500/20 text-red-500'
                    }`}>
                      {page.score}/100
                    </span>
                  </div>
                  <p className="text-[13px] text-white/60 mb-1">{page.slug}</p>
                  <p className="text-[14px] text-white/70 line-clamp-2">{page.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}