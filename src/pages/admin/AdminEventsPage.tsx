import React, { useState, useRef, useEffect } from 'react';
import { Event } from '../../types';
import { supabase } from '../../supabaseClient';
import { useContent } from '../../context/ContentContext';

const AdminEventsPage: React.FC = () => {

const { events, setEvents, fetchEvents: refreshGlobalEvents } = useContent();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [start, setStart] = useState('');
  const [enddate, setEnddate] = useState('');
const [imagesannexesFiles, setImagesannexesFiles] = useState<(File | null)[]>([null, null, null]);
const [imagesannexesUrls, setImagesannexesUrls] = useState<(string | null)[]>([null, null, null]);
  const [error, setError] = useState('');
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
const [uploadedCoverUrl, setUploadedCoverUrl] = useState<string | null>(null);

const fileInputRef = useRef<HTMLInputElement | null>(null);

  const contentRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const file = imagesannexesFiles[0];
  if (file) {
    const objectUrl = URL.createObjectURL(file);
    const newUrls = [...imagesannexesUrls];
    newUrls[0] = objectUrl;
    setImagesannexesUrls(newUrls);

    return () => URL.revokeObjectURL(objectUrl);
  }
}, [imagesannexesFiles]);

useEffect(() => {
  if (uploadedCoverUrl) {
    const newUrls = [...imagesannexesUrls];
    if (newUrls[0] !== uploadedCoverUrl) {
      newUrls[0] = uploadedCoverUrl;
      setImagesannexesUrls(newUrls);
    }
  }
}, [uploadedCoverUrl]);




useEffect(() => {
  refreshGlobalEvents();
}, []);




const handleImagesannexesChange = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const newFiles = [...imagesannexesFiles];
  newFiles[index] = file;
  setImagesannexesFiles(newFiles);

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'site_global_uploads');

  try {
    const res = await fetch('https://api.cloudinary.com/v1_1/da2pceyci/image/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    if (data.secure_url) {
      const newUrls = [...imagesannexesUrls];
      newUrls[index] = data.secure_url;
      setImagesannexesUrls(newUrls);
    }
  } catch (err) {
    console.error('Erreur upload image Cloudinary', err);
  }
};





  const handleToolbarClick = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  const handleFontSizeChange = (size: string) => {
    if (!contentRef.current) return;
    document.execCommand('fontSize', false, '7');
    const spans = contentRef.current.querySelectorAll('span[style*="font-size"]');
    spans.forEach((el) => {
      const span = el as HTMLElement;
      if (span.style.fontSize) {
        span.style.fontSize = size;
      }
    });
  };


