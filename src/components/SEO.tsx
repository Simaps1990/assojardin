import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'SJOV - Société des Jardins Ouvriers de Villeurbanne | Jardins Partagés Rhône-Alpes',
  description = 'La Société des Jardins Ouvriers de Villeurbanne (SJOV) propose des jardins partagés à Villeurbanne (69100) en région Rhône-Alpes. Découvrez nos conseils de jardinage, plantation et culture pour votre potager. Association de bénévoles passionnés depuis 1936.',
  keywords = 'jardin, jardins partagés, plantation, Villeurbanne, SJOV, Société des Jardins Ouvriers de Villeurbanne, 69100, culture, potager, jardinage, maraîchage, permaculture, écologie, biodiversité, légumes, Rhône-Alpes, Lyon, Métropole de Lyon, Auvergne-Rhône-Alpes, bénévolat, association jardinage, jardins familiaux, jardins collectifs, jardins ouvriers, agriculture urbaine, compost, semis, récolte, fruits, légumes bio, horticulture, plantes aromatiques, fleurs, verger, agroécologie, développement durable, partage de savoirs, lien social, vie associative, animations jardinage, ateliers pédagogiques, graines, terreau, outils de jardin, parcelle de jardin',
  image = '/public/images/sjov-logo.png',
  url = window.location.href,
  type = 'website',
}) => {
  const siteTitle = 'SJOV - Société des Jardins Ouvriers de Villeurbanne';
  
  return (
    <Helmet>
      {/* Balises meta de base */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Balises Open Graph pour les réseaux sociaux */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteTitle} />
      
      {/* Balises Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Balises supplémentaires pour le référencement local */}
      <meta name="geo.region" content="FR-69" />
      <meta name="geo.placename" content="Villeurbanne, Rhône-Alpes" />
      <meta name="geo.position" content="45.7675;4.8800" />
      <meta name="ICBM" content="45.7675, 4.8800" />
      <meta name="geo.region" content="FR-ARA" /> {/* Code région Auvergne-Rhône-Alpes */}
      
      {/* Balise de langue */}
      <meta property="og:locale" content="fr_FR" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
