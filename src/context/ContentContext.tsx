import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { BlogPost, Event, FormField, Annonce } from '../types';
import { blogPosts as staticBlogPosts, events as staticEvents, formFields as staticFormFields, applications as staticApplications, annonces as staticAnnonces, associationContent as staticAssociationContent } from '../mockData';

export interface Application {
  id: string;
  applicantName: string;
  email: string;
  phone?: string;
  message?: string;
  processed: boolean;
}

export interface AssociationContentType {
  id: string;
  titreAccueil: string;
  texteIntro: string;
  texteFooter: string;
  adresse?: string;
  telephone?: string;
  email?: string;
  horaires?: string;
  imageAccueil?: string;
  headerIcon?: string;
  titreAssociation?: string;
  contentAssociation?: string;
  imagesAssociation?: (string | null)[];
  parcellesTotal?: number;
  parcellesOccupees?: number;
}

interface ContentContextType {
  blogPosts: BlogPost[];
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  fetchEvents: () => Promise<void>;
  applicationFormFields: FormField[];
  associationContent: AssociationContentType;
  applications: Application[];
  nonTraiteesApplications: number;
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
  annonces: Annonce[];
  fetchAnnonces: () => Promise<void>;
  addAnnonce: (a: Omit<Annonce, 'id' | 'date' | 'isValidated'>) => Promise<void>;
  updateAnnonce: (id: string, a: Partial<Annonce>) => Promise<void>;
  deleteAnnonce: (id: string) => Promise<void>;
  fetchBlogPosts: () => Promise<void>;
  updateAssociationContent: (content: Partial<AssociationContentType>) => Promise<AssociationContentType | undefined>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [applicationFormFields, setApplicationFormFields] = useState<FormField[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [nonTraiteesApplications, setNonTraiteesApplications] = useState<number>(0);
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  
  const [associationContent, setAssociationContent] = useState<AssociationContentType>({
    id: '',
    titreAccueil: '',
    texteIntro: '',
    texteFooter: '',
    adresse: '',
    telephone: '',
    email: '',
    horaires: '',
    imageAccueil: '',
    headerIcon: '',
    titreAssociation: '',
    contentAssociation: '',
    imagesAssociation: [],
    parcellesTotal: 0,
    parcellesOccupees: 0,
  });

  useEffect(() => {
    // Utiliser les données statiques pour l'association
    setAssociationContent(staticAssociationContent);
    console.log("✅ Données association_content chargées depuis les données statiques");
  }, []);

  useEffect(() => {
    // Utiliser les données statiques pour les événements
    setEvents(staticEvents);
    console.log("✅ Événements chargés depuis les données statiques");
  }, []);

  useEffect(() => {
    // Utiliser les données statiques pour les champs du formulaire
    setApplicationFormFields(staticFormFields);
    console.log("✅ Champs du formulaire chargés depuis les données statiques");
  }, []);

  useEffect(() => {
    // Utiliser les données statiques pour les candidatures
    setApplications(staticApplications);
    const nonTraitees = staticApplications.filter((a) => !a.processed).length;
    setNonTraiteesApplications(nonTraitees);
    console.log("✅ Candidatures chargées depuis les données statiques");
  }, []);

  useEffect(() => {
    // Utiliser les données statiques pour les articles de blog
    setBlogPosts(staticBlogPosts);
    console.log("✅ Articles de blog chargés depuis les données statiques");
  }, []);

  useEffect(() => {
    // Utiliser les données statiques pour les annonces
    setAnnonces(staticAnnonces);
    console.log("✅ Annonces chargées depuis les données statiques");
  }, []);

  // Fonction améliorée pour ajouter un article de blog
  const addBlogPost = async (post: Omit<BlogPost, 'id' | 'date'>) => {
    try {
      // S'assurer que imagesannexes est un tableau non-null
      const sanitizedPost = {
        ...post,
        imagesannexes: Array.isArray(post.imagesannexes) 
          ? post.imagesannexes.filter(url => url !== null && url !== undefined) 
          : [],
        date: new Date().toISOString().split('T')[0],
      };
      
      console.log('Ajout article avec données sanitisées:', sanitizedPost);
      
      const { data, error } = await supabase
        .from('blogPosts')
        .insert([sanitizedPost])
        .select();

      if (error) {
        console.error('Erreur Supabase lors de l\'ajout de l\'article:', error);
        throw error;
      }

      const saved = data?.[0];
      if (!saved) {
        console.warn('Aucune donnée retournée après insertion');
        return;
      }
      
      console.log('Article sauvegardé avec succès:', saved);

      setBlogPosts((prev) => {
        const filtered = prev.filter(p => p.id !== saved.id);
        return [saved, ...filtered];
      });
    } catch (err) {
      console.error('Erreur lors de l\'ajout de l\'article :', err);
    }
  };

  // Fonction améliorée pour mettre à jour un article de blog
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
          // car Supabase ne gère pas bien les tableaux avec uniquement des valeurs null
          if (sanitizedPost.imagesannexes.length === 0) {
            console.log('Tableau d\'images annexes vide, on garde un tableau vide');
            sanitizedPost.imagesannexes = [];
          } else {
            const hasNonNullValues = sanitizedPost.imagesannexes.some(url => url !== null && url !== undefined);
            if (!hasNonNullValues) {
              console.log('Aucune image annexe valide, envoi d\'un tableau vide');
              sanitizedPost.imagesannexes = [];
            } else {
              // Filtrer les valeurs null pour éviter les problèmes avec Supabase
              sanitizedPost.imagesannexes = sanitizedPost.imagesannexes.filter(url => url !== null && url !== undefined);
              console.log('Images annexes après filtrage des null:', sanitizedPost.imagesannexes);
            }
          }
        } else {
          console.log('Format invalide pour imagesannexes, envoi d\'un tableau vide');
          sanitizedPost.imagesannexes = [];
        }
      }
      
      console.log(`Mise à jour article ${id} avec données sanitisées:`, sanitizedPost);
      
      const { data, error } = await supabase
        .from('blogPosts')
        .update(sanitizedPost)
        .eq('id', id)
        .select();

      if (error) {
        console.error('Erreur Supabase lors de la mise à jour:', error);
        throw error;
      }

      const updated = data?.[0];
      if (!updated) {
        console.warn('Aucune donnée retournée après mise à jour');
        return;
      }
      
      console.log('Article mis à jour avec succès:', updated);

      setBlogPosts((prev) =>
        prev.map((p) => (p.id === id ? updated : p))
      );
    } catch (err) {
      console.error('Erreur lors de la mise à jour de l\'article :', err);
    }
  };

  const deleteBlogPost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blogPosts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setBlogPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Erreur lors de la suppression de l\'article :', err);
    }
  };

  const addEvent = async (event: Omit<Event, 'id' | 'isPast'>) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .insert([{ ...event }])
        .select();

      if (error) throw error;

      const saved = data?.[0];
      if (!saved) return;

      const newEvent: Event = {
        ...saved,
        id: saved.id,
        isPast: new Date(saved.date) < new Date(),
      };

      setEvents((prev) => [newEvent, ...prev]);
    } catch (err) {
      console.error('Erreur lors de l\'ajout de l\'événement :', err);
    }
  };

  const updateEvent = async (id: string, event: Partial<Event>) => {
    try {
      const { error } = await supabase
        .from('events')
        .update(event)
        .eq('id', id);

      if (error) throw error;

      setEvents((prev) =>
        prev.map((e) =>
          e.id === id
            ? {
                ...e,
                ...event,
                isPast: event.date ? new Date(event.date) < new Date() : e.isPast,
              }
            : e
        )
      );
    } catch (err) {
      console.error('Erreur lors de la mise à jour de l\'événement :', err);
    }
  };

  const deleteEvent = async (id: string) => {
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (error) {
      console.error('Erreur suppression événement Supabase :', error.message);
      return;
    }
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const addApplication = async (app: Omit<Application, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .insert([app])
        .select();

      if (error) throw error;

      const saved = data?.[0];
      if (!saved) return;

      setApplications((prev) => [saved, ...prev]);
    } catch (err) {
      console.error('Erreur lors de l\'ajout de la candidature :', err);
    }
  };

  const updateApplication = async (id: string, app: Partial<Application>) => {
    try {
      const { error } = await supabase
        .from('applications')
        .update(app)
        .eq('id', id);

      if (error) throw error;

      setApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...app } : a))
      );
    } catch (err) {
      console.error('Erreur lors de la mise à jour de la candidature :', err);
    }
  };

  const deleteApplication = async (id: string) => {
    try {
      const { error } = await supabase
        .from('applications')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setApplications((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error('Erreur lors de la suppression de la candidature :', err);
    }
  };

  const updateFormFields = async (fields: FormField[]) => {
    try {
      // Supprimer les anciens champs
      const { error: deleteError } = await supabase.from('form_fields').delete().neq('id', '');
      if (deleteError) throw deleteError;

      // Insérer les nouveaux
      const { error: insertError } = await supabase.from('form_fields').insert(fields);
      if (insertError) throw insertError;

      setApplicationFormFields(fields);
    } catch (err) {
      console.error('Erreur lors de la mise à jour des champs du formulaire :', err);
    }
  };

  const updateAssociationContent = async (
    updatedContent: Partial<AssociationContentType>
  ): Promise<AssociationContentType | undefined> => {
    if (!updatedContent.id) {
      console.error('updateAssociationContent → aucun ID fourni.');
      return;
    }

    const mappedContent: any = {
      ...(updatedContent.titreAccueil !== undefined && { titreaccueil: updatedContent.titreAccueil }),
      ...(updatedContent.texteIntro !== undefined && { texteintro: updatedContent.texteIntro }),
      ...(updatedContent.texteFooter !== undefined && { textefooter: updatedContent.texteFooter }),
      ...(updatedContent.titreAssociation !== undefined && { titreassociation: updatedContent.titreAssociation }),
      ...(updatedContent.contentAssociation !== undefined && { contentassociation: updatedContent.contentAssociation }),
      ...(updatedContent.parcellesOccupees !== undefined && { parcellesoccupees: updatedContent.parcellesOccupees }),
      ...(updatedContent.parcellesTotal !== undefined && { parcellestotal: updatedContent.parcellesTotal }),
      ...(updatedContent.imageAccueil !== undefined && { imageaccueil: updatedContent.imageAccueil }),
      ...(updatedContent.headerIcon !== undefined && { headericon: updatedContent.headerIcon }),
      ...(updatedContent.adresse !== undefined && { adresse: updatedContent.adresse }),
      ...(updatedContent.telephone !== undefined && { telephone: updatedContent.telephone }),
      ...(updatedContent.email !== undefined && { email: updatedContent.email }),
      ...(updatedContent.horaires !== undefined && { horaires: updatedContent.horaires }),
      ...(updatedContent.imagesAssociation !== undefined && { imagesassociation: updatedContent.imagesAssociation }),
    };

    console.log('🟡 mappedContent envoyé à Supabase :', JSON.stringify(mappedContent, null, 2));

    const { error } = await supabase
      .from('association_content')
      .update(mappedContent)
      .eq('id', updatedContent.id);

    if (error) {
      console.error('❌ Erreur lors de la mise à jour Supabase :', error.message);
      return;
    }

    const { data: refreshed, error: fetchError } = await supabase
      .from('association_content')
      .select('*')
      .eq('id', updatedContent.id)
      .maybeSingle();

    if (fetchError || !refreshed) {
      console.error('❌ Erreur de relecture après mise à jour :', fetchError?.message);
      return;
    }

    const mapped: AssociationContentType = {
      id: refreshed.id,
      titreAccueil: refreshed.titreaccueil,
      texteIntro: refreshed.texteintro,
      texteFooter: refreshed.textefooter,
      adresse: refreshed.adresse,
      telephone: refreshed.telephone,
      email: refreshed.email,
      horaires: refreshed.horaires,
      imageAccueil: refreshed.imageaccueil,
      headerIcon: refreshed.headericon,
      titreAssociation: refreshed.titreassociation,
      contentAssociation: refreshed.contentassociation,
      imagesAssociation: refreshed.imagesassociation || [],
      parcellesTotal: refreshed.parcellestotal ?? 0,
      parcellesOccupees: refreshed.parcellesoccupees ?? 0,
    };

    setAssociationContent(mapped);
    localStorage.setItem('sjov_associationContent', JSON.stringify(mapped));
    return mapped;
  };

  // Fonction simplifiée pour récupérer les articles de blog (utilise les données statiques)
  const fetchBlogPosts = async () => {
    console.log('✅ Chargement des articles de blog depuis les données statiques');
    setBlogPosts(staticBlogPosts);
  };

  // Fonction simplifiée pour récupérer les événements (utilise les données statiques)
  const fetchEvents = async () => {
    console.log('✅ Chargement des événements depuis les données statiques');
    setEvents(staticEvents);
  };

  // Fonction simplifiée pour récupérer les annonces (utilise les données statiques)
  const fetchAnnonces = async () => {
    console.log('✅ Chargement des annonces depuis les données statiques');
    setAnnonces(staticAnnonces);
  };

  const addAnnonce = async (a: Omit<Annonce, 'id' | 'date' | 'isValidated'>) => {
    const { data, error } = await supabase
      .from('annonces')
      .insert([{ ...a, isValidated: false }])
      .select();

    if (error) return console.error('Erreur ajout annonce :', error.message);
    if (data?.[0]) setAnnonces((prev) => [data[0], ...prev]);
  };

  const updateAnnonce = async (id: string, a: Partial<Annonce>) => {
    const { data, error } = await supabase
      .from('annonces')
      .update(a)
      .eq('id', id)
      .select();

    if (error) return console.error('Erreur maj annonce :', error.message);
    if (data?.[0]) setAnnonces((prev) => prev.map((an) => (an.id === id ? data[0] : an)));
  };

  const deleteAnnonce = async (id: string) => {
    const { error } = await supabase.from('annonces').delete().eq('id', id);
    if (error) return console.error('Erreur suppression annonce :', error.message);
    setAnnonces((prev) => prev.filter((a) => a.id !== id));
  };

  console.log("Annonces récupérées depuis le contexte :", annonces);

  return (
    <ContentContext.Provider
      value={{
        blogPosts,
        setBlogPosts,
        events,
        setEvents,
        fetchEvents,
        fetchBlogPosts,
        applicationFormFields,
        associationContent,
        applications,
        nonTraiteesApplications,
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
        annonces,
        fetchAnnonces,
        addAnnonce,
        updateAnnonce,
        deleteAnnonce,
        updateAssociationContent,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = (): ContentContextType => {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used within ContentProvider');
  return context;
};
