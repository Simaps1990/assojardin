import React from 'react';
import WeatherWidget from './WeatherWidget';
import { Carrot, Leaf } from 'lucide-react';
const getTempColor = (t: number) => {
  if (t <= 10) return 'text-blue-600';
  if (t <= 20) return 'text-green-600';
  if (t <= 27) return 'text-yellow-600';
  return 'text-red-600';
};

const getAirQualityColor = (qual: string) => {
  if (qual.includes('Bonne')) return 'text-green-600';
  if (qual.includes('Modérée')) return 'text-yellow-600';
  if (qual.includes('Mauvaise pour les personnes sensibles')) return 'text-orange-500';
  if (qual.includes('Mauvaise')) return 'text-orange-600';
  if (qual.includes('Très mauvaise')) return 'text-red-500';
  if (qual.includes('Dangereuse')) return 'text-red-700';
  return 'text-neutral-500';
};

const getAllergyColor = (entry: string) => {
  const match = entry.match(/\((\d+)/);
  const value = match ? parseInt(match[1]) : 0;
  if (value <= 80) return 'text-yellow-600';
  if (value <= 200) return 'text-orange-600';
  return 'text-red-600';
};

const MONTHLY_PLANTING: Record<string, { name: string; link?: string }[]> = {
  Janvier: [
    { name: 'Betterave', link: 'https://youtu.be/VZpcjA9RQFw' },
    { name: 'Carotte', link: 'https://youtu.be/-a5_mTCV8O8' },
    { name: 'Poireau', link: 'https://youtu.be/uPe-by7x5us' },
    { name: 'Chou-fleur', link: 'https://youtu.be/q_FyPyqITxQ' },
    { name: 'Navet', link: 'https://youtu.be/HSpvVSEqh4k' }
  ],
  Février: [
    { name: 'Céleri', link: 'https://youtu.be/ZRh9NHKBjOc' },
    { name: 'Chou', link: 'https://youtu.be/wClY4CN2OY4' },
    { name: 'Oignon', link: 'https://youtu.be/SQQ5JBgAgik' },
    { name: 'Épinard', link: 'https://youtu.be/g1QH_jb-yTU' },
    { name: 'Laitue', link: 'https://youtu.be/QeZ9u1d4Snw' }
  ],
  Mars: [
    { name: 'Asperge', link: 'https://youtu.be/FyTAOI6atiI' },
    { name: 'Laitue', link: 'https://youtu.be/QeZ9u1d4Snw' },
    { name: 'Radis', link: 'https://youtu.be/4sF422O9cvw' },
    { name: 'Chou-fleur', link: 'https://youtu.be/q_FyPyqITxQ' },
    { name: 'Carotte', link: 'https://youtu.be/-a5_mTCV8O8' },
    { name: 'Poireau', link: 'https://youtu.be/uPe-by7x5us' }
  ],
  Avril: [
    { name: 'Petit pois', link: 'https://youtu.be/l7bSOZl8G0o' },
    { name: 'Navet', link: 'https://youtu.be/HSpvVSEqh4k' },
    { name: 'Épinard', link: 'https://youtu.be/g1QH_jb-yTU' },
    { name: 'Oignon', link: 'https://youtu.be/SQQ5JBgAgik' },
    { name: 'Laitue', link: 'https://youtu.be/QeZ9u1d4Snw' },
    { name: 'Radis', link: 'https://youtu.be/4sF422O9cvw' }
  ],
  Mai: [
    { name: 'Tomate', link: 'https://youtu.be/_MOMnBl5uwE' },
    { name: 'Courgette', link: 'https://youtu.be/MuFOH6Rtm1Y' },
    { name: 'Aubergine', link: 'https://youtu.be/QPpNSeOnuro' },
    { name: 'Concombre', link: 'https://youtu.be/6kiJw_hwb4I' },
    { name: 'Fève', link: 'https://youtu.be/1MAdGyuFao8' },
    { name: 'Carotte', link: 'https://youtu.be/-a5_mTCV8O8' }
  ],
  Juin: [
    { name: 'Poivron', link: 'https://youtu.be/1vJ0TlTEsHY' },
    { name: 'Haricot vert', link: 'https://youtu.be/uGSYtNrpUic' },
    { name: 'Laitue', link: 'https://youtu.be/QeZ9u1d4Snw' },
    { name: 'Épinard', link: 'https://youtu.be/g1QH_jb-yTU' },
    { name: 'Courgette', link: 'https://youtu.be/MuFOH6Rtm1Y' },
    { name: 'Artichaut', link: 'https://youtu.be/0q3UY_CMR-w' }
  ],
  Juillet: [
    { name: 'Maïs', link: 'https://youtu.be/maïs' },
    { name: 'Navet', link: 'https://youtu.be/navet' },
    { name: 'Oignon', link: 'https://youtu.be/oignon' },
    { name: 'Radis', link: 'https://youtu.be/radis' },
    { name: 'Blette', link: 'https://youtu.be/blette' },
    { name: 'Haricot vert', link: 'https://youtu.be/haricotvert' }
  ],
  Août: [
    { name: 'Chou', link: 'https://youtu.be/chou' },
    { name: 'Poireau', link: 'https://youtu.be/poireau' },
    { name: 'Concombre', link: 'https://youtu.be/concombre' },
    { name: 'Courgette', link: 'https://youtu.be/courgette' },
    { name: 'Tomate', link: 'https://youtu.be/tomate' },
    { name: 'Laitue', link: 'https://youtu.be/laitue' }
  ],
  Septembre: [
    { name: 'Chou-fleur', link: 'https://youtu.be/choufleur' },
    { name: 'Navet', link: 'https://youtu.be/navet' },
    { name: 'Radis', link: 'https://youtu.be/radis' },
    { name: 'Carotte', link: 'https://youtu.be/carotte' },
    { name: 'Épinard', link: 'https://youtu.be/epinard' },
    { name: 'Céleri', link: 'https://youtu.be/celeri' }
  ],
  Octobre: [
    { name: 'Chou', link: 'https://youtu.be/chou' },
    { name: 'Poireau', link: 'https://youtu.be/poireau' },
    { name: 'Carotte', link: 'https://youtu.be/carotte' },
    { name: 'Mâche', link: 'https://youtu.be/mache' },
    { name: 'Oignon', link: 'https://youtu.be/oignon' },
    { name: 'Courge', link: 'https://youtu.be/courge' }
  ],
  Novembre: [
    { name: 'Fève', link: 'https://youtu.be/feve' },
    { name: 'Pois', link: 'https://youtu.be/pois' },
    { name: 'Ail', link: 'https://youtu.be/ail' },
    { name: 'Oignon', link: 'https://youtu.be/oignon' },
    { name: 'Échalote', link: 'https://youtu.be/echalote' },
    { name: 'Laitue', link: 'https://youtu.be/laitue' }
  ],
  Décembre: [
    { name: 'Ail', link: 'https://youtu.be/ail' },
    { name: 'Échalote', link: 'https://youtu.be/echalote' },
    { name: 'Oignon blanc', link: 'https://youtu.be/oignonblanc' },
    { name: 'Repos du jardin', link: 'https://youtu.be/repos' },
    { name: 'Préparer le sol', link: 'https://youtu.be/sol' },
    { name: 'Paillage', link: 'https://youtu.be/paillage' }
  ]
};

const MeteoConseilsSection: React.FC = () => {
  const currentMonth = new Date().toLocaleString('fr-FR', { month: 'long' });
  const monthKey = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);
  const plantingList = MONTHLY_PLANTING[monthKey] || [];

  return (
    <section className="py-12 bg-neutral-50">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-8">

          {/* Plantation */}
          <div className="bg-white p-6 shadow-md rounded-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Carrot className="text-green-600 h-5 w-5" />
              <h2 className="text-xl font-bold leading-tight mb-0">Ce mois-ci on plante</h2>
            </div>
            <p className="mb-4 text-sm text-neutral-600">
              {monthKey} est idéal pour ces plantations :
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 text-sm text-neutral-700 list-disc list-inside">
              {plantingList.map((item, idx) => (
                <li key={idx}>
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-green-700"
                    >
                      {item.name}
                    </a>
                  ) : (
                    item.name
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Météo */}
          <div className="bg-white p-6 shadow-md rounded-2xl">
<WeatherWidget
  renderTips={({ weatherCode, temperature, city, icon, airQuality, allergyRisks }) => {
    let conseilMeteo = '';
    let conseilTemp = '';

    if ([0].includes(weatherCode)) conseilMeteo = 'fait un temps clair : pensez à arroser en soirée.';
    else if ([1, 2, 3].includes(weatherCode)) conseilMeteo = 'fait un temps nuageux : conditions idéales pour semer.';
    else if ([45, 48].includes(weatherCode)) conseilMeteo = 'y a du brouillard : évitez les traitements.';
    else if ([51, 53, 55, 61, 63, 65].includes(weatherCode)) conseilMeteo = 'pleut : ne semez pas aujourd’hui.';
    else if ([71, 73, 75].includes(weatherCode)) conseilMeteo = 'neige : protégez vos plantes.';
    else if ([95, 96, 99].includes(weatherCode)) conseilMeteo = 'y a un orage : rentrez vos outils.';
    else conseilMeteo = 'y a des conditions normales : observez votre sol.';

    if (temperature >= 28) conseilTemp = 'pensez à pailler et arroser tôt le matin.';
    else if (temperature >= 20) conseilTemp = 'arrosez de préférence le matin.';
    else if (temperature <= 10) conseilTemp = 'attention au froid, couvrez les semis.';
    else conseilTemp = 'continuez l’entretien habituel.';

    return (
      <>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Leaf className="text-sky-500 h-5 w-5" />
            <h2 className="text-xl font-bold leading-tight mb-0">Météo actuelle</h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-700">
            <span>{icon}</span>
            <span className="font-medium">{temperature}°C</span>
            <span className="mx-1 text-neutral-400">|</span>
            <span className="text-green-500">{city}</span>
          </div>
        </div>
        <ul className="list-disc list-inside space-y-1 text-sm text-neutral-800">
          <li>Actuellement il {conseilMeteo}</li>
<li>
  Avec une température extérieure de{' '}
  <strong className={getTempColor(temperature)}>{temperature}°C</strong>, {conseilTemp}
</li>
<li>
  Qualité de l’air :{' '}
  <span className={`font-medium ${getAirQualityColor(airQuality)}`}>
    {airQuality}
  </span>
</li>
{allergyRisks.length > 0 && (
  <li>
    Risques allergiques :{' '}
    {allergyRisks.map((a, i) => (
      <span key={i} className={`font-medium ${getAllergyColor(a)}`}>
        {a}
        {i < allergyRisks.length - 1 && ', '}
      </span>
    ))}
  </li>
)}

        </ul>
      </>
    );
  }}
/>


          </div>

        </div>
      </div>
    </section>
  );
};

export default MeteoConseilsSection;
