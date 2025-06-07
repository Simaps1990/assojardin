import React from 'react';
import WeatherWidget from './WeatherWidget';
import { Carrot, Leaf, ExternalLink } from 'lucide-react';

const MONTHLY_PLANTING: Record<string, { name: string; link?: string }[]> = {
  Janvier: [
    { name: 'Betterave', link: 'https://youtu.be/VZpcjA9RQFw?si=bv8y35F2dIkMZGTu' },
    { name: 'Carotte', link: 'https://youtu.be/-a5_mTCV8O8?si=o2DFJcAZxZ58FgVX' },
    { name: 'Poireau', link: 'https://youtu.be/uPe-by7x5us?si=KVV9lwNhCgWWyEvt' },
    { name: 'Chou-fleur', link: 'https://youtu.be/q_FyPyqITxQ?si=pznmUhDO71AW93EX' },
    { name: 'Navet', link: 'https://youtu.be/HSpvVSEqh4k?si=kanblhW0tu-dhLVP' }
  ],
  Février: [
    { name: 'Céleri', link: 'https://youtu.be/ZRh9NHKBjOc?si=smbDcunaw_gdFPFx' },
    { name: 'Chou', link: 'https://youtu.be/wClY4CN2OY4?si=nuRhs55ssy1SsaiV' },
    { name: 'Oignon', link: 'https://youtu.be/SQQ5JBgAgik?si=OzMAbNh5jgGyysTp' },
    { name: 'Épinard', link: 'https://youtu.be/g1QH_jb-yTU?si=SKHi-OQ3fVcZjhdb' },
    { name: 'Laitue', link: 'https://youtu.be/QeZ9u1d4Snw?si=RCoCsaVIugss_t0v' }
  ],
  Mars: [
    { name: 'Asperge', link: 'https://youtu.be/FyTAOI6atiI?si=iIBJUGgOFW27NMpH' },
    { name: 'Laitue', link: 'https://youtu.be/QeZ9u1d4Snw?si=RCoCsaVIugss_t0v' },
    { name: 'Radis', link: 'https://youtu.be/4sF422O9cvw?si=ygLyhnocgYC4gvKG' },
    { name: 'Chou-fleur', link: 'https://youtu.be/q_FyPyqITxQ?si=pznmUhDO71AW93EX' },
    { name: 'Carotte', link: 'https://youtu.be/-a5_mTCV8O8?si=o2DFJcAZxZ58FgVX' },
    { name: 'Poireau', link: 'https://youtu.be/uPe-by7x5us?si=KVV9lwNhCgWWyEvt' }
  ],
  Avril: [
    { name: 'Petit pois', link: 'https://youtu.be/l7bSOZl8G0o?si=u-0XXHIV9kTBV_gO' },
    { name: 'Navet', link: 'https://youtu.be/HSpvVSEqh4k?si=kanblhW0tu-dhLVP' },
    { name: 'Épinard', link: 'https://youtu.be/g1QH_jb-yTU?si=SKHi-OQ3fVcZjhdb' },
    { name: 'Oignon', link: 'https://youtu.be/SQQ5JBgAgik?si=OzMAbNh5jgGyysTp' },
    { name: 'Laitue', link: 'https://youtu.be/QeZ9u1d4Snw?si=RCoCsaVIugss_t0v' },
    { name: 'Radis', link: 'https://youtu.be/4sF422O9cvw?si=ygLyhnocgYC4gvKG' }
  ],
  Mai: [
    { name: 'Tomate', link: 'https://youtu.be/_MOMnBl5uwE?si=qbNksKthCdJL299m' },
    { name: 'Courgette', link: 'https://youtu.be/MuFOH6Rtm1Y?si=xHTZldazuoMmBYZe' },
    { name: 'Aubergine', link: 'https://youtu.be/QPpNSeOnuro?si=7i77LWvANq8S8Iob' },
    { name: 'Concombre', link: 'https://youtu.be/6kiJw_hwb4I?si=og68csELOp425KZ0' },
    { name: 'Fève', link: 'https://youtu.be/1MAdGyuFao8?si=dHP2ar-6FjZjOPlb' },
    { name: 'Carotte', link: 'https://youtu.be/-a5_mTCV8O8?si=o2DFJcAZxZ58FgVX' }
  ],
  Juin: [
    { name: 'Poivron', link: 'https://youtu.be/1vJ0TlTEsHY?si=9bNjTBQIdTHJc8Zj' },
    { name: 'Haricot vert', link: 'https://youtu.be/uGSYtNrpUic?si=DxgsvOvpuL-iFtCG' },
    { name: 'Laitue', link: 'https://youtu.be/QeZ9u1d4Snw?si=RCoCsaVIugss_t0v' },
    { name: 'Épinard', link: 'https://youtu.be/g1QH_jb-yTU?si=SKHi-OQ3fVcZjhdb' },
    { name: 'Courgette', link: 'https://youtu.be/MuFOH6Rtm1Y?si=xHTZldazuoMmBYZe' },
    { name: 'Artichaut', link: 'https://youtu.be/0q3UY_CMR-w?si=YOFU6CFXTx2mdMM7' }
  ]
  // Ajoute les autres mois ici selon le même format
};

const MeteoConseilsSection: React.FC = () => {
  const currentMonth = new Date().toLocaleString('fr-FR', { month: 'long' });
  const monthKey = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);
  const plantingList = MONTHLY_PLANTING[monthKey] || [];

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
              {monthKey} est idéal pour ces plantations :
            </p>
            <ul className="list-disc list-inside text-sm text-neutral-700 space-y-1">
              {plantingList.map((item, idx) => (
                <li key={idx}>
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-700 hover:underline flex items-center gap-1"
                    >
                      {item.name} <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    item.name
                  )}
                </li>
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
