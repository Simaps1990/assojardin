// Store central pour les données statiques
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

// Copie profonde des données initiales
export const mockDataStore: MockDataStoreType = {
  association_content: [JSON.parse(JSON.stringify(initialAssociationContent))],
  blogPosts: JSON.parse(JSON.stringify(initialBlogPosts)),
  events: JSON.parse(JSON.stringify(initialEvents)),
  form_fields: JSON.parse(JSON.stringify(initialFormFields)),
  applications: JSON.parse(JSON.stringify(initialApplications)),
  annonces: JSON.parse(JSON.stringify(initialAnnonces))
};

// Fonction pour mettre à jour le store
export const updateMockStore = (table: string, data: any[]) => {
  if (table in mockDataStore) {
    mockDataStore[table] = data;
    console.log(`✅ Store mis à jour pour ${table}:`, mockDataStore[table]);
  } else {
    console.error(`❌ Table ${table} non reconnue dans le store`); 
  }
};
