export function Ticker() {
  const items = [
    '3.5 Years at Dell',
    '1,000+ Incidents Resolved',
    '4 Shipped Products',
    'Top 3% at Dell',
    'Game Changer Award',
    'Available for PM Roles',
    'RAG Chatbot in Production',
    '19-Container Homelab',
    'NextLeap PM Fellowship',
    'Lumynex v1.0 Shipped',
    'Relay.app Teardown Published',
    '$0/month Infrastructure',
  ];

  const text = items.map(item => `${item}`).join('  ·  ');

  return (
    <div
      className="relative z-20 overflow-hidden py-4"
      style={{
        borderTop: '1px solid rgba(234,234,234,0.06)',
        borderBottom: '1px solid rgba(234,234,234,0.06)',
        background: '#1c1f22',
      }}
    >
      <div
        className="ticker-track flex whitespace-nowrap"
        style={{ animation: 'ticker 32s linear infinite' }}
        onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused')}
        onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.animationPlayState = 'running')}
      >
        <span className="font-mono text-xs uppercase tracking-widest text-deep/50 pr-8">
          {text}&nbsp;&nbsp;·&nbsp;&nbsp;
        </span>
        <span className="font-mono text-xs uppercase tracking-widest text-deep/50 pr-8" aria-hidden>
          {text}&nbsp;&nbsp;·&nbsp;&nbsp;
        </span>
      </div>
    </div>
  );
}
