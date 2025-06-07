import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { supabase } from '../supabaseClient';
import type { Annonce } from '../types/index';

const AnnoncesPage: React.FC = () => {
  const { annonces } = useContent();

  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    type: '',
    contenu: '',
    photo1: null,
    photo2: null,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nom || !formData.telephone || !formData.type) {
      alert('Les champs obligatoires (*) doivent être remplis.');
      return;
    }

const { error } = await supabase.from('annonces').insert([{
  nom: formData.nom,
  email: formData.email,
  phone: formData.telephone, // correspond à "phone" dans l'interface
  choix: formData.type.toUpperCase() as Annonce['choix'], // transformation
  contenu: formData.contenu,
  photo1: '',
  photo2: '',
  statut: 'en_attente',
  isValidated: false,
  date: new Date().toISOString()
}]);


    if (error) {
      alert("Erreur lors de l'envoi de l'annonce");
      return;
    }
    setSubmitted(true);
  };

  const sortedAnnonces = [...annonces].filter(a => a.statut === 'validé').sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <div className="pb-16">
      <div className="container-custom">
        <h1 className="font-heading font-bold text-4xl mb-2">Les petites annonces</h1>
        <p className="text-neutral-600 text-lg mb-8">
          Retrouvez ici les annonces de particulier à particulier.
        </p>

        {/* Formulaire de soumission */}
        <div className="bg-white p-6 rounded-2xl shadow mb-12">
          {submitted ? (
            <p className="text-green-600 font-medium">Annonce envoyée, en attente de validation.</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-medium">Nom Prénom *</label>
                <input type="text" name="nom" value={formData.nom} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
              </div>
              <div>
                <label className="font-medium">Adresse Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
              </div>
              <div>
                <label className="font-medium">Numéro de téléphone *</label>
                <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
              </div>
              <div>
                <label className="font-medium">Type d'annonce *</label>
                <select name="type" value={formData.type} onChange={handleChange} className="w-full border px-3 py-2 rounded" required>
                  <option value="">-- Choisir --</option>
                  <option value="recherche">Recherche</option>
                  <option value="vend">Vend</option>
                  <option value="donne">Donne</option>
                  <option value="échange">Échange</option>
                </select>
              </div>
              <div>
                <label className="font-medium">Contenu de l'annonce</label>
                <textarea name="contenu" value={formData.contenu} onChange={handleChange} className="w-full border px-3 py-2 rounded" rows={4} />
              </div>
              <div className="flex gap-4">
                <input type="file" accept="image/*" />
                <input type="file" accept="image/*" />
              </div>
              <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Envoyer</button>
            </form>
          )}
        </div>

        {/* Liste des annonces */}
        {sortedAnnonces.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedAnnonces.map((post) => (
              <div key={post.id} className="border rounded-lg p-4 bg-white shadow">
                <p className="text-sm text-neutral-400 mb-1">{new Date(post.created_at ?? post.date).toLocaleDateString()}</p>
                <h3 className="text-lg font-semibold mb-2">{post.type.toUpperCase()}</h3>
                <p className="text-neutral-700 whitespace-pre-line">{post.contenu}</p>
                {post.photo1 && <img src={post.photo1} alt="photo1" className="mt-3 rounded" />}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-neutral-500 text-center">Aucune annonce pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default AnnoncesPage;
