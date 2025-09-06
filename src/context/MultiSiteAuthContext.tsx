import React, { createContext, useContext, useState, useEffect } from 'react';

interface MultiSiteAuthContextType {
  currentSite: string | null;
  setCurrentSite: (siteId: string) => void;
}

const MultiSiteAuthContext = createContext<MultiSiteAuthContextType | undefined>(undefined);

export const MultiSiteAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSite, setCurrentSite] = useState<string | null>(null);

  useEffect(() => {
    // Récupération du site actuel depuis localStorage
    const currentSiteStored = localStorage.getItem('current_site');
    
    if (currentSiteStored) {
      setCurrentSite(currentSiteStored);
    }
  }, []);

  const updateCurrentSite = (siteId: string) => {
    setCurrentSite(siteId);
    localStorage.setItem('current_site', siteId);
  };

  return (
    <MultiSiteAuthContext.Provider 
      value={{ 
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
