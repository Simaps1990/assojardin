import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMultiSiteAuth } from '../context/MultiSiteAuthContext';
import { Lock } from 'lucide-react';

const MultiSiteLoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useMultiSiteAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    const result = await login(username, password);

    if (result.success && result.siteId) {
      navigate(`/${result.siteId}`);
    } else {
      setError('Identifiants incorrects');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-green-100">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="h-20 w-20 mx-auto flex items-center justify-center rounded-full bg-primary-100 text-primary-700">
              <Lock size={40} />
            </div>
            <h1 className="font-heading font-bold text-3xl mt-4 mb-2">Jardins Partagés</h1>
            <p className="text-neutral-600">
              Connectez-vous pour accéder à votre espace
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
                  placeholder="admin1, admin2 ou admin3"
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
                  placeholder="password1, password2 ou password3"
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Se connecter
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h2 className="text-lg font-semibold mb-4 text-center">Identifiants de connexion</h2>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-50 p-3 rounded">
                  <p className="font-bold">Site 1</p>
                  <p>Identifiant: admin1</p>
                  <p>Mot de passe: password1</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="font-bold">Site 2</p>
                  <p>Identifiant: admin2</p>
                  <p>Mot de passe: password2</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="font-bold">Site 3</p>
                  <p>Identifiant: admin3</p>
                  <p>Mot de passe: password3</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiSiteLoginPage;
