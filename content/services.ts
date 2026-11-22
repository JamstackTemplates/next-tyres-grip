export const serviceCategories = {
  alignment: 'Alignment', wheels: 'Wheel services', repairs: 'Repairs', checks: 'Checks & rotation',
} as const;

export interface Service {
  id: string;
  name: string;
  category: keyof typeof serviceCategories;
  /** Listed AUD price including GST. Zero is a free service. */
  price: number;
  priceUnit: 'job' | 'wheel' | 'tyre';
  minutes: number;
  includes: string[];
}

export const services: Service[] = [
  { id: 'alignment-4wd', name: 'Four-wheel laser alignment', category: 'alignment', price: 119, priceUnit: 'job', minutes: 45, includes: ['Before-and-after printout', 'Steering-wheel centring', 'Road test'] },
  { id: 'alignment-4x4', name: '4x4 and lifted alignment', category: 'alignment', price: 149, priceUnit: 'job', minutes: 60, includes: ['Lift and suspension check', 'Alignment adjustments where available', 'Before-and-after printout'] },
  { id: 'balance', name: 'Wheel balance', category: 'wheels', price: 20, priceUnit: 'wheel', minutes: 10, includes: ['Spin balance', 'Corrective wheel weights'] },
  { id: 'wheel-straighten', name: 'Alloy wheel straightening', category: 'wheels', price: 99, priceUnit: 'wheel', minutes: 60, includes: ['Run-out and damage inspection', 'Straightening where suitable'] },
  { id: 'fit-wheels', name: 'Wheel fitting and torque', category: 'wheels', price: 15, priceUnit: 'wheel', minutes: 10, includes: ['Fitment and clearance check', 'Final torque to specification'] },
  { id: 'puncture', name: 'Puncture plug-and-patch repair', category: 'repairs', price: 39, priceUnit: 'tyre', minutes: 30, includes: ['Internal inspection', 'Plug-and-patch if repairable', 'Leak check'] },
  { id: 'valve-tpms', name: 'TPMS sensor service', category: 'repairs', price: 65, priceUnit: 'wheel', minutes: 20, includes: ['Sensor and valve check', 'Service kit where applicable', 'System relearn'] },
  { id: 'rotation', name: 'Tyre rotation and pressure set', category: 'checks', price: 45, priceUnit: 'job', minutes: 20, includes: ['Vehicle-appropriate rotation', 'Pressure and torque check'] },
  { id: 'safety-check', name: 'Tread and pressure check', category: 'checks', price: 0, priceUnit: 'job', minutes: 10, includes: ['Tread depth measurement', 'Cold pressure check'] },
];

export function servicePrice({ price, priceUnit }: Service): string {
  return price === 0 ? 'Free' : `$${price}${priceUnit === 'job' ? '' : ` / ${priceUnit}`}`;
}

export const standardAlignment = services.find(service => service.id === 'alignment-4wd')!;
