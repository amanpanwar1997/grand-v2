import { useState, useEffect } from 'react';
import { AdminLayout } from './AdminLayout';
import { useAdminAuth } from '../../utils/adminAuth';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import {
  Users,
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Eye,
  X,
  FileText,
  ExternalLink,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react';

export function AdminLeadsPage() {
  const { hasPermission } = useAdminAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'new' | 'contacted' | 'converted'>('all');
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load real leads from backend
  useEffect(() => {
    const loadLeads = async () => {
      try {
        setLoading(true);
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
            setLeads(sortedLeads);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading leads:', error);
        setLoading(false);
      }
    };

    loadLeads();
    
    // Refresh every 30 seconds
    const interval = setInterval(loadLeads, 30000);
    return () => clearInterval(interval);
  }, []);

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || lead.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new' || !l.status).length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    converted: leads.filter(l => l.status === 'converted').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-green-500/20 text-green-500';
      case 'contacted':
        return 'bg-blue-500/20 text-blue-500';
      case 'converted':
        return 'bg-yellow-500/20 text-yellow-500';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <AlertCircle className="w-3.5 h-3.5" />;
      case 'contacted':
        return <Clock className="w-3.5 h-3.5" />;
      case 'converted':
        return <CheckCircle className="w-3.5 h-3.5" />;
      default:
        return <Clock className="w-3.5 h-3.5" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Phone', 'Email', 'Service', 'Status', 'Date'];
    const rows = filteredLeads.map(lead => [
      lead.name || 'N/A',
      lead.phone || 'N/A',
      lead.email || 'N/A',
      lead.service || 'N/A',
      lead.status || 'new',
      lead.createdAt || 'N/A',
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <AdminLayout
      title="Leads"
      breadcrumb={[
        { label: 'Dashboard', href: '/admin' },
        { label: 'Leads' },
      ]}
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="glass p-6 rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-blue-500" />
            <span className="text-[13px] text-white/60">Total Leads</span>
          </div>
          <p className="text-[30px] font-bold text-white">{stats.total}</p>
        </div>

        <div className="glass p-6 rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-5 h-5 text-green-500" />
            <span className="text-[13px] text-white/60">New</span>
          </div>
          <p className="text-[30px] font-bold text-white">{stats.new}</p>
        </div>

        <div className="glass p-6 rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <span className="text-[13px] text-white/60">Contacted</span>
          </div>
          <p className="text-[30px] font-bold text-white">{stats.contacted}</p>
        </div>

        <div className="glass p-6 rounded-xl border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-yellow-500" />
            <span className="text-[13px] text-white/60">Converted</span>
          </div>
          <p className="text-[30px] font-bold text-white">{stats.converted}</p>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[26px] md:text-[30px] font-medium text-white mb-2">Leads</h1>
          <p className="text-[15px] text-white/70">
            Manage all {leads.length} leads from your website
          </p>
        </div>

        <button
          onClick={exportToCSV}
          className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold text-[15px] transition-colors"
        >
          <Download className="w-5 h-5" />
          Export CSV
        </button>
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
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search leads by name, phone, or email..."
              className="w-full bg-black/50 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-white/40" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white focus:outline-none focus:border-yellow-500 transition-colors"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="converted">Converted</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      {loading ? (
        <div className="glass p-12 rounded-xl border border-white/10 text-center">
          <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[15px] text-white/70">Loading leads...</p>
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="glass p-12 rounded-xl border border-white/10 text-center">
          <Users className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <h3 className="text-[18px] font-medium text-white mb-2">
            {searchQuery || filterStatus !== 'all' ? 'No leads found' : 'No leads yet'}
          </h3>
          <p className="text-[14px] text-white/60">
            {searchQuery || filterStatus !== 'all'
              ? 'Try adjusting your filters'
              : 'Leads from the chatbot will appear here'}
          </p>
        </div>
      ) : (
        <div className="glass rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/30 border-b border-white/10">
                <tr>
                  <th className="text-left p-4 text-[13px] font-semibold text-white/70">LEAD</th>
                  <th className="text-left p-4 text-[13px] font-semibold text-white/70">CONTACT</th>
                  <th className="text-left p-4 text-[13px] font-semibold text-white/70">SERVICE</th>
                  <th className="text-left p-4 text-[13px] font-semibold text-white/70">STATUS</th>
                  <th className="text-left p-4 text-[13px] font-semibold text-white/70">DATE</th>
                  <th className="text-center p-4 text-[13px] font-semibold text-white/70">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-white/10 hover:bg-white/5 transition-colors"
                  >
                    {/* Lead Info */}
                    <td className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                          <Users className="w-5 h-5 text-yellow-500" />
                        </div>
                        <div>
                          <div className="text-[15px] font-medium text-white mb-0.5">
                            {lead.name || 'Anonymous'}
                          </div>
                          <div className="text-[13px] text-white/60">{lead.id}</div>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[14px] text-white">
                          <Phone className="w-3.5 h-3.5 text-white/40" />
                          {lead.phone || 'N/A'}
                        </div>
                        {lead.email && (
                          <div className="flex items-center gap-2 text-[13px] text-white/70">
                            <Mail className="w-3.5 h-3.5 text-white/40" />
                            {lead.email}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Service */}
                    <td className="p-4">
                      <div className="text-[14px] text-white">
                        {lead.service || 'General Inquiry'}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[13px] font-medium ${getStatusColor(
                          lead.status || 'new'
                        )}`}
                      >
                        {getStatusIcon(lead.status || 'new')}
                        {lead.status || 'new'}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-[14px] text-white/70">
                        <Calendar className="w-3.5 h-3.5 text-white/40" />
                        {formatDate(lead.createdAt)}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {lead.phone && (
                          <a
                            href={`tel:${lead.phone}`}
                            className="p-2 text-white/60 hover:text-green-500 hover:bg-green-500/10 rounded-lg transition-all"
                            title="Call"
                          >
                            <Phone className="w-4 h-4" />
                          </a>
                        )}
                        {lead.email && (
                          <a
                            href={`mailto:${lead.email}`}
                            className="p-2 text-white/60 hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-all"
                            title="Email"
                          >
                            <Mail className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/10 flex items-center justify-between">
            <div className="text-[14px] text-white/60">
              Showing {filteredLeads.length} of {leads.length} leads
            </div>
          </div>
        </div>
      )}

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass p-8 rounded-2xl border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[24px] font-bold text-white">Lead Details</h2>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-[18px] font-semibold text-white mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] text-white/60 mb-1">Name</label>
                    <p className="text-[15px] text-white">{selectedLead.name || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-[13px] text-white/60 mb-1">Phone</label>
                    <p className="text-[15px] text-white">{selectedLead.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-[13px] text-white/60 mb-1">Email</label>
                    <p className="text-[15px] text-white">{selectedLead.email || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-[13px] text-white/60 mb-1">Service Interest</label>
                    <p className="text-[15px] text-white">{selectedLead.service || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div>
                <h3 className="text-[18px] font-semibold text-white mb-4">Additional Details</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[13px] text-white/60 mb-1">Status</label>
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[13px] font-medium ${getStatusColor(
                        selectedLead.status || 'new'
                      )}`}
                    >
                      {getStatusIcon(selectedLead.status || 'new')}
                      {selectedLead.status || 'new'}
                    </span>
                  </div>
                  <div>
                    <label className="block text-[13px] text-white/60 mb-1">Date Received</label>
                    <p className="text-[15px] text-white">{formatDate(selectedLead.createdAt)}</p>
                  </div>
                  <div>
                    <label className="block text-[13px] text-white/60 mb-1">Lead ID</label>
                    <p className="text-[15px] text-white font-mono">{selectedLead.id}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                {selectedLead.phone && (
                  <a
                    href={`tel:${selectedLead.phone}`}
                    className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold text-[15px] hover:bg-green-400 transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    Call Now
                  </a>
                )}
                {selectedLead.email && (
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold text-[15px] hover:bg-blue-400 transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    Send Email
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
