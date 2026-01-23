/**
 * ============================================================================
 * OPTIMIZED CODE EDITOR
 * ============================================================================
 * 
 * Features:
 * - Monaco Editor for syntax highlighting
 * - File caching for fast loads
 * - Auto-save functionality
 * - Version history
 * - Fast performance
 * 
 * ============================================================================
 */

import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { 
  Save, 
  X, 
  RotateCcw, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Clock,
  Copy,
  Download
} from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

// Lazy load Monaco Editor (reduces initial bundle size)
const Editor = lazy(() => import('@monaco-editor/react'));

interface CodeEditorOptimizedProps {
  filePath: string;
  onClose?: () => void;
}

export function CodeEditorOptimized({ filePath, onClose }: CodeEditorOptimizedProps) {
  const [content, setContent] = useState('');
  const [originalContent, setOriginalContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [language, setLanguage] = useState('typescript');
  const [metadata, setMetadata] = useState<any>(null);
  
  const editorRef = useRef<any>(null);
  const autoSaveTimerRef = useRef<any>(null);

  // Detect language from file extension
  useEffect(() => {
    const ext = filePath.split('.').pop()?.toLowerCase();
    const langMap: Record<string, string> = {
      'ts': 'typescript',
      'tsx': 'typescript',
      'js': 'javascript',
      'jsx': 'javascript',
      'json': 'json',
      'css': 'css',
      'scss': 'scss',
      'html': 'html',
      'md': 'markdown',
      'txt': 'plaintext',
    };
    setLanguage(langMap[ext || ''] || 'typescript');
  }, [filePath]);

  // Load file with caching
  useEffect(() => {
    if (filePath) {
      loadFile();
    }
  }, [filePath]);

  // Track changes
  useEffect(() => {
    setHasChanges(content !== originalContent);
  }, [content, originalContent]);

  // Auto-save after 2 seconds of no typing
  useEffect(() => {
    if (hasChanges) {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
      
      autoSaveTimerRef.current = setTimeout(() => {
        if (metadata?.editable) {
          saveFile(true); // Auto-save
        }
      }, 2000);
    }
    
    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, [hasChanges, content]);

  const loadFile = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Try to load from cache first
      const cacheKey = `file_cache:${filePath}`;
      const cached = localStorage.getItem(cacheKey);
      
      if (cached) {
        const { content: cachedContent, timestamp } = JSON.parse(cached);
        const age = Date.now() - timestamp;
        
        // Use cache if less than 5 minutes old
        if (age < 5 * 60 * 1000) {
          setContent(cachedContent);
          setOriginalContent(cachedContent);
          setLoading(false);
          return;
        }
      }
      
      // Load from server
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/files/read`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ path: filePath })
        }
      );

      const result = await response.json();

      if (result.success) {
        setContent(result.content);
        setOriginalContent(result.content);
        setMetadata(result.metadata);
        
        // Cache the content
        localStorage.setItem(cacheKey, JSON.stringify({
          content: result.content,
          timestamp: Date.now()
        }));
      } else {
        setError(result.error || 'Failed to load file');
      }
    } catch (err: any) {
      setError(err.message);
      console.error('Error loading file:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveFile = async (isAutoSave = false) => {
    if (!metadata?.editable) {
      setError('This file is not editable');
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/files/write`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            path: filePath,
            content,
            user: 'admin'
          })
        }
      );

      const result = await response.json();

      if (result.success) {
        setOriginalContent(content);
        setSuccess(isAutoSave ? 'Auto-saved' : 'File saved successfully');
        
        // Update cache
        const cacheKey = `file_cache:${filePath}`;
        localStorage.setItem(cacheKey, JSON.stringify({
          content,
          timestamp: Date.now()
        }));
        
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(result.error || 'Failed to save file');
      }
    } catch (err: any) {
      setError(err.message);
      console.error('Error saving file:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleEditorMount = (editor: any) => {
    editorRef.current = editor;
    
    // Add keyboard shortcuts
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
      () => saveFile()
    );
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setSuccess('Copied to clipboard!');
    setTimeout(() => setSuccess(null), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filePath.split('/').pop() || 'file.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    if (confirm('Discard all changes?')) {
      setContent(originalContent);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-[#0a0a0a] rounded-xl">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
        <span className="ml-3 text-white">Loading file...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-2">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <h3 className="text-[16px] font-bold text-red-500">Error</h3>
        </div>
        <p className="text-[14px] text-white/80">{error}</p>
        <button
          onClick={loadFile}
          className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-500 rounded-lg transition-colors text-[14px]"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
        <div className="flex items-center gap-4">
          <div>
            <h3 className="text-[15px] font-bold text-white">{filePath.split('/').pop()}</h3>
            <p className="text-[13px] text-white/60">{filePath}</p>
          </div>
          
          {hasChanges && (
            <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
              <span className="text-[13px] text-yellow-500">Unsaved changes</span>
            </div>
          )}
          
          {saving && (
            <div className="flex items-center gap-2 text-blue-500">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-[13px]">Saving...</span>
            </div>
          )}
          
          {success && (
            <div className="flex items-center gap-2 text-green-500">
              <CheckCircle className="w-4 h-4" />
              <span className="text-[13px]">{success}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/70 hover:text-white"
            title="Copy code"
          >
            <Copy className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleDownload}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/70 hover:text-white"
            title="Download file"
          >
            <Download className="w-4 h-4" />
          </button>
          
          {hasChanges && (
            <button
              onClick={handleReset}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/70 hover:text-white"
              title="Discard changes"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
          
          {metadata?.editable && (
            <button
              onClick={() => saveFile()}
              disabled={!hasChanges || saving}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 disabled:bg-yellow-500/50 disabled:cursor-not-allowed text-black rounded-lg transition-colors text-[14px] font-semibold flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save (Ctrl+S)
            </button>
          )}
          
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/70 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      
      {/* Editor */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden">
        <Suspense fallback={
          <div className="flex items-center justify-center h-[600px]">
            <Loader2 className="w-6 h-6 animate-spin text-yellow-500" />
          </div>
        }>
          <Editor
            height="600px"
            language={language}
            theme="vs-dark"
            value={content}
            onChange={(value) => setContent(value || '')}
            onMount={handleEditorMount}
            options={{
              readOnly: !metadata?.editable,
              minimap: { enabled: true },
              fontSize: 14,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              wordWrap: 'on',
              formatOnPaste: true,
              formatOnType: true,
            }}
            loading={
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-6 h-6 animate-spin text-yellow-500" />
              </div>
            }
          />
        </Suspense>
      </div>
      
      {/* Metadata */}
      {metadata && (
        <div className="flex items-center gap-6 text-[13px] text-white/60 bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Lines: {metadata.lines}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Size: {metadata.sizeFormatted}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Language: {language}</span>
          </div>
          {metadata.editable ? (
            <div className="flex items-center gap-2 text-green-500">
              <CheckCircle className="w-4 h-4" />
              <span>Editable</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-red-500">
              <AlertCircle className="w-4 h-4" />
              <span>Read-only</span>
            </div>
          )}
        </div>
      )}
      
      {/* Help Text */}
      <div className="bg-blue-500/20 border border-blue-500/50 rounded-xl p-4 text-[13px] text-white/70">
        <p>
          <strong>Pro tip:</strong> Press <kbd className="px-2 py-1 bg-black/50 rounded">Ctrl+S</kbd> (or <kbd className="px-2 py-1 bg-black/50 rounded">Cmd+S</kbd> on Mac) to save.
          File auto-saves 2 seconds after you stop typing.
        </p>
      </div>
    </div>
  );
}
