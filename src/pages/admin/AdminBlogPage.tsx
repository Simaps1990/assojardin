import React, { useEffect, useRef, useState } from 'react';
import { BlogPost } from '../../types';
import { useContent } from '../../context/ContentContext';

const AdminBlogPage = () => {

const {
  blogPosts,
  addBlogPost,
  updateBlogPost,
  fetchBlogPosts,
  deleteBlogPost // 
} = useContent();
console.log(" blogPosts dans AdminBlogPage :", blogPosts);

  const [imagesannexesFiles, setImagesannexesFiles] = useState<(File | null)[]>([null, null, null]);
  const [imagesannexesUrls, setImagesannexesUrls] = useState<(string | null)[]>([null, null, null]);
  const [title, setTitle] = useState('');
  
  // Gestion de l'upload de l'image de couverture
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
  
  // Variable globale pour stocker l'URL de l'image uploadée (persiste entre les rendus)
  // Cette variable sera utilisée dans handleImageChange et handleSubmit
  if (typeof window !== 'undefined' && !(window as any).lastUploadedCoverImage) {
    (window as any).lastUploadedCoverImage = '';
  }

  const [error, setError] = useState('');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
const [posts, setPosts] = useState<BlogPost[]>([]);
const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

useEffect(() => {
  fetchBlogPosts();
}, []);

useEffect(() => {
  setPosts(blogPosts);
}, [blogPosts]);


  const contentRef = useRef<HTMLDivElement>(null);

  const getImageGridClass = (images: (string | null)[]) => {
    const validCount = images.filter(img => img).length;
    if (validCount === 1) return 'grid-cols-1';
    if (validCount === 2) return 'grid-cols-2';
    if (validCount >= 3) return 'grid-cols-3';
    return '';
  };

  const handleImageAnnexeChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérifier la taille du fichier (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB en octets
    if (file.size > maxSize) {
      setError(`L'image ${index+1} est trop volumineuse (max 10MB). Veuillez la compresser.`);
      // Réinitialiser l'input
      const input = document.getElementById(`annex-image-${index}`) as HTMLInputElement | null;
      if (input) input.value = '';
      return;
    }

    setError(''); // Réinitialiser les erreurs précédentes
    
    const newFiles = [...imagesannexesFiles];
    newFiles[index] = file;
    setImagesannexesFiles(newFiles);

    const objectUrl = URL.createObjectURL(file);
    const newUrls = [...imagesannexesUrls];
    newUrls[index] = objectUrl;
    setImagesannexesUrls(newUrls);
    
    console.log(`Image annexe ${index+1} sélectionnée: ${file.name} (${(file.size/1024/1024).toFixed(2)}MB)`);
  };

  const uploadAnnexImages = async (): Promise<string[]> => {
    const urls: string[] = [];
    const maxRetries = 2; // Nombre de tentatives en cas d'échec
    
    for (let i = 0; i < imagesannexesFiles.length; i++) {
      const file = imagesannexesFiles[i];
      if (file) {
        let retryCount = 0;
        let success = false;
        
        while (retryCount <= maxRetries && !success) {
          try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'site_global_uploads');
            
            console.log(`Tentative d'upload de l'image ${i+1}/${imagesannexesFiles.length} (essai ${retryCount+1}/${maxRetries+1})`);
            
            const res = await fetch('https://api.cloudinary.com/v1_1/da2pceyci/image/upload', {
              method: 'POST',
              body: formData,
            });
            
            if (!res.ok) {
              throw new Error(`Erreur HTTP: ${res.status}`);
            }
            
            const data = await res.json();
            if (data.secure_url) {
              urls[i] = data.secure_url;
              success = true;
              console.log(`✅ Image ${i+1} uploadée avec succès: ${data.secure_url}`);
            } else {
              throw new Error('URL sécurisée non reçue de Cloudinary');
            }
          } catch (err) {
            retryCount++;
            console.error(`❌ Erreur upload image ${i+1} (tentative ${retryCount}/${maxRetries+1}):`, err);
            
            if (retryCount > maxRetries) {
              console.error(`Abandon de l'upload pour l'image ${i+1} après ${maxRetries+1} tentatives`);
              setError(`Erreur lors de l'upload de l'image ${i+1}. Veuillez réessayer.`);
            } else {
              // Attendre avant de réessayer (backoff exponentiel)
              await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
            }
          }
        }
      }
    }
    
    // Filtrer les undefined pour avoir un tableau propre
    return urls.filter(url => url !== undefined) as string[];
  };

  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image]);

  // Variable globale pour stocker l'URL de l'image de couverture en dehors du composant
