// Données statiques pour remplacer la base de données
import { BlogPost, Event, FormField, Annonce } from './types';

// Données pour l'association
export const associationContent = {
  id: '1',
  titreAccueil: 'Bienvenue aux Jardins Partagés',
  texteIntro: 'Notre association promeut le jardinage écologique et crée du lien social à travers la culture de parcelles individuelles et collectives. Rejoignez-nous pour cultiver ensemble un espace de biodiversité et de partage.',
  texteFooter: 'Notre association promeut le jardinage écologique et crée du lien social à travers la culture de parcelles individuelles et collectives.',
  adresse: '6 rue des Jardins, 69000 Lyon',
  telephone: '04 78 12 34 56',
  email: 'contact@jardins-partages.fr',
  horaires: 'Permanences: Samedi 9h-12h',
  imageAccueil: '/uploads/blog/jardin-accueil.jpg',
  headerIcon: '/src/assets/logo.svg',
  titreAssociation: 'Notre Association',
  contentAssociation: `# Notre Histoire

Fondée en 2010, notre association de jardins partagés est née de la volonté d'habitants du quartier de créer un espace de verdure et de convivialité au cœur de la ville.

## Notre Mission

Nous proposons à nos adhérents des parcelles individuelles et collectives pour cultiver fruits, légumes et fleurs dans le respect de l'environnement. Notre association est également un lieu d'échange de savoirs et de pratiques autour du jardinage écologique.

## Nos Valeurs

- **Écologie** : Nous promouvons des méthodes de culture respectueuses de l'environnement
- **Partage** : Les jardins sont des lieux de rencontre et d'échange
- **Éducation** : Nous organisons régulièrement des ateliers pour petits et grands
- **Solidarité** : Une partie de notre production est donnée à des associations locales`,
  imagesAssociation: [
    '/uploads/blog/jardin1.jpg',
    '/uploads/blog/jardin2.jpg',
    '/uploads/blog/jardin3.jpg'
  ],
  parcellesTotal: 50,
  parcellesOccupees: 42
};

// Articles de blog
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Comment démarrer son potager en ville',
    content: `# Comment démarrer son potager en ville

Vous rêvez de cultiver vos propres légumes mais vous vivez en ville ? Pas de panique, voici quelques conseils pour démarrer votre potager urbain !

## Choisir le bon emplacement

Même en ville, il est possible de trouver un espace ensoleillé pour vos cultures. Balcon, terrasse, rebord de fenêtre... l'important est que vos plantes reçoivent au moins 6 heures de soleil par jour.

## Sélectionner les bons contenants

En l'absence de jardin, optez pour des pots, jardinières ou bacs. Assurez-vous qu'ils disposent de trous de drainage et sont assez profonds pour les racines de vos plantes.

## Commencer par des plantes faciles

Pour débuter, choisissez des plantes qui poussent facilement comme les herbes aromatiques (basilic, ciboulette, menthe), les tomates cerises ou les salades.`,
    image: '/uploads/blog/potager-urbain.jpg',
    date: '2025-08-15',
    author: 'Marie Dupont',
    category: 'Conseils',
    imagesannexes: [
      '/uploads/blog/potager1.jpg',
      '/uploads/blog/potager2.jpg'
    ]
  },
  {
    id: '2',
    title: 'Les bienfaits du compost',
    content: `# Les bienfaits du compost

Le compostage est une pratique écologique qui permet de réduire ses déchets tout en produisant un amendement de qualité pour son jardin.

## Pourquoi composter ?

- Réduction des déchets ménagers (jusqu'à 30% de moins)
- Production d'un engrais naturel et gratuit
- Amélioration de la structure du sol
- Contribution à la réduction des gaz à effet de serre

## Comment démarrer son compost ?

1. Choisissez un emplacement ombragé dans votre jardin
2. Procurez-vous un composteur ou construisez-en un
3. Alternez les déchets verts (épluchures, marc de café) et les déchets bruns (feuilles mortes, brindilles)
4. Aérez régulièrement votre compost
5. Patientez quelques mois pour obtenir un compost mûr`,
    image: '/uploads/blog/compost.jpg',
    date: '2025-08-01',
    author: 'Thomas Martin',
    category: 'Écologie',
    imagesannexes: [
      '/uploads/blog/compost1.jpg',
      '/uploads/blog/compost2.jpg'
    ]
  },
  {
    id: '3',
    title: 'Cultiver des légumes d\'hiver',
    content: `# Cultiver des légumes d'hiver

L'hiver n'est pas synonyme d'arrêt du jardinage ! De nombreux légumes peuvent être cultivés pendant la saison froide.

## Les légumes à privilégier

- **Légumes racines** : carottes, navets, betteraves
- **Choux** : chou frisé, chou de Bruxelles
- **Légumes verts** : épinards, mâche, roquette
- **Légumes-bulbes** : poireaux, oignons

## Techniques de protection

Pour protéger vos cultures du froid :
- Utilisez des tunnels ou des cloches
- Paillez abondamment le sol
- Installez un voile d'hivernage lors des gelées`,
    image: '/uploads/blog/legumes-hiver.jpg',
    date: '2025-07-20',
    author: 'Sophie Legrand',
    category: 'Saisons',
    imagesannexes: [
      '/uploads/blog/hiver1.jpg',
      '/uploads/blog/hiver2.jpg'
    ]
  }
];

