import { business, emailHref, fullAddress, phoneHref } from '../../content/business';
import { exampleSize } from '../../content/sidewall';
import { CopyEmail } from '../../components/copy-email';
import { GoogleMap } from '../../components/google-map';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { PageHead } from '../../components/page-head';
import { Directions, HoursBoard, WorkshopAddress } from '../../components/workshop';
import { Icon } from '../../components/workshop-art';
import { pageMetadata } from '../../lib/metadata';
import { site } from '../../lib/site';

export const metadata = pageMetadata('/contact/', 'Contact', 'Enquire about tyres, wheels, alignment, workshop services or a fleet account at Roadgrip in Flemington.');

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);
  return <>
    <PageHead eyebrow="Contact" title="Ask for a quote or book-in time." dark>
      <p>Send a tyre or wheel quote request, ask for an alignment or service time, or enquire about a fleet account.</p>
    </PageHead>
    <div className="concrete section-space">
      <div className="wrap grid items-start gap-9 md:grid-cols-[1.08fr_.92fr] lg:gap-12">
        <section className="border-t-4 border-accent bg-surface p-5 sm:p-8">
          <h2 className="mb-3 text-[clamp(1.2rem,2.7vw,1.8rem)]">{hosted ? 'Send an enquiry' : 'Email your enquiry'}</h2>
          <p className="mb-4">{business.enquiries.confirmation}</p>
          <p className="mb-5 text-muted">Prices are subject to a quote.</p>
          {hosted ? <JamstacksSupportForm siteId={site.jamstacksSite} embedUrl={site.jamstacksEmbedUrl} email={business.email} />
            : <div className="flex flex-wrap items-center gap-4">
              <a className="text-link wrap-anywhere" href={emailHref}>{business.email}</a><CopyEmail email={business.email} />
            </div>}
          <div className="mt-7 border-2 border-[#8b1826] border-t-8 bg-[#f3ecdb] p-4 text-[#16171a] shadow-[0_.2rem_.4rem_#1011131a] sm:p-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-[#b7ad92] pb-2">
              <h3 className="spec font-bold text-[#8b1826] uppercase">Useful to include in your message</h3>
              <span className="font-mono text-[.68rem] font-semibold tracking-[.1em] uppercase text-[#655842]">Door-jamb tyre placard</span>
            </div>
            <ul className="list-disc space-y-2 pl-5">
              <li>Your tyre size from the sidewall, for example <span className="font-mono font-semibold">{exampleSize}</span>, or your car’s make, model and year</li>
              <li>How many tyres or wheels you need and any brand preference</li>
              <li>The service you need and your preferred days</li>
              <li>For fleets, your business name, the number and type of vehicles, and your depot suburb</li>
            </ul>
          </div>
        </section>
        <aside aria-label="Workshop details" className="grid min-w-0 gap-5">
          <div className="border border-line border-t-4 border-t-accent bg-surface p-5 sm:p-6">
            <h2 className="mb-4 text-lg">Flemington workshop</h2>
            <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-3">
              <dt className="spec font-bold uppercase">Email</dt><dd className="min-w-0"><a className="text-link wrap-anywhere" href={emailHref}>{business.email}</a></dd>
              <dt className="spec font-bold uppercase">Phone</dt><dd><a className="text-link" href={phoneHref}>{business.phone}</a></dd>
              <dt className="sr-only">Address</dt><dd className="col-span-2 mt-1 flex gap-2"><Icon name="pin" className="text-accent-ink" /><WorkshopAddress /></dd>
            </dl>
            <p className="mt-3 text-muted">{business.landmark}</p>
            <p className="mt-2">{business.driveInNote}</p>
          </div>
          <HoursBoard>Opening hours</HoursBoard>
          <GoogleMap address={fullAddress} title={`${business.name} workshop, Racecourse Road`} />
          <Directions>Get directions</Directions>
        </aside>
      </div>
    </div>
  </>;
}
