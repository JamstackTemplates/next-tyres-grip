import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { DAYS, neutralHoursLabel, openingLabel, todayHoursLabel, validateHours, type OpeningHours } from '../lib/hours.ts';

const hours: OpeningHours[] = DAYS.map(day => day === 'Monday' ? { day } : { day, opens: '09:00', closes: '17:00' });
const at = (date: string, zone = 'America/New_York') => openingLabel(hours, zone, new Date(date));
test('opening inclusive, closing exclusive; business zone wins over visitor zone', () => {
  assert.equal(at('2026-11-17T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-17T22:00:00Z'), 'Closed · opens Wednesday at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z', 'Asia/Tokyo'), 'Closed · opens Wednesday at 09:00');
});
test('closed weekdays and week wrap find the next service', () => {
  assert.equal(at('2026-11-16T18:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(at('2026-11-15T23:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(openingLabel(DAYS.map(day => ({ day })), 'UTC'), 'Closed · see opening hours');
});
test('missing/invalid zones stay neutral and DST changes preserve local service times', () => {
  assert.equal(at('2026-11-17T14:00:00Z', ''), 'See opening hours');
  assert.equal(at('2026-11-17T14:00:00Z', 'Mars/Base'), 'See opening hours');
  assert.equal(at('2026-03-08T12:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-03-08T13:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-01T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-01T14:00:00Z'), 'Open now · until 17:00');
});
test('invalid/incomplete/overnight intervals name the weekday to fix', () => {
  assert.doesNotThrow(() => validateHours(hours));
  for (const opens of ['24:00', '9:00', '18:00']) assert.throws(() => validateHours(hours.map(x => x.day === 'Tuesday' ? { ...x, opens } : x)), /Tuesday/);
  assert.throws(() => validateHours(hours.slice(1)), /Monday/);
  assert.throws(() => validateHours(hours.map(x => x.day === 'Tuesday' ? { ...x, closes: undefined } : x)), /Tuesday/);
});

const roadgripHours: OpeningHours[] = [
  ...DAYS.slice(0, 5).map(day => ({ day, opens: '07:30', closes: '17:30' })),
  { day: 'Saturday', opens: '08:00', closes: '13:00' },
  { day: 'Sunday' },
];
const melbourne = (date: string) => openingLabel(roadgripHours, 'Australia/Melbourne', new Date(date));

test('the editable workshop schedule contains seven valid local days', () => {
  assert.doesNotThrow(() => validateHours(business.hours));
});

test('Roadgrip hours use Melbourne local opening and closing boundaries', () => {
  assert.equal(neutralHoursLabel(roadgripHours), 'Hours: Mon–Fri 7:30–5:30, Sat 8–1');
  assert.equal(melbourne('2026-11-22T20:29:00Z'), 'Closed · opens today at 07:30');
  assert.equal(melbourne('2026-11-22T20:30:00Z'), 'Open now · until 17:30');
  assert.equal(melbourne('2026-11-23T06:30:00Z'), 'Closed · opens Tuesday at 07:30');
  assert.equal(melbourne('2026-11-21T01:59:00Z'), 'Open now · until 13:00');
  assert.equal(melbourne('2026-11-21T02:00:00Z'), 'Closed · opens Monday at 07:30');
  assert.equal(melbourne('2026-11-22T00:00:00Z'), 'Closed · opens Monday at 07:30');
});

test('Roadgrip hours stay in local time before and after both Melbourne DST changes', () => {
  assert.equal(melbourne('2026-10-02T22:00:00Z'), 'Open now · until 13:00');
  assert.equal(melbourne('2026-10-03T15:59:00Z'), 'Closed · opens Monday at 07:30');
  assert.equal(melbourne('2026-10-03T16:00:00Z'), 'Closed · opens Monday at 07:30');
  assert.equal(melbourne('2026-10-04T20:29:00Z'), 'Closed · opens today at 07:30');
  assert.equal(melbourne('2026-10-04T20:30:00Z'), 'Open now · until 17:30');

  assert.equal(melbourne('2026-04-03T21:00:00Z'), 'Open now · until 13:00');
  assert.equal(melbourne('2026-04-04T15:59:00Z'), 'Closed · opens Monday at 07:30');
  assert.equal(melbourne('2026-04-04T16:00:00Z'), 'Closed · opens Monday at 07:30');
  assert.equal(melbourne('2026-04-05T21:29:00Z'), 'Closed · opens today at 07:30');
  assert.equal(melbourne('2026-04-05T21:30:00Z'), 'Open now · until 17:30');
});

test('the Home hours strip shows the local day’s schedule after closing as well as before opening', () => {
  const at = (date: string) => todayHoursLabel(roadgripHours, 'Australia/Melbourne', new Date(date));
  assert.equal(at('2026-11-22T20:29:00Z'), 'Today 07:30–17:30');
  assert.equal(at('2026-11-23T06:30:00Z'), 'Today 07:30–17:30');
  assert.equal(at('2026-11-21T00:00:00Z'), 'Today 08:00–13:00');
  assert.equal(at('2026-11-22T00:00:00Z'), 'Closed today');
});
