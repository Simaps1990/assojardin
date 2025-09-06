import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  username: string;
  siteId: string;
}

interface MultiSiteAuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<{success: boolean, siteId?: string}>;
  logout: () => void;
  currentSite: string | null;
  setCurrentSite: (siteId: string) => void;
}

const MultiSiteAuthContext = createContext<MultiSiteAuthContextType | undefined>(undefined);

export const MultiSiteAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentSite, setCurrentSite] = useState<string | null>(null);

  useEffect(() => {
    // Récupération utilisateur depuis localStorage
    const username = localStorage.getItem('multi_username');
    const siteId = localStorage.getItem('multi_siteId');
    const currentSiteStored = localStorage.getItem('current_site');
    
    if (username && siteId) {
      setUser({ username, siteId });
    }
    
    if (currentSiteStored) {
      setCurrentSite(currentSiteStored);
    }
    
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<{success: boolean, siteId?: string}> => {
    // Authentification pour les 3 sites
    if (username === 'admin1' && password === 'password1') {
      const siteId = 'site1';
      setUser({ username, siteId });
      localStorage.setItem('multi_username', username);
      localStorage.setItem('multi_siteId', siteId);
      setCurrentSite(siteId);
      localStorage.setItem('current_site', siteId);
      return { success: true, siteId };
    } else if (username === 'admin2' && password === 'password2') {
      const siteId = 'site2';
      setUser({ username, siteId });
      localStorage.setItem('multi_username', username);
      localStorage.setItem('multi_siteId', siteId);
      setCurrentSite(siteId);
      localStorage.setItem('current_site', siteId);
      return { success: true, siteId };
    } else if (username === 'admin3' && password === 'password3') {
      const siteId = 'site3';
      setUser({ username, siteId });
      localStorage.setItem('multi_username', username);
      localStorage.setItem('multi_siteId', siteId);
      setCurrentSite(siteId);
      localStorage.setItem('current_site', siteId);
      return { success: true, siteId };
    }
    return { success: false };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('multi_username');
    localStorage.removeItem('multi_siteId');
  };

  const updateCurrentSite = (siteId: string) => {
    setCurrentSite(siteId);
    localStorage.setItem('current_site', siteId);
  };

  return (
    <MultiSiteAuthContext.Provider 
      value={{ 
        user, 
        loading, 
        login, 
        logout, 
        currentSite, 
        setCurrentSite: updateCurrentSite 
      }}
    >
      {children}
    </MultiSiteAuthContext.Provider>
  );
};

export const useMultiSiteAuth = (): MultiSiteAuthContextType => {
  const context = useContext(MultiSiteAuthContext);
  if (!context) {
    throw new Error('useMultiSiteAuth must be used within a MultiSiteAuthProvider');
  }
  return context;
};
