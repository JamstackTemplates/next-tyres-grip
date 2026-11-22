import type { CategoryId } from './brands.ts';

export interface TyreRange {
  id: string;
  brandId: string;
  name: string;
  category: CategoryId;
  sizes: string[];
  /** AUD per tyre, fitted and balanced, including GST. */
  priceFrom: number;
  warrantyKm: number;
  wetGrip: 1 | 2 | 3 | 4 | 5;
  noiseDb: number;
  inStock: boolean;
  featured: boolean;
}

export const tyreRanges: TyreRange[] = [
  { id: 'kestrel-aquastrada', brandId: 'kestrel', name: 'AquaStrada', category: 'touring', sizes: ['205/55 R16', '215/60 R16', '225/45 R17'], priceFrom: 229, warrantyKm: 70000, wetGrip: 5, noiseDb: 69, inStock: true, featured: true },
  { id: 'kestrel-velox-3', brandId: 'kestrel', name: 'Velox 3', category: 'performance', sizes: ['225/40 R18', '245/40 R18', '255/35 R19'], priceFrom: 319, warrantyKm: 40000, wetGrip: 5, noiseDb: 71, inStock: true, featured: false },
  { id: 'halden-silentdrive', brandId: 'halden', name: 'SilentDrive', category: 'ev', sizes: ['215/55 R17', '235/45 R18', '255/45 R19'], priceFrom: 289, warrantyKm: 60000, wetGrip: 4, noiseDb: 67, inStock: true, featured: true },
  { id: 'halden-cityline', brandId: 'halden', name: 'CityLine', category: 'touring', sizes: ['175/65 R14', '185/65 R15', '195/65 R15'], priceFrom: 159, warrantyKm: 70000, wetGrip: 4, noiseDb: 68, inStock: true, featured: false },
  { id: 'orbitra-corsa-r', brandId: 'orbitra', name: 'Corsa R', category: 'performance', sizes: ['235/35 R19', '245/35 R19', '265/35 R18'], priceFrom: 389, warrantyKm: 30000, wetGrip: 5, noiseDb: 72, inStock: false, featured: false },
  { id: 'ridgeback-trailmaster-at', brandId: 'ridgeback', name: 'Trailmaster A/T', category: 'suv-4x4', sizes: ['245/70 R16', '265/65 R17', '265/60 R18'], priceFrom: 279, warrantyKm: 80000, wetGrip: 3, noiseDb: 73, inStock: true, featured: true },
  { id: 'ridgeback-workhorse-lt', brandId: 'ridgeback', name: 'Workhorse LT', category: 'light-truck', sizes: ['195 R14C', '215/70 R15C', '235/65 R16C'], priceFrom: 239, warrantyKm: 90000, wetGrip: 3, noiseDb: 72, inStock: true, featured: false },
  { id: 'meridian-longhaul', brandId: 'meridian', name: 'LongHaul', category: 'touring', sizes: ['195/65 R15', '205/55 R16', '215/55 R17'], priceFrom: 179, warrantyKm: 90000, wetGrip: 4, noiseDb: 69, inStock: true, featured: false },
  { id: 'meridian-terra-hp', brandId: 'meridian', name: 'Terra HP', category: 'suv-4x4', sizes: ['225/65 R17', '235/55 R18', '255/55 R19'], priceFrom: 239, warrantyKm: 70000, wetGrip: 4, noiseDb: 70, inStock: true, featured: false },
  { id: 'tarmaco-daily', brandId: 'tarmaco', name: 'Daily', category: 'touring', sizes: ['175/65 R14', '185/60 R15', '195/65 R15'], priceFrom: 139, warrantyKm: 50000, wetGrip: 3, noiseDb: 70, inStock: true, featured: false },
  { id: 'tarmaco-cargo', brandId: 'tarmaco', name: 'Cargo', category: 'light-truck', sizes: ['195 R14C', '205/65 R16C', '215/65 R16C'], priceFrom: 169, warrantyKm: 60000, wetGrip: 3, noiseDb: 72, inStock: false, featured: false },
];

export function fittedPriceFrom(ranges: readonly TyreRange[] = tyreRanges): number | undefined {
  const prices = ranges.filter(range => range.inStock).map(range => range.priceFrom);
  return prices.length ? Math.min(...prices) : undefined;
}
