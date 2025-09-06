// Store central pour les données statiques des 3 sites
// Ce fichier permet de conserver les modifications apportées aux données statiques
// entre les différentes parties de l'application

import { 
  associationContent as initialAssociationContent,
  blogPosts as initialBlogPosts,
  events as initialEvents,
  formFields as initialFormFields,
  applications as initialApplications,
  annonces as initialAnnonces
} from './mockData';

// Définir l'interface du store
interface MockDataStoreType {
  [key: string]: any[];
  association_content: any[];
  blogPosts: any[];
  events: any[];
  form_fields: any[];
  applications: any[];
  annonces: any[];
}

// Fonction pour créer une copie profonde des données
const deepCopy = (data: any) => JSON.parse(JSON.stringify(data));

// Fonction pour créer des données spécifiques à un site
const createSiteData = (siteId: string) => {
  // Copie profonde des données initiales
  const associationData = deepCopy(initialAssociationContent);
  
  // Personnalisation des données en fonction du site
  if (associationData) {
    // Personnalisation pour chaque site
    if (siteId === 'site1') {
      associationData.titreAccueil = "Bienvenue aux Jardins Partagés - SITE 1";
      associationData.texteIntro = "Notre association du Site 1 promeut le jardinage écologique et crée du lien social à travers la culture de parcelles individuelles et collectives.";
      associationData.email = "contact@site1.jardins-partages.fr";
      associationData.adresse = "123 Avenue des Jardins, 69000 Lyon";
    } else if (siteId === 'site2') {
      associationData.titreAccueil = "Jardins Partagés Communautaires - SITE 2";
      associationData.texteIntro = "Le Site 2 des Jardins Partagés est dédié à l'agriculture urbaine et aux pratiques écologiques innovantes.";
      associationData.email = "contact@site2.jardins-partages.fr";
      associationData.adresse = "45 Rue des Fleurs, 69100 Villeurbanne";
    } else if (siteId === 'site3') {
      associationData.titreAccueil = "Espace Vert Collectif - SITE 3";
      associationData.texteIntro = "Le Site 3 est un espace expérimental où nous explorons de nouvelles méthodes de culture et de partage des connaissances.";
      associationData.email = "contact@site3.jardins-partages.fr";
      associationData.adresse = "78 Boulevard des Cerisiers, 69200 Vénissieux";
    }
  }
  
  // Créer des données spécifiques pour chaque site
  let blogPostsData = [];
  let eventsData = [];
  let annoncesData = [];
  
  if (siteId === 'site1') {
    // Données spécifiques pour le site 1
    blogPostsData = deepCopy(initialBlogPosts).map((post: any) => ({
      ...post,
      title: `[Site 1] ${post.title}`,
      content: `${post.content}\n\n*Cet article appartient au Site 1*`,
      author: "Équipe Site 1"
    }));
    
    eventsData = deepCopy(initialEvents).map((event: any) => ({
      ...event,
      title: `[Site 1] ${event.title}`,
      description: `${event.description}\n\n*Cet événement est organisé par le Site 1*`,
      location: "Jardins du Site 1"
    }));
    
    annoncesData = deepCopy(initialAnnonces).map((annonce: any) => ({
      ...annonce,
      title: `[Site 1] ${annonce.title}`,
      description: `${annonce.description}\n\n*Cette annonce est publiée par le Site 1*`,
      author: "Administration Site 1"
    }));
  } else if (siteId === 'site2') {
    // Données spécifiques pour le site 2
    blogPostsData = [
      {
        id: '101',
        title: "Techniques de permaculture urbaine",
        content: "# Techniques de permaculture urbaine\n\nLa permaculture est une approche de conception qui s'inspire des écosystèmes naturels pour créer des environnements durables et résilients. En milieu urbain, elle offre des solutions innovantes pour cultiver même dans des espaces restreints.\n\n## Principes de base\n\n- Observation attentive de l'environnement\n- Utilisation optimale des ressources disponibles\n- Création de synergies entre les éléments\n\n## Applications pratiques\n\n1. Jardins verticaux pour maximiser l'espace\n2. Systèmes de récupération d'eau de pluie\n3. Compostage des déchets organiques\n\n*Cet article appartient au Site 2*",
        image: "/uploads/blog/permaculture.jpg",
        date: "2025-08-20",
        author: "Marie Dubois",
        category: "Techniques",
        imagesannexes: ["/uploads/blog/permaculture1.jpg", "/uploads/blog/permaculture2.jpg"]
      },
      {
        id: '102',
        title: "Cultiver des plantes aromatiques en appartement",
        content: "# Cultiver des plantes aromatiques en appartement\n\nLes herbes aromatiques sont parfaites pour débuter le jardinage en intérieur. Elles demandent peu d'espace, poussent rapidement et vous offrent des saveurs fraîches toute l'année.\n\n## Les meilleures herbes pour débuter\n\n- **Basilic** : Aime la chaleur et la lumière\n- **Menthe** : Facile à cultiver, attention à sa tendance à s'étendre\n- **Ciboulette** : Peu exigeante et très productive\n\n## Conseils d'entretien\n\n- Arrosage régulier mais modéré\n- Exposition à la lumière naturelle\n- Récolte fréquente pour stimuler la croissance\n\n*Cet article appartient au Site 2*",
        image: "/uploads/blog/aromatiques.jpg",
        date: "2025-08-15",
        author: "Thomas Leroy",
        category: "Intérieur",
        imagesannexes: ["/uploads/blog/aromatiques1.jpg", "/uploads/blog/aromatiques2.jpg"]
      }
    ];
    
    eventsData = [
      {
        id: '201',
        title: "Atelier de jardinage vertical",
        description: "Venez apprendre à créer votre propre jardin vertical adapté aux petits espaces urbains. Matériel fourni.\n\n*Cet événement est organisé par le Site 2*",
        date: "2025-09-25",
        time: "14:00 - 17:00",
        location: "Jardins du Site 2",
        image: "/uploads/events/jardinage-vertical.jpg",
        isPast: false
      },
      {
        id: '202',
        title: "Conférence sur l'agriculture urbaine",
        description: "Une conférence passionnante sur les dernières innovations en matière d'agriculture urbaine et leurs applications dans notre ville.\n\n*Cet événement est organisé par le Site 2*",
        date: "2025-10-10",
        time: "18:30 - 20:30",
        location: "Salle communautaire du Site 2",
        image: "/uploads/events/conference-agriculture.jpg",
        isPast: false
      }
    ];
    
    annoncesData = [
      {
        id: '301',
        title: "Recherche outils de jardinage spécifiques",
        description: "Je recherche des outils spécifiques pour le jardinage vertical : systèmes d'irrigation goutte-à-goutte, supports muraux, etc.\n\n*Cette annonce est publiée par le Site 2*",
        contact: "Julie au 07 12 34 56 78",
        category: "Recherche",
        date: "2025-08-12",
        author: "Julie Martin",
        isValidated: true
      },
      {
        id: '302',
        title: "Partage de graines rares",
        description: "Je propose un échange de graines de variétés rares et anciennes. J'ai notamment des tomates noires de Crimée et des aubergines blanches.\n\n*Cette annonce est publiée par le Site 2*",
        contact: "Marc à marc@exemple.com",
        category: "Échange",
        date: "2025-08-08",
        author: "Marc Dupont",
        isValidated: true
      }
    ];
  } else if (siteId === 'site3') {
    // Données spécifiques pour le site 3
    blogPostsData = [
      {
        id: '401',
        title: "Jardinage thérapeutique",
        content: "# Le jardinage thérapeutique\n\nLe jardinage thérapeutique, ou hortithérapie, utilise les activités de jardinage pour améliorer le bien-être physique et mental. Cette pratique gagne en popularité dans les établissements de santé et les centres communautaires.\n\n## Bienfaits\n\n- Réduction du stress et de l'anxiété\n- Amélioration de la motricité fine et de la coordination\n- Stimulation cognitive et sensorielle\n- Création de liens sociaux\n\n## Activités adaptées\n\n- Semis et plantations\n- Création de jardins sensoriels\n- Art végétal\n\n*Cet article appartient au Site 3*",
        image: "/uploads/blog/jardinage-therapeutique.jpg",
        date: "2025-08-18",
        author: "Dr. Sophie Moreau",
        category: "Bien-être",
        imagesannexes: ["/uploads/blog/therapie1.jpg", "/uploads/blog/therapie2.jpg"]
      },
      {
        id: '402',
        title: "Jardins pédagogiques pour enfants",
        content: "# Jardins pédagogiques pour enfants\n\nLes jardins pédagogiques offrent aux enfants une opportunité unique d'apprendre en plein air et de développer une connexion avec la nature et l'alimentation.\n\n## Intérêts éducatifs\n\n- Découverte du cycle de vie des plantes\n- Sensibilisation à l'environnement et à l'écologie\n- Apprentissage de la patience et de la responsabilité\n- Initiation à une alimentation saine\n\n## Idées d'aménagement\n\n- Parcelles à hauteur adaptée aux enfants\n- Zones thématiques (potager, fleurs, insectes)\n- Panneaux explicatifs ludiques\n\n*Cet article appartient au Site 3*",
        image: "/uploads/blog/jardin-pedagogique.jpg",
        date: "2025-08-10",
        author: "Claire Dubois",
        category: "Éducation",
        imagesannexes: ["/uploads/blog/pedagogie1.jpg", "/uploads/blog/pedagogie2.jpg"]
      },
      {
        id: '403',
        title: "Jardinage adapté aux personnes à mobilité réduite",
        content: "# Jardinage adapté aux personnes à mobilité réduite\n\nLe jardinage est une activité qui peut être adaptée pour être accessible à tous, y compris aux personnes à mobilité réduite ou en situation de handicap.\n\n## Aménagements spécifiques\n\n- Jardins surélevés accessibles en fauteuil roulant\n- Outils ergonomiques à poignées adaptées\n- Chemins larges et stables\n- Zones de repos ombragées\n\n## Plantes recommandées\n\n- Plantes aromatiques faciles d'accès\n- Légumes à croissance rapide pour des résultats motivants\n- Fleurs aux couleurs vives et parfumées pour stimuler les sens\n\n*Cet article appartient au Site 3*",
        image: "/uploads/blog/jardinage-adapte.jpg",
        date: "2025-07-25",
        author: "Michel Lambert",
        category: "Accessibilité",
        imagesannexes: ["/uploads/blog/adapte1.jpg", "/uploads/blog/adapte2.jpg"]
      }
    ];
    
    eventsData = [
      {
        id: '501',
        title: "Atelier jardinage thérapeutique",
        description: "Un atelier pour découvrir les bienfaits du jardinage sur la santé mentale et physique, animé par une hortithérapeute certifiée.\n\n*Cet événement est organisé par le Site 3*",
        date: "2025-09-20",
        time: "10:00 - 12:00",
        location: "Espace thérapeutique du Site 3",
        image: "/uploads/events/atelier-therapeutique.jpg",
        isPast: false
      },
      {
        id: '502',
        title: "Journée portes ouvertes du jardin pédagogique",
        description: "Venez découvrir notre jardin pédagogique avec des activités pour toute la famille et des démonstrations de jardinage adapté.\n\n*Cet événement est organisé par le Site 3*",
        date: "2025-10-15",
        time: "14:00 - 18:00",
        location: "Jardin pédagogique du Site 3",
        image: "/uploads/events/portes-ouvertes.jpg",
        isPast: false
      },
      {
        id: '503',
        title: "Formation aux techniques de jardinage adapté",
        description: "Une formation pratique sur les techniques et outils pour rendre le jardinage accessible à tous, quelles que soient les capacités physiques.\n\n*Cet événement est organisé par le Site 3*",
        date: "2025-11-05",
        time: "09:30 - 16:30",
        location: "Centre de formation du Site 3",
        image: "/uploads/events/formation-jardinage.jpg",
        isPast: false
      }
    ];
    
    annoncesData = [
      {
        id: '601',
        title: "Recherche bénévoles pour jardin thérapeutique",
        description: "Nous recherchons des bénévoles pour aider à l'entretien et l'animation de notre jardin thérapeutique. Aucune expérience requise, formation assurée.\n\n*Cette annonce est publiée par le Site 3*",
        contact: "Anne au 06 12 34 56 78",
        category: "Bénévolat",
        date: "2025-08-14",
        author: "Anne Girard",
        isValidated: true
      },
      {
        id: '602',
        title: "Don d'outils de jardinage adaptés",
        description: "Je donne des outils de jardinage ergonomiques adaptés aux personnes à mobilité réduite, en très bon état.\n\n*Cette annonce est publiée par le Site 3*",
        contact: "Robert au 07 98 76 54 32",
        category: "Don",
        date: "2025-08-05",
        author: "Robert Blanc",
        isValidated: true
      },
      {
        id: '603',
        title: "Recherche matériel pour jardin pédagogique",
        description: "Pour notre jardin pédagogique, nous recherchons du matériel adapté aux enfants : petits outils, gants, étiquettes, etc.\n\n*Cette annonce est publiée par le Site 3*",
        contact: "L'équipe pédagogique à equipe@site3.fr",
        category: "Recherche",
        date: "2025-07-30",
        author: "Équipe pédagogique",
        isValidated: true
      }
    ];
  }
  
  return {
    association_content: [associationData],
    blogPosts: blogPostsData,
    events: eventsData,
    form_fields: deepCopy(initialFormFields),
    applications: deepCopy(initialApplications),
    annonces: annoncesData
  };
};

