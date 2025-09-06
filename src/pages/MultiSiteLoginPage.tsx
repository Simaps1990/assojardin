import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMultiSiteAuth } from '../context/MultiSiteAuthContext';
import { Sprout, Leaf, Flower2, Sun } from 'lucide-react';

const MultiSiteLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentSite } = useMultiSiteAuth();

  const handleSiteSelection = (siteId: string) => {
    setCurrentSite(siteId);
    navigate(`/${siteId}`);
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
              Découvrez nos trois maquettes et explorez leurs fonctionnalités uniques.
            </p>
          </div>
        </div>
      </div>
      
      {/* Section principale */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-4">Sélectionnez un site pour continuer</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Chaque site présente une approche différente de jardinage communautaire.
              Explorez-les pour découvrir leurs spécificités et fonctionnalités.  
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Site 1 */}
            <div 
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl"
              onClick={() => handleSiteSelection('site1')}
            >
              <div className="h-48 bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-white bg-opacity-20 rounded-full p-2">
                  <Sprout size={24} className="text-white" />
                </div>
                <h2 className="text-white text-3xl font-bold">Site 1</h2>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2 text-green-700">Jardins Partagés - Site 1</h3>
                <p className="text-gray-600 mb-6">
                  Découvrez notre premier site avec ses articles de blog, événements communautaires et annonces de partage entre jardiniers.
                </p>
                <button className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors">
                  Accéder au site
                </button>
              </div>
            </div>

            {/* Site 2 */}
            <div 
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl"
              onClick={() => handleSiteSelection('site2')}
            >
              <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-white bg-opacity-20 rounded-full p-2">
                  <Flower2 size={24} className="text-white" />
                </div>
                <h2 className="text-white text-3xl font-bold">Site 2</h2>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2 text-blue-700">Jardins Partagés Communautaires</h3>
                <p className="text-gray-600 mb-6">
                  Explorez notre deuxième site axé sur l'agriculture urbaine et les pratiques écologiques innovantes en milieu urbain.
                </p>
                <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                  Accéder au site
                </button>
              </div>
            </div>

            {/* Site 3 */}
            <div 
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl"
              onClick={() => handleSiteSelection('site3')}
            >
              <div className="h-48 bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-white bg-opacity-20 rounded-full p-2">
                  <Sun size={24} className="text-white" />
                </div>
                <h2 className="text-white text-3xl font-bold">Site 3</h2>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2 text-amber-700">Espace Vert Collectif</h3>
                <p className="text-gray-600 mb-6">
                  Découvrez notre troisième site spécialisé dans le jardinage thérapeutique et les jardins pédagogiques adaptés à tous.
                </p>
                <button className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors">
                  Accéder au site
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-white rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Comment utiliser cette démo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-3xl mx-auto">
              <div className="p-4 border border-gray-100 rounded-lg">
                <p className="font-medium text-gray-700 mb-2">Accès aux sites</p>
                <p className="text-gray-600">Cliquez sur l'un des trois sites ci-dessus pour explorer son contenu public.</p>
              </div>
              <div className="p-4 border border-gray-100 rounded-lg">
                <p className="font-medium text-gray-700 mb-2">Accès à l'administration</p>
                <p className="text-gray-600">Dans chaque site, utilisez les identifiants <span className="font-mono bg-gray-100 px-1">admin</span> / <span className="font-mono bg-gray-100 px-1">password</span> pour accéder à l'espace d'administration.</p>
              </div>
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
