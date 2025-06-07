import React, { useEffect, useState } from 'react';
import { useContent } from '../../context/ContentContext';
import SuccessModal from '../../components/SuccessModal.tsx';

const AdminSettingsPage: React.FC = () => {
const { associationContent, updateAssociationContent } = useContent();
const [localContent, setLocalContent] = useState(associationContent);
const [associationImageUploadedUrls, setAssociationImageUploadedUrls] = useState<(string | null)[]>([null, null, null]);
const [associationImagePreviews, setAssociationImagePreviews] = useState<(string | null)[]>([null, null, null]);

const [successMessage, setSuccessMessage] = useState<string | null>(null);
const [previewAccueil, setPreviewAccueil] = useState<string | null>(null);
const [previewHeaderIcon, setPreviewHeaderIcon] = useState<string | null>(null);
//const [parcellesOccupees, setParcellesOccupees] = useState<number>(associationContent.parcellesOccupees || 0);
//const [parcellesTotales, setParcellesTotales] = useState<number>(associationContent.parcellesTotal || 0);


const [contentAssociation, setContentAssociation] = useState<string>(''); // ← vide au départ
const [adresse, setAdresse] = useState(associationContent.adresse || '');
const [telephone, setTelephone] = useState(associationContent.telephone || '');
const [email, setEmail] = useState(associationContent.email || '');
const [horaires, setHoraires] = useState(associationContent.horaires || '');
//const inputRefs = React.useRef<HTMLInputElement[]>([]);

//const imagesAssociation = localContent.imagesAssociation || [null, null, null];


const saveAssociationContent = async () => {
const updated = {
  id: associationContent.id,
  titreAccueil: localContent.titreAccueil || '',
  texteIntro: localContent.texteIntro || '',
  texteFooter: localContent.texteFooter || '',
  titreAssociation: localContent.titreAssociation || '',
  contentAssociation,
  imageAccueil: previewAccueil ?? localContent.imageAccueil,
  headerIcon: previewHeaderIcon ?? localContent.headerIcon,
  adresse,
  telephone,
  email,
  horaires,
imagesAssociation: associationImageUploadedUrls,
};


const refreshed = await updateAssociationContent(updated);
if (refreshed !== undefined) {
  setLocalContent({
    ...refreshed,
    contentAssociation: refreshed.contentAssociation || ''
  });
  setContentAssociation(refreshed.contentAssociation || '');
  setSuccessMessage('Tous les contenus ont été enregistrés.');
}


};



  const handleBase64Image = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'site_global_uploads');

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/da2pceyci/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setter(data.secure_url);
    } catch (error) {
      setSuccessMessage('Erreur de téléchargement image');
      console.error(error);
    }
  };
const handleAssociationImageChange = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const objectUrl = URL.createObjectURL(file);
  const previews = [...associationImagePreviews];
  previews[index] = objectUrl;
  setAssociationImagePreviews(previews);

  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'site_global_uploads');

    const res = await fetch('https://api.cloudinary.com/v1_1/da2pceyci/image/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    if (data.secure_url) {
      const uploads = [...associationImageUploadedUrls];
      uploads[index] = data.secure_url;
      setAssociationImageUploadedUrls(uploads);
    }
  } catch (err) {
    console.error('Erreur upload image', err);
  }
};


const saveImage = async () => {
  if (!previewAccueil) {
    setSuccessMessage("Aucune image d’accueil à enregistrer.");
    return;
  }

  const updated = {
    id: associationContent.id,
    imageAccueil: previewAccueil,
  };

  const refreshed = await updateAssociationContent(updated);
if (refreshed !== undefined) {    setLocalContent(refreshed);
    setSuccessMessage("Image d’accueil enregistrée.");
  }
};



const saveHeaderIcon = async () => {
  if (!previewHeaderIcon) {
    setSuccessMessage("Aucune icône à enregistrer.");
    return;
  }

  const updated = {
    id: associationContent.id,
    headerIcon: previewHeaderIcon,
  };

  const refreshed = await updateAssociationContent(updated);
if (refreshed !== undefined) {    setLocalContent(refreshed);
    setSuccessMessage("Icône de header enregistrée.");
  }
};




  const getSelectedLinkHref = (): string | null => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return null;

    let container: Node | null = selection.getRangeAt(0).commonAncestorContainer;
    if (container.nodeType === 3) container = container.parentNode;
    if (!container) return null;

    let el: HTMLElement | null = container as HTMLElement;
    while (el && el.tagName !== 'A') {
      el = el.parentElement;
    }
    if (el && el.tagName === 'A') return el.getAttribute('href');
    return null;
  };


  const handleFontSizeChange = (size: string) => {
    if (!editorRef.current) return;
    document.execCommand('fontSize', false, '7');

    const fonts = editorRef.current.querySelectorAll('font[size="7"]');
    fonts.forEach((font) => {
      const span = document.createElement('span');
      span.style.fontSize = size;
      span.innerHTML = font.innerHTML;
      font.parentNode?.replaceChild(span, font);
    });
  };

