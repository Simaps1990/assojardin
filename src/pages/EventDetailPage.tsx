import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { Event } from '../types';
import { formatDate } from '../utils/formatters';
import { Calendar, MapPin, ChevronLeft, Clock } from 'lucide-react';

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { events } = useContent();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (id) {
      const foundEvent = events.find(e => e.id === id);
      if (foundEvent) {
        setEvent(foundEvent);
      } else {
        navigate('/events');
      }
    }
  }, [id, events, navigate]);

  if (!event) {
    return (
      <div className="pt-24 pb-16">
        <div className="container-custom">
          <p>Chargement de l'événement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <Link 
          to="/events" 
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
        >
          <ChevronLeft size={16} className="mr-1" /> Retour aux événements
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-72 md:h-96 overflow-hidden">
            <img 
              src={event.image ?? undefined} 
              alt={event.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-6 md:p-8">
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium text-white mb-4 ${
              event.isPast ? 'bg-neutral-500' : 'bg-accent-500'
            }`}>
              {event.isPast ? 'Événement passé' : 'À venir'}
            </div>
            
            <h1 className="font-heading font-bold text-3xl md:text-4xl mb-4">{event.title}</h1>
            
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-neutral-600 mb-6">
              <div className="flex items-center">
                <Calendar size={20} className="mr-2 text-primary-500" />
                <span>{formatDate(event.date)}</span>
              </div>

              {event.enddate && (
  <div className="flex items-center">
    <Clock size={20} className="mr-2 text-primary-500" />
    <span>Fin : {formatDate(event.enddate)}</span>
  </div>
)}
              <div className="flex items-center">
                <MapPin size={20} className="mr-2 text-primary-500" />
                <span>{event.location}</span>
              </div>
            </div>
            
<div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: event.content }} />

{event.imagesannexes && event.imagesannexes.length > 0 && (
  <div
    className={`mt-6 grid gap-4 ${
      event.imagesannexes.length === 1
        ? 'grid-cols-1'
        : event.imagesannexes.length === 2
        ? 'grid-cols-2'
        : 'grid-cols-3'
    }`}
  >
    {event.imagesannexes.map((img, i) =>
      img ? (
        <div key={i} className="w-full flex justify-center">
          <img
            src={img}
            alt={`Image annexe ${i + 1}`}
            className="max-h-[500px] w-auto object-contain rounded"
          />
        </div>
      ) : null
    )}
  </div>
)}

            {!event.isPast && (
              <div className="mt-8 p-6 bg-primary-50 rounded-lg border border-primary-100">
                <h3 className="font-heading font-semibold text-xl mb-2">Informations pratiques</h3>
                <p className="mb-4">
                  Pour participer à cet événement, merci de vous inscrire à l'avance par email ou par téléphone.
                </p>
                <Link to="/contact" className="btn-primary">
                  Nous contacter pour s'inscrire
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
