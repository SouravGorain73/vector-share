import { useState, useEffect } from 'react';
import fileService from '../services/fileService';
import FileIcon from '../components/FileIcon';
import toast from 'react-hot-toast';
import {
  FileText,
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
  ArrowUpDown,
  CheckSquare,
  Square,
  X,
  AlertTriangle,
  FolderGit2,
} from 'lucide-react';

function MyFiles() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [copiedId, setCopiedId] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterVisibility, setFilterVisibility] = useState('all');
  const [selectedFiles, setSelectedFiles] = useState(new Set());
  const [showSortMenu, setShowSortMenu] = useState(false);
  
  // Custom non-native confirmation modal state
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
  });

  const loadFiles = async () => {
    try {
      const data = await fileService.getUserFiles();
      setFiles(data);
    } catch {
      toast.error('Failed to retrieve file registry');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadFiles();
  }, []);

  const openDeleteDialog = (fileId, fileName) => {
    setConfirmDialog({
      isOpen: true,
      title: 'EXPUNGE OBJECT FROM VAULT',
      message: `Are you certain you wish to purge "${fileName}"? This operation cannot be reversed.`,
      onConfirm: () => executeDelete(fileId),
    });
  };

  const executeDelete = async (fileId) => {
    setConfirmDialog({ isOpen: false, title: '', message: '', onConfirm: null });
    setActionLoading(fileId);
    try {
      await fileService.deleteFile(fileId);
      setFiles((prev) => prev.filter((f) => f.id !== fileId));
      setSelectedFiles((prev) => {
        const next = new Set(prev);
        next.delete(fileId);
        return next;
      });
      toast.success('Object expunged from vault');
    } catch {
      toast.error('Purge operation failed');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = (fileId, fileName) => {
    openDeleteDialog(fileId, fileName || 'this file');
  };

  const handleToggleVisibility = async (fileId, currentVisibility) => {
    const newVisibility = currentVisibility === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC';
    setActionLoading(fileId);
    try {
      const updated = await fileService.updateVisibility(fileId, newVisibility);
      setFiles((prev) => prev.map((f) => (f.id === fileId ? updated : f)));
      toast.success(`Access policy switched to ${newVisibility.toLowerCase()}`);
    } catch {
      toast.error('Access policy update failed');
    } finally {
      setActionLoading(null);
    }
  };

  const handleRegenerateLink = async (fileId) => {
    setActionLoading(fileId);
    try {
      const updated = await fileService.regenerateShareLink(fileId);
      setFiles((prev) => prev.map((f) => (f.id === fileId ? updated : f)));
      toast.success('Tokenized share link regenerated');
    } catch {
      toast.error('Link regeneration failed');
    } finally {
      setActionLoading(null);
    }
  };

  const copyShareLink = (fileId, link) => {
    const frontendLink = fileService.getFrontendShareUrl(link);
    navigator.clipboard.writeText(frontendLink);
    setCopiedId(fileId);
    toast.success('Access link copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleSelect = (fileId) => {
    setSelectedFiles((prev) => {
      const next = new Set(prev);
      if (next.has(fileId)) next.delete(fileId); else next.add(fileId);
      return next;
    });
  };

  const selectAll = () => {
    if (selectedFiles.size === processedFiles.length) {
      setSelectedFiles(new Set());
    } else {
      setSelectedFiles(new Set(processedFiles.map((f) => f.id)));
    }
  };

  const openBulkDeleteDialog = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'BULK EXPUNGE OPERATION',
      message: `Purge ${selectedFiles.size} selected object(s) permanently from the repository?`,
      onConfirm: executeBulkDelete,
    });
  };

  const executeBulkDelete = async () => {
    setConfirmDialog({ isOpen: false, title: '', message: '', onConfirm: null });
    const ids = [...selectedFiles];
    for (const id of ids) {
      try {
        await fileService.deleteFile(id);
        setFiles((prev) => prev.filter((f) => f.id !== id));
      } catch { /* continue */ }
    }
    setSelectedFiles(new Set());
    toast.success(`Expunged ${ids.length} object(s) from vault`);
  };

  let processedFiles = files.filter((f) =>
    f.originalFileName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filterVisibility !== 'all') {
    processedFiles = processedFiles.filter((f) => f.visibility === filterVisibility.toUpperCase());
  }

  processedFiles.sort((a, b) => {
    let cmp;
    if (sortBy === 'name') {
      cmp = (a.originalFileName || '').localeCompare(b.originalFileName || '');
    } else if (sortBy === 'size') {
      cmp = (a.fileSize || 0) - (b.fileSize || 0);
    } else {
      cmp = new Date(a.uploadedAt || 0) - new Date(b.uploadedAt || 0);
    }
    return sortOrder === 'asc' ? cmp : -cmp;
  });

  const isBulkMode = selectedFiles.size > 0;

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Dossier Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E3DA]/10">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#D7FF64] mb-1">
            [REGISTRY // INVENTORY GOVERNANCE]
          </div>
          <h1 className="font-display font-extrabold text-2xl lg:text-3xl text-[#FFFFFF] tracking-tight flex items-center gap-3">
            <FolderGit2 size={26} className="text-[#D7FF64]" />
            VAULT ASSET REGISTRY
          </h1>
          <p className="mt-1 text-xs text-[#737373] font-mono">
            {files.length} REPOSITORIED OBJECT{files.length !== 1 ? 'S' : ''} • GRANULAR PROVENANCE AUDIT
          </p>
        </div>
      </div>

      {/* Architectural Filter & Search Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373]" />
          <input
            type="text"
            placeholder="Filter by filename..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#0E1522] border border-[#E5E3DA]/15 rounded text-xs text-[#FFFFFF] placeholder-[#737373] focus:border-[#D7FF64] focus:ring-1 focus:ring-[#D7FF64] transition-colors"
          />
        </div>

        {/* Visibility Filter Tabs */}
        <div className="flex items-center bg-[#0E1522] border border-[#E5E3DA]/15 rounded p-0.5 font-mono text-xs">
          {['all', 'public', 'private'].map((filter) => (
            <button
              key={filter}
              onClick={() => setFilterVisibility(filter)}
              className={`px-3 py-1.5 rounded uppercase tracking-wider text-[11px] transition-colors cursor-pointer ${
                filterVisibility === filter
                  ? 'bg-[#151F2E] text-[#D7FF64] font-bold border border-[#D7FF64]/30'
                  : 'text-[#737373] hover:text-[#FFFFFF]'
              }`}
            >
              [{filter}]
            </button>
          ))}
        </div>

        {/* Sort Menu */}
        <div className="relative">
          <button
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="flex items-center gap-2 px-3 py-2 bg-[#0E1522] border border-[#E5E3DA]/15 rounded text-xs font-mono uppercase text-[#737373] hover:text-[#FFFFFF] hover:border-[#D7FF64]/40 transition-colors cursor-pointer"
          >
            <ArrowUpDown size={13} className="text-[#D7FF64]" />
            <span>Sort: {sortBy} ({sortOrder === 'asc' ? '↑' : '↓'})</span>
          </button>
          {showSortMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-[#0E1522] border border-[#E5E3DA]/20 rounded-md p-1.5 z-30 shadow-2xl animate-slide-down">
              {[
                { value: 'date', label: 'Upload Date' },
                { value: 'name', label: 'File Name' },
                { value: 'size', label: 'File Size' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    if (sortBy === opt.value) {
                      setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'));
                    } else {
                      setSortBy(opt.value);
                      setSortOrder('desc');
                    }
                    setShowSortMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded text-xs font-mono uppercase transition-colors cursor-pointer ${
                    sortBy === opt.value ? 'bg-[#151F2E] text-[#D7FF64] font-bold' : 'text-[#737373] hover:text-[#FFFFFF] hover:bg-[#151F2E]'
                  }`}
                >
                  {opt.label} {sortBy === opt.value && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-[#0E1522] border border-[#E5E3DA]/15 rounded p-0.5">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              viewMode === 'grid' ? 'bg-[#151F2E] text-[#D7FF64]' : 'text-[#737373] hover:text-[#FFFFFF]'
            }`}
            title="Grid Specimen View"
          >
            <LayoutGrid size={15} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              viewMode === 'list' ? 'bg-[#151F2E] text-[#D7FF64]' : 'text-[#737373] hover:text-[#FFFFFF]'
            }`}
            title="List Ledger View"
          >
            <List size={15} />
          </button>
        </div>
      </div>

      {/* Bulk Actions Floating Dock */}
      {isBulkMode && (
        <div className="flex items-center justify-between p-3.5 bg-[#151F2E] border border-[#D7FF64]/40 rounded-lg animate-slide-down">
          <div className="flex items-center gap-3">
            <button
              onClick={selectAll}
              className="flex items-center gap-2 text-xs font-mono text-[#D7FF64] hover:underline cursor-pointer"
            >
              <CheckSquare size={15} />
              <span>{selectedFiles.size === processedFiles.length ? 'DESELECT ALL' : 'SELECT ALL'}</span>
            </button>
            <span className="text-xs font-mono text-[#737373]">|</span>
            <span className="text-xs font-mono text-[#FFFFFF] font-bold">
              [{selectedFiles.size} OBJECTS STAGED]
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={openBulkDeleteDialog}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono font-bold uppercase rounded hover:bg-red-500/20 transition-all cursor-pointer"
            >
              <Trash2 size={13} />
              <span>PURGE SELECTED</span>
            </button>
            <button
              onClick={() => setSelectedFiles(new Set())}
              className="p-1.5 text-[#737373] hover:text-[#FFFFFF] cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Main Files View */}
      {loading ? (
        <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : ''}`}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-40 rounded-lg bg-[#0E1522] border border-[#E5E3DA]/10 animate-shimmer" />
          ))}
        </div>
      ) : processedFiles.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-[#E5E3DA]/10 rounded-lg bg-[#0E1522]/30">
          <div className="w-14 h-14 mx-auto rounded bg-[#151F2E] flex items-center justify-center mb-3 text-[#737373]">
            <FileText size={26} />
          </div>
          <h3 className="font-display font-bold text-base text-[#FFFFFF]">
            {searchQuery || filterVisibility !== 'all' ? 'NO MATCHING OBJECTS LOCATED' : 'VAULT EMPTY'}
          </h3>
          <p className="text-xs font-mono text-[#737373] mt-1">
            {searchQuery || filterVisibility !== 'all' ? 'Modify search query or filter tags' : 'Initiate ingest to populate inventory'}
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        /* Architectural Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {processedFiles.map((file, i) => (
            <div
              key={file.id}
              className={`p-5 rounded-lg border transition-all duration-200 flex flex-col justify-between ${
                selectedFiles.has(file.id)
                  ? 'bg-[#151F2E] border-[#D7FF64] shadow-[0_0_20px_rgba(215,255,100,0.1)]'
                  : 'bg-[#0E1522] border-[#E5E3DA]/10 hover:border-[#D7FF64]/40'
              }`}
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleSelect(file.id); }}
                      className="text-[#737373] hover:text-[#D7FF64] transition-colors cursor-pointer"
                    >
                      {selectedFiles.has(file.id) ? (
                        <CheckSquare size={16} className="text-[#D7FF64]" />
                      ) : (
                        <Square size={16} />
                      )}
                    </button>
                    <FileIcon filename={file.originalFileName} size={18} className="w-8 h-8" />
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase ${
                      file.visibility === 'PUBLIC'
                        ? 'bg-[#D7FF64]/10 text-[#D7FF64] border border-[#D7FF64]/30'
                        : 'bg-[#151F2E] text-[#737373] border border-[#E5E3DA]/15'
                    }`}
                  >
                    {file.visibility}
                  </span>
                </div>

                <h3 className="text-xs font-bold text-[#FFFFFF] truncate mb-1" title={file.originalFileName}>
                  {file.originalFileName}
                </h3>
                <div className="flex items-center gap-2 text-[10px] font-mono text-[#737373] mb-4">
                  <span>{fileService.formatFileSize(file.fileSize)}</span>
                  <span>•</span>
                  <span>{fileService.formatDate(file.uploadedAt)}</span>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center gap-1 pt-3 border-t border-[#E5E3DA]/10">
                {file.shareLink && (
                  <button
                    onClick={() => copyShareLink(file.id, file.shareLink)}
                    className="p-1.5 rounded text-[#737373] hover:text-[#D7FF64] hover:bg-[#151F2E] transition-colors cursor-pointer"
                    title="Copy tokenized link"
                  >
                    {copiedId === file.id ? <Check size={14} className="text-[#D7FF64]" /> : <Copy size={14} />}
                  </button>
                )}
                <button
                  onClick={() => handleToggleVisibility(file.id, file.visibility)}
                  disabled={actionLoading === file.id}
                  className="p-1.5 rounded text-[#737373] hover:text-[#FFFFFF] hover:bg-[#151F2E] transition-colors disabled:opacity-40 cursor-pointer"
                  title="Toggle access policy"
                >
                  {file.visibility === 'PUBLIC' ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
                <button
                  onClick={() => handleRegenerateLink(file.id)}
                  disabled={actionLoading === file.id}
                  className="p-1.5 rounded text-[#737373] hover:text-[#D7FF64] hover:bg-[#151F2E] transition-colors disabled:opacity-40 cursor-pointer"
                  title="Regenerate token URL"
                >
                  <RefreshCw size={14} className={actionLoading === file.id ? 'animate-spin' : ''} />
                </button>
                {file.shareLink && (
                  <a
                    href={fileService.getFrontendShareUrl(file.shareLink)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded text-[#737373] hover:text-[#D7FF64] hover:bg-[#151F2E] transition-colors"
                    title="Open share view in new tab"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
                <div className="flex-1" />
                <button
                  onClick={() => handleDelete(file.id, file.originalFileName)}
                  disabled={actionLoading === file.id}
                  className="p-1.5 rounded text-[#737373] hover:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-40 cursor-pointer"
                  title="Purge object"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* High-Density Tabular Ledger View */
        <div className="bg-[#0E1522] border border-[#E5E3DA]/10 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-[#E5E3DA]/10 bg-[#111827] text-[11px] font-mono uppercase text-[#737373]">
                  <th className="px-4 py-3 w-10">
                    <button onClick={selectAll} className="text-[#737373] hover:text-[#D7FF64] cursor-pointer">
                      {selectedFiles.size === processedFiles.length && processedFiles.length > 0 ? (
                        <CheckSquare size={15} className="text-[#D7FF64]" />
                      ) : (
                        <Square size={15} />
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3">SPECIMEN</th>
                  <th className="px-4 py-3">SIZE</th>
                  <th className="px-4 py-3">POLICY</th>
                  <th className="px-4 py-3">INGESTED</th>
                  <th className="px-4 py-3 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E3DA]/5 font-mono">
                {processedFiles.map((file) => (
                  <tr
                    key={file.id}
                    className={`hover:bg-[#151F2E] transition-colors ${
                      selectedFiles.has(file.id) ? 'bg-[#151F2E]' : ''
                    }`}
                  >
                    <td className="px-4 py-3">
                      <button onClick={() => toggleSelect(file.id)} className="text-[#737373] hover:text-[#D7FF64] cursor-pointer">
                        {selectedFiles.has(file.id) ? <CheckSquare size={15} className="text-[#D7FF64]" /> : <Square size={15} />}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <FileIcon filename={file.originalFileName} size={16} className="w-7 h-7 shrink-0" />
                        <span className="text-xs font-bold text-[#FFFFFF] truncate max-w-xs">{file.originalFileName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[#737373]">{fileService.formatFileSize(file.fileSize)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                          file.visibility === 'PUBLIC'
                            ? 'bg-[#D7FF64]/10 text-[#D7FF64] border border-[#D7FF64]/30'
                            : 'bg-[#151F2E] text-[#737373] border border-[#E5E3DA]/15'
                        }`}
                      >
                        {file.visibility}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#737373]">{fileService.formatDate(file.uploadedAt)}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {file.shareLink && (
                          <button
                            onClick={() => copyShareLink(file.id, file.shareLink)}
                            className="p-1.5 rounded text-[#737373] hover:text-[#D7FF64] transition-colors cursor-pointer"
                            title="Copy link"
                          >
                            {copiedId === file.id ? <Check size={14} className="text-[#D7FF64]" /> : <Copy size={14} />}
                          </button>
                        )}
                        <button
                          onClick={() => handleToggleVisibility(file.id, file.visibility)}
                          disabled={actionLoading === file.id}
                          className="p-1.5 rounded text-[#737373] hover:text-[#FFFFFF] transition-colors disabled:opacity-40 cursor-pointer"
                          title="Toggle policy"
                        >
                          {file.visibility === 'PUBLIC' ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                        <button
                          onClick={() => handleRegenerateLink(file.id)}
                          disabled={actionLoading === file.id}
                          className="p-1.5 rounded text-[#737373] hover:text-[#D7FF64] transition-colors disabled:opacity-40 cursor-pointer"
                          title="Regenerate token"
                        >
                          <RefreshCw size={14} className={actionLoading === file.id ? 'animate-spin' : ''} />
                        </button>
                        <button
                          onClick={() => handleDelete(file.id, file.originalFileName)}
                          disabled={actionLoading === file.id}
                          className="p-1.5 rounded text-[#737373] hover:text-red-400 transition-colors disabled:opacity-40 cursor-pointer"
                          title="Purge"
                        >
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

      {/* Custom Non-Native Confirmation Modal */}
      {confirmDialog.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0E1522] border border-[#E5E3DA]/20 rounded-lg max-w-md w-full p-6 shadow-2xl animate-scale-in">
            <div className="flex items-center gap-3 text-red-400 mb-3">
              <AlertTriangle size={20} />
              <h3 className="font-display font-extrabold text-sm tracking-wider uppercase text-[#FFFFFF]">
                {confirmDialog.title}
              </h3>
            </div>
            <p className="text-xs text-[#737373] font-mono leading-relaxed mb-6">
              {confirmDialog.message}
            </p>
            <div className="flex items-center justify-end gap-3 font-mono text-xs">
              <button
                onClick={() => setConfirmDialog({ isOpen: false, title: '', message: '', onConfirm: null })}
                className="px-4 py-2 bg-[#151F2E] hover:bg-[#1E2B3E] text-[#F5F3EB] rounded transition-colors cursor-pointer"
              >
                CANCEL
              </button>
              <button
                onClick={confirmDialog.onConfirm}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-400 font-bold rounded transition-colors cursor-pointer"
              >
                CONFIRM EXPUNGE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close sort menu */}
      {showSortMenu && <div className="fixed inset-0 z-20" onClick={() => setShowSortMenu(false)} />}
    </div>
  );
}

export default MyFiles;
