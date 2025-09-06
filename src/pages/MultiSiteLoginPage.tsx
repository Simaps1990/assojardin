import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMultiSiteAuth } from '../context/MultiSiteAuthContext';
import { Sprout } from 'lucide-react';

const MultiSiteLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentSite } = useMultiSiteAuth();

  const handleSiteSelection = (siteId: string) => {
    setCurrentSite(siteId);
    navigate(`/${siteId}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-green-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="h-20 w-20 mx-auto flex items-center justify-center rounded-full bg-primary-100 text-primary-700">
              <Sprout size={40} />
            </div>
            <h1 className="font-heading font-bold text-4xl mt-4 mb-2">Jardins Partagés</h1>
            <p className="text-neutral-600 text-xl">
              Sélectionnez un site pour continuer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Site 1 */}
            <div 
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => handleSiteSelection('site1')}
            >
              <div className="h-40 bg-green-600 flex items-center justify-center">
                <h2 className="text-white text-2xl font-bold">Site 1</h2>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Jardins Partagés - Site 1</h3>
                <p className="text-neutral-600 mb-4">
                  Accédez au premier site de jardins partagés avec ses articles, événements et annonces.  
                </p>
                <button className="btn-primary w-full">
                  Accéder au site
                </button>
              </div>
            </div>

            {/* Site 2 */}
            <div 
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => handleSiteSelection('site2')}
            >
              <div className="h-40 bg-blue-600 flex items-center justify-center">
                <h2 className="text-white text-2xl font-bold">Site 2</h2>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Jardins Partagés - Site 2</h3>
                <p className="text-neutral-600 mb-4">
                  Accédez au deuxième site de jardins partagés avec son contenu spécifique.
                </p>
                <button className="btn-primary w-full">
                  Accéder au site
                </button>
              </div>
            </div>

            {/* Site 3 */}
            <div 
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => handleSiteSelection('site3')}
            >
              <div className="h-40 bg-amber-600 flex items-center justify-center">
                <h2 className="text-white text-2xl font-bold">Site 3</h2>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Jardins Partagés - Site 3</h3>
                <p className="text-neutral-600 mb-4">
                  Accédez au troisième site de jardins partagés avec son contenu unique.
                </p>
                <button className="btn-primary w-full">
                  Accéder au site
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-neutral-500">
            <p>Chaque site dispose de son propre contenu et de son propre espace d'administration.</p>
            <p>Pour accéder à l'administration d'un site, connectez-vous avec les identifiants admin/password.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiSiteLoginPage;
