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

// Seeded local mock accounts
const DEFAULT_ACCOUNTS = [
  { name: 'NOC Administrator', email: 'admin@netintel.com', username: 'admin', password: 'admin123', role: 'admin' as const },
  { name: 'Console Operator', email: 'user@netintel.com', username: 'user', password: 'user123', role: 'user' as const }
];

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
    
    // Simulate realistic 800ms network round-trip delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Get accounts from local storage to check for signed-up users too
    let accounts = [...DEFAULT_ACCOUNTS];
    try {
      const storedUsers = localStorage.getItem('netintel_registered_users');
      if (storedUsers) {
        accounts = [...accounts, ...JSON.parse(storedUsers)];
      }
    } catch (e) {
      console.error(e);
    }

    const matched = accounts.find(
      acc => acc.email.toLowerCase() === email.toLowerCase() && 
             acc.password === password && 
             acc.role === role
    );

    if (matched) {
      const mockSession: UserSession = {
        name: matched.name,
        email: matched.email,
        username: matched.username,
        role: matched.role,
        token: `mock-jwt-token-xyz-${Math.random().toString(36).substr(2, 9)}`,
      };

      localStorage.setItem('netintel_session', JSON.stringify(mockSession));
      set({ user: mockSession, isLoading: false, error: null });
      return true;
    } else {
      set({ 
        isLoading: false, 
        error: `Invalid credentials or incorrect role portal select for ${email}` 
      });
      return false;
    }
  },

  signup: async (userData) => {
    set({ isLoading: true, error: null });
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      let registered: any[] = [];
      const raw = localStorage.getItem('netintel_registered_users');
      if (raw) {
        registered = JSON.parse(raw);
      }

      // Check if email already registered
      if (registered.some(u => u.email.toLowerCase() === userData.email.toLowerCase()) || 
          DEFAULT_ACCOUNTS.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
        set({ isLoading: false, error: 'Email address already exists in routing system.' });
        return false;
      }

      // Save user to mock database
      const newUser = {
        name: userData.name,
        email: userData.email,
        username: userData.username,
        password: userData.password,
        role: userData.role
      };

      registered.push(newUser);
      localStorage.setItem('netintel_registered_users', JSON.stringify(registered));
      
      // Auto-log the user in immediately
      const mockSession: UserSession = {
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
        role: newUser.role,
        token: `mock-jwt-token-xyz-${Math.random().toString(36).substr(2, 9)}`,
      };

      localStorage.setItem('netintel_session', JSON.stringify(mockSession));
      set({ user: mockSession, isLoading: false, error: null });
      return true;
    } catch (e) {
      set({ isLoading: false, error: 'Registration failed due to storage exception.' });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('netintel_session');
    set({ user: null, error: null });
  }
}));
