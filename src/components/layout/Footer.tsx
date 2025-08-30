import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Calendar } from 'lucide-react';
import WeatherWidget from '../ui/WeatherWidget';
import { useContent } from '../../context/ContentContext';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { associationContent } = useContent();

  const texteFooterGauche =
    associationContent?.texteFooter ||
    "La Société des Jardins Ouvriers de Villeurbanne promeut le jardinage écologique et crée du lien social à travers la culture de parcelles individuelles et collectives.";

  const contactTel = associationContent?.telephone || "04 78 12 34 56";
  const contactEmail = associationContent?.email || "sjovilleurbanne@gmail.com";
  const contactHoraire = associationContent?.horaires || "Permanences: Samedi 9h-12h";

  const headerIcon = associationContent?.headerIcon || "/src/assets/logo.svg";

  return (
    <footer className="bg-primary-800 text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <img
                src={headerIcon}
                alt="SJOV Logo"
                className="h-10 w-10 bg-white rounded-full p-1"
              />
              <h3 className="ml-2 text-xl font-bold">SJOV</h3>
            </div>
            <p className="mb-4 text-primary-100">{texteFooterGauche}</p>
            <div className="mt-4">
              <WeatherWidget />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-3">
             <li className="flex items-start">
  <MapPin className="mr-2 mt-1 flex-shrink-0" size={18} />
  <a
    href="https://maps.app.goo.gl/1TX7D2YyT6tKcvZQ9"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-primary-200 transition-colors"
  >
    6 rue du Pont des Planches, 69100 Villeurbanne
  </a>
</li>

              <li className="flex items-center">
                <Phone className="mr-2 flex-shrink-0" size={18} />
                <span>{contactTel}</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 flex-shrink-0" size={18} />
                <a
                  href={`mailto:${contactEmail}`}
                  className="hover:text-primary-200 transition-colors"
                >
                  {contactEmail}
                </a>
              </li>
              <li className="flex items-center">
                <Calendar className="mr-2 flex-shrink-0" size={18} />
                <span>{contactHoraire}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Liens Rapides</h3>
<ul className="space-y-2">
  <li><Link to="/" className="hover:text-primary-200 transition-colors">Accueil</Link></li>
  <li><Link to="/association" className="hover:text-primary-200 transition-colors">Notre Association</Link></li>
  <li><Link to="/blog" className="hover:text-primary-200 transition-colors">Blog</Link></li>
  <li><Link to="/events" className="hover:text-primary-200 transition-colors">Événements</Link></li>
  <li><Link to="/annonces" className="hover:text-primary-200 transition-colors">Annonces</Link></li>
  <li><Link to="/apply" className="hover:text-primary-200 transition-colors">Postuler pour un jardin</Link></li>
  <li><Link to="/contact" className="hover:text-primary-200 transition-colors">Contact</Link></li>
  <li><Link to="/mentions-legales" className="hover:text-primary-200 transition-colors">Mentions Légales</Link></li>
</ul>

          </div>
        </div>

        <div className="pt-6 border-t border-primary-700 text-center text-sm text-primary-300">
          <p>© {currentYear} Société des Jardins Ouvriers de Villeurbanne (SJOV). Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
