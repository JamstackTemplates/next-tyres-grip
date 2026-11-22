import { wheels } from '../content/wheels';
import { WheelFace } from './workshop-art';

export function WheelWall() {
  return <div className="wheel-wall rubber border-y-4 border-accent py-8 md:py-12">
    <ul className="wrap grid grid-cols-2 gap-x-2 gap-y-6 sm:gap-x-6 md:grid-cols-3 md:gap-y-10">
      {wheels.map(wheel => <li key={wheel.id} className="grid min-w-0 justify-items-center even:pt-4 md:even:pt-9">
        <WheelFace spokes={wheel.spokes} finish={wheel.finish} lugs={Number(wheel.pcd.split('x')[0])} />
        <article className="wheel-plate mt-3 w-full p-2.5 sm:p-4">
          <h3 className="text-[clamp(.85rem,2.1vw,1.25rem)]">{wheel.name}</h3>
          <p className="mt-1 text-sm capitalize text-[#dbdcd5]">{wheel.material} · {wheel.finish}</p>
          <dl className="mt-3 grid grid-cols-[1fr_auto] gap-x-1 border-t border-white/25 pt-2 font-mono text-[.68rem] sm:text-xs">
            <dt>Dia.</dt><dd className="text-right">{wheel.diameters.join(' / ')}″</dd>
            <dt>Width</dt><dd className="text-right">{wheel.widthIn}″</dd>
            <dt>PCD</dt><dd className="text-right">{wheel.pcd}</dd>
            <dt>Offset</dt><dd className="text-right">{wheel.offsetMm} mm</dd>
          </dl>
          <p className="mt-3 font-mono text-xs">from <strong className="text-lg">${wheel.priceFrom}</strong></p>
          <p className="mt-1 text-sm">{wheel.inStock ? 'In stock' : 'Ask about lead time'}</p>
        </article>
      </li>)}
    </ul>
  </div>;
}
