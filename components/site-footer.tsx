import { business, emailHref, phoneHref } from '../content/business';
import { HoursTable, Wordmark, WorkshopAddress } from './workshop';
import { Sidewall, TreadBand } from './workshop-art';

export function SiteFooter() {
  return <footer className="rubber relative overflow-hidden">
    <TreadBand className="tread-motion" />
    <div className="page-head-art" aria-hidden="true"><Sidewall /></div>
    <div className="wrap relative grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-[.85fr_1fr_1fr] lg:items-start lg:gap-9 lg:py-14">
      <div><Wordmark /><p className="mt-4 text-sm text-[#c4c5be]">Independent tyre &amp; wheel workshop</p></div>
      <div className="grid content-start gap-2 text-sm">
        <WorkshopAddress />
        <a href={phoneHref}>{business.phone}</a>
        <a className="wrap-anywhere underline" href={emailHref}>{business.email}</a>
      </div>
      <div><p className="eyebrow mb-1">Workshop hours</p><HoursTable hours={business.hours} compact /></div>
      <p className="border-t border-white/20 pt-4 text-sm text-[#c4c5be] sm:col-span-2 lg:col-span-3">© {business.name} · Jamstacks gallery demo</p>
    </div>
  </footer>;
}
