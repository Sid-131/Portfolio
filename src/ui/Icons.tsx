type P = { size?: number };

const base = (size: number) => ({
  width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
  'aria-hidden': true,
});

export const Ext = ({ size = 14 }: P) => (<svg {...base(size)}><path d="M7 17 17 7M9 7h8v8" /></svg>);
export const Down = ({ size = 16 }: P) => (<svg {...base(size)}><path d="M12 5v14M6 13l6 6 6-6" /></svg>);
export const Sun = ({ size = 18 }: P) => (<svg {...base(size)}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>);
export const Moon = ({ size = 18 }: P) => (<svg {...base(size)}><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" /></svg>);
export const Pause = ({ size = 16 }: P) => (<svg {...base(size)}><path d="M9 5v14M15 5v14" /></svg>);
export const Play = ({ size = 16 }: P) => (<svg {...base(size)}><path d="M7 5v14l12-7Z" /></svg>);
export const Menu = ({ size = 18 }: P) => (<svg {...base(size)}><path d="M4 8h16M4 16h16" /></svg>);
export const Close = ({ size = 18 }: P) => (<svg {...base(size)}><path d="M6 6l12 12M18 6 6 18" /></svg>);
export const Check = ({ size = 18 }: P) => (<svg {...base(size)}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>);
export const Info = ({ size = 16 }: P) => (<svg {...base(size)}><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>);
export const Left = ({ size = 18 }: P) => (<svg {...base(size)}><path d="M15 6l-6 6 6 6" /></svg>);
export const Right = ({ size = 18 }: P) => (<svg {...base(size)}><path d="M9 6l6 6-6 6" /></svg>);
export const Plus = ({ size = 16 }: P) => (<svg {...base(size)}><path d="M12 5v14M5 12h14" /></svg>);
export const Award = ({ size = 18 }: P) => (<svg {...base(size)}><circle cx="12" cy="9" r="5" /><path d="m9 13.5-1.5 7L12 18l4.5 2.5-1.5-7" /></svg>);
export const Cap = ({ size = 18 }: P) => (<svg {...base(size)}><path d="M3 9l9-4 9 4-9 4-9-4Z" /><path d="M7 11v4c0 1.5 2.5 3 5 3s5-1.5 5-3v-4" /></svg>);

/* Playground glyphs: simple line drawings, one per project type */
export function Glyph({ name }: { name: string }) {
  const s = { width: 120, height: 72, viewBox: '0 0 120 72', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };
  switch (name) {
    case 'flow':
      return (<svg {...s}><rect x="6" y="26" width="26" height="20" rx="5" /><rect x="47" y="8" width="26" height="20" rx="5" /><rect x="47" y="44" width="26" height="20" rx="5" /><rect x="88" y="26" width="26" height="20" rx="5" stroke="var(--accent)" /><path d="M32 36h6l9-18M38 36l9 18M73 18h6l9 18M73 54h6l9-18" /></svg>);
    case 'doc':
      return (<svg {...s}><rect x="38" y="6" width="44" height="60" rx="6" /><path d="M48 20h24M48 30h24M48 40h14" /><circle cx="76" cy="52" r="9" stroke="var(--accent)" /><path d="m82.5 58.5 6 6" stroke="var(--accent)" /></svg>);
    case 'display':
      return (<svg {...s}><rect x="8" y="12" width="48" height="32" rx="4" /><rect x="64" y="12" width="48" height="32" rx="4" stroke="var(--accent)" /><path d="M26 58h12M32 44v14M82 58h12M88 44v14" /><path d="M54 28h12" strokeDasharray="2 4" /></svg>);
    case 'wallet':
      return (<svg {...s}><rect x="22" y="16" width="62" height="42" rx="8" /><path d="M84 30H70a7 7 0 0 0 0 14h14" /><circle cx="71" cy="37" r="1.5" fill="currentColor" /><path d="M92 20h12a4 4 0 0 1 4 4v10" stroke="var(--accent)" /><path d="m104 30 4 4 4-4" stroke="var(--accent)" /></svg>);
    case 'shield':
      return (<svg {...s}><path d="M60 8 36 17v18c0 15 10 24 24 29 14-5 24-14 24-29V17Z" /><path d="M48 18v18c0 9 5 15 12 18 7-3 12-9 12-18V18" stroke="var(--accent)" /><path d="m54 35 4 4 8-9" /></svg>);
    case 'rack':
      return (<svg {...s}><rect x="30" y="6" width="60" height="60" rx="6" /><path d="M30 26h60M30 46h60" /><circle cx="78" cy="16" r="2.4" fill="var(--ok)" stroke="none" /><circle cx="78" cy="36" r="2.4" fill="var(--ok)" stroke="none" /><circle cx="78" cy="56" r="2.4" fill="var(--accent)" stroke="none" /><path d="M40 16h22M40 36h22M40 56h22" /></svg>);
    default:
      return (<svg {...s}><path d="M18 50h30V28h26v16h22" /><rect x="94" y="40" width="8" height="8" rx="2" fill="var(--accent)" stroke="none" /><rect x="40" y="16" width="6" height="6" rx="1.5" /></svg>);
  }
}
