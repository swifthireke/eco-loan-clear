import { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'admin' | 'partner';

interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Test credentials
const TEST_USERS = {
  admin: {
    email: 'admin@credable.io',
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@credable.io',
      role: 'admin' as UserRole,
      name: 'Admin User'
    }
  },
  partner: {
    email: 'partner@credable.io',
    password: 'partner123',
    user: {
      id: '2',
      email: 'partner@credable.io',
      role: 'partner' as UserRole,
      name: 'Partner User'
    }
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    // Check admin credentials
    if (email === TEST_USERS.admin.email && password === TEST_USERS.admin.password) {
      setUser(TEST_USERS.admin.user);
      return true;
    }
    
    // Check partner credentials
    if (email === TEST_USERS.partner.email && password === TEST_USERS.partner.password) {
      setUser(TEST_USERS.partner.user);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
