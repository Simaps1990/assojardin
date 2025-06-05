import React from 'react';
import { useContent } from '../context/ContentContext';

const AssociationPage: React.FC = () => {
  const { associationContent } = useContent();

if (!associationContent || !associationContent.id) {
  return (
    <div className="pt-24 pb-16 container-custom text-center text-gray-500">
      Chargement des informations de l’association...
    </div>
  );
}

const {
  titreAssociation,
  contentAssociation,
  couleurAssociation: color = '#000000',
  urlAssociation: url,
  imagesAssociation: images = [],
} = associationContent;


  const getImageGridClass = () => {
  if (images.length === 1) return 'grid-cols-1';
  if (images.length === 2) return 'grid-cols-2';
  if (images.length === 3) return 'grid-cols-3';
  return 'grid-cols-1';
};

  // ✅ Protection AVANT le return JSX
  if (
    !associationContent?.id &&
    !titreAssociation &&
    !contentAssociation &&
    images.length === 0
  ) {
    return (
      <div className="pt-24 pb-16 container-custom text-center text-gray-500">
        Chargement des informations de l’association...
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <h1 className="font-heading font-bold text-4xl mb-2" style={{ color }}>
          {titreAssociation}
        </h1>
        {url && (
          <p className="text-neutral-600 text-lg mb-8">
            <a
              href={url}
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {url}
            </a>
          </p>
        )}
        <div
          className="prose prose-lg max-w-none mb-10"
          dangerouslySetInnerHTML={{ __html: contentAssociation || '' }}
        />
        {images.length > 0 && (
          <div className={`grid gap-6 ${getImageGridClass()}`}>
            {images
              .filter((img): img is string => typeof img === 'string' && img !== null)
              .map((img, idx) => (
                <div key={idx} className="overflow-hidden rounded-lg shadow">
                  <img
                    src={img}
                    alt={`illustration-${idx}`}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AssociationPage;
