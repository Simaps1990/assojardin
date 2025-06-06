import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Lock } from 'lucide-react';
import { useContent } from '../../context/ContentContext'; // ✅ correction du chemin

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { associationContent } = useContent();
  const headerIcon = associationContent.headerIcon || '/src/assets/logo.svg';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
<header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-3 h-20">
<div className="container-custom flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Logo + texte */}
        <Link to="/" className="flex items-center">
          <img
            src={headerIcon}
            alt="SJOV Logo"
            className="h-12 w-12"
          />
          <div className="ml-3 text-primary-700 leading-tight flex items-baseline space-x-2">
            <h1 className="text-xl font-bold m-0 p-0">SJOV</h1>
            <p className="text-base font-sans font-normal text-primary-600 m-0 p-0">
              Jardins Ouvriers de Villeurbanne
            </p>
          </div>
        </Link>

        {/* Navigation + Recherche + Connexion */}
<div className="flex flex-col md:flex-row md:items-center gap-4 w-full md:w-auto">
  <nav className="flex flex-wrap justify-center gap-4 text-sm font-medium">
    {/* Tes <Link> ici, inchangés */}
  </nav>

  <div className="flex items-center gap-2 justify-between md:justify-end w-full md:w-auto">
    <form onSubmit={handleSearch} className="relative flex-grow">
      <input
        type="text"
        placeholder="Rechercher..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="form-input w-full pl-10 pr-4 py-2 rounded border border-neutral-300"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={16} />
    </form>

    <Link to="/login" className="text-neutral-700 hover:text-primary-600 p-2" aria-label="Administration">
      <Lock size={22} />
    </Link>
  </div>
</div>

      </div>
    </header>
  );
};

export default Header;
