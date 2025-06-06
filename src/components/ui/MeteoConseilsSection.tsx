import React from 'react';
import WeatherWidget from './WeatherWidget';
import { Carrot, Leaf } from 'lucide-react';

const MeteoConseilsSection: React.FC = () => {
  const plantingList = [
    'Tomates',
    'Courgettes',
    'Haricots verts',
    'Salades d’été',
  ];

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
              Juin est idéal pour les semis d’été. Voici ce que vous pouvez planter :
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
