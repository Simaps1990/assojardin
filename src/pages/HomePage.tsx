import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import BlogCard from '../components/ui/BlogCard';
import EventCard from '../components/ui/EventCard';
import React from 'react';
import MeteoConseilsSection from '../components/ui/MeteoConseilsSection'; // adapte le chemin
import { renderAnnonceType } from '../constants/annonceTypes'; // ajuste le chemin si besoin

const HomePage: React.FC = () => {


const { blogPosts, events, associationContent, annonces } = useContent();

const titreAccueil = associationContent?.titreAccueil;
const texteIntro = associationContent?.texteIntro;
const backgroundImageUrl = associationContent?.imageAccueil;


const sortedPosts = [...blogPosts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);


const latestPost = sortedPosts[0] ?? null;

const upcomingEvents = events
  .filter((event) => !event.isPast)
  .sort(
    (a, b) =>
      new Date(a.enddate || a.date || a.start || '').getTime() -
      new Date(b.enddate || b.date || b.start || '').getTime()
  );

const pastEvents = events
  .filter((event) => event.isPast)
  .sort(
    (a, b) =>
      new Date(b.enddate || b.date || b.start || '').getTime() -
      new Date(a.enddate || a.date || a.start || '').getTime()
  );


  const nextEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : null;
  const latestPastEvent = pastEvents.length > 0 ? pastEvents[0] : null;



return (
<div>

    {/* Hero Section */}
    {backgroundImageUrl && (
<section
  className="relative bg-cover bg-center h-[70vh] flex items-center -mt-10 md:-mt-24"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="container-custom relative z-10 text-white">
          <div className="max-w-2xl animate-fade-in">
            {titreAccueil && (
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{titreAccueil}</h1>
            )}
            {texteIntro && (
              <p className="text-xl mb-8">{texteIntro}</p>
            )}
            <div className="flex flex-wrap gap-4">
              <Link to="/apply" className="btn-primary">
                Postuler pour un jardin
              </Link>
              <Link
                to="/association"
                className="btn bg-white text-primary-700 hover:bg-neutral-100"
              >
                Découvrir l'association
              </Link>
            </div>
          </div>
        </div>
      </section>
    )}

{/* Section Météo + Plantation */}
<MeteoConseilsSection />

<div className="flex justify-center my-6">
      <hr className="w-1/2 border-t border-neutral-300" />
    </div>

    {/* Latest Blog Post */}
<section className="pt-9 pb-16 bg-neutral-50">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-2">
          <Link
            to="/blog"
            className="text-3xl font-heading font-bold hover:underline"
          >
            Dernier Article
          </Link>

          <Link
            to="/blog"
            className="flex items-center text-primary-600 hover:text-primary-700"
          >
            Tous nos articles de Blog <ChevronRight size={16} />
          </Link>
        </div>
{latestPost ? (
  <Link to={`/blog/${latestPost.id}`} className="block">
    <BlogCard post={latestPost} isFeature={true} />
  </Link>
) : (
  <p className="text-neutral-500">
    Aucun article de blog n'a été publié pour le moment.
  </p>
)}

      </div>
    </section>

    <div className="flex justify-center my-1">
      <hr className="w-1/2 border-t border-neutral-300" />
    </div>

    {/* Events Section */}
<section className="pt-11 pb-27 bg-neutral-50">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-2">
          <Link
            to="/events"
            className="text-3xl font-heading font-bold hover:underline"
          >
            Nos événements
          </Link>

          <Link
            to="/events"
            className="flex items-center text-primary-600 hover:text-primary-700"
          >
            Tous les événements <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Next Event */}
          <div>
            <Link
              to="/events"
              className="text-xl font-heading font-semibold mb-3 hover:underline block"
            >
              Prochain événement
            </Link>

            {nextEvent ? (
              <Link to={`/events/${nextEvent.id}`} className="block">
                <EventCard event={nextEvent} isFeature={true} />
              </Link>
            ) : (
              <div className="card p-6">
                <p className="text-neutral-500">
                  Aucun événement à venir n'est programmé pour le moment.
                </p>
              </div>
            )}
          </div>

          {/* Latest Past Event */}
          <div>
            <Link
              to="/events"
              className="text-xl font-heading font-semibold mb-3 hover:underline block"
            >
              Événement passé
            </Link>

            {latestPastEvent ? (
              <Link to={`/events/${latestPastEvent.id}`} className="block">
                <EventCard event={latestPastEvent} isFeature={true} />
              </Link>
            ) : (
              <div className="card p-6">
                <p className="text-neutral-500">
                  Aucun événement passé n'est enregistré.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>

<div className="flex justify-center pt-10">
      <hr className="w-1/2 border-t border-neutral-300" />
    </div>

{/* Dernière annonce validée */}
<section className="pt-9 pb-16 bg-neutral-50">
  <div className="container-custom">
    <div className="flex justify-between items-center mb-2">
      <Link
        to="/annonces"
        className="text-3xl font-heading font-bold hover:underline"
      >
        Les petites annonces
      </Link>
      <Link
        to="/annonces"
        className="flex items-center text-primary-600 hover:text-primary-700"
      >
        Voir toutes les annonces <ChevronRight size={16} />
      </Link>
    </div>

{annonces.length > 0 ? (
  <div className={`grid gap-6 ${annonces.length === 1 ? '' : 'md:grid-cols-2'}`}>
    {[...annonces]
      .filter(a => a.statut === 'validé')
  .sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime())
  .slice(0, 2)
  .map((a) => (
    <button
      key={a.id}
      onClick={() => window.location.href = `/annonces#annonce-${a.id}`}
      className="text-left w-full bg-white p-6 rounded-lg shadow hover:shadow-md transition"
    >
      <p className="text-sm text-neutral-400 mb-1">
        {a.created_at ? new Date(a.created_at).toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }) : 'Date inconnue'}
      </p>
<div className="text-xl font-semibold mb-2 text-primary-700">{renderAnnonceType(a.type)}</div>
      <p className="text-neutral-700 whitespace-pre-line">{a.contenu || 'Contenu non renseigné.'}</p>
    </button>
      ))}
  </div>
) : (
  <p className="text-neutral-500">Aucune annonce n’a encore été validée.</p>
)}

  </div>
</section>

    {/* Call to Action */}
    <section className="py-16 bg-primary-700 text-white">
      <div className="container-custom text-center">
        <h2 className="text-3xl font-heading font-bold mb-4">
          Rejoignez-nous dans cette aventure verte
        </h2>
        <p className="text-xl max-w-3xl mx-auto mb-8">
          Que vous soyez jardinier expérimenté ou novice passionné, il y a une
          place pour vous dans notre communauté.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/apply"
            className="btn bg-white text-primary-700 hover:bg-neutral-100"
          >
            Postuler pour un jardin
          </Link>
          <Link
            to="/contact"
            className="btn border-2 border-white text-white hover:bg-primary-600"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </section>
  </div>
);

};

export default HomePage;
