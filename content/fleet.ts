export interface FleetTier {
  id: string;
  name: string;
  /** Inclusive vehicle count. A null maximum means open-ended. */
  vehicles: { min: number; max: number | null };
  checkInterval: string;
  inclusions: string[];
}

export const fleetTiers: FleetTier[] = [
  { id: 'courier', name: 'Courier', vehicles: { min: 1, max: 9 }, checkInterval: 'Monthly checks', inclusions: ['Pressure and tread log', 'Priority puncture slots', 'Fitted-price tyres'] },
  { id: 'trade', name: 'Trade', vehicles: { min: 10, max: 39 }, checkInterval: 'Fortnightly checks', inclusions: ['Everything in Courier', 'On-site checks at your yard', 'Monthly statement', 'Alignment flags'] },
  { id: 'depot', name: 'Depot', vehicles: { min: 40, max: null }, checkInterval: 'Weekly checks', inclusions: ['Everything in Trade', 'Named account manager', 'Casing and retread report', 'After-hours drop-off key safe'] },
];

export function vehicleRange({ min, max }: FleetTier['vehicles']): string {
  return max === null ? `${min}+` : `${min}–${max}`;
}
