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
  Settings,
  TrendingUp,
  Target,
  Zap,
  BarChart3,
  Brain,
  Users,
  Link,
  Eye,
  Award,
  Layers,
  Activity
} from 'lucide-react';
import { GlobalSEOPanel } from './seo/GlobalSEOPanel';
import { PageSEOPanel } from './seo/PageSEOPanel';
import { SchemaPanel } from './seo/SchemaPanel';
import { SitemapPanel } from './seo/SitemapPanel';
import { RobotsPanel } from './seo/RobotsPanel';
import { RedirectsPanelV2 } from './seo/RedirectsPanelV2';
import { Error404PanelV2 } from './seo/Error404PanelV2';
import { IndexingPanel } from './seo/IndexingPanel';
import { SocialMetaPanel } from './seo/SocialMetaPanel';
import { BulkSEOEditor } from './seo/BulkSEOEditor';
import { ContentAnalyzer } from './seo/ContentAnalyzer';
import { KeywordResearch } from './seo/KeywordResearch';
import { RedirectManager } from './seo/RedirectManager';
import { AdvancedContentAnalyzer } from './seo/AdvancedContentAnalyzer';
import { AdvancedKeywordResearch } from './seo/AdvancedKeywordResearch';
import { CompetitorAnalysis } from './seo/CompetitorAnalysis';
import { SEOMonitoring } from './seo/SEOMonitoring';
import { LinkBuildingHub } from './seo/LinkBuildingHub';
import { SiteAudit } from './seo/SiteAudit';
import { SEOForecasting } from './seo/SEOForecasting';
import { AIContentOptimizer } from './seo/AIContentOptimizer';
import { RankTracking } from './seo/RankTracking';
import { TechnicalSEO } from './seo/TechnicalSEO';

type Tab = 
  | 'global' 
  | 'pages' 
  | 'schema' 
  | 'sitemap' 
  | 'robots' 
  | 'redirects' 
  | '404' 
  | 'indexing' 
  | 'social'
  | 'bulk'
  | 'content'
  | 'keywords'
  | 'competitor'
  | 'monitoring'
  | 'links'
  | 'audit'
  | 'forecast'
  | 'ai'
  | 'rankings'
  | 'technical';

/**
 * Admin SEO Page V3 - ENTERPRISE NEXT-LEVEL
 * Complete AI-powered, enterprise-grade SEO management system
 * 
 * NEW FEATURES:
 * - AI Content Optimization
 * - Competitor Analysis
 * - Real-time SEO Monitoring
 * - Link Building Hub
 * - Automated Site Audit
 * - SEO Forecasting & Predictions
 * - Rank Tracking
 * - Technical SEO Analyzer
 * - Advanced Keyword Research
 * - Bulk Operations
 */
