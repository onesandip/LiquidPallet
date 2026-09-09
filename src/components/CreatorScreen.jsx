import React from 'react';
import { CoffeeCupCanvas } from './CoffeeCupCanvas';
import { PRESETS } from '../utils/coffeeColorEngine';
import { sound } from '../utils/soundEngine';

export function CreatorScreen({
  coffee,
  setCoffee,
  milk,
  setMilk,
  roast,
  setRoast,
  sweetness,
  setSweetness,
  colorData,
  showWindowCallout,
  setShowWindowCallout,
  onBack,
  onReviewOrder,
  onSurpriseMe,
  onOpenDesignSystem
}) {
  const handleSlider = (setter, val) => {
    setter(val);
    sound.playTick(360 + val * 3);
  };

  const handleSelectPreset = (p) => {
    sound.playDrip();
    setCoffee(p.coffee);
    setMilk(p.milk);
    setRoast(p.roast);
    setSweetness(p.sweetness);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-neutral-900/60 backdrop-blur-xl z-20">
        <button
          onClick={() => { sound.playTick(); onBack(); }}
          className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
        >
          <span>←</span>
          <span>HOME</span>
        </button>

        <div className="text-center">
          <span className="text-xs font-mono text-amber-400 font-bold tracking-wider">LIQUIDPALETTE</span>
          <span className="mx-2 text-white/20">|</span>
          <span className="text-xs text-neutral-300 font-medium">Palette Mixer</span>
        </div>

        <button
          onClick={onSurpriseMe}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold hover:bg-amber-500/30 transition-all active:scale-95"
        >
          <span>🎲</span>
          <span className="font-mono">SURPRISE</span>
        </button>
      </div>

      {/* Scrollable mixer content */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {/* Top: Visual Coffee Preview Hero */}
        <div className="relative rounded-3xl bg-neutral-900/70 backdrop-blur-2xl p-4 text-center overflow-hidden border border-white/15 shadow-2xl">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-semibold">
              YOUR COFFEE
            </span>
            <button
              onClick={() => { sound.playTick(); setShowWindowCallout(!showWindowCallout); }}
              className={`text-[9px] font-mono px-2 py-0.5 rounded-full border transition-all ${
                showWindowCallout
                  ? 'bg-amber-500 text-black border-amber-400 font-bold'
                  : 'bg-white/5 text-neutral-300 border-white/10 hover:bg-white/10'
              }`}
            >
              {showWindowCallout ? '✓ CUP WINDOW ACTIVE' : '🔍 PREVIEW CUP WINDOW'}
            </button>
          </div>

          <CoffeeCupCanvas colorData={colorData} showWindowCallout={showWindowCallout} />

          <div className="mt-3 pt-3 border-t border-white/10 flex flex-col items-center">
            <div className="text-[9px] font-mono text-neutral-400 tracking-wider uppercase mb-1">
              COFFEE COLOR
            </div>

            <div className="flex items-center gap-3">
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/30 shadow-md"
                style={{ backgroundColor: colorData.hex }}
              >
                <span
                  className="text-xs font-mono font-bold tracking-wider"
                  style={{
                    color: (colorData.r * 0.299 + colorData.g * 0.587 + colorData.b * 0.114) > 150 ? '#1A0D07' : '#FFFFFF'
                  }}
                >
                  {colorData.hex}
                </span>
              </div>

              <div className="text-left">
                <h3 className="text-sm font-bold text-white leading-tight">
                  {colorData.descriptor}
                </h3>
                <p className="text-[10px] text-amber-400/90 font-mono">
                  {colorData.notes}
                </p>
              </div>
            </div>

            <div className="mt-2.5 px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-[10px] font-mono text-neutral-300">
              {colorData.recipeSummary}
            </div>
          </div>
        </div>

        {/* Customization Sliders */}
        <div className="rounded-3xl bg-neutral-900/70 backdrop-blur-2xl p-4 space-y-4 border border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-300">
              TACTILE CONTROLS
            </span>
            <span className="text-[10px] font-mono text-amber-400">
              Real-time Color Synthesis
            </span>
          </div>

          {/* 1. COFFEE */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-1.5 font-bold text-white">
                <span>☕</span>
                <span>COFFEE INTENSITY</span>
              </div>
              <span className="font-mono text-amber-400 font-semibold">{coffee}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={coffee}
              onChange={(e) => handleSlider(setCoffee, Number(e.target.value))}
              className="w-full h-3 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #4A2818 0%, #1A0D07 100%)`
              }}
            />
            <div className="flex justify-between text-[9px] font-mono text-neutral-500">
              <span>Light (20%)</span>
              <span>Balanced (50%)</span>
              <span>Strong (80%)</span>
              <span>Intense (100%)</span>
            </div>
          </div>

          {/* 2. MILK */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-1.5 font-bold text-white">
                <span>🥛</span>
                <span>MILK LEVEL</span>
              </div>
              <span className="font-mono text-amber-400 font-semibold">{milk}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="90"
              value={milk}
              onChange={(e) => handleSlider(setMilk, Number(e.target.value))}
              className="w-full h-3 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #1A0D07 0%, #A96F42 40%, #FFF8EE 100%)`
              }}
            />
            <div className="flex justify-between text-[9px] font-mono text-neutral-500">
              <span>Black (0%)</span>
              <span>Splash (20%)</span>
              <span>Creamy (60%)</span>
              <span>High Milk (90%)</span>
            </div>
          </div>

          {/* 3. ROAST */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-1.5 font-bold text-white">
                <span>🔥</span>
                <span>ROAST PROFILE</span>
              </div>
              <span className="font-mono text-amber-400 font-semibold">{colorData.roastLabel}</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={roast}
              onChange={(e) => handleSlider(setRoast, Number(e.target.value))}
              className="w-full h-3 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #B87D4E 0%, #7D3F28 50%, #160B06 100%)`
              }}
            />
            <div className="flex justify-between text-[9px] font-mono text-neutral-500">
              <span>Blonde (1)</span>
              <span>Medium (3)</span>
              <span>French (4)</span>
              <span>Italian (5)</span>
            </div>
          </div>

          {/* 4. SWEETNESS */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-1.5 font-bold text-white">
                <span>✨</span>
                <span>SWEETNESS</span>
              </div>
              <span className="font-mono text-amber-400 font-semibold">{colorData.sweetLabel}</span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              value={sweetness}
              onChange={(e) => handleSlider(setSweetness, Number(e.target.value))}
              className="w-full h-3 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #333333 0%, #D4AF37 100%)`
              }}
            />
            <div className="flex justify-between text-[9px] font-mono text-neutral-500">
              <span>None (0g)</span>
              <span>Subtle (5g)</span>
              <span>Balanced (10g)</span>
              <span>Sweet (20g)</span>
            </div>
          </div>
        </div>

        {/* Quick Picks */}
        <div className="rounded-3xl bg-neutral-900/70 backdrop-blur-2xl p-4 border border-white/10 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-300">
              QUICK PICKS (PRESETS)
            </span>
            <span className="text-[9px] font-mono text-neutral-500">
              Tap to Auto-Slide
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {PRESETS.map((p) => {
              const isMatch = Math.abs(p.coffee - coffee) <= 8 && Math.abs(p.milk - milk) <= 8;
              return (
                <button
                  key={p.id}
                  onClick={() => handleSelectPreset(p)}
                  className={`p-2.5 rounded-2xl text-left transition-all border ${
                    isMatch
                      ? 'bg-amber-500/20 border-amber-400 text-white shadow-md scale-[1.01]'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-neutral-300'
                  }`}
                >
                  <div className="text-xs font-bold tracking-wider font-mono text-amber-400">
                    {p.label}
                  </div>
                  <div className="text-[10px] text-neutral-400 truncate mt-0.5">
                    {p.desc}
                  </div>
                </button>
              );
            })}

            <button
              onClick={() => { sound.playTick(); onOpenDesignSystem(); }}
              className="col-span-2 p-2.5 rounded-2xl text-left bg-neutral-900 border border-amber-500/30 hover:border-amber-400 text-neutral-300 transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">🎨</span>
                <div>
                  <div className="text-xs font-bold font-mono text-amber-400">
                    50 SHADES OF COFFEE
                  </div>
                  <div className="text-[10px] text-neutral-400">
                    Browse Signature Swatch Matrix
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono text-amber-400">OPEN →</span>
            </button>
          </div>
        </div>
      </div>

      {/* Persistent Action Bar */}
      <div className="p-3.5 bg-neutral-900/80 backdrop-blur-xl border-t border-white/15 flex items-center justify-between gap-3 z-20">
        <div>
          <div className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest">
            KIOSK PRICE
          </div>
          <div className="text-2xl font-extrabold text-white flex items-baseline gap-1">
            <span>₹149</span>
            <span className="text-[9px] font-mono text-emerald-400 font-normal">All Incl.</span>
          </div>
        </div>

        <button
          onClick={() => { sound.playDrip(); onReviewOrder(); }}
          className="flex-1 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-sm tracking-wide shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 border border-amber-300/40"
        >
          <span>REVIEW ORDER</span>
          <span className="text-base">→</span>
        </button>
      </div>
    </div>
  );
}
