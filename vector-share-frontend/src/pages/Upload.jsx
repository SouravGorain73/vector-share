import React, { useState, useRef, useCallback } from 'react';
import fileService from '../services/fileService';
import toast from 'react-hot-toast';
import {
  Upload as UploadIcon,
  CloudUpload,
  FileText,
  Globe,
  Lock,
  Check,
  Copy,
  X,
} from 'lucide-react';

function Upload() {
  const [file, setFile] = useState(null);
  const [visibility, setVisibility] = useState('PUBLIC');
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      setFile(e.dataTransfer.files[0]);
      setUploadResult(null);
    }
  }, []);

  const handleFileSelect = (e) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setUploadResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }

    setUploading(true);
    try {
      const result = await fileService.uploadFile(file, visibility);
      setUploadResult(result);
      toast.success('File uploaded successfully!');
    } catch (err) {
      const msg = err.response?.data?.message || 'Upload failed';
      toast.error(msg);
    } finally {
      setUploading(false);
    }
  };

  const copyShareLink = () => {
    if (uploadResult?.shareLink) {
      navigator.clipboard.writeText(uploadResult.shareLink);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const resetUpload = () => {
    setFile(null);
    setUploadResult(null);
    setCopied(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="page-enter max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3">
          <UploadIcon size={28} className="text-purple-400" />
          Upload File
        </h1>
        <p className="mt-1 text-gray-400">Share your files securely with anyone</p>
      </div>

      {!uploadResult ? (
        <div className="glass-card p-8 animate-fade-in-up">
          {/* Dropzone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300
              ${dragActive
                ? 'border-purple-500 bg-purple-500/5'
                : file
                  ? 'border-emerald-500/50 bg-emerald-500/5'
                  : 'border-gray-700/50 hover:border-purple-500/30 hover:bg-gray-800/30'
              }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              id="file-input"
            />

            {file ? (
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto rounded-xl bg-emerald-500/15 flex items-center justify-center">
                  <FileText size={30} className="text-emerald-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-lg">{file.name}</p>
                  <p className="text-gray-400 text-sm mt-1">{fileService.formatFileSize(file.size)}</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); resetUpload(); }}
                  className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-red-400 transition-colors"
                >
                  <X size={14} />
                  Remove
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gray-800/60 flex items-center justify-center animate-float">
                  <CloudUpload size={36} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-lg">Drop your file here</p>
                  <p className="text-gray-500 text-sm mt-1">or click to browse from your computer</p>
                </div>
              </div>
            )}
          </div>

          {/* Visibility */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-300 mb-3">File Visibility</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setVisibility('PUBLIC')}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 ${
                  visibility === 'PUBLIC'
                    ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                    : 'border-gray-700/50 bg-gray-800/30 text-gray-400 hover:border-gray-600/50'
                }`}
              >
                <Globe size={20} />
                <div className="text-left">
                  <p className="font-semibold text-sm">Public</p>
                  <p className="text-xs opacity-70">Anyone with link</p>
                </div>
              </button>
              <button
                onClick={() => setVisibility('PRIVATE')}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 ${
                  visibility === 'PRIVATE'
                    ? 'border-amber-500/50 bg-amber-500/10 text-amber-400'
                    : 'border-gray-700/50 bg-gray-800/30 text-gray-400 hover:border-gray-600/50'
                }`}
              >
                <Lock size={20} />
                <div className="text-left">
                  <p className="font-semibold text-sm">Private</p>
                  <p className="text-xs opacity-70">Only you</p>
                </div>
              </button>
            </div>
          </div>

          {/* Upload Button */}
          <button
            id="upload-submit"
            onClick={handleUpload}
            disabled={!file || uploading}
            className="w-full mt-6 py-4 px-6 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {uploading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Uploading...
              </>
            ) : (
              <>
                <UploadIcon size={18} />
                Upload File
              </>
            )}
          </button>
        </div>
      ) : (
        /* Success state */
        <div className="glass-card p-8 animate-fade-in-up">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/15 flex items-center justify-center animate-pulse-glow">
              <Check size={36} className="text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Upload Successful!</h2>
              <p className="text-gray-400 text-sm mt-1">Your file has been uploaded and is ready to share</p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="p-4 rounded-xl bg-gray-800/40 border border-gray-700/30">
              <p className="text-xs text-gray-500 mb-1">File name</p>
              <p className="text-white font-medium">{uploadResult.originalFileName}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-gray-800/40 border border-gray-700/30">
                <p className="text-xs text-gray-500 mb-1">Size</p>
                <p className="text-white font-medium">{fileService.formatFileSize(uploadResult.fileSize)}</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-800/40 border border-gray-700/30">
                <p className="text-xs text-gray-500 mb-1">Visibility</p>
                <p className={`font-medium ${uploadResult.visibility === 'PUBLIC' ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {uploadResult.visibility}
                </p>
              </div>
            </div>

            {uploadResult.shareLink && (
              <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
                <p className="text-xs text-gray-500 mb-2">Share Link</p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={uploadResult.shareLink}
                    className="flex-1 px-3 py-2 bg-gray-800/60 border border-gray-700/30 rounded-lg text-sm text-gray-300 truncate"
                  />
                  <button
                    onClick={copyShareLink}
                    className="p-2.5 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={resetUpload}
            className="w-full mt-6 py-3.5 px-6 bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700/50 text-gray-200 font-medium rounded-xl transition-all duration-200"
          >
            Upload Another File
          </button>
        </div>
      )}
    </div>
  );
}

export default Upload;
