import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
}

// Composant SEO simplifié qui bloque l'indexation par les moteurs de recherche
const SEO: React.FC<SEOProps> = ({
  title = 'Site de démonstration',
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      {/* Bloquer l'indexation par tous les moteurs de recherche */}
      <meta name="robots" content="noindex, nofollow" />
      <meta name="googlebot" content="noindex, nofollow" />
    </Helmet>
  );
};

export default SEO;
