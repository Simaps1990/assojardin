import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import BlogCard from '../components/ui/BlogCard';
import EventCard from '../components/ui/EventCard';
import { Carrot, Leaf } from 'lucide-react';
import WeatherWidget from '../components/ui/WeatherWidget';

const HomePage: React.FC = () => {
  const { blogPosts, events, associationContent } = useContent();

const titreAccueil = associationContent?.titreAccueil;
const texteIntro = associationContent?.texteIntro;
const backgroundImageUrl = associationContent?.imageAccueil;


  const latestPost = blogPosts.length > 0 ? blogPosts[0] : null;

  const upcomingEvents = events
    .filter((event) => !event.isPast)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const pastEvents = events
    .filter((event) => event.isPast)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const nextEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : null;
  const latestPastEvent = pastEvents.length > 0 ? pastEvents[0] : null;

  const plantingCalendar: { [key: number]: { items: string[]; description: string } } = {
    0: { // Janvier
      items: ['Oignons', 'Ail', 'Échalotes'],
      description: 'Janvier est propice aux semis précoces sous abri.',
    },
    1: {
      items: ['Poireaux', 'Carottes', 'Radis'],
      description: 'Février permet les premiers semis de légumes racines.',
    },
    2: {
      items: ['Pommes de terre', 'Choux', 'Épinards'],
      description: 'Mars est idéal pour les plantations en pleine terre.',
    },
    3: {
      items: ['Laitues', 'Betteraves', 'Navets'],
      description: 'Avril offre des conditions douces pour les jeunes pousses.',
    },
    4: {
      items: ['Tomates', 'Courgettes', 'Haricots'],
      description: 'Mai est le mois parfait pour les légumes d’été.',
    },
    5: {
      items: ['Concombres', 'Aubergines', 'Poivrons'],
      description: 'Juin favorise les cultures gourmandes en soleil.',
    },
    6: {
      items: ['Basilic', 'Choux-fleurs', 'Fenouil'],
      description: 'Juillet permet encore quelques semis estivaux.',
    },
    7: {
      items: ['Épinards', 'Navets', 'Radis noirs'],
      description: 'Août marque le retour des semis d’automne.',
    },
    8: {
      items: ['Mâche', 'Choux', 'Carottes tardives'],
      description: 'Septembre lance les cultures d’arrière-saison.',
    },
    9: {
      items: ['Ail', 'Oignons blancs', 'Épinards'],
      description: 'Octobre est idéal pour préparer l’hiver.',
    },
    10: {
      items: ['Fèves', 'Pois', 'Échalotes'],
      description: 'Novembre autorise les plantations résistantes.',
    },
    11: {
      items: ['Rien', 'Repos du jardin', 'Préparer le sol'],
      description: 'Décembre est le moment de pailler et de planifier.',
    },
  };

  const currentMonth = new Date().getMonth();
  const { items: plantingList, description: plantingDescription } = plantingCalendar[currentMonth];


return (
  <div className="pt-16">
    {/* Hero Section */}
    {backgroundImageUrl && (
      <section
        className="relative bg-cover bg-center h-[70vh] flex items-center"
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
<section className="py-16 bg-neutral-50">
  <div className="container-custom">
    <div className="grid md:grid-cols-2 gap-12">

{/* Bloc gauche : Ce mois-ci on plante */}
<div className="card bg-white p-6 rounded-2xl shadow-md">
  <div className="flex items-center mb-4">
    <Carrot className="text-green-600 mr-2 h-5 w-5" />
    <h2 className="text-xl font-bold leading-tight mb-0">Ce mois-ci on plante</h2>
  </div>
  <p className="mb-4 text-sm text-neutral-600">
    {plantingDescription}
  </p>
  <ul className="list-disc list-inside text-sm text-neutral-700 space-y-1">
    {plantingList.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
</div>

{/* Bloc droit : Météo actuelle */}
<div className="card bg-white p-6 rounded-2xl shadow-md">
  {/* Titre + météo dans la même ligne */}
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-2">
      <Leaf className="text-sky-500 h-5 w-5" />
      <h2 className="text-xl font-bold leading-tight mb-0">Météo actuelle</h2>
    </div>

    {/* Icône + température + ville */}
    <WeatherWidget
      renderTips={({ weatherCode, temperature }) => {
        const iconMap: { [key: number]: string } = {
          0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
          45: '🌫️', 48: '🌫️',
          51: '🌧️', 53: '🌧️', 55: '🌧️',
          61: '🌧️', 63: '🌧️', 65: '🌧️',
          71: '❄️', 73: '❄️', 75: '❄️',
          95: '⛈️', 96: '⛈️', 99: '⛈️',
        };
        const icon = iconMap[weatherCode] || '❓';

        return (
          <div className="flex items-center bg-transparent rounded-full px-3 py-1">
            <div className="mr-2">{icon}</div>
            <div className="text-sm">
              <span className="font-medium">{temperature}°C</span>
              <span className="mx-1 text-neutral-400">|</span>
              <span className="text-primary-300">Villeurbanne</span>
            </div>
          </div>
        );
      }}
    />
  </div>

  {/* Conseils météo (aucune icône ici) */}
  <div className="mt-2 text-sm text-neutral-800">
    <WeatherWidget
      renderTips={({ weatherCode, temperature }) => {
        let conseilMeteo = '';
        let conseilTemp = '';

        if ([0].includes(weatherCode)) conseilMeteo = 'fait un temps clair : pensez à arroser en soirée.';
        else if ([1, 2, 3].includes(weatherCode)) conseilMeteo = 'fait un temps nuageux : conditions idéales pour semer.';
        else if ([45, 48].includes(weatherCode)) conseilMeteo = 'y a du brouillard : évitez les traitements.';
        else if ([51, 53, 55, 61, 63, 65].includes(weatherCode)) conseilMeteo = 'pleut : ne semez pas aujourd’hui.';
        else if ([71, 73, 75].includes(weatherCode)) conseilMeteo = 'neige : protégez vos plantes.';
        else if ([95, 96, 99].includes(weatherCode)) conseilMeteo = 'y a un orage : rentrez vos outils.';
        else conseilMeteo = 'y a des conditions normales : observez votre sol.';

        if (temperature >= 28) conseilTemp = 'pensez à pailler et arroser tôt le matin.';
        else if (temperature >= 20) conseilTemp = 'arrosez de préférence le matin.';
        else if (temperature <= 10) conseilTemp = 'attention au froid, couvrez les semis.';
        else conseilTemp = 'continuez l’entretien habituel.';

        return (
          <ul className="list-disc list-inside space-y-1">
            <li>Actuellement il {conseilMeteo}</li>
            <li>Avec une température extérieure de <strong>{temperature}°C</strong>, {conseilTemp}</li>
          </ul>
        );
      }}
    />
  </div>
</div>






    </div>
  </div>
</section>

 <div className="flex justify-center my-1">
      <hr className="w-1/2 border-t border-neutral-300" />
    </div>

    {/* Latest Blog Post */}
    <section className="py-16 bg-neutral-50">
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
    <section className="pt-12 pb-24 bg-neutral-50">
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