const handleAddEvent = async () => {
setUploadedCoverUrl(null);

    if (!title || !start || !enddate || !contentRef.current) return;

    if (new Date(start) > new Date(enddate)) {
      setError("La date de début ne peut pas être postérieure à la date de fin.");
      return;
    }

const imageToSave = imagesannexesUrls[0]?.startsWith('blob:')
  ? uploadedCoverUrl ?? ''
  : imagesannexesUrls[0] ?? uploadedCoverUrl ?? '';
console.log('DEBUG - Champs transmis à Supabase :', {
  title,
  description,
  location,
  start,
  enddate,
  content: contentRef.current?.innerHTML,
image: imageToSave,
});
const finalImage = uploadedCoverUrl || imagesannexesUrls[0] || '';
setUploadedCoverUrl(finalImage); // sécurise la cover au cas où non modifiée
const sanitizedAnnexes = imagesannexesUrls.map((url) =>
  url && !url.startsWith('blob:') ? url : null
);

const newEvent: Omit<Event, 'id' | 'isPast'> = {
  title,
  description,
  location,
  start,
  enddate,
  content: contentRef.current.innerHTML,
image: finalImage,
  date: start.split('T')[0], // 👈 adapte la date au format 'YYYY-MM-DD' exigé par Supabase
imagesannexes: sanitizedAnnexes,
  author: 'admin',   // ou remplace par un vrai utilisateur si tu gères l'auth
  created_at: new Date().toISOString(),
};


try {
  if (editingEventId) {
const { data: updated, error: updateError } = await supabase
  .from('events')
  .update(newEvent)
  .eq('id', editingEventId)
  .select()
  .single();

if (updateError) throw updateError;

const updatedEvent: Event = {
  ...updated,
  isPast: new Date(updated.date) < new Date(),
};

setEvents((prev) =>
  prev.map((e) => (e.id === editingEventId ? updatedEvent : e))
);

setEditingEventId(null);

  } else {
const { data: inserted, error: insertError } = await supabase
  .from('events')
  .insert(newEvent)
  .select()
  .single(); // pour ne récupérer qu’un seul

if (insertError) throw insertError;

const saved = inserted;

if (saved) {
  const newEventWithComputed: Event = {
    ...saved,
    isPast: new Date(saved.date) < new Date(),
  };
  setEvents((prev) => [newEventWithComputed, ...prev]);
}


    if (insertError) throw insertError;
  }
} catch (error) {
  console.error('Erreur lors de l’enregistrement dans Supabase :', error);
  setError('Erreur lors de l’enregistrement.');
  return;
}



    setTitle('');
    setDescription('');
    setLocation('');
    setStart('');
    setEnddate('');
setImagesannexesFiles([null, null, null]);
setImagesannexesUrls([null, null, null]);

    if (contentRef.current) contentRef.current.innerHTML = '';
    setError('');
if (fileInputRef.current) {
  fileInputRef.current.value = '';
}
    window.scrollTo(0, 0); // Scroll haut après ajout ou modif
    
    await refreshGlobalEvents();

  };

  const handleCancelEdit = () => {
    setTitle('');
    setDescription('');
    setLocation('');
    setStart('');
    setEnddate('');
setImagesannexesFiles([null, null, null]);

    if (contentRef.current) contentRef.current.innerHTML = '';
    setEditingEventId(null);
    setError('');
if (fileInputRef.current) {
  fileInputRef.current.value = '';
}

    window.scrollTo(0, 0); // Scroll haut après annulation
  };

