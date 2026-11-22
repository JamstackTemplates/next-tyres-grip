"use client";

import { useEffect, useState } from 'react';
import { neutralHoursLabel, openingLabel, todayHoursLabel, type OpeningHours } from '../lib/hours';
import { site } from '../lib/site';

export function OpenBadge({ hours, today = false }: { hours: readonly OpeningHours[]; today?: boolean }) {
  const [label, setLabel] = useState(() => neutralHoursLabel(hours));
  useEffect(() => {
    const labelForTime = today ? todayHoursLabel : openingLabel;
    const update = () => setLabel(labelForTime(hours, site.timeZone));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours, today]);

  return <span className="open-badge" data-state={label.startsWith('Open now') ? 'open' : undefined}>{label}</span>;
}
