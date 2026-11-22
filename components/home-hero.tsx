import type { ReactNode } from 'react';
import { business, locality } from '../content/business';
import { asset } from '../lib/paths';
import { OpenBadge } from './open-badge';
import { Icon } from './workshop-art';

function HeroScene({ children }: { children: ReactNode }) {
  return <section aria-labelledby="home-title" className="concrete hero-scene relative">
    <div className="hero-media" aria-hidden="true">
      <img src={asset('/hero-light.jpg')} alt="" width={2000} height={1116} fetchPriority="high" decoding="async" className="hero-photo hero-photo-light" />
      <img src={asset('/hero-dark.jpg')} alt="" width={2000} height={1116} fetchPriority="high" decoding="async" className="hero-photo hero-photo-dark" />
    </div>
    <div className="wrap"><div className="py-7 lg:w-[55%] lg:py-[clamp(4.25rem,6.6vw,6.8rem)]">{children}</div></div>
  </section>;
}

function Kicker({ children }: { children: ReactNode }) {
  return <p className="eyebrow mb-3 flex items-center gap-2.5 text-accent-ink lg:mb-5">
    <span className="inline-block h-[3px] w-6 bg-accent" aria-hidden="true" />{children}
  </p>;
}

function Heading({ children }: { children: ReactNode }) {
  return <h1 id="home-title" className="hero-title">{children}</h1>;
}

function Accent({ children }: { children: ReactNode }) {
  return <span className="text-accent-ink">{children}</span>;
}

function Introduction({ children }: { children: ReactNode }) {
  return <p className="mt-4 max-w-[43ch] text-[clamp(1rem,1.65vw,1.22rem)] text-muted lg:mt-6">{children}</p>;
}

function Price({ children, amount }: { children: ReactNode; amount: number }) {
  return <p className="my-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-[.83rem] font-semibold lg:my-7 lg:text-base">
    {children} <strong className="price-ring text-2xl lg:text-3xl">${amount}
      <svg viewBox="0 0 118 50" preserveAspectRatio="none" aria-hidden="true">
        <path d="M100 9C78-2 14 3 6 25c-7 19 43 25 78 20 29-5 36-18 24-28-9-7-25-12-38-13" stroke="currentColor" strokeWidth="3.1" strokeLinecap="round" fill="none" />
      </svg>
    </strong>
  </p>;
}

function Actions({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-x-5 gap-y-3">{children}</div>;
}

function Location() {
  return <div className="rubber border-t-4 border-accent">
    <div className="wrap grid gap-x-8 gap-y-2 py-3 sm:flex sm:flex-wrap sm:items-center sm:py-4">
      <a className="flex items-center gap-2 text-sm font-bold hover:text-chalk" href="#visit"><Icon name="pin" className="!h-5 !w-5 text-chalk" />{business.address.street}, {locality}</a>
      <div className="flex items-center gap-2"><Icon name="clock" className="!h-5 !w-5 text-chalk" /><OpenBadge hours={business.hours} today /></div>
    </div>
  </div>;
}

export const Hero = Object.assign(HeroScene, { Kicker, Heading, Accent, Introduction, Price, Actions, Location });
