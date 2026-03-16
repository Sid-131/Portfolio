export default function NetworkGraph() {
  const cx = 225;
  const cy = 225;
  const r = 140;

  const nodes = [0, 120, 240].map((deg) => {
    const rad = (deg * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  });

  return (
    <div className="mx-auto w-full max-w-[380px]">
      <div className="glass-card overflow-hidden">
        <svg viewBox="0 0 450 450" className="w-full h-full">
          <circle
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke="rgba(43,64,53,0.12)"
            strokeWidth="1"
            strokeDasharray="6 4"
          />
          {nodes.map((node, i) => (
            <line
              key={`line-${i}`}
              x1={cx} y1={cy} x2={node.x} y2={node.y}
              stroke="rgba(43,64,53,0.12)"
              strokeWidth="1"
            />
          ))}
          <circle cx={cx} cy={cy} r="8" fill="#2B4035" />
          <g style={{ transformOrigin: `${cx}px ${cy}px`, animation: 'orbit 20s linear infinite' }}>
            {nodes.map((node, i) => {
              const colors = ['#B8DCF0', '#6BAF7E', '#3D8B37'];
              return (
                <g key={`node-${i}`}>
                  <circle cx={node.x} cy={node.y} r="6" fill={colors[i]} />
                  <circle cx={node.x} cy={node.y} r="11" fill="none" stroke={colors[i]} strokeWidth="0.5" opacity="0.5" />
                </g>
              );
            })}
          </g>
          <text x={cx} y={cy + 28} textAnchor="middle" fill="#2B4035" fontSize="8" fontFamily="'DM Mono', monospace" letterSpacing="0.1em" opacity="0.5">
            PRODUCT
          </text>
        </svg>
      </div>
    </div>
  );
}
