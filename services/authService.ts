
import { User } from '../types/types';

const STORAGE_KEY = 'denoise_users';
const SESSION_KEY = 'denoise_session';

// Seed data to initialize the app so it's not empty
const SEED_USERS: User[] = [
  { id: 1, name: "Guillermo Cerda", email: "admin@denoise.com", password: "123", role: "Admin", status: "Active" },
  { id: 2, name: "Salmonera Austral", email: "cliente@denoise.com", password: "123", role: "User", status: "Active" },
  { id: 3, name: "Manuel Diaz", email: "m.diaz@denoise.com", password: "123", role: "Admin", status: "Active" },
  { id: 4, name: "Diego Aravena", email: "d.aravena@denoise.com", password: "123", role: "User", status: "Suspended" },
];

export const authService = {
  // Initialize data if empty
  init: () => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_USERS));
    }
  },

  // --- Auth Methods ---

  login: (email: string, password: string): User | null => {
    authService.init();
    const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const user = users.find((u: User) => u.email === email && u.password === password);
    
    if (user) {
      // Remove password from session storage for security simulation
      const { password, ...sessionUser } = user;
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
      return sessionUser;
    }
    return null;
  },

  register: (name: string, email: string, password: string): User | null => {
    authService.init();
    const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    
    if (users.find((u: User) => u.email === email)) {
      return null; // User exists
    }

    const newUser: User = {
      id: Date.now(),
      name,
      email,
      password,
      role: 'User', // Default role
      status: 'Active'
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    
    // Auto login
    const { password: _, ...sessionUser } = newUser;
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    
    return sessionUser;
  },

  logout: () => {
    localStorage.removeItem(SESSION_KEY);
  },

  getCurrentUser: (): User | null => {
    const sessionStr = localStorage.getItem(SESSION_KEY);
    return sessionStr ? JSON.parse(sessionStr) : null;
  },

  // --- CRUD Methods for Admin ---

  getAllUsers: (): User[] => {
    authService.init();
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  },

  addUser: (user: Omit<User, 'id'>): User => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const newUser = { ...user, id: Date.now() };
    users.push(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    return newUser;
  },

  updateUser: (updatedUser: User) => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const index = users.findIndex((u: User) => u.id === updatedUser.id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updatedUser }; // Keep password if not updated in object
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    }
  },

  deleteUser: (id: number) => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const filtered = users.filter((u: User) => u.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
};