const saveParcelles = async () => {
const occupees = parseInt((localContent.parcellesOccupees ?? 0).toString(), 10);
const totales = parseInt((localContent.parcellesTotal ?? 0).toString(), 10);


  if (isNaN(occupees) || isNaN(totales)) {
    setSuccessMessage('Merci de saisir des nombres valides pour les parcelles.');
    return;
  }

  const refreshed = await updateAssociationContent({
    id: localContent.id,
    parcellesOccupees: occupees,
    parcellesTotal: totales, // ← clé correcte ici
  });

  if (refreshed !== undefined) {
    setLocalContent(refreshed);
    setSuccessMessage('Données de parcelles enregistrées.');
  }
};




  const editorRef = React.useRef<HTMLDivElement>(null);
useEffect(() => {
  if (
    associationContent &&
    !hasInitializedContent.current &&
    editorRef.current
  ) {
    setLocalContent({
      id: associationContent.id,
      titreAccueil: associationContent.titreAccueil || '',
      texteIntro: associationContent.texteIntro || '',
      texteFooter: associationContent.texteFooter || '',
      titreAssociation: associationContent.titreAssociation || '',
      parcellesOccupees: associationContent.parcellesOccupees || 0,
      parcellesTotal: associationContent.parcellesTotal || 0,
      imagesAssociation: associationContent.imagesAssociation || [null, null, null],
      adresse: associationContent.adresse || '',
      telephone: associationContent.telephone || '',
      email: associationContent.email || '',
      horaires: associationContent.horaires || '',
      imageAccueil: associationContent.imageAccueil ?? undefined,
      headerIcon: associationContent.headerIcon ?? undefined,
      contentAssociation: associationContent.contentAssociation || '',
    });

setAssociationImagePreviews(associationContent.imagesAssociation || [null, null, null]);
    setPreviewAccueil(associationContent.imageAccueil || null);
    setPreviewHeaderIcon(associationContent.headerIcon ?? null);
    setAdresse(associationContent.adresse || '');
    setTelephone(associationContent.telephone || '');
    setEmail(associationContent.email || '');
    setHoraires(associationContent.horaires || '');

    editorRef.current.innerHTML = associationContent.contentAssociation || '';
    hasInitializedContent.current = true;
  }
}, [associationContent, editorRef.current]);



