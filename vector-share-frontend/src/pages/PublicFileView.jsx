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
import FileIcon from '../components/FileIcon';

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
            'This file is marked private or access credentials are required.'
          );
        } else {
          setError(
            'Specimen not located or link expired.'
          );
        }
      } catch {
        setError('Unable to establish transmission conduit to the vault server.');
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
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#111827] text-[#F5F3EB] px-4 py-10 relative overflow-hidden bg-grid-technical font-sans">
      <div className="max-w-6xl mx-auto relative z-10 space-y-6 animate-fade-in">

        {/* Presentation Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#E5E3DA]/10">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded bg-[#151F2E] border border-[#D7FF64]/40 flex items-center justify-center text-[#D7FF64] group-hover:border-[#D7FF64] transition-colors">
              <Share2 size={20} />
            </div>
            <div>
              <span className="font-display font-bold text-base tracking-tight text-[#FFFFFF]">
                VECTOR<span className="text-[#D7FF64]">SHARE</span>
              </span>
              <p className="text-[10px] font-mono tracking-widest text-[#737373] uppercase">
                PUBLIC TRANSMISSION CONDUIT
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2 px-3 py-1 rounded bg-[#151F2E] border border-[#D7FF64]/30 text-xs font-mono text-[#D7FF64]">
            <ShieldCheck size={14} />
            <span>TOKEN VERIFIED</span>
          </div>
        </div>

        {/* Gallery Stage Canvas */}
        <div className="bg-[#0E1522] border border-[#E5E3DA]/15 rounded-lg p-6 sm:p-8 shadow-2xl">

          {loading ? (
            <div className="py-28 text-center space-y-4">
              <Loader2 size={36} className="mx-auto text-[#D7FF64] animate-spin" />
              <p className="text-xs font-mono text-[#737373] uppercase tracking-wider">
                PROBING VAULT CONDUIT & METADATA...
              </p>
            </div>
          ) : error ? (
            <div className="py-24 text-center max-w-md mx-auto space-y-4">
              <div className="w-14 h-14 mx-auto rounded bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                <AlertCircle size={28} />
              </div>
              <div className="text-[11px] font-mono text-red-400 uppercase tracking-widest">
                [TRANSMISSION FAULT]
              </div>
              <h3 className="font-display font-extrabold text-xl text-[#FFFFFF]">
                {error}
              </h3>
              <p className="text-xs text-[#737373] font-mono leading-relaxed">
                The requested asset may have been expunged, restricted to private access, or the tokenized route has expired.
              </p>
              <div className="pt-4">
                <Link
                  to="/"
                  className="inline-flex items-center px-5 py-2.5 bg-[#151F2E] hover:bg-[#1E2B3E] border border-[#E5E3DA]/20 text-[#F5F3EB] font-mono text-xs uppercase tracking-wider rounded transition-colors"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* File Meta Header & Actions */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 mb-6 border-b border-[#E5E3DA]/10">
                <div className="flex items-center gap-4 min-w-0">
                  <FileIcon
                    filename={fileInfo?.name}
                    size={28}
                    className="w-12 h-12 shrink-0"
                  />
                  <div className="min-w-0">
                    <h2 className="font-display font-extrabold text-lg sm:text-xl text-[#FFFFFF] truncate break-all">
                      {fileInfo?.name}
                    </h2>
                    <p className="text-xs font-mono text-[#737373] mt-0.5">
                      MIME: {fileInfo?.type || 'UNKNOWN/OCTET-STREAM'}
                    </p>
                  </div>
                </div>

                {/* Action CTAs */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-5 py-2.5 rounded bg-[#D7FF64] hover:bg-[#c9f550] text-[#111827] font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                  >
                    <Download size={15} />
                    <span>Download File</span>
                  </button>

                  <button
                    onClick={handleOpen}
                    className="flex items-center gap-2 px-4 py-2.5 rounded bg-[#151F2E] hover:bg-[#1E2B3E] border border-[#E5E3DA]/15 text-[#F5F3EB] font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <ExternalLink size={14} />
                    <span>Open in Tab</span>
                  </button>

                  <button
                    onClick={copyLink}
                    className="flex items-center gap-2 px-4 py-2.5 rounded bg-[#151F2E] hover:bg-[#1E2B3E] border border-[#E5E3DA]/15 text-[#F5F3EB] font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-[#D7FF64]" />
                        <span className="text-[#D7FF64]">Link Copied</span>
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
                <div className="rounded-lg overflow-hidden border border-[#E5E3DA]/10 bg-[#0A0E17] p-2 flex items-center justify-center">
                  <img
                    src={fileUrl}
                    alt={fileInfo?.name}
                    className="max-h-[75vh] w-auto max-w-full object-contain rounded"
                  />
                </div>
              )}

              {/* Document PDF Stage */}
              {fileInfo?.isPdf && (
                <div className="rounded-lg overflow-hidden border border-[#E5E3DA]/10 bg-[#0A0E17]">
                  <iframe
                    src={fileUrl}
                    title="PDF Specimen Preview"
                    className="w-full h-[75vh] border-0"
                  />
                </div>
              )}

              {/* Unsupported Preview Fallback */}
              {!fileInfo?.isImage && !fileInfo?.isPdf && (
                <div className="py-24 text-center border border-dashed border-[#E5E3DA]/10 rounded-lg bg-[#0A0E17]/40 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded bg-[#151F2E] border border-[#E5E3DA]/20 flex items-center justify-center">
                    <FileIcon
                      filename={fileInfo?.name}
                      size={32}
                    />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-[#FFFFFF]">
                      Direct Preview Not Applicable
                    </h3>
                    <p className="text-xs font-mono text-[#737373] mt-1 max-w-sm mx-auto">
                      This asset binary cannot be natively rendered inside the browser frame. Download directly to access.
                    </p>
                  </div>
                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#D7FF64] hover:bg-[#c9f550] text-[#111827] font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    <Download size={15} />
                    <span>Download Binary Specimen</span>
                  </button>
                </div>
              )}
            </>
          )}

        </div>

        {/* Ledger Base */}
        <div className="text-center pt-2">
          <p className="text-xs font-mono text-[#737373]">
            DISPATCHED SECURELY VIA{' '}
            <Link to="/" className="text-[#D7FF64] hover:underline font-bold">
              VECTORSHARE ARCHITECTURE
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default PublicFileView;
