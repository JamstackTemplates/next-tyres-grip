import { useId } from 'react';
import { business } from '../content/business';
import { exampleSize } from '../content/sidewall';

type WheelFinish = 'gloss black' | 'machined silver' | 'gunmetal' | 'satin bronze' | 'black powdercoat' | 'hyper silver';
const finishes: Record<WheelFinish, [string, string]> = {
  'gloss black': ['#555d63', '#a8adb0'],
  'machined silver': ['#9fa7aa', '#e2e5e5'],
  gunmetal: ['#727b82', '#b0bcc1'],
  'satin bronze': ['#a27e56', '#d8b990'],
  'black powdercoat': ['#44484b', '#777e82'],
  'hyper silver': ['#adb4b7', '#ebefec'],
};

function Rim({ spokes, finish, lugs }: { spokes: number; finish: string; lugs: number }) {
  const [metal, edge] = finishes[finish as WheelFinish] ?? finishes['machined silver'];
  const steel = spokes === 0;
  const count = steel ? 12 : spokes === 20 ? 10 : spokes;
  return <g strokeLinejoin="round">
    <circle r="98" fill="#121416" stroke="#090a0b" strokeWidth="4" />
    <circle r="93" fill={metal} stroke={edge} strokeWidth="2" />
    <circle r="85" fill={steel ? metal : '#1a1c1e'} stroke="#0f1011" strokeWidth="4" />
    <circle r="69" fill="none" stroke={steel ? edge : '#3c4043'} strokeWidth={steel ? 1 : 7} />
    {Array.from({ length: count }, (_, index) => <g key={index} transform={`rotate(${index * 360 / count})`}>
      {steel ? <ellipse cy="-70" rx="7" ry="10" fill="#101113" stroke={edge} strokeWidth="1.5" />
        : spokes === 20 ? <>
          <path d="M-5-22 -15-82 -7-85 1-49 7-85 15-82 5-22Z" fill={metal} stroke={edge} strokeWidth="1.2" />
          <path d="m-2-31 2-15 3 15" fill="none" stroke="#26292c" strokeWidth="1.5" />
        </> : <path d={spokes <= 6 ? 'M-13-23 -20-81 -10-87 13-87 19-78 12-26Z' : 'M-7-23 -12-80 -6-86 9-86 11-79 6-23Z'}
          fill={metal} stroke={edge} strokeWidth="1.7" />}
      {!steel && spokes <= 6 && <path d="m-9-33-8-44 6-5 4 42Z" fill="#e4e8e5" opacity=".22" />}
    </g>)}
    <circle r="31" fill={metal} stroke={edge} strokeWidth="2" />
    {Array.from({ length: lugs }, (_, index) => <g key={index} transform={`rotate(${index * 360 / lugs})`}>
      <path d="m-4-23 4-2 4 2v5l-4 2-4-2z" fill="#1a1c1d" stroke={edge} strokeWidth="1.3" />
    </g>)}
    <circle r="12" fill="#272a2d" stroke={edge} strokeWidth="1.4" />
    <path d="m-5 4 4-8h6L1 4Z" fill="#c62536" />
    <path d="M70 57l-5-8m2 11 6-4" fill="none" stroke="#c1c6c6" strokeWidth="2.4" />
  </g>;
}

export function WheelFace({ spokes, finish, lugs }: { spokes: number; finish: string; lugs: number }) {
  return <svg viewBox="-106 -106 212 212" className="wheel-face" aria-hidden="true"><Rim spokes={spokes} finish={finish} lugs={lugs} /></svg>;
}

