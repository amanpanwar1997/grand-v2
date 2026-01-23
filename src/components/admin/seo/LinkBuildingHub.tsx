import { useState } from 'react';
import { 
  Link, 
  TrendingUp, 
  Target, 
  Mail, 
  CheckCircle, 
  Clock,
  AlertCircle,
  Search,
  Plus,
  ExternalLink,
  RefreshCw,
  Filter,
  Download
} from 'lucide-react';

interface BacklinkOpportunity {
  id: string;
  domain: string;
  domainAuthority: number;
  relevanceScore: number;
  contactEmail?: string;
  status: 'prospect' | 'outreach' | 'pending' | 'secured' | 'declined';
  notes: string;
  addedDate: string;
}

interface Backlink {
  id: string;
  sourceDomain: string;
  sourceUrl: string;
  targetUrl: string;
  anchorText: string;
  domainAuthority: number;
  type: 'dofollow' | 'nofollow';
  status: 'active' | 'lost' | 'broken';
  foundDate: string;
}

/**
 * Link Building Hub
 * Manage backlinks, prospects, and outreach campaigns
 */
export function LinkBuildingHub() {
  const [opportunities, setOpportunities] = useState<BacklinkOpportunity[]>([
    {
      id: '1',
      domain: 'marketingblog.com',
      domainAuthority: 68,
      relevanceScore: 95,
      contactEmail: 'editor@marketingblog.com',
      status: 'outreach',
      notes: 'Guest post opportunity - Digital Marketing topic',
      addedDate: '2024-11-15'
    },
    {
      id: '2',
      domain: 'businessinsider.com',
      domainAuthority: 92,
      relevanceScore: 78,
      status: 'prospect',
      notes: 'High authority site - looking for expert quotes',
      addedDate: '2024-11-18'
    },
    {
      id: '3',
      domain: 'techcrunch.com',
      domainAuthority: 95,
      relevanceScore: 65,
      contactEmail: 'tips@techcrunch.com',
      status: 'pending',
      notes: 'Pitched agency spotlight article',
      addedDate: '2024-11-10'
    }
  ]);

  const [backlinks, setBacklinks] = useState<Backlink[]>([
    {
      id: '1',
      sourceDomain: 'forbes.com',
      sourceUrl: 'https://forbes.com/marketing-trends-2024',
      targetUrl: 'https://inchtomilez.com/services',
      anchorText: 'digital marketing agency',
      domainAuthority: 95,
      type: 'dofollow',
      status: 'active',
      foundDate: '2024-10-15'
    },
    {
      id: '2',
      sourceDomain: 'entrepreneur.com',
      sourceUrl: 'https://entrepreneur.com/seo-guide',
      targetUrl: 'https://inchtomilez.com/services/seo',
      anchorText: 'SEO services',
      domainAuthority: 89,
      type: 'dofollow',
      status: 'active',
      foundDate: '2024-09-22'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'opportunities' | 'backlinks' | 'outreach'>('opportunities');
  const [newProspect, setNewProspect] = useState('');
  const [loading, setLoading] = useState(false);

  const addProspect = () => {
    if (!newProspect.trim()) return;
    
    setLoading(true);
    setTimeout(() => {
      const domain = newProspect.trim().replace(/^https?:\/\//, '').replace(/\/$/, '');
      const newOpp: BacklinkOpportunity = {
        id: Date.now().toString(),
        domain,
        domainAuthority: Math.floor(Math.random() * 40) + 50,
        relevanceScore: Math.floor(Math.random() * 30) + 70,
        status: 'prospect',
        notes: '',
        addedDate: new Date().toISOString().split('T')[0]
      };
      
      setOpportunities([newOpp, ...opportunities]);
      setNewProspect('');
      setLoading(false);
    }, 1000);
  };

  const updateStatus = (id: string, status: BacklinkOpportunity['status']) => {
    setOpportunities(opportunities.map(opp =>
      opp.id === id ? { ...opp, status } : opp
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'secured':
        return 'bg-green-500/20 text-green-400';
      case 'outreach':
        return 'bg-blue-500/20 text-blue-400';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'prospect':
        return 'bg-purple-500/20 text-purple-400';
      case 'declined':
        return 'bg-red-500/20 text-red-400';
      case 'active':
        return 'bg-green-500/20 text-green-400';
      case 'lost':
        return 'bg-red-500/20 text-red-400';
      case 'broken':
        return 'bg-yellow-500/20 text-yellow-400';
      default:
        return 'bg-white/10 text-white/60';
    }
  };

  const getLinkTypeColor = (type: string) => {
    return type === 'dofollow' 
      ? 'bg-green-500/20 text-green-400' 
      : 'bg-gray-500/20 text-gray-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[20px] font-bold text-white mb-1">Link Building Hub</h2>
          <p className="text-[13px] text-white/60">
            {opportunities.length} prospects · {backlinks.length} active backlinks · {opportunities.filter(o => o.status === 'secured').length} secured
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </button>
          <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg font-semibold transition-colors flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Scan for Links
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Link className="w-5 h-5 text-green-400" />
            <div className="text-[13px] text-white/60">Total Backlinks</div>
          </div>
          <div className="text-[28px] font-bold text-white">12,345</div>
          <div className="text-[12px] text-green-400">+52 this month</div>
        </div>

        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <div className="text-[13px] text-white/60">Referring Domains</div>
          </div>
          <div className="text-[28px] font-bold text-white">3,421</div>
          <div className="text-[12px] text-blue-400">+18 this month</div>
        </div>

        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-purple-400" />
            <div className="text-[13px] text-white/60">DoFollow Links</div>
          </div>
          <div className="text-[28px] font-bold text-white">9,234</div>
          <div className="text-[12px] text-purple-400">74.8% of total</div>
        </div>

        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-5 h-5 text-yellow-400" />
            <div className="text-[13px] text-white/60">Avg Domain Authority</div>
          </div>
          <div className="text-[28px] font-bold text-white">67</div>
          <div className="text-[12px] text-yellow-400">High quality</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-white/10">
        <button
          onClick={() => setActiveTab('opportunities')}
          className={`px-4 py-3 text-[14px] font-medium transition-all ${
            activeTab === 'opportunities'
              ? 'text-white border-b-2 border-yellow-500'
              : 'text-white/60 hover:text-white'
          }`}
        >
          Opportunities ({opportunities.length})
        </button>
        <button
          onClick={() => setActiveTab('backlinks')}
          className={`px-4 py-3 text-[14px] font-medium transition-all ${
            activeTab === 'backlinks'
              ? 'text-white border-b-2 border-yellow-500'
              : 'text-white/60 hover:text-white'
          }`}
        >
          Active Backlinks ({backlinks.length})
        </button>
        <button
          onClick={() => setActiveTab('outreach')}
          className={`px-4 py-3 text-[14px] font-medium transition-all ${
            activeTab === 'outreach'
              ? 'text-white border-b-2 border-yellow-500'
              : 'text-white/60 hover:text-white'
          }`}
        >
          Outreach Campaigns
        </button>
      </div>

      {/* Opportunities Tab */}
      {activeTab === 'opportunities' && (
        <div className="space-y-4">
          {/* Add New Prospect */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={newProspect}
                onChange={(e) => setNewProspect(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addProspect()}
                placeholder="Enter domain (e.g., example.com)"
                className="flex-1 bg-black border border-white/10 rounded-lg px-4 py-2 text-white text-[14px] focus:border-yellow-500 focus:outline-none"
              />
              <button
                onClick={addProspect}
                disabled={loading || !newProspect.trim()}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Add Prospect
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Opportunities List */}
          {opportunities.map((opp) => (
            <div key={opp.id} className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 hover:border-yellow-500/30 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Link className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <a
                      href={`https://${opp.domain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[16px] font-bold text-white hover:text-yellow-400 flex items-center gap-2"
                    >
                      {opp.domain}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[13px] text-white/60">
                        DA: <span className="text-white font-bold">{opp.domainAuthority}</span>
                      </span>
                      <span className="text-[13px] text-white/60">
                        Relevance: <span className="text-white font-bold">{opp.relevanceScore}%</span>
                      </span>
                      <span className="text-[13px] text-white/60">
                        Added: {opp.addedDate}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-[12px] font-bold ${getStatusColor(opp.status)}`}>
                    {opp.status.toUpperCase()}
                  </span>
                </div>
              </div>

              {opp.contactEmail && (
                <div className="flex items-center gap-2 mb-3 text-[14px] text-white/60">
                  <Mail className="w-4 h-4" />
                  {opp.contactEmail}
                </div>
              )}

              {opp.notes && (
                <div className="bg-black/30 rounded-lg p-3 mb-4">
                  <div className="text-[13px] text-white/70">{opp.notes}</div>
                </div>
              )}

              <div className="flex gap-2">
                <select
                  value={opp.status}
                  onChange={(e) => updateStatus(opp.id, e.target.value as any)}
                  className="px-3 py-1 bg-black border border-white/10 text-white text-[12px] rounded"
                >
                  <option value="prospect">Prospect</option>
                  <option value="outreach">Outreach</option>
                  <option value="pending">Pending</option>
                  <option value="secured">Secured</option>
                  <option value="declined">Declined</option>
                </select>
                <button className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-[12px] rounded transition-colors">
                  Send Email
                </button>
                <button className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-[12px] rounded transition-colors">
                  Add Notes
                </button>
                <button className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-[12px] rounded transition-colors">
                  Check Status
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Backlinks Tab */}
      {activeTab === 'backlinks' && (
        <div className="space-y-4">
          {backlinks.map((link) => (
            <div key={link.id} className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 hover:border-yellow-500/30 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <a
                    href={link.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[16px] font-bold text-white hover:text-yellow-400 flex items-center gap-2 mb-2"
                  >
                    {link.sourceDomain}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${getLinkTypeColor(link.type)}`}>
                      {link.type.toUpperCase()}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${getStatusColor(link.status)}`}>
                      {link.status.toUpperCase()}
                    </span>
                    <span className="text-[13px] text-white/60">
                      DA: <span className="text-white font-bold">{link.domainAuthority}</span>
                    </span>
                    <span className="text-[13px] text-white/60">
                      Found: {link.foundDate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-black/30 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-[12px] text-white/60 mb-1">Anchor Text:</div>
                    <div className="text-[14px] text-white font-medium">{link.anchorText}</div>
                  </div>
                  <div>
                    <div className="text-[12px] text-white/60 mb-1">Target URL:</div>
                    <div className="text-[14px] text-blue-400 truncate">{link.targetUrl}</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-[12px] rounded transition-colors">
                  Check Link
                </button>
                <button className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-[12px] rounded transition-colors">
                  View Source Page
                </button>
                <button className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-[12px] rounded transition-colors">
                  Monitor Changes
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Outreach Tab */}
      {activeTab === 'outreach' && (
        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-12 text-center">
          <Mail className="w-12 h-12 text-white/40 mx-auto mb-4" />
          <h3 className="text-[16px] font-bold text-white mb-2">Outreach Campaigns</h3>
          <p className="text-[14px] text-white/60 mb-6">
            Automated email outreach campaigns coming soon
          </p>
          <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg font-semibold transition-colors">
            Create Campaign
          </button>
        </div>
      )}
    </div>
  );
}
