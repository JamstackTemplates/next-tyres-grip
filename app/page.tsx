import { business } from '../content/business';
import { fleetTiers, vehicleRange } from '../content/fleet';
import { fittedPriceFrom, tyreRanges } from '../content/tyres';
import { servicePrice, standardAlignment } from '../content/services';
import { FleetBays } from '../components/fleet-bays';
import { FittingStage } from '../components/fitting-stage';
import { Hero } from '../components/home-hero';
import { SiteLink } from '../components/site-link';
import { BrandStrip, TyreRack } from '../components/tyre-rack';
import { Action, ChalkRule, Directions, HoursBoard, SectionHeading, WorkshopAddress } from '../components/workshop';
import { AlignmentDiagram, TreadBand } from '../components/workshop-art';
import { pageMetadata } from '../lib/metadata';
import { site } from '../lib/site';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata = pageMetadata('/', business.name, site.description || business.introduction);

export default function HomePage() {
  const price = fittedPriceFrom();
  const depot = fleetTiers.find(tier => tier.id === 'depot');

  return <>
    <Hero>
      <Hero.Kicker>Tyre &amp; wheel workshop · Flemington</Hero.Kicker>
      <Hero.Heading>Grip you can trust.<br /><Hero.Accent>Fitted today.</Hero.Accent></Hero.Heading>
      <Hero.Introduction>{business.introduction}</Hero.Introduction>
      {price !== undefined && <Hero.Price amount={price}>Tyres fitted &amp; balanced from</Hero.Price>}
      <Hero.Actions>
        <Action>Ask for a tyre quote</Action>
        <SiteLink className="text-link text-sm" href="/tyres/#size-decoder">Decode your tyre size</SiteLink>
      </Hero.Actions>
    </Hero>
    <Hero.Location />

    <section className="rubber border-t border-white/20" aria-label="Brands on the rack"><BrandStrip /></section>

    <section className="concrete section-space">
      <div className="wrap">
        <SectionHeading kicker="In the fitting bay">How a fitting works</SectionHeading>
        <ol className="fit-stages">
          <FittingStage step={1} icon="wear" title="Check">We check your size, tread, wear and how you use the car.</FittingStage>
          <FittingStage step={2} icon="valve" title="Quote">Get a fitted price for the choices that suit your vehicle.</FittingStage>
          <FittingStage step={3} icon="balance" title="Fit & balance">We mount the tyres and spin-balance each wheel.</FittingStage>
          <FittingStage step={4} icon="torque" title="Torque & pressure">We set pressures and torque the wheel nuts to spec.</FittingStage>
        </ol>
      </div>
    </section>

    <TreadBand className="tread-motion" />
    <section className="section-space bg-surface">
      <div className="wrap">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-10">
          <SectionHeading kicker="On the rack">Featured tyre ranges</SectionHeading>
          <SiteLink className="text-link mb-5" href="/tyres/">See all tyre ranges</SiteLink>
        </div>
        <TyreRack tyres={tyreRanges.filter(range => range.featured)} />
        <p className="mt-5 text-sm text-muted">Starting prices per tyre, fitted and balanced. AUD, GST included.</p>
      </div>
    </section>

    <section className="alignment-band bg-accent text-white [--focus:var(--chalk)]">
      <div className="wrap grid items-center gap-8 py-12 md:grid-cols-[1.15fr_1fr] lg:gap-14 lg:py-16">
        <AlignmentDiagram dark />
        <div>
          <p className="eyebrow mb-3">Workshop alignment</p>
          <h2 className="mb-3 text-[clamp(1.3rem,3vw,2rem)]">{standardAlignment.name}</h2>
          <p className="font-display text-[clamp(2.8rem,7.9vw,6.4rem)] leading-none">{servicePrice(standardAlignment)}</p>
          <p className="mt-4">Before-and-after measurements, steering-wheel centring and a road test.</p>
          <SiteLink className="mt-4 inline-block font-bold underline hover:text-chalk" href="/services/">See service prices</SiteLink>
        </div>
      </div>
    </section>

    <section className="concrete section-space">
      <div className="wrap grid items-center gap-7 md:grid-cols-[.8fr_1.2fr] md:gap-12">
        <div>
          <SectionHeading kicker="Fleet tyre accounts">Less time off the road</SectionHeading>
          {depot && <span className="block font-display text-[clamp(4.2rem,11vw,8.25rem)] leading-none tracking-[-.08em] text-transparent [-webkit-text-stroke:2px_var(--accent-ink)]" aria-label={`${vehicleRange(depot.vehicles)} vehicle depot tier`}>{vehicleRange(depot.vehicles)}</span>}
          <p className="mt-4 max-w-[39ch] text-muted">Scheduled tyre checks for courier crews, trade vans and depot fleets.</p>
          <SiteLink className="text-link mt-4 inline-block" href="/fleet/">Explore fleet accounts</SiteLink>
        </div>
        <FleetBays compact />
      </div>
    </section>

    <TreadBand variant="worn" className="tread-motion" />
    <section id="visit" className="section-space bg-surface">
      <div className="wrap">
        <SectionHeading kicker="Racecourse Road">Visit the workshop</SectionHeading>
        <div className="grid gap-7 md:grid-cols-[1fr_.85fr] md:items-center md:gap-12">
          <HoursBoard>Opening hours</HoursBoard>
          <div>
            <WorkshopAddress />
            <ChalkRule className="my-3" />
            <p className="max-w-[42ch] text-muted">{business.landmark}</p>
            <p className="mb-4 mt-2 max-w-[42ch]">{business.driveInNote}</p>
            <Directions>Get directions</Directions>
          </div>
        </div>
      </div>
    </section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }} />
  </>;
}
