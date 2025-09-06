import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMultiSiteAuth } from '../context/MultiSiteAuthContext';
import { Sprout, Leaf, Flower2, Sun, Lock, AlertCircle } from 'lucide-react';

const MultiSiteLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentSite } = useMultiSiteAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Identifiants spécifiques pour chaque sous-site
  const siteCredentials = {
    site1: { username: 'admin1', password: 'password1' },
    site2: { username: 'admin2', password: 'password2' },
    site3: { username: 'admin3', password: 'password3' }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    
    // Vérifier les identifiants pour chaque site
    for (const [siteId, credentials] of Object.entries(siteCredentials)) {
      if (username === credentials.username && password === credentials.password) {
        // Identifiants corrects, rediriger vers le site correspondant
        setCurrentSite(siteId);
        navigate(`/${siteId}`);
        return;
      }
    }
    
    // Si aucun identifiant ne correspond
    setError('Identifiants incorrects');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 via-green-100 to-green-200">
      {/* Header avec animation */}
      <div className="relative overflow-hidden py-16 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          {/* Éléments décoratifs animés */}
          <div className="absolute top-10 left-10 animate-float-slow">
            <Leaf size={40} className="text-white" />
          </div>
          <div className="absolute top-20 right-20 animate-float-medium">
            <Flower2 size={30} className="text-white" />
          </div>
          <div className="absolute bottom-10 left-1/4 animate-float-fast">
            <Sun size={24} className="text-white" />
          </div>
          <div className="absolute bottom-20 right-1/3 animate-float-slow">
            <Leaf size={20} className="text-white" />
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <div className="h-24 w-24 mx-auto flex items-center justify-center rounded-full bg-white bg-opacity-20 mb-6">
              <Sprout size={50} className="text-white" />
            </div>
            <h1 className="font-heading font-bold text-5xl mb-4">Jardins Partagés</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Bienvenue sur notre plateforme de jardinage communautaire.
              Connectez-vous pour accéder à votre espace.
            </p>
          </div>
        </div>
      </div>
      
      {/* Section principale avec formulaire de connexion */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-green-800 mb-4">Connexion</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Veuillez vous connecter pour accéder à votre espace.
            </p>
          </div>

          {/* Formulaire de connexion */}
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="flex justify-center mb-6">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                  <Lock size={30} className="text-green-600" />
                </div>
              </div>
              
              {error && (
                <div className="mb-6 p-4 bg-red-50 rounded-lg flex items-center gap-3 text-red-700">
                  <AlertCircle size={20} />
                  <p>{error}</p>
                </div>
              )}
              
              <form onSubmit={handleLogin}>
                <div className="mb-6">
                  <p className="text-center text-gray-600">
                    Entrez vos identifiants pour vous connecter
                  </p>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Identifiant</label>
                  <input 
                    type="text" 
                    id="username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                    placeholder="admin"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Mot de passe</label>
                  <input 
                    type="password" 
                    id="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                    placeholder="password"
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                >
                  Se connecter
                </button>
              </form>
              
              <div className="mt-6 pt-4 border-t border-gray-200 text-center text-sm text-gray-500">
                <p>Veuillez contacter l'administrateur si vous avez oublié vos identifiants</p>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-auto py-6 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2025 Jardins Partagés - Tous droits réservés</p>
          <p className="mt-2">Association de jardinage urbain et communautaire</p>
        </div>
      </div>
    </div>
  );
};

export default MultiSiteLoginPage;
