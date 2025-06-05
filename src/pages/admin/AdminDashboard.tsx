import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Calendar,
  Users,
 // Settings,
  Plus
} from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { supabase } from '../../supabaseClient';

const AdminDashboard: React.FC = () => {
  const { blogPosts, events } = useContent();

  const upcomingEvents = events.filter(event => !event.isPast);


const { associationContent } = useContent();

const [nonTraitees, setNonTraitees] = useState(0);
const [parcellesOccupees, setParcellesOccupees] = useState<number | null>(null);
const [parcellesTotales, setParcellesTotales] = useState<number | null>(null);

  const recentPosts = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

useEffect(() => {
  if (!associationContent) {
    setParcellesOccupees(null);
    setParcellesTotales(null);
  } else {
    setParcellesOccupees(
      associationContent.parcellesOccupees !== null && associationContent.parcellesOccupees !== undefined
        ? Number(associationContent.parcellesOccupees)
        : null
    );

    setParcellesTotales(
      associationContent.parcellesTotal !== null && associationContent.parcellesTotal !== undefined
        ? Number(associationContent.parcellesTotal)
        : null
    );
  }

  const fetchNonTraitees = async () => {
    const { count, error } = await supabase
      .from('applications')
      .select('*', { count: 'exact', head: true })
      .eq('processed', false);

    if (error) {
      console.error('Erreur chargement demandes :', error.message);
      return;
    }

    setNonTraitees(count || 0);
  };

  fetchNonTraitees();
  const interval = setInterval(fetchNonTraitees, 30000);
  return () => clearInterval(interval);
}, [associationContent]);


  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    });
  };

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const dateFormatted = date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    });
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${dateFormatted} à ${hours}h${minutes}`;
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Tableau de bord</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link to="/admin/blog" className="bg-white rounded-lg shadow-sm p-6 hover:bg-neutral-50 transition-colors">
          <div className="flex items-center">
            <div className="bg-primary-100 p-3 rounded-full mr-4">
              <FileText className="text-primary-600" size={24} />
            </div>
            <div>
              <p className="text-neutral-500 text-sm">Articles</p>
              <p className="text-2xl font-semibold">{blogPosts.length}</p>
            </div>
          </div>
        </Link>

        <Link to="/admin/events" className="bg-white rounded-lg shadow-sm p-6 hover:bg-neutral-50 transition-colors">
          <div className="flex items-center">
            <div className="bg-accent-100 p-3 rounded-full mr-4">
              <Calendar className="text-accent-600" size={24} />
            </div>
            <div>
              <p className="text-neutral-500 text-sm">Événements à venir</p>
              <p className="text-2xl font-semibold">{upcomingEvents.length}</p>
            </div>
          </div>
        </Link>

        <Link to="/admin/applications" className="bg-white rounded-lg shadow-sm p-6 hover:bg-neutral-50 transition-colors">
          <div className="flex items-center">
            <div className="bg-secondary-100 p-3 rounded-full mr-4">
              <FileText className="text-secondary-600" size={24} />

            </div>
            <div>
              <p className="text-neutral-500 text-sm">Demandes de jardin</p>
              <p className="text-2xl font-semibold">{nonTraitees}</p>
            </div>
          </div>
        </Link>

        <div className="bg-white rounded-lg shadow-sm p-6">
  <div className="flex items-center">
    <div className="bg-green-100 p-3 rounded-full mr-4">
      <Users className="text-green-600" size={24} />
    </div>
    <div>
      <p className="text-neutral-500 text-sm">Parcelles occupées</p>
      <p className="text-2xl font-semibold">
        {parcellesOccupees ?? '--'} / {parcellesTotales ?? '--'}
      </p>
    </div>
  </div>
</div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10 mb-10">
        {/* Recent Blog Posts */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Articles récents</h2>
            <Link
              to="/admin/blog"
              className="btn-primary flex items-center text-sm py-1.5"
            >
              <Plus size={16} className="mr-1" /> Nouvel article
            </Link>
          </div>

          {recentPosts.length > 0 ? (
            <div className="space-y-4">
              {recentPosts.map(post => (
                <div key={post.id} className="border-b border-neutral-100 last:border-0 pb-4 last:pb-0">
                  <h3 className="text-lg font-medium text-gray-800 mb-1">{post.title}</h3>
                  <span className="text-neutral-500 text-sm">{formatDate(post.date)}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-neutral-500">Aucun article n'a été créé.</p>
          )}

          {blogPosts.length > 3 && (
            <div className="mt-4 text-center">
              <Link
                to="/admin/blog"
                className="text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                Voir tous les articles
              </Link>
            </div>
          )}
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Événements à venir</h2>
            <Link
              to="/admin/events"
              className="btn-primary flex items-center text-sm py-1.5"
            >
              <Plus size={16} className="mr-1" /> Nouvel événement
            </Link>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="space-y-4">
              {upcomingEvents
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .slice(0, 3)
                .map(event => (
                  <div key={event.id} className="border-b border-neutral-100 last:border-0 pb-4 last:pb-0">
                    <h3 className="text-lg font-medium text-gray-800 mb-1">{event.title}</h3>
                    <span className="text-neutral-500 text-sm">{formatDateTime(event.date)}</span>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-neutral-500">Aucun événement à venir n'est prévu.</p>
          )}

          {events.length > 3 && (
            <div className="mt-4 text-center">
              <Link
                to="/admin/events"
                className="text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                Voir tous les événements
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
