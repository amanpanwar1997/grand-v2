import { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, Loader2, RefreshCw } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

export function BackendStatus() {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    checkBackend();
    // Check every 30 seconds
    const interval = setInterval(checkBackend, 30000);
    return () => clearInterval(interval);
  }, []);

  const checkBackend = async () => {
    setChecking(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/health`,
        {
          headers: { 
            'Authorization': `Bearer ${publicAnonKey}` 
          },
          signal: controller.signal
        }
      );
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const data = await response.json();
        if (data.status === 'ok') {
          setStatus('online');
        } else {
          setStatus('offline');
        }
      } else {
        setStatus('offline');
      }
    } catch (error) {
      console.error('Backend health check failed:', error);
      setStatus('offline');
    } finally {
      setChecking(false);
    }
  };

  if (status === 'checking' && !checking) {
    return null;
  }

  return (
    <div className={`fixed top-4 right-4 z-50 p-3 rounded-lg border backdrop-blur-sm shadow-lg ${
      status === 'online' 
        ? 'bg-green-500/10 border-green-500/30' 
        : status === 'checking'
        ? 'bg-yellow-500/10 border-yellow-500/30'
        : 'bg-red-500/10 border-red-500/30'
    }`}>
      <div className="flex items-center gap-3">
        {/* Status Icon */}
        {status === 'online' ? (
          <CheckCircle className="w-4 h-4 text-green-500" />
        ) : status === 'checking' ? (
          <Loader2 className="w-4 h-4 text-yellow-500 animate-spin" />
        ) : (
          <AlertTriangle className="w-4 h-4 text-red-500" />
        )}

        {/* Status Text */}
        <div className="flex flex-col">
          <span className={`text-[13px] font-medium ${
            status === 'online' 
              ? 'text-green-500' 
              : status === 'checking'
              ? 'text-yellow-500'
              : 'text-red-500'
          }`}>
            {status === 'online' 
              ? 'Backend Online' 
              : status === 'checking'
              ? 'Checking...'
              : 'Backend Offline'
            }
          </span>
          
          {/* Help Text for Offline */}
          {status === 'offline' && (
            <span className="text-[11px] text-red-400 mt-0.5">
              Start server: cd supabase/functions && deno run --allow-all server/index.tsx
            </span>
          )}
        </div>

        {/* Refresh Button */}
        <button
          onClick={checkBackend}
          disabled={checking}
          className={`p-1 rounded hover:bg-white/10 transition-colors ${
            checking ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          title="Refresh status"
        >
          <RefreshCw className={`w-3 h-3 ${
            status === 'online' ? 'text-green-500' : 'text-red-500'
          } ${checking ? 'animate-spin' : ''}`} />
        </button>
      </div>
    </div>
  );
}
