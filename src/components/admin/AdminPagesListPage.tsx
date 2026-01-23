import { useState, useEffect } from 'react';
import { AdminLayout } from './AdminLayout';
import { useAdminAuth } from '../../utils/adminAuth';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { logActivity } from './ActivityLog';
import {
  FileText,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Filter,
  Download,
  BarChart3,
  AlertCircle,
  CheckCircle,
  Loader2,
  TrendingUp,
  Clock,
} from 'lucide-react';

// SEO Analysis Function
function analyzeSEO(page: any) {
  let score = 100;

  // Title checks
  if (!page.title) {
    score -= 20;
  } else if (page.title.length < 30 || page.title.length > 60) {
    score -= 5;
  }

  // Meta description checks
  if (!page.description) {
    score -= 15;
  } else if (page.description.length < 120 || page.description.length > 160) {
    score -= 5;
  }

  // Keywords
  if (!page.keywords || page.keywords.length === 0) {
    score -= 5;
  } else if (page.keywords.length < 3) {
    score -= 3;
  }

  // H1 tag
  if (!page.h1) {
    score -= 10;
  }

  // Canonical URL
  if (!page.canonical) {
    score -= 5;
  }

  // Schema.org
  if (!page.schema) {
    score -= 10;
  }

  return Math.max(0, score);
}

