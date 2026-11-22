import { PageHead } from '../../components/page-head';
import { PriceDocket } from '../../components/price-docket';
import { Action, QuoteBand, SectionHeading } from '../../components/workshop';
import { AlignmentDiagram, Icon, TreadBand } from '../../components/workshop-art';
import { standardAlignment } from '../../content/services';
import { pageMetadata } from '../../lib/metadata';

export const metadata = pageMetadata('/services/', 'Services', 'See prices and estimated times for four-wheel laser alignment, balancing, puncture repairs, pressure checks and more.');

export default function ServicesPage() {
  return <>
    <PageHead eyebrow="Services" title="Straight, balanced, sealed.">
      <p>Alignment, balancing, puncture repairs and pressure checks in our Flemington workshop.</p>
    </PageHead>
    <section className="concrete section-space">
      <div className="wrap">
        <SectionHeading kicker="Alignment bay">Four-wheel laser alignment</SectionHeading>
        <div className="grid items-center gap-7 md:grid-cols-[1.35fr_.75fr] md:gap-10">
          <AlignmentDiagram dark />
          <div>
            <p>We measure toe, camber and caster, then adjust the angles your suspension allows to bring the wheels into spec.</p>
            <ul className="mt-4 grid gap-2">{standardAlignment.includes.map(item => <li key={item} className="flex items-center gap-2 border-b border-line pb-2">
              <Icon name="check" className="text-accent-ink" />{item}
            </li>)}</ul>
          </div>
        </div>
      </div>
    </section>
    <TreadBand className="tread-motion" />
    <section className="section-space bg-surface"><div className="wrap">
      <PriceDocket heading="Workshop job docket" stamp="GST incl." description="Listed prices in AUD and estimated job times. We’ll quote your job before work starts." />
    </div></section>
    <section className="rubber py-10 md:py-14">
      <div className="wrap">
        <SectionHeading>Signs you need us</SectionHeading>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-5">
          <li className="group border-t border-white/25 pt-3"><Icon className="warning-light mb-2" name="alignment" />Pulling left or right</li>
          <li className="group border-t border-white/25 pt-3"><Icon className="warning-light mb-2" name="steering" />Steering-wheel shimmy</li>
          <li className="group border-t border-white/25 pt-3"><Icon className="warning-light mb-2" name="wear" />Uneven tread wear</li>
          <li className="group border-t border-white/25 pt-3"><Icon className="warning-light mb-2" name="pressure" />Slow leak</li>
          <li className="group border-t border-white/25 pt-3"><Icon className="warning-light mb-2" name="tpms" />TPMS warning light</li>
        </ul>
      </div>
    </section>
    <QuoteBand heading="Tell us what you’re noticing."><Action>Ask for a book-in time</Action></QuoteBand>
  </>;
}
