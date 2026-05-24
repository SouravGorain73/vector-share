import api from './api';

export const authService = {
  async register(name, email, password) {
    const response = await api.post('/user/create', { name, email, password });
    return response.data;
  },

  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  saveToken(token) {
    localStorage.setItem('vs_token', token);
  },

  getToken() {
    return localStorage.getItem('vs_token');
  },

  saveUser(user) {
    localStorage.setItem('vs_user', JSON.stringify(user));
  },

  getUser() {
    const user = localStorage.getItem('vs_user');
    return user ? JSON.parse(user) : null;
  },

  logout() {
    localStorage.removeItem('vs_token');
    localStorage.removeItem('vs_user');
  },

  isAuthenticated() {
    return !!localStorage.getItem('vs_token');
  },
};

export default authService;
