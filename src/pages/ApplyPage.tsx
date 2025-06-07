import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const ApplyPage: React.FC = () => {
  const [formData, setFormData] = useState({
    nom: '',
    adresse: '',
    telephonePortable: '',
    telephoneFixe: '',
    email: '',
    tailleJardin: '',
    experience: '',
    budgetConnu: '',
    tempsDisponible: '',
    inspectionConnu: '',
    engagementCharte: '',
    engagementReglement: '',
    motivations: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Vérification des champs obligatoires (sauf téléphone fixe)
  const champsObligatoires = Object.entries(formData).filter(
    ([key]) => key !== 'telephoneFixe'
  );

  for (const [_, value] of champsObligatoires) {
    if (value.trim() === '') {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
  }

  const { error } = await supabase.from('applications').insert([
    {
      nom: formData.nom,
      adresse: formData.adresse,
      telephoneportable: formData.telephonePortable,
      telephonefixe: formData.telephoneFixe,
      email: formData.email,
      taillejardin: formData.tailleJardin,
      experience: formData.experience,
      budgetconnu: formData.budgetConnu,
      tempsdisponible: formData.tempsDisponible,
      inspectionconnu: formData.inspectionConnu,
      engagementcharte: formData.engagementCharte,
      engagementreglement: formData.engagementReglement,
      motivations: formData.motivations,
    },
  ]);

  if (error) {
    console.error('Erreur lors de l’envoi vers Supabase :', error.message);
    alert("Une erreur s'est produite. Merci de réessayer.");
    return;
  }

  setSubmitted(true);

  setFormData({
    nom: '',
    adresse: '',
    telephonePortable: '',
    telephoneFixe: '',
    email: '',
    tailleJardin: '',
    experience: '',
    budgetConnu: '',
    tempsDisponible: '',
    inspectionConnu: '',
    engagementCharte: '',
    engagementReglement: '',
    motivations: '',
  });
};


  if (submitted) {
    return (
<div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mb-10">

        <h1 className="text-2xl font-semibold text-green-800 mb-4">Demande envoyée</h1>
        <p>Merci pour votre candidature. Nous vous contacterons prochainement.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mb-10">

      <h1 className="text-2xl font-semibold text-green-800 mb-6">Postuler pour un jardin</h1>
      <form onSubmit={handleSubmit} className="space-y-5">

        {inputField({ label: "Nom Prénom", name: "nom", value: formData.nom, onChange: handleChange, required: true })}
        {inputField({ label: "Adresse", name: "adresse", value: formData.adresse, onChange: handleChange, required: true })}
        {inputField({ label: "Téléphone portable", name: "telephonePortable", value: formData.telephonePortable, onChange: handleChange, type: "tel", required: true })}
        {inputField({ label: "Téléphone fixe", name: "telephoneFixe", value: formData.telephoneFixe, onChange: handleChange, type: "tel" })}
        {inputField({ label: "Email", name: "email", value: formData.email, onChange: handleChange, type: "email", required: true })}

        {selectField({
          label: "Taille du jardin souhaité",
          name: "tailleJardin",
          value: formData.tailleJardin,
          onChange: handleChange,
          options: [
            ["", "-- Sélectionnez --"],
            ["petite", "Jardin de petite taille (inférieure à 150 m²)"],
            ["moyenne", "Jardin de taille moyenne (entre 150 et 200 m²)"],
            ["grande", "Jardin de grande taille (supérieure à 200 m²)"],
          ]
        })}

        {selectOuiNon({ label: "Avez vous déjà une expérience de jardinage (autre que terrasse et balcon) ?", name: "experience", value: formData.experience, onChange: handleChange })}
        {selectOuiNon({ label: "Postuler pour un jardin nécessite un budget de départ d'environ 25O euros sans compter la reprise d'un cabanon de 300 euros maximum (si la parcelle en est dotée) le saviez-vous ?", name: "budgetConnu", value: formData.budgetConnu, onChange: handleChange })}

        {selectField({
          label: "De combien de temps disposez-vous pour jardiner ",
          name: "tempsDisponible",
          value: formData.tempsDisponible,
          onChange: handleChange,
          options: [
            ["", "-- Sélectionnez --"],
            ["1h", "1 heure par jour"],
            ["2h", "Supérieur à 2 H par jour"],
            ["weekend", "Uniquement le week-end"],
            ["illimite", "Illimité"]
          ]
        })}

        {selectOuiNon({ label: "Savez-vous que les jardins sont inspectés tous les mois, si votre jardin n'est pas entretenu vous recevrez deux avertissements  avant d'être exclu ? Vous ne pourrez pas prétendre à récupérer la somme laissée pour votre cabanon.", name: "inspectionConnu", value: formData.inspectionConnu, onChange: handleChange })}
        {selectOuiNon({ label: "Vous engagez-vous lors de la prise d'un jardin à signer la charte de l'association pour le respect de l'environnement (sol, ressource en eau et la biodiversité ) .", name: "engagementCharte", value: formData.engagementCharte, onChange: handleChange })}
        {selectOuiNon({ label: "Vous engagez-vous lors de la prise d'un jardin à signer le règlement intérieur contenant entre autres le respect de la tranquillité.  ", name: "engagementReglement", value: formData.engagementReglement, onChange: handleChange })}

        <div>
          <label className="block font-medium text-gray-700 mb-1">En quelques mots quelles sont vos motivations pour obtenir un jardin *</label>
          <textarea
            name="motivations"
            value={formData.motivations}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Envoyer la demande
        </button>
      </form>
    </div>
  );
};

export default ApplyPage;

// Composants helpers

type InputFieldProps = {
  label: string;
  name: string;
  value: string;
  type?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
};
const inputField = ({ label, name, value, onChange, type = 'text', required }: InputFieldProps) => (
  <div>
    <label className="block font-medium text-gray-700 mb-1">{label} {required && '*'}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border px-3 py-2 rounded"
      required={required}
    />
  </div>
);

type SelectFieldProps = {
  label: string;
  name: string;
  value: string;
  options: [string, string][];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
};
const selectField = ({ label, name, value, options, onChange }: SelectFieldProps) => (
  <div>
    <label className="block font-medium text-gray-700 mb-1">{label} *</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border px-3 py-2 rounded"
      required
    >
      {options.map(([val, label]) => (
        <option key={val} value={val}>{label}</option>
      ))}
    </select>
  </div>
);

const selectOuiNon = ({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}) =>
  selectField({
    label,
    name,
    value,
    onChange,
    options: [
      ['', '-- Sélectionnez --'],
      ['oui', 'Oui'],
      ['non', 'Non'],
    ],
  });
