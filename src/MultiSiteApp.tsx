import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MultiSiteAuthProvider, useMultiSiteAuth } from './context/MultiSiteAuthContext';
import { MultiSiteContentProvider } from './context/MultiSiteContentContext';
import MultiSiteLoginPage from './pages/MultiSiteLoginPage';
import App from './App';

// Composant pour protéger les routes des sites
const ProtectedSiteRoute: React.FC<{ 
  children: React.ReactNode; 
  siteId: string;
}> = ({ children, siteId }) => {
  const { user, loading, currentSite, setCurrentSite } = useMultiSiteAuth();
  
  // Si l'utilisateur est en cours de chargement, afficher un indicateur
  if (loading) {
    return <div>Chargement...</div>;
  }
  
  // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  // Si l'utilisateur est connecté mais essaie d'accéder à un site différent
  if (user.siteId !== siteId) {
    return <Navigate to={`/${user.siteId}`} replace />;
  }
  
  // Mettre à jour le site actuel si nécessaire
  if (currentSite !== siteId) {
    setCurrentSite(siteId);
  }
  
  return <>{children}</>;
};

// Composant pour chaque site
const SiteWrapper: React.FC<{ siteId: string }> = ({ siteId }) => {
  return (
    <ProtectedSiteRoute siteId={siteId}>
      <App siteId={siteId} />
    </ProtectedSiteRoute>
  );
};

const MultiSiteApp: React.FC = () => {
  return (
    <HelmetProvider>
      <MultiSiteAuthProvider>
        <MultiSiteContentProvider>
          <Router>
            <Routes>
            {/* Page d'accueil avec connexion */}
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
