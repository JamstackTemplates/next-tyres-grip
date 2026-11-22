import { type ReactNode } from 'react';
import { serviceCategories, servicePrice, services } from '../content/services';

export function PriceDocket({ heading, description, stamp }: { heading: ReactNode; description: ReactNode; stamp: ReactNode }) {
  return <div className="docket mx-auto max-w-[59rem] px-4 pb-7 pt-7 sm:px-9 md:px-12 md:pb-10">
    <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-[#655842] pb-2 font-mono text-[.7rem] font-semibold tracking-[.12em] uppercase text-[#5a4e3a]">
      <span>Docket № RG-088 · Bay 1–3</span>
      <span>88 Racecourse Rd, Flemington</span>
    </div>
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div><h2 className="section-title">{heading}</h2><p className="mt-2 text-sm">{description}</p></div>
      <span className="docket-stamp spec px-2.5 py-1 font-bold uppercase">{stamp}</span>
    </div>
    <table className="w-full table-fixed border-collapse font-mono text-[.72rem] sm:text-sm">
      <caption className="sr-only">Workshop jobs, estimated times and prices in Australian dollars</caption>
      <colgroup><col /><col className="w-[4.45rem] sm:w-[7rem]" /><col className="w-[6.35rem] sm:w-[10.5rem]" /></colgroup>
      <thead><tr><th scope="col">Job</th><th scope="col">Time</th><th scope="col">Price</th></tr></thead>
      {Object.entries(serviceCategories).map(([key, label]) => <tbody key={key}>
        <tr className="docket-category"><th colSpan={3} scope="rowgroup" className="!pt-4 !text-left font-bold uppercase">{label}</th></tr>
        {services.filter(service => service.category === key).map(service => <tr key={service.id}>
          <th scope="row" className="font-medium">{service.name}</th>
          <td className="whitespace-nowrap">{service.minutes} min</td>
          <td className="font-bold">{servicePrice(service)}</td>
        </tr>)}
      </tbody>)}
    </table>
  </div>;
}
