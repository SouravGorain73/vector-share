import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Download,
  Share2,
  AlertCircle,
  Loader2,
  Copy,
  Check,
  ExternalLink
} from 'lucide-react';
import FileIcon from '../components/FileIcon';

function PublicFileView() {
  const { token } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [copied, setCopied] = useState(false);

  const API_BASE =
    import.meta.env.VITE_API_BASE_URL ||
    'http://localhost:8080/api/v1';

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
            'This file is private and cannot be accessed.'
          );
        } else {
          setError(
            'File not found or no longer available.'
          );
        }
      } catch (err) {
        setError('Unable to connect to the server.');
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
    await navigator.clipboard.writeText(
      window.location.href
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-10 relative overflow-hidden">
      {/* Background Blur Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-32 w-112.5 h-112.5 bg-purple-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 -right-32 w-112.5 h-112.5 bg-indigo-500/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <Share2 size={22} className="text-white" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-white">
                VectorShare
              </h1>
              <p className="text-xs text-gray-400">
                Secure File Sharing
              </p>
            </div>
          </Link>

          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm border border-emerald-500/20">
            Public Link
          </span>
        </div>

        {/* Main Card */}
        <div className="glass-card bg-gray-900/50 border border-gray-800 rounded-3xl p-6 backdrop-blur-xl">

          {loading ? (
            <div className="py-24 text-center">
              <Loader2
                size={48}
                className="mx-auto text-purple-400 animate-spin"
              />
              <p className="mt-4 text-gray-400">
                Loading file...
              </p>
            </div>
          ) : error ? (
            <div className="py-24 text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-red-500/10 flex items-center justify-center mb-5">
                <AlertCircle
                  size={36}
                  className="text-red-400"
                />
              </div>

              <h3 className="text-xl font-semibold text-white">
                {error}
              </h3>

              <p className="mt-3 text-gray-500">
                The file may have been removed,
                expired, or access is restricted.
              </p>
            </div>
          ) : (
            <>
              {/* File Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

                <div className="flex items-center gap-4">
                  <FileIcon
                    filename={fileInfo?.name}
                    size={42}
                    className="w-16 h-16"
                  />

                  <div>
                    <h2 className="text-xl font-semibold text-white break-all">
                      {fileInfo?.name}
                    </h2>

                    <p className="text-gray-400 text-sm">
                      {fileInfo?.type || 'File'}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">

                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-linear-to-r from-purple-500 to-indigo-600 text-white font-medium hover:scale-[1.02] transition"
                  >
                    <Download size={18} />
                    Download
                  </button>

                  <button
                    onClick={handleOpen}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 transition"
                  >
                    <ExternalLink size={18} />
                    Open
                  </button>

                  <button
                    onClick={copyLink}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 transition"
                  >
                    {copied ? (
                      <>
                        <Check
                          size={18}
                          className="text-emerald-400"
                        />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy size={18} />
                        Copy Link
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Image Preview */}
              {fileInfo?.isImage && (
                <div className="rounded-2xl overflow-hidden border border-gray-800 bg-black">
                  <img
                    src={fileUrl}
                    alt={fileInfo?.name}
                    className="w-full max-h-[80vh] object-contain"
                  />
                </div>
              )}

              {/* PDF Preview */}
              {fileInfo?.isPdf && (
                <div className="rounded-2xl overflow-hidden border border-gray-800 bg-gray-900">
                  <iframe
                    src={fileUrl}
                    title="PDF Preview"
                    className="w-full h-[80vh]"
                  />
                </div>
              )}

              {/* Unsupported File */}
              {!fileInfo?.isImage &&
                !fileInfo?.isPdf && (
                  <div className="py-20 text-center">
                    <FileIcon
                      filename={fileInfo?.name}
                      size={80}
                      className="mx-auto"
                    />

                    <h3 className="mt-6 text-lg font-medium text-white">
                      Preview not available
                    </h3>

                    <p className="mt-2 text-gray-400">
                      This file type cannot be
                      previewed in the browser.
                    </p>

                    <button
                      onClick={handleDownload}
                      className="mt-6 px-6 py-3 rounded-xl bg-linear-to-r from-purple-500 to-indigo-600 text-white"
                    >
                      Download File
                    </button>
                  </div>
                )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            Shared securely via{' '}
            <Link
              to="/"
              className="text-purple-400 hover:text-purple-300"
            >
              VectorShare
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PublicFileView;