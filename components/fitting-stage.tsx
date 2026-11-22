import type { CSSProperties, ReactNode } from 'react';
import { Icon, type IconName } from './workshop-art';

export function FittingStage({ step, icon, title, children }: { step: number; icon: IconName; title: string; children: ReactNode }) {
  return <li className="fit-stage" style={{ '--stage': step } as CSSProperties}>
    <div className="mb-2 flex items-center justify-between gap-3">
      <span className="font-display text-3xl leading-tight text-chalk" aria-hidden="true">0{step}</span><Icon name={icon} />
    </div>
    <h3 className="text-[clamp(.94rem,1.7vw,1.16rem)]">{title}</h3>
    <p className="mt-2 max-w-[24ch] text-sm text-[#e0dfd6]">{children}</p>
  </li>;
}
