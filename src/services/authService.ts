import api from './api';

const API_BASE_URL = 'https://reskillplus-java.onrender.com';
const FRONTEND_URL = window.location.origin; // URL do frontend atual

export const authService = {
  loginGitHub: () => {
    const redirectUri = encodeURIComponent(`${FRONTEND_URL}/callback/github`);
    window.location.href = `${API_BASE_URL}/auth/github/login?redirect_uri=${redirectUri}`;
  },

  loginGoogle: () => {
    const redirectUri = encodeURIComponent(`${FRONTEND_URL}/callback/google`);
    window.location.href = `${API_BASE_URL}/auth/google/login?redirect_uri=${redirectUri}`;
  },

  loginMicrosoft: () => {
    const redirectUri = encodeURIComponent(`${FRONTEND_URL}/callback/microsoft`);
    window.location.href = `${API_BASE_URL}/auth/microsoft/login?redirect_uri=${redirectUri}`;
  },

  handleCallback: async (provider: 'github' | 'google' | 'microsoft') => {
    return api.get(`/auth/${provider}/callback${window.location.search}`);
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('accessToken');
  },

  getUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
};