export function AdminSEOPageV3() {
  const [activeTab, setActiveTab] = useState<Tab>('global');
  const [activeCategory, setActiveCategory] = useState<'essential' | 'advanced' | 'ai'>('essential');

  const essentialTabs = [
    { 
      id: 'global' as Tab, 
      label: 'Global SEO', 
      icon: Globe,
      description: 'Site-wide SEO settings',
      badge: 'Core'
    },
    { 
      id: 'pages' as Tab, 
      label: 'Page SEO', 
      icon: FileText,
      description: '274 pages managed',
      badge: 'Core'
    },
    { 
      id: 'bulk' as Tab, 
      label: 'Bulk Editor', 
      icon: Layers,
      description: 'Edit multiple pages',
      badge: 'New'
    },
    { 
      id: 'schema' as Tab, 
      label: 'Schema', 
      icon: Code,
      description: 'Structured data builder',
      badge: 'Core'
    },
    { 
      id: 'sitemap' as Tab, 
      label: 'Sitemaps', 
      icon: Map,
      description: 'XML sitemap management',
      badge: 'Core'
    },
    { 
      id: 'robots' as Tab, 
      label: 'Robots', 
      icon: FileCode,
      description: 'Robots.txt editor',
      badge: 'Core'
    },
    { 
      id: 'redirects' as Tab, 
      label: 'Redirects', 
      icon: ArrowRight,
      description: '301/302 redirect manager',
      badge: 'Core'
    },
    { 
      id: '404' as Tab, 
      label: '404 Monitor', 
      icon: AlertTriangle,
      description: 'Track broken links',
      badge: 'Core'
    },
    { 
      id: 'indexing' as Tab, 
      label: 'Indexing', 
      icon: Search,
      description: 'Search engine indexing',
      badge: 'Core'
    },
    { 
      id: 'social' as Tab, 
      label: 'Social Meta', 
      icon: Settings,
      description: 'OG & Twitter cards',
      badge: 'Core'
    },
  ];

  const advancedTabs = [
    { 
      id: 'content' as Tab, 
      label: 'Content Analyzer', 
      icon: FileText,
      description: 'Advanced content analysis',
      badge: 'Pro'
    },
    { 
      id: 'keywords' as Tab, 
      label: 'Keyword Research', 
      icon: Target,
      description: 'Find & track keywords',
      badge: 'Pro'
    },
    { 
      id: 'competitor' as Tab, 
      label: 'Competitor Analysis', 
      icon: Users,
      description: 'Track competitor SEO',
      badge: 'Pro'
    },
    { 
      id: 'monitoring' as Tab, 
      label: 'SEO Monitoring', 
      icon: Activity,
      description: 'Real-time SEO health',
      badge: 'Pro'
    },
    { 
      id: 'links' as Tab, 
      label: 'Link Building', 
      icon: Link,
      description: 'Backlink management',
      badge: 'Pro'
    },
    { 
      id: 'audit' as Tab, 
      label: 'Site Audit', 
      icon: Search,
      description: 'Automated SEO audit',
      badge: 'Pro'
    },
    { 
      id: 'rankings' as Tab, 
      label: 'Rank Tracking', 
      icon: TrendingUp,
      description: 'Track keyword rankings',
      badge: 'Pro'
    },
    { 
      id: 'technical' as Tab, 
      label: 'Technical SEO', 
      icon: Zap,
      description: 'Core Web Vitals & speed',
      badge: 'Pro'
    },
  ];

  const aiTabs = [
    { 
      id: 'ai' as Tab, 
      label: 'AI Optimizer', 
      icon: Brain,
      description: 'AI-powered SEO suggestions',
      badge: 'AI'
    },
    { 
      id: 'forecast' as Tab, 
      label: 'SEO Forecasting', 
      icon: BarChart3,
      description: 'Predict SEO performance',
      badge: 'AI'
    },
  ];

  const getCurrentTabs = () => {
    switch (activeCategory) {
      case 'essential':
        return essentialTabs;
      case 'advanced':
        return advancedTabs;
      case 'ai':
        return aiTabs;
      default:
        return essentialTabs;
    }
  };

  const renderPanel = () => {
    switch (activeTab) {
      // Essential Tabs
      case 'global':
        return <GlobalSEOPanel />;
      case 'pages':
        return <PageSEOPanel />;
      case 'bulk':
        return <BulkSEOEditor />;
      case 'schema':
        return <SchemaPanel />;
      case 'sitemap':
        return <SitemapPanel />;
      case 'robots':
        return <RobotsPanel />;
      case 'redirects':
        return <RedirectsPanelV2 />;
      case '404':
        return <Error404PanelV2 />;
      case 'indexing':
        return <IndexingPanel />;
      case 'social':
        return <SocialMetaPanel />;
      
      // Advanced Tabs
      case 'content':
        return <AdvancedContentAnalyzer />;
      case 'keywords':
        return <AdvancedKeywordResearch />;
      case 'competitor':
        return <CompetitorAnalysis />;
      case 'monitoring':
        return <SEOMonitoring />;
      case 'links':
        return <LinkBuildingHub />;
      case 'audit':
        return <SiteAudit />;
      case 'rankings':
        return <RankTracking />;
      case 'technical':
        return <TechnicalSEO />;
      
      // AI Tabs
      case 'ai':
        return <AIContentOptimizer />;
      case 'forecast':
        return <SEOForecasting />;
      
      default:
        return <GlobalSEOPanel />;
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Core':
        return 'bg-blue-500/20 text-blue-400';
      case 'Pro':
        return 'bg-purple-500/20 text-purple-400';
      case 'AI':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'New':
        return 'bg-green-500/20 text-green-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <div className="border-b border-white/10 bg-[#0a0a0a]">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-[26px] font-bold text-white mb-2">
                  Enterprise SEO Management
                </h1>
                <p className="text-[14px] text-white/60">
                  Complete AI-powered SEO control center for 274 pages
                </p>
              </div>
              
              {/* SEO Health Score */}
              <div className="flex items-center gap-4">
                <div className="bg-black border border-white/10 rounded-lg px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-[13px] text-white/60">SEO Health</div>
                      <div className="text-[20px] font-bold text-green-400">92/100</div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Award className="w-6 h-6 text-green-400" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-black border border-white/10 rounded-lg px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-[13px] text-white/60">Pages Indexed</div>
                      <div className="text-[20px] font-bold text-blue-400">268/274</div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Eye className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Selector */}
            <div className="flex items-center gap-2 mb-6">
              <button
                onClick={() => setActiveCategory('essential')}
                className={`px-4 py-2 rounded-lg font-medium text-[14px] transition-all ${
                  activeCategory === 'essential'
                    ? 'bg-blue-500 text-black'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                Essential Tools
              </button>
              <button
                onClick={() => setActiveCategory('advanced')}
                className={`px-4 py-2 rounded-lg font-medium text-[14px] transition-all ${
                  activeCategory === 'advanced'
                    ? 'bg-purple-500 text-black'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                Advanced Features
              </button>
              <button
                onClick={() => setActiveCategory('ai')}
                className={`px-4 py-2 rounded-lg font-medium text-[14px] transition-all ${
                  activeCategory === 'ai'
                    ? 'bg-yellow-500 text-black'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  AI-Powered
                </div>
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {getCurrentTabs().map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    relative flex items-center gap-2 px-4 py-3 rounded-lg border transition-all whitespace-nowrap
                    ${activeTab === tab.id
                      ? 'bg-white/10 border-yellow-500 text-white'
                      : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20'
                    }
                  `}
                >
                  <tab.icon className="w-4 h-4" />
                  <div className="text-left">
                    <div className="text-[13px] font-medium">{tab.label}</div>
                    <div className="text-[11px] text-white/40">{tab.description}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getBadgeColor(tab.badge)}`}>
                    {tab.badge}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Panel Content */}
        <div className="p-6">
          {renderPanel()}
        </div>
      </div>
    </AdminLayout>
  );
}