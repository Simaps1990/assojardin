import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BlogPost, Event, FormField, Annonce } from '../types';
import { getSiteStore, updateSiteStore } from '../multiSiteDataStore';
import { useMultiSiteAuth } from './MultiSiteAuthContext';

export interface Application {
  id: string;
  applicantName: string;
  email: string;
  phone?: string;
  message?: string;
  processed: boolean;
  date?: string;
}

export interface AssociationContentType {
  id: string;
  titreAccueil: string;
  texteIntro: string;
  texteFooter: string;
  adresse: string;
  telephone: string;
  email: string;
  horaires: string;
  imageAccueil: string;
  headerIcon: string;
  titreAssociation: string;
  contentAssociation: string;
  imagesAssociation: string[];
  parcellesTotal: number;
  parcellesOccupees: number;
}

export interface ContentContextType {
  blogPosts: BlogPost[];
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  applications: Application[];
  setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
  nonTraiteesApplications: number;
  setNonTraiteesApplications: React.Dispatch<React.SetStateAction<number>>;
  applicationFormFields: FormField[];
  setApplicationFormFields: React.Dispatch<React.SetStateAction<FormField[]>>;
  associationContent: AssociationContentType | null;
  setAssociationContent: React.Dispatch<React.SetStateAction<AssociationContentType | null>>;
  annonces: Annonce[];
  setAnnonces: React.Dispatch<React.SetStateAction<Annonce[]>>;
  addBlogPost: (post: Omit<BlogPost, 'id' | 'date'>) => Promise<void>;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;
  addEvent: (event: Omit<Event, 'id' | 'isPast'>) => Promise<void>;
  updateEvent: (id: string, event: Partial<Event>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  addApplication: (app: Omit<Application, 'id'>) => Promise<void>;
  updateApplication: (id: string, app: Partial<Application>) => Promise<void>;
  deleteApplication: (id: string) => Promise<void>;
  updateFormFields: (fields: FormField[]) => Promise<void>;
  addAnnonce: (a: Omit<Annonce, 'id' | 'date' | 'isValidated'>) => Promise<void>;
  updateAnnonce: (id: string, a: Partial<Annonce>) => Promise<void>;
  deleteAnnonce: (id: string) => Promise<void>;
  fetchBlogPosts: () => Promise<void>;
  fetchEvents: () => Promise<void>;
  fetchAnnonces: () => Promise<void>;
  updateAssociationContent: (content: Partial<AssociationContentType>) => Promise<AssociationContentType | undefined>;
  currentSiteId: string;
}

const MultiSiteContentContext = createContext<ContentContextType | undefined>(undefined);

export const MultiSiteContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentSite } = useMultiSiteAuth();
  const siteId = currentSite || 'site1'; // Utiliser site1 par défaut si aucun site n'est sélectionné
  
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [applicationFormFields, setApplicationFormFields] = useState<FormField[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [nonTraiteesApplications, setNonTraiteesApplications] = useState<number>(0);
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  
  // État pour le contenu de l'association
  const [associationContent, setAssociationContent] = useState<AssociationContentType | null>(null);

  // Charger les données initiales
  useEffect(() => {
    console.log(`Chargement des données pour le site: ${siteId}`);
    
    // Récupérer les données du store
    const siteStore = getSiteStore(siteId);
    
    // Initialiser les états avec les données du store
    setBlogPosts(siteStore.blogPosts || []);
    setEvents(siteStore.events || []);
    setApplicationFormFields(siteStore.form_fields || []);
    setApplications(siteStore.applications || []);
    setAnnonces(siteStore.annonces || []);
    
    // Calculer le nombre de candidatures non traitées
    const nonTraitees = (siteStore.applications || []).filter(app => !app.processed).length;
    setNonTraiteesApplications(nonTraitees);
    
    // Charger le contenu de l'association
    if (siteStore.association_content && siteStore.association_content.length > 0) {
      setAssociationContent(siteStore.association_content[0]);
    } else {
      // Contenu par défaut si aucun n'existe
      setAssociationContent({
        id: '1',
        titreAccueil: 'Bienvenue aux Jardins Partagés',
        texteIntro: 'Découvrez notre espace de jardinage communautaire.',
        texteFooter: 'Rejoignez-nous pour cultiver ensemble !',
        adresse: '123 Rue des Jardins, 69100 Villeurbanne',
        telephone: '04 78 XX XX XX',
        email: 'contact@jardins-partages.fr',
        horaires: 'Du lundi au vendredi de 9h à 18h',
        imageAccueil: '/uploads/default-garden.jpg',
        headerIcon: '/uploads/logo.svg',
        titreAssociation: 'Notre Association',
        contentAssociation: 'Nous sommes une association dédiée au jardinage urbain et au partage des connaissances.',
        imagesAssociation: [],
        parcellesTotal: 50,
        parcellesOccupees: 35,
      });
    }
  }, [siteId]);

  // Fonction pour ajouter un article de blog
  const addBlogPost = async (post: Omit<BlogPost, 'id' | 'date'>) => {
    try {
      // S'assurer que imagesannexes est un tableau non-null
      const sanitizedPost = {
        ...post,
        imagesannexes: Array.isArray(post.imagesannexes) 
          ? post.imagesannexes.filter(url => url !== null && url !== undefined) 
          : [],
        date: new Date().toISOString().split('T')[0],
        // Utiliser les valeurs existantes ou des valeurs par défaut
        category: post.category || 'Divers',
        author: post.author || 'Admin',
        id: Math.random().toString(36).substring(2, 15), // Générer un ID unique
      };
      
      console.log(`Ajout article avec données sanitizées pour ${siteId}:`, sanitizedPost);
      
      // Ajouter directement au store local
      const newPost = {
        ...sanitizedPost
      };

      // Mettre à jour l'état local
      const updatedPosts = [newPost, ...blogPosts.filter(p => p.id !== newPost.id)];
      setBlogPosts(updatedPosts);
      
      // Mettre à jour le store du site
      updateSiteStore(siteId, 'blogPosts', updatedPosts);
      
      console.log(`Article ajouté avec succès au site ${siteId}:`, newPost);
    } catch (err) {
      console.error('Erreur lors de l\'ajout de l\'article :', err);
    }
  };

  // Fonction pour mettre à jour un article de blog
  const updateBlogPost = async (id: string, post: Partial<BlogPost>) => {
    try {
      // Sanitiser les données avant mise à jour
      const sanitizedPost = { ...post };
      
      // S'assurer que imagesannexes est un tableau non-null si présent
      if (sanitizedPost.imagesannexes !== undefined) {
        console.log('Images annexes avant sanitisation:', sanitizedPost.imagesannexes);
        
        // Vérifier si le tableau contient des valeurs null
        if (Array.isArray(sanitizedPost.imagesannexes)) {
          // Si le tableau est vide ou contient uniquement des valeurs null, le remplacer par un tableau vide
          if (sanitizedPost.imagesannexes.length === 0) {
            console.log('Tableau d\'images annexes vide, on garde un tableau vide');
            sanitizedPost.imagesannexes = [];
          } else {
            const hasNonNullValues = sanitizedPost.imagesannexes.some(url => url !== null && url !== undefined);
            if (!hasNonNullValues) {
              console.log('Aucune image annexe valide, envoi d\'un tableau vide');
              sanitizedPost.imagesannexes = [];
            } else {
              // Filtrer les valeurs null pour éviter les problèmes
              sanitizedPost.imagesannexes = sanitizedPost.imagesannexes.filter(url => url !== null && url !== undefined);
              console.log('Images annexes après filtrage des null:', sanitizedPost.imagesannexes);
            }
          }
        } else {
          console.log('Format invalide pour imagesannexes, envoi d\'un tableau vide');
          sanitizedPost.imagesannexes = [];
        }
      }
      
      console.log(`Mise à jour article ${id} avec données sanitizées pour ${siteId}:`, sanitizedPost);
      
      // Trouver l'article à mettre à jour dans le store local
      const existingPost = blogPosts.find(p => p.id === id);
      if (!existingPost) {
        console.warn(`Article avec ID ${id} non trouvé dans le site ${siteId}`);
        return;
      }
      
      // Mettre à jour l'article
      const updated = {
        ...existingPost,
        ...sanitizedPost
      };
      
      // Mettre à jour l'état local
      const updatedPosts = blogPosts.map((p) => (p.id === id ? updated : p));
      setBlogPosts(updatedPosts);
      
      // Mettre à jour le store du site
      updateSiteStore(siteId, 'blogPosts', updatedPosts);
      
      console.log(`Article mis à jour avec succès dans le site ${siteId}:`, updated);
    } catch (err) {
      console.error('Erreur lors de la mise à jour de l\'article :', err);
    }
  };

  // Fonction pour supprimer un article de blog
  const deleteBlogPost = async (id: string) => {
    try {
      // Mettre à jour l'état local en supprimant l'article
      const updatedPosts = blogPosts.filter((p) => p.id !== id);
      setBlogPosts(updatedPosts);
      
      // Mettre à jour le store du site
      updateSiteStore(siteId, 'blogPosts', updatedPosts);
      
      console.log(`Article avec ID ${id} supprimé du site ${siteId}`);
    } catch (err) {
      console.error('Erreur lors de la suppression de l\'article :', err);
    }
  };

  // Fonction pour ajouter un événement
  const addEvent = async (event: Omit<Event, 'id' | 'isPast'>) => {
    try {
      // Créer un événement complet avec les valeurs par défaut
      const completeEvent = {
        ...event,
        image: event.image || '/uploads/events/default-event.jpg', // Image par défaut
        id: Math.random().toString(36).substring(2, 15), // Générer un ID unique
        date: event.date || new Date().toISOString().split('T')[0], // Date par défaut
      };

      // Créer le nouvel événement
      const newEvent: Event = {
        ...completeEvent,
        isPast: new Date(completeEvent.date) < new Date()
      };

      // Mettre à jour l'état local
      const updatedEvents = [newEvent, ...events.filter(e => e.id !== newEvent.id)];
      setEvents(updatedEvents);
      
      // Mettre à jour le store du site
      updateSiteStore(siteId, 'events', updatedEvents);
      
      console.log(`Événement ajouté avec succès au site ${siteId}:`, newEvent);
    } catch (err) {
      console.error('Erreur lors de l\'ajout de l\'événement :', err);
    }
  };

  // Fonction pour mettre à jour un événement
  const updateEvent = async (id: string, event: Partial<Event>) => {
    try {
      // Trouver l'événement à mettre à jour
      const existingEvent = events.find(e => e.id === id);
      if (!existingEvent) {
        console.warn(`Événement avec ID ${id} non trouvé dans le site ${siteId}`);
        return;
      }

      // Mettre à jour l'état local
      const updatedEvents = events.map((e) =>
        e.id === id
          ? {
              ...e,
              ...event,
              isPast: event.date ? new Date(event.date) < new Date() : e.isPast
            }
          : e
      );
      setEvents(updatedEvents);
      
      // Mettre à jour le store du site
      updateSiteStore(siteId, 'events', updatedEvents);
      
      console.log(`Événement mis à jour avec succès dans le site ${siteId}`);
    } catch (err) {
      console.error('Erreur lors de la mise à jour de l\'événement :', err);
    }
  };

  // Fonction pour supprimer un événement
  const deleteEvent = async (id: string) => {
    try {
      // Mettre à jour l'état local
      const updatedEvents = events.filter((e) => e.id !== id);
      setEvents(updatedEvents);
      
      // Mettre à jour le store du site
      updateSiteStore(siteId, 'events', updatedEvents);
      
      console.log(`Événement avec ID ${id} supprimé du site ${siteId}`);
    } catch (err) {
      console.error('Erreur lors de la suppression de l\'événement :', err);
    }
  };

  // Fonction pour ajouter une candidature
  const addApplication = async (app: Omit<Application, 'id'>) => {
    try {
      // S'assurer que tous les champs requis sont présents
      const completeApp = {
        ...app,
        id: Math.random().toString(36).substring(2, 15), // Générer un ID unique
        processed: false, // Par défaut, les nouvelles candidatures ne sont pas traitées
      };

      // Créer la nouvelle candidature
      const newApplication = {
        ...completeApp
      };

      // Mettre à jour l'état local
      const updatedApplications = [newApplication, ...applications.filter(a => a.id !== newApplication.id)];
      setApplications(updatedApplications);
      
      // Mettre à jour le compteur de candidatures non traitées
      setNonTraiteesApplications(prev => prev + 1);
      
      // Mettre à jour le store du site
      updateSiteStore(siteId, 'applications', updatedApplications);
      
      console.log(`Candidature ajoutée avec succès au site ${siteId}:`, newApplication);
    } catch (err) {
      console.error('Erreur lors de l\'ajout de la candidature :', err);
    }
  };

  // Fonction pour mettre à jour une candidature
  const updateApplication = async (id: string, app: Partial<Application>) => {
    try {
      // Trouver la candidature à mettre à jour
      const existingApp = applications.find(a => a.id === id);
      if (!existingApp) {
        console.warn(`Candidature avec ID ${id} non trouvée dans le site ${siteId}`);
        return;
      }

      // Mettre à jour l'état local
      const updatedApplications = applications.map((a) => (
        a.id === id ? { ...a, ...app } : a
      ));
      setApplications(updatedApplications);
      
      // Mettre à jour le compteur de candidatures non traitées
      const nonTraitees = updatedApplications.filter((a) => !a.processed).length;
      setNonTraiteesApplications(nonTraitees);
      
      // Mettre à jour le store du site
      updateSiteStore(siteId, 'applications', updatedApplications);
      
      console.log(`Candidature mise à jour avec succès dans le site ${siteId}`);
    } catch (err) {
      console.error('Erreur lors de la mise à jour de la candidature :', err);
    }
  };

  // Fonction pour supprimer une candidature
  const deleteApplication = async (id: string) => {
    try {
      // Mettre à jour l'état local
      const updatedApplications = applications.filter((a) => a.id !== id);
      setApplications(updatedApplications);
      
      // Mettre à jour le compteur de candidatures non traitées
      const nonTraitees = updatedApplications.filter((a) => !a.processed).length;
      setNonTraiteesApplications(nonTraitees);
      
      // Mettre à jour le store du site
      updateSiteStore(siteId, 'applications', updatedApplications);
      
      console.log(`Candidature avec ID ${id} supprimée du site ${siteId}`);
    } catch (err) {
      console.error('Erreur lors de la suppression de la candidature :', err);
    }
  };

  // Fonction pour mettre à jour les champs du formulaire
  const updateFormFields = async (fields: FormField[]) => {
    try {
      // Mettre à jour l'état local directement
      setApplicationFormFields(fields);
      
      // Mettre à jour le store du site
      updateSiteStore(siteId, 'form_fields', fields);
      
      console.log(`Champs du formulaire mis à jour avec succès dans le site ${siteId}`);
    } catch (err) {
      console.error('Erreur lors de la mise à jour des champs du formulaire :', err);
    }
  };

  // Fonction pour mettre à jour le contenu de l'association
  const updateAssociationContent = async (
    updatedContent: Partial<AssociationContentType>
  ): Promise<AssociationContentType | undefined> => {
    try {
      if (!updatedContent.id) {
        console.error('updateAssociationContent → aucun ID fourni.');
        return;
      }

      // Trouver le contenu de l'association à mettre à jour
      const existingContent = associationContent;
      if (!existingContent) {
        console.warn(`Contenu d'association non trouvé dans le site ${siteId}`);
        return;
      }

      // Préparer les données mises à jour
      const updatedAssociationContent: AssociationContentType = {
        ...existingContent,
        ...updatedContent
      };

      console.log(`Mise à jour du contenu d'association pour le site ${siteId}:`, updatedAssociationContent);

      // Mettre à jour l'état local
      setAssociationContent(updatedAssociationContent);
      
      // Mettre à jour le store du site
      updateSiteStore(siteId, 'association_content', [updatedAssociationContent]);
      
      // Sauvegarder dans localStorage pour la persistance
      localStorage.setItem(`${siteId}_associationContent`, JSON.stringify(updatedAssociationContent));
      
      console.log(`Contenu d'association mis à jour avec succès dans le site ${siteId}`);
      
      return updatedAssociationContent;
    } catch (err) {
      console.error('Erreur lors de la mise à jour du contenu d\'association :', err);
      return undefined;
    }
  };

  // Fonction pour récupérer les articles de blog
  const fetchBlogPosts = async () => {
    console.log(`✅ Chargement des articles de blog pour ${siteId}`);
    const siteStore = getSiteStore(siteId);
    setBlogPosts(siteStore.blogPosts);
  };

  // Fonction pour récupérer les événements
  const fetchEvents = async () => {
    console.log(`✅ Chargement des événements pour ${siteId}`);
    const siteStore = getSiteStore(siteId);
    setEvents(siteStore.events);
  };

  // Fonction pour récupérer les annonces
  const fetchAnnonces = async () => {
    console.log(`✅ Chargement des annonces pour ${siteId}`);
    const siteStore = getSiteStore(siteId);
    setAnnonces(siteStore.annonces);
  };

  // Fonction pour ajouter une annonce
  const addAnnonce = async (a: Omit<Annonce, 'id' | 'date' | 'isValidated'>) => {
    try {
      // S'assurer que tous les champs requis sont présents
      const completeAnnonce = {
        ...a,
        id: Math.random().toString(36).substring(2, 15), // Générer un ID unique
        date: new Date().toISOString().split('T')[0], // Date du jour
        isValidated: false, // Par défaut, les nouvelles annonces ne sont pas validées
      };

      // Mettre à jour l'état local
      const updatedAnnonces = [completeAnnonce, ...annonces.filter(an => an.id !== completeAnnonce.id)];
      setAnnonces(updatedAnnonces);
      
      // Mettre à jour le store du site
      updateSiteStore(siteId, 'annonces', updatedAnnonces);
      
      console.log(`Annonce ajoutée avec succès au site ${siteId}:`, completeAnnonce);
    } catch (err) {
      console.error('Erreur lors de l\'ajout de l\'annonce :', err);
    }
  };

  // Fonction pour mettre à jour une annonce
  const updateAnnonce = async (id: string, a: Partial<Annonce>) => {
    try {
      // Mettre à jour l'état local
      const updatedAnnonces = annonces.map((an) => (an.id === id ? { ...an, ...a } : an));
      setAnnonces(updatedAnnonces);
      
      // Mettre à jour le store du site
      updateSiteStore(siteId, 'annonces', updatedAnnonces);
      
      console.log(`Annonce mise à jour avec succès au site ${siteId}`);
    } catch (err) {
      console.error('Erreur lors de la mise à jour de l\'annonce :', err);
    }
  };

  // Fonction pour supprimer une annonce
  const deleteAnnonce = async (id: string) => {
    try {
      // Mettre à jour l'état local
      const updatedAnnonces = annonces.filter(a => a.id !== id);
      setAnnonces(updatedAnnonces);
      
      // Mettre à jour le store du site
      updateSiteStore(siteId, 'annonces', updatedAnnonces);
      
      console.log(`Annonce avec ID ${id} supprimée du site ${siteId}`);
    } catch (err) {
      console.error('Erreur lors de la suppression de l\'annonce :', err);
    }
  };

  return (
    <MultiSiteContentContext.Provider
      value={{
        blogPosts,
        setBlogPosts,
        events,
        setEvents,
        fetchEvents,
        applications,
        setApplications,
        nonTraiteesApplications,
        setNonTraiteesApplications,
        applicationFormFields,
        setApplicationFormFields,
        associationContent,
        setAssociationContent,
        annonces,
        setAnnonces,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        addEvent,
        updateEvent,
        deleteEvent,
        addApplication,
        updateApplication,
        deleteApplication,
        updateFormFields,
        updateAssociationContent,
        fetchBlogPosts,
        fetchEvents,
        fetchAnnonces,
        addAnnonce,
        updateAnnonce,
        deleteAnnonce,
        currentSiteId: siteId,
      }}
    >
      {children}
    </MultiSiteContentContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useMultiSiteContent = (): ContentContextType => {
  const context = useContext(MultiSiteContentContext);
  if (!context) throw new Error('useMultiSiteContent must be used within MultiSiteContentProvider');
  return context;
};
