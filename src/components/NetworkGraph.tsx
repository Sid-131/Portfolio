const cx = 225;
const cy = 225;
const r = 155;

const skills = [
  { label: 'Product Thinking', color: '#2d60ce' },
  { label: 'User Research',    color: '#e27500' },
  { label: 'Technical Depth', color: '#00512f' },
  { label: 'Execution',        color: '#2d60ce' },
  { label: 'Visibility',       color: '#e27500' },
  { label: 'Networking',       color: '#00512f' },
];

const nodes = skills.map((s, i) => {
  const deg = i * 60 - 90;
  const rad = (deg * Math.PI) / 180;
  return { ...s, x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
});

export default function NetworkGraph() {
  return (
    <div className="mx-auto w-full max-w-[420px]">
      <svg viewBox="0 0 450 450" className="w-full h-full">
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke="rgba(234,234,234,0.1)"
          strokeWidth="1"
          strokeDasharray="6 4"
        />

        {nodes.map((node, i) => (
          <line
            key={`line-${i}`}
            x1={cx} y1={cy} x2={node.x} y2={node.y}
            stroke="rgba(234,234,234,0.06)"
            strokeWidth="1"
          />
        ))}

        <circle cx={cx} cy={cy} r="10" fill="#eaeaea" />
        <text
          x={cx} y={cy + 26}
          textAnchor="middle"
          fill="#eaeaea"
          fontSize="8"
          fontFamily="'JetBrains Mono', monospace"
          letterSpacing="0.12em"
          opacity="0.4"
        >
          SIDDHANT
        </text>

        <g style={{ transformOrigin: `${cx}px ${cy}px`, animation: 'orbit 22s linear infinite' }}>
          {nodes.map((node, i) => (
            <g key={`node-${i}`}>
              <circle cx={node.x} cy={node.y} r="7" fill={node.color} />
              <circle cx={node.x} cy={node.y} r="13" fill="none" stroke={node.color} strokeWidth="0.8" opacity="0.45" />

              <g style={{ transformOrigin: `${node.x}px ${node.y}px`, animation: 'counter-orbit 22s linear infinite' }}>
                <text
                  x={node.x}
                  y={node.y - 20}
                  textAnchor="middle"
                  fill="#eaeaea"
                  fontSize="9"
                  fontFamily="'JetBrains Mono', monospace"
                  letterSpacing="0.06em"
                  opacity="0.65"
                  fontWeight="500"
                >
                  {node.label}
                </text>
              </g>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