// Événements
export const events: Event[] = [
  {
    id: '1',
    title: 'Atelier compostage',
    description: 'Venez apprendre les techniques de compostage et repartez avec votre mini-composteur !',
    date: '2025-09-15',
    time: '14:00 - 16:00',
    location: 'Jardin principal',
    image: '/uploads/events/compostage.jpg',
    isPast: false
  },
  {
    id: '2',
    title: 'Troc de graines',
    description: 'Échangez vos graines et boutures avec d\'autres jardiniers passionnés.',
    date: '2025-09-22',
    time: '10:00 - 12:00',
    location: 'Salle commune',
    image: '/uploads/events/troc-graines.jpg',
    isPast: false
  },
  {
    id: '3',
    title: 'Fête des récoltes',
    description: 'Célébrons ensemble les récoltes de l\'été autour d\'un repas partagé avec les produits du jardin.',
    date: '2025-10-05',
    time: '12:00 - 15:00',
    location: 'Espace central',
    image: '/uploads/events/fete-recoltes.jpg',
    isPast: false
  }
];

// Champs du formulaire de candidature
export const formFields: FormField[] = [
  {
    id: '1',
    label: 'Nom complet',
    type: 'text',
    required: true,
    placeholder: 'Votre nom et prénom'
  },
  {
    id: '2',
    label: 'Email',
    type: 'email',
    required: true,
    placeholder: 'votre.email@exemple.com'
  },
  {
    id: '3',
    label: 'Téléphone',
    type: 'tel',
    required: false,
    placeholder: '06 12 34 56 78'
  },
  {
    id: '4',
    label: 'Message',
    type: 'textarea',
    required: true,
    placeholder: 'Pourquoi souhaitez-vous rejoindre notre association ?'
  }
];

// Candidatures
export const applications = [
  {
    id: '1',
    applicantName: 'Jean Dupont',
    email: 'jean.dupont@exemple.com',
    phone: '06 12 34 56 78',
    message: 'Je souhaite rejoindre l\'association car j\'ai toujours été passionné par le jardinage et j\'aimerais partager cette passion avec d\'autres personnes.',
    processed: false
  },
  {
    id: '2',
    applicantName: 'Marie Martin',
    email: 'marie.martin@exemple.com',
    phone: '07 23 45 67 89',
    message: 'Habitant en appartement, je n\'ai pas la possibilité de jardiner chez moi. Je serais ravie de pouvoir cultiver mes propres légumes dans un jardin partagé.',
    processed: true
  }
];

// Annonces
export const annonces: Annonce[] = [
  {
    id: '1',
    title: 'Don de plants de tomates',
    description: 'Je donne des plants de tomates (variétés anciennes) que j\'ai en trop.',
    contact: 'Pierre au 06 12 34 56 78',
    category: 'Don',
    date: '2025-08-10',
    author: 'Pierre Durand',
    isValidated: true
  },
  {
    id: '2',
    title: 'Recherche outils de jardinage',
    description: 'Je recherche une bêche et une fourche en bon état pour débuter mon jardin.',
    contact: 'Sophie à sophie@exemple.com',
    category: 'Recherche',
    date: '2025-08-05',
    author: 'Sophie Moreau',
    isValidated: true
  },
  {
    id: '3',
    title: 'Échange graines de courges',
    description: 'J\'échange des graines de courges butternut contre des graines de potimarron.',
    contact: 'Lucas au 07 89 01 23 45',
    category: 'Échange',
    date: '2025-08-01',
    author: 'Lucas Petit',
    isValidated: true
  }
];

// Initialiser les données dans le client mock
export const initMockData = () => {
  return {
    'association_content': [associationContent],
    'blogPosts': blogPosts,
    'events': events,
    'form_fields': formFields,
    'applications': applications,
    'annonces': annonces
  };
};
