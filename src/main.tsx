import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Fonction pour forcer le rechargement des ressources
const forceRevalidation = () => {
  // Ajouter un paramètre de version unique à chaque URL pour éviter la mise en cache
  const timestamp = new Date().getTime();
  const links = document.querySelectorAll('link[rel="stylesheet"]');
  const scripts = document.querySelectorAll('script[src]');
  
  // Mettre à jour les liens CSS
  links.forEach(link => {
    if (link instanceof HTMLLinkElement && link.href) {
      const url = new URL(link.href);
      url.searchParams.set('v', timestamp.toString());
      link.href = url.toString();
    }
  });
  
  // Mettre à jour les scripts
  scripts.forEach(script => {
    if (script instanceof HTMLScriptElement && script.src) {
      const url = new URL(script.src);
      url.searchParams.set('v', timestamp.toString());
      script.src = url.toString();
    }
  });
};

// Exécuter la fonction au chargement de la page
if (typeof window !== 'undefined') {
  window.addEventListener('load', forceRevalidation);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
