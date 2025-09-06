import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sprout } from 'lucide-react';

interface LoginPageProps {
  siteId: string;
}

const LoginPage: React.FC<LoginPageProps> = ({ siteId }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Récupérer l'URL de redirection si elle existe
  const from = location.state?.from?.pathname || '/admin';
  
  // Définir les informations spécifiques au site
  const getSiteInfo = () => {
    switch(siteId) {
      case 'site1':
        return {
          name: 'Site 1',
          title: 'Jardins Partagés - Site 1',
          color: 'bg-green-600',
          textColor: 'text-green-600',
          icon: <Sprout size={40} className="text-green-600" />
        };
      case 'site2':
        return {
          name: 'Site 2',
          title: 'Jardins Partagés Communautaires',
          color: 'bg-blue-600',
          textColor: 'text-blue-600',
          icon: <Sprout size={40} className="text-blue-600" />
        };
      case 'site3':
        return {
          name: 'Site 3',
          title: 'Espace Vert Collectif',
          color: 'bg-amber-600',
          textColor: 'text-amber-600',
          icon: <Sprout size={40} className="text-amber-600" />
        };
      default:
        return {
          name: 'Jardins Partagés',
          title: 'Jardins Partagés',
          color: 'bg-green-600',
          textColor: 'text-green-600',
          icon: <Sprout size={40} className="text-green-600" />
        };
    }
  };
  
  const siteInfo = getSiteInfo();

  // Identifiants spécifiques pour chaque site
  const siteCredentials = {
    site1: { username: 'admin1', password: 'password1' },
    site2: { username: 'admin2', password: 'password2' },
    site3: { username: 'admin3', password: 'password3' }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    try {
      // Vérifier les identifiants correspondant au site actuel
      const credentials = siteCredentials[siteId as keyof typeof siteCredentials];
      
      if (username === credentials.username && password === credentials.password) {
        await login(username, password);
        navigate(from, { replace: true });
      } else {
        setError('Identifiants incorrects');
      }
    } catch (err) {
      setError('Une erreur est survenue lors de la connexion');
      console.error('Erreur de connexion:', err);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-b from-${siteInfo.color.replace('bg-', '')}-50 to-${siteInfo.color.replace('bg-', '')}-100`}>
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className={`h-20 w-20 mx-auto flex items-center justify-center rounded-full ${siteInfo.color.replace('bg-', 'bg-')}-100`}>
              {siteInfo.icon}
            </div>
            <h1 className="font-heading font-bold text-3xl mt-4 mb-2">{siteInfo.title}</h1>
            <p className="text-neutral-600">
              Connectez-vous pour accéder à l'administration du {siteInfo.name}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            {error && (
              <div className="bg-error-50 text-error-700 p-4 rounded-md mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="form-label">
                  Identifiant
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-input"
                  autoComplete="username"
                  placeholder="admin"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="form-label">
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  autoComplete="current-password"
                  placeholder="password"
                />
              </div>

              <button type="submit" className={`w-full py-2 px-4 rounded-md font-medium text-white ${siteInfo.color} hover:opacity-90 transition-opacity`}>
                Se connecter
              </button>
            </form>
            
            <div className="mt-6 pt-4 border-t border-gray-200 text-center text-sm text-gray-500">
              <p>Identifiants pour ce site: 
                {siteId === 'site1' && <span className="font-mono bg-gray-100 px-1">admin1 / password1</span>}
                {siteId === 'site2' && <span className="font-mono bg-gray-100 px-1">admin2 / password2</span>}
                {siteId === 'site3' && <span className="font-mono bg-gray-100 px-1">admin3 / password3</span>}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
