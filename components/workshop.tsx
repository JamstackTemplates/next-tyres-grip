import type { ReactNode } from 'react';
import { business, fullAddress, locality } from '../content/business';
import { hoursGroups, shortDayRange, type OpeningHours } from '../lib/hours';
import { mapDirectionsUrl } from '../lib/maps';
import { SiteLink } from './site-link';
import { OpenBadge } from './open-badge';
import { Icon, Sidewall, TreadBand } from './workshop-art';

export function ChalkRule({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 88 9" className={`chalk-rule ${className}`} aria-hidden="true">
    <path d="M2 5C22 4 53 2 85 3M6 7c23-2 45-3 71-3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>;
}

export function Wordmark() {
  return <SiteLink href="/" className="flex shrink-0 items-center gap-2.5 no-underline hover:no-underline" aria-label={`${business.name} home`}>
    <svg viewBox="0 0 46 46" className="h-10 w-10" aria-hidden="true">
      <circle cx="23" cy="23" r="20" fill="#b81d2c" stroke="#f0707c" strokeWidth="1.5" />
      <circle cx="23" cy="23" r="13.5" fill="none" stroke="#721420" strokeWidth="2" />
      <path d="m12 30 5.5-14h13l-2 5.5h-7l-2 4h5l-2 4.5Z" fill="#fff" />
      <path d="m32 35 3-7 4-1M6 19l4-1 3-7" fill="none" stroke="#f0707c" strokeWidth="1.5" />
    </svg>
    <span className="grid gap-0.5 leading-tight">
      <span className="font-display text-[.95rem] tracking-[-.07em] uppercase sm:text-base">{business.wordmark}</span>
      <span className="font-mono text-[.65rem] font-semibold tracking-[.14em] uppercase text-[#cbc9c0]">{business.descriptor}</span>
    </span>
  </SiteLink>;
}

export function SectionHeading({ children, kicker, id }: { children: ReactNode; kicker?: ReactNode; id?: string }) {
  return <div className="mb-7 md:mb-10">
    {kicker && <p className="eyebrow mb-3 text-accent-ink">{kicker}</p>}
    <h2 id={id} className="section-title">{children}</h2>
  </div>;
}

export function Action({ children, href = '/contact/', quiet = false }: { children: ReactNode; href?: string; quiet?: boolean }) {
  return <SiteLink href={href} className={quiet ? 'button button-quiet' : 'button'}>{children}</SiteLink>;
}

export function QuoteBand({ heading, children }: { heading: ReactNode; children: ReactNode }) {
  return <section className="quote-band rubber relative overflow-hidden">
    <TreadBand variant="indicator" />
    <div className="page-head-art" aria-hidden="true"><Sidewall /></div>
    <div className="wrap relative grid items-center gap-6 py-10 sm:grid-cols-[1fr_auto] md:py-14">
      <h2 className="max-w-[31ch] text-[clamp(1.35rem,3vw,2.25rem)]">{heading}</h2>
      <div>{children}</div>
    </div>
  </section>;
}

function displayTime(value: string) {
  const [hour, minute] = value.split(':').map(Number);
  return `${hour % 12 || 12}${minute ? `:${String(minute).padStart(2, '0')}` : ''} ${hour < 12 ? 'am' : 'pm'}`;
}

export function HoursTable({ hours, compact = false }: { hours: readonly OpeningHours[]; compact?: boolean }) {
  return <table className={`hours-table w-full text-left ${compact ? 'text-sm' : ''}`}>
    <caption className="sr-only">Workshop opening hours in Melbourne local time</caption>
    <tbody>{hoursGroups(hours).map(({ first, last, opens, closes }) => <tr key={first} className="border-b border-current/20">
      <th scope="row" className="py-2 pr-3 font-semibold">{shortDayRange(first, last)}</th>
      <td className="py-2 text-right font-mono text-[.79rem]">{opens && closes
        ? <><time dateTime={opens}>{displayTime(opens)}</time> – <time dateTime={closes}>{displayTime(closes)}</time></>
        : 'Closed'}</td>
    </tr>)}</tbody>
  </table>;
}

export function HoursBoard({ children }: { children: ReactNode }) {
  return <div className="rubber border-t-4 border-accent p-5 md:p-7">
    <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
      <h3 className="text-base">{children}</h3><OpenBadge hours={business.hours} />
    </div>
    <HoursTable hours={business.hours} />
  </div>;
}

export function WorkshopAddress() {
  return <address className="not-italic"><strong>{business.address.street}</strong><br />{locality}, {business.address.country}</address>;
}

export function Directions({ children }: { children: ReactNode }) {
  return <a className="text-link inline-flex items-center gap-2" href={mapDirectionsUrl(fullAddress)}><Icon name="pin" />{children}</a>;
}
