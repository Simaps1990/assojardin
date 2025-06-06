import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';

// Layouts
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AdminLayout from './pages/admin/AdminLayout';
import ScrollToTop from './components/ScrollToTop';

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
import LoginPage from './pages/LoginPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBlogPage from './pages/admin/AdminBlogPage';
import AdminEventsPage from './pages/admin/AdminEventsPage';
import AdminApplicationsPage from './pages/admin/AdminApplicationsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage.tsx';
import ProtectedRoute from './ProtectedRoute';


const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Header />
<main className="pt-16 md:pt-0">{children}</main>
    <Footer />
  </>
);


function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            
            <Route path="/" element={
              <PublicLayout><HomePage /></PublicLayout>
            } />
            <Route path="/association" element={
              <PublicLayout><AssociationPage /></PublicLayout>
            } />
            <Route path="/events" element={
              <PublicLayout><EventsPage /></PublicLayout>
            } />
            <Route path="/events/:id" element={
              <PublicLayout><EventDetailPage /></PublicLayout>
            } />
            <Route path="/blog" element={
              <PublicLayout><BlogPage /></PublicLayout>
            } />
            <Route path="/blog/:id" element={
              <PublicLayout><BlogDetailPage /></PublicLayout>
            } />
            <Route path="/apply" element={
              <PublicLayout><ApplyPage /></PublicLayout>
            } />
            <Route path="/contact" element={
              <PublicLayout><ContactPage /></PublicLayout>
            } />
            <Route path="/search" element={
              <PublicLayout><SearchPage /></PublicLayout>
            } />
            <Route path="/login" element={<LoginPage />} />

            
<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<AdminDashboard />} />
  <Route path="blog" element={<AdminBlogPage />} />
  <Route path="events" element={<AdminEventsPage />} />
  <Route path="applications" element={<AdminApplicationsPage />} />
  <Route path="settings" element={<AdminSettingsPage />} />
</Route>


            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ContentProvider>
    </AuthProvider>
  );
}

export default App;