export function Sidewall({ className = '', decoder = false }: { className?: string; decoder?: boolean }) {
  const id = useId().replace(/[^a-zA-Z0-9-]/g, '');
  const upper = `${id}-upper`, lower = `${id}-lower`, grain = `${id}-grain`, sheen = `${id}-sheen`;
  return <svg className={className} viewBox="0 0 690 690" fill="none" aria-hidden="true">
    <defs>
      <radialGradient id={sheen} cx=".35" cy=".25" r=".78">
        <stop stopColor="#414549" /><stop offset=".56" stopColor="#242629" /><stop offset="1" stopColor="#0d0e10" />
      </radialGradient>
      <filter id={grain} x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency=".72" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" /><feComponentTransfer><feFuncA type="linear" slope=".18" /></feComponentTransfer>
        <feComposite in2="SourceGraphic" operator="in" /><feBlend in2="SourceGraphic" mode="soft-light" />
      </filter>
      <path id={upper} d="M 102,395 A 248,248 0 1,1 591,370" />
      <path id={lower} d="M 150,475 A 232,232 0 0,0 541,475" />
    </defs>
    <g transform="translate(345 345)">
      <circle r="328" fill="#101113" stroke="#0b0c0d" strokeWidth="5" />
      <circle r="322" fill={`url(#${sheen})`} stroke="#3a3d40" strokeWidth="2" />
      {Array.from({ length: 52 }, (_, index) => <g key={index} transform={`rotate(${index * 360 / 52})`}>
        <path d="M-15-320 7-322 17-314 8-297-9-285-18-294Z" fill={index % 2 ? '#323538' : '#2a2d30'} stroke="#101112" strokeWidth="2.5" />
        <path d="m-9-314 12-2 5 4-9 12m-10-4 7-6" stroke="#5b5e5f" strokeWidth="1.5" />
        <path d="m14-305 6-10m-27 32 8-4" stroke="#141618" strokeWidth="2" />
      </g>)}
      <circle r="283" fill="#101113" stroke="#515458" strokeWidth="2" />
      <circle r="278" fill={`url(#${sheen})`} filter={`url(#${grain})`} />
      <circle r="273" stroke="#76797a" strokeOpacity=".39" />
      <circle r="265" stroke="#131517" strokeWidth="2" />
      <circle r="222" stroke="#44484b" strokeWidth="2" />
      <circle r="217" stroke="#101214" strokeWidth="2" />
      <circle r="203" stroke="#36393c" strokeWidth="5" strokeDasharray="1.5 5.5" />
      <circle r="181" stroke="#555a5d" strokeWidth="1.4" strokeDasharray="3 3" />
      <circle r="160" stroke="#111214" strokeWidth="9" />
      <circle r="157" stroke="#b81d2c" strokeWidth="2.5" opacity=".95" />
      <g transform="rotate(142)"><rect x="-24" y="-212" width="48" height="19" rx="9.5" fill="#17191c" stroke="#555a5d" strokeWidth="1.6" /></g>
      <g transform="scale(1.55) rotate(-10)"><Rim spokes={5} finish="machined silver" lugs={5} /></g>
      <path d="m-183 78 10 16 27-41m-34 30 8 13 26-42" stroke="#f2c230" strokeWidth="4" strokeLinecap="round" />
      <g transform="translate(-153 135) rotate(-23)" stroke="#f2c230" strokeWidth="3.7" strokeLinecap="round">
        <path d="M7-15C-7-16-7 6 3 7s14-20 4-22ZM18 7l3-23m11 1L21-4 32 6" />
      </g>
      <path d="M-194-133l-10 6m3-14-6 5m388 29 13-7m-8 14 9-4" stroke="#777b7b" opacity=".65" strokeWidth="2" />
    </g>
    <g className="moulded-svg">
      <text className="sidewall-lettering" fontSize="19" letterSpacing="1.15"><textPath href={`#${upper}`} startOffset="50%" textAnchor="middle">
        {business.wordmark.toUpperCase()} · TUBELESS RADIAL · {exampleSize} · {business.address.suburb.toUpperCase()} {business.address.region}
      </textPath></text>
      {!decoder && <>
        <text fontSize="14" letterSpacing="3.5"><textPath href={`#${lower}`} startOffset="50%" textAnchor="middle">ROTATION  ›››   ·   STEEL BELTED RADIAL</textPath></text>
        <text x="345" y="149" fontSize="11.5" textAnchor="middle" letterSpacing="2">DOT 88FL</text>
      </>}
    </g>
  </svg>;
}

