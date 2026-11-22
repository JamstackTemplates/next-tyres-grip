import assert from 'node:assert/strict';
import { test } from 'node:test';
import { brands, categories } from '../content/brands.ts';
import { business } from '../content/business.ts';
import { fleetTiers } from '../content/fleet.ts';
import { serviceCategories, services } from '../content/services.ts';
import { exampleSize, loadRatings, sidewall, speedRatings } from '../content/sidewall.ts';
import { fittedPriceFrom, tyreRanges } from '../content/tyres.ts';
import { wheels } from '../content/wheels.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';

function checkIds(entries: readonly { id: string }[], collection: string) {
  const seen = new Set<string>();
  for (const { id } of entries) {
    assert.match(id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, `${collection} "${id}": use a URL-safe ID`);
    assert.ok(!seen.has(id), `${collection} "${id}": duplicate ID`);
    seen.add(id);
  }
}

function requiredText(value: string, field: string) {
  assert.ok(typeof value === 'string' && value.trim(), `${field}: required text`);
}

function requiredTexts(values: string[], field: string) {
  assert.ok(values.length > 0, `${field}: at least one entry required`);
  values.forEach((value, index) => requiredText(value, `${field}[${index}]`));
}

function wholeNumber(value: number, min: number, field: string, max = Infinity) {
  assert.ok(Number.isInteger(value) && value >= min && value <= max, `${field}: expected a whole number from ${min} to ${max === Infinity ? 'any higher value' : max}`);
}

test('business content has actionable required fields', () => {
  for (const key of ['name', 'wordmark', 'descriptor', 'tagline', 'introduction', 'email', 'phone', 'landmark', 'driveInNote', 'areaServed'] as const) {
    requiredText(business[key], `business.${key}`);
  }
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  assert.match(business.phone.replace(/\D/g, ''), /^0\d{9}$/, 'business.phone: Australian local-format number required');
  for (const [key, value] of Object.entries(business.address)) requiredText(value, `business.address.${key}`);
  requiredText(business.enquiries.confirmation, 'business.enquiries.confirmation');
});

test('collection IDs are unique and URL-safe', () => {
  for (const [label, entries] of Object.entries({ brands, tyreRanges, wheels, services, fleetTiers, sidewall })) checkIds(entries, label);
});

test('brand categories and tyre stock, prices and fitment are valid', () => {
  for (const brand of brands) {
    const id = `Brand ${brand.id}`;
    for (const key of ['name', 'origin', 'note'] as const) requiredText(brand[key], `${id}.${key}`);
    assert.ok(['premium', 'mid', 'value'].includes(brand.tier), `${id}.tier: invalid tier`);
    assert.ok(brand.categories.length && new Set(brand.categories).size === brand.categories.length, `${id}.categories: enter unique stocked categories`);
    for (const category of brand.categories) {
      assert.ok(Object.hasOwn(categories, category), `${id}.categories: unknown category ${category}`);
      assert.ok(tyreRanges.some(range => range.brandId === brand.id && range.category === category), `${id}.categories: no range for ${category}`);
    }
  }

  for (const range of tyreRanges) {
    const id = `Tyre ${range.id}`;
    const brand = brands.find(item => item.id === range.brandId);
    assert.ok(brand, `${id}.brandId: unknown brand ${range.brandId}`);
    assert.ok(brand.categories.includes(range.category), `${id}.category: missing from ${brand.id} categories`);
    requiredText(range.name, `${id}.name`);
    requiredTexts(range.sizes, `${id}.sizes`);
    for (const size of range.sizes) {
      assert.match(size, /^\d{3}(?:\/\d{2} R\d{2}C?| R\d{2}C)$/, `${id}.sizes: invalid tyre size "${size}"`);
    }
    wholeNumber(range.priceFrom, 1, `${id}.priceFrom`);
    wholeNumber(range.warrantyKm, 1, `${id}.warrantyKm`);
    wholeNumber(range.wetGrip, 1, `${id}.wetGrip`, 5);
    wholeNumber(range.noiseDb, 1, `${id}.noiseDb`);
    assert.equal(typeof range.inStock, 'boolean', `${id}.inStock: expected true or false`);
    assert.equal(typeof range.featured, 'boolean', `${id}.featured: expected true or false`);
  }
});

test('Home price is the lowest in-stock price and follows owner edits', () => {
  assert.ok(tyreRanges.some(range => range.inStock), 'Add an in-stock tyre range for the homepage price');
  assert.equal(fittedPriceFrom(), Math.min(...tyreRanges.filter(range => range.inStock).map(range => range.priceFrom)));
  const baseline = tyreRanges[0];
  assert.equal(fittedPriceFrom([
    { ...baseline, priceFrom: 129, inStock: false },
    { ...baseline, priceFrom: 149, inStock: true },
  ]), 149);
  assert.equal(fittedPriceFrom([{ ...baseline, inStock: false }]), undefined);
});

