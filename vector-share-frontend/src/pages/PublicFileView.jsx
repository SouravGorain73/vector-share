import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FileText, Download, Share2, AlertCircle, Loader2 } from 'lucide-react';

function PublicFileView() {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);

  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';
  const fileUrl = `${API_BASE}/files/share/${token}`;

  useEffect(() => {
    // Try to fetch the file to check if it exists
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
            isPreviewable: contentType.startsWith('image/') || contentType === 'application/pdf',
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

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-lg relative z-10 animate-fade-in-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-xl shadow-purple-500/25 mb-4">
            <Share2 size={28} className="text-white" />
          </div>
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
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gray-800/60 flex items-center justify-center mb-6">
                <FileText size={36} className="text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">{fileInfo?.name}</h3>
              <p className="text-sm text-gray-500 mb-6">{fileInfo?.type || 'File'}</p>

              {/* Preview for images */}
              {fileInfo?.isPreviewable && fileInfo.type.startsWith('image/') && (
                <div className="mb-6 rounded-xl overflow-hidden border border-gray-800/50">
                  <img src={fileUrl} alt={fileInfo.name} className="w-full max-h-96 object-contain bg-gray-900" />
                </div>
              )}

              <button
                onClick={handleDownload}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 flex items-center justify-center gap-2"
              >
                <Download size={18} />
                Download File
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-600">
            Shared via VectorShare — Secure File Sharing
          </p>
        </div>
      </div>
    </div>
  );
}

export default PublicFileView;
