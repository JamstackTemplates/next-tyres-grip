import { brands, categories, type CategoryId } from '../content/brands';
import type { TyreRange } from '../content/tyres';
import { RackTyre } from './workshop-art';

export function BrandStrip() {
  return <ul className="brand-strip rubber" aria-label="Tyre brands" tabIndex={0}>
    {brands.map(brand => <li key={brand.id}>
      <span className="brand-moulding">{brand.name}</span>
      <span className="brand-meta">{brand.origin} · {brand.tier}</span>
    </li>)}
  </ul>;
}

function TyreTag({ tyre }: { tyre: TyreRange }) {
  const brand = brands.find(item => item.id === tyre.brandId);
  return <li id={tyre.id} className="min-w-0">
    <div className="rack-tyre"><RackTyre /><span className="tag-wire" aria-hidden="true" /></div>
    <article className="swing-tag flex h-auto flex-col border-b-4 border-b-[#93856b]">
      <p className="spec mb-1 font-bold uppercase text-[#8b1826]">{brand?.name}</p>
      <h3 className="text-[clamp(.875rem,2vw,1.2rem)]">{tyre.name}</h3>
      <p className="mt-2 font-mono text-[.73rem]">{tyre.sizes.join(' · ')}</p>
      <p className="mt-3 flex flex-wrap items-baseline gap-1 font-mono text-xs">from <strong className="text-xl">${tyre.priceFrom}</strong></p>
      <div className="mt-2 flex flex-wrap items-center gap-2 text-sm" aria-label={`Wet grip ${tyre.wetGrip} out of 5`}>
        <span>Wet grip</span><span className="grip-dots" aria-hidden="true">{Array.from({ length: 5 }, (_, i) => <i key={i} className={i < tyre.wetGrip ? 'filled' : ''} />)}</span>
      </div>
      <p className="mt-2 text-sm">{tyre.warrantyKm.toLocaleString('en-AU')} km warranty · {tyre.noiseDb} dB</p>
      <p className="mt-2 text-sm font-bold"><span className={tyre.inStock ? '' : 'tag-stock'}>{tyre.inStock ? 'In stock' : 'Order in, 2–3 days'}</span></p>
    </article>
  </li>;
}

export function TyreRack({ tyres }: { tyres: readonly TyreRange[] }) {
  return <ul className="rack-row grid grid-cols-2 gap-x-2 gap-y-5 sm:grid-cols-3 md:gap-x-5">
    {tyres.map(tyre => <TyreTag key={tyre.id} tyre={tyre} />)}
  </ul>;
}

export function TyreRackGroup({ category, tyres }: { category: CategoryId; tyres: readonly TyreRange[] }) {
  return <section aria-labelledby={`rack-${category}`} className="border-t border-line pt-5">
    <h3 id={`rack-${category}`} className="mb-4 text-xl">{categories[category]}</h3>
    <TyreRack tyres={tyres} />
  </section>;
}
