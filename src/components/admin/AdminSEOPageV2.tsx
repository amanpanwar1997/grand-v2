import { useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { 
  Globe,
  FileText,
  Code,
  Map,
  FileCode,
  ArrowRight,
  AlertTriangle,
  Search,
  Settings
} from 'lucide-react';
import { GlobalSEOPanel } from './seo/GlobalSEOPanel';
import { PageSEOPanel } from './seo/PageSEOPanel';
import { SchemaPanel } from './seo/SchemaPanel';
import { SitemapPanel } from './seo/SitemapPanel';
import { RobotsPanel } from './seo/RobotsPanel';
import { RedirectsPanel } from './seo/RedirectsPanel';
import { Error404Panel } from './seo/Error404Panel';
import { IndexingPanel } from './seo/IndexingPanel';
import { SocialMetaPanel } from './seo/SocialMetaPanel';

type Tab = 'global' | 'pages' | 'schema' | 'sitemap' | 'robots' | 'redirects' | '404' | 'indexing' | 'social';

/**
 * Admin SEO Page V2 - RankMath Level
 * Complete enterprise SEO management system
 */
export function AdminSEOPageV2() {
  const [activeTab, setActiveTab] = useState<Tab>('global');

  const tabs = [
    { 
      id: 'global' as Tab, 
      label: 'Global SEO', 
      icon: Globe,
      description: 'Site-wide SEO settings'
    },
    { 
      id: 'pages' as Tab, 
      label: 'Page SEO', 
      icon: FileText,
      description: 'Per-page SEO management'
    },
    { 
      id: 'schema' as Tab, 
      label: 'Schema', 
      icon: Code,
      description: 'Structured data builder'
    },
    { 
      id: 'sitemap' as Tab, 
      label: 'Sitemaps', 
      icon: Map,
      description: 'XML sitemap management'
    },
    { 
      id: 'robots' as Tab, 
      label: 'Robots', 
      icon: FileCode,
      description: 'Robots.txt editor'
    },
    { 
      id: 'redirects' as Tab, 
      label: 'Redirects', 
      icon: ArrowRight,
      description: '301/302 redirect manager'
    },
    { 
      id: '404' as Tab, 
      label: '404 Monitor', 
      icon: AlertTriangle,
      description: 'Track broken links'
    },
    { 
      id: 'indexing' as Tab, 
      label: 'Indexing', 
      icon: Search,
      description: 'Search engine indexing'
    },
    { 
      id: 'social' as Tab, 
      label: 'Social Meta', 
      icon: Settings,
      description: 'OG & Twitter cards'
    },
  ];

  const renderPanel = () => {
    switch (activeTab) {
      case 'global':
        return <GlobalSEOPanel />;
      case 'pages':
        return <PageSEOPanel />;
      case 'schema':
        return <SchemaPanel />;
      case 'sitemap':
        return <SitemapPanel />;
      case 'robots':
        return <RobotsPanel />;
      case 'redirects':
        return <RedirectsPanel />;
      case '404':
        return <Error404Panel />;
      case 'indexing':
        return <IndexingPanel />;
      case 'social':
        return <SocialMetaPanel />;
      default:
        return <GlobalSEOPanel />;
    }
  };

  return (
    <AdminLayout
      title="SEO Management System"
      breadcrumb={[
        { label: 'Dashboard', href: '/admin' },
        { label: 'SEO' }
      ]}
    >
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-[26px] md:text-[30px] font-medium text-white mb-2">
            Enterprise SEO Management
          </h1>
          <p className="text-[15px] text-white/70">
            RankMath-level SEO control center for your entire website
          </p>
        </div>

        {/* Tabs */}
        <div className="glass border border-white/10 rounded-xl overflow-hidden">
          {/* Tab Headers - Horizontal Scroll on Mobile */}
          <div className="flex overflow-x-auto scrollbar-hide border-b border-white/10">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-4 py-3 whitespace-nowrap transition-all
                    border-b-2 ${
                      isActive
                        ? 'border-yellow-500 text-white bg-white/5'
                        : 'border-transparent text-white/60 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-[14px] font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Description Bar */}
          <div className="px-6 py-3 bg-black/30 border-b border-white/10">
            <p className="text-[13px] text-white/60">
              {tabs.find(t => t.id === activeTab)?.description}
            </p>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {renderPanel()}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="glass p-4 rounded-xl border border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <FileText className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-[13px] text-white/60">Pages Optimized</p>
                <p className="text-[20px] font-bold text-white">274</p>
              </div>
            </div>
          </div>

          <div className="glass p-4 rounded-xl border border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Search className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-[13px] text-white/60">Avg SEO Score</p>
                <p className="text-[20px] font-bold text-white">92/100</p>
              </div>
            </div>
          </div>

          <div className="glass p-4 rounded-xl border border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <ArrowRight className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-[13px] text-white/60">Active Redirects</p>
                <p className="text-[20px] font-bold text-white">0</p>
              </div>
            </div>
          </div>

          <div className="glass p-4 rounded-xl border border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-[13px] text-white/60">404 Errors</p>
                <p className="text-[20px] font-bold text-white">0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
