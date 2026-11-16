import { useState, useRef, useCallback, useEffect } from 'react';
import fileService from '../services/fileService';
import FileIcon from '../components/FileIcon';
import toast from 'react-hot-toast';
import {
  Upload as UploadIcon,
  Globe,
  Lock,
  Check,
  Copy,
  X,
  FileUp,
  ShieldCheck,
  HardDrive,
} from 'lucide-react';

function Upload() {
  const [file, setFile] = useState(null);
  const [visibility, setVisibility] = useState('PUBLIC');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
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
      toast.error('Select a target file to ingest');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 180);

    try {
      const result = await fileService.uploadFile(file, visibility);
      clearInterval(progressInterval);
      setUploadProgress(100);
      setUploadResult(result);
      toast.success('Asset committed to encrypted vault');
    } catch (err) {
      clearInterval(progressInterval);
      setUploadProgress(0);
      const msg = err.response?.data?.message || 'Ingest transmission interrupted';
      toast.error(typeof msg === 'string' ? msg : 'Ingest transmission interrupted');
    } finally {
      setUploading(false);
    }
  };

  const copyShareLink = () => {
    if (uploadResult?.shareLink) {
      const frontendLink = fileService.getFrontendShareUrl(uploadResult.shareLink);
      navigator.clipboard.writeText(frontendLink);
      setCopied(true);
      toast.success('Tokenized share URL copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const resetUpload = () => {
    setFile(null);
    setUploadResult(null);
    setUploadProgress(0);
    setCopied(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (file && file.type?.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPreviewUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setPreviewUrl(null);
    }
  }, [file]);

  const isImage = Boolean(file?.type?.startsWith('image/'));

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in font-sans">
      
      {/* Dossier Header */}
      <div className="pb-6 border-b border-[#E5E3DA]/10">
        <div className="text-[11px] font-mono uppercase tracking-widest text-[#D7FF64] mb-1">
          [CONDUIT // ASSET INGESTION]
        </div>
        <h1 className="font-display font-extrabold text-2xl lg:text-3xl text-[#FFFFFF] tracking-tight flex items-center gap-3">
          <UploadIcon size={26} className="text-[#D7FF64]" />
          INGEST NEW SPECIMEN
        </h1>
        <p className="mt-1 text-xs text-[#737373] font-mono">
          DIRECT TLS ENCRYPTED PIPE • MAXIMUM OBJECT SIZE: 50MB
        </p>
      </div>

      {!uploadResult ? (
        <div className="bg-[#0E1522] border border-[#E5E3DA]/15 rounded-lg p-6 sm:p-8 shadow-2xl">
          
          {/* Tactile Drag & Drop Canvas */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-lg p-10 sm:p-14 text-center cursor-pointer transition-all duration-200
              ${
                dragActive
                  ? 'border-[#D7FF64] bg-[#D7FF64]/5 shadow-[0_0_30px_rgba(215,255,100,0.12)]'
                  : file
                    ? 'border-[#D7FF64]/50 bg-[#151F2E]'
                    : 'border-[#E5E3DA]/20 bg-[#111827] hover:border-[#D7FF64]/50 hover:bg-[#151F2E]'
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
              <div className="space-y-4">
                {isImage && previewUrl ? (
                  <div className="w-24 h-24 mx-auto rounded overflow-hidden border border-[#D7FF64]/40 shadow-md">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-16 h-16 mx-auto rounded bg-[#111827] border border-[#E5E3DA]/20 flex items-center justify-center">
                    <FileIcon filename={file.name} size={28} />
                  </div>
                )}
                <div>
                  <p className="text-sm font-bold text-[#FFFFFF] truncate max-w-md mx-auto">{file.name}</p>
                  <p className="text-xs font-mono text-[#D7FF64] mt-1">
                    {fileService.formatFileSize(file.size)}
                  </p>
                  <p className="text-[10px] font-mono text-[#737373] mt-0.5">
                    MIME: {file.type || 'BINARY/OCTET-STREAM'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); resetUpload(); }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-red-500/10 border border-red-500/30 text-xs font-mono text-red-400 hover:bg-red-500/20 transition-colors"
                >
                  <X size={13} />
                  CLEAR SPECIMEN
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-14 h-14 mx-auto rounded bg-[#151F2E] border border-[#D7FF64]/30 flex items-center justify-center text-[#D7FF64]">
                  <FileUp size={28} />
                </div>
                <div>
                  <p className="font-display font-bold text-base text-[#FFFFFF]">
                    DRAG SPECIMEN INTO VAULT
                  </p>
                  <p className="text-xs font-mono text-[#737373] mt-1">
                    or click to trigger system file browser
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#151F2E] text-[10px] font-mono text-[#737373]">
                    <HardDrive size={12} className="text-[#D7FF64]" />
                    <span>CEILING: 50 MB ALLOTMENT</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Visibility Protocol Switcher */}
          <div className="mt-6">
            <label className="block text-xs font-mono uppercase tracking-wider text-[#737373] mb-3">
              ACCESS VISIBILITY POLICY
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setVisibility('PUBLIC')}
                className={`flex items-center gap-3 p-3.5 rounded border transition-all text-left cursor-pointer ${
                  visibility === 'PUBLIC'
                    ? 'border-[#D7FF64] bg-[#151F2E] text-[#FFFFFF]'
                    : 'border-[#E5E3DA]/10 bg-[#111827] text-[#737373] hover:border-[#E5E3DA]/20'
                }`}
              >
                <div className={`w-8 h-8 rounded flex items-center justify-center ${
                  visibility === 'PUBLIC' ? 'bg-[#D7FF64]/10 text-[#D7FF64]' : 'bg-[#151F2E] text-[#737373]'
                }`}>
                  <Globe size={16} />
                </div>
                <div>
                  <p className="font-mono text-xs font-bold uppercase">PUBLIC DISPATCH</p>
                  <p className="text-[11px] text-[#737373]">Accessible via token URL</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setVisibility('PRIVATE')}
                className={`flex items-center gap-3 p-3.5 rounded border transition-all text-left cursor-pointer ${
                  visibility === 'PRIVATE'
                    ? 'border-[#D7FF64] bg-[#151F2E] text-[#FFFFFF]'
                    : 'border-[#E5E3DA]/10 bg-[#111827] text-[#737373] hover:border-[#E5E3DA]/20'
                }`}
              >
                <div className={`w-8 h-8 rounded flex items-center justify-center ${
                  visibility === 'PRIVATE' ? 'bg-[#D7FF64]/10 text-[#D7FF64]' : 'bg-[#151F2E] text-[#737373]'
                }`}>
                  <Lock size={16} />
                </div>
                <div>
                  <p className="font-mono text-xs font-bold uppercase">PRIVATE ENCLAVE</p>
                  <p className="text-[11px] text-[#737373]">Account authorization only</p>
                </div>
              </button>
            </div>
          </div>

          {/* Progress Bar with Electric Lime Accent */}
          {uploading && (
            <div className="mt-6 p-4 bg-[#111827] border border-[#E5E3DA]/10 rounded">
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-[#737373] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D7FF64] animate-pulse"></span>
                  TRANSMITTING TO VAULT...
                </span>
                <span className="text-[#D7FF64] font-bold">{Math.round(uploadProgress)}%</span>
              </div>
              <div className="w-full h-2 bg-[#151F2E] rounded-full overflow-hidden">
                <div
                  className="progress-bar h-full"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Ingest Action CTA */}
          <button
            id="upload-submit"
            type="button"
            onClick={handleUpload}
            disabled={!file || uploading}
            className="w-full mt-6 py-4 px-6 bg-[#D7FF64] hover:bg-[#c9f550] text-[#111827] font-mono text-xs font-bold uppercase tracking-wider rounded transition-all duration-200 shadow-md disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            {uploading ? (
              <>
                <div className="w-4 h-4 border-2 border-[#111827]/30 border-t-[#111827] rounded-full animate-spin"></div>
                <span>COMMITTING TO STORAGE PIPE...</span>
              </>
            ) : (
              <>
                <UploadIcon size={16} />
                <span>EXECUTE VAULT INGESTION</span>
              </>
            )}
          </button>
        </div>
      ) : (
        /* Minimalist Success Panel */
        <div className="bg-[#0E1522] border border-[#D7FF64]/40 rounded-lg p-8 shadow-2xl animate-scale-in">
          <div className="text-center space-y-3 pb-6 border-b border-[#E5E3DA]/10">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#D7FF64]/10 border border-[#D7FF64]/40 flex items-center justify-center text-[#D7FF64]">
              <Check size={28} />
            </div>
            <div className="text-[11px] font-mono text-[#D7FF64] uppercase tracking-widest">
              [INGEST // COMPLETED]
            </div>
            <h2 className="font-display font-extrabold text-2xl text-[#FFFFFF]">
              Cryptographic Commitment Verified
            </h2>
            <p className="text-xs text-[#737373] font-mono">
              SPECIMEN HAS BEEN ENCRYPTED AND REGISTERED IN YOUR REPOSITORY
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <div className="p-4 rounded bg-[#111827] border border-[#E5E3DA]/10 flex items-center gap-4">
              <FileIcon filename={uploadResult.originalFileName} size={20} className="w-10 h-10 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-mono text-[#737373] uppercase">SPECIMEN IDENTIFIER</p>
                <p className="text-xs font-bold text-[#FFFFFF] truncate mt-0.5">{uploadResult.originalFileName}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 bg-[#111827] border border-[#E5E3DA]/10 rounded">
                <span className="text-[10px] text-[#737373] block uppercase">PAYLOAD SIZE</span>
                <span className="text-[#FFFFFF] font-bold mt-1 block">
                  {fileService.formatFileSize(uploadResult.fileSize)}
                </span>
              </div>
              <div className="p-3 bg-[#111827] border border-[#E5E3DA]/10 rounded">
                <span className="text-[10px] text-[#737373] block uppercase">SECURITY POLICY</span>
                <span className={`font-bold mt-1 block ${uploadResult.visibility === 'PUBLIC' ? 'text-[#D7FF64]' : 'text-amber-400'}`}>
                  {uploadResult.visibility}
                </span>
              </div>
            </div>

            {uploadResult.shareLink && (
              <div className="p-4 rounded bg-[#151F2E] border border-[#D7FF64]/30">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-[#D7FF64] font-bold flex items-center gap-1.5">
                    <ShieldCheck size={14} />
                    TOKENIZED PUBLIC ACCESS LINK
                  </span>
                  <span className="text-[10px] text-[#737373]">SHAREABLE</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={fileService.getFrontendShareUrl(uploadResult.shareLink)}
                    className="flex-1 px-3 py-2 bg-[#111827] border border-[#E5E3DA]/15 rounded text-xs font-mono text-[#F5F3EB] truncate"
                  />
                  <button
                    type="button"
                    onClick={copyShareLink}
                    className="px-3.5 py-2 rounded bg-[#D7FF64] hover:bg-[#c9f550] text-[#111827] font-mono text-xs font-bold uppercase transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied ? 'COPIED' : 'COPY'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={resetUpload}
              className="flex-1 py-3 px-4 bg-[#151F2E] hover:bg-[#1E2B3E] border border-[#E5E3DA]/20 text-[#F5F3EB] font-mono text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
            >
              Ingest Another File
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Upload;
