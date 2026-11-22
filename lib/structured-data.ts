import { business } from '../content/business.ts';
import { services } from '../content/services.ts';
import { absoluteUrl } from './paths.ts';

export function businessStructuredData() {
  const url = absoluteUrl('/');
  const { address } = business;
  return {
    '@context': 'https://schema.org',
    '@type': 'TireShop',
    name: business.name,
    slogan: business.tagline,
    description: business.introduction,
    email: business.email,
    telephone: business.phone,
    ...(url ? { url } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.suburb,
      addressRegion: address.region,
      postalCode: address.postcode,
      addressCountry: address.country,
    },
    areaServed: business.areaServed,
    openingHoursSpecification: business.hours.flatMap(({ day, opens, closes }) =>
      opens && closes ? [{ '@type': 'OpeningHoursSpecification', dayOfWeek: `https://schema.org/${day}`, opens, closes }] : []),
    makesOffer: services.map(({ name, price, priceUnit, includes }) => ({
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price, priceCurrency: 'AUD', valueAddedTaxIncluded: true, unitText: priceUnit,
      },
      itemOffered: { '@type': 'Service', name, description: includes.join(', ') },
    })),
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
