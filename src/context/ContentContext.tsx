import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { BlogPost, Event, FormField, Annonce } from '../types';

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
  addBlogPost: (post: Omit<BlogPost, 'id' | 'date'>) => void;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
  addEvent: (event: Omit<Event, 'id' | 'isPast'>) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  addApplication: (app: Omit<Application, 'id'>) => void;
  updateApplication: (id: string, app: Partial<Application>) => void;
  deleteApplication: (id: string) => void;
  updateFormFields: (fields: FormField[]) => void;
  annonces: Annonce[];
  fetchAnnonces: () => Promise<void>;
  addAnnonce: (a: Omit<Annonce, 'id' | 'date' | 'isValidated'>) => void;
  updateAnnonce: (id: string, a: Partial<Annonce>) => void;
  deleteAnnonce: (id: string) => void;


updateAssociationContent: (content: Partial<AssociationContentType>) => Promise<AssociationContentType | undefined>;
}
//const [annonces, setAnnonces] = useState<any[]>([]);

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

useEffect(() => {
  const fetchAssociationContent = async () => {
    const { data, error } = await supabase
      .from('association_content')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Erreur de chargement de l’association :', error.message);
      return;
    }
console.log("✅ Données association_content chargées :", JSON.stringify(data, null, 2));

setAssociationContent({
  id: data?.id || '',
  titreAccueil: data?.titreaccueil || '',
  texteIntro: data?.texteintro || '',
  texteFooter: data?.textefooter || '',
  adresse: data?.adresse || '',
  telephone: data?.telephone || '',
  email: data?.email || '',
  horaires: data?.horaires || '',
  imageAccueil: data?.imageaccueil || '',
  headerIcon: data?.headericon || '',
  titreAssociation: data?.titreassociation || '',
  contentAssociation: data?.contentassociation || '',
  imagesAssociation: data?.imagesassociation || [],
  parcellesTotal: data?.parcellestotal ?? 0,
  parcellesOccupees: data?.parcellesoccupees ?? 0,
});


  };

  fetchAssociationContent();
}, []);



  const [events, setEvents] = useState<Event[]>([]);

useEffect(() => {
  fetchEvents();
}, []);


const [applicationFormFields, setApplicationFormFields] = useState<FormField[]>([]);

useEffect(() => {
  const fetchFormFields = async () => {
    const { data, error } = await supabase
      .from('form_fields')
      .select('*')
      .order('label', { ascending: true });

    if (error) {
      console.error('Erreur de chargement des champs du formulaire :', error.message);
      return;
    }

    setApplicationFormFields(data || []);
  };

  fetchFormFields();
}, []);


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





const [applications, setApplications] = useState<Application[]>([]);
const [nonTraiteesApplications, setNonTraiteesApplications] = useState<number>(0);

useEffect(() => {
  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error('Erreur de chargement des candidatures Supabase:', error.message);
      return;
    }

    setApplications(data || []);
    const nonTraitees = (data || []).filter((a) => !a.processed).length;
    setNonTraiteesApplications(nonTraitees);
  };

  fetchApplications();
}, []);

useEffect(() => {
  const fetchBlogPosts = async () => {
    const { data, error } = await supabase
      .from('blogPosts')
      .select('*')
      .order('created_at', { ascending: false }); // ✅ ordre basé sur le champ "date"

    if (error) {
      console.error('❌ Erreur de chargement des articles Supabase:', error.message);
      return;
    }

    if (!data || data.length === 0) {
      console.warn('⚠️ Aucun article de blog reçu.');
    }

    console.log('✅ Blog posts chargés :', data);
    setBlogPosts(data || []);
  };

  fetchBlogPosts();
}, []);


const addBlogPost = async (post: Omit<BlogPost, 'id' | 'date'>) => {
  try {
    const { data, error } = await supabase
      .from('blogPosts')
      .insert([
        {
          ...post,
          date: new Date().toISOString().split('T')[0],
        },
      ])
      .select();

    if (error) throw error;

    const saved = data?.[0];
    if (!saved) return;

    setBlogPosts((prev) => {
      const filtered = prev.filter(p => p.id !== saved.id);
      return [saved, ...filtered];
    });
  } catch (err) {
    console.error('Erreur lors de l’ajout de l’article :', err);
  }
};


const updateBlogPost = async (id: string, post: Partial<BlogPost>) => {
  try {
    const { data, error } = await supabase
      .from('blogPosts')
      .update(post)
      .eq('id', id)
      .select();

    if (error) throw error;

    const updated = data?.[0];
    if (!updated) return;

    setBlogPosts((prev) =>
      prev.map((p) => (p.id === id ? updated : p))
    );
  } catch (err) {
    console.error('Erreur lors de la mise à jour de l’article :', err);
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
    console.error('Erreur lors de la suppression de l’article :', err);
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
    console.error('Erreur lors de l’ajout de l’événement :', err);
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
    console.error('Erreur lors de la mise à jour de l’événement :', err);
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
    console.error('Erreur lors de l’ajout de la candidature :', err);
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


 const fetchEvents = async () => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erreur de chargement des événements Supabase:', error.message);
    return;
  }

  const now = new Date();

  const dataWithFlags = (data || []).map((event) => ({
    ...event,
    isPast: new Date(event.date) < now,
  }));

  setEvents(dataWithFlags);
};

const [annonces, setAnnonces] = useState<Annonce[]>([]);

const fetchAnnonces = async () => {
  const { data, error } = await supabase
    .from('annonces')
    .select('*')
    .eq('statut', 'validé') // 🔥 On ne récupère que les annonces validées
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erreur chargement annonces :', error.message);
    return;
  }
  setAnnonces(data || []);
};


useEffect(() => {
  fetchAnnonces();
}, []);

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
