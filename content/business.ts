import { DAYS, type OpeningHours } from '../lib/hours.ts';

/** Same-day local opening hours, inclusive at opening and exclusive at closing. */
const hours: OpeningHours[] = DAYS.map(day => {
  if (day === 'Sunday') return { day };
  if (day === 'Saturday') return { day, opens: '08:00', closes: '13:00' };
  return { day, opens: '07:30', closes: '17:30' };
});

export const business = {
  name: 'Roadgrip Tyres & Wheels',
  wordmark: 'Roadgrip',
  descriptor: 'Tyres & Wheels',
  tagline: 'Grip you can trust. Fitted today.',
  introduction: 'Six tyre brands on the rack, a laser alignment bay and a crew that checks your pressures before you leave. From a single puncture to a 40-van fleet.',
  email: 'fitting@roadgriptyres.example',
  phone: '(03) 7010 0418',
  address: { street: '88 Racecourse Road', suburb: 'Flemington', region: 'VIC', postcode: '3031', country: 'Australia' },
  landmark: 'Five minutes from Flemington Racecourse, opposite the Newmarket tram stop on Route 57.',
  areaServed: 'Inner-north and western Melbourne',
  hours,
  driveInNote: 'Drive-ins welcome for punctures. Book-ins come first for alignments and full sets.',
  enquiries: {
    confirmation: 'We’ll reply with a quote and available times. Your book-in is confirmed only when we reply.',
  },
};

export const phoneHref = `tel:+61${business.phone.replace(/\D/g, '').replace(/^0/, '')}`;
export const emailHref = `mailto:${business.email}`;
export const locality = `${business.address.suburb} ${business.address.region} ${business.address.postcode}`;
export const fullAddress = `${business.address.street}, ${locality}, ${business.address.country}`;
