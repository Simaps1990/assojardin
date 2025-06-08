import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import type { Annonce } from '../../types'; // ajuste le chemin si besoin

const AdminAnnoncesPage = () => {
const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [loading, setLoading] = useState(false);
const [editingId, setEditingId] = useState<string | null>(null);
const [editedAnnonce, setEditedAnnonce] = useState<Partial<Annonce>>({});
const startEdit = (annonce: Annonce) => {
  setEditingId(annonce.id);
  setEditedAnnonce(annonce);
};
const saveEdit = async (id: string) => {
  await supabase.from('annonces').update(editedAnnonce).eq('id', id);
  setEditingId(null);
  fetchAnnonces();
};

  const fetchAnnonces = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('annonces')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setAnnonces(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAnnonces();
  }, []);

const validerAnnonce = async (id: string) => {
    await supabase.from('annonces').update({ statut: 'validé' }).eq('id', id);
    fetchAnnonces();
  };

const supprimerAnnonce = async (id: string) => {
    await supabase.from('annonces').delete().eq('id', id);
    fetchAnnonces();
  };


  return (
    <div className="pb-20 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Validation des petites annonces</h1>

      {loading ? (
        <p className="text-neutral-500">Chargement...</p>
      ) : annonces.length === 0 ? (
        <p className="text-neutral-500">Aucune annonce trouvée.</p>
      ) : (
        <div className="space-y-4">
          {annonces.map((annonce) => (
            <div
              key={annonce.id}
              className="bg-white rounded shadow p-4 space-y-2 border border-gray-200"
            >
{editingId === annonce.id ? (
  <>
    <input
      value={editedAnnonce.nom}
      onChange={(e) => setEditedAnnonce({ ...editedAnnonce, nom: e.target.value })}
      className="border rounded px-2 py-1 w-full"
    />
    <input
      value={editedAnnonce.email}
      onChange={(e) => setEditedAnnonce({ ...editedAnnonce, email: e.target.value })}
      className="border rounded px-2 py-1 w-full"
    />
    <input
      value={editedAnnonce.telephone}
      onChange={(e) => setEditedAnnonce({ ...editedAnnonce, telephone: e.target.value })}
      className="border rounded px-2 py-1 w-full"
    />
    <input
      value={editedAnnonce.type}
      onChange={(e) => setEditedAnnonce({ ...editedAnnonce, type: e.target.value as 'recherche' | 'vend' | 'donne' | 'échange' })
}
      className="border rounded px-2 py-1 w-full"
    />
    <textarea
      value={editedAnnonce.contenu}
      onChange={(e) => setEditedAnnonce({ ...editedAnnonce, contenu: e.target.value })}
      className="border rounded px-2 py-1 w-full"
    />
  </>
) : (
  <>
    <div className="font-semibold">{annonce.nom}</div>
    <div className="text-sm text-gray-600">{annonce.email} | {annonce.telephone}</div>
    <div className="text-sm">Type : {annonce.type}</div>
    <div className="text-gray-800">{annonce.contenu}</div>
  </>
)}

              <div className="flex gap-4 pt-2">
                {annonce.photo1 && (
                  <img src={annonce.photo1} className="h-24 rounded object-cover" alt="photo1" />
                )}
                
                {annonce.photo2 && (
                  <img src={annonce.photo2} className="h-24 rounded object-cover" alt="photo2" />
                )}
                {annonce.photo1 && (
  <div className="relative">
    <img src={annonce.photo1} className="h-24 rounded object-cover" alt="photo1" />
    <button
      onClick={async () => {
        await supabase.from('annonces').update({ photo1: null }).eq('id', annonce.id);
        fetchAnnonces();
      }}
      className="absolute top-1 right-1 bg-red-600 text-white px-2 py-1 text-xs rounded"
    >
      Supprimer
    </button>
  </div>
)}
{annonce.photo2 && (
  <div className="relative">
    <img src={annonce.photo2} className="h-24 rounded object-cover" alt="photo2" />
    <button
      onClick={async () => {
        await supabase.from('annonces').update({ photo2: null }).eq('id', annonce.id);
        fetchAnnonces();
      }}
      className="absolute top-1 right-1 bg-red-600 text-white px-2 py-1 text-xs rounded"
    >
      Supprimer
    </button>
  </div>
)}

              </div>
<div className="flex gap-4 pt-3">
{annonce.statut === 'en_attente' && editingId !== annonce.id && (
  <button
    onClick={() => validerAnnonce(annonce.id)}
    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
  >
    Valider
  </button>
)}


{editingId === annonce.id ? (
  <>
    <button
      onClick={() => saveEdit(annonce.id)}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Enregistrer
    </button>
    <button
      onClick={() => setEditingId(null)}
      className="bg-neutral-400 text-white px-4 py-2 rounded hover:bg-neutral-500"
    >
      Annuler
    </button>
  </>
) : (
  <button
    onClick={() => startEdit(annonce)}
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
  >
    Modifier
  </button>
)}


  <button
    onClick={() => supprimerAnnonce(annonce.id)}
    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
  >
    Supprimer
  </button>
</div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminAnnoncesPage;