test('wheel plates have valid fitment, stock and prices', () => {
  for (const wheel of wheels) {
    const id = `Wheel ${wheel.id}`;
    requiredText(wheel.name, `${id}.name`);
    requiredText(wheel.finish, `${id}.finish`);
    assert.ok(wheel.material === 'steel' || wheel.material === 'alloy', `${id}.material: expected steel or alloy`);
    assert.ok(wheel.diameters.length > 0, `${id}.diameters: enter at least one diameter`);
    for (const diameter of wheel.diameters) wholeNumber(diameter, 13, `${id}.diameters`, 22);
    assert.ok(Number.isFinite(wheel.widthIn) && wheel.widthIn > 0, `${id}.widthIn: positive width required`);
    assert.match(wheel.pcd, /^[3-8]x[1-9]\d{1,2}(?:\.\d)?$/, `${id}.pcd: use a bolt pattern such as 5x114.3`);
    assert.ok(Number.isInteger(wheel.offsetMm), `${id}.offsetMm: enter whole millimetres`);
    wholeNumber(wheel.spokes, wheel.material === 'steel' ? 0 : 1, `${id}.spokes`, wheel.material === 'steel' ? 0 : 30);
    wholeNumber(wheel.priceFrom, 1, `${id}.priceFrom`);
    assert.equal(typeof wheel.inStock, 'boolean', `${id}.inStock: expected true or false`);
  }
});

test('docket jobs have valid prices, durations and inclusions', () => {
  for (const service of services) {
    const id = `Service ${service.id}`;
    requiredText(service.name, `${id}.name`);
    assert.ok(Object.hasOwn(serviceCategories, service.category), `${id}.category: unknown category`);
    assert.ok(['job', 'wheel', 'tyre'].includes(service.priceUnit), `${id}.priceUnit: invalid unit`);
    wholeNumber(service.price, service.id === 'safety-check' ? 0 : 1, `${id}.price`);
    wholeNumber(service.minutes, 1, `${id}.minutes`);
    requiredTexts(service.includes, `${id}.includes`);
  }
  assert.ok(services.some(service => service.id === 'alignment-4wd' && service.category === 'alignment'), 'Service alignment-4wd: required for the alignment feature');
});

test('fleet sizes start at one and cover every vehicle count exactly once', () => {
  let nextMin = 1;
  fleetTiers.forEach((tier, index) => {
    const id = `Fleet tier ${tier.id}`;
    requiredText(tier.name, `${id}.name`);
    requiredText(tier.checkInterval, `${id}.checkInterval`);
    requiredTexts(tier.inclusions, `${id}.inclusions`);
    assert.equal(tier.vehicles.min, nextMin, `${id}.vehicles.min: start at ${nextMin} to avoid gaps and overlap`);
    if (index === fleetTiers.length - 1) assert.equal(tier.vehicles.max, null, `${id}.vehicles.max: last tier must be open-ended`);
    else {
      assert.notEqual(tier.vehicles.max, null, `${id}.vehicles.max: only the last tier may be open-ended`);
      wholeNumber(tier.vehicles.max!, nextMin, `${id}.vehicles.max`);
      nextMin = tier.vehicles.max! + 1;
    }
  });
});

test('decoder segments reconstruct the example and refer to the correct ratings', () => {
  assert.equal(exampleSize, '225/45 R17 94W');
  assert.equal(sidewall.length, 6);
  for (const segment of sidewall) for (const key of ['text', 'label', 'explanation'] as const) {
    requiredText(segment[key], `Sidewall ${segment.id}.${key}`);
  }
  assert.equal(loadRatings.find(([code]) => String(code) === sidewall.find(segment => segment.id === 'load')?.text)?.[1], 670);
  assert.equal(speedRatings.find(([code]) => code === sidewall.find(segment => segment.id === 'speed')?.text)?.[1], 270);
});

test('TireShop data follows the workshop schedule and service catalogue', () => {
  const schema = businessStructuredData();
  assert.equal(schema['@type'], 'TireShop');
  assert.equal(schema.address.streetAddress, business.address.street);
  assert.equal(schema.openingHoursSpecification.length, business.hours.filter(entry => entry.opens).length);
  assert.deepEqual(schema.makesOffer.map(offer => offer.priceSpecification.price), services.map(service => service.price));
});

test('inline JSON-LD escapes closing script content without changing values', () => {
  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});
