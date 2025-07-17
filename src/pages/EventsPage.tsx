import React from 'react';
import { useContent } from '../context/ContentContext';
import EventCard from '../components/ui/EventCard';
import SEO from '../components/SEO';

const EventsPage: React.FC = () => {
  const { events } = useContent();

  // Tri du plus récent au plus ancien
  const sortedEvents = [...events].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="pb-16">
      <SEO 
        title="Événements Jardinage SJOV | Ateliers et Rencontres à Villeurbanne | Rhône-Alpes"
        description="Participez aux événements de jardinage organisés par les bénévoles de la SJOV à Villeurbanne (69100) en région Rhône-Alpes. Ateliers de plantation, formations sur la culture potagère et rencontres entre jardiniers passionnés depuis 1936."
        keywords="événements jardinage, ateliers plantation, SJOV, Société des Jardins Ouvriers de Villeurbanne, jardins partagés, Villeurbanne, 69100, rencontres jardiniers, formation jardinage, culture potagère, Rhône-Alpes, Lyon, Métropole de Lyon, Auvergne-Rhône-Alpes, bénévolat, animations jardinage, ateliers pédagogiques, événements associatifs, portes ouvertes jardins, fête des jardins, troc de plantes, troc de graines, marché aux plantes, visites guidées, démonstrations jardinage, conférences jardinage, cours de jardinage, formations permaculture, événements saisonniers, calendrier événements jardinage, rencontres bénévoles, journées participatives, chantiers collectifs, événements écologiques"
      />
      <div className="container-custom">
        <h1 className="font-heading font-bold text-4xl mb-2">Événements</h1>
        <p className="text-neutral-600 text-lg mb-8">
          Découvrez les événements organisés par notre association
        </p>

        {sortedEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-neutral-500 text-lg">
              Aucun événement n'est disponible pour le moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
