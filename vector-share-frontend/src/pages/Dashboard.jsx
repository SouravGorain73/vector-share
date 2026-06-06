import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import fileService from '../services/fileService';
import FileIcon, { } from '../components/FileIcon';
import {
  FolderOpen,
  Globe,
  Lock,
  HardDrive,
  Upload,
  TrendingUp,
  ExternalLink,
  Clock,
  ArrowRight,
} from 'lucide-react';

// Animated counter hook
function useCountUp(target, duration = 1000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (target === 0 || typeof target !== 'number') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCount(target);
      return;
    }
    
    const startTime = performance.now();

    function animate(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(eased * target);
      setCount(value);
      if (progress < 1) {
        ref.current = requestAnimationFrame(animate);
      }
    }

    ref.current = requestAnimationFrame(animate);
    return () => ref.current && cancelAnimationFrame(ref.current);
  }, [target, duration]);

  return count;
}

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFiles = async () => {
    try {
      const data = await fileService.getUserFiles();
      setFiles(data);
    } catch (err) {
      console.error('Failed to load files:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadFiles();
  }, []);

  const totalFiles = files.length;
  const publicFiles = files.filter((f) => f.visibility === 'PUBLIC').length;
  const privateFiles = files.filter((f) => f.visibility === 'PRIVATE').length;
  const totalSize = files.reduce((sum, f) => sum + (f.fileSize || 0), 0);
  const recentFiles = [...files].sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)).slice(0, 5);

  // Animated counters
  const animatedTotal = useCountUp(loading ? 0 : totalFiles);
  const animatedPublic = useCountUp(loading ? 0 : publicFiles);
  const animatedPrivate = useCountUp(loading ? 0 : privateFiles);

  // File type distribution
  const typeDistribution = files.reduce((acc, f) => {
    const ext = f.originalFileName?.split('.').pop()?.toLowerCase() || 'other';
    const category = getFileCategory(ext);
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const typeColors = {
    Images: 'from-pink-500 to-rose-400',
    Documents: 'from-blue-500 to-cyan-400',
    Code: 'from-yellow-500 to-amber-400',
    Media: 'from-purple-500 to-violet-400',
    Archives: 'from-amber-500 to-orange-400',
    Other: 'from-gray-500 to-gray-400',
  };

  const stats = [
    {
      label: 'Total Files',
      value: animatedTotal,
      icon: FolderOpen,
      gradient: 'from-purple-500 to-indigo-600',
    },
    {
      label: 'Public Files',
      value: animatedPublic,
      icon: Globe,
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      label: 'Private Files',
      value: animatedPrivate,
      icon: Lock,
      gradient: 'from-amber-500 to-orange-600',
    },
    {
      label: 'Storage Used',
      value: fileService.formatFileSize(totalSize),
      icon: HardDrive,
      gradient: 'from-pink-500 to-rose-600',
    },
  ];

  // Storage used percentage (max 50MB per file, estimate 500MB total for free plan)
  const maxStorage = 500 * 1024 * 1024; // 500 MB
  const storagePercent = Math.min((totalSize / maxStorage) * 100, 100);

  return (
    <div className="page-enter">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-white">
          Welcome back, <span className="gradient-text">{user?.name || 'User'}</span>
        </h1>
        <p className="mt-1 text-gray-400">Here's an overview of your file sharing activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`glass-card p-6 animate-fade-in-up stagger-${i + 1}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 font-medium">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold text-white">{loading ? '—' : stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                <stat.icon size={22} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Storage Bar + File Type Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Storage Usage */}
        <div className="glass-card p-6 animate-fade-in-up stagger-5">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <HardDrive size={18} className="text-purple-400" />
            Storage Usage
          </h2>
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">{fileService.formatFileSize(totalSize)} used</span>
              <span className="text-gray-500">500 MB</span>
            </div>
            <div className="w-full h-3 bg-gray-800/60 rounded-full overflow-hidden">
              <div
                className="progress-bar h-full"
                style={{ width: loading ? '0%' : `${storagePercent}%` }}
              />
            </div>
          </div>
          <p className="text-xs text-gray-500">
            {loading ? '—' : `${storagePercent.toFixed(1)}%`} of your storage used
          </p>
        </div>

        {/* File Type Distribution */}
        <div className="glass-card p-6 animate-fade-in-up stagger-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-purple-400" />
            File Types
          </h2>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-6 bg-gray-800/40 rounded animate-shimmer" />
              ))}
            </div>
          ) : Object.keys(typeDistribution).length === 0 ? (
            <p className="text-gray-500 text-sm">No files yet</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(typeDistribution)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([category, count]) => (
                  <div key={category} className="flex items-center gap-3">
                    <span className="text-sm text-gray-300 w-20 truncate">{category}</span>
                    <div className="flex-1 h-2 bg-gray-800/40 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${typeColors[category] || typeColors.Other}`}
                        style={{ width: `${(count / totalFiles) * 100}%`, transition: 'width 0.5s ease' }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-8 text-right">{count}</span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions + Recent Files */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="glass-card p-6 animate-fade-in-up stagger-7">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-purple-400" />
            Quick Actions
          </h2>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/upload')}
              className="w-full flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/20 hover:border-purple-500/40 text-gray-200 hover:text-white transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                <Upload size={18} className="text-purple-400" />
              </div>
              <div className="text-left flex-1">
                <p className="font-semibold text-sm">Upload File</p>
                <p className="text-xs text-gray-500">Share a new file</p>
              </div>
              <ArrowRight size={16} className="text-gray-600 group-hover:text-purple-400 transition-colors" />
            </button>
            <button
              onClick={() => navigate('/myfiles')}
              className="w-full flex items-center gap-3 p-4 rounded-xl bg-gray-800/40 border border-gray-700/30 hover:border-gray-600/50 text-gray-200 hover:text-white transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-700/30 flex items-center justify-center group-hover:bg-gray-700/50 transition-colors">
                <FolderOpen size={18} className="text-gray-400" />
              </div>
              <div className="text-left flex-1">
                <p className="font-semibold text-sm">Manage Files</p>
                <p className="text-xs text-gray-500">View all your files</p>
              </div>
              <ArrowRight size={16} className="text-gray-600 group-hover:text-gray-400 transition-colors" />
            </button>
          </div>
        </div>

        {/* Recent Files */}
        <div className="lg:col-span-2 glass-card p-6 animate-fade-in-up stagger-8">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Clock size={18} className="text-purple-400" />
            Recent Files
          </h2>

          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 rounded-xl bg-gray-800/40 animate-shimmer"></div>
              ))}
            </div>
          ) : recentFiles.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gray-800/40 flex items-center justify-center mb-4">
                <FolderOpen size={28} className="text-gray-600" />
              </div>
              <p className="text-gray-400 font-medium">No files yet</p>
              <p className="text-gray-500 text-sm mt-1">Upload your first file to get started</p>
            </div>
          ) : (
            <div className="space-y-2">
              {recentFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-gray-800/30 hover:bg-gray-800/50 transition-colors group"
                >
                  <FileIcon filename={file.originalFileName} size={18} className="w-10 h-10 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-200 truncate">{file.originalFileName}</p>
                    <p className="text-xs text-gray-500">
                      {fileService.formatFileSize(file.fileSize)} • {fileService.formatDate(file.uploadedAt)}
                    </p>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      file.visibility === 'PUBLIC'
                        ? 'bg-emerald-500/15 text-emerald-400'
                        : 'bg-amber-500/15 text-amber-400'
                    }`}
                  >
                    {file.visibility}
                  </span>
                  {file.shareLink && (
                    <a
                      href={file.shareLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-gray-500 hover:text-purple-400 hover:bg-purple-500/10 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function getFileCategory(ext) {
  const images = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'bmp'];
  const docs = ['pdf', 'doc', 'docx', 'txt', 'rtf', 'md', 'ppt', 'pptx'];
  const code = ['js', 'jsx', 'ts', 'tsx', 'py', 'java', 'html', 'css', 'json', 'xml', 'c', 'cpp'];
  const media = ['mp4', 'avi', 'mkv', 'mov', 'mp3', 'wav', 'flac', 'ogg', 'webm'];
  const archives = ['zip', 'rar', '7z', 'tar', 'gz'];

  if (images.includes(ext)) return 'Images';
  if (docs.includes(ext)) return 'Documents';
  if (code.includes(ext)) return 'Code';
  if (media.includes(ext)) return 'Media';
  if (archives.includes(ext)) return 'Archives';
  return 'Other';
}

export default Dashboard;
