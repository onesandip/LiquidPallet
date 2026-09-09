import React, { useState, useEffect } from 'react';
import { sound } from '../utils/soundEngine';
import { CoffeeCupCanvas } from './CoffeeCupCanvas';
import { mixCoffeeColor } from '../utils/coffeeColorEngine';

export function HomeScreen({ colorData, onStartCustomizing, onOpenQuickOrder }) {
  // Demo cycling shade for the first 5 seconds
  const [demoCycle, setDemoCycle] = useState(0);

  useEffect(() => {
    const shades = [
      { coffee: 90, milk: 0, roast: 4, sweetness: 0 },
      { coffee: 75, milk: 20, roast: 4, sweetness: 5 },
      { coffee: 62, milk: 38, roast: 3, sweetness: 8 },
      { coffee: 45, milk: 60, roast: 2, sweetness: 10 },
      { coffee: 25, milk: 80, roast: 2, sweetness: 5 }
    ];

    const timer = setInterval(() => {
      setDemoCycle((prev) => (prev + 1) % shades.length);
    }, 2400);

    return () => clearInterval(timer);
  }, []);

  const demoColor = mixCoffeeColor([
    { coffee: 90, milk: 0, roast: 4, sweetness: 0 },
    { coffee: 75, milk: 20, roast: 4, sweetness: 5 },
    { coffee: 62, milk: 38, roast: 3, sweetness: 8 },
    { coffee: 45, milk: 60, roast: 2, sweetness: 10 },
    { coffee: 25, milk: 80, roast: 2, sweetness: 5 }
  ][demoCycle]);

  return (
    <div className="flex flex-col items-center justify-between h-full px-6 py-6 text-center animate-fadeIn select-none">
      {/* Top Station Badge */}
      <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[10px] font-mono tracking-widest text-neutral-300 uppercase">
          LIQUIDPALETTE · KIOSK 04
        </span>
      </div>

      {/* Hero Visual Area with Animated Cup */}
      <div className="flex flex-col items-center my-auto w-full max-w-sm">
        {/* Animated Coffee Cup Hero */}
        <div className="w-44 -my-3 relative cursor-pointer" onClick={onStartCustomizing}>
          <CoffeeCupCanvas colorData={demoColor} showWindowCallout={true} />
        </div>

        {/* Live cycling shade indicator */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mt-1">
          <div
            className="w-3 h-3 rounded-full border border-white/30 transition-colors duration-700"
            style={{ backgroundColor: demoColor.hex }}
          />
          <span className="text-xs font-mono font-bold text-white transition-all duration-500">
            {demoColor.hex}
          </span>
          <span className="text-neutral-500">·</span>
          <span className="text-[11px] font-medium text-amber-400/90 transition-all duration-500">
            {demoColor.name}
          </span>
        </div>

        {/* Hero Title and Copy (Per Exact Specification) */}
        <div className="mt-5 space-y-1.5">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase leading-tight font-sans">
            YOUR COFFEE.<br />YOUR COLOR.
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 font-normal">
            Create your coffee visually. Mix it. See it. Taste it.
          </p>
        </div>

        {/* 50 Shades tagline */}
        <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
          <span>50 Shades</span>
          <span>•</span>
          <span>Thousands of combinations</span>
        </div>
      </div>

      {/* Primary & Secondary CTAs */}
      <div className="w-full max-w-sm space-y-2.5">
        <button
          onClick={() => {
            sound.playDrip();
            onStartCustomizing();
          }}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-base tracking-wide shadow-lg shadow-amber-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-3 border border-amber-300/40"
        >
          <span>CREATE MY COFFEE</span>
          <span className="text-xl">→</span>
        </button>

        <button
          onClick={() => {
            sound.playTick();
            onOpenQuickOrder();
          }}
          className="w-full py-3.5 px-6 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs tracking-wider uppercase active:scale-[0.98] transition-all border border-white/10 flex items-center justify-center gap-2"
        >
          <span>⚡ QUICK ORDER (15 SEC)</span>
        </button>

        <div className="text-[10px] font-mono text-neutral-500 pt-1">
          From ₹129 · Contactless Dispense
        </div>
      </div>
    </div>
  );
}
