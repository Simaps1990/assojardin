import React from 'react';
import WeatherWidget from './WeatherWidget';
import { Carrot, Leaf } from 'lucide-react';

const MONTHLY_PLANTING: Record<string, string[]> = {
  Janvier: ['Betterave', 'Carotte', 'Poireau', 'Chou-fleur', 'Navet', 'Mâche'],
  Février: ['Céleri', 'Brocoli', 'Oignon', 'Chou', 'Épinard', 'Endive'],
  Mars: ['Asperge', 'Laitue', 'Radis', 'Chou-fleur', 'Carotte', 'Poireau'],
  Avril: ['Blette', 'Épinard', 'Petit pois', 'Navet', 'Oignon', 'Laitue'],
  Mai: ['Tomate', 'Courgette', 'Aubergine', 'Concombre', 'Fève', 'Carotte'],
  Juin: ['Poivron', 'Haricot vert', 'Laitue', 'Épinard', 'Courgette', 'Artichaut'],
  Juillet: ['Maïs', 'Navet', 'Oignon', 'Radis', 'Blette', 'Haricot vert'],
  Août: ['Brocoli', 'Concombre', 'Chou', 'Poivron', 'Courgette', 'Laitue'],
  Septembre: ['Chou-fleur', 'Poireau', 'Carotte', 'Épinard', 'Betterave', 'Céleri'],
  Octobre: ['Chou', 'Radis', 'Blette', 'Céleri', 'Mâche', 'Navet'],
  Novembre: ['Endive', 'Rutabaga', 'Salsifi', 'Poireau', 'Carotte', 'Oignon'],
  Décembre: ['Chou', 'Courge', 'Mâche', 'Carotte', 'Poireau', 'Navet']
};

const MeteoConseilsSection: React.FC = () => {
  const currentMonth = new Date().toLocaleString('fr-FR', { month: 'long' });
  const plantingList = MONTHLY_PLANTING[currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1)] || [];

  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-8">

          {/* Ce mois-ci on plante */}
          <div className="card p-6 shadow-md rounded-2xl bg-green-50">
            <div className="flex items-center mb-4">
              <Carrot className="text-green-600 mr-2" />
              <h2 className="text-xl font-bold">Ce mois-ci on plante</h2>
            </div>
            <p className="mb-4 text-sm text-neutral-600">
              {currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1)} est idéal pour ces plantations :
            </p>
            <ul className="list-disc list-inside text-sm text-neutral-700 space-y-1">
              {plantingList.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Météo actuelle */}
          <div className="card p-6 shadow-md rounded-2xl bg-blue-50">
            <div className="flex items-center mb-4">
              <Leaf className="text-sky-500 mr-2" />
              <h2 className="text-xl font-bold">Météo actuelle</h2>
            </div>
            <WeatherWidget />
          </div>

        </div>
      </div>
    </section>
  );
};

export default MeteoConseilsSection;
