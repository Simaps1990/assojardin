// constants/annonceTypes.tsx

import {
  DollarSign,
  Gift,
  Search,
  Repeat
} from 'lucide-react';

export const annonceTypeMap: Record<
  string,
  { label: string; icon: JSX.Element }
> = {
  vend: {
    label: 'VENTE',
    icon: <DollarSign className="w-4 h-4 text-yellow-500" />
  },
  donne: {
    label: 'DON',
    icon: <Gift className="w-4 h-4 text-green-600" />
  },
  recherche: {
    label: 'RECHERCHE',
    icon: <Search className="w-4 h-4 text-sky-500" />
  },
  échange: {
    label: 'ÉCHANGE',
    icon: <Repeat className="w-4 h-4 text-amber-900" />
  }
};

export const renderAnnonceType = (type: string) => {
  const entry = annonceTypeMap[type];
  if (!entry) return type?.toUpperCase();
  return (
    <span className="inline-flex items-center gap-1 font-semibold text-neutral-800">
      {entry.icon}
      <span>{entry.label}</span>
    </span>
  );
};
