import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MultiSiteAuthProvider, useMultiSiteAuth } from './context/MultiSiteAuthContext';
import { MultiSiteContentProvider } from './context/MultiSiteContentContext';
import MultiSiteLoginPage from './pages/MultiSiteLoginPage';
import App from './App';

// Composant pour les routes des sites (sans protection)
const SiteRoute: React.FC<{ 
  children: React.ReactNode; 
  siteId: string;
}> = ({ children, siteId }) => {
  const { currentSite, setCurrentSite } = useMultiSiteAuth();
  
  // Mettre à jour le site actuel si nécessaire
  if (currentSite !== siteId) {
    setCurrentSite(siteId);
  }
  
  return <>{children}</>;
};

// Composant pour chaque site
const SiteWrapper: React.FC<{ siteId: string }> = ({ siteId }) => {
  return (
    <SiteRoute siteId={siteId}>
      <App siteId={siteId} />
    </SiteRoute>
  );
};

const MultiSiteApp: React.FC = () => {
  return (
    <HelmetProvider>
      <MultiSiteAuthProvider>
        <MultiSiteContentProvider>
          <Router>
            <Routes>
            {/* Page d'accueil avec sélection de site */}
            <Route path="/" element={<MultiSiteLoginPage />} />
            
            {/* Routes pour chaque site */}
            <Route path="/site1/*" element={<SiteWrapper siteId="site1" />} />
            <Route path="/site2/*" element={<SiteWrapper siteId="site2" />} />
            <Route path="/site3/*" element={<SiteWrapper siteId="site3" />} />
            
            {/* Redirection par défaut */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
        </MultiSiteContentProvider>
      </MultiSiteAuthProvider>
    </HelmetProvider>
  );
};

export default MultiSiteApp;