// pour éviter qu'elle ne soit réinitialisée à chaque rendu
if (typeof window !== 'undefined') {
  if (!(window as any).lastUploadedImageUrl) {
    (window as any).lastUploadedImageUrl = '';
  }
}

const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;
  
  setError(''); // Réinitialiser les erreurs précédentes
  setImage(file);
  setPreviewUrl(URL.createObjectURL(file));
  
  // Désactiver le bouton de soumission pendant l'upload
  const submitButton = document.querySelector('button[type="submit"]') as HTMLButtonElement | null;
  if (submitButton) submitButton.disabled = true;
  
  // Afficher un message d'attente
  setError('Upload en cours... Veuillez patienter.');
    
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'site_global_uploads');

    console.log("Début de l'upload de l'image de couverture...");
    
    const res = await fetch('https://api.cloudinary.com/v1_1/da2pceyci/image/upload', {
      method: 'POST',
      body: formData,
    });
    
    if (!res.ok) {
      throw new Error(`Erreur HTTP: ${res.status}`);
    }
    
    const data = await res.json();
    if (data.secure_url) {
      // Mettre à jour l'URL uploadée et s'assurer qu'elle est bien enregistrée
      const secureUrl = data.secure_url;
      
      // Stocker l'URL dans la variable globale sur window
      (window as any).lastUploadedCoverImage = secureUrl;
      
      // Mettre à jour l'état React
      setUploadedImageUrl(secureUrl);
      console.log("✅ Image de couverture uploadée avec succès:", secureUrl);
      
      // Effacer le message d'erreur/attente
      setError('');
      
      // Réactiver le bouton de soumission
      if (submitButton) submitButton.disabled = false;
    } else {
      throw new Error('URL sécurisée non reçue de Cloudinary');
    }
  } catch (err) {
    console.error('❌ Erreur upload image de couverture:', err);
    setError("Erreur lors de l'upload de l'image de couverture. Veuillez réessayer.");
    // Réinitialiser l'état pour permettre une nouvelle tentative
    setImage(null);
    setPreviewUrl(null);
    setUploadedImageUrl('');
    (window as any).lastUploadedCoverImage = '';
    const fileInput = document.getElementById('blog-image') as HTMLInputElement | null;
    if (fileInput) fileInput.value = '';
    
    // Réactiver le bouton de soumission en cas d'erreur
    if (submitButton) submitButton.disabled = false;
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

const handleSubmit = async () => {
  let newUploadedUrls: string[] = [];

  if (!title || !contentRef.current?.innerHTML.trim()) {
    setError("Le titre et le contenu sont requis.");
    return;
  }
  
  // Désactiver le bouton de soumission pendant la vérification
  const submitButton = document.querySelector('button[type="submit"]') as HTMLButtonElement | null;
  if (submitButton) submitButton.disabled = true;

  // Vérifier que l'image de couverture est présente
  // Utiliser la variable globale sur window comme source fiable
  let finalImageUrl = uploadedImageUrl || (window as any).lastUploadedCoverImage || '';
  console.log("Vérification de l'image de couverture:", {
    uploadedImageUrl,
    windowImageUrl: (window as any).lastUploadedCoverImage,
    finalImageUrl,
    previewUrl
  });

  // Si nous avons une prévisualisation mais pas d'URL finale, c'est que l'upload est peut-être en cours
  // Attendre un peu et réessayer
  if (!finalImageUrl && previewUrl) {
    setError("Finalisation de l'upload... Veuillez patienter.");
    
    // Attendre 2 secondes et vérifier à nouveau
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Vérifier à nouveau après le délai
    finalImageUrl = uploadedImageUrl || (window as any).lastUploadedCoverImage || '';
    console.log("Nouvelle vérification après délai:", {
      uploadedImageUrl,
      windowImageUrl: (window as any).lastUploadedCoverImage,
      finalImageUrl
    });
  }

  // Réactiver le bouton de soumission
  if (submitButton) submitButton.disabled = false;

  if (!finalImageUrl) {
    if (previewUrl) {
      setError("L'image est en cours de traitement. Veuillez réessayer dans quelques secondes.");
    } else {
      setError("La photo de couverture est requise.");
    }
    return;
  }

  try {
    setError(''); // Réinitialiser les erreurs précédentes
    console.log("Début de l'upload des images annexes...");
    newUploadedUrls = await uploadAnnexImages();
    console.log("Images annexes uploadées avec succès:", newUploadedUrls);
  } catch (err) {
    console.error("Erreur lors de l'upload des images annexes:", err);
    setError('Erreur lors de la sauvegarde des images annexes. Veuillez réessayer.');
    return;
  }

  // Nouvelle approche pour la fusion des URLs:
  // 1. On crée un tableau avec les anciennes URLs non-null
  // 2. On ajoute les nouvelles URLs uploadées
  // 3. On filtre pour éliminer les doublons et les valeurs null
  
  const existingUrls = imagesannexesUrls.filter(url => url !== null) as string[];
  const allUrls = [...existingUrls, ...newUploadedUrls];
  
  // Éliminer les doublons tout en préservant l'ordre
  const uniqueUrls: string[] = [];
  allUrls.forEach(url => {
    if (url && !uniqueUrls.includes(url)) {
      uniqueUrls.push(url);
    }
  });
  
  console.log("URLs finales des images annexes:", uniqueUrls);

  const fileInput = document.getElementById('blog-image') as HTMLInputElement | null;
  if (fileInput) {
    fileInput.value = '';
  }

  // S'assurer que l'image n'est jamais null pour satisfaire le typage
  const finalImage = finalImageUrl as string; // On a déjà vérifié qu'il n'est pas null plus haut
  
  const payload = {
    title,
    content: contentRef.current?.innerHTML ?? '',
    image: finalImage,  // photo couverture avec l'URL garantie
    imagesannexes: uniqueUrls, // tableau propre sans nulls
    excerpt: '',
    author: 'Admin',
    date: new Date().toISOString(),
  };

  console.log("URL image uploadée :", finalImage);
  console.log("Payload envoyé :", payload);

  try {
    if (editingPost) {
      await updateBlogPost(editingPost.id, payload);
      console.log("✅ Article mis à jour avec succès:", payload.title);
    } else {
      await addBlogPost(payload);
      console.log("✅ Nouvel article créé avec succès:", payload.title);
    }
    
    // Explicitement récupérer les articles mis à jour depuis la base de données
    await fetchBlogPosts();
    console.log("📋 Liste des articles rafraîchie");
    
    // reset après succès
    setTitle('');
    setImage(null);
    setPreviewUrl(null);
    setUploadedImageUrl('');
    // Nettoyer aussi la variable globale sur window
    (window as any).lastUploadedCoverImage = '';
    setImagesannexesFiles([null, null, null]);
    
    // Réinitialise les inputs annexes pour éviter l'affichage persistant des noms
    setTimeout(() => {
      for (let i = 0; i < 3; i++) {
        const input = document.getElementById(`annex-image-${i}`) as HTMLInputElement | null;
        if (input) input.value = '';
      }
    }, 0);

    setImagesannexesUrls([null, null, null]);
    if (contentRef.current) contentRef.current.innerHTML = '';
    setError('');
    
    // Quitter le mode édition et forcer la mise à jour de l'UI
    setEditingPost(null);
    
    // Faire défiler vers le haut pour voir la liste mise à jour
    window.scrollTo(0, 0);
    
  } catch (err) {
    console.error('Erreur lors de la création ou mise à jour :', err);
    setError('Une erreur est survenue pendant l\'enregistrement.');
  }
};




const handleEdit = async (post: BlogPost & { imagesannexes?: (string | null)[] }) => {
    setTitle(post.title);
    setEditingPost(post);
    setUploadedImageUrl(post.image);

    setPreviewUrl(post.image);
    if (contentRef.current) {
      contentRef.current.innerHTML = post.content;
    }

    // Récupère les URLs des images annexes et complète à 3 avec des null pour garder la taille
    const filteredUrls = (post.imagesannexes ?? []).filter((url): url is string => url !== null);
    const urlsWithNulls: (string | null)[] = [...filteredUrls];
    while (urlsWithNulls.length < 3) {
      urlsWithNulls.push(null);
    }


// Crée des faux fichiers virtuels pour afficher les noms existants
// Crée des faux fichiers virtuels et regénère les aperçus
const dummyFiles: (File | null)[] = await Promise.all(urlsWithNulls.map(async (url) => {
  if (!url) return null;
  const filename = url.split('/').pop() || '';
  const blob = await fetch(url).then(res => res.blob());
  return new File([blob], filename, { type: blob.type });
}));
setImagesannexesFiles(dummyFiles);

// Réinjecte les aperçus à partir des URLs
setImagesannexesUrls(urlsWithNulls);


if (post.image) {
  const filename = post.image.split('/').pop() || '';
  const blob = await fetch(post.image).then(res => res.blob());
  const file = new File([blob], filename, { type: blob.type });
  setImage(file);
  setUploadedImageUrl(post.image); // utile si jamais supprimé plus tard

  const objectUrl = URL.createObjectURL(file);
  setPreviewUrl(objectUrl);

  const fileInput = document.getElementById('blog-image') as HTMLInputElement | null;
  if (fileInput) fileInput.value = '';
}






setImagesannexesUrls(urlsWithNulls);



    window.scrollTo(0, 0);
  };

console.log("Posts en state :", posts);


  return (
    <div className="space-y-6 pb-16">
      <h1 className="text-3xl font-bold text-gray-800">Gestion des articles de blog</h1>

      <h2 className="text-xl font-semibold text-gray-800">
        {editingPost ? 'Modifier un article' : 'Créer un article'}
      </h2>

      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        {error && <p className="text-red-600 font-medium">{error}</p>}

        <input
          type="text"
          placeholder="Titre de l'article"
          className="w-full border px-3 py-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex flex-wrap gap-2 items-center mb-2">
          <button type="button" onClick={() => handleToolbarClick('bold')} className="px-2 py-1 border rounded">Gras</button>
          <button type="button" onClick={() => handleToolbarClick('italic')} className="px-2 py-1 border rounded">Italique</button>
          <button type="button" onClick={() => handleToolbarClick('underline')} className="px-2 py-1 border rounded">Souligné</button>
          <input
            type="color"
            title="Couleur"
            onChange={(e) => handleToolbarClick('foreColor', e.target.value)}
            className="w-8 h-8 p-0 border rounded"
          />
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

        <div
          ref={contentRef}
          className="w-full min-h-[120px] border rounded px-3 py-2 focus:outline-none"
          contentEditable
          style={{ whiteSpace: 'pre-wrap' }}
        />

<div className="space-y-2 mt-4">
  <label className="block font-medium">Photo de couverture</label>

<input
  id="blog-image"
  type="file"
  accept="image/*"
  onChange={handleImageChange}
  className={`w-full ${previewUrl ? 'text-transparent' : ''}`}
/>






  {previewUrl && (
    <div className="mt-2">
      <img src={previewUrl} alt="Aperçu" className="h-32 object-cover rounded" />
      <button
        type="button"
        onClick={() => {
          setImage(null);
          setPreviewUrl(null);
          setUploadedImageUrl('');
          const fileInput = document.getElementById('blog-image') as HTMLInputElement | null;
          if (fileInput) fileInput.value = '';
        }}
        className="text-red-600 text-sm hover:underline mt-2"
      >
        Supprimer l’image
      </button>
    </div>
  )}
</div>




        <div className="space-y-2 mt-4">
          <label className="block font-medium">Photos de contenu (jusqu’à 3)</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           {imagesannexesUrls.map((imgUrl, index) => (
  <div key={index}>
<input
  ref={(el) => (inputRefs.current[index] = el)}
  id={`annex-image-${index}`}
  type="file"
  accept="image/*"
className={`w-full ${imagesannexesUrls[index] ? 'text-transparent' : ''}`}
  onChange={(e) => handleImageAnnexeChange(index, e)}
/>







    {imgUrl && (
      <div className="mt-2 relative">
        <img
          src={imgUrl}
          alt={`Aperçu annexe ${index + 1}`}
          className="w-full h-32 object-cover rounded"
        />
        <button
          onClick={() => {
            const newFiles = [...imagesannexesFiles];
            newFiles[index] = null;
            setImagesannexesFiles(newFiles);
            const newUrls = [...imagesannexesUrls];
            newUrls[index] = null;
            setImagesannexesUrls(newUrls);
            const input = document.getElementById(`annex-image-${index}`) as HTMLInputElement | null;
if (input) input.value = '';

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

<div className="flex flex-wrap gap-2 mt-4">
  <button
    onClick={handleSubmit}
    className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
  >
    {editingPost ? 'Mettre à jour' : 'Publier'}
  </button>

  {editingPost && (
    <>
      <button
        onClick={() => {
          setTitle('');
          setImage(null);
          setPreviewUrl(null);
          setUploadedImageUrl('');
          setImagesannexesFiles([null, null, null]);
          setImagesannexesUrls([null, null, null]);
          setEditingPost(null);
          setError('');
          if (contentRef.current) contentRef.current.innerHTML = '';
          const fileInput = document.getElementById('blog-image') as HTMLInputElement | null;
          if (fileInput) fileInput.value = '';
          window.scrollTo(0, 0);
        }}
        className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
      >
        Annuler
      </button>

      <button
        onClick={() => {
          setPostToDelete(editingPost);
          setShowConfirm(true);
        }}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Supprimer
      </button>
    </>
  )}
</div>



{showConfirm && postToDelete && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded shadow-md max-w-md w-full text-center">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Confirmer la suppression
      </h3>
      <p className="text-gray-600 mb-6">
        Êtes-vous sûr de vouloir supprimer l’article "<strong>{postToDelete.title}</strong>" ? Cette action est irréversible.
      </p>
      <div className="flex justify-center gap-4">
        <button
onClick={async () => {
  const isEditingDeleted = editingPost?.id === postToDelete.id;
  await deleteBlogPost(postToDelete.id);
  await fetchBlogPosts();

  setPostToDelete(null);
  setShowConfirm(false);

  if (isEditingDeleted) {
    setTitle('');
    setImage(null);
    setPreviewUrl(null);
    setUploadedImageUrl('');
    setImagesannexesFiles([null, null, null]);
    setImagesannexesUrls([null, null, null]);
    setEditingPost(null);
    setError('');

    if (contentRef.current) contentRef.current.innerHTML = '';

    const fileInput = document.getElementById('blog-image') as HTMLInputElement | null;
    if (fileInput) fileInput.value = '';

    for (let i = 0; i < 3; i++) {
      const input = document.getElementById(`annex-image-${i}`) as HTMLInputElement | null;
      if (input) input.value = '';
    }
  }

  window.scrollTo(0, 0);
}}

          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Supprimer
        </button>
        <button
          onClick={() => {
            setPostToDelete(null);
            setShowConfirm(false);
          }}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">Annuler</button>
      </div>
    </div>
  </div>
)}


      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Articles publiés</h2>
        {posts.length === 0 ? (
          <p className="text-neutral-500 mt-2">Aucun billet publié.</p>
        ) : (
          posts.map(post => (
<div key={post.id} className="bg-white p-4 rounded shadow-sm space-y-2 mt-6">
              <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
              {post.image && <img src={post.image} alt="illustration" className="h-32 object-cover rounded" />}
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

              <div className={`mt-2 grid gap-2 ${getImageGridClass(post.imagesannexes ?? [])}`}>
                {(post.imagesannexes ?? []).map((img: string | null, i: number) =>
                  img ? (
                    <img
                      key={i}
                      src={img}
                      alt={`Image annexe ${i + 1}`}
                      className="h-24 object-cover rounded w-full"
                    />
                  ) : null
                )}
              </div>

<div className="flex gap-4 pt-2">
  <button
    onClick={() => handleEdit(post)}
    className="text-blue-600 text-sm hover:underline"
  >
    Modifier
  </button>
  <button
onClick={() => {
  setPostToDelete(post);
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

    </div>
  );
};

export default AdminBlogPage;
