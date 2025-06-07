import React from 'react';
import WeatherWidget from './WeatherWidget';
import { Carrot, Leaf } from 'lucide-react';

const MONTHLY_PLANTING: Record<string, { name: string }[]> = {
  Janvier: [
    { name: 'Betterave' },
    { name: 'Carotte' },
    { name: 'Poireau' },
    { name: 'Chou-fleur' },
    { name: 'Navet' }
  ],
  Février: [
    { name: 'Céleri' },
    { name: 'Chou' },
    { name: 'Oignon' },
    { name: 'Épinard' },
    { name: 'Laitue' }
  ],
  Mars: [
    { name: 'Asperge' },
    { name: 'Laitue' },
    { name: 'Radis' },
    { name: 'Chou-fleur' },
    { name: 'Carotte' },
    { name: 'Poireau' }
  ],
  Avril: [
    { name: 'Petit pois' },
    { name: 'Navet' },
    { name: 'Épinard' },
    { name: 'Oignon' },
    { name: 'Laitue' },
    { name: 'Radis' }
  ],
  Mai: [
    { name: 'Tomate' },
    { name: 'Courgette' },
    { name: 'Aubergine' },
    { name: 'Concombre' },
    { name: 'Fève' },
    { name: 'Carotte' }
  ],
  Juin: [
    { name: 'Poivron' },
    { name: 'Haricot vert' },
    { name: 'Laitue' },
    { name: 'Épinard' },
    { name: 'Courgette' },
    { name: 'Artichaut' }
  ],
  Juillet: [
    { name: 'Maïs' },
    { name: 'Navet' },
    { name: 'Oignon' },
    { name: 'Radis' },
    { name: 'Blette' },
    { name: 'Haricot vert' }
  ],
  Août: [
    { name: 'Chou' },
    { name: 'Poireau' },
    { name: 'Concombre' },
    { name: 'Courgette' },
    { name: 'Tomate' },
    { name: 'Laitue' }
  ],
  Septembre: [
    { name: 'Chou-fleur' },
    { name: 'Navet' },
    { name: 'Radis' },
    { name: 'Carotte' },
    { name: 'Épinard' },
    { name: 'Céleri' }
  ],
  Octobre: [
    { name: 'Chou' },
    { name: 'Poireau' },
    { name: 'Carotte' },
    { name: 'Mâche' },
    { name: 'Oignon' },
    { name: 'Courge' }
  ],
  Novembre: [
    { name: 'Fève' },
    { name: 'Pois' },
    { name: 'Ail' },
    { name: 'Oignon' },
    { name: 'Échalote' },
    { name: 'Laitue' }
  ],
  Décembre: [
    { name: 'Ail' },
    { name: 'Échalote' },
    { name: 'Oignon blanc' },
    { name: 'Repos du jardin' },
    { name: 'Préparer le sol' },
    { name: 'Paillage' }
  ]
};

const MeteoConseilsSection: React.FC = () => {
  const currentMonth = new Date().toLocaleString('fr-FR', { month: 'long' });
  const monthKey = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);
  const plantingList = MONTHLY_PLANTING[monthKey] || [];

  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-8">

          {/* Bloc plantation */}
          <div className="card p-6 shadow-md rounded-2xl bg-green-50">
            <div className="flex items-center mb-4">
              <Carrot className="text-green-600 mr-2" />
              <h2 className="text-xl font-bold">Ce mois-ci on plante</h2>
            </div>
            <p className="mb-4 text-sm text-neutral-600">
              {monthKey} est idéal pour ces plantations :
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 text-sm text-neutral-700 list-disc list-inside">
              {plantingList.map((item, idx) => (
                <li key={idx}>{item.name}</li>
              ))}
            </ul>
          </div>

          {/* Bloc météo */}
          <div className="card p-6 shadow-md rounded-2xl bg-blue-50">
            <WeatherWidget
              renderTips={({ weatherCode, temperature, city, icon }) => {
                let conseilMeteo = '';
                let conseilTemp = '';
                let conseilHumidite = '';

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

                if ([0, 1, 2, 3].includes(weatherCode)) conseilHumidite = 'le sol peut être sec, surveillez l’humidité.';
                else if ([51, 53, 61, 63].includes(weatherCode)) conseilHumidite = 'l’humidité est suffisante pour les semis.';
                else if ([95, 96, 99].includes(weatherCode)) conseilHumidite = 'évitez tout travail du sol, trop détrempé.';
                else conseilHumidite = 'vérifiez le sol avant de travailler.';

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
                      <li>Avec une température extérieure de <strong>{temperature}°C</strong>, {conseilTemp}</li>
                      <li>En ce moment, {conseilHumidite}</li>
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
