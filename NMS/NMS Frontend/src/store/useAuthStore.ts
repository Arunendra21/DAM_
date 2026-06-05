import { create } from 'zustand';

export interface UserSession {
  name: string;
  email: string;
  username: string;
  role: 'admin' | 'user';
  token: string;
}

interface AuthState {
  user: UserSession | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string, role: 'admin' | 'user') => Promise<boolean>;
  signup: (userData: Omit<UserSession, 'token'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  initializeSession: () => void;
}

const API_BASE_URL = 'http://localhost:8080/api/v1';

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: false,
  error: null,

  initializeSession: () => {
    try {
      const persisted = localStorage.getItem('netintel_session');
      if (persisted) {
        set({ user: JSON.parse(persisted) });
      }
    } catch (e) {
      console.error('Failed to parse persisted session', e);
    }
  },

  login: async (email, password, role) => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Invalid credentials');
      }

      const data = await response.json();
      
      const userSession: UserSession = {
        name: `${data.user.first_name} ${data.user.last_name}`.trim() || data.user.email.split('@')[0],
        email: data.user.email,
        username: data.user.email.split('@')[0],
        role: data.user.role === 'admin' ? 'admin' : 'user', // Map backend 'operator' or 'admin' to frontend roles
        token: data.access_token,
      };

      localStorage.setItem('netintel_session', JSON.stringify(userSession));
      set({ user: userSession, isLoading: false, error: null });
      return true;
    } catch (err: any) {
      set({ 
        isLoading: false, 
        error: err.message || 'Login failed' 
      });
      return false;
    }
  },

  signup: async (userData) => {
    set({ isLoading: true, error: null });

    try {
      const nameParts = userData.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          first_name: firstName,
          last_name: lastName,
          role: userData.role === 'admin' ? 'admin' : 'operator',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }

      // Auto login
      return await get().login(userData.email, userData.password, userData.role);
    } catch (err: any) {
      set({ 
        isLoading: false, 
        error: err.message || 'Registration failed' 
      });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('netintel_session');
    set({ user: null, error: null });
  }
}));
