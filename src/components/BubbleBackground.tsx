const bubbleStyle = (
  size: number,
  top: string,
  pos: { left?: string; right?: string },
  delay: string,
  floatClass: string
) => ({
  outer: {
    position: 'absolute' as const,
    top,
    ...pos,
    width: size,
    height: size,
    animationDelay: delay,
  },
  inner: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    background:
      'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.85), rgba(184,220,240,0.3) 55%, rgba(107,175,126,0.12) 100%)',
    border: '1px solid rgba(255,255,255,0.7)',
    backdropFilter: 'blur(4px)',
  },
  floatClass,
});

const bubbles = [
  bubbleStyle(120, '7%',  { left: '4%' },   '0s',   'bubble-float-slow'),
  bubbleStyle(64,  '18%', { right: '9%' },  '1.2s', 'bubble-float-fast'),
  bubbleStyle(220, '44%', { left: '-60px' }, '2.5s', 'bubble-float-slow'),
  bubbleStyle(48,  '31%', { right: '26%' }, '0.6s', 'bubble-float-medium'),
  bubbleStyle(180, '62%', { right: '-40px' },'1.8s', 'bubble-float-medium'),
  bubbleStyle(72,  '11%', { left: '44%' },  '3.1s', 'bubble-float-fast'),
  bubbleStyle(96,  '76%', { left: '18%' },  '4.0s', 'bubble-float-slow'),
];

export default function BubbleBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Sky-to-cream gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(175deg, #A8D8F0 0%, #C2E5F5 20%, #D4EFE5 50%, #EBF6F0 75%, #FAF9F6 100%)',
        }}
      />
      {/* Floating bubbles */}
      {bubbles.map((b, i) => (
        <div key={i} className={b.floatClass} style={b.outer}>
          <div style={b.inner} />
        </div>
      ))}
    </div>
  );
}
