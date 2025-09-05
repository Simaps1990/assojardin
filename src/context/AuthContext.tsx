import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  username: string;
  // Ajoute d'autres propriétés utilisateur si nécessaire
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Exemple : récupération utilisateur depuis localStorage (ou API)
    const username = localStorage.getItem('username');
    if (username) {
      setUser({ username });
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Authentification simple avec identifiants codés en dur
    if (username === 'admin' && password === 'password') {
      setUser({ username });
      localStorage.setItem('username', username);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('username');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
