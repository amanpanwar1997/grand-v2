import { useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { FileBrowser } from './FileBrowser';
import { CodeViewer } from './CodeViewer';
import { 
  Code2, 
  Info, 
  Shield, 
  CheckCircle, 
  Lock,
  Edit3
} from 'lucide-react';

/**
 * Admin Code Editor Page
 * Browse and view code files from the admin panel
 */
export function AdminCodeEditorPage() {
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [showInfo, setShowInfo] = useState(true);

  return (
    <AdminLayout
      title="Code Editor"
      breadcrumb={[
        { label: 'Dashboard', href: '/admin' },
        { label: 'Code Editor' },
      ]}
    >
      <div className="space-y-6">
        {/* Info Banner */}
        {showInfo && (
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/50 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <Info className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-[18px] font-bold text-white mb-2">
                  Code Editor - Phase 1A Complete ✅
                </h3>
                <div className="space-y-2 text-[14px] text-white/80">
                  <p>
                    <strong>Current Status:</strong> Read-only file browser with viewing capabilities.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Browse all files and directories</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>View file contents</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Copy code to clipboard</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Download files</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Edit3 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Edit safe files (seoConfig, CSS)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Lock className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Critical files protected</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowInfo(false)}
                className="text-blue-500 hover:text-blue-400 text-[24px] leading-none"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Security Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <h4 className="text-[15px] font-semibold text-green-500">Editable Files</h4>
            </div>
            <ul className="space-y-1 text-[13px] text-white/70">
              <li>• /utils/seoConfig.tsx</li>
              <li>• /styles/globals.css</li>
              <li>• /data/*.json</li>
              <li>• Content files</li>
            </ul>
          </div>

          <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Lock className="w-4 h-4 text-red-500" />
              <h4 className="text-[15px] font-semibold text-red-500">Protected Files</h4>
            </div>
            <ul className="space-y-1 text-[13px] text-white/70">
              <li>• /App.tsx</li>
              <li>• /components/**</li>
              <li>• /supabase/**</li>
              <li>• /package.json</li>
            </ul>
          </div>

          <div className="bg-purple-500/20 border border-purple-500/50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-4 h-4 text-purple-500" />
              <h4 className="text-[15px] font-semibold text-purple-500">Security</h4>
            </div>
            <ul className="space-y-1 text-[13px] text-white/70">
              <li>• Auto-backup before save</li>
              <li>• Version history</li>
              <li>• Restore capability</li>
              <li>• Audit trail</li>
            </ul>
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-400px)] min-h-[600px]">
          {/* File Browser - 1 column */}
          <div className="lg:col-span-1 h-full">
            <FileBrowser
              onFileSelect={setSelectedFile}
              selectedPath={selectedFile}
            />
          </div>

          {/* Code Viewer - 3 columns */}
          <div className="lg:col-span-3 h-full">
            <CodeViewer
              filePath={selectedFile}
              readOnly={false}
            />
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-black/30 border border-white/10 rounded-xl p-6">
          <h3 className="text-[18px] font-bold text-white mb-4 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-yellow-500" />
            How to Use
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[14px] text-white/80">
            <div>
              <h4 className="font-semibold text-white mb-2">Viewing Files:</h4>
              <ol className="space-y-2 list-decimal list-inside">
                <li>Browse folders in the left sidebar</li>
                <li>Click on any file to view it</li>
                <li>Use search to find files quickly</li>
                <li>Copy or download files as needed</li>
              </ol>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Editing Files:</h4>
              <ol className="space-y-2 list-decimal list-inside">
                <li>Select an editable file (green dot)</li>
                <li>Click "Edit" button</li>
                <li>Make your changes</li>
                <li>Click "Save" to apply changes</li>
              </ol>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
            <p className="text-[13px] text-yellow-500 font-medium flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <strong>Safety First:</strong> Critical system files are protected and cannot be edited to prevent accidental website breakage.
            </p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-xl p-6">
          <h3 className="text-[18px] font-bold text-white mb-3">
            🚀 Coming in Phase 1B & 1C:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[14px]">
            <div>
              <h4 className="text-purple-400 font-semibold mb-2">Phase 1B:</h4>
              <ul className="space-y-1 text-white/70">
                <li>• Monaco Editor (VS Code)</li>
                <li>• Syntax highlighting</li>
                <li>• Autocomplete</li>
                <li>• Error detection</li>
              </ul>
            </div>
            <div>
              <h4 className="text-pink-400 font-semibold mb-2">Phase 1C:</h4>
              <ul className="space-y-1 text-white/70">
                <li>• Advanced search</li>
                <li>• Find & replace</li>
                <li>• Multi-file tabs</li>
                <li>• Diff viewer</li>
              </ul>
            </div>
            <div>
              <h4 className="text-blue-400 font-semibold mb-2">Phase 2:</h4>
              <ul className="space-y-1 text-white/70">
                <li>• Git integration</li>
                <li>• Deployment</li>
                <li>• Terminal access</li>
                <li>• Full IDE mode</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
