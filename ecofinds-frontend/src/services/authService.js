import api from './api';
import { STORAGE_KEYS } from '../utils/constants';

export const authService = {
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      const { token, ...userData } = response.data;

      // Store token and user data
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));

      return { token, user: userData };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      const { token, ...user } = response.data;

      // Store token and user data
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));

      return { token, user };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  logout() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  getCurrentUser() {
    const userData = localStorage.getItem(STORAGE_KEYS.USER);
    return userData ? JSON.parse(userData) : null;
  },

  getToken() {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  },

  isAuthenticated() {
    return !!this.getToken();
  }
};
