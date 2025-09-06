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
  const [selectedSite, setSelectedSite] = useState<string | null>(null);

  // Identifiants spécifiques pour chaque sous-site
  const siteCredentials = {
    site1: { username: 'admin', password: 'password' },
    site2: { username: 'admin', password: 'password' },
    site3: { username: 'admin', password: 'password' }
  };

  const handleSiteSelection = (siteId: string) => {
    setSelectedSite(siteId);
    setError('');
  };
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedSite) {
      setError('Veuillez sélectionner un site');
      return;
    }
    
    if (!username || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    
    const credentials = siteCredentials[selectedSite as keyof typeof siteCredentials];
    
    if (username === credentials.username && password === credentials.password) {
      setCurrentSite(selectedSite);
      navigate(`/${selectedSite}`);
    } else {
      setError('Identifiants incorrects');
    }
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
              Bienvenue sur notre plateforme de démonstration des sites de jardins partagés.
              Connectez-vous pour accéder à l'un de nos trois sites.
            </p>
          </div>
        </div>
      </div>
      
      {/* Section principale avec formulaire de connexion */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-green-800 mb-4">Connexion aux sites</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Veuillez vous connecter pour accéder au site de votre choix.
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
                  <label className="block text-gray-700 font-medium mb-2">Sélectionnez un site</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button 
                      type="button"
                      onClick={() => handleSiteSelection('site1')} 
                      className={`p-3 rounded-lg border-2 transition-all ${selectedSite === 'site1' ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}
                    >
                      <div className="flex flex-col items-center">
                        <Sprout size={24} className={`${selectedSite === 'site1' ? 'text-green-600' : 'text-gray-500'}`} />
                        <span className={`mt-1 font-medium ${selectedSite === 'site1' ? 'text-green-600' : 'text-gray-700'}`}>Site 1</span>
                      </div>
                    </button>
                    
                    <button 
                      type="button"
                      onClick={() => handleSiteSelection('site2')} 
                      className={`p-3 rounded-lg border-2 transition-all ${selectedSite === 'site2' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                    >
                      <div className="flex flex-col items-center">
                        <Flower2 size={24} className={`${selectedSite === 'site2' ? 'text-blue-600' : 'text-gray-500'}`} />
                        <span className={`mt-1 font-medium ${selectedSite === 'site2' ? 'text-blue-600' : 'text-gray-700'}`}>Site 2</span>
                      </div>
                    </button>
                    
                    <button 
                      type="button"
                      onClick={() => handleSiteSelection('site3')} 
                      className={`p-3 rounded-lg border-2 transition-all ${selectedSite === 'site3' ? 'border-amber-600 bg-amber-50' : 'border-gray-200 hover:border-amber-300'}`}
                    >
                      <div className="flex flex-col items-center">
                        <Sun size={24} className={`${selectedSite === 'site3' ? 'text-amber-600' : 'text-gray-500'}`} />
                        <span className={`mt-1 font-medium ${selectedSite === 'site3' ? 'text-amber-600' : 'text-gray-700'}`}>Site 3</span>
                      </div>
                    </button>
                  </div>
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
                <p>Identifiants par défaut: admin / password</p>
              </div>
            </div>
          </div>

          {/* Informations sur les sites */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-xl mb-2 text-green-700">Jardins Partagés - Site 1</h3>
              <p className="text-gray-600">
                Premier site avec ses articles de blog, événements communautaires et annonces de partage entre jardiniers.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-xl mb-2 text-blue-700">Jardins Partagés - Site 2</h3>
              <p className="text-gray-600">
                Deuxième site axé sur l'agriculture urbaine et les pratiques écologiques innovantes en milieu urbain.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-xl mb-2 text-amber-700">Espace Vert Collectif - Site 3</h3>
              <p className="text-gray-600">
                Troisième site spécialisé dans le jardinage thérapeutique et les jardins pédagogiques adaptés à tous.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-auto py-6 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2025 Jardins Partagés - Démonstration de sites multiples</p>
          <p className="mt-2">Chaque site dispose de son propre contenu et de son propre espace d'administration.</p>
        </div>
      </div>
    </div>
  );
};

export default MultiSiteLoginPage;
