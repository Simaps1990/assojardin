import React, { useState, forwardRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, Lock, Menu, X } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

const Header = forwardRef<HTMLElement>((_, ref) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const { associationContent } = useContent();
  const headerIcon: string | undefined = associationContent.headerIcon;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const navLinks = [
    { to: '/', label: 'Accueil' },
    { to: '/association', label: 'Notre association' },
    { to: '/blog', label: 'Blog' },
    { to: '/events', label: 'Événements' },
    { to: '/apply', label: 'Postuler' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header
      ref={ref}
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-3"
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo + texte */}
        <Link to="/" className="flex items-center">
          {headerIcon && (
            <img src={headerIcon} alt="SJOV Logo" className="h-12 w-12" />
          )}
          <div className="ml-3 text-primary-700 leading-tight flex flex-col">
            <h1 className="text-xl font-bold m-0 p-0">SJOV</h1>
            <p className="text-sm font-medium text-primary-600 m-0 p-0">
              Jardins Ouvriers de Villeurbanne
            </p>
          </div>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-4 ml-auto">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive
                    ? 'text-primary-600'
                    : 'text-neutral-700 hover:text-primary-600'
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          <form
            onSubmit={handleSearch}
            className="relative w-full max-w-[180px]"
          >
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
            className="text-neutral-700 hover:text-primary-600 p-2"
            aria-label="Administration"
          >
            <Lock size={22} />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-neutral-700 hover:text-primary-600 p-2"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 animate-slide-down">
          <nav className="flex flex-col items-end gap-3 text-sm font-medium mt-3">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium ${
                    isActive
                      ? 'text-primary-600'
                      : 'text-neutral-700 hover:text-primary-600'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}

            <form
              onSubmit={(e) => {
                handleSearch(e);
                setMobileOpen(false);
              }}
              className="relative w-full max-w-[180px]"
            >
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
              className="text-neutral-700 hover:text-primary-600 p-2"
              aria-label="Administration"
            >
              <Lock size={22} />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
});

export default Header;
