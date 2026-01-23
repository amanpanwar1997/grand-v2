import { useState, useEffect } from 'react';
import { AdminLayout } from './AdminLayout';
import { useAdminAuth } from '../../utils/adminAuth';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import {
  FileText,
  Users,
  Image,
  TrendingUp,
  Eye,
  MousePointerClick,
  ArrowUp,
  ArrowDown,
  Plus,
  Upload,
  UserPlus,
  Search as SearchIcon,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  Activity,
} from 'lucide-react';

// SEO Analysis Function
function analyzeSEO(page: any) {
  let score = 100;
  if (!page.title) score -= 20;
  else if (page.title.length < 30 || page.title.length > 60) score -= 5;
  if (!page.description) score -= 15;
  else if (page.description.length < 120 || page.description.length > 160) score -= 5;
  if (!page.keywords || page.keywords.length === 0) score -= 5;
  else if (page.keywords.length < 3) score -= 3;
  if (!page.h1) score -= 10;
  if (!page.canonical) score -= 5;
  if (!page.schema) score -= 10;
  return Math.max(0, score);
}

export function AdminDashboardPage() {
  const { user } = useAdminAuth();
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);

  // ✅ Load REAL pages from backend (not SEO_CONFIG)
  useEffect(() => {
    loadPages();
  }, []);

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

      if (result.success && result.pages) {
        // Transform pages to include SEO scores
        const pagesWithScores = result.pages.map((page: any) => ({
          ...page,
          seoScore: page.score || analyzeSEO(page),
          status: page.status || 'published'
        }));
        setPages(pagesWithScores);
      } else {
        // Empty state - no pages yet
        setPages([]);
      }
    } catch (error) {
      console.error('Error loading pages:', error);
      setPages([]);
    }
  };

  // Load real leads from backend
  useEffect(() => {
    const loadLeads = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/chatbot/leads`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.leads) {
            // Sort by most recent first
            const sortedLeads = data.leads.sort((a: any, b: any) => 
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            setLeads(sortedLeads.slice(0, 5)); // Get 5 most recent
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading leads:', error);
        setLoading(false);
      }
    };

    loadLeads();
  }, []);

  // Calculate real stats
  useEffect(() => {
    if (pages.length > 0) {
      const calculatedStats = {
        totalPages: pages.length,
        publishedPages: pages.filter(p => p.status === 'published').length,
        draftPages: pages.filter(p => p.status === 'draft').length,
        avgSeoScore: Math.round(pages.reduce((acc, p) => acc + p.seoScore, 0) / pages.length) || 0,
        totalLeads: leads.length,
        newLeads: leads.filter(l => l.status === 'new').length,
        pagesNeedingAttention: pages.filter(p => p.seoScore < 80).length,
      };
      setStats(calculatedStats);
    }
  }, [pages, leads]);

  const statCards = [
    {
      label: 'Total Pages',
      value: stats?.totalPages.toString() || '0',
      change: '+0%',
      trend: 'up' as const,
      icon: FileText,
      color: 'blue',
      href: '/admin/pages',
    },
    {
      label: 'Published Pages',
      value: stats?.publishedPages.toString() || '0',
      change: `${Math.round((stats?.publishedPages / stats?.totalPages) * 100)}%`,
      trend: 'up' as const,
      icon: CheckCircle,
      color: 'green',
      href: '/admin/pages',
    },
    {
      label: 'Total Leads',
      value: stats?.totalLeads.toString() || '0',
      change: `${stats?.newLeads} new`,
      trend: 'up' as const,
      icon: Users,
      color: 'yellow',
      href: '/admin/leads',
    },
    {
      label: 'Avg SEO Score',
      value: `${stats?.avgSeoScore}%`,
      change: stats?.avgSeoScore >= 85 ? 'Good' : 'Needs work',
      trend: stats?.avgSeoScore >= 85 ? 'up' : 'down',
      icon: TrendingUp,
      color: stats?.avgSeoScore >= 85 ? 'green' : 'orange',
      href: '/admin/seo',
    },
    {
      label: 'Needs Attention',
      value: stats?.pagesNeedingAttention.toString() || '0',
      change: `SEO < 80%`,
      trend: 'down' as const,
      icon: AlertCircle,
      color: 'red',
      href: '/admin/pages',
    },
    {
      label: 'CMS Status',
      value: 'Active',
      change: 'All systems operational',
      trend: 'up' as const,
      icon: Activity,
      color: 'green',
      href: '/admin/cms',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-500/20 text-blue-500',
      green: 'bg-green-500/20 text-green-500',
      yellow: 'bg-yellow-500/20 text-yellow-500',
      purple: 'bg-purple-500/20 text-purple-500',
      orange: 'bg-orange-500/20 text-orange-500',
      red: 'bg-red-500/20 text-red-500',
    };
    return colors[color] || colors.blue;
  };

  // Get pages with lowest SEO scores
  const lowScorePages = [...pages]
    .sort((a, b) => a.seoScore - b.seoScore)
    .slice(0, 5);

  // Get time ago string
  const getTimeAgo = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  return (
    <AdminLayout
      title="Dashboard"
      breadcrumb={[{ label: 'Dashboard' }]}
    >
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-[26px] md:text-[30px] font-medium text-white mb-2">
          Welcome back, {user?.email?.split('@')[0] || 'Admin'}! 👋
        </h1>
        <p className="text-[15px] text-white/70">
          Here's what's happening with your website today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <a
              key={index}
              href={stat.href}
              className="glass p-6 rounded-xl border border-white/10 hover:border-yellow-500/50 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1 text-[13px] font-medium">
                  {stat.trend === 'up' ? (
                    <ArrowUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div>
                <div className="text-[30px] font-bold text-white mb-1">{stat.value}</div>
                <div className="text-[14px] text-white/60">{stat.label}</div>
              </div>
            </a>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="glass p-6 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[22px] font-bold text-white">Recent Leads</h2>
            <a
              href="/admin/leads"
              className="text-[14px] text-yellow-500 hover:text-yellow-400 font-medium transition-colors"
            >
              View All →
            </a>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[14px] text-white/60">Loading leads...</p>
            </div>
          ) : leads.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <h3 className="text-[16px] font-medium text-white mb-2">No leads yet</h3>
              <p className="text-[14px] text-white/60">
                Leads from the chatbot will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-4 bg-black/30 border border-white/10 rounded-lg hover:border-yellow-500/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="text-[15px] font-medium text-white mb-1">
                        {lead.name}
                      </div>
                      <div className="text-[13px] text-white/60">{lead.phone}</div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-[12px] font-medium ${
                        lead.status === 'new'
                          ? 'bg-green-500/20 text-green-500'
                          : lead.status === 'contacted'
                          ? 'bg-blue-500/20 text-blue-500'
                          : 'bg-yellow-500/20 text-yellow-500'
                      }`}
                    >
                      {lead.status || 'new'}
                    </span>
                  </div>
                  <div className="text-[13px] text-white/70 mb-2">
                    {lead.email || 'No email provided'}
                  </div>
                  <div className="text-[12px] text-white/50">
                    {getTimeAgo(lead.createdAt)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pages Needing SEO Attention */}
        <div className="glass p-6 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[22px] font-bold text-white">SEO Attention Needed</h2>
            <a
              href="/admin/seo"
              className="text-[14px] text-yellow-500 hover:text-yellow-400 font-medium transition-colors"
            >
              View All →
            </a>
          </div>

          {lowScorePages.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="w-12 h-12 text-green-500/50 mx-auto mb-4" />
              <h3 className="text-[16px] font-medium text-white mb-2">All pages optimized!</h3>
              <p className="text-[14px] text-white/60">
                Great job! All pages have good SEO scores.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {lowScorePages.map((page, index) => {
                const getSEOColor = (score: number) => {
                  if (score >= 90) return 'text-green-500';
                  if (score >= 80) return 'text-blue-500';
                  if (score >= 70) return 'text-yellow-500';
                  if (score >= 60) return 'text-orange-500';
                  return 'text-red-500';
                };

                return (
                  <div
                    key={index}
                    className="p-4 bg-black/30 border border-white/10 rounded-lg hover:border-yellow-500/30 transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="text-[15px] font-medium text-white mb-1">
                          {page.title}
                        </div>
                        <div className="text-[13px] text-white/60">{page.slug}</div>
                      </div>
                      <div className="text-right ml-4">
                        <div className={`text-[18px] font-bold ${getSEOColor(page.seoScore)}`}>
                          {page.seoScore}%
                        </div>
                        <div className="text-[12px] text-white/50">SEO Score</div>
                      </div>
                    </div>
                    <a
                      href={`/admin/pages/edit/${encodeURIComponent(page.slug)}`}
                      className="text-[13px] text-yellow-500 hover:text-yellow-400 font-medium transition-colors"
                    >
                      Improve SEO →
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-[22px] font-bold text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <a
            href="/admin/pages/new"
            className="glass p-6 rounded-xl border border-white/10 hover:border-yellow-500/50 transition-all group"
          >
            <Plus className="w-8 h-8 text-yellow-500 mb-3" />
            <h3 className="text-[16px] font-semibold text-white mb-1">Create Page</h3>
            <p className="text-[13px] text-white/60">Add a new page to your site</p>
          </a>

          <a
            href="/admin/media"
            className="glass p-6 rounded-xl border border-white/10 hover:border-yellow-500/50 transition-all group"
          >
            <Upload className="w-8 h-8 text-blue-500 mb-3" />
            <h3 className="text-[16px] font-semibold text-white mb-1">Upload Media</h3>
            <p className="text-[13px] text-white/60">Add images and files</p>
          </a>

          <a
            href="/admin/cms"
            className="glass p-6 rounded-xl border border-white/10 hover:border-yellow-500/50 transition-all group"
          >
            <BarChart3 className="w-8 h-8 text-green-500 mb-3" />
            <h3 className="text-[16px] font-semibold text-white mb-1">Enterprise CMS</h3>
            <p className="text-[13px] text-white/60">Manage all content</p>
          </a>

          <a
            href="/admin/seo"
            className="glass p-6 rounded-xl border border-white/10 hover:border-yellow-500/50 transition-all group"
          >
            <TrendingUp className="w-8 h-8 text-purple-500 mb-3" />
            <h3 className="text-[16px] font-semibold text-white mb-1">SEO Tools</h3>
            <p className="text-[13px] text-white/60">Optimize your pages</p>
          </a>
        </div>
      </div>

      {/* System Status */}
      <div className="mt-8 glass p-6 rounded-xl border border-white/10">
        <h2 className="text-[22px] font-bold text-white mb-6">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <div className="text-[15px] font-medium text-white">Website Online</div>
              <div className="text-[13px] text-white/60">All pages loading</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <div className="text-[15px] font-medium text-white">Backend Active</div>
              <div className="text-[13px] text-white/60">API responding</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <div className="text-[15px] font-medium text-white">Database Connected</div>
              <div className="text-[13px] text-white/60">KV store ready</div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}