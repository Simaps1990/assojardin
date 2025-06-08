import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import { BlogPost } from '../../types';
import { formatDate } from '../../utils/formatters';

interface BlogCardProps {
  post: BlogPost;
  isFeature?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, isFeature = false }) => {
  return (
    <article
      className={`card group transition-all duration-300 h-full ${
        isFeature ? 'md:flex' : ''
      }`}
    >
      {/* Image principale */}
<div
  className={`relative overflow-hidden ${
    isFeature ? 'md:w-2/5 h-64' : 'h-64'
  }`}
>
  <img
    src={post.image}
    alt={post.title}
    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
  />
</div>


      {/* Contenu texte + bouton */}
      <div
        className={`p-6 flex flex-col justify-between ${
          isFeature ? 'md:w-3/5' : ''
        }`}
      >
        <div>
  <div className="flex flex-col space-y-1 text-sm text-neutral-500 mb-3">
  <div className="flex items-center">
    <Calendar size={16} className="mr-2 text-primary-500" />
    <span>{formatDate(post.date)}</span>
  </div>
  <div className="flex items-center">
    <User size={16} className="mr-2 text-primary-500" />
    <span>{post.author}</span>
  </div>
</div>


          <h3 className="font-heading font-semibold text-xl mb-4">
            <Link
              to={`/blog/${post.id}`}
              className="text-neutral-800 hover:text-primary-600"
            >
              {post.title}
            </Link>
          </h3>
        </div>

        <div className="mt-auto flex justify-end">
          <Link
            to={`/blog/${post.id}`}
            className="btn-outline inline-flex items-center text-sm"
          >
            Lire l'article
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