export function TreadBand({ variant = 'full', className = '' }: { variant?: 'full' | 'worn' | 'indicator'; className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9-]/g, '');
  return <div className={`tread-band tread-${variant} ${className}`} aria-hidden="true">
    <svg width="100%" height="100%">
      <defs><pattern id={id} width="92" height="36" patternUnits="userSpaceOnUse">
        <path d={variant === 'worn' ? 'M0 2h22l20 16-20 16H0l18-16ZM48 2h23l20 16-20 16H48l20-16Z' : 'M1 1h21l23 17-23 17H1l19-17ZM47 1h21l23 17-23 17H47l19-17Z'} fill="currentColor" stroke="#141618" strokeWidth="2" />
        <path d="m11 5 15 13-15 13m46-26 15 13-15 13" fill="none" stroke="#777a7b" strokeWidth="1" opacity=".34" />
        {variant === 'indicator' && <path d="M0 18h92" stroke="#b81d2c" strokeWidth="3" />}
      </pattern></defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  </div>;
}

export function RackTyre() {
  return <svg viewBox="0 0 156 116" aria-hidden="true">
    <path d="M111 7c24 2 42 24 42 51s-19 50-43 51l-33 1c-29 0-47-24-47-52S50 8 76 8Z" fill="#242629" stroke="#101113" strokeWidth="3" />
    <path d="M89 9c26 0 50 24 50 49s-23 51-48 51m15-99c27 4 45 24 45 48s-18 45-42 50M97 13l12 8 18-1m-22 5 11 8 19-3m-25 7 11 8 22-4m-25 9 10 9 20-4m-26 8 9 8 16-2m-26 7 7 7 15-1m-29 6 6 6 15 0m-26 4 8 6" fill="none" stroke="#565a5d" strokeWidth="2" />
    <ellipse cx="73" cy="58" rx="45" ry="51" fill="#1b1d20" stroke="#08090a" strokeWidth="3" />
    <ellipse cx="73" cy="58" rx="37" ry="42" fill="none" stroke="#51565a" strokeWidth="2" />
    <ellipse cx="72" cy="58" rx="23" ry="29" fill="#303236" stroke="#0f1011" strokeWidth="6" />
    <path d="m42 77 5 5 9-15" fill="none" stroke="#f2c230" strokeWidth="2.5" strokeLinecap="round" />
  </svg>;
}

export function AlignmentDiagram({ dark = false }: { dark?: boolean }) {
  return <svg viewBox="0 0 660 310" className={dark ? 'diagram diagram-rubber' : 'diagram'} role="img" aria-label="Toe seen from above, camber seen from the front, and caster seen from the side">
    <rect x="1" y="1" width="658" height="308" rx="2" className="diagram-panel" />
    <path d="M30 54h600M30 260h600M222 54v206m215-206v206" className="diagram-grid" />
    <g className="diagram-label"><text x="31" y="36">TOE / TOP</text><text x="244" y="36">CAMBER / FRONT</text><text x="458" y="36">CASTER / SIDE</text></g>
    <g className="diagram-structure">
      <path d="M92 94q8-14 35-14t35 14l12 41v68l-10 21H90l-10-21v-68Z" />
      <path d="m93 126 14-26h40l15 26-20 16h-30Zm4 64h60l8 18H89Z" />
      <rect x="67" y="104" width="13" height="40" rx="2" transform="rotate(9 74 124)" />
      <rect x="175" y="104" width="13" height="40" rx="2" transform="rotate(-9 182 124)" />
      <rect x="69" y="178" width="13" height="39" rx="2" /><rect x="172" y="178" width="13" height="39" rx="2" />
      <path d="m262 157 18-31 15-6h72l17 7 17 30 6 8v23H254v-23Zm20 0 14-23h69l14 23Zm-21 13h19m100 0h20m-98 2h59" />
      <rect x="264" y="183" width="15" height="40" rx="2" transform="rotate(-9 271 203)" />
      <rect x="382" y="183" width="15" height="40" rx="2" transform="rotate(9 388 203)" />
      <circle cx="548" cy="183" r="47" /><circle cx="548" cy="183" r="29" /><circle cx="548" cy="183" r="9" />
      <path d="M472 159h25l21-17 15-29h92m-31 46h30m-28 48h28" />
    </g>
    <g className="diagram-measure">
      <path d="M127 67v165M69 88v61m116-61v61M269 180v48m123-48v48M548 78v157" strokeDasharray="5 5" />
      <path d="M58 111q8-14 23-10m-7-6 7 6-8 5m120 5q-8-14-23-10m7-6-7 6 8 5M246 204q7-14 20-15m-7-5 7 5-5 6m154 9q-7-14-20-15m7-5-7 5 5 6M572 101l-34 129m10-119q9-2 20 4m-6-7 6 7-9 2" />
    </g>
    <g className="diagram-label diagram-accent"><text x="98" y="247">TOE-IN °</text><text x="294" y="247">CAMBER °</text><text x="525" y="247">CASTER °</text></g>
    <text x="31" y="288" className="diagram-label">ANGLES EXAGGERATED FOR CLARITY</text>
  </svg>;
}

