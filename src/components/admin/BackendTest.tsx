/**
 * BACKEND CONNECTIVITY TEST
 * Quick visual test to check if backend is responding
 */

import { useState } from 'react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { CheckCircle, XCircle, Loader2, RefreshCw } from 'lucide-react';

export function BackendTest() {
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState<any>(null);

  const runTests = async () => {
    setTesting(true);
    const testResults: any = {
      timestamp: new Date().toISOString(),
      tests: []
    };

    // Test 1: Health Check
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/health`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      const data = await response.json();
      testResults.tests.push({
        name: 'Health Check',
        endpoint: '/health',
        status: response.ok && data.status === 'ok' ? 'pass' : 'fail',
        response: data
      });
    } catch (error: any) {
      testResults.tests.push({
        name: 'Health Check',
        endpoint: '/health',
        status: 'fail',
        error: error.message
      });
    }

    // Test 2: Global SEO
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/seo-system/global`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      const data = await response.json();
      testResults.tests.push({
        name: 'Global SEO',
        endpoint: '/seo-system/global',
        status: response.ok && data.success ? 'pass' : 'fail',
        response: data
      });
    } catch (error: any) {
      testResults.tests.push({
        name: 'Global SEO',
        endpoint: '/seo-system/global',
        status: 'fail',
        error: error.message
      });
    }

    // Test 3: Pages List
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/seo-system/pages/all`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      const data = await response.json();
      testResults.tests.push({
        name: 'Pages List',
        endpoint: '/seo-system/pages/all',
        status: response.ok && data.success ? 'pass' : 'fail',
        response: data
      });
    } catch (error: any) {
      testResults.tests.push({
        name: 'Pages List',
        endpoint: '/seo-system/pages/all',
        status: 'fail',
        error: error.message
      });
    }

    // Test 4: Users List
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/users/all`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      const data = await response.json();
      testResults.tests.push({
        name: 'Users List',
        endpoint: '/users/all',
        status: response.ok && data.success ? 'pass' : 'fail',
        response: data
      });
    } catch (error: any) {
      testResults.tests.push({
        name: 'Users List',
        endpoint: '/users/all',
        status: 'fail',
        error: error.message
      });
    }

    // Test 5: Settings
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/settings/get`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      const data = await response.json();
      testResults.tests.push({
        name: 'Settings',
        endpoint: '/settings/get',
        status: response.ok && data.success ? 'pass' : 'fail',
        response: data
      });
    } catch (error: any) {
      testResults.tests.push({
        name: 'Settings',
        endpoint: '/settings/get',
        status: 'fail',
        error: error.message
      });
    }

    const passedTests = testResults.tests.filter((t: any) => t.status === 'pass').length;
    const totalTests = testResults.tests.length;
    testResults.summary = {
      passed: passedTests,
      failed: totalTests - passedTests,
      total: totalTests,
      percentage: Math.round((passedTests / totalTests) * 100)
    };

    setResults(testResults);
    setTesting(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[30px] font-medium text-white mb-2">
            Backend Connectivity Test
          </h1>
          <p className="text-[15px] text-white/70">
            Test all backend endpoints to verify everything is working
          </p>
        </div>

        {/* Test Button */}
        <div className="mb-8">
          <button
            onClick={runTests}
            disabled={testing}
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg font-semibold transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {testing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Running Tests...
              </>
            ) : (
              <>
                <RefreshCw className="w-5 h-5" />
                Run Tests
              </>
            )}
          </button>
        </div>

        {/* Results */}
        {results && (
          <div className="space-y-6">
            {/* Summary */}
            <div className="glass p-6 rounded-xl border border-white/10">
              <h2 className="text-[22px] font-medium text-white mb-4">Test Summary</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="text-[30px] font-bold text-green-500 mb-1">
                    {results.summary.passed}
                  </div>
                  <div className="text-[13px] text-green-400">Passed</div>
                </div>
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="text-[30px] font-bold text-red-500 mb-1">
                    {results.summary.failed}
                  </div>
                  <div className="text-[13px] text-red-400">Failed</div>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                  <div className="text-[30px] font-bold text-white mb-1">
                    {results.summary.percentage}%
                  </div>
                  <div className="text-[13px] text-white/60">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Individual Tests */}
            <div className="space-y-3">
              <h2 className="text-[22px] font-medium text-white">Test Results</h2>
              {results.tests.map((test: any, idx: number) => (
                <div
                  key={idx}
                  className={`glass p-4 rounded-xl border-2 ${
                    test.status === 'pass'
                      ? 'border-green-500/20 bg-green-500/5'
                      : 'border-red-500/20 bg-red-500/5'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {test.status === 'pass' ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-500" />
                      )}
                      <div>
                        <h3 className="text-[16px] font-medium text-white">
                          {test.name}
                        </h3>
                        <p className="text-[13px] text-white/60 font-mono">
                          {test.endpoint}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-[12px] font-semibold ${
                        test.status === 'pass'
                          ? 'bg-green-500 text-black'
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      {test.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Response/Error */}
                  {test.response && (
                    <details className="mt-3">
                      <summary className="cursor-pointer text-[13px] text-white/70 hover:text-white">
                        View Response
                      </summary>
                      <pre className="mt-2 p-3 bg-black/50 rounded-lg text-[12px] text-white/80 overflow-auto">
                        {JSON.stringify(test.response, null, 2)}
                      </pre>
                    </details>
                  )}
                  {test.error && (
                    <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <p className="text-[13px] text-red-400 font-mono">
                        {test.error}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Diagnosis */}
            {results.summary.failed > 0 && (
              <div className="p-6 bg-red-500/10 border-2 border-red-500/20 rounded-xl">
                <h3 className="text-[18px] font-medium text-red-500 mb-3">
                  ⚠️ Backend Issues Detected
                </h3>
                <div className="space-y-2 text-[14px] text-white/80">
                  <p>• Backend server may not be running</p>
                  <p>• Check if Deno server is started</p>
                  <p>• Verify backend is accessible at port 8000</p>
                  <p>• Run: <code className="px-2 py-1 bg-black/50 rounded">./start-dev.sh</code></p>
                </div>
              </div>
            )}

            {results.summary.passed === results.summary.total && (
              <div className="p-6 bg-green-500/10 border-2 border-green-500/20 rounded-xl">
                <h3 className="text-[18px] font-medium text-green-500 mb-3">
                  ✅ All Systems Operational
                </h3>
                <p className="text-[14px] text-white/80">
                  Backend is running correctly. All admin panel features should work!
                </p>
              </div>
            )}
          </div>
        )}

        {/* Instructions */}
        {!results && (
          <div className="glass p-6 rounded-xl border border-white/10">
            <h2 className="text-[18px] font-medium text-white mb-3">
              How to Use This Test
            </h2>
            <ol className="space-y-2 text-[14px] text-white/70 list-decimal list-inside">
              <li>Start your backend server: <code className="px-2 py-1 bg-black/50 rounded">./start-dev.sh</code></li>
              <li>Click "Run Tests" button above</li>
              <li>Wait for all tests to complete</li>
              <li>Check which endpoints are passing/failing</li>
              <li>If all pass ✅ → Admin panel will work</li>
              <li>If any fail ❌ → Backend needs fixing</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
