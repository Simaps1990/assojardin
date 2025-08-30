import React from 'react';
import SEO from '../components/SEO';

const MentionsLegalesPage: React.FC = () => {
  return (
    <div className="container-custom py-12">
      <SEO 
        title="Mentions Légales | SJOV | Association de Jardins Partagés à Villeurbanne"
        description="Mentions légales de la Société des Jardins Ouvriers de Villeurbanne (SJOV), association loi 1901 proposant des jardins partagés à Villeurbanne et Vaulx-en-Velin."
        keywords="mentions légales, SJOV, association loi 1901, jardins partagés, Villeurbanne"
      />
      
      <h1 className="text-3xl font-bold mb-8">Mentions Légales</h1>
      
      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Présentation de l'association</h2>
          <p>
            <strong>Nom de l'association :</strong> Société des Jardins Ouvriers de Villeurbanne (SJOV)<br />
            <strong>Statut juridique :</strong> Association loi 1901<br />
            <strong>Adresse du siège social :</strong> 6 rue du Pont des Planches, 69100 Villeurbanne<br />
            <strong>Téléphone :</strong> 04 78 12 34 56<br />
            <strong>Email :</strong> sjovilleurbanne@gmail.com<br />
            <strong>Représentant légal :</strong> Monsieur BOYER Jean, Président de l'association
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Activité de l'association</h2>
          <p>
            La Société des Jardins Ouvriers de Villeurbanne (SJOV) est une association à but non lucratif dont l'objet est de promouvoir et développer les jardins partagés dans la région de Villeurbanne et Vaulx-en-Velin. L'association propose des parcelles de jardins à cultiver, organise des événements autour du jardinage et de l'écologie, et crée du lien social à travers ces activités.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Site internet</h2>
          <p>
            <strong>Adresse du site :</strong> https://sjov.fr<br />
            <strong>Hébergeur du site :</strong> Netlify, Inc., 2325 3rd Street, Suite 215, San Francisco, California 94107, États-Unis<br />
            <strong>Directeur de la publication :</strong> Monsieur BOYER Jean, Président de l'association
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Propriété intellectuelle</h2>
          <p>
            L'ensemble du contenu du site (textes, images, vidéos, logos, etc.) est la propriété exclusive de la SJOV ou de ses partenaires. Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de la SJOV.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Protection des données personnelles</h2>
          <p>
            Conformément à la loi Informatique et Libertés du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité des données vous concernant. Pour exercer ces droits, vous pouvez nous contacter par email à sjovilleurbanne@gmail.com ou par courrier à l'adresse du siège social.
          </p>
          <p>
            Les données personnelles collectées sur ce site sont uniquement destinées à la gestion des activités de l'association et ne sont en aucun cas cédées ou vendues à des tiers.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
          <p>
            Le site de la SJOV peut utiliser des cookies pour améliorer l'expérience utilisateur. Vous pouvez désactiver l'utilisation de cookies en paramétrant votre navigateur internet.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Liens hypertextes</h2>
          <p>
            Le site de la SJOV peut contenir des liens hypertextes vers d'autres sites internet. La SJOV n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Droit applicable et juridiction compétente</h2>
          <p>
            Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.
          </p>
        </section>
      </div>
    </div>
  );
};

export default MentionsLegalesPage;
