import React, { useEffect, useRef, useState } from 'react';
import { BlogPost } from '../../types';
import { useContent } from '../../context/ContentContext';

const AdminBlogPage = () => {
  const {
    blogPosts,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
  } = useContent();

  const [imagesannexesFiles, setImagesannexesFiles] = useState<(File | null)[]>([null, null, null]);
  const [imagesannexesUrls, setImagesannexesUrls] = useState<(string | null)[]>([null, null, null]);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const [posts, setPosts] = useState<BlogPost[]>([]);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPosts(blogPosts);
  }, [blogPosts]);

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

    const newFiles = [...imagesannexesFiles];
    newFiles[index] = file;
    setImagesannexesFiles(newFiles);

    const objectUrl = URL.createObjectURL(file);
    const newUrls = [...imagesannexesUrls];
    newUrls[index] = objectUrl;
    setImagesannexesUrls(newUrls);
  };

  const uploadAnnexImages = async (): Promise<string[]> => {
    const urls: string[] = [];
    for (const file of imagesannexesFiles) {
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'site_global_uploads');
        const res = await fetch('https://api.cloudinary.com/v1_1/da2pceyci/image/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (data.secure_url) urls.push(data.secure_url);
      }
    }
    return urls;
  };

  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
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
        setUploadedImageUrl(data.secure_url);
      }
    } catch (err) {
      console.error('Erreur upload image', err);
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
  let newUploadedUrls: string[];

  if (!title || !contentRef.current?.innerHTML.trim()) {
    setError("Le titre et le contenu sont requis.");
    return;
  }

  try {
    newUploadedUrls = await uploadAnnexImages();
  } catch (err) {
    setError('Erreur lors de la sauvegarde des images annexes.');
    return;
  }

  const visibleUrls = imagesannexesUrls.filter((url): url is string => url !== null);
  const annexUrls = [...visibleUrls.slice(0, 3 - newUploadedUrls.length), ...newUploadedUrls];

  const fileInput = document.getElementById('blog-image') as HTMLInputElement | null;
  if (fileInput) {
    fileInput.value = '';
  }

  const payload = {
    title,
    content: contentRef.current?.innerHTML ?? '',
    image: uploadedImageUrl ?? '',  // <-- ne jamais envoyer null
    imagesannexes: annexUrls.length > 0 ? annexUrls : [], // jamais null
    excerpt: '',
    author: 'Admin',
    date: new Date().toISOString(),
  };

  console.log("URL image uploadée :", uploadedImageUrl);
  console.log("Payload envoyé :", payload);

  try {
    if (editingPost) {
      await updateBlogPost(editingPost.id, payload);
    } else {
      await addBlogPost(payload);
    }
  } catch (err) {
    console.error('Erreur lors de la création ou mise à jour :', err);
    setError('Une erreur est survenue pendant l’enregistrement.');
    return;
  }

  // reset
  setTitle('');
  setImage(null);
  setPreviewUrl(null);
  setUploadedImageUrl(null);
  setImagesannexesFiles([null, null, null]);
  setImagesannexesUrls([null, null, null]);
  if (contentRef.current) contentRef.current.innerHTML = '';
  setError('');
  window.scrollTo(0, 0);
};



  const handleEdit = (post: BlogPost & { imagesannexes?: (string | null)[] }) => {
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
    setImagesannexesUrls(urlsWithNulls);

    // On remet les fichiers annexes à null (inputs prêts à recevoir un nouveau fichier)
    setImagesannexesFiles([null, null, null]);

    setImage(null);
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Photo de couverture</label>
          <input id="blog-image" type="file" accept="image/*" onChange={handleImageChange} />
          {previewUrl && (
            <div className="mt-2">
              <img src={previewUrl} alt="Aperçu" className="h-32 object-cover rounded" />
              <button
                type="button"
                onClick={() => {
                  setImage(null);
                  setPreviewUrl(null);
                  setUploadedImageUrl(null);
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
      id={`annex-image-${index}`} 
      type="file"
      accept="image/*"
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

        <button
          onClick={handleSubmit}
          className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
        >
          {editingPost ? 'Mettre à jour' : 'Publier'}
        </button>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Articles publiés</h2>
        {posts.length === 0 ? (
          <p className="text-neutral-500 mt-2">Aucun billet publié.</p>
        ) : (
          posts.map(post => (
            <div key={post.id} className="bg-white p-4 rounded shadow-sm space-y-2">
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

      {showConfirm && postToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md max-w-sm w-full text-center">
            <p className="text-lg font-semibold mb-4">
              Êtes-vous sûr de vouloir supprimer cet article ?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={async () => {
                  await deleteBlogPost(postToDelete.id);
                  setPostToDelete(null);
                  setShowConfirm(false);
                  window.scrollTo(0, 0);
                }}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Confirmer
              </button>
              <button
                onClick={() => {
                  setPostToDelete(null);
                  setShowConfirm(false);
                }}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
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

export default AdminBlogPage;
