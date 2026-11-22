export const categories = {
  touring: 'Touring',
  performance: 'Performance',
  'suv-4x4': 'SUV & 4x4',
  'light-truck': 'Light truck',
  ev: 'EV',
} as const;

export type CategoryId = keyof typeof categories;

export interface Brand {
  id: string;
  name: string;
  origin: string;
  tier: 'premium' | 'mid' | 'value';
  categories: CategoryId[];
  note: string;
}

export const brands: Brand[] = [
  { id: 'kestrel', name: 'Kestrel', origin: 'Germany', tier: 'premium', categories: ['touring', 'performance'], note: 'Wet-braking specialists' },
  { id: 'halden', name: 'Halden', origin: 'Japan', tier: 'premium', categories: ['touring', 'ev'], note: 'Quiet touring and EV compounds' },
  { id: 'orbitra', name: 'Orbitra', origin: 'Italy', tier: 'premium', categories: ['performance'], note: 'Track-bred performance' },
  { id: 'ridgeback', name: 'Ridgeback', origin: 'Australia', tier: 'mid', categories: ['suv-4x4', 'light-truck'], note: 'All-terrain and light truck' },
  { id: 'meridian', name: 'Meridian', origin: 'South Korea', tier: 'mid', categories: ['touring', 'suv-4x4'], note: 'Long-wear touring' },
  { id: 'tarmaco', name: 'Tarmaco', origin: 'Thailand', tier: 'value', categories: ['touring', 'light-truck'], note: 'Honest everyday value' },
];
