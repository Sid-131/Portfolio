const cx = 225;
const cy = 225;
const r = 155;

const skills = [
  { label: 'Product Thinking', color: '#B8DCF0' },
  { label: 'User Research',    color: '#6BAF7E' },
  { label: 'Technical Depth', color: '#3D8B37' },
  { label: 'Execution',        color: '#B8DCF0' },
  { label: 'Visibility',       color: '#6BAF7E' },
  { label: 'Networking',       color: '#3D8B37' },
];

const nodes = skills.map((s, i) => {
  const deg = i * 60 - 90; // start from top
  const rad = (deg * Math.PI) / 180;
  return { ...s, x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
});

export default function NetworkGraph() {
  return (
    <div className="mx-auto w-full max-w-[420px]">
      <svg viewBox="0 0 450 450" className="w-full h-full">
        {/* Dashed orbit ring */}
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke="rgba(43,64,53,0.12)"
          strokeWidth="1"
          strokeDasharray="6 4"
        />

        {/* Spoke lines */}
        {nodes.map((node, i) => (
          <line
            key={`line-${i}`}
            x1={cx} y1={cy} x2={node.x} y2={node.y}
            stroke="rgba(43,64,53,0.1)"
            strokeWidth="1"
          />
        ))}

        {/* Center node */}
        <circle cx={cx} cy={cy} r="10" fill="#2B4035" />
        <text
          x={cx} y={cy + 26}
          textAnchor="middle"
          fill="#2B4035"
          fontSize="8"
          fontFamily="'DM Mono', monospace"
          letterSpacing="0.12em"
          opacity="0.45"
        >
          SIDDHANT
        </text>

        {/* Orbiting group — rotates around center */}
        <g style={{ transformOrigin: `${cx}px ${cy}px`, animation: 'orbit 22s linear infinite' }}>
          {nodes.map((node, i) => (
            <g key={`node-${i}`}>
              {/* Dot */}
              <circle cx={node.x} cy={node.y} r="7" fill={node.color} />
              <circle cx={node.x} cy={node.y} r="13" fill="none" stroke={node.color} strokeWidth="0.8" opacity="0.45" />

              {/* Counter-rotating label so text stays upright */}
              <g style={{ transformOrigin: `${node.x}px ${node.y}px`, animation: 'counter-orbit 22s linear infinite' }}>
                <text
                  x={node.x}
                  y={node.y - 20}
                  textAnchor="middle"
                  fill="#2B4035"
                  fontSize="9"
                  fontFamily="'DM Mono', monospace"
                  letterSpacing="0.06em"
                  opacity="0.75"
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
