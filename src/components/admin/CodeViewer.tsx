import { useState, useEffect, useRef } from 'react';
import { 
  Copy, 
  Download, 
  Eye, 
  Edit3, 
  Save, 
  X, 
  Lock,
  CheckCircle,
  AlertCircle,
  Loader2,
  RotateCcw
} from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface CodeViewerProps {
  filePath: string;
  readOnly?: boolean;
}

interface FileMetadata {
  size: number;
  sizeFormatted: string;
  lines: number;
  language: string;
  editable: boolean;
  lastModified: string;
  modifiedBy?: string;
}

/**
 * Code Viewer Component
 * View and edit code files with syntax highlighting
 */
export function CodeViewer({ filePath, readOnly = false }: CodeViewerProps) {
  const [content, setContent] = useState('');
  const [originalContent, setOriginalContent] = useState('');
  const [metadata, setMetadata] = useState<FileMetadata | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load file when path changes
  useEffect(() => {
    if (filePath) {
      loadFile();
    }
  }, [filePath]);

  // Track changes
  useEffect(() => {
    setHasChanges(content !== originalContent);
  }, [content, originalContent]);

  const loadFile = async () => {
    setLoading(true);
    setError(null);
    setEditMode(false);
    
    try {
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
      } else {
        setError(result.error || 'Failed to load file');
        // Show hint if file not cached
        if (result.hint) {
          console.warn(result.hint);
        }
      }
    } catch (err: any) {
      setError(err.message);
      console.error('Error loading file:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveFile = async () => {
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
        setSuccess(`File saved successfully (version ${result.version})`);
        setEditMode(false);
        setTimeout(() => setSuccess(null), 5000);
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

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setSuccess('Copied to clipboard!');
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filePath.split('/').pop() || 'file.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRevert = () => {
    if (confirm('Revert all changes?')) {
      setContent(originalContent);
      setEditMode(false);
    }
  };

  const getLineNumbers = () => {
    const lineCount = content.split('\n').length;
    return Array.from({ length: lineCount }, (_, i) => i + 1);
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-black/30 border border-white/10 rounded-xl">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-yellow-500 animate-spin mx-auto mb-3" />
          <p className="text-[14px] text-white/60">Loading file...</p>
        </div>
      </div>
    );
  }

  if (!filePath) {
    return (
      <div className="h-full flex items-center justify-center bg-black/30 border border-white/10 rounded-xl">
        <div className="text-center">
          <FileCode className="w-12 h-12 text-white/20 mx-auto mb-3" />
          <p className="text-[14px] text-white/40">Select a file to view</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-black/30 border border-white/10 rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-[16px] font-bold text-white truncate">
              {filePath.split('/').pop()}
            </h3>
            {metadata?.editable ? (
              <div className="flex items-center gap-1 px-2 py-0.5 bg-green-500/20 border border-green-500/50 rounded text-[11px] text-green-500 font-medium">
                <Edit3 className="w-3 h-3" />
                Editable
              </div>
            ) : (
              <div className="flex items-center gap-1 px-2 py-0.5 bg-red-500/20 border border-red-500/50 rounded text-[11px] text-red-500 font-medium">
                <Lock className="w-3 h-3" />
                Protected
              </div>
            )}
          </div>
          <p className="text-[12px] text-white/60 font-mono truncate">
            {filePath}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {!editMode && metadata?.editable && !readOnly && (
            <button
              onClick={() => setEditMode(true)}
              className="p-2 bg-yellow-500 text-black hover:bg-yellow-400 rounded-lg transition-colors"
              title="Edit File"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          )}
          
          {editMode && (
            <>
              <button
                onClick={handleRevert}
                disabled={!hasChanges}
                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Revert Changes"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={saveFile}
                disabled={!hasChanges || saving}
                className="p-2 bg-green-500 hover:bg-green-400 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                title="Save File"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={() => {
                  if (hasChanges && !confirm('Discard changes?')) return;
                  setContent(originalContent);
                  setEditMode(false);
                }}
                className="p-2 bg-red-500 hover:bg-red-400 text-white rounded-lg transition-colors"
                title="Cancel"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          )}
          
          <button
            onClick={handleCopy}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
            title="Copy to Clipboard"
          >
            <Copy className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleDownload}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
            title="Download File"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metadata Bar */}
      {metadata && (
        <div className="flex items-center gap-4 px-4 py-2 bg-black/50 border-b border-white/10 text-[12px] text-white/60">
          <span>{metadata.language}</span>
          <span>•</span>
          <span>{metadata.lines} lines</span>
          <span>•</span>
          <span>{metadata.sizeFormatted}</span>
          {metadata.lastModified && (
            <>
              <span>•</span>
              <span>Modified: {new Date(metadata.lastModified).toLocaleString()}</span>
            </>
          )}
        </div>
      )}

      {/* Notifications */}
      {error && (
        <div className="mx-4 mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-[14px] text-red-500 font-medium">Error</p>
            <p className="text-[13px] text-red-400 mt-1">{error}</p>
          </div>
          <button onClick={() => setError(null)} className="text-red-500 hover:text-red-400">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {success && (
        <div className="mx-4 mt-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg flex items-start gap-2">
          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-[14px] text-green-500 font-medium">Success</p>
            <p className="text-[13px] text-green-400 mt-1">{success}</p>
          </div>
          <button onClick={() => setSuccess(null)} className="text-green-500 hover:text-green-400">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {hasChanges && editMode && (
        <div className="mx-4 mt-4 p-3 bg-yellow-500/20 border border-yellow-500/50 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-yellow-500" />
          <p className="text-[13px] text-yellow-500">You have unsaved changes</p>
        </div>
      )}

      {/* Code Editor */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex">
          {/* Line Numbers */}
          <div className="w-12 bg-black/50 border-r border-white/10 overflow-y-auto flex-shrink-0">
            <div className="py-4 px-2 font-mono text-[13px] text-white/40 text-right select-none">
              {getLineNumbers().map((num) => (
                <div key={num} className="leading-6">
                  {num}
                </div>
              ))}
            </div>
          </div>

          {/* Code Content */}
          <div className="flex-1 overflow-auto">
            {editMode ? (
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-full p-4 bg-transparent text-white font-mono text-[13px] leading-6 focus:outline-none resize-none"
                spellCheck={false}
                style={{
                  tabSize: 2,
                  MozTabSize: 2,
                }}
              />
            ) : (
              <pre className="p-4 text-white font-mono text-[13px] leading-6 overflow-auto">
                <code>{content}</code>
              </pre>
            )}
          </div>
        </div>
      </div>

      {/* Footer Status */}
      <div className="px-4 py-2 border-t border-white/10 flex items-center justify-between text-[12px] text-white/60">
        <div className="flex items-center gap-4">
          {editMode ? (
            <span className="text-yellow-500">Edit Mode</span>
          ) : (
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              View Only
            </span>
          )}
        </div>
        <div>
          {metadata?.modifiedBy && (
            <span>Last edited by: {metadata.modifiedBy}</span>
          )}
        </div>
      </div>
    </div>
  );
}

// Placeholder icon
function FileCode({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  );
}
