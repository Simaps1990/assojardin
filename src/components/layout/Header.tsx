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
<header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-3">
  <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
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
<div className="flex flex-col md:flex-row md:items-center md:gap-6 w-full md:w-auto">
  <nav className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 text-sm font-medium w-full md:w-auto">
    <Link to="/" className="hover:text-primary-600 text-neutral-700">Accueil</Link>
    <Link to="/association" className="hover:text-primary-600 text-neutral-700">Notre association</Link>
    <Link to="/blog" className="hover:text-primary-600 text-neutral-700">Blog</Link>
    <Link to="/events" className="hover:text-primary-600 text-neutral-700">Événements</Link>
    <Link to="/apply" className="hover:text-primary-600 text-neutral-700">Postuler</Link>
    <Link to="/contact" className="hover:text-primary-600 text-neutral-700">Contact</Link>
  </nav>

  <div className="flex items-center gap-2 mt-2 md:mt-0 w-full md:w-auto">
    <form onSubmit={handleSearch} className="relative w-full md:w-48">
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
