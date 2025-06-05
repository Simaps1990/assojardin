import React from 'react';
import { useContent } from '../context/ContentContext';
import BlogCard from '../components/ui/BlogCard';
import { Link } from 'react-router-dom';

const BlogPage: React.FC = () => {
  const { blogPosts } = useContent();

  // Tri du plus récent au plus ancien
  const sortedPosts = [...blogPosts].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
<div className="pt-24 pb-16">

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
