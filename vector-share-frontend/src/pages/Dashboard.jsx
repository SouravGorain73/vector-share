import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import fileService from '../services/fileService';
import FileIcon from '../components/FileIcon';
import {
  FolderOpen,
  Globe,
  Lock,
  HardDrive,
  Upload,
  ExternalLink,
  Clock,
  ArrowRight,
  ShieldCheck,
  Activity,
  Layers,
} from 'lucide-react';

function useCountUp(target, duration = 800) {
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

  const animatedTotal = useCountUp(loading ? 0 : totalFiles);
  const animatedPublic = useCountUp(loading ? 0 : publicFiles);
  const animatedPrivate = useCountUp(loading ? 0 : privateFiles);

  const typeDistribution = files.reduce((acc, f) => {
    const ext = f.originalFileName?.split('.').pop()?.toLowerCase() || 'other';
    const category = getFileCategory(ext);
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const typeColorClasses = {
    Images: 'bg-pink-400',
    Documents: 'bg-blue-400',
    Code: 'bg-yellow-400',
    Media: 'bg-teal-400',
    Archives: 'bg-amber-400',
    Other: 'bg-[#D7FF64]',
  };

  const stats = [
    {
      code: '01',
      label: 'TOTAL OBJECTS',
      value: animatedTotal,
      sublabel: 'Encrypted items',
      icon: FolderOpen,
      accent: 'text-[#D7FF64]',
    },
    {
      code: '02',
      label: 'PUBLIC DISPATCHES',
      value: animatedPublic,
      sublabel: 'Tokenized links active',
      icon: Globe,
      accent: 'text-emerald-400',
    },
    {
      code: '03',
      label: 'PRIVATE ENCLAVES',
      value: animatedPrivate,
      sublabel: 'Zero-access credentials',
      icon: Lock,
      accent: 'text-amber-400',
    },
    {
      code: '04',
      label: 'STORAGE FOOTPRINT',
      value: fileService.formatFileSize(totalSize),
      sublabel: 'Allocated repository space',
      icon: HardDrive,
      accent: 'text-[#FFFFFF]',
    },
  ];

  const maxStorage = 500 * 1024 * 1024; // 500 MB
  const storagePercent = Math.min((totalSize / maxStorage) * 100, 100);

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      
      {/* Console Dossier Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E5E3DA]/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#D7FF64] mb-1">
            <Activity size={14} />
            <span>[TELEMETRY // VAULT STATUS]</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl lg:text-3xl text-[#FFFFFF] tracking-tight">
            REPOSITORY CONSOLE // <span className="text-[#D7FF64]">{user?.name || 'OPERATOR'}</span>
          </h1>
          <p className="text-xs text-[#737373] mt-1 font-mono">
            LIVE CRYPTOGRAPHIC ALLOCATION • TLS 1.3 PROVENANCE VERIFIED
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/upload')}
            className="group flex items-center gap-2 px-5 py-2.5 rounded bg-[#D7FF64] hover:bg-[#c9f550] text-[#111827] font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm cursor-pointer"
          >
            <Upload size={14} />
            <span>Upload New File</span>
          </button>
        </div>
      </div>

      {/* 4-Column Asymmetric Telemetry Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`bg-[#0E1522] border border-[#E5E3DA]/10 rounded-lg p-5 hover:border-[#D7FF64]/30 transition-all duration-200 animate-fade-in-up stagger-${i + 1}`}
          >
            <div className="flex items-center justify-between text-xs font-mono text-[#737373] mb-4">
              <span>[{stat.code}] {stat.label}</span>
              <stat.icon size={16} className={stat.accent} />
            </div>
            <div className="font-display font-extrabold text-3xl sm:text-4xl text-[#FFFFFF]">
              {loading ? '—' : stat.value}
            </div>
            <div className="text-[11px] font-mono text-[#737373] mt-2">
              {stat.sublabel}
            </div>
          </div>
        ))}
      </div>

      {/* Storage Meter & File Type Gauges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Storage Deck */}
        <div className="bg-[#0E1522] border border-[#E5E3DA]/10 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-base text-[#FFFFFF] flex items-center gap-2">
              <HardDrive size={18} className="text-[#D7FF64]" />
              STORAGE CAPACITY QUOTA
            </h2>
            <span className="text-xs font-mono text-[#D7FF64] font-bold">
              {loading ? '—' : `${storagePercent.toFixed(1)}%`}
            </span>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-xs font-mono text-[#737373] mb-2">
              <span>CONSUMED: {fileService.formatFileSize(totalSize)}</span>
              <span>QUOTA: 500 MB</span>
            </div>
            <div className="w-full h-2.5 bg-[#151F2E] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#D7FF64] rounded-full transition-all duration-300"
                style={{ width: loading ? '0%' : `${storagePercent}%` }}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#E5E3DA]/10 flex items-center justify-between text-[11px] font-mono text-[#737373]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-[#D7FF64]" />
              ZERO-KNOWLEDGE RETENTION
            </span>
            <button
              onClick={() => navigate('/subscription')}
              className="text-[#D7FF64] hover:underline"
            >
              UPGRADE ALLOCATION →
            </button>
          </div>
        </div>

        {/* File Type Distribution */}
        <div className="bg-[#0E1522] border border-[#E5E3DA]/10 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-base text-[#FFFFFF] flex items-center gap-2">
              <Layers size={18} className="text-[#D7FF64]" />
              OBJECT CATEGORY GAUGES
            </h2>
            <span className="text-xs font-mono text-[#737373]">
              {Object.keys(typeDistribution).length} CATEGORIES
            </span>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-5 bg-[#151F2E] rounded animate-shimmer" />
              ))}
            </div>
          ) : Object.keys(typeDistribution).length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-[#737373]">
              NO ASSETS REGISTERED IN VAULT
            </div>
          ) : (
            <div className="space-y-3.5">
              {Object.entries(typeDistribution)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([category, count]) => (
                  <div key={category} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#F5F3EB]">{category}</span>
                      <span className="text-[#737373]">
                        {count} items ({( (count / totalFiles) * 100 ).toFixed(0)}%)
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[#151F2E] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${typeColorClasses[category] || typeColorClasses.Other}`}
                        style={{ width: `${(count / totalFiles) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

      </div>

      {/* Quick Action Dock + Recent Files Registry */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Quick Actions */}
        <div className="bg-[#0E1522] border border-[#E5E3DA]/10 rounded-lg p-6 flex flex-col justify-between">
          <div>
            <h2 className="font-display font-bold text-base text-[#FFFFFF] mb-4">
              CONDUIT SHORTCUTS
            </h2>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/upload')}
                className="w-full flex items-center justify-between p-3.5 rounded bg-[#151F2E] border border-[#E5E3DA]/10 hover:border-[#D7FF64]/50 transition-all text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#111827] flex items-center justify-center text-[#D7FF64]">
                    <Upload size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-[#FFFFFF] group-hover:text-[#D7FF64] transition-colors">
                      UPLOAD ASSET
                    </div>
                    <div className="text-[11px] text-[#737373]">Drag-and-drop file ingestion</div>
                  </div>
                </div>
                <ArrowRight size={14} className="text-[#737373] group-hover:text-[#D7FF64] group-hover:translate-x-1 transition-all" />
              </button>

              <button
                onClick={() => navigate('/myfiles')}
                className="w-full flex items-center justify-between p-3.5 rounded bg-[#151F2E] border border-[#E5E3DA]/10 hover:border-[#D7FF64]/50 transition-all text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#111827] flex items-center justify-center text-[#F5F3EB]">
                    <FolderOpen size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-[#FFFFFF] group-hover:text-[#D7FF64] transition-colors">
                      FILE REGISTRY
                    </div>
                    <div className="text-[11px] text-[#737373]">Inspect and govern shared files</div>
                  </div>
                </div>
                <ArrowRight size={14} className="text-[#737373] group-hover:text-[#D7FF64] group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E5E3DA]/10 text-[11px] font-mono text-[#737373]">
            STATUS: PIPELINE ONLINE
          </div>
        </div>

        {/* Recent Files High-Density Ledger */}
        <div className="lg:col-span-2 bg-[#0E1522] border border-[#E5E3DA]/10 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-base text-[#FFFFFF] flex items-center gap-2">
              <Clock size={16} className="text-[#D7FF64]" />
              RECENT INGESTED OBJECTS
            </h2>
            <button
              onClick={() => navigate('/myfiles')}
              className="text-xs font-mono text-[#D7FF64] hover:underline"
            >
              VIEW ALL REGISTRY →
            </button>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-14 bg-[#151F2E] rounded animate-shimmer" />
              ))}
            </div>
          ) : recentFiles.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-[#E5E3DA]/10 rounded">
              <FolderOpen size={28} className="mx-auto text-[#737373] mb-2" />
              <p className="text-xs font-mono text-[#FFFFFF]">NO OBJECTS COMMITTED</p>
              <p className="text-[11px] text-[#737373] mt-1 font-mono">Upload an asset to populate telemetry</p>
            </div>
          ) : (
            <div className="divide-y divide-[#E5E3DA]/10">
              {recentFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between py-3 px-2 hover:bg-[#151F2E] rounded transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <FileIcon filename={file.originalFileName} size={16} className="w-8 h-8 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[#FFFFFF] truncate max-w-xs sm:max-w-md">
                        {file.originalFileName}
                      </p>
                      <p className="text-[10px] font-mono text-[#737373]">
                        {fileService.formatFileSize(file.fileSize)} • {fileService.formatDate(file.uploadedAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase ${
                        file.visibility === 'PUBLIC'
                          ? 'bg-[#D7FF64]/10 text-[#D7FF64] border border-[#D7FF64]/30'
                          : 'bg-[#151F2E] text-[#737373] border border-[#E5E3DA]/15'
                      }`}
                    >
                      {file.visibility}
                    </span>

                    {file.shareLink && (
                      <a
                        href={file.shareLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded text-[#737373] hover:text-[#D7FF64] transition-colors"
                        title="View Public Share"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
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
