import { brands, categories, type CategoryId } from '../../content/brands';
import { loadRatings, speedRatings } from '../../content/sidewall';
import { tyreRanges } from '../../content/tyres';
import { RatingTable } from '../../components/rating-table';
import { PageHead } from '../../components/page-head';
import { SizeDecoder } from '../../components/size-decoder';
import { TyreFilter } from '../../components/tyre-filter';
import { BrandStrip, TyreRackGroup } from '../../components/tyre-rack';
import { Action, QuoteBand, SectionHeading } from '../../components/workshop';
import { Sidewall, TreadBand, TreadGauge } from '../../components/workshop-art';
import { pageMetadata } from '../../lib/metadata';

export const metadata = pageMetadata('/tyres/', 'Tyres', 'Decode your tyre size and compare fitted prices, sizes and wet grip across six tyre brands at Roadgrip in Flemington.');

export default function TyresPage() {
  const groups = (Object.keys(categories) as CategoryId[]).map(category => {
    const tyres = tyreRanges.filter(range => range.category === category);
    return { category, count: tyres.length, content: <TyreRackGroup category={category} tyres={tyres} /> };
  });

  return <>
    <PageHead eyebrow="Tyres" title="Every size on the sidewall, decoded.">
      <p>Read the code moulded into your tyre, then compare sizes and fitted prices on the rack.</p>
    </PageHead>

    <section id="size-decoder" className="section-space bg-surface">
      <div className="wrap">
        <SectionHeading kicker="Read the raised lettering">Tyre size decoder</SectionHeading>
        <SizeDecoder art={<Sidewall className="decoder-wheel" decoder />} />
        <details className="mt-5 border border-line px-4 py-3">
          <summary className="font-bold">Load index and speed rating tables</summary>
          <div className="mt-5 grid items-start gap-6 pb-2 sm:grid-cols-2">
            <RatingTable name="Load index" unit="kg per tyre" values={loadRatings} />
            <RatingTable name="Speed rating" unit="km/h" values={speedRatings} />
          </div>
        </details>
      </div>
    </section>

    <TreadBand className="tread-motion" />
    <section className="concrete section-space">
      <div className="wrap">
        <SectionHeading kicker="Fitted & balanced">Tyre ranges</SectionHeading>
        <p className="-mt-3 mb-5 text-muted">Starting prices per tyre in AUD, including GST. Ask for a quote for your size.</p>
        <TyreFilter groups={groups} />
      </div>
    </section>

    <section className="bg-surface pt-11">
      <div className="wrap"><SectionHeading>Brands we stock</SectionHeading></div>
      <BrandStrip />
      <div className="wrap section-space !pt-7">
        <table className="w-full text-left text-sm sm:text-base">
          <caption className="sr-only">Tyre brand origins, tiers and stocked categories</caption>
          <thead className="border-b-2 border-line"><tr><th scope="col" className="p-2">Brand</th><th scope="col" className="p-2">Origin / tier</th><th scope="col" className="p-2">Ranges</th></tr></thead>
          <tbody>{brands.map(brand => <tr className="border-b border-line align-top" key={brand.id}>
            <th scope="row" className="p-2 font-bold">{brand.name}<span className="block text-sm font-normal text-muted">{brand.note}</span></th>
            <td className="p-2">{brand.origin}<span className="block capitalize text-muted">{brand.tier}</span></td>
            <td className="p-2">{brand.categories.map(category => categories[category]).join(' · ')}</td>
          </tr>)}</tbody>
        </table>
      </div>
    </section>

    <TreadBand variant="indicator" />
    <section className="concrete section-space">
      <div className="wrap grid items-center gap-8 md:grid-cols-[1fr_.85fr]">
        <TreadGauge />
        <div>
          <SectionHeading>Tread check</SectionHeading>
          <p>In Victoria, the legal minimum is <strong>1.5 mm</strong> in the principal grooves, away from the wear indicators. Replace tyres when the tread reaches the wear bars.</p>
          <p className="mt-3 text-muted">Use a tread gauge in several places across and around the tyre. Have cuts, bulges or uneven wear checked promptly.</p>
          <a className="text-link mt-3 inline-block" href="https://transport.vic.gov.au/road-and-active-transport/registration-and-licensing/registration/standard-and-non-standard-vehicle-information/vehicle-standards-information/tyre-maintenance-and-repair">Transport Victoria tyre requirements</a>
        </div>
      </div>
    </section>
    <QuoteBand heading="Send us your size and we’ll quote a fitted set."><Action>Ask for a tyre quote</Action></QuoteBand>
  </>;
}