const sortedEvents = [...events].sort((a, b) => {
  const dateA = a.start ? new Date(a.start).getTime() : 0;
  const dateB = b.start ? new Date(b.start).getTime() : 0;
  return dateB - dateA;
});


  return (
    <div className="space-y-6 pb-16">
      <h1 className="text-3xl font-bold text-gray-800">Gestion des événements</h1>

      <h2 className="text-xl font-semibold text-gray-800">{editingEventId ? 'Modifier un événement' : 'Créer un événement'}</h2>

      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        {error && <p className="text-red-600 font-medium">{error}</p>}

        <input type="text" placeholder="Titre" className="w-full border px-3 py-2 rounded" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Lieu" className="w-full border px-3 py-2 rounded" value={location} onChange={(e) => setLocation(e.target.value)} />


        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Début</label>
<input
  type="datetime-local"
  value={start}
  onChange={(e) => setStart(e.target.value)}
  onFocus={(e) => e.currentTarget.showPicker?.()}
  className="w-full border px-3 py-2 rounded"
/>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Fin</label>
<input
  type="datetime-local"
  value={enddate}
  onChange={(e) => setEnddate(e.target.value)}
  onFocus={(e) => e.currentTarget.showPicker?.()}
  className="w-full border px-3 py-2 rounded"
/>
          </div>
        </div>

<div className="flex flex-wrap gap-2 items-center text-sm">
  <button type="button" onClick={() => handleToolbarClick('bold')} className="px-2 py-1 border rounded">Gras</button>
  <button type="button" onClick={() => handleToolbarClick('italic')} className="px-2 py-1 border rounded">Italique</button>
  <button type="button" onClick={() => handleToolbarClick('underline')} className="px-2 py-1 border rounded">Souligné</button>
  <input type="color" onChange={(e) => handleToolbarClick('foreColor', e.target.value)} title="Couleur" />
  <button type="button" onClick={() => handleToolbarClick('justifyLeft')} className="px-2 py-1 border rounded">Gauche</button>
  <button type="button" onClick={() => handleToolbarClick('justifyCenter')} className="px-2 py-1 border rounded">Centre</button>
  <button type="button" onClick={() => handleToolbarClick('justifyRight')} className="px-2 py-1 border rounded">Droite</button>
  <select
    onChange={(e) => handleFontSizeChange(e.target.value)}
    className="border rounded px-2 py-1"
    defaultValue=""
  >
    <option value="" disabled>Tailles</option>
    <option value="12px">Petit</option>
    <option value="16px">Normal</option>
    <option value="20px">Grand</option>
    <option value="24px">Très grand</option>
  </select>

  <button
    type="button"
    onClick={() => {
      const getSelectedLinkHref = (): string | null => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return null;

        const range = selection.getRangeAt(0);
        let container: Node | null = range.commonAncestorContainer;
        if (container.nodeType === 3) {
          container = container.parentNode;
        }
        if (!container) return null;

        let el: HTMLElement | null = container as HTMLElement;
        while (el && el.tagName !== 'A') {
          el = el.parentElement;
        }
        if (el && el.tagName === 'A') {
          return el.getAttribute('href');
        }
        return null;
      };

      const currentHref = getSelectedLinkHref() || '';
      const url = prompt('Entrez l’URL du lien', currentHref);

      if (url !== null) {
        const normalizeUrl = (inputUrl: string) => {
          if (!/^https?:\/\//i.test(inputUrl)) {
            return 'https://' + inputUrl;
          }
          return inputUrl;
        };

        if (url.trim() === '') {
          document.execCommand('unlink');
        } else {
          const normalizedUrl = normalizeUrl(url.trim());
          document.execCommand('createLink', false, normalizedUrl);

          const selection = window.getSelection();
          if (selection && selection.rangeCount > 0) {
            const anchor = selection.focusNode?.parentElement;
            if (anchor && anchor.tagName === 'A') {
              anchor.setAttribute('target', '_blank');
              anchor.style.color = 'blue';
              anchor.style.textDecoration = 'underline';
            }
          }
        }
      }
    }}
    className="px-2 py-1 border rounded"
  >
    Lien
  </button>
</div>


        <div ref={contentRef} className="w-full min-h-[120px] border rounded px-3 py-2 focus:outline-none" contentEditable style={{ whiteSpace: 'pre-wrap' }} />

 {/* Image de couverture */}
<div className="space-y-2 mt-4">
  <label className="block font-medium">Photo de couverture</label>
  <input
    id="event-cover"
    type="file"
    accept="image/*"
onChange={async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const objectUrl = URL.createObjectURL(file);
  const newFiles = [...imagesannexesFiles];
  const newUrls = [...imagesannexesUrls];
  newFiles[0] = file;
  newUrls[0] = objectUrl;
  setImagesannexesFiles(newFiles);
  setImagesannexesUrls(newUrls);

  // Upload Cloudinary (couverture)
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'site_global_uploads');

  try {
    const res = await fetch('https://api.cloudinary.com/v1_1/da2pceyci/image/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    if (data.secure_url) {
      setUploadedCoverUrl(data.secure_url);
    }
  } catch (err) {
    console.error('Erreur upload image Cloudinary (couverture)', err);
  }
}}

  />
  {imagesannexesUrls[0] && (
    <div className="mt-2">
      <img src={imagesannexesUrls[0]!} alt="Aperçu" className="h-32 object-cover rounded" />
      <button
        type="button"
        onClick={() => {
          const newFiles = [...imagesannexesFiles];
          const newUrls = [...imagesannexesUrls];
          newFiles[0] = null;
          newUrls[0] = null;
          setImagesannexesFiles(newFiles);
          setImagesannexesUrls(newUrls);
        }}
        className="text-red-600 text-sm hover:underline mt-2"
      >
        Supprimer l’image
      </button>
    </div>
  )}
</div>

