/**
 * ============================================================================
 * ACTIVITY LOG COMPONENT
 * ============================================================================
 * 
 * Universal activity logging for all admin actions
 * 
 * Features:
 * - Real-time activity feed
 * - Filterable by action type
 * - User attribution
 * - Timestamp tracking
 * - Detailed action data
 */

import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { 
  Activity,
  User,
  Clock,
  Filter,
  Search,
  Eye,
  Trash2,
  Edit,
  Plus,
  Save,
  Upload,
  Download,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';

interface ActivityLogEntry {
  id: string;
  userId: string;
  userName: string;
  action: string;
  module: string;
  details: string;
  timestamp: string;
  ip?: string;
  userAgent?: string;
}

interface ActivityLogProps {
  module?: string;
  limit?: number;
  showFilter?: boolean;
}

export function ActivityLog({ module, limit = 50, showFilter = true }: ActivityLogProps) {
  const [activities, setActivities] = useState<ActivityLogEntry[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<ActivityLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAction, setFilterAction] = useState('all');
  const [filterModule, setFilterModule] = useState(module || 'all');

  useEffect(() => {
    loadActivities();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadActivities, 30000);
    return () => clearInterval(interval);
  }, [module, limit]);

  useEffect(() => {
    applyFilters();
  }, [activities, searchQuery, filterAction, filterModule]);

  const loadActivities = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (module) params.append('module', module);
      params.append('limit', limit.toString());

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/activity-log/get?${params}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      const result = await response.json();

      if (result.success && result.activities) {
        setActivities(result.activities);
      }
    } catch (error) {
      console.error('Error loading activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...activities];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(a =>
        a.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.module.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Action filter
    if (filterAction !== 'all') {
      filtered = filtered.filter(a => a.action === filterAction);
    }

    // Module filter
    if (filterModule !== 'all') {
      filtered = filtered.filter(a => a.module === filterModule);
    }

    setFilteredActivities(filtered);
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'create': return <Plus className="w-4 h-4 text-green-500" />;
      case 'update': return <Edit className="w-4 h-4 text-blue-500" />;
      case 'delete': return <Trash2 className="w-4 h-4 text-red-500" />;
      case 'view': return <Eye className="w-4 h-4 text-purple-500" />;
      case 'upload': return <Upload className="w-4 h-4 text-yellow-500" />;
      case 'download': return <Download className="w-4 h-4 text-cyan-500" />;
      case 'login': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'logout': return <AlertCircle className="w-4 h-4 text-orange-500" />;
      default: return <Activity className="w-4 h-4 text-white/60" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create': return 'bg-green-500/20 text-green-500 border-green-500/50';
      case 'update': return 'bg-blue-500/20 text-blue-500 border-blue-500/50';
      case 'delete': return 'bg-red-500/20 text-red-500 border-red-500/50';
      case 'view': return 'bg-purple-500/20 text-purple-500 border-purple-500/50';
      case 'upload': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50';
      case 'download': return 'bg-cyan-500/20 text-cyan-500 border-cyan-500/50';
      case 'login': return 'bg-green-500/20 text-green-500 border-green-500/50';
      case 'logout': return 'bg-orange-500/20 text-orange-500 border-orange-500/50';
      default: return 'bg-white/10 text-white/60 border-white/20';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="w-6 h-6 text-yellow-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-yellow-500" />
          <h3 className="text-[18px] font-bold text-white">Activity Log</h3>
          <span className="text-[13px] text-white/60">
            ({filteredActivities.length} {filteredActivities.length === 1 ? 'entry' : 'entries'})
          </span>
        </div>
        <button
          onClick={loadActivities}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          title="Refresh"
        >
          <RefreshCw className="w-4 h-4 text-white/60" />
        </button>
      </div>

      {/* Filters */}
      {showFilter && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search activities..."
              className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-[14px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500"
            />
          </div>

          {/* Action Filter */}
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-[14px] text-white focus:outline-none focus:border-yellow-500"
          >
            <option value="all">All Actions</option>
            <option value="create">Create</option>
            <option value="update">Update</option>
            <option value="delete">Delete</option>
            <option value="view">View</option>
            <option value="upload">Upload</option>
            <option value="download">Download</option>
            <option value="login">Login</option>
            <option value="logout">Logout</option>
          </select>

          {/* Module Filter */}
          {!module && (
            <select
              value={filterModule}
              onChange={(e) => setFilterModule(e.target.value)}
              className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-[14px] text-white focus:outline-none focus:border-yellow-500"
            >
              <option value="all">All Modules</option>
              <option value="pages">Pages</option>
              <option value="seo">SEO</option>
              <option value="media">Media</option>
              <option value="users">Users</option>
              <option value="settings">Settings</option>
              <option value="auth">Authentication</option>
            </select>
          )}
        </div>
      )}

      {/* Activity List */}
      {filteredActivities.length === 0 ? (
        <div className="text-center py-12 glass rounded-xl border border-white/10">
          <Info className="w-12 h-12 text-white/40 mx-auto mb-3" />
          <p className="text-[15px] text-white/60">
            {searchQuery || filterAction !== 'all' || filterModule !== 'all'
              ? 'No activities match your filters'
              : 'No activities recorded yet'}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="glass p-4 rounded-lg border border-white/10 hover:border-yellow-500/50 transition-all"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="flex-shrink-0 mt-0.5">
                  {getActionIcon(activity.action)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-[11px] font-semibold border ${getActionColor(activity.action)}`}>
                      {activity.action.toUpperCase()}
                    </span>
                    <span className="text-[13px] text-white/60">{activity.module}</span>
                  </div>
                  <p className="text-[14px] text-white mb-1">
                    <span className="font-medium">{activity.userName}</span> {activity.details}
                  </p>
                  <div className="flex items-center gap-3 text-[12px] text-white/50">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTimestamp(activity.timestamp)}
                    </div>
                    {activity.ip && (
                      <div>IP: {activity.ip}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Utility function to log activities from anywhere in the app
 */
export async function logActivity(
  action: string,
  module: string,
  details: string,
  userId?: string,
  userName?: string
) {
  try {
    // Get user from localStorage if not provided
    const storedUser = localStorage.getItem('adminUser');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const activityData = {
      userId: userId || user?.id || 'system',
      userName: userName || user?.name || 'System',
      action,
      module,
      details,
      timestamp: new Date().toISOString(),
      ip: null, // Backend will set this
      userAgent: navigator.userAgent
    };

    await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/activity-log/create`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(activityData)
      }
    );
  } catch (error) {
    console.error('Error logging activity:', error);
    // Don't throw - logging failures shouldn't break the app
  }
}
