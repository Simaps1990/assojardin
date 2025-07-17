import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { BlogPost, Event } from '../types';
import { formatDate } from '../utils/formatters';
import SEO from '../components/SEO';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';
  
  const { blogPosts, events } = useContent();
  const [results, setResults] = useState<{
    blogs: BlogPost[];
    events: Event[];
  }>({ blogs: [], events: [] });

  useEffect(() => {
    if (query) {
      const queryLower = query.toLowerCase();
      
      // Search in blog posts
      const matchedPosts = blogPosts.filter(post => 
        post.title.toLowerCase().includes(queryLower) || 
        post.content.toLowerCase().includes(queryLower) ||
        post.excerpt.toLowerCase().includes(queryLower)
      );
      
      // Search in events
      const matchedEvents = events.filter(event => 
        event.title.toLowerCase().includes(queryLower) || 
        (event.description?.toLowerCase().includes(queryLower) ?? false) ||
        (event.location?.toLowerCase().includes(queryLower) ?? false)
      );
      
      setResults({
        blogs: matchedPosts,
        events: matchedEvents
      });
    } else {
      setResults({ blogs: [], events: [] });
    }
  }, [query, blogPosts, events]);

  const totalResults = results.blogs.length + results.events.length;

  return (
    <div className="pt-24 pb-16">
      <SEO
        title={`Recherche${query ? ` : ${query}` : ''} | SJOV | Jardins Partagés à Villeurbanne | Rhône-Alpes`}
        description={`Résultats de recherche${query ? ` pour "${query}"` : ''} sur le site de la Société des Jardins Ouvriers de Villeurbanne (SJOV). Trouvez des articles de blog et événements liés au jardinage à Villeurbanne (69100) en région Rhône-Alpes.`}
        keywords={`recherche SJOV, Société des Jardins Ouvriers de Villeurbanne, jardins partagés, Villeurbanne, 69100, Rhône-Alpes, Lyon, Métropole de Lyon, Auvergne-Rhône-Alpes, bénévolat, ${query}, recherche jardinage, recherche événements, recherche blog, résultats recherche`}
      />
      <div className="container-custom">
        <h1 className="font-heading font-bold text-4xl mb-2">Résultats de recherche</h1>
        <p className="text-neutral-600 text-lg mb-8">
          {query ? (
            totalResults > 0 ? (
              `${totalResults} résultat${totalResults > 1 ? 's' : ''} pour "${query}"`
            ) : (
              `Aucun résultat pour "${query}"`
            )
          ) : (
            'Veuillez saisir un terme de recherche'
          )}
        </p>

        {/* Search form */}
        <form className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Rechercher..."
              className="form-input flex-grow"
            />
            <button type="submit" className="btn-primary">
              Rechercher
            </button>
          </div>
        </form>

        {/* Blog Results */}
        {results.blogs.length > 0 && (
          <div className="mb-12">
            <h2 className="font-heading font-semibold text-2xl mb-4">Articles de blog</h2>
            <div className="space-y-4">
              {results.blogs.map(post => (
                <div key={post.id} className="card p-6">
                  <div className="flex items-center text-sm text-neutral-500 mb-1">
                    <Calendar size={14} className="mr-1" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-xl mb-2">
                    <Link to={`/blog/${post.id}`} className="text-neutral-800 hover:text-primary-600">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-neutral-600 mb-3">{post.excerpt}</p>
                  <Link to={`/blog/${post.id}`} className="text-primary-600 hover:text-primary-700 font-medium">
                    Lire l'article
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Event Results */}
        {results.events.length > 0 && (
          <div>
            <h2 className="font-heading font-semibold text-2xl mb-4">Événements</h2>
            <div className="space-y-4">
              {results.events.map(event => (
                <div key={event.id} className="card p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-neutral-500 mb-2">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin size={14} className="mr-1" />
                      <span>{event.location}</span>
                    </div>
                    <div className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium text-white ${
                      event.isPast ? 'bg-neutral-500' : 'bg-accent-500'
                    }`}>
                      {event.isPast ? 'Passé' : 'À venir'}
                    </div>
                  </div>
                  <h3 className="font-heading font-semibold text-xl mb-2">
                    <Link to={`/events/${event.id}`} className="text-neutral-800 hover:text-primary-600">
                      {event.title}
                    </Link>
                  </h3>
                  <p className="text-neutral-600 mb-3">{event.description ? event.description.substring(0, 150) + '...' : 'Aucune description disponible'}</p>
                  <Link to={`/events/${event.id}`} className="text-primary-600 hover:text-primary-700 font-medium">
                    Voir l'événement
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {query && totalResults === 0 && (
          <div className="text-center py-12">
            <h2 className="font-heading font-semibold text-xl mb-4">Aucun résultat trouvé</h2>
            <p className="text-neutral-500 mb-6">
              Nous n'avons trouvé aucun contenu correspondant à votre recherche.
            </p>
            <p className="text-neutral-600">
              Suggestions:
            </p>
            <ul className="list-disc list-inside text-neutral-600 mb-6">
              <li>Vérifiez l'orthographe des termes de recherche.</li>
              <li>Essayez d'utiliser des mots plus généraux.</li>
              <li>Essayez d'utiliser moins de mots clés.</li>
            </ul>
            <Link to="/" className="btn-primary">
              Retour à l'accueil
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;