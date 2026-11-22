import { SiteLink } from '../components/site-link';
import { FlatTyre, TreadBand } from '../components/workshop-art';

export default function NotFound() {
  return <section className="rubber flex min-h-[60vh] flex-col text-center">
    <div className="wrap grid flex-1 content-center justify-items-center py-9 md:py-14">
      <FlatTyre />
      <h1 className="mt-5 max-w-[20ch] text-[clamp(1.75rem,5.1vw,4rem)]">Flat tyre. This page has lost pressure.</h1>
      <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-3">
        <SiteLink className="font-bold text-chalk underline" href="/"><span aria-hidden="true">↗ </span>Home</SiteLink>
        <SiteLink className="font-bold text-chalk underline" href="/tyres/"><span aria-hidden="true">↗ </span>Tyres</SiteLink>
        <SiteLink className="font-bold text-chalk underline" href="/contact/"><span aria-hidden="true">↗ </span>Contact</SiteLink>
      </div>
    </div>
    <TreadBand variant="worn" />
  </section>;
}
