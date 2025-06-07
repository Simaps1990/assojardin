import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, Lock, Menu } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

const Header = forwardRef<HTMLElement>((_, ref) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { associationContent } = useContent();
  const headerIcon: string | undefined = associationContent.headerIcon;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
      setMobileOpen(false); // ferme aussi après recherche
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header ref={ref} className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-3">
      <div className="container-custom flex items-center justify-between">
        {/* Bloc logo gauche */}
        <Link to="/" className="flex items-center">
          {headerIcon && <img src={headerIcon} alt="SJOV Logo" className="h-12 w-12" />}
          <div className="ml-3 text-primary-700 leading-tight flex items-baseline space-x-2">
            <h1 className="text-xl font-bold m-0 p-0">SJOV</h1>
            <p className="text-sm font-medium text-primary-600 m-0 p-0">
              Jardins Ouvriers de Villeurbanne
            </p>
          </div>
        </Link>

        {/* Bouton menu mobile */}
        <button
          className="md:hidden text-neutral-700 hover:text-primary-600 p-2"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Menu"
        >
          <Menu size={24} />
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-x-4 ml-auto">
          {[
            { to: '/association', label: 'A propos' },
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

          <form onSubmit={handleSearch} className="relative w-full max-w-[180px] md:w-40">
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

      {/* Menu mobile déroulant animé */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out px-4 ${
          mobileOpen ? 'max-h-[1000px] mt-2' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col gap-3">
          {[
            { to: '/association', label: 'A propos' },
            { to: '/blog', label: 'Blog' },
            { to: '/events', label: 'Événements' },
            { to: '/apply', label: 'Postuler' },
            { to: '/contact', label: 'Contact' }
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive ? 'text-primary-600' : 'text-neutral-700 hover:text-primary-600'
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          <form onSubmit={handleSearch} className="relative w-full max-w-full">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input w-full pl-10 pr-4 py-2 rounded border border-neutral-300"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={16} />
          </form>

          <Link
            to="/login"
            onClick={() => setMobileOpen(false)}
            className="text-neutral-700 hover:text-primary-600 p-2 self-start"
            aria-label="Administration"
          >
            <Lock size={22} />
          </Link>
        </div>
      </div>
    </header>
  );
});

export default Header;
