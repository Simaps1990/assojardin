import React from 'react';
import { useContent } from '../context/ContentContext';
import BlogCard from '../components/ui/BlogCard';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const BlogPage: React.FC = () => {
  const { blogPosts } = useContent();

  // Tri du plus récent au plus ancien
  const sortedPosts = [...blogPosts].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
<div className="pb-16">
      <SEO 
        title="Blog Jardinage SJOV | Conseils de Plantation et Culture à Villeurbanne | Rhône-Alpes"
        description="Découvrez notre blog avec des conseils de jardinage, plantation et culture pour votre potager par des bénévoles passionnés. La SJOV partage son expertise en matière de jardins partagés à Villeurbanne (69100) en région Rhône-Alpes depuis 1936."
        keywords="blog jardinage, conseils plantation, culture potager, SJOV, Société des Jardins Ouvriers de Villeurbanne, jardins partagés, Villeurbanne, 69100, permaculture, légumes de saison, astuces jardinage, Rhône-Alpes, Lyon, Métropole de Lyon, Auvergne-Rhône-Alpes, bénévolat, articles jardinage, conseils potager, calendrier semis, calendrier récolte, fiches techniques jardinage, conseils saisonniers, entretien jardin, lutte biologique, compostage, semis, bouturage, taille, arrosage, rotation des cultures, associations de plantes, jardinage naturel, jardinage biologique, jardinage écologique, traitements naturels, recettes du jardin, conservation légumes, techniques de culture, sol vivant, biodiversité jardin"
      />

      <div className="container-custom">
        <h1 className="font-heading font-bold text-4xl mb-2">Nos articles de blog</h1>
        <p className="text-neutral-600 text-lg mb-8">
          Retrouvez ici les dernières nouvelles de notre association.
        </p>

        {sortedPosts.length > 0 ? (
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-0">
{sortedPosts.map((post) => (
  <Link to={`/blog/${post.id}`} key={post.id} className="block">
    <BlogCard post={post} />
  </Link>
))}

          </div>
        ) : (
          <p className="text-neutral-500 text-center">Aucun article pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
