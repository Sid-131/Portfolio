export default function NetworkGraph() {
  const cx = 225;
  const cy = 225;
  const r = 140;

  // Positions for 3 orbiting nodes at 0°, 120°, 240°
  const nodes = [0, 120, 240].map((deg) => {
    const rad = (deg * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  });

  return (
    <div className="mx-auto w-full max-w-[450px]">
      <div className="relative border border-hairline" style={{ borderRadius: '50%' }}>
        <svg viewBox="0 0 450 450" className="w-full h-full">
          {/* Dashed orbit path */}
          <circle
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke="rgba(58, 58, 56, 0.15)"
            strokeWidth="1"
            strokeDasharray="6 4"
          />

          {/* Connecting lines from center to nodes */}
          {nodes.map((node, i) => (
            <line
              key={`line-${i}`}
              x1={cx} y1={cy}
              x2={node.x} y2={node.y}
              stroke="rgba(58, 58, 56, 0.2)"
              strokeWidth="1"
            />
          ))}

          {/* Central node */}
          <circle cx={cx} cy={cy} r="8" fill="#1A3C2B" />

          {/* Orbiting nodes group (animated) */}
          <g style={{ transformOrigin: `${cx}px ${cy}px`, animation: 'orbit 20s linear infinite' }}>
            {nodes.map((node, i) => {
              const colors = ['#FF8C69', '#9EFFBF', '#F4D35E'];
              return (
                <g key={`node-${i}`}>
                  <circle cx={node.x} cy={node.y} r="6" fill={colors[i]} />
                  <circle cx={node.x} cy={node.y} r="10" fill="none" stroke={colors[i]} strokeWidth="0.5" opacity="0.4" />
                </g>
              );
            })}
          </g>

          {/* Labels */}
          <text x={cx} y={cy + 28} textAnchor="middle" fill="#1A3C2B" fontSize="8" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.1em">
            PRODUCT
          </text>
        </svg>
      </div>
    </div>
  );
}