export function AdminPagesListPage() {
  const { hasPermission } = useAdminAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  // Load pages from backend (NOT from SEO_CONFIG)
  useEffect(() => {
    loadPagesFromBackend();
  }, []);

  const loadPagesFromBackend = async () => {
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

      if (result.success) {
        // Check if pages array is empty
        if (!result.pages || result.pages.length === 0) {
          console.warn('⚠️  Backend returned empty pages array. Showing initialization prompt.');
          setPages([]);
          setLoading(false);
          // Show a helpful message - handled by empty state UI below
          return;
        }

        // Transform backend pages to match UI format
        const transformedPages = result.pages.map((page: any, index: number) => ({
          id: page.pageId || `page-${index}`,
          title: page.title || 'Untitled Page',
          slug: page.slug || '/',
          description: page.description || '',
          keywords: page.keywords || '',
          h1: page.title || '',
          canonical: page.canonical || '',
          schema: page.schemaType || '',
          status: page.status || 'published',
          views: page.views || 0, // Real views from backend (no fake data)
          lastUpdated: page.updatedAt || new Date().toISOString(),
          author: page.author || 'Admin',
          seoScore: page.score || 0 // Real SEO score from backend
        }));

        setPages(transformedPages);
      } else {
        // Backend returned error - show empty state
        console.warn('Backend returned error, showing empty state');
        setPages([]);
      }
    } catch (error) {
      console.error('Error loading pages from backend:', error);
      // Show empty state on error
      console.warn('Cannot connect to backend. Showing empty state.');
      setPages([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredPages = pages.filter((page) => {
    const matchesSearch =
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || page.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPages = filteredPages.slice(startIndex, endIndex);

  const getSEOScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 80) return 'text-blue-500';
    if (score >= 70) return 'text-yellow-500';
    if (score >= 60) return 'text-orange-500';
    return 'text-red-500';
  };

  const getSEOGrade = (score: number) => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };

  const handleSelectAll = () => {
    if (selectedPages.length === paginatedPages.length) {
      setSelectedPages([]);
    } else {
      setSelectedPages(paginatedPages.map((p) => p.id));
    }
  };

  const handleSelectPage = (id: string) => {
    if (selectedPages.includes(id)) {
      setSelectedPages(selectedPages.filter((p) => p !== id));
    } else {
      setSelectedPages([...selectedPages, id]);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this page?')) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/cms/pages/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      const result = await response.json();

      if (result.success) {
        alert('✅ Page deleted successfully!');
        
        // Log activity
        const page = pages.find(p => p.id === id);
        await logActivity(
          'delete',
          'pages',
          `deleted page "${page?.title || id}"`
        );
        
        // Remove from local state
        setPages(pages.filter(p => p.id !== id));
        setFilteredPages(filteredPages.filter(p => p.id !== id));
      } else {
        alert('❌ Error: ' + result.error);
      }
    } catch (error) {
      console.error('Error deleting page:', error);
      alert('❌ Error deleting page. Make sure backend is running.');
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedPages.length} pages?`)) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/cms/pages/bulk-delete`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ids: selectedPages })
        }
      );

      const result = await response.json();

      if (result.success) {
        alert(`✅ Deleted ${selectedPages.length} pages successfully!`);
        // Remove from local state
        setPages(pages.filter(p => !selectedPages.includes(p.id)));
        setFilteredPages(filteredPages.filter(p => !selectedPages.includes(p.id)));
        setSelectedPages([]);
      } else {
        alert('❌ Error: ' + result.error);
      }
    } catch (error) {
      console.error('Error bulk deleting pages:', error);
      alert('❌ Error deleting pages. Make sure backend is running.');
    }
  };

  // Calculate stats
  const stats = {
    total: pages.length,
    published: pages.filter(p => p.status === 'published').length,
    draft: pages.filter(p => p.status === 'draft').length,
    avgScore: Math.round(pages.reduce((acc, p) => acc + p.seoScore, 0) / pages.length) || 0,
    needsAttention: pages.filter(p => p.seoScore < 80).length
  };

  return (
    <AdminLayout
      title="Pages"
      breadcrumb={[
        { label: 'Dashboard', href: '/admin' },
        { label: 'Pages' },
      ]}
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="glass p-6 rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-5 h-5 text-yellow-500" />
            <span className="text-[13px] text-white/60">Total Pages</span>
          </div>
          <p className="text-[30px] font-bold text-white">{stats.total}</p>
        </div>

        <div className="glass p-6 rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-[13px] text-white/60">Published</span>
          </div>
          <p className="text-[30px] font-bold text-white">{stats.published}</p>
        </div>

        <div className="glass p-6 rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-5 h-5 text-yellow-500 font-bold flex items-center justify-center">
              {getSEOGrade(stats.avgScore)}
            </div>
            <span className="text-[13px] text-white/60">Avg SEO Score</span>
          </div>
          <p className="text-[30px] font-bold text-white">{stats.avgScore}%</p>
        </div>

        <div className="glass p-6 rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-5 h-5 text-orange-500" />
            <span className="text-[13px] text-white/60">Needs Attention</span>
          </div>
          <p className="text-[30px] font-bold text-white">{stats.needsAttention}</p>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[26px] md:text-[30px] font-medium text-white mb-2">Pages</h1>
          <p className="text-[15px] text-white/70">
            Manage all {pages.length} pages on your website
          </p>
        </div>

        {hasPermission('editor') && (
          <a
            href="/admin/pages/new"
            className="inline-flex items-center gap-2 bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold text-[15px] hover:bg-yellow-400 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create New Page
          </a>
        )}
      </div>

      {/* Search & Filters */}
      <div className="glass p-6 rounded-xl border border-white/10 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              placeholder="Search pages by title or slug..."
              className="w-full bg-black/50 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-white/40" />
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value as any);
                setCurrentPage(1); // Reset to first page on filter change
              }}
              className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white focus:outline-none focus:border-yellow-500 transition-colors"
            >
              <option value="all">All Pages</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedPages.length > 0 && (
          <div className="mt-4 flex items-center gap-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <span className="text-[14px] text-yellow-500 font-medium">
              {selectedPages.length} page{selectedPages.length > 1 ? 's' : ''} selected
            </span>
            <button
              onClick={handleBulkDelete}
              className="text-[14px] text-red-500 hover:text-red-400 transition-colors font-medium"
            >
              Delete Selected
            </button>
          </div>
        )}
      </div>

      {/* Pages Table */}
      <div className="glass rounded-xl border border-white/10 overflow-hidden">
        {/* Table Header */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black/30 border-b border-white/10">
              <tr>
                <th className="w-12 p-4">
                  <input
                    type="checkbox"
                    checked={selectedPages.length === paginatedPages.length && paginatedPages.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-white/20 bg-black/50 checked:bg-yellow-500 focus:ring-2 focus:ring-yellow-500"
                  />
                </th>
                <th className="text-left p-4 text-[13px] font-semibold text-white/70">TITLE</th>
                <th className="text-left p-4 text-[13px] font-semibold text-white/70">STATUS</th>
                <th className="text-center p-4 text-[13px] font-semibold text-white/70">SEO SCORE</th>
                <th className="text-center p-4 text-[13px] font-semibold text-white/70">VIEWS</th>
                <th className="text-left p-4 text-[13px] font-semibold text-white/70">LAST UPDATED</th>
                <th className="text-center p-4 text-[13px] font-semibold text-white/70">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPages.map((page) => (
                <tr
                  key={page.id}
                  className="border-b border-white/10 hover:bg-white/5 transition-colors"
                >
                  {/* Checkbox */}
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedPages.includes(page.id)}
                      onChange={() => handleSelectPage(page.id)}
                      className="w-4 h-4 rounded border-white/20 bg-black/50 checked:bg-yellow-500 focus:ring-2 focus:ring-yellow-500"
                    />
                  </td>

                  {/* Title */}
                  <td className="p-4">
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-white/40 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[15px] font-medium text-white mb-0.5">
                          {page.title}
                        </div>
                        <div className="text-[13px] text-white/60">{page.slug}</div>
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[13px] font-medium ${
                        page.status === 'published'
                          ? 'bg-green-500/20 text-green-500'
                          : 'bg-gray-500/20 text-gray-400'
                      }`}
                    >
                      {page.status === 'published' ? (
                        <CheckCircle className="w-3.5 h-3.5" />
                      ) : (
                        <Clock className="w-3.5 h-3.5" />
                      )}
                      {page.status}
                    </span>
                  </td>

                  {/* SEO Score */}
                  <td className="p-4 text-center">
                    {page.seoScore > 0 ? (
                      <span className={`text-[15px] font-bold ${getSEOScoreColor(page.seoScore)}`}>
                        {page.seoScore}/100
                      </span>
                    ) : (
                      <span className="text-[13px] text-white/40">-</span>
                    )}
                  </td>

                  {/* Views */}
                  <td className="p-4 text-center">
                    <span className="text-[15px] text-white">{page.views.toLocaleString()}</span>
                  </td>

                  {/* Last Updated */}
                  <td className="p-4">
                    <div className="text-[14px] text-white/70">{page.lastUpdated}</div>
                    <div className="text-[12px] text-white/50">{page.author}</div>
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <a
                        href={page.slug}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                        title="View Page"
                      >
                        <Eye className="w-4 h-4" />
                      </a>
                      {hasPermission('editor') && (
                        <>
                          <a
                            href={`/admin/pages/edit/${encodeURIComponent(page.seoConfigKey)}`}
                            className="p-2 text-white/60 hover:text-yellow-500 hover:bg-yellow-500/10 rounded-lg transition-all"
                            title="Edit Page"
                          >
                            <Edit className="w-4 h-4" />
                          </a>
                          {hasPermission('admin') && (
                            <button
                              onClick={() => handleDelete(page.id)}
                              className="p-2 text-white/60 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                              title="Delete Page"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredPages.length === 0 && (
          <div className="p-12 text-center">
            <AlertCircle className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-[18px] font-medium text-white mb-2">No pages found</h3>
            <p className="text-[14px] text-white/60">
              {searchQuery || filterStatus !== 'all'
                ? 'Try adjusting your filters'
                : 'Create your first page to get started'}
            </p>
          </div>
        )}

        {/* Pagination */}
        {filteredPages.length > 0 && (
          <div className="p-4 border-t border-white/10 flex items-center justify-between">
            <div className="text-[14px] text-white/60">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredPages.length)} of {filteredPages.length} pages
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-[14px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {/* Page numbers */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-4 py-2 rounded-lg text-[14px] font-medium transition-colors ${
                      currentPage === pageNum
                        ? 'bg-yellow-500 text-black'
                        : 'bg-white/5 hover:bg-white/10 text-white'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-[14px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}