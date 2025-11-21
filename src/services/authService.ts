import api from './api';

const API_BASE_URL = 'https://reskillplus-java.onrender.com';
const FRONTEND_URL = window.location.origin; // URL do frontend atual

export const authService = {
  loginGitHub: () => {
    window.location.href = `${API_BASE_URL}/auth/github/login`;
  },

  loginGoogle: () => {
    window.location.href = `${API_BASE_URL}/auth/google/login`;
  },

  loginMicrosoft: () => {
    window.location.href = `${API_BASE_URL}/auth/microsoft/login`;
  },

  handleCallback: async (provider: 'github' | 'google' | 'microsoft', code: string) => {
    const redirectUri = `${FRONTEND_URL}/callback/${provider}`;
    return api.post(`/auth/${provider}`, {
      code: code,
      redirectUri: redirectUri
    });
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
