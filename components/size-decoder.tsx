"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { exampleSize, sidewall } from '../content/sidewall';

export function SizeDecoder({ art }: { art: ReactNode }) {
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  useEffect(() => setReady(true), []);

  function move(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const last = sidewall.length - 1;
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? last
      : (index + (event.key === 'ArrowRight' ? 1 : last)) % sidewall.length;
    buttons.current[next]?.focus();
  }

  return <div>
    <div className="decoder-cut">
      {art}
      {ready ? <div className="decoder-controls" role="group" aria-label={`Decode ${exampleSize}`}>
        {sidewall.map(({ id, text, prefix, label }, index) => <button key={id} type="button" className="decoder-key"
          ref={node => { buttons.current[index] = node; }} aria-pressed={active === index}
          aria-label={`${text} — ${label}`} onFocus={() => setActive(index)} onClick={() => setActive(index)}
          onKeyDown={event => move(event, index)}>{prefix.trim()}{text}</button>)}
      </div> : <p className="decoder-static">{exampleSize}</p>}
    </div>
    {ready ? <div className="decoder-note min-h-28 p-4 md:p-6" aria-live="polite" aria-atomic="true">
      <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
        <p className="spec font-bold text-chalk">{sidewall[active].text} · {sidewall[active].label}</p>
        <span className="font-mono text-[.7rem] tracking-[.1em] uppercase text-[#a3a6ac]">Segment {active + 1} of {sidewall.length} · ← → keys</span>
      </div>
      <p>{sidewall[active].explanation}</p>
    </div> : <dl className="grid gap-4 border border-line bg-surface p-5 sm:grid-cols-2">
      {sidewall.map(({ id, text, label, explanation }) => <div key={id}>
        <dt className="spec font-bold">{text} · {label}</dt><dd>{explanation}</dd>
      </div>)}
    </dl>}
  </div>;
}
