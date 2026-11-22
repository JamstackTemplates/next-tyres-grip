import type { ReactNode } from 'react';
import { ChalkRule } from './workshop';
import { Sidewall, TreadBand } from './workshop-art';

export function PageHead({ eyebrow, title, children, dark = false }: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  dark?: boolean;
}) {
  return <header className={`relative isolate overflow-hidden border-b border-line ${dark ? 'rubber' : 'concrete'}`}>
    <div className="page-head-art -z-10"><Sidewall /></div>
    <div className="wrap py-10 md:py-16 lg:py-20"><div className="page-head-copy">
      <p className={`eyebrow mb-4 ${dark ? 'text-[#d8d7cf]' : 'text-accent-ink'}`}>{eyebrow}</p>
      <h1 className="mb-4 max-w-[17ch] text-[clamp(1.82rem,5.4vw,4.6rem)] leading-[1.16]">{title}</h1>
      <ChalkRule />
      {children && <div className={`mt-4 max-w-[50ch] text-lg ${dark ? 'text-[#dfdfd8]' : 'text-muted'}`}>{children}</div>}
    </div></div>
    {dark && <TreadBand className="!h-2.5" />}
  </header>;
}
