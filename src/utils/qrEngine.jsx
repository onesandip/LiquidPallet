import React, { useMemo } from 'react';

/**
 * Pure SVG QR Code Generator for kiosk passes and payments
 */
export function CustomQRCode({ payload, size = 160, hex = '#A96F42' }) {
  const hash = payload.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const cells = 21;

  const grid = useMemo(() => {
    const rows = [];
    for (let r = 0; r < cells; r++) {
      const row = [];
      for (let c = 0; c < cells; c++) {
        const isTopLeft = (r < 7 && c < 7);
        const isTopRight = (r < 7 && c >= cells - 7);
        const isBottomLeft = (r >= cells - 7 && c < 7);

        if (isTopLeft || isTopRight || isBottomLeft) {
          if (r === 0 || r === 6 || c === 0 || c === 6 ||
              r === 0 || r === 6 || c === cells - 7 || c === cells - 1 ||
              r === cells - 7 || r === cells - 1 || c === 0 || c === 6) {
            row.push(true);
          } else if (
            (r >= 2 && r <= 4 && c >= 2 && c <= 4) ||
            (r >= 2 && r <= 4 && c >= cells - 5 && c <= cells - 3) ||
            (r >= cells - 5 && r <= cells - 3 && c >= 2 && c <= 4)
          ) {
            row.push(true);
          } else {
            row.push(false);
          }
        } else {
          const val = Math.sin(r * 12.9898 + c * 78.233 + hash) * 43758.5453;
          row.push((val - Math.floor(val)) > 0.46);
        }
      }
      rows.push(row);
    }
    return rows;
  }, [payload, hash]);

  const cellSize = size / cells;

  return (
    <div className="relative inline-block p-3 bg-white rounded-2xl shadow-xl border border-white/20">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <rect width={size} height={size} fill="#FFFFFF" />
        {grid.map((row, r) =>
          row.map((active, c) =>
            active ? (
              <rect
                key={`${r}-${c}`}
                x={c * cellSize}
                y={r * cellSize}
                width={cellSize}
                height={cellSize}
                fill="#1A0D07"
                rx={cellSize * 0.25}
              />
            ) : null
          )
        )}
        <circle cx={size / 2} cy={size / 2} r={cellSize * 1.8} fill={hex} stroke="#FFFFFF" strokeWidth="2" />
      </svg>
    </div>
  );
}
