// constants/annonceTypes.tsx


export const annonceTypeMap: Record<string, {
  label: string;
  icon: string;
  color: string;
}> = {
  vend: {
    label: 'VENTE',
    icon: '💰',
    color: 'text-yellow-600'
  },
  donne: {
    label: 'DON',
    icon: '🎁',
    color: 'text-pink-600'
  },
  recherche: {
    label: 'RECHERCHE',
    icon: '🔍',
    color: 'text-blue-600'
  },
  échange: {
    label: 'ÉCHANGE',
    icon: '♻️',
    color: 'text-green-600'
  }
};

export const renderAnnonceType = (type: string) => {
  const entry = annonceTypeMap[type];
  if (!entry) return type?.toUpperCase();
  return (
    <span className={`inline-flex items-center gap-1 font-semibold ${entry.color}`}>
      <span>{entry.icon}</span>
      <span>{entry.label}</span>
    </span>
  );
};
