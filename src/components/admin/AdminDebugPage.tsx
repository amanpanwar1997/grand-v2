import { useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

export function AdminDebugPage() {
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const tests = [
    {
      name: 'Health Check',
      url: `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/health`,
      method: 'GET',
      expected: '{"status":"ok"}',
    },
    {
      name: 'Get All Pages',
      url: `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/seo-system/pages/all`,
      method: 'GET',
      expected: 'JSON with pages array',
    },
    {
      name: 'Get All Users',
      url: `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/users/all`,
      method: 'GET',
      expected: 'JSON with users array',
    },
    {
      name: 'Get Settings',
      url: `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/settings/get`,
      method: 'GET',
      expected: 'JSON with settings',
    },
    {
      name: 'Get Media',
      url: `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/media/all`,
      method: 'GET',
      expected: 'JSON with media files',
    },
    {
      name: 'Get Chatbot Leads',
      url: `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/chatbot/leads`,
      method: 'GET',
      expected: 'JSON with leads',
    },
  ];

  const runTests = async () => {
    setTesting(true);
    setResults([]);
    const testResults = [];

    for (const test of tests) {
      try {
        const startTime = Date.now();
        const response = await fetch(test.url, {
          method: test.method,
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        });

        const endTime = Date.now();
        const duration = endTime - startTime;

        let data;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          data = await response.json();
        } else {
          data = await response.text();
        }

        testResults.push({
          name: test.name,
          url: test.url,
          status: response.status,
          ok: response.ok,
          duration: `${duration}ms`,
          response: JSON.stringify(data, null, 2),
          error: null,
        });
      } catch (error: any) {
        testResults.push({
          name: test.name,
          url: test.url,
          status: 0,
          ok: false,
          duration: 'N/A',
          response: null,
          error: error.message,
        });
      }
    }

    setResults(testResults);
    setTesting(false);
  };

  const getStatusIcon = (result: any) => {
    if (result.ok) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    } else if (result.error) {
      return <XCircle className="w-5 h-5 text-red-500" />;
    } else {
      return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (result: any) => {
    if (result.ok) return 'border-green-500/30 bg-green-500/5';
    if (result.error) return 'border-red-500/30 bg-red-500/5';
    return 'border-yellow-500/30 bg-yellow-500/5';
  };

  return (
    <AdminLayout
      title="🔍 Debug & Diagnostics"
      breadcrumb={[
        { label: 'Dashboard', href: '/admin' },
        { label: 'Debug' },
      ]}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="glass p-6 rounded-xl border border-white/10 mb-6">
          <h2 className="text-[22px] font-bold text-white mb-2">
            Backend Connection Test
          </h2>
          <p className="text-[15px] text-white/60 mb-4">
            Test all critical API endpoints to diagnose connection issues
          </p>
          
          <button
            onClick={runTests}
            disabled={testing}
            className="inline-flex items-center gap-2 bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold text-[15px] hover:bg-yellow-400 transition-colors disabled:opacity-50"
          >
            {testing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Testing...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                Run All Tests
              </>
            )}
          </button>
        </div>

        {/* Configuration Info */}
        <div className="glass p-6 rounded-xl border border-white/10 mb-6">
          <h3 className="text-[18px] font-semibold text-white mb-4">
            Configuration
          </h3>
          <div className="space-y-2 text-[14px]">
            <div className="flex justify-between">
              <span className="text-white/60">Project ID:</span>
              <code className="text-yellow-500 font-mono">{projectId}</code>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Base URL:</span>
              <code className="text-yellow-500 font-mono text-[12px]">
                https://{projectId}.supabase.co/functions/v1/make-server-9c8e64e4
              </code>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Auth Token:</span>
              <code className="text-yellow-500 font-mono text-[12px]">
                {publicAnonKey.substring(0, 20)}...
              </code>
            </div>
          </div>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-[18px] font-semibold text-white">
              Test Results ({results.filter(r => r.ok).length}/{results.length} passed)
            </h3>

            {results.map((result, index) => (
              <div
                key={index}
                className={`glass p-6 rounded-xl border ${getStatusColor(result)}`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(result)}
                    <div>
                      <h4 className="text-[16px] font-semibold text-white">
                        {result.name}
                      </h4>
                      <code className="text-[12px] text-white/60 font-mono">
                        {result.url}
                      </code>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[14px] font-semibold">
                      {result.ok ? (
                        <span className="text-green-500">✓ {result.status}</span>
                      ) : result.error ? (
                        <span className="text-red-500">✗ ERROR</span>
                      ) : (
                        <span className="text-yellow-500">⚠ {result.status}</span>
                      )}
                    </div>
                    <div className="text-[12px] text-white/60">{result.duration}</div>
                  </div>
                </div>

                {/* Error */}
                {result.error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
                    <div className="text-[13px] font-semibold text-red-400 mb-2">
                      Error:
                    </div>
                    <code className="text-[12px] text-red-300 font-mono">
                      {result.error}
                    </code>
                  </div>
                )}

                {/* Response */}
                {result.response && (
                  <div className="bg-black/30 rounded-lg p-4 overflow-auto max-h-60">
                    <div className="text-[13px] font-semibold text-white/60 mb-2">
                      Response:
                    </div>
                    <pre className="text-[11px] text-white/80 font-mono whitespace-pre-wrap">
                      {result.response}
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Troubleshooting Guide */}
        <div className="glass p-6 rounded-xl border border-white/10 mt-6">
          <h3 className="text-[18px] font-semibold text-white mb-4">
            🔥 Common Issues & Solutions
          </h3>
          
          <div className="space-y-4 text-[14px]">
            <div>
              <div className="font-semibold text-white mb-1">
                ❌ Health Check Fails
              </div>
              <div className="text-white/60 mb-2">
                Backend is not deployed to Supabase
              </div>
              <code className="block bg-black/50 p-3 rounded text-yellow-500 font-mono text-[12px]">
                supabase functions deploy make-server-9c8e64e4
              </code>
            </div>

            <div>
              <div className="font-semibold text-white mb-1">
                ⚠️ Status 404
              </div>
              <div className="text-white/60">
                Endpoint doesn't exist or route is wrong
              </div>
            </div>

            <div>
              <div className="font-semibold text-white mb-1">
                ⚠️ CORS Error
              </div>
              <div className="text-white/60">
                CORS not configured properly in backend
              </div>
            </div>

            <div>
              <div className="font-semibold text-white mb-1">
                ⚠️ Network Error
              </div>
              <div className="text-white/60">
                Can't connect to Supabase (check internet or Supabase status)
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