export function FitDiagram() {
  return <svg viewBox="0 0 550 348" className="diagram diagram-rubber" role="img" aria-label="Wheel cross-section with numbered callouts for diameter, width, offset, pitch circle and centre bore">
    <rect x="1" y="1" width="548" height="346" rx="2" className="diagram-panel" />
    <path d="M30 50h490M30 299h490" className="diagram-grid" />
    <g className="diagram-structure">
      <path d="M118 84h15v18h128V85h15v39h-30v154h30v-37h-15v18H133v-18h-15v37h26v-10h88V113h-88v11h-26Z" />
      <path d="M196 109v155m52-150v146M96 186h207" strokeDasharray="4 6" />
      <circle cx="421" cy="181" r="83" /><circle cx="421" cy="181" r="49" strokeDasharray="5 5" /><circle cx="421" cy="181" r="17" />
      {Array.from({ length: 5 }, (_, i) => <circle key={i} cx="421" cy="132" r="6" transform={`rotate(${i * 72} 421 181)`} />)}
    </g>
    <g className="diagram-measure">
      <path d="M100 103H72v157h28m-33-150 5-7 5 7m-10 143 5 7 5-7M131 91V65h130v26m-124-31-6 5 6 5m118-10 6 5-6 5M196 215h52m-45-5-7 5 7 5m38-10 7 5-7 5M371 181h100m-94-5-6 5 6 5m88-10 6 5-6 5M421 164v34" />
    </g>
    <g className="diagram-label diagram-accent"><text x="49" y="185">1</text><text x="188" y="58">2</text><text x="217" y="209">3</text><text x="482" y="186">4</text><text x="431" y="160">5</text></g>
    <g className="diagram-label"><text x="31" y="32">WHEEL / CROSS-SECTION</text><text x="31" y="326">BEAD SEAT, HUB FACE &amp; BOLT CIRCLE</text></g>
  </svg>;
}

export function TreadGauge() {
  return <svg viewBox="0 0 500 285" className="diagram diagram-rubber" role="img" aria-label="A depth gauge in a wide tread groove, with the 1.5 millimetre wear line marked beside a generic coin">
    <rect x="1" y="1" width="498" height="283" className="diagram-panel" />
    <path d="M28 169h50l11 53h28l12-53h89l13 53h43l12-53h76l10 53h27l11-53h61v77H28Z" fill="#3a3e42" stroke="#08090a" strokeWidth="3" />
    <path d="M231 222v-14h43v14m-40-15h38" fill="#b81d2c" stroke="#e37a83" strokeWidth="1.5" />
    <circle cx="152" cy="122" r="48" fill="#8a7852" stroke="#d8c28b" strokeWidth="3" />
    <circle cx="152" cy="122" r="39" fill="none" stroke="#c4ae76" strokeWidth="2" strokeDasharray="2 3" />
    <path d="M240 58h27v114h-27zM218 161h70v8h-70zM250 169h7v39h-7z" fill="#b8b9b6" stroke="#141618" strokeWidth="2" />
    <path d="M249 73h15m-11 12h11m-15 12h15m-11 12h11m-15 12h15m-11 12h11m-15 12h15" stroke="#363b3d" strokeWidth="2" />
    <path d="M280 208h116l17-18" className="diagram-measure" />
    <text x="343" y="182" className="diagram-label diagram-accent">1.5 MM</text>
    <text x="28" y="34" className="diagram-label">TREAD / PRINCIPAL GROOVE</text>
  </svg>;
}

