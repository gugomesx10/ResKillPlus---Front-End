import api from './api';

const API_BASE_URL = 'https://reskillplus-java.onrender.com';

export const authService = {
  loginGitHub: () => {
    window.location.href = `${API_BASE_URL}/auth/github/login?prompt=select_account`;
  },

  loginGoogle: () => {
    window.location.href = `${API_BASE_URL}/auth/google/login?prompt=select_account`;
  },

  loginMicrosoft: () => {
    window.location.href = `${API_BASE_URL}/auth/microsoft/login?prompt=select_account`;
  },

  handleCallback: async (provider: 'github' | 'google' | 'microsoft', code: string) => {
    const redirectUri = `http://localhost:5173/callback/${provider}`;
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
