import { PageHead } from '../../components/page-head';
import { WheelWall } from '../../components/wheel-wall';
import { Action, QuoteBand, SectionHeading } from '../../components/workshop';
import { FitDiagram, Icon, TreadBand, type IconName } from '../../components/workshop-art';
import { servicePrice, services } from '../../content/services';
import { pageMetadata } from '../../lib/metadata';

export const metadata = pageMetadata('/wheels/', 'Wheels', 'Compare alloy and steel wheels, check wheel fitment, and see balancing, straightening and fitting prices.');

const serviceIcons: Record<string, IconName> = { balance: 'balance', 'wheel-straighten': 'lug', 'fit-wheels': 'torque' };

export default function WheelsPage() {
  return <>
    <PageHead eyebrow="Wheels" title="Wheels that fit. Measured, not guessed.">
      <p>Alloy and steel wheels for daily drivers, performance cars, 4x4s and work vehicles.</p>
    </PageHead>
    <section className="bg-surface pt-9 md:pt-12">
      <div className="wrap">
        <SectionHeading>Alloy &amp; steel wheel wall</SectionHeading>
        <p className="-mt-3 mb-6 text-muted">Starting prices per wheel in AUD, including GST.</p>
      </div>
      <WheelWall />
    </section>
    <section className="concrete section-space">
      <div className="wrap">
        <SectionHeading kicker="Read the fitment specs">Will it fit?</SectionHeading>
        <div className="grid items-start gap-7 md:grid-cols-[1.1fr_.9fr] md:gap-10">
          <FitDiagram />
          <div>
            <ol className="list-decimal space-y-2 pl-6 marker:font-mono marker:font-bold marker:text-accent-ink">
              <li><strong>Diameter</strong> is measured across the bead seats. It must match the tyre’s rim size.</li>
              <li><strong>Width</strong> is the distance between the bead seats.</li>
              <li><strong>Offset</strong> is the distance from the wheel centreline to the hub mounting face.</li>
              <li><strong>PCD</strong> tells you the number of bolt holes and the diameter of their circle.</li>
              <li><strong>Centre bore</strong> is the opening that locates the wheel on the hub.</li>
            </ol>
            <p className="mt-5 border-l-4 border-accent bg-surface p-3 font-semibold">Include your car’s make, model and year in your quote message so we can check fitment.</p>
          </div>
        </div>
      </div>
    </section>
    <section className="rubber">
      <TreadBand variant="worn" className="tread-motion" />
      <div className="wrap py-10 md:py-14">
        <SectionHeading>Wheel services</SectionHeading>
        <ul className="grid gap-4 md:grid-cols-3">
          {services.filter(service => service.category === 'wheels').map(service => <li key={service.id} className="border-t border-white/30 pt-4">
            <Icon name={serviceIcons[service.id] ?? 'torque'} className="mb-3 text-chalk" />
            <h3 className="text-base">{service.name}</h3>
            <p className="spec mt-2 text-[#e0e0d8]">{servicePrice(service)} · {service.minutes} min</p>
            <p className="mt-1 text-sm">{service.includes.join(' · ')}</p>
          </li>)}
        </ul>
      </div>
    </section>
    <QuoteBand heading="Find a wheel that fits your car."><Action>Ask for a wheel quote</Action></QuoteBand>
  </>;
}