export function VanSilhouette() {
  return <svg viewBox="0 0 124 52" className="van-silhouette" aria-hidden="true">
    <path d="M6 38V12q0-4 6-4h68q10 0 16 8l8 10 11 4 3 8v5H5Z" fill="currentColor" stroke="#111214" strokeWidth="2" />
    <path d="M83 13h6l12 14H83Z" fill="#35383c" /><path d="M75 12v26M14 33h49" stroke="#111214" strokeWidth="2" />
    <circle cx="29" cy="42" r="8" fill="#17181a" stroke="currentColor" strokeWidth="2" /><circle cx="96" cy="42" r="8" fill="#17181a" stroke="currentColor" strokeWidth="2" />
  </svg>;
}

export function FlatTyre() {
  return <svg viewBox="0 0 410 260" className="w-full max-w-[30rem]" aria-hidden="true">
    <path d="M21 231h366" stroke="#666b6e" strokeWidth="2" strokeDasharray="9 7" />
    <path d="M68 196C63 115 107 30 205 25c90-5 146 60 145 143-1 59-29 63-66 63H110q-47 0-42-35Z" fill="#26282b" stroke="#08090a" strokeWidth="5" />
    <path d="M92 206C75 139 128 42 207 42c80 0 135 68 118 143-6 28-25 34-53 34H125Z" fill="none" stroke="#565b60" strokeWidth="4" />
    <path d="M101 211l20 12m9-11 17 13m13-13 19 13m20-12 17 12m20-13 17 12m18-13 17 11m14-13 19 1" stroke="#0c0d0e" strokeWidth="4" />
    <g transform="translate(210 145) scale(.73)"><Rim spokes={5} finish="machined silver" lugs={5} /></g>
    <path d="m319 203 39-30m-6-7 13 14" stroke="#c6c8c7" strokeWidth="5" strokeLinecap="round" />
    <path d="M105 151q3-12 13-12 16 1 10 13c-3 7-11 7-11 16m-1 10 0 2" stroke="#f2c230" strokeWidth="4" strokeLinecap="round" fill="none" />
  </svg>;
}

const marks = {
  pin: 'M12 22s7-6 7-13a7 7 0 1 0-14 0c0 7 7 13 7 13Zm0-10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-16v6l4 2',
  valve: 'M6 21h12v-4h-4V5h2V2H8v3h2v12H6Z',
  lug: 'M7 3h10l5 9-5 9H7l-5-9Zm5 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
  torque: 'm14 10-8 11a2 2 0 0 1-3-3l10-9a6 6 0 0 1 7-7l-4 4 2 2 4-4a6 6 0 0 1-8 6Z',
  balance: 'M4 7h16l2 13H2Zm4 0 1-4h6l1 4m-7 6h6m-3-3v6',
  tpms: 'M4 3c-5 6-4 14 1 18h14c5-4 6-12 1-18M12 6v7m0 4v1M5 19l2-2m10 0 2 2',
  alignment: 'M12 2v20M3 8l4 4-4 4m18-8-4 4 4 4M2 12h5m10 0h5',
  puncture: 'm5 20 12-12m-4-4 7 7m-9-9 11 11M3 21l3-1m1-6-4-2m6 7 3 3',
  pressure: 'M4 19a9 9 0 1 1 16 0Zm8-3 4-5M6 13h2m8 0h2m-6-6v2',
  van: 'M2 17V5h12l4 4 4 2v6h-3m-5 0H8m-5 0H2m6 0a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Zm11 0a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0ZM14 5v6h7',
  steering: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm-9-4 7 2m4 0 7-2m-9 4v7',
  wear: 'M4 3h16v18H4Zm0 3 8 3 8-3M4 11l8 3 8-3M4 16l8 3 8-3',
  check: 'm4 12 5 6L21 5',
};

export type IconName = keyof typeof marks;
export function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  return <svg className={`workshop-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={marks[name]} /></svg>;
}
