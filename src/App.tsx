import React, { useEffect, useState, useRef } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';
import { NotificationsProvider } from './context/NotificationsContext';

// Layouts
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AdminLayout from './pages/admin/AdminLayout';
import ScrollToTop from './components/ScrollToTop';

// Pages
import LoginPage from './pages/LoginPage';

// Public Pages
import HomePage from './pages/HomePage';
import AssociationPage from './pages/AssociationPage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import ApplyPage from './pages/ApplyPage';
import ContactPage from './pages/ContactPage';
import SearchPage from './pages/SearchPage';
import AnnoncesPage from './pages/Annonces'; 
import MentionsLegalesPage from './pages/MentionsLegalesPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBlogPage from './pages/admin/AdminBlogPage';
import AdminEventsPage from './pages/admin/AdminEventsPage';
import AdminApplicationsPage from './pages/admin/AdminApplicationsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage.tsx';
import AdminAnnoncesPage from './pages/admin/AdminAnnoncesPage';

// Public Layout
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const headerRef = useRef<HTMLElement | null>(null);
  const [paddingTop, setPaddingTop] = useState(0);

  useEffect(() => {
    const updatePadding = () => {
      const height = headerRef.current?.offsetHeight || 0;
      setPaddingTop(height + 16);
    };

    updatePadding();
    window.addEventListener('resize', updatePadding);
    return () => window.removeEventListener('resize', updatePadding);
  }, []);

  return (
    <>
      <Header ref={headerRef} />
      <main style={{ paddingTop: paddingTop + 24 }}>{children}</main>
      <Footer />
    </>
  );
};

interface AppProps {
  siteId: string;
}

// Composant pour protéger les routes admin
const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return <div>Chargement...</div>;
  }
  
  if (!user) {
    // Rediriger vers la page de login du site actuel, pas vers la page de login générale
    return <Navigate to="login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

function App({ siteId }: AppProps) {
  // Afficher le siteId dans la console pour débogage
  useEffect(() => {
    console.log(`App mounted with siteId: ${siteId}`);
  }, [siteId]);
  
  return (
    <AuthProvider>
      <ContentProvider>
        <NotificationsProvider>
          <ScrollToTop />
          <div className="site-wrapper" data-site-id={siteId}>
            <Routes>

            {/* Page de login spécifique au site */}
            <Route path="login" element={<LoginPage siteId={siteId} />} />
            
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
            <Route path="/association" element={<PublicLayout><AssociationPage /></PublicLayout>} />
            <Route path="/events" element={<PublicLayout><EventsPage /></PublicLayout>} />
            <Route path="/events/:id" element={<PublicLayout><EventDetailPage /></PublicLayout>} />
            <Route path="/blog" element={<PublicLayout><BlogPage /></PublicLayout>} />
            <Route path="/blog/:id" element={<PublicLayout><BlogDetailPage /></PublicLayout>} />
            <Route path="/apply" element={<PublicLayout><ApplyPage /></PublicLayout>} />
            <Route path="/search" element={<PublicLayout><SearchPage /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
            <Route path="/annonces" element={<PublicLayout><AnnoncesPage /></PublicLayout>} />
            <Route path="/mentions-legales" element={<PublicLayout><MentionsLegalesPage /></PublicLayout>} />

            {/* Admin Routes - Protégées par authentification */}
            <Route path="/admin" element={<ProtectedAdminRoute><AdminLayout><AdminDashboard /></AdminLayout></ProtectedAdminRoute>} />
            <Route path="/admin/*" element={<ProtectedAdminRoute><AdminLayout /></ProtectedAdminRoute>}>
              <Route path="blog" element={<AdminBlogPage />} />
              <Route path="events" element={<AdminEventsPage />} />
              <Route path="applications" element={<AdminApplicationsPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
              <Route path="annonces" element={<AdminAnnoncesPage />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </div>
          </NotificationsProvider>
        </ContentProvider>
      </AuthProvider>
  );
}

export default App;
