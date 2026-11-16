import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Download,
  Share2,
  AlertCircle,
  Loader2,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import toast from 'react-hot-toast';
import FileIcon from '../components/FileIcon';
import ThemeToggle from '../components/ThemeToggle';

function PublicFileView() {
  const { token } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [copied, setCopied] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';
  const fileUrl = `${API_BASE}/files/share/${token}`;

  useEffect(() => {
    const checkFile = async () => {
      try {
        const response = await fetch(fileUrl);

        if (response.ok) {
          const contentType =
            response.headers.get('content-type') || '';

          const contentDisposition =
            response.headers.get('content-disposition') || '';

          const filenameMatch =
            contentDisposition.match(/filename="?([^"]+)"?/);

          const filename = filenameMatch
            ? filenameMatch[1]
            : 'Shared File';

          setFileInfo({
            name: filename,
            type: contentType,
            isImage: contentType.startsWith('image/'),
            isPdf: contentType.includes('pdf'),
          });
        } else if (response.status === 403) {
          setError(
            'This file is private or requires authorization to view.'
          );
        } else {
          setError(
            'File not found or this sharing link has expired.'
          );
        }
      } catch {
        setError('Unable to connect to the server. Please check your internet connection and try again.');
      } finally {
        setLoading(false);
      }
    };

    checkFile();
  }, [fileUrl]);

  const handleDownload = () => {
    window.open(fileUrl, '_blank');
  };

  const handleOpen = () => {
    window.open(fileUrl, '_blank');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success('Sharing link copied to clipboard!');
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      toast.error('Failed to copy link');
    }
  };

  return (
    <div className="min-h-screen bg-app text-primary px-4 py-10 relative overflow-hidden bg-grid-technical font-sans transition-colors">
      <div className="max-w-6xl mx-auto relative z-10 space-y-6 animate-fade-in">

        {/* Presentation Header */}
        <div className="flex items-center justify-between pb-6 border-b border-border">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-surface-elevated border border-border flex items-center justify-center text-accent group-hover:border-accent transition-colors">
              <Share2 size={20} />
            </div>
            <div>
              <span className="font-display font-bold text-base tracking-tight text-primary">
                VECTOR<span className="text-accent">SHARE</span>
              </span>
              <p className="text-[10px] font-mono tracking-widest text-muted uppercase">
                Secure Public File Share
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-elevated border border-border text-xs font-semibold text-accent">
              <ShieldCheck size={14} />
              <span>Verified Link</span>
            </div>
          </div>
        </div>

        {/* Gallery Stage Canvas */}
        <div className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-2xl">

          {loading ? (
            <div className="py-28 text-center space-y-4">
              <Loader2 size={36} className="mx-auto text-accent animate-spin" />
              <p className="text-xs font-medium text-secondary tracking-wider">
                Loading file preview...
              </p>
            </div>
          ) : error ? (
            <div className="py-24 text-center max-w-md mx-auto space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500">
                <AlertCircle size={28} />
              </div>
              <div className="text-[11px] font-semibold text-red-500 uppercase tracking-widest">
                Unable to Load File
              </div>
              <h3 className="font-display font-bold text-xl text-primary">
                {error}
              </h3>
              <p className="text-sm text-secondary font-sans leading-relaxed">
                This file may have been deleted, made private by the owner, or the sharing link has expired.
              </p>
              <div className="pt-4">
                <Link
                  to="/"
                  className="inline-flex items-center px-5 py-2.5 bg-surface-elevated hover:bg-card-hover border border-border text-primary font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  Back to VectorShare
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* File Meta Header & Actions */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 mb-6 border-b border-border">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="p-2 rounded-lg bg-surface-elevated border border-border shrink-0">
                    <FileIcon
                      filename={fileInfo?.name}
                      size={28}
                      className="w-10 h-10"
                    />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-display font-bold text-lg sm:text-xl text-primary truncate break-all">
                      {fileInfo?.name}
                    </h2>
                    <p className="text-xs text-muted mt-0.5">
                      File type: {fileInfo?.type || 'Document'}
                    </p>
                  </div>
                </div>

                {/* Action CTAs */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-accent-contrast font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                  >
                    <Download size={15} />
                    <span>Download File</span>
                  </button>

                  <button
                    onClick={handleOpen}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-elevated hover:bg-card-hover border border-border text-primary font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <ExternalLink size={14} />
                    <span>Open in Tab</span>
                  </button>

                  <button
                    onClick={copyLink}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-elevated hover:bg-card-hover border border-border text-primary font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-accent" />
                        <span className="text-accent">Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Gallery Image Stage */}
              {fileInfo?.isImage && (
                <div className="rounded-xl overflow-hidden border border-border bg-surface-muted p-3 flex items-center justify-center">
                  <img
                    src={fileUrl}
                    alt={fileInfo?.name}
                    className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-sm"
                  />
                </div>
              )}

              {/* Document PDF Stage */}
              {fileInfo?.isPdf && (
                <div className="rounded-xl overflow-hidden border border-border bg-surface-muted">
                  <iframe
                    src={fileUrl}
                    title="PDF File Preview"
                    className="w-full h-[75vh] border-0"
                  />
                </div>
              )}

              {/* Unsupported Preview Fallback */}
              {!fileInfo?.isImage && !fileInfo?.isPdf && (
                <div className="py-24 text-center border border-dashed border-border rounded-xl bg-surface-muted/60 space-y-4 px-6">
                  <div className="w-16 h-16 mx-auto rounded-xl bg-surface-elevated border border-border flex items-center justify-center shadow-sm">
                    <FileIcon
                      filename={fileInfo?.name}
                      size={32}
                    />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-primary">
                      Preview Not Available
                    </h3>
                    <p className="text-xs text-secondary mt-1.5 max-w-sm mx-auto font-sans leading-relaxed">
                      This file type cannot be previewed directly in your browser. Download the file to view its contents.
                    </p>
                  </div>
                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent hover:bg-accent-hover text-accent-contrast font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                  >
                    <Download size={15} />
                    <span>Download File</span>
                  </button>
                </div>
              )}
            </>
          )}

        </div>

        {/* Ledger Base */}
        <div className="text-center pt-2">
          <p className="text-xs font-sans text-muted">
            Shared securely via{' '}
            <Link to="/" className="text-accent hover:underline font-semibold">
              VectorShare
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default PublicFileView;
