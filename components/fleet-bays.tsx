import { fleetTiers, vehicleRange } from '../content/fleet';
import { VanSilhouette } from './workshop-art';

export function FleetBays({ compact = false }: { compact?: boolean }) {
  return <ul className={`grid ${compact ? 'grid-cols-3 gap-1.5 sm:gap-3' : 'gap-3 md:grid-cols-3'}`}>
    {fleetTiers.map((tier, index) => <li key={tier.id} className={`bay-door ${compact ? 'px-1.5 py-3 sm:p-4' : 'p-5 sm:p-7'}`}>
      <div className={`flex ${compact ? 'flex-col items-start gap-2' : 'items-center justify-between gap-3'}`}>
        {!compact && <p className="font-display text-4xl text-chalk" aria-label={`Bay ${index + 1}`}>0{index + 1}</p>}
        <VanSilhouette />
      </div>
      <h3 className={`mt-2 ${compact ? 'text-[clamp(.7rem,1.5vw,.95rem)]' : 'text-2xl'}`}>{tier.name}</h3>
      <p className={`font-mono ${compact ? 'mt-1 text-[.7rem] sm:text-xs' : 'mt-2 text-sm'}`}>{vehicleRange(tier.vehicles)} vehicles</p>
      {!compact && <>
        <p className="spec mt-4 inline-block bg-[#17191b] px-2 py-1 text-chalk">{tier.checkInterval}</p>
        <ul className="mt-4 grid gap-2">{tier.inclusions.map(item => <li className="border-t border-white/20 pt-2" key={item}>{item}</li>)}</ul>
      </>}
    </li>)}
  </ul>;
}