{/* Images de contenu */}
<div className="space-y-2 mt-4">
  <label className="block font-medium">Photos de contenu (jusqu’à 2)</label>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {[1, 2].map((index) => (
      <div key={index}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImagesannexesChange(e, index)}
        />
        {imagesannexesUrls[index] && (
          <div className="mt-2 relative">
            <img
              src={imagesannexesUrls[index]!}
              alt={`Aperçu image ${index + 1}`}
              className="w-full h-32 object-cover rounded"
            />
            <button
              onClick={() => {
                const newFiles = [...imagesannexesFiles];
                const newUrls = [...imagesannexesUrls];
                newFiles[index] = null;
                newUrls[index] = null;
                setImagesannexesFiles(newFiles);
                setImagesannexesUrls(newUrls);
              }}
              className="absolute top-1 right-1 bg-red-600 text-white px-2 py-1 rounded text-xs"
              type="button"
            >
              Supprimer
            </button>
          </div>
        )}
      </div>
    ))}
  </div>
</div>


        <div className="flex gap-4 pt-2">
          <button onClick={handleAddEvent} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            {editingEventId ? 'Mettre à jour' : 'Publier'}
          </button>
          {editingEventId && (
            <button onClick={handleCancelEdit} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
              Annuler
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Événements publiés</h2>
        {sortedEvents.length === 0 ? (
          <p className="text-gray-500">Aucun événement publié.</p>
        ) : (
          sortedEvents.map((e) => (
            <div key={e.id} className="bg-white p-4 rounded shadow space-y-2">
              <h3 className="font-bold text-lg text-gray-800">{e.title}</h3>
              <p className="text-sm text-gray-600">{e.location}</p>
              <p className="text-sm text-gray-600">{e.start} – {e.enddate}</p>
{(e.image || (e.imagesannexes?.[0] ?? null)) && (
  <img
src={(e.image ?? e.imagesannexes?.[0]) ?? ''}
    alt="illustration"
    className="h-32 object-cover rounded"
  />
)}
              <div dangerouslySetInnerHTML={{ __html: e.content }} />
              <div className="flex gap-4 mt-2">
                <button
                  onClick={() => {
                    setEditingEventId(String(e.id));
setTitle(e.title || '');
setDescription(e.description || '');
setLocation(e.location || '');
setStart(e.start ? e.start.slice(0, 16) : '');
setEnddate(e.enddate ? e.enddate.slice(0, 16) : '');

                    if (contentRef.current) contentRef.current.innerHTML = e.content;
const cover = e.image ?? e.imagesannexes?.[0] ?? null;
setImagesannexesUrls([
  cover,
  e.imagesannexes?.[1] ?? null,
  e.imagesannexes?.[2] ?? null,
]);
setImagesannexesFiles([null, null, null]);
setUploadedCoverUrl(cover);



                  if (fileInputRef.current) {
  fileInputRef.current.value = '';
}

                    window.scrollTo(0, 0);
                  }}
                  className="text-blue-600 text-sm hover:underline"
                >
                  Modifier
                </button>
                <button
                  onClick={() => {
                    setEventToDelete(e);
                    setShowConfirm(true);
                  }}
                  className="text-red-600 text-sm hover:underline"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))
        )}
      </div>

{showConfirm && eventToDelete && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded shadow-md max-w-md w-full text-center">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Confirmer la suppression
      </h3>
      <p className="text-gray-600 mb-6">
        Êtes-vous sûr de vouloir supprimer l’événement "<strong>{eventToDelete.title}</strong>" ? Cette action est irréversible.
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={async () => {
            const { error } = await supabase.from('events').delete().eq('id', eventToDelete.id);
            if (error) {
              console.error('Erreur suppression événement :', error);
            } else {
              await refreshGlobalEvents();
              setEventToDelete(null);
              setShowConfirm(false);
              window.scrollTo(0, 0);
            }
          }}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Supprimer
        </button>
        <button
          onClick={() => {
            setEventToDelete(null);
            setShowConfirm(false);
          }}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          Annuler
        </button>
      </div>
    </div>
  </div>
)}

    </div>

  );
};

export default AdminEventsPage;
