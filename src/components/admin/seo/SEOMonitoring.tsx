import { useState, useEffect } from 'react';
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle, 
  Eye,
  Search,
  Link,
  Zap,
  Clock,
  Bell,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';

interface Metric {
  name: string;
  value: number;
  change: number;
  status: 'good' | 'warning' | 'critical';
  trend: number[];
  unit?: string;
}

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  timestamp: string;
  resolved: boolean;
}

/**
 * SEO Monitoring Panel
 * Real-time SEO health monitoring and alerts
 */
export function SEOMonitoring() {
  const [metrics, setMetrics] = useState<Metric[]>([
    {
      name: 'Organic Traffic',
      value: 245000,
      change: 12.5,
      status: 'good',
      trend: [220000, 225000, 230000, 235000, 240000, 245000],
      unit: 'visits'
    },
    {
      name: 'Average Position',
      value: 8.2,
      change: -1.3,
      status: 'good',
      trend: [10.5, 9.8, 9.2, 8.8, 8.5, 8.2]
    },
    {
      name: 'Click-Through Rate',
      value: 3.8,
      change: 0.4,
      status: 'warning',
      trend: [3.2, 3.3, 3.5, 3.6, 3.7, 3.8],
      unit: '%'
    },
    {
      name: 'Indexed Pages',
      value: 268,
      change: 2,
      status: 'good',
      trend: [260, 262, 264, 266, 267, 268],
      unit: 'pages'
    },
    {
      name: 'Core Web Vitals',
      value: 92,
      change: -3,
      status: 'good',
      trend: [88, 90, 91, 93, 94, 92],
      unit: 'score'
    },
    {
      name: 'Backlinks',
      value: 12300,
      change: 5.2,
      status: 'good',
      trend: [11500, 11700, 11900, 12000, 12150, 12300],
      unit: 'links'
    },
    {
      name: 'Domain Authority',
      value: 72,
      change: 1,
      status: 'good',
      trend: [68, 69, 70, 71, 71, 72]
    },
    {
      name: 'Page Speed',
      value: 89,
      change: 2,
      status: 'good',
      trend: [83, 85, 86, 87, 88, 89],
      unit: 'score'
    }
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'warning',
      title: 'CTR Below Industry Average',
      description: 'Your click-through rate (3.8%) is below the industry average of 4.2%',
      timestamp: '2 hours ago',
      resolved: false
    },
    {
      id: '2',
      type: 'info',
      title: 'New Backlinks Detected',
      description: '23 new high-quality backlinks detected in the last 24 hours',
      timestamp: '5 hours ago',
      resolved: false
    },
    {
      id: '3',
      type: 'critical',
      title: '6 Pages De-indexed',
      description: 'Google removed 6 pages from index. Check for technical issues.',
      timestamp: '1 day ago',
      resolved: false
    }
  ]);

  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const refresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setLastUpdate(new Date());
      alert('✅ Data refreshed successfully!');
    }, 2000);
  };

  const resolveAlert = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, resolved: true } : alert
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-green-400 bg-green-500/20';
      case 'warning':
        return 'text-yellow-400 bg-yellow-500/20';
      case 'critical':
        return 'text-red-400 bg-red-500/20';
      default:
        return 'text-white/60 bg-white/10';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'border-red-500/30 bg-red-500/10';
      case 'warning':
        return 'border-yellow-500/30 bg-yellow-500/10';
      case 'info':
        return 'border-blue-500/30 bg-blue-500/10';
      default:
        return 'border-white/10';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      case 'info':
        return <CheckCircle className="w-5 h-5 text-blue-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-white/60" />;
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[20px] font-bold text-white mb-1">Real-Time SEO Monitoring</h2>
          <p className="text-[13px] text-white/60">
            Live monitoring · {alerts.filter(a => !a.resolved).length} active alerts · Updated {formatTime(lastUpdate)}
          </p>
        </div>
        <button
          onClick={refresh}
          disabled={refreshing}
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg font-semibold transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>

      {/* Overall Health */}
      <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/30 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-white">SEO Health Score</h3>
                <p className="text-[13px] text-white/60">Overall website performance</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[48px] font-bold text-green-400">92</div>
            <div className="flex items-center gap-1 text-[14px] text-green-400">
              <ArrowUp className="w-4 h-4" />
              +3 this month
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => (
          <div key={idx} className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4 hover:border-yellow-500/30 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[13px] text-white/60">{metric.name}</div>
              <div className={`px-2 py-0.5 rounded text-[10px] font-bold ${getStatusColor(metric.status)}`}>
                {metric.status.toUpperCase()}
              </div>
            </div>

            <div className="flex items-baseline gap-2 mb-2">
              <div className="text-[24px] font-bold text-white">
                {metric.value >= 1000 ? formatNumber(metric.value) : metric.value}
              </div>
              {metric.unit && (
                <div className="text-[13px] text-white/40">{metric.unit}</div>
              )}
            </div>

            <div className="flex items-center gap-1 text-[12px]">
              {metric.change > 0 ? (
                <>
                  <ArrowUp className="w-3 h-3 text-green-400" />
                  <span className="text-green-400">+{metric.change}%</span>
                </>
              ) : metric.change < 0 ? (
                <>
                  <ArrowDown className="w-3 h-3 text-red-400" />
                  <span className="text-red-400">{metric.change}%</span>
                </>
              ) : (
                <>
                  <Minus className="w-3 h-3 text-white/40" />
                  <span className="text-white/40">0%</span>
                </>
              )}
              <span className="text-white/40 ml-1">vs last month</span>
            </div>

            {/* Mini Trend Chart */}
            <div className="mt-3 flex items-end gap-1 h-8">
              {metric.trend.map((value, i) => {
                const maxValue = Math.max(...metric.trend);
                const height = (value / maxValue) * 100;
                return (
                  <div
                    key={i}
                    className="flex-1 bg-white/10 rounded-t"
                    style={{ height: `${height}%` }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Active Alerts */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-yellow-400" />
            <h3 className="text-[16px] font-bold text-white">Active Alerts</h3>
            <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-[12px] font-bold rounded">
              {alerts.filter(a => !a.resolved).length}
            </span>
          </div>
          <button className="text-[13px] text-white/60 hover:text-white transition-colors">
            View All
          </button>
        </div>

        <div className="space-y-3">
          {alerts.filter(a => !a.resolved).map((alert) => (
            <div key={alert.id} className={`border rounded-lg p-4 ${getAlertColor(alert.type)}`}>
              <div className="flex items-start gap-3">
                {getAlertIcon(alert.type)}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-[14px] font-bold text-white">{alert.title}</h4>
                    <span className="text-[12px] text-white/40">{alert.timestamp}</span>
                  </div>
                  <p className="text-[13px] text-white/70 mb-3">{alert.description}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => resolveAlert(alert.id)}
                      className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-[12px] rounded transition-colors"
                    >
                      Mark as Resolved
                    </button>
                    <button className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-[12px] rounded transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {alerts.filter(a => !a.resolved).length === 0 && (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <p className="text-[14px] text-white/60">No active alerts. Everything looks good!</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Eye className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-[13px] text-white/60">Today's Traffic</div>
              <div className="text-[24px] font-bold text-white">8,234</div>
            </div>
          </div>
          <div className="text-[13px] text-white/60">
            <span className="text-green-400">+18%</span> vs yesterday
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Search className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="text-[13px] text-white/60">Ranking Keywords</div>
              <div className="text-[24px] font-bold text-white">18,542</div>
            </div>
          </div>
          <div className="text-[13px] text-white/60">
            <span className="text-green-400">+127</span> new this week
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <Link className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="text-[13px] text-white/60">Quality Backlinks</div>
              <div className="text-[24px] font-bold text-white">12,345</div>
            </div>
          </div>
          <div className="text-[13px] text-white/60">
            <span className="text-green-400">+52</span> this month
          </div>
        </div>
      </div>

      {/* Monitoring Schedule */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-5 h-5 text-white/60" />
          <h3 className="text-[16px] font-bold text-white">Automated Monitoring Schedule</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[14px] text-white">Keyword Rankings</span>
              <span className="text-[12px] text-green-400">✓ Active</span>
            </div>
            <div className="text-[13px] text-white/60">Every 6 hours</div>
          </div>

          <div className="bg-black/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[14px] text-white">Backlink Monitoring</span>
              <span className="text-[12px] text-green-400">✓ Active</span>
            </div>
            <div className="text-[13px] text-white/60">Daily at 2:00 AM</div>
          </div>

          <div className="bg-black/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[14px] text-white">Site Health Check</span>
              <span className="text-[12px] text-green-400">✓ Active</span>
            </div>
            <div className="text-[13px] text-white/60">Every hour</div>
          </div>

          <div className="bg-black/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[14px] text-white">Competitor Tracking</span>
              <span className="text-[12px] text-green-400">✓ Active</span>
            </div>
            <div className="text-[13px] text-white/60">Daily at 8:00 AM</div>
          </div>
        </div>
      </div>
    </div>
  );
}
