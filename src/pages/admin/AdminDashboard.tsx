import React, { useEffect, useState } from 'react';
import {
  FileText,
  Calendar,
  Users,
} from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { supabase } from '../../supabaseClient';
import { Megaphone } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { blogPosts, events } = useContent();

  const upcomingEvents = events.filter(event => !event.isPast);


const { associationContent } = useContent();
const [annoncesCount, setAnnoncesCount] = useState<number>(0);

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
const fetchAnnoncesValidees = async () => {
  const { count, error } = await supabase
    .from('annonces')
    .select('*', { count: 'exact', head: true })
    .eq('statut', 'validé');

  if (!error) {
    setAnnoncesCount(count || 0);
  }
};

fetchAnnoncesValidees();
fetchAnnoncesNonValidees();

    setNonTraitees(count || 0);
  };
const fetchAnnoncesNonValidees = async () => {
  const { count, error } = await supabase
    .from('annonces')
    .select('*', { count: 'exact', head: true })
    .eq('statut', 'en_attente');

  if (!error) {
    localStorage.setItem('annoncesEnAttente', String(count || 0));
window.dispatchEvent(new Event('storage'));

  }
};

  fetchNonTraitees();
  const interval = setInterval(fetchNonTraitees, 30000);

return () => {
  clearInterval(interval);
  localStorage.removeItem('annoncesEnAttente');
};


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
<div className="flex flex-wrap gap-4 mb-8">
<button
  onClick={() => window.location.href = '/admin/blog'}
  className="w-[220px] bg-white rounded-lg shadow-sm p-6 hover:bg-neutral-50 transition-colors text-center"
>
  <div className="flex flex-col items-center gap-2">
    <p className="text-sm font-medium">Articles</p>
    <div className="flex items-center gap-2">
      <div className="bg-primary-100 p-2 rounded-full">
        <FileText className="text-primary-600" size={20} />
      </div>
      <p className="text-xl font-bold">{blogPosts.length}</p>
    </div>
  </div>
</button>




<button
  onClick={() => window.location.href = '/admin/events'}
  className="w-[220px] bg-white rounded-lg shadow-sm p-6 hover:bg-neutral-50 transition-colors text-center"
>
  <div className="flex flex-col items-center gap-2">
    <p className="text-sm font-medium">Événements à venir</p>
    <div className="flex items-center gap-2">
      <div className="bg-accent-100 p-2 rounded-full">
        <Calendar className="text-accent-600" size={20} />
      </div>
      <p className="text-xl font-bold">{upcomingEvents.length}</p>
    </div>
  </div>
</button>



<button
  onClick={() => window.location.href = '/admin/applications'}
  className="w-[220px] bg-white rounded-lg shadow-sm p-6 hover:bg-neutral-50 transition-colors text-center"
>
  <div className="flex flex-col items-center gap-2">
    <p className="text-sm font-medium">Demandes de jardin</p>
    <div className="flex items-center gap-2">
      <div className="bg-secondary-100 p-2 rounded-full">
        <FileText className="text-secondary-600" size={20} />
      </div>
      <p className="text-xl font-bold">{nonTraitees}</p>
    </div>
  </div>
</button>



<button
  onClick={() => window.location.href = '/admin/annonces'}
  className="w-[220px] bg-white rounded-lg shadow-sm p-6 hover:bg-neutral-50 transition-colors text-center"
>
  <div className="flex flex-col items-center gap-2">
    <p className="text-sm font-medium">Annonces</p>
    <div className="flex items-center gap-2">
      <div className="bg-yellow-100 p-2 rounded-full">
        <Megaphone className="text-yellow-600" size={20} />
      </div>
      <p className="text-xl font-bold">{annoncesCount}</p>
    </div>
  </div>
</button>




<div className="w-[220px] bg-white rounded-lg shadow-sm p-6 hover:bg-neutral-50 transition-colors text-center">
  <div className="flex flex-col items-center gap-2">
    <p className="text-sm font-medium">Parcelles occupées</p>
    <div className="flex items-center gap-2">
      <div className="bg-green-100 p-2 rounded-full">
        <Users className="text-green-600" size={20} />
      </div>
      <p className="text-xl font-bold">
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
  {blogPosts.length > 3 && (
    <button
      onClick={() => window.location.href = '/admin/blog'}
      className="text-primary-600 hover:text-primary-700 font-medium text-sm"
    >
      Voir tous les articles
    </button>
  )}
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


        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-sm p-6">
<div className="flex justify-between items-center mb-4">
  <h2 className="text-xl font-semibold">Événements à venir</h2>
  {events.length > 3 && (
    <button
      onClick={() => window.location.href = '/admin/events'}
      className="text-primary-600 hover:text-primary-700 font-medium text-sm"
    >
      Voir tous les événements
    </button>
  )}
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


        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
