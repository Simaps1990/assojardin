// constants/annonceTypes.tsx

import {
  DollarSign,
  Gift,
  Search,
  Repeat
} from 'lucide-react';
import React from 'react';

export const annonceTypeMap: Record<
  string,
  { label: string; icon: JSX.Element; activeColor: string; color: string }
> = {
  vend: {
    label: 'VENTE',
    icon: <DollarSign className="w-4 h-4" />,
    activeColor: 'bg-yellow-500 text-white',
    color: 'text-yellow-500'
  },
  donne: {
    label: 'DON',
    icon: <Gift className="w-4 h-4" />,
    activeColor: 'bg-green-600 text-white',
    color: 'text-green-600'
  },
  recherche: {
    label: 'RECHERCHE',
    icon: <Search className="w-4 h-4" />,
    activeColor: 'bg-sky-500 text-white',
    color: 'text-sky-500'
  },
  échange: {
    label: 'ÉCHANGE',
    icon: <Repeat className="w-4 h-4" />,
    activeColor: 'bg-amber-800 text-white',
    color: 'text-amber-800'
  }
};

export const renderAnnonceType = (
  type: string,
  isActive = false
): JSX.Element | string => {
  const entry = annonceTypeMap[type];
  if (!entry) return type?.toUpperCase();

  const iconColor = isActive ? 'text-white' : entry.color;

  return (
    <span className={`inline-flex items-center gap-1 font-semibold ${isActive ? 'text-white' : 'text-neutral-800'}`}>
      {React.cloneElement(entry.icon, {
        className: `w-4 h-4 ${iconColor}`
      })}
      <span>{entry.label}</span>
    </span>
  );
};