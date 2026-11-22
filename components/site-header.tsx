import { DarkModeToggle } from 'jamstacks';
import { business, phoneHref } from '../content/business';
import { MobileMenu } from './mobile-menu';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';
import { Wordmark } from './workshop';
import { TreadBand } from './workshop-art';

const links = [
  ['/tyres/', 'Tyres'], ['/wheels/', 'Wheels'], ['/services/', 'Services'],
  ['/fleet/', 'Fleet'], ['/contact/', 'Contact'],
];

function MainNav({ className }: { className: string }) {
  return <nav aria-label="Main" className={className}>
    {links.map(([href, label]) => <SiteLink key={href} href={href} markCurrent="page"
      className="font-bold tracking-[.075em] uppercase hover:text-chalk aria-[current=page]:text-chalk">{label}</SiteLink>)}
  </nav>;
}

function HeaderContact() {
  return <div className="grid gap-1">
    <a className="font-mono text-sm font-semibold hover:text-chalk" href={phoneHref}>{business.phone}</a>
    <OpenBadge hours={business.hours} />
  </div>;
}

export function SiteHeader() {
  return <header className="rubber relative z-20">
    <div className="wrap flex min-h-[4.9rem] items-center justify-between gap-3 lg:min-h-[5.65rem] lg:gap-4">
      <Wordmark />
      <MainNav className="hidden items-center gap-[clamp(.75rem,2vw,2.2rem)] text-[.83rem] lg:flex" />
      <div className="flex items-center gap-2.5 lg:gap-4 xl:gap-5">
        <div className="hidden border-l border-white/25 pl-4 lg:block xl:pl-6"><HeaderContact /></div>
        <div className="no-print"><DarkModeToggle /></div>
        <MobileMenu>
          <MainNav className="grid gap-0 [&>a]:border-b [&>a]:border-white/20 [&>a]:py-3" />
          <div className="mt-5"><HeaderContact /></div>
        </MobileMenu>
      </div>
    </div>
    <TreadBand className="!h-2.5" variant="indicator" />
  </header>;
}
