import api from './api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BACKEND_ROOT = API_BASE_URL.replace('/api/v1', '');

export const authService = {
  // ---- OTP Verification ----
  async sendOtp(email) {
    const response = await api.post('/auth/send-otp', { email });
    return response.data;
  },

  async verifyOtp(email, otp) {
    const response = await api.post('/auth/verify-otp', { email, otp });
    return response.data;
  },

  // ---- Auth ----
  async register(name, email, password) {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },

  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  async refreshToken() {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) throw new Error('No refresh token');
    const response = await api.post('/auth/refresh-token', { refreshToken });
    return response.data;
  },

  async logoutServer() {
    try {
      await api.post('/auth/logout');
    } catch {
      // Ignore logout errors — server may already be cleared
    }
  },

  // ---- Forgot Password ----
  async sendPasswordResetOtp(email) {
    const response = await api.post('/auth/forgot-password/send-otp', { email });
    return response.data;
  },

  async resetPassword(email, newPassword) {
    const response = await api.post('/auth/reset-password', { email, newPassword });
    return response.data;
  },

  // ---- User ----
  async getUserByEmail(email) {
    const response = await api.get(`/user/${email}`);
    return response.data;
  },

  // ---- Token storage ----
  saveToken(token) {
    localStorage.setItem('vs_token', token);
  },

  getToken() {
    return localStorage.getItem('vs_token');
  },

  saveRefreshToken(token) {
    localStorage.setItem('vs_refresh_token', token);
  },

  getRefreshToken() {
    return localStorage.getItem('vs_refresh_token');
  },

  // ---- User storage ----
  saveUser(user) {
    localStorage.setItem('vs_user', JSON.stringify(user));
  },

  getUser() {
    const user = localStorage.getItem('vs_user');
    return user ? JSON.parse(user) : null;
  },

  // ---- Clear all auth data ----
  logout() {
    localStorage.removeItem('vs_token');
    localStorage.removeItem('vs_refresh_token');
    localStorage.removeItem('vs_user');
  },

  isAuthenticated() {
    return !!localStorage.getItem('vs_token');
  },

  // ---- Google OAuth URL ----
  getGoogleOAuthUrl() {
    return `${BACKEND_ROOT}/api/v1/oauth2/authorization/google`;
  },

  // ---- Decode JWT payload ----
  decodeToken(token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch {
      return null;
    }
  },
};

export default authService;
