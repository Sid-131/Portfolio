export function RotatingText() {
  const text = "Let's work together ✱ Let's work together ✱ Let's work together ✱ ";

  return (
    <div style={{ width: 160, height: 160, position: 'relative', flexShrink: 0 }}>
      <svg
        viewBox="0 0 160 160"
        style={{ animation: 'rotate-cw 12s linear infinite', width: '100%', height: '100%' }}
      >
        <defs>
          <path
            id="rotText"
            d="M 80,80 m -58,0 a 58,58 0 1,1 116,0 a 58,58 0 1,1 -116,0"
          />
        </defs>
        <text fontSize="10.5" fill="currentColor" className="text-deep/40 font-mono uppercase tracking-widest">
          <textPath href="#rotText">{text}</textPath>
        </text>
      </svg>
      {/* Center arrow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-deep/40" />
        </svg>
      </div>
    </div>
  );
}
