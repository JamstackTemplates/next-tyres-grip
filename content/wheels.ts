export interface Wheel {
  id: string;
  name: string;
  material: 'alloy' | 'steel';
  finish: string;
  diameters: number[];
  widthIn: number;
  pcd: string;
  offsetMm: number;
  spokes: number;
  /** AUD per wheel, including GST. */
  priceFrom: number;
  inStock: boolean;
}

export const wheels: Wheel[] = [
  { id: 'apex-5', name: 'Apex 5', material: 'alloy', finish: 'gloss black', diameters: [17, 18], widthIn: 7.5, pcd: '5x114.3', offsetMm: 40, spokes: 5, priceFrom: 289, inStock: true },
  { id: 'strada-10', name: 'Strada 10', material: 'alloy', finish: 'machined silver', diameters: [16, 17], widthIn: 7, pcd: '5x100', offsetMm: 45, spokes: 10, priceFrom: 249, inStock: true },
  { id: 'mesh-r', name: 'Mesh R', material: 'alloy', finish: 'gunmetal', diameters: [18, 19], widthIn: 8.5, pcd: '5x112', offsetMm: 42, spokes: 20, priceFrom: 379, inStock: true },
  { id: 'outback-6', name: 'Outback 6', material: 'alloy', finish: 'satin bronze', diameters: [17, 18], widthIn: 8, pcd: '6x139.7', offsetMm: 25, spokes: 6, priceFrom: 329, inStock: false },
  { id: 'tradie-steel', name: 'Tradie Steel', material: 'steel', finish: 'black powdercoat', diameters: [15, 16], widthIn: 6, pcd: '5x114.3', offsetMm: 35, spokes: 0, priceFrom: 119, inStock: true },
  { id: 'classic-8', name: 'Classic 8', material: 'alloy', finish: 'hyper silver', diameters: [15, 16], widthIn: 6.5, pcd: '4x100', offsetMm: 38, spokes: 8, priceFrom: 209, inStock: true },
];
