import { useState, useEffect, useRef } from 'react';
import { AdminLayout } from './AdminLayout';
import { useAdminAuth } from '../../utils/adminAuth';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import {
  Upload,
  Image as ImageIcon,
  Video,
  File,
  Search,
  Grid3x3,
  List,
  Filter,
  Trash2,
  Download,
  Copy,
  Edit3,
  X,
  Loader2,
  Folder,
  CheckCircle,
  FileText
} from 'lucide-react';

interface MediaFile {
  id: string;
  name: string;
  originalName: string;
  type: 'image' | 'video' | 'document' | 'other';
  mimeType: string;
  size: number;
  url: string;
  signedUrl?: string;
  path: string;
  folder: string;
  uploadedAt: string;
  uploadedBy: string;
  tags: string[];
}

export function AdminMediaLibraryPage() {
  const { hasPermission } = useAdminAuth();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'images' | 'videos' | 'documents'>('all');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadMedia();
    loadStats();
  }, []);

  const loadMedia = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/media/all`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      const result = await response.json();

      if (result.success) {
        setFiles(result.files);
      }
    } catch (error) {
      console.error('Error loading media:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/media/stats`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      const result = await response.json();

      if (result.success) {
        setStats(result.stats);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    setUploading(true);

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', 'uploads');
        formData.append('uploadedBy', 'admin');

        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/media/upload`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`
            },
            body: formData
          }
        );

        const result = await response.json();

        if (!result.success) {
          alert(`❌ Error uploading ${file.name}: ${result.error}`);
        }
      }

      alert(`✅ ${selectedFiles.length} file(s) uploaded successfully!`);
      loadMedia();
      loadStats();
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('❌ Error uploading files');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDelete = async (fileId: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/media/delete`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: fileId })
        }
      );

      const result = await response.json();

      if (result.success) {
        alert('✅ File deleted successfully!');
        loadMedia();
        loadStats();
        setSelectedFile(null);
      } else {
        alert('❌ Error: ' + result.error);
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('❌ Error deleting file');
    }
  };

  const handleRename = async (fileId: string, newName: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-9c8e64e4/media/rename`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: fileId, newName })
        }
      );

      const result = await response.json();

      if (result.success) {
        alert('✅ File renamed successfully!');
        loadMedia();
      } else {
        alert('❌ Error: ' + result.error);
      }
    } catch (error) {
      console.error('Error renaming file:', error);
      alert('❌ Error renaming file');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('✅ URL copied to clipboard!');
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <ImageIcon className="w-5 h-5" />;
      case 'video':
        return <Video className="w-5 h-5" />;
      case 'document':
        return <FileText className="w-5 h-5" />;
      default:
        return <File className="w-5 h-5" />;
    }
  };

  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.originalName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterType === 'all' ||
      (filterType === 'images' && file.type === 'image') ||
      (filterType === 'videos' && file.type === 'video') ||
      (filterType === 'documents' && file.type === 'document');
    return matchesSearch && matchesFilter;
  });

  return (
    <AdminLayout
      title="Media Library"
      breadcrumb={[{ label: 'Dashboard', href: '/admin' }, { label: 'Media Library' }]}
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[26px] md:text-[30px] font-medium text-white mb-2">Media Library</h1>
          <p className="text-[15px] text-white/70">
            {loading ? 'Loading...' : `${files.length} files • ${stats ? formatBytes(stats.totalSize) : '0 Bytes'}`}
          </p>
        </div>

        {hasPermission('editor') && (
          <div className="flex gap-3">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              accept="image/*,video/*,.pdf,.doc,.docx"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold text-[15px] hover:bg-yellow-400 transition-colors disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Upload Files
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="glass p-4 rounded-xl border border-white/10">
            <div className="text-[13px] text-white/60 mb-1">Total Files</div>
            <div className="text-[22px] font-medium text-white">{stats.totalFiles}</div>
          </div>
          <div className="glass p-4 rounded-xl border border-white/10">
            <div className="text-[13px] text-white/60 mb-1">Images</div>
            <div className="text-[22px] font-medium text-white">{stats.imageCount}</div>
          </div>
          <div className="glass p-4 rounded-xl border border-white/10">
            <div className="text-[13px] text-white/60 mb-1">Videos</div>
            <div className="text-[22px] font-medium text-white">{stats.videoCount}</div>
          </div>
          <div className="glass p-4 rounded-xl border border-white/10">
            <div className="text-[13px] text-white/60 mb-1">Documents</div>
            <div className="text-[22px] font-medium text-white">{stats.docCount}</div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="glass p-6 rounded-xl border border-white/10 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search files..."
              className="w-full bg-black/50 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 transition-colors"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white focus:outline-none focus:border-yellow-500"
            >
              <option value="all">All Files</option>
              <option value="images">Images</option>
              <option value="videos">Videos</option>
              <option value="documents">Documents</option>
            </select>

            <div className="flex gap-1 bg-black/50 border border-white/10 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-yellow-500 text-black' : 'text-white/60 hover:text-white'
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-yellow-500 text-black' : 'text-white/60 hover:text-white'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Media Grid/List */}
      {loading ? (
        <div className="glass rounded-xl border border-white/10 p-12 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-yellow-500 animate-spin" />
        </div>
      ) : filteredFiles.length === 0 ? (
        <div className="glass rounded-xl border border-white/10 p-12 text-center">
          <Upload className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <p className="text-white/60 mb-4">
            {files.length === 0 ? 'No files uploaded yet' : 'No files match your search'}
          </p>
          {hasPermission('editor') && files.length === 0 && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold text-[15px] hover:bg-yellow-400 transition-colors"
            >
              <Upload className="w-5 h-5" />
              Upload Your First File
            </button>
          )}
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredFiles.map((file) => (
            <div
              key={file.id}
              onClick={() => setSelectedFile(file)}
              className="glass rounded-xl border border-white/10 overflow-hidden cursor-pointer hover:border-yellow-500 transition-all group"
            >
              <div className="aspect-square bg-black/30 flex items-center justify-center relative">
                {file.type === 'image' && file.signedUrl ? (
                  <img src={file.signedUrl} alt={file.originalName} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-yellow-500">{getFileIcon(file.type)}</div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="p-3">
                <div className="text-[14px] font-medium text-white truncate mb-1">{file.originalName}</div>
                <div className="text-[12px] text-white/60">{formatBytes(file.size)}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass rounded-xl border border-white/10 overflow-hidden">
          <table className="w-full">
            <thead className="bg-black/30 border-b border-white/10">
              <tr>
                <th className="text-left p-4 text-[13px] font-semibold text-white/70">NAME</th>
                <th className="text-left p-4 text-[13px] font-semibold text-white/70">TYPE</th>
                <th className="text-left p-4 text-[13px] font-semibold text-white/70">SIZE</th>
                <th className="text-left p-4 text-[13px] font-semibold text-white/70">UPLOADED</th>
                <th className="text-center p-4 text-[13px] font-semibold text-white/70">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.map((file) => (
                <tr key={file.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center text-yellow-500">
                        {getFileIcon(file.type)}
                      </div>
                      <div className="text-[15px] text-white">{file.originalName}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-[14px] text-white/70 capitalize">{file.type}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-[14px] text-white/70">{formatBytes(file.size)}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-[14px] text-white/70">
                      {new Date(file.uploadedAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFile(file);
                        }}
                        className="p-2 text-white/60 hover:text-yellow-500 hover:bg-yellow-500/10 rounded-lg transition-all"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      {hasPermission('admin') && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(file.id);
                          }}
                          className="p-2 text-white/60 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* File Details Modal */}
      {selectedFile && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setSelectedFile(null)}>
          <div className="glass border border-white/10 rounded-xl p-6 w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[22px] font-medium text-white">File Details</h2>
              <button onClick={() => setSelectedFile(null)} className="text-white/60 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {selectedFile.type === 'image' && selectedFile.signedUrl && (
              <div className="mb-6 bg-black/30 rounded-lg overflow-hidden">
                <img src={selectedFile.signedUrl} alt={selectedFile.originalName} className="w-full max-h-96 object-contain" />
              </div>
            )}

            <div className="space-y-4 mb-6">
              <div>
                <div className="text-[13px] text-white/60 mb-1">File Name</div>
                <div className="text-[15px] text-white font-medium">{selectedFile.originalName}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[13px] text-white/60 mb-1">Type</div>
                  <div className="text-[15px] text-white capitalize">{selectedFile.type}</div>
                </div>
                <div>
                  <div className="text-[13px] text-white/60 mb-1">Size</div>
                  <div className="text-[15px] text-white">{formatBytes(selectedFile.size)}</div>
                </div>
                <div>
                  <div className="text-[13px] text-white/60 mb-1">Uploaded</div>
                  <div className="text-[15px] text-white">{new Date(selectedFile.uploadedAt).toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-[13px] text-white/60 mb-1">Folder</div>
                  <div className="text-[15px] text-white">{selectedFile.folder}</div>
                </div>
              </div>
              {selectedFile.signedUrl && (
                <div>
                  <div className="text-[13px] text-white/60 mb-1">URL</div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={selectedFile.signedUrl}
                      readOnly
                      className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-[14px] text-white/70"
                    />
                    <button
                      onClick={() => copyToClipboard(selectedFile.signedUrl!)}
                      className="p-2 bg-yellow-500/10 text-yellow-500 rounded-lg hover:bg-yellow-500/20 transition-colors"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              {selectedFile.signedUrl && (
                <a
                  href={selectedFile.signedUrl}
                  download={selectedFile.originalName}
                  className="flex items-center gap-2 bg-white/5 text-white px-6 py-3 rounded-lg font-semibold text-[15px] hover:bg-white/10 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Download
                </a>
              )}
              {hasPermission('admin') && (
                <button
                  onClick={() => {
                    handleDelete(selectedFile.id);
                    setSelectedFile(null);
                  }}
                  className="flex items-center gap-2 bg-red-500/20 text-red-500 px-6 py-3 rounded-lg font-semibold text-[15px] hover:bg-red-500/30 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