const hasInitializedContent = React.useRef(false);






  const handleToolbarClick = (command: string, value?: string) => {
    if (command === 'createLink') {
      const currentHref = getSelectedLinkHref() || '';
      const url = prompt('Entrez l’URL du lien', currentHref);
      if (url !== null) {
        if (url.trim() === '') {
          document.execCommand('unlink');
        } else {
          document.execCommand('createLink', false, url);
        }
      }
    } else {
      document.execCommand(command, false, value);
    }
  };




  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Paramètres</h1>

      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">Page d’accueil - Image</h2>
        <div>
          <label className="block font-medium mb-1">Image d’accueil</label>
          <input type="file" accept="image/*" onChange={(e) => handleBase64Image(e, setPreviewAccueil)} />
          {previewAccueil && (
            <div>
              <img src={previewAccueil} alt="Aperçu" className="mt-2 h-48 rounded object-contain" />
              <button
                onClick={saveImage}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Enregistrer l'image d'accueil
              </button>
            </div>
          )}
        </div>
        <div>
          <label className="block font-medium mb-1">Icône du header (logo site admin)</label>
          <input type="file" accept="image/*" onChange={(e) => handleBase64Image(e, setPreviewHeaderIcon)} />
          {previewHeaderIcon && (
            <div>
              <img src={previewHeaderIcon} alt="Aperçu header" className="mt-2 h-12 object-contain" />
              <button
                onClick={saveHeaderIcon}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Enregistrer l’icône
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">Page d’accueil - Textes</h2>
        <div>
          <label className="block font-medium mb-1">Titre de la page d’accueil</label>
<textarea
  className="w-full border px-3 py-2 rounded resize-none"
  rows={3}
value={localContent.titreAccueil || ''}
onChange={(e) => setLocalContent(prev => ({ ...prev, titreAccueil: e.target.value }))}
/>

        </div>
        <div>
          <label className="block font-medium mb-1">Texte d’introduction</label>
<textarea
  className="w-full border px-3 py-2 rounded resize-none"
  rows={5}
  value={localContent.texteIntro || ''}
onChange={(e) => setLocalContent(prev => ({ ...prev, texteIntro: e.target.value }))}
/>

        </div>
        <div>
          <label className="block font-medium mb-1">Texte pied de page (à gauche)</label>
<textarea
  className="w-full border px-3 py-2 rounded resize-none"
  rows={4}
  value={localContent.texteFooter || ''}
onChange={(e) => setLocalContent(prev => ({ ...prev, texteFooter: e.target.value }))}
/>

        </div>
<button
 onClick={saveAssociationContent}
   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
>
  Enregistrer les textes
</button>

      </div>

      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">Parcelles occupées</h2>
        <div>
          <label className="block font-medium mb-1">Parcelles occupées</label>
<input
  type="number"
  className="w-full border px-3 py-2 rounded"
  value={localContent.parcellesOccupees ?? ''}
onChange={(e) =>
  setLocalContent(prev => ({
    ...prev,
    parcellesOccupees: parseInt(e.target.value || '0', 10),
  }))
}
/>


        </div>
        <div>
          <label className="block font-medium mb-1">Parcelles totales</label>
<input
  type="number"
  className="w-full border px-3 py-2 rounded"
  value={localContent.parcellesTotal ?? ''}
  onChange={(e) =>
    setLocalContent(prev => ({
      ...prev,
      parcellesTotal: parseInt(e.target.value || '0', 10),
    }))
  }
/>


        </div>
<button
  onClick={saveParcelles}
  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
>
  Enregistrer les données de parcelles
</button>


      </div>

      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">Page notre association</h2>
        <div>
          <label className="block font-medium mb-1">Titre</label>




<input
  type="text"
  className="w-full border px-3 py-2 rounded"
  value={localContent.titreAssociation ?? ''}
  onChange={(e) => setLocalContent(prev => ({ ...prev, titreAssociation: e.target.value }))}
/>


        </div>

        <div>
          <label className="block font-medium mb-1">Contenu</label>
          <div className="flex flex-wrap gap-2 items-center mb-2">
            <button
              type="button"
              onClick={() => handleToolbarClick('bold')}
              className="px-2 py-1 border rounded"
            >
              Gras
            </button>
            <button
              type="button"
              onClick={() => handleToolbarClick('italic')}
              className="px-2 py-1 border rounded"
            >
              Italique
            </button>
            <button
              type="button"
              onClick={() => handleToolbarClick('underline')}
              className="px-2 py-1 border rounded"
            >
              Souligné
            </button>
            <input
              type="color"
              title="Couleur"
              onChange={(e) => handleToolbarClick('foreColor', e.target.value)}
              className="w-8 h-8 p-0 border rounded"
            />
            <button
              type="button"
              onClick={() => handleToolbarClick('justifyLeft')}
              className="px-2 py-1 border rounded"
            >
              Gauche
            </button>
            <button
              type="button"
              onClick={() => handleToolbarClick('justifyCenter')}
              className="px-2 py-1 border rounded"
            >
              Centre
            </button>
            <button
              type="button"
              onClick={() => handleToolbarClick('justifyRight')}
              className="px-2 py-1 border rounded"
            >
              Droite
            </button>
            <select
              onChange={(e) => handleFontSizeChange(e.target.value)}
              className="border rounded px-2 py-1"
              defaultValue=""
            >
              <option value="" disabled>
                Tailles
              </option>
              <option value="12px">Petit</option>
              <option value="16px">Normal</option>
              <option value="20px">Grand</option>
              <option value="24px">Très grand</option>
            </select>
            <button
              type="button"
              onClick={() => {
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

<div
  ref={editorRef}
  contentEditable
  onInput={(e) => setContentAssociation(e.currentTarget.innerHTML)}
  className="min-h-[150px] border rounded px-3 py-2 focus:outline-none"
  dir="ltr"
  style={{ textAlign: 'left' }}
  suppressContentEditableWarning
/>


<div>
  <label className="block font-medium mb-1">Images de l’association (max 3)</label>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {[0, 1, 2].map((index) => (
      <div key={index} className="flex flex-col items-center">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleAssociationImageChange(e, index)}
          className="mb-2"
        />
        {associationImagePreviews[index] && (
          <div className="w-full flex justify-center">
            <img
              src={associationImagePreviews[index]!}
              alt={`Image ${index + 1}`}
              className="max-h-[500px] w-auto object-contain rounded"
            />
          </div>
        )}
        {associationImagePreviews[index] && (
          <button
            type="button"
            onClick={() => {
              const newPreviews = [...associationImagePreviews];
              const newUploads = [...associationImageUploadedUrls];
              newPreviews[index] = null;
              newUploads[index] = null;
              setAssociationImagePreviews(newPreviews);
              setAssociationImageUploadedUrls(newUploads);
            }}
            className="text-red-600 text-sm hover:underline mt-2"
          >
            Supprimer
          </button>
        )}
      </div>
    ))}
  </div>
</div>




</div>


        <button
onClick={saveAssociationContent}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Enregistrer le contenu
        </button>
      </div>


<div className="bg-white p-6 rounded-lg shadow space-y-6">
  <h2 className="text-xl font-semibold text-gray-800">Parcelles</h2>

  <div className="flex items-center space-x-2">
    <label className="block font-medium mb-1">Nombre occupées:</label>
    <input
      type="number"
      value={localContent.parcellesTotal ?? ''}
      onChange={(e) =>
        setLocalContent((prev) => ({
          ...prev,
          parcellesTotal: parseInt(e.target.value || '0', 10),
        }))
      }
      className="border px-2 py-1 rounded w-24"
    />
  </div>

  <div className="flex items-center space-x-2">
    <label className="block font-medium mb-1">Nombre total :</label>
    <input
      type="number"
      value={localContent.parcellesOccupees ?? ''}
      onChange={(e) =>
        setLocalContent((prev) => ({
          ...prev,
          parcellesOccupees: parseInt(e.target.value || '0', 10),
        }))
      }
      className="border px-2 py-1 rounded w-24"
    />
  </div>

  <button
    onClick={async () => {
      const refreshed = await updateAssociationContent({
        id: localContent.id,
        parcellesOccupees: localContent.parcellesOccupees || 0,
        parcellesTotal: localContent.parcellesTotal || 0,
      });

      if (refreshed !== undefined) {
        setLocalContent(refreshed);
        setSuccessMessage("Données de parcelles enregistrées.");
      }
    }}
    className="bg-blue-600 text-white px-4 py-2 rounded shadow"
  >
    Enregistrer
  </button>
</div>



<div className="bg-white p-6 rounded-lg shadow space-y-6">
  <h2 className="text-xl font-semibold text-gray-800">Informations de contact</h2>

  <div>
    <label className="block font-medium mb-1">Adresse</label>
    <input
      type="text"
      className="w-full border px-3 py-2 rounded"
      value={adresse}
      onChange={(e) => setAdresse(e.target.value)}
    />
  </div>

  <div>
    <label className="block font-medium mb-1">Téléphone</label>
    <input
      type="text"
      className="w-full border px-3 py-2 rounded"
      value={telephone}
      onChange={(e) => setTelephone(e.target.value)}
    />
  </div>

  <div>
    <label className="block font-medium mb-1">Email</label>
    <input
      type="email"
      className="w-full border px-3 py-2 rounded"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  </div>

  <div>
    <label className="block font-medium mb-1">Horaires</label>
    <input
      type="text"
      className="w-full border px-3 py-2 rounded"
      value={horaires}
      onChange={(e) => setHoraires(e.target.value)}
    />
  </div>

<button
onClick={async () => {
  const updated = {
    id: associationContent.id,
    adresse,
    telephone,
    email,
    horaires,
  };
  const refreshed = await updateAssociationContent(updated);
if (refreshed !== undefined) {    setLocalContent(refreshed);
    setSuccessMessage('Informations de contact enregistrées.');
  }
}}

  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
>
  Enregistrer les informations de contact
</button>

</div>


      <div className="h-10" />
      {successMessage && (
  <SuccessModal message={successMessage} onClose={() => setSuccessMessage(null)} />
)}

    </div>
  );
};

export default AdminSettingsPage;
