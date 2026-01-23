import { useState, useEffect } from 'react';
import { 
  Folder, 
  File, 
  ChevronRight, 
  ChevronDown, 
  Lock,
  Search,
  FileCode,
  FileJson,
  FileText,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface FileItem {
  name: string;
  path: string;
  type?: string;
  size?: number;
  editable?: boolean;
  reason?: string;
  lines?: number;
  locked?: boolean;
}

interface DirectoryItem {
  name: string;
  path: string;
  itemCount?: number;
  locked?: boolean;
}

interface FileBrowserProps {
  onFileSelect: (path: string) => void;
  selectedPath?: string;
}

/**
 * File Browser Component
 * Browse files and directories in the codebase
 */
export function FileBrowser({ onFileSelect, selectedPath }: FileBrowserProps) {
  const [currentPath, setCurrentPath] = useState('/');
  const [files, setFiles] = useState<FileItem[]>([]);
  const [directories, setDirectories] = useState<DirectoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedDirs, setExpandedDirs] = useState<Set<string>>(new Set(['/']));

  // Load directory contents
  useEffect(() => {
    loadDirectory(currentPath);
  }, [currentPath]);

  const loadDirectory = async (path: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/files/list`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ path })
        }
      );

      const result = await response.json();

      if (result.success) {
        setFiles(result.files || []);
        setDirectories(result.directories || []);
      } else {
        console.error('Failed to load directory:', result.error);
      }
    } catch (error) {
      console.error('Error loading directory:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDirectory = (path: string) => {
    const newExpanded = new Set(expandedDirs);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
      setCurrentPath(path);
    }
    setExpandedDirs(newExpanded);
  };

  const handleFileClick = (file: FileItem) => {
    onFileSelect(file.path);
  };

  const getFileIcon = (file: FileItem) => {
    const ext = file.name.split('.').pop()?.toLowerCase();
    
    switch (ext) {
      case 'tsx':
      case 'ts':
      case 'js':
      case 'jsx':
        return <FileCode className="w-4 h-4 text-blue-500" />;
      case 'json':
        return <FileJson className="w-4 h-4 text-yellow-500" />;
      case 'md':
      case 'txt':
        return <FileText className="w-4 h-4 text-gray-400" />;
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'svg':
        return <ImageIcon className="w-4 h-4 text-purple-500" />;
      default:
        return <File className="w-4 h-4 text-white/60" />;
    }
  };

  const formatSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Filter files based on search
  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDirectories = directories.filter(dir =>
    dir.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-black/30 border border-white/10 rounded-xl">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <h3 className="text-[18px] font-bold text-white mb-3">File Browser</h3>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search files..."
            className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-[14px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500"
          />
        </div>

        {/* Current Path */}
        <div className="mt-3 text-[12px] text-white/60 font-mono truncate">
          {currentPath}
        </div>
      </div>

      {/* File Tree */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 text-yellow-500 animate-spin" />
          </div>
        ) : (
          <>
            {/* Directories */}
            {filteredDirectories.map((dir) => (
              <div key={dir.path}>
                <button
                  onClick={() => toggleDirectory(dir.path)}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors group"
                >
                  {expandedDirs.has(dir.path) ? (
                    <ChevronDown className="w-4 h-4 text-white/60" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-white/60" />
                  )}
                  <Folder className={`w-4 h-4 ${dir.locked ? 'text-red-500' : 'text-yellow-500'}`} />
                  <span className="text-[14px] text-white flex-1 text-left">
                    {dir.name}
                  </span>
                  {dir.locked && (
                    <Lock className="w-3 h-3 text-red-500" />
                  )}
                  {dir.itemCount !== undefined && (
                    <span className="text-[12px] text-white/40">
                      {dir.itemCount}
                    </span>
                  )}
                </button>
              </div>
            ))}

            {/* Files */}
            {filteredFiles.map((file) => (
              <button
                key={file.path}
                onClick={() => handleFileClick(file)}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors group ${
                  selectedPath === file.path
                    ? 'bg-yellow-500/20 border border-yellow-500/50'
                    : 'hover:bg-white/5'
                }`}
              >
                <div className="w-4" /> {/* Indent */}
                {getFileIcon(file)}
                <span className="text-[14px] text-white flex-1 text-left truncate">
                  {file.name}
                </span>
                
                {!file.editable && (
                  <Lock className="w-3 h-3 text-red-500 flex-shrink-0" title={file.reason || 'Protected file'} />
                )}
                
                {file.editable && (
                  <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" title="Editable" />
                )}
                
                {file.size && (
                  <span className="text-[11px] text-white/40 flex-shrink-0">
                    {formatSize(file.size)}
                  </span>
                )}
              </button>
            ))}

            {/* Empty State */}
            {filteredFiles.length === 0 && filteredDirectories.length === 0 && !loading && (
              <div className="text-center py-8 text-white/40 text-[14px]">
                {searchQuery ? 'No files match your search' : 'No files in this directory'}
              </div>
            )}
          </>
        )}
      </div>

      {/* Legend */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <div className="flex items-center gap-3 text-[12px]">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-white/60">Editable</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-red-500" />
            <span className="text-white/60">Protected</span>
          </div>
        </div>
      </div>
    </div>
  );
}
