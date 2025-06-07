import React, { useState, forwardRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, Lock } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

const Header = forwardRef<HTMLElement>((_, ref) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { associationContent } = useContent();
  const headerIcon: string | undefined = associationContent.headerIcon;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header ref={ref} className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-3">
      <div className="container-custom flex flex-wrap items-center justify-between gap-y-2">
        {/* Logo + texte */}
        <Link to="/" className="flex items-center mr-4">
          {headerIcon && (
            <img src={headerIcon} alt="SJOV Logo" className="h-12 w-12" />
          )}
          <div className="ml-3 text-primary-700 leading-tight flex items-baseline space-x-2">
            <h1 className="text-xl font-bold m-0 p-0">SJOV</h1>
            <p className="text-base font-sans font-normal text-primary-600 m-0 p-0">
              Jardins Ouvriers de Villeurbanne
            </p>
          </div>
        </Link>

        {/* Bloc Navigation complet */}
<div className="flex flex-wrap items-center gap-x-4 gap-y-2 w-full justify-end">
  {[{ to: '/', label: 'Accueil' },
    { to: '/association', label: 'Notre association' },
    { to: '/blog', label: 'Blog' },
    { to: '/events', label: 'Événements' },
    { to: '/apply', label: 'Postuler' },
    { to: '/contact', label: 'Contact' }
  ].map(({ to, label }) => (
    <NavLink
      key={to}
      to={to}
      className={({ isActive }) =>
        `text-sm font-medium ${
          isActive ? 'text-primary-600' : 'text-neutral-700 hover:text-primary-600'
        }`
      }
    >
      {label}
    </NavLink>
  ))}

  {/* Recherche + Login, intégré au flux */}
  <div className="flex items-center gap-2 ml-auto">
    <form onSubmit={handleSearch} className="relative w-full max-w-[160px] md:max-w-[180px]">
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
});

export default Header;
