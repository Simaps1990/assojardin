import { BlogPost, Event, FormField } from '../types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Récolte de printemps exceptionnelle dans nos jardins',
    content: `
      <p>Le printemps a apporté avec lui une récolte exceptionnelle dans nos jardins cette année...</p>
    `,
    excerpt: 'Le printemps a apporté avec lui une récolte exceptionnelle dans nos jardins cette année...',
    image: 'https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg',
    date: '2025-05-15',
    author: 'Marie Dupont'
  },
  {
    id: '2',
    title: 'Inauguration du nouvel espace de compostage collectif',
    content: `
      <p>C'est avec une grande fierté que nous avons inauguré notre nouvel espace de compostage collectif...</p>
    `,
    excerpt: 'C\'est avec une grande fierté que nous avons inauguré notre nouvel espace de compostage collectif...',
    image: 'https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg',
    date: '2025-04-28',
    author: 'Thomas Leroy'
  },
  {
    id: '3',
    title: 'Les bienfaits de la culture en lasagnes dans nos parcelles',
    content: `
      <p>La technique de culture en lasagnes gagne en popularité dans nos jardins...</p>
    `,
    excerpt: 'La technique de culture en lasagnes gagne en popularité dans nos jardins...',
    image: 'https://images.pexels.com/photos/1600727/pexels-photo-1600727.jpeg',
    date: '2025-03-10',
    author: 'Sophie Martin'
  }
];

export const EVENTS: Event[] = [
  {
    id: '1',
    title: 'Journée portes ouvertes des jardins',
    description: 'Venez découvrir nos jardins et rencontrer nos jardiniers passionnés...',
    image: 'https://images.pexels.com/photos/169523/pexels-photo-169523.jpeg',
    imagesannexes: [],
    date: '2025-06-12',
    location: 'Jardins SJOV, Villeurbanne',
    isPast: false,
    start: '2025-06-12T10:00',
    enddate: '2025-06-12T17:00',
    content: '<p>Visite guidée, ateliers découverte pour les enfants, dégustation...</p>',
    author: 'Équipe SJOV',
    created_at: '2025-05-01T08:00:00'
  },
  {
    id: '2',
    title: 'Atelier compostage pour débutants',
    description: 'Apprenez les bases du compostage et repartez avec toutes les connaissances nécessaires...',
    image: 'https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg',
    imagesannexes: [],
    date: '2025-05-28',
    location: 'Salle communale, Villeurbanne',
    isPast: false,
    start: '2025-05-28T14:00',
    enddate: '2025-05-28T17:00',
    content: '<p>Atelier gratuit sur inscription. Apprentissage des bonnes pratiques du compostage...</p>',
    author: 'Jean Jardinier',
    created_at: '2025-04-15T10:30:00'
  },
  {
    id: '3',
    title: 'Troc de plantes printanier',
    description: 'Notre traditionnel troc de plantes de printemps...',
    image: 'https://images.pexels.com/photos/4505161/pexels-photo-4505161.jpeg',
    imagesannexes: [],
    date: '2025-04-15',
    location: 'Place des jardins, Villeurbanne',
    isPast: true,
    start: '2025-04-15T10:00',
    enddate: '2025-04-15T13:00',
    content: '<p>Échange de semis, boutures et plants entre jardiniers.</p>',
    author: 'Sophie Botanique',
    created_at: '2025-03-25T09:15:00'
  },
  {
    id: '4',
    title: 'Formation taille des arbres fruitiers',
    description: 'Une journée pour apprendre à tailler correctement vos arbres fruitiers...',
    image: 'https://images.pexels.com/photos/159250/bulb-closeup-close-up-clove-159250.jpeg',
    imagesannexes: [],
    date: '2025-03-05',
    location: 'Verger associatif, Villeurbanne',
    isPast: true,
    start: '2025-03-05T09:30',
    enddate: '2025-03-05T16:30',
    content: '<p>Théorie le matin, pratique l\'après-midi. Prévoir des gants et outils si possible.</p>',
    author: 'Lucien Taille',
    created_at: '2025-02-20T07:50:00'
  }
];



export const APPLICATION_FORM_FIELDS: FormField[] = [
  {
    id: 'name',
    label: 'Nom et prénom',
    type: 'text',
    required: true
  },
  {
    id: 'address',
    label: 'Adresse complète',
    type: 'textarea',
    required: true
  },
  {
    id: 'email',
    label: 'Email',
    type: 'email',
    required: true
  },
  {
    id: 'phone',
    label: 'Téléphone',
    type: 'tel',
    required: true
  },
  {
    id: 'gardenSize',
    label: 'Taille de jardin souhaitée',
    type: 'radio',
    options: ['Inférieur à 150m²', 'Entre 150 et 200m²', 'Supérieur à 200m²'],
    required: true
  },
  {
    id: 'experience',
    label: 'Avez-vous une expérience de jardinage ?',
    type: 'radio',
    options: ['Oui', 'Non'],
    required: true
  },
  {
    id: 'motivation',
    label: 'Quelles sont vos motivations pour rejoindre notre association ?',
    type: 'textarea',
    required: true
  }
];

export const ASSOCIATION_CONTENT = {
  title: 'Notre Association',
  content: `
    <h2>L'histoire des jardins ouvriers en France</h2>
    <p>...</p>
  `
};
