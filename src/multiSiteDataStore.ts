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
    associationData.titreAccueil = `Bienvenue aux Jardins Partagés - ${siteId.toUpperCase()}`;
    associationData.texteIntro = `Notre association ${siteId} promeut le jardinage écologique et crée du lien social à travers la culture de parcelles individuelles et collectives.`;
    associationData.email = `contact@${siteId}.jardins-partages.fr`;
  }
  
  // Créer des données spécifiques pour chaque site
  const blogPostsData = deepCopy(initialBlogPosts).map((post: any) => ({
    ...post,
    title: `[${siteId}] ${post.title}`,
    content: `${post.content}\n\n*Cet article appartient au site ${siteId}*`
  }));
  
  const eventsData = deepCopy(initialEvents).map((event: any) => ({
    ...event,
    title: `[${siteId}] ${event.title}`,
    description: `${event.description}\n\n*Cet événement appartient au site ${siteId}*`
  }));
  
  const annoncesData = deepCopy(initialAnnonces).map((annonce: any) => ({
    ...annonce,
    title: `[${siteId}] ${annonce.title}`,
    description: `${annonce.description}\n\n*Cette annonce appartient au site ${siteId}*`
  }));
  
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
