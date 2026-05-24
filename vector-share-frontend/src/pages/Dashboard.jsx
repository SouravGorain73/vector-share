import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import fileService from '../services/fileService';
import {
  FolderOpen,
  Globe,
  Lock,
  HardDrive,
  Upload,
  TrendingUp,
  FileText,
  ExternalLink,
  Clock,
} from 'lucide-react';

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFiles();
  }, []);

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

  const totalFiles = files.length;
  const publicFiles = files.filter((f) => f.visibility === 'PUBLIC').length;
  const privateFiles = files.filter((f) => f.visibility === 'PRIVATE').length;
  const totalSize = files.reduce((sum, f) => sum + (f.fileSize || 0), 0);
  const recentFiles = [...files].sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)).slice(0, 5);

  const stats = [
    {
      label: 'Total Files',
      value: totalFiles,
      icon: FolderOpen,
      gradient: 'from-purple-500 to-indigo-600',
      bgGlow: 'bg-purple-500/10',
    },
    {
      label: 'Public Files',
      value: publicFiles,
      icon: Globe,
      gradient: 'from-emerald-500 to-teal-600',
      bgGlow: 'bg-emerald-500/10',
    },
    {
      label: 'Private Files',
      value: privateFiles,
      icon: Lock,
      gradient: 'from-amber-500 to-orange-600',
      bgGlow: 'bg-amber-500/10',
    },
    {
      label: 'Storage Used',
      value: fileService.formatFileSize(totalSize),
      icon: HardDrive,
      gradient: 'from-pink-500 to-rose-600',
      bgGlow: 'bg-pink-500/10',
    },
  ];

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

      {/* Quick Actions + Recent Files */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="glass-card p-6 animate-fade-in-up stagger-5">
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
              <div className="text-left">
                <p className="font-semibold text-sm">Upload File</p>
                <p className="text-xs text-gray-500">Share a new file</p>
              </div>
            </button>
            <button
              onClick={() => navigate('/myfiles')}
              className="w-full flex items-center gap-3 p-4 rounded-xl bg-gray-800/40 border border-gray-700/30 hover:border-gray-600/50 text-gray-200 hover:text-white transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-700/30 flex items-center justify-center group-hover:bg-gray-700/50 transition-colors">
                <FolderOpen size={18} className="text-gray-400" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm">Manage Files</p>
                <p className="text-xs text-gray-500">View all your files</p>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Files */}
        <div className="lg:col-span-2 glass-card p-6 animate-fade-in-up stagger-6">
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
              <FileText size={40} className="mx-auto text-gray-600 mb-3" />
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
                  <div className="w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center shrink-0">
                    <FileText size={18} className="text-gray-400" />
                  </div>
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

export default Dashboard;
