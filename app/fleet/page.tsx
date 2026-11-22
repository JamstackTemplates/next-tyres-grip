import { FleetBays } from '../../components/fleet-bays';
import { PageHead } from '../../components/page-head';
import { Action, QuoteBand, SectionHeading } from '../../components/workshop';
import { Icon, TreadBand } from '../../components/workshop-art';
import { pageMetadata } from '../../lib/metadata';

export const metadata = pageMetadata('/fleet/', 'Fleet', 'Scheduled fleet tyre checks and monthly accounts for couriers, trades and depots in inner-north and western Melbourne.');

export default function FleetPage() {
  return <>
    <PageHead eyebrow="Fleet" title="Keep every wheel earning.">
      <p>Scheduled tyre checks and a monthly account for courier runs, trade vans and depot fleets.</p>
    </PageHead>
    <section className="section-space bg-surface">
      <div className="wrap">
        <SectionHeading kicker="Courier · Trade · Depot">Fleet account tiers</SectionHeading>
        <FleetBays />
        <p className="mt-5 text-muted">Fleet pricing is by quote, based on your vehicles and check schedule.</p>
      </div>
    </section>
    <TreadBand className="tread-motion" />
    <div className="concrete section-space">
      <div className="wrap grid items-start gap-7 md:grid-cols-[1.08fr_.92fr] md:gap-10">
        <section className="rubber border-t-4 border-accent p-5 md:p-8">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2 font-mono text-[.7rem] font-semibold tracking-[.12em] uppercase text-chalk">
            <span>Inspection sheet · 6-point check</span>
            <span>Logged per vehicle</span>
          </div>
          <h2 className="mb-5 text-[clamp(1.3rem,2.75vw,2.05rem)]">What a scheduled check covers</h2>
          <ul className="divide-y divide-white/25 border-y border-white/25 [&>li]:flex [&>li]:items-center [&>li]:gap-3 [&>li]:py-2.5">
            <li><Icon className="border border-chalk p-0.5 text-chalk" name="check" />Tread depth</li>
            <li><Icon className="border border-chalk p-0.5 text-chalk" name="check" />Tyre pressures</li>
            <li><Icon className="border border-chalk p-0.5 text-chalk" name="check" />Sidewall damage</li>
            <li><Icon className="border border-chalk p-0.5 text-chalk" name="check" />Valve caps</li>
            <li><Icon className="border border-chalk p-0.5 text-chalk" name="check" />Spare tyre</li>
            <li><Icon className="border border-chalk p-0.5 text-chalk" name="check" />Alignment flag</li>
          </ul>
        </section>
        <section className="border-l-[.45rem] border-accent bg-surface p-5 md:p-8">
          <h2 className="mb-4 text-[clamp(1.3rem,2.75vw,2.05rem)]">How accounts work</h2>
          <p className="text-muted">Tell us where your vehicles are based, what they carry and when they’re off the road. We’ll discuss a check schedule and send a monthly statement with per-vehicle tyre history once your account is open.</p>
          <p className="mt-4 font-bold">Fleet accounts are opened only after we’ve reviewed your enquiry and you’ve agreed terms.</p>
        </section>
      </div>
    </div>
    <QuoteBand heading="Tell us about your vehicles and depot."><Action>Make a fleet enquiry</Action></QuoteBand>
  </>;
}
