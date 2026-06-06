import {
  FileText,
  Image,
  FileCode,
  FileSpreadsheet,
  Film,
  Music,
  Archive,
  FileType,
  Presentation,
} from 'lucide-react';

const extensionMap = {
  // Images
  jpg: { icon: Image, color: 'text-pink-400', bg: 'bg-pink-500/15' },
  jpeg: { icon: Image, color: 'text-pink-400', bg: 'bg-pink-500/15' },
  png: { icon: Image, color: 'text-pink-400', bg: 'bg-pink-500/15' },
  gif: { icon: Image, color: 'text-pink-400', bg: 'bg-pink-500/15' },
  svg: { icon: Image, color: 'text-pink-400', bg: 'bg-pink-500/15' },
  webp: { icon: Image, color: 'text-pink-400', bg: 'bg-pink-500/15' },
  bmp: { icon: Image, color: 'text-pink-400', bg: 'bg-pink-500/15' },

  // Documents
  pdf: { icon: FileText, color: 'text-red-400', bg: 'bg-red-500/15' },
  doc: { icon: FileText, color: 'text-blue-400', bg: 'bg-blue-500/15' },
  docx: { icon: FileText, color: 'text-blue-400', bg: 'bg-blue-500/15' },
  txt: { icon: FileText, color: 'text-gray-400', bg: 'bg-gray-500/15' },
  rtf: { icon: FileText, color: 'text-gray-400', bg: 'bg-gray-500/15' },
  md: { icon: FileText, color: 'text-gray-400', bg: 'bg-gray-500/15' },

  // Spreadsheets
  xls: { icon: FileSpreadsheet, color: 'text-emerald-400', bg: 'bg-emerald-500/15' },
  xlsx: { icon: FileSpreadsheet, color: 'text-emerald-400', bg: 'bg-emerald-500/15' },
  csv: { icon: FileSpreadsheet, color: 'text-emerald-400', bg: 'bg-emerald-500/15' },

  // Presentations
  ppt: { icon: Presentation, color: 'text-orange-400', bg: 'bg-orange-500/15' },
  pptx: { icon: Presentation, color: 'text-orange-400', bg: 'bg-orange-500/15' },

  // Code
  js: { icon: FileCode, color: 'text-yellow-400', bg: 'bg-yellow-500/15' },
  jsx: { icon: FileCode, color: 'text-cyan-400', bg: 'bg-cyan-500/15' },
  ts: { icon: FileCode, color: 'text-blue-400', bg: 'bg-blue-500/15' },
  tsx: { icon: FileCode, color: 'text-blue-400', bg: 'bg-blue-500/15' },
  py: { icon: FileCode, color: 'text-yellow-400', bg: 'bg-yellow-500/15' },
  java: { icon: FileCode, color: 'text-orange-400', bg: 'bg-orange-500/15' },
  html: { icon: FileCode, color: 'text-orange-400', bg: 'bg-orange-500/15' },
  css: { icon: FileCode, color: 'text-blue-400', bg: 'bg-blue-500/15' },
  json: { icon: FileCode, color: 'text-yellow-400', bg: 'bg-yellow-500/15' },
  xml: { icon: FileCode, color: 'text-green-400', bg: 'bg-green-500/15' },

  // Video
  mp4: { icon: Film, color: 'text-purple-400', bg: 'bg-purple-500/15' },
  avi: { icon: Film, color: 'text-purple-400', bg: 'bg-purple-500/15' },
  mkv: { icon: Film, color: 'text-purple-400', bg: 'bg-purple-500/15' },
  mov: { icon: Film, color: 'text-purple-400', bg: 'bg-purple-500/15' },
  webm: { icon: Film, color: 'text-purple-400', bg: 'bg-purple-500/15' },

  // Audio
  mp3: { icon: Music, color: 'text-teal-400', bg: 'bg-teal-500/15' },
  wav: { icon: Music, color: 'text-teal-400', bg: 'bg-teal-500/15' },
  flac: { icon: Music, color: 'text-teal-400', bg: 'bg-teal-500/15' },
  ogg: { icon: Music, color: 'text-teal-400', bg: 'bg-teal-500/15' },

  // Archives
  zip: { icon: Archive, color: 'text-amber-400', bg: 'bg-amber-500/15' },
  rar: { icon: Archive, color: 'text-amber-400', bg: 'bg-amber-500/15' },
  '7z': { icon: Archive, color: 'text-amber-400', bg: 'bg-amber-500/15' },
  tar: { icon: Archive, color: 'text-amber-400', bg: 'bg-amber-500/15' },
  gz: { icon: Archive, color: 'text-amber-400', bg: 'bg-amber-500/15' },
};

const defaultEntry = { icon: FileType, color: 'text-gray-400', bg: 'bg-gray-500/15' };

function getFileExtension(filename) {
  if (!filename) return '';
  const parts = filename.split('.');
  return parts.length > 1 ? parts.pop().toLowerCase() : '';
}

// eslint-disable-next-line react-refresh/only-export-components
export const getFileIcon = (filename) => {
  const ext = getFileExtension(filename);
  return extensionMap[ext] || defaultEntry;
}

export function getFileInfo(filename) {
  const ext = getFileExtension(filename);
  return extensionMap[ext] || defaultEntry;
}

function FileIcon({ filename, size = 20, className = '' }) {
  const { icon: Icon, color, bg } = getFileInfo(filename);

  return (
    <div className={`flex items-center justify-center rounded-lg ${bg} ${className}`}>
      <Icon size={size} className={color} />
    </div>
  );
}

export default FileIcon;
