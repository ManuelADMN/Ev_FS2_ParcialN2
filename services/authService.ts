import { User } from '../types/types';
import { ENDPOINTS } from './apiConfig';

const SESSION_KEY = 'denoise_session';
const TOKEN_KEY = 'denoise_token';

export const authService = {
  init: () => {
    // No-op for API based auth
  },

  login: async (email: string, password: string): Promise<User | null> => {
    try {
      const res = await fetch(ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        console.error("Login failed:", res.status, res.statusText);
        return null;
      }

      const data = await res.json();
      if (data.token && data.user) {
        localStorage.setItem(TOKEN_KEY, data.token);
        localStorage.setItem(SESSION_KEY, JSON.stringify(data.user));
        return data.user;
      }
      return null;
    } catch (error) {
      console.error("Login error:", error);
      return null;
    }
  },

  register: async (name: string, email: string, password: string): Promise<User | null> => {
    try {
      const res = await fetch(ENDPOINTS.AUTH.REGISTER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      if (!res.ok) {
        console.error("Register failed:", res.status);
        return null;
      }

      // Auto login after register
      return authService.login(email, password);
    } catch (error) {
      console.error("Register error:", error);
      return null;
    }
  },

  logout: () => {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(TOKEN_KEY);
  },

  getCurrentUser: (): User | null => {
    const sessionStr = localStorage.getItem(SESSION_KEY);
    return sessionStr ? JSON.parse(sessionStr) : null;
  },

  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  // --- CRUD Methods for Admin ---

  getAllUsers: async (): Promise<User[]> => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return [];
    try {
      const res = await fetch(ENDPOINTS.ADMIN.USERS, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) return res.json();
    } catch (e) { console.error(e); }
    return [];
  },

  addUser: async (user: Omit<User, 'id'>): Promise<User | null> => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;
    try {
      const res = await fetch(ENDPOINTS.ADMIN.USERS, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      if (res.ok) return res.json();
    } catch (e) { console.error(e); }
    return null;
  },

  updateUser: async (updatedUser: User) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return;
    try {
      await fetch(`${ENDPOINTS.ADMIN.USERS}/${updatedUser.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
      });
    } catch (e) { console.error(e); }
  },

  deleteUser: async (id: number) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return;
    try {
      await fetch(`${ENDPOINTS.ADMIN.USERS}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } catch (e) { console.error(e); }
  }
};
