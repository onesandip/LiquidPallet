import React, { useEffect, useRef } from 'react';

export function CoffeeCupCanvas({ colorData, showWindowCallout = false, fillLevel = 1.0, isBrewing = false }) {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let t = 0;

    const bubbles = Array.from({ length: 24 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * (canvas.height * 0.7) + (canvas.height * 0.25),
      radius: Math.random() * 2.8 + 1.0,
      speed: Math.random() * 0.35 + 0.15,
      offset: Math.random() * Math.PI * 2
    }));

    const render = () => {
      t += 0.035;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;
      
      const liquidHeight = h * 0.78 * fillLevel;
      const topY = h * 0.88 - liquidHeight;

      if (liquidHeight > 10) {
        ctx.save();
        
        ctx.beginPath();
        ctx.moveTo(w * 0.14, h * 0.12);
        ctx.lineTo(w * 0.86, h * 0.12);
        ctx.lineTo(w * 0.77, h * 0.88);
        ctx.lineTo(w * 0.23, h * 0.88);
        ctx.closePath();
        ctx.clip();

        const gradient = ctx.createLinearGradient(0, topY, 0, h * 0.88);
        gradient.addColorStop(0, `rgb(${colorData.r}, ${colorData.g}, ${colorData.b})`);
        gradient.addColorStop(0.7, `rgb(${Math.max(0, colorData.r - 20)}, ${Math.max(0, colorData.g - 20)}, ${Math.max(0, colorData.b - 20)})`);
        gradient.addColorStop(1, `rgb(${Math.max(0, colorData.r - 35)}, ${Math.max(0, colorData.g - 35)}, ${Math.max(0, colorData.b - 35)})`);

        ctx.beginPath();
        ctx.moveTo(0, topY);
        for (let x = 0; x <= w; x += 4) {
          const wave1 = Math.sin(x * 0.03 + t) * (isBrewing ? 7 : 3.5);
          const wave2 = Math.cos(x * 0.05 - t * 0.8) * (isBrewing ? 5 : 2);
          ctx.lineTo(x, topY + wave1 + wave2);
        }
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();

        // Crema foam top edge
        ctx.beginPath();
        for (let x = 0; x <= w; x += 4) {
          const wave1 = Math.sin(x * 0.03 + t) * (isBrewing ? 7 : 3.5);
          const wave2 = Math.cos(x * 0.05 - t * 0.8) * (isBrewing ? 5 : 2);
          ctx.lineTo(x, topY + wave1 + wave2);
        }
        ctx.strokeStyle = `rgba(255, 245, 220, 0.45)`;
        ctx.lineWidth = 4;
        ctx.stroke();

        // Microbubbles
        bubbles.forEach(b => {
          b.y -= b.speed * (isBrewing ? 2.5 : 1);
          if (b.y < topY + 6) {
            b.y = h * 0.86;
            b.x = w * 0.25 + Math.random() * (w * 0.5);
          }
          const wobble = Math.sin(t + b.offset) * 3;
          ctx.beginPath();
          ctx.arc(b.x + wobble, b.y, b.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 250, 235, 0.45)`;
          ctx.fill();
        });

        // Brewing pouring stream
        if (isBrewing && fillLevel < 0.98) {
          ctx.beginPath();
          ctx.moveTo(w * 0.5 - 4, 0);
          ctx.lineTo(w * 0.5 + 4, 0);
          ctx.lineTo(w * 0.5 + 6, topY);
          ctx.lineTo(w * 0.5 - 6, topY);
          ctx.closePath();
          ctx.fillStyle = `rgba(${colorData.r}, ${colorData.g}, ${colorData.b}, 0.85)`;
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [colorData, fillLevel, isBrewing]);

  return (
    <div className="relative w-full max-w-[280px] mx-auto aspect-[3/4] flex items-center justify-center">
      <div
        className="absolute inset-4 rounded-full blur-3xl opacity-40 transition-colors duration-700 pointer-events-none"
        style={{ backgroundColor: colorData.hex }}
      />

      <canvas
        ref={canvasRef}
        width={280}
        height={360}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      <svg className="relative w-full h-full z-20" viewBox="0 0 280 360" fill="none">
        <defs>
          <linearGradient id="cupGlass" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.18" />
            <stop offset="15%" stopColor="#FFFFFF" stopOpacity="0.04" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.01" />
            <stop offset="85%" stopColor="#FFFFFF" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.22" />
          </linearGradient>

          <linearGradient id="cupSpec" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        <ellipse cx="140" cy="45" rx="100" ry="12" stroke="rgba(255,255,255,0.4)" strokeWidth="3" fill="none" />
        <ellipse cx="140" cy="45" rx="97" ry="10" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none" />

        <path
          d="M 40 45 L 65 315 C 68 332, 212 332, 215 315 L 240 45"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="2.5"
          fill="url(#cupGlass)"
        />

        <path
          d="M 52 48 L 74 310 C 75 312, 85 312, 84 310 L 68 48 Z"
          fill="url(#cupSpec)"
        />

        <ellipse cx="140" cy="315" rx="75" ry="10" stroke="rgba(255,255,255,0.25)" strokeWidth="2" fill="none" />

        {showWindowCallout && (
          <g className="transition-all duration-300">
            <rect
              x="96"
              y="160"
              width="88"
              height="88"
              rx="16"
              stroke="#FF9F1C"
              strokeWidth="3"
              strokeDasharray="6 4"
              fill="rgba(0,0,0,0.15)"
            />
            <circle cx="140" cy="204" r="5" fill="#FF9F1C" />
            <text x="140" y="270" textAnchor="middle" fill="#FF9F1C" fontSize="10" fontFamily="Outfit" fontWeight="700" letterSpacing="1">
              TRANSPARENT WINDOW
            </text>
            <text x="140" y="284" textAnchor="middle" fill="#FFFFFF" opacity="0.8" fontSize="9" fontFamily="JetBrains Mono">
              48mm x 48mm OPTICAL ACRYLIC
            </text>
          </g>
        )}

        <text
          x="140"
          y="115"
          textAnchor="middle"
          fill="rgba(255, 255, 255, 0.75)"
          fontSize="11"
          fontFamily="Outfit"
          fontWeight="800"
          letterSpacing="3"
        >
          LIQUIDPALETTE
        </text>
        <text
          x="140"
          y="128"
          textAnchor="middle"
          fill="rgba(255, 255, 255, 0.45)"
          fontSize="7.5"
          fontFamily="JetBrains Mono"
          letterSpacing="1"
        >
          YOUR COFFEE · YOUR COLOR
        </text>
      </svg>
    </div>
  );
}
