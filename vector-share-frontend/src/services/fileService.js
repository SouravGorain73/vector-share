import api from './api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fileService = {
  async uploadFile(file, visibility) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('visibility', visibility);

    const response = await api.post('/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async getUserFiles() {
    const response = await api.get('/files/user');
    return response.data;
  },

  async deleteFile(fileId) {
    const response = await api.delete(`/files/${fileId}`);
    return response.data;
  },

  async updateVisibility(fileId, visibility) {
    const response = await api.post(`/files/${fileId}/visibility`, { visibility });
    return response.data;
  },

  async regenerateShareLink(fileId) {
    const response = await api.post(`/files/${fileId}/regenerate-link`);
    return response.data;
  },

  /*
   * Convert backend API share link to frontend-friendly share link.
   */

  getFrontendShareUrl(backendShareLink) {
    if (!backendShareLink) return '';
    // Extract the token from the backend URL
    const match = backendShareLink.match(/\/files\/share\/(.+)$/);
    if (match) {
      return `${window.location.origin}/share/${match[1]}`;
    }
    return backendShareLink;
  },

  /**
   * Get the backend API URL for downloading/viewing a shared file.
   * Used by PublicFileView to fetch the actual file content.
   */
  getFileDownloadUrl(shareToken) {
    return `${API_BASE_URL}/files/share/${shareToken}`;
  },

  formatFileSize(bytes) {
    if (!bytes || bytes === 0) return '0 B';
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(i > 0 ? 1 : 0)} ${sizes[i]}`;
  },

  formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  },
};

export default fileService;
