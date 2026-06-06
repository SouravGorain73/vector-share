import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download, Share2, AlertCircle, Loader2, Copy, Check } from 'lucide-react';
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
        const response = await fetch(fileUrl, { method: 'HEAD' });
        if (response.ok) {
          const contentType = response.headers.get('content-type') || '';
          const contentDisposition = response.headers.get('content-disposition') || '';
          const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
          const filename = filenameMatch ? filenameMatch[1] : 'shared-file';

          setFileInfo({
            name: filename,
            type: contentType,
            isImage: contentType.startsWith('image/'),
            isPdf: contentType === 'application/pdf',
          });
        } else if (response.status === 403) {
          setError('This file is private and cannot be accessed.');
        } else {
          setError('File not found or no longer available.');
        }
      } catch {
        setError('Unable to connect to the server.');
      } finally {
        setLoading(false);
      }
    };

    checkFile();
  }, [token, fileUrl]);

  const handleDownload = () => {
    window.open(fileUrl, '_blank');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-orb"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] animate-orb-2"></div>
      </div>

      <div className="w-full max-w-lg relative z-10 animate-fade-in-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-xl shadow-purple-500/25 mb-4">
              <Share2 size={28} className="text-white" />
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-white">VectorShare</h1>
          <p className="mt-1 text-gray-400 text-sm">Shared file</p>
        </div>

        <div className="glass-card p-8">
          {loading ? (
            <div className="text-center py-8">
              <Loader2 size={40} className="mx-auto text-purple-400 animate-spin mb-4" />
              <p className="text-gray-400">Loading file...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto rounded-full bg-red-500/15 flex items-center justify-center mb-4">
                <AlertCircle size={30} className="text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-200">{error}</h3>
              <p className="mt-2 text-sm text-gray-500">
                The file may have been removed or the link has expired.
              </p>
            </div>
          ) : (
            <div>
              <div className="text-center mb-6">
                <FileIcon filename={fileInfo?.name} size={36} className="w-20 h-20 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-1">{fileInfo?.name}</h3>
                <p className="text-sm text-gray-500">{fileInfo?.type || 'File'}</p>
              </div>

              {/* Preview for images */}
              {fileInfo?.isImage && (
                <div className="mb-6 rounded-xl overflow-hidden border border-gray-800/50">
                  <img src={fileUrl} alt={fileInfo.name} className="w-full max-h-96 object-contain bg-gray-900" />
                </div>
              )}

              {/* PDF preview */}
              {fileInfo?.isPdf && (
                <div className="mb-6 rounded-xl overflow-hidden border border-gray-800/50 bg-gray-900">
                  <iframe src={fileUrl} className="w-full h-96" title="PDF Preview" />
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={handleDownload}
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 flex items-center justify-center gap-2"
                >
                  <Download size={18} />
                  Download File
                </button>

                <button
                  onClick={copyLink}
                  className="w-full py-3 px-6 bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700/50 text-gray-300 font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                  {copied ? 'Link Copied!' : 'Copy Share Link'}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-600">
            Shared via <Link to="/" className="text-purple-500/60 hover:text-purple-400 transition-colors">VectorShare</Link> — Secure File Sharing
          </p>
        </div>
      </div>
    </div>
  );
}

export default PublicFileView;
