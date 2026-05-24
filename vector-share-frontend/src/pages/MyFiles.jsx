import React, { useState, useEffect } from 'react';
import fileService from '../services/fileService';
import toast from 'react-hot-toast';
import {
  FolderOpen,
  FileText,
  Globe,
  Lock,
  Copy,
  Check,
  Trash2,
  RefreshCw,
  Eye,
  EyeOff,
  Search,
  LayoutGrid,
  List,
  ExternalLink,
} from 'lucide-react';

function MyFiles() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [copiedId, setCopiedId] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      const data = await fileService.getUserFiles();
      setFiles(data);
    } catch (err) {
      toast.error('Failed to load files');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (fileId) => {
    if (!confirm('Are you sure you want to delete this file?')) return;
    setActionLoading(fileId);
    try {
      await fileService.deleteFile(fileId);
      setFiles((prev) => prev.filter((f) => f.id !== fileId));
      toast.success('File deleted');
    } catch (err) {
      toast.error('Failed to delete file');
    } finally {
      setActionLoading(null);
    }
  };

  const handleToggleVisibility = async (fileId, currentVisibility) => {
    const newVisibility = currentVisibility === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC';
    setActionLoading(fileId);
    try {
      const updated = await fileService.updateVisibility(fileId, newVisibility);
      setFiles((prev) => prev.map((f) => (f.id === fileId ? updated : f)));
      toast.success(`File set to ${newVisibility.toLowerCase()}`);
    } catch (err) {
      toast.error('Failed to update visibility');
    } finally {
      setActionLoading(null);
    }
  };

  const handleRegenerateLink = async (fileId) => {
    setActionLoading(fileId);
    try {
      const updated = await fileService.regenerateShareLink(fileId);
      setFiles((prev) => prev.map((f) => (f.id === fileId ? updated : f)));
      toast.success('Share link regenerated');
    } catch (err) {
      toast.error('Failed to regenerate link');
    } finally {
      setActionLoading(null);
    }
  };

  const copyShareLink = (fileId, link) => {
    navigator.clipboard.writeText(link);
    setCopiedId(fileId);
    toast.success('Link copied!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredFiles = files.filter((f) =>
    f.originalFileName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page-enter">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3">
            <FolderOpen size={28} className="text-purple-400" />
            My Files
          </h1>
          <p className="mt-1 text-gray-400">{files.length} file{files.length !== 1 ? 's' : ''} uploaded</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-xl text-sm text-white placeholder-gray-500 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all w-48"
            />
          </div>
          {/* View toggle */}
          <div className="flex items-center bg-gray-800/50 border border-gray-700/50 rounded-xl overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2.5 transition-colors ${viewMode === 'grid' ? 'bg-purple-500/20 text-purple-400' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2.5 transition-colors ${viewMode === 'list' ? 'bg-purple-500/20 text-purple-400' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : ''}`}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 rounded-2xl bg-gray-800/30 animate-shimmer"></div>
          ))}
        </div>
      ) : filteredFiles.length === 0 ? (
        <div className="text-center py-20">
          <FileText size={56} className="mx-auto text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-300">
            {searchQuery ? 'No files match your search' : 'No files uploaded yet'}
          </h3>
          <p className="text-gray-500 mt-2">
            {searchQuery ? 'Try a different search term' : 'Upload your first file to get started'}
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFiles.map((file, i) => (
            <div
              key={file.id}
              className={`file-card glass-card p-5 animate-fade-in-up`}
              style={{ animationDelay: `${i * 0.05}s`, opacity: 0, animationFillMode: 'forwards' }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gray-800/60 flex items-center justify-center">
                  <FileText size={22} className="text-purple-400" />
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${file.visibility === 'PUBLIC'
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : 'bg-amber-500/15 text-amber-400'
                    }`}
                >
                  {file.visibility}
                </span>
              </div>

              <h3 className="text-sm font-semibold text-white truncate mb-1" title={file.originalFileName}>
                {file.originalFileName}
              </h3>
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                <span>{fileService.formatFileSize(file.fileSize)}</span>
                <span>•</span>
                <span>{fileService.formatDate(file.uploadedAt)}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5 pt-3 border-t border-gray-800/50">
                {file.shareLink && (
                  <button
                    onClick={() => copyShareLink(file.id, file.shareLink)}
                    className="p-2 rounded-lg text-gray-500 hover:text-purple-400 hover:bg-purple-500/10 transition-all"
                    title="Copy share link"
                  >
                    {copiedId === file.id ? <Check size={15} /> : <Copy size={15} />}
                  </button>
                )}
                <button
                  onClick={() => handleToggleVisibility(file.id, file.visibility)}
                  disabled={actionLoading === file.id}
                  className="p-2 rounded-lg text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 transition-all disabled:opacity-40"
                  title="Toggle visibility"
                >
                  {file.visibility === 'PUBLIC' ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
                <button
                  onClick={() => handleRegenerateLink(file.id)}
                  disabled={actionLoading === file.id}
                  className="p-2 rounded-lg text-gray-500 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all disabled:opacity-40"
                  title="Regenerate share link"
                >
                  <RefreshCw size={15} className={actionLoading === file.id ? 'animate-spin' : ''} />
                </button>
                {file.shareLink && (
                  <a
                    href={file.shareLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-gray-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all"
                    title="Open share link"
                  >
                    <ExternalLink size={15} />
                  </a>
                )}
                <div className="flex-1" />
                <button
                  onClick={() => handleDelete(file.id)}
                  disabled={actionLoading === file.id}
                  className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-40"
                  title="Delete file"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800/50">
                  <th className="text-left px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">File</th>
                  <th className="text-left px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Size</th>
                  <th className="text-left px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Visibility</th>
                  <th className="text-left px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Uploaded</th>
                  <th className="text-right px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFiles.map((file) => (
                  <tr key={file.id} className="border-b border-gray-800/30 hover:bg-gray-800/20 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <FileText size={18} className="text-purple-400 shrink-0" />
                        <span className="text-sm text-white font-medium truncate max-w-xs">{file.originalFileName}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-400">{fileService.formatFileSize(file.fileSize)}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${file.visibility === 'PUBLIC' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'
                        }`}>
                        {file.visibility}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-400">{fileService.formatDate(file.uploadedAt)}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {file.shareLink && (
                          <button onClick={() => copyShareLink(file.id, file.shareLink)} className="p-2 rounded-lg text-gray-500 hover:text-purple-400 hover:bg-purple-500/10 transition-all" title="Copy link">
                            {copiedId === file.id ? <Check size={14} /> : <Copy size={14} />}
                          </button>
                        )}
                        <button onClick={() => handleToggleVisibility(file.id, file.visibility)} disabled={actionLoading === file.id} className="p-2 rounded-lg text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 transition-all disabled:opacity-40" title="Toggle">
                          {file.visibility === 'PUBLIC' ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                        <button onClick={() => handleRegenerateLink(file.id)} disabled={actionLoading === file.id} className="p-2 rounded-lg text-gray-500 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all disabled:opacity-40" title="Regenerate">
                          <RefreshCw size={14} className={actionLoading === file.id ? 'animate-spin' : ''} />
                        </button>
                        <button onClick={() => handleDelete(file.id)} disabled={actionLoading === file.id} className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-40" title="Delete">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyFiles;
