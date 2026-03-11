export default function MosaicBackground() {
  const stroke = 'rgba(58, 58, 56, 0.12)';
  const sw = 0.5;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="mosaic" x="0" y="0" width="400" height="300" patternUnits="userSpaceOnUse">
            {/* Large square top-left */}
            <rect x="0" y="0" width="160" height="140" fill="none" stroke={stroke} strokeWidth={sw} />
            {/* Horizontal strip top-right */}
            <rect x="160" y="0" width="240" height="60" fill="none" stroke={stroke} strokeWidth={sw} />
            {/* Vertical block mid-right */}
            <rect x="160" y="60" width="120" height="140" fill="none" stroke={stroke} strokeWidth={sw} />
            {/* Small square */}
            <rect x="280" y="60" width="120" height="80" fill="none" stroke={stroke} strokeWidth={sw} />
            {/* Bottom-right block */}
            <rect x="280" y="140" width="120" height="60" fill="none" stroke={stroke} strokeWidth={sw} />
            {/* Bottom-left wide */}
            <rect x="0" y="140" width="160" height="80" fill="none" stroke={stroke} strokeWidth={sw} />
            {/* Bottom strip */}
            <rect x="0" y="220" width="240" height="80" fill="none" stroke={stroke} strokeWidth={sw} />
            {/* Bottom-right tall */}
            <rect x="240" y="200" width="160" height="100" fill="none" stroke={stroke} strokeWidth={sw} />
            {/* Mid square */}
            <rect x="160" y="200" width="80" height="60" fill="none" stroke={stroke} strokeWidth={sw} />
            {/* Extra divider */}
            <rect x="160" y="260" width="80" height="40" fill="none" stroke={stroke} strokeWidth={sw} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mosaic)" />
      </svg>
    </div>
  );
}