// Créer les stores pour chaque site
export const site1DataStore: MockDataStoreType = createSiteData('site1');
export const site2DataStore: MockDataStoreType = createSiteData('site2');
export const site3DataStore: MockDataStoreType = createSiteData('site3');

// Store multi-sites qui contient les données de tous les sites
export const multiSiteDataStore: Record<string, MockDataStoreType> = {
  site1: site1DataStore,
  site2: site2DataStore,
  site3: site3DataStore
};

// Fonction pour obtenir le store d'un site spécifique
export const getSiteStore = (siteId: string): MockDataStoreType => {
  if (siteId in multiSiteDataStore) {
    return multiSiteDataStore[siteId];
  }
  console.error(`❌ Site ${siteId} non reconnu`);
  return site1DataStore; // Retourner le store du site1 par défaut
};

// Fonction pour mettre à jour le store d'un site spécifique
export const updateSiteStore = (siteId: string, table: string, data: any[]) => {
  if (siteId in multiSiteDataStore && table in multiSiteDataStore[siteId]) {
    multiSiteDataStore[siteId][table] = data;
    console.log(`✅ Store du site ${siteId} mis à jour pour ${table}:`, multiSiteDataStore[siteId][table]);
  } else {
    console.error(`❌ Site ${siteId} ou table ${table} non reconnu`);
  }
};
