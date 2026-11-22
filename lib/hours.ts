/** Optional weekly opening-hours model. Time zone stays in site.config.json. */
export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
export type Day = typeof DAYS[number];
export interface OpeningHours {
  /** Every weekday occurs exactly once. */
  day: Day;
  /** Inclusive local HH:MM; omit both times for a closed day. */
  opens?: string;
  /** Exclusive local HH:MM; overnight intervals are deliberately unsupported. */
  closes?: string;
}
const clock = /^([01]\d|2[0-3]):[0-5]\d$/;
const minutes = (value: string) => Number(value.slice(0, 2)) * 60 + Number(value.slice(3));
export function validateHours(hours: readonly OpeningHours[]): void {
  for (const day of DAYS) {
    const matches = hours.filter(entry => entry.day === day);
    if (matches.length !== 1) throw new Error(`hours: ${day} must occur exactly once`);
    const { opens, closes } = matches[0];
    if (opens === undefined && closes === undefined) continue;
    if (!opens || !closes || !clock.test(opens) || !clock.test(closes) || minutes(opens) >= minutes(closes)) {
      throw new Error(`hours: ${day} needs HH:MM opening before closing; overnight service is unsupported`);
    }
  }
  if (hours.length !== 7) throw new Error('hours: expected seven weekdays');
}
function workshopClock(timeZone: string, now: Date) {
  if (!timeZone) return undefined;
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone, weekday: 'long', hour: 'numeric', minute: 'numeric', hourCycle: 'h23',
    }).formatToParts(now);
    const part = (type: string) => parts.find(entry => entry.type === type)?.value ?? '';
    const dayIndex = DAYS.indexOf(part('weekday') as Day);
    return dayIndex < 0 ? undefined : { dayIndex, current: Number(part('hour')) * 60 + Number(part('minute')) };
  } catch {
    return undefined;
  }
}

/** Browser callers supply the clock. Static views use neutralHoursLabel instead. */
export function openingLabel(hours: readonly OpeningHours[], timeZone: string, now = new Date()): string {
  const time = workshopClock(timeZone, now);
  if (!time) return 'See opening hours';
  validateHours(hours);
  const { dayIndex: index, current } = time;
  const today = hours.find(entry => entry.day === DAYS[index])!;
  if (today.opens && today.closes && current >= minutes(today.opens) && current < minutes(today.closes)) return `Open now · until ${today.closes}`;
  for (let offset = 0; offset <= 7; offset++) {
    const day = DAYS[(index + offset) % 7];
    const entry = hours.find(value => value.day === day)!;
    if (entry.opens && (offset > 0 || current < minutes(entry.opens))) return `Closed · opens ${offset === 0 ? 'today' : day} at ${entry.opens}`;
  }
  return 'Closed · see opening hours';
}

/** Consecutive days with the same schedule share a row and a static badge label. */
export function hoursGroups(hours: readonly OpeningHours[]) {
  const groups: { first: Day; last: Day; opens?: string; closes?: string }[] = [];
  for (const day of DAYS) {
    const entry = hours.find(value => value.day === day);
    if (!entry) continue;
    const prev = groups.at(-1);
    if (prev && prev.opens === entry.opens && prev.closes === entry.closes) prev.last = day;
    else groups.push({ first: day, last: day, opens: entry.opens, closes: entry.closes });
  }
  return groups;
}

export function shortDayRange(first: Day, last: Day) {
  return first === last ? first.slice(0, 3) : `${first.slice(0, 3)}–${last.slice(0, 3)}`;
}

export function compactTime(value: string) {
  const [hour, minute] = value.split(':').map(Number);
  return `${hour % 12 || 12}${minute ? `:${String(minute).padStart(2, '0')}` : ''}`;
}

export function neutralHoursLabel(hours: readonly OpeningHours[]) {
  const open = hoursGroups(hours).flatMap(({ first, last, opens, closes }) =>
    opens && closes ? [`${shortDayRange(first, last)} ${compactTime(opens)}–${compactTime(closes)}`] : []);
  return open.length ? `Hours: ${open.join(', ')}` : 'See opening hours';
}

export function todayHoursLabel(hours: readonly OpeningHours[], timeZone: string, now = new Date()): string {
  const time = workshopClock(timeZone, now);
  if (!time) return neutralHoursLabel(hours);
  const today = hours.find(entry => entry.day === DAYS[time.dayIndex]);
  return today?.opens && today.closes ? `Today ${today.opens}–${today.closes}` : 'Closed today';
}
