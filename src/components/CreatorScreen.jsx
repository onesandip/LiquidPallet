import React, { useState } from 'react';
import { CoffeeCupCanvas } from './CoffeeCupCanvas';
import { QUICK_ORDER_PRESETS } from '../utils/coffeeColorEngine';
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
  onOpenTestBench
}) {
  const handleSlider = (setter, val) => {
    setter(val);
    sound.playTick(320 + val * 3);
  };

  const handleSelectPreset = (p) => {
    sound.playDrip();
    setCoffee(p.coffee);
    setMilk(p.milk);
    setRoast(p.roast);
    setSweetness(p.sweetness);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden select-none">
      {/* Kiosk Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-neutral-900/70 backdrop-blur-xl z-20">
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
          <span className="text-xs text-neutral-300 font-medium">Coffee Creator</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onSurpriseMe}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/30 text-xs font-bold hover:bg-amber-500/25 transition-all active:scale-95"
            title="Surprise Blend"
          >
            <span>🎲</span>
            <span className="font-mono text-[11px]">SURPRISE</span>
          </button>
        </div>
      </div>

      {/* Scrollable Mixer Body */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3.5">
        
        {/* HERO: Huge Realistic Transparent Coffee Cup & Color Swatch */}
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
              {showWindowCallout ? '✓ CUP WINDOW ACTIVE' : '🔍 CUP WINDOW'}
            </button>
          </div>

          {/* Transparent Cup Canvas */}
          <div className="cursor-pointer" onClick={() => sound.playDrip()}>
            <CoffeeCupCanvas colorData={colorData} showWindowCallout={showWindowCallout} />
          </div>

          {/* Live Coffee Color ID & Identity Header */}
          <div className="mt-2 pt-3 border-t border-white/10 flex flex-col items-center">
            <span className="text-[9px] font-mono text-neutral-400 tracking-wider uppercase mb-1">
              COFFEE COLOR ID
            </span>

            <div className="flex items-center gap-3">
              {/* Dynamic Hex Swatch Pill */}
              <div
                className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/30 shadow-md transition-colors duration-500"
                style={{ backgroundColor: colorData.hex }}
              >
                <span
                  className="text-xs font-mono font-extrabold tracking-wider"
                  style={{
                    color: (colorData.r * 0.299 + colorData.g * 0.587 + colorData.b * 0.114) > 150 ? '#1A0D07' : '#FFFFFF'
                  }}
                >
                  {colorData.hex}
                </span>
                <span className="text-[9px] opacity-70 font-mono">
                  {colorData.coffeeId}
                </span>
              </div>

              {/* Dynamic Coffee Name */}
              <div className="text-left">
                <h3 className="text-base font-extrabold text-white leading-tight">
                  {colorData.name}
                </h3>
                <p className="text-[10px] text-amber-400/90 font-mono">
                  {colorData.descriptors}
                </p>
              </div>
            </div>

            {/* LIVE RECIPE PROPORTION BARS (Section 15 Spec) */}
            <div className="mt-2.5 w-full max-w-xs px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[9px] font-mono text-neutral-300 grid grid-cols-2 gap-x-2 gap-y-1 text-left">
              <div>ESP: <span className="text-white font-bold">{colorData.asciiBars?.coffee}</span> {colorData.coffeePercent}%</div>
              <div>MLK: <span className="text-white font-bold">{colorData.asciiBars?.milk}</span> {colorData.milkPercent}%</div>
              <div>RST: <span className="text-white font-bold">{colorData.asciiBars?.roast}</span> R{roast}</div>
              <div>SWT: <span className="text-white font-bold">{colorData.asciiBars?.sweetness}</span> {sweetness}g</div>
            </div>
          </div>
        </div>

        {/* 4 TACTILE HORIZONTAL SLIDERS (Intuitive Non-Technical Labels) */}
        <div className="rounded-3xl bg-neutral-900/70 backdrop-blur-2xl p-4 space-y-3.5 border border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-300 font-mono">
              RECIPE CONTROLS
            </span>
            <span className="text-[10px] font-mono text-amber-400">
              Drag to Mix Color
            </span>
          </div>

          {/* SLIDER 1: ESPRESSO */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <span>☕</span>
                <span>ESPRESSO</span>
              </span>
              <span className="font-mono text-amber-400 font-semibold">{coffee}% ({coffee < 40 ? 'Light' : coffee < 75 ? 'Balanced' : 'Strong'})</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={coffee}
              onChange={(e) => handleSlider(setCoffee, Number(e.target.value))}
              className="w-full h-3 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #6E3C22 0%, #180B06 100%)`
              }}
            />
            <div className="flex justify-between text-[9px] font-mono text-neutral-500 pt-0.5">
              <span>LIGHT</span>
              <span>BALANCED</span>
              <span>STRONG</span>
            </div>
          </div>

          {/* SLIDER 2: MILK */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <span>🥛</span>
                <span>MILK</span>
              </span>
              <span className="font-mono text-amber-400 font-semibold">{milk}% ({milk === 0 ? 'Black' : milk < 35 ? 'Splash' : milk < 70 ? 'Creamy' : 'Very Creamy'})</span>
            </div>
            <input
              type="range"
              min="0"
              max="90"
              value={milk}
              onChange={(e) => handleSlider(setMilk, Number(e.target.value))}
              className="w-full h-3 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #180B06 0%, #A96F42 40%, #F8F2E4 100%)`
              }}
            />
            <div className="flex justify-between text-[9px] font-mono text-neutral-500 pt-0.5">
              <span>BLACK</span>
              <span>SPLASH</span>
              <span>CREAMY</span>
            </div>
          </div>

          {/* SLIDER 3: ROAST */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <span>🔥</span>
                <span>ROAST</span>
              </span>
              <span className="font-mono text-amber-400 font-semibold">{roast === 1 ? 'Blonde' : roast === 3 ? 'Medium' : roast === 5 ? 'Dark Italian' : `Roast ${roast}`}</span>
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
                background: `linear-gradient(to right, #B87D4E 0%, #6E3C22 50%, #160B06 100%)`
              }}
            />
            <div className="flex justify-between text-[9px] font-mono text-neutral-500 pt-0.5">
              <span>LIGHT</span>
              <span>MEDIUM</span>
              <span>DARK</span>
            </div>
          </div>

          {/* SLIDER 4: SWEETNESS */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <span>✨</span>
                <span>SWEETNESS</span>
              </span>
              <span className="font-mono text-amber-400 font-semibold">{sweetness === 0 ? 'None' : `${sweetness}g`}</span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              value={sweetness}
              onChange={(e) => handleSlider(setSweetness, Number(e.target.value))}
              className="w-full h-3 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #2E2E2E 0%, #D4AF37 100%)`
              }}
            />
            <div className="flex justify-between text-[9px] font-mono text-neutral-500 pt-0.5">
              <span>NONE</span>
              <span>BALANCED (10g)</span>
              <span>SWEET (20g)</span>
            </div>
          </div>
        </div>

        {/* QUICK PRESETS CAROUSEL (Section 16 Animated Transitions) */}
        <div className="rounded-3xl bg-neutral-900/70 backdrop-blur-2xl p-3.5 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
            <span className="font-bold text-neutral-300 uppercase">QUICK PRESETS</span>
            <span>Tap to Animate</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {QUICK_ORDER_PRESETS.map((p) => {
              const isSelected = Math.abs(p.coffee - coffee) <= 8 && Math.abs(p.milk - milk) <= 8;
              return (
                <button
                  key={p.id}
                  onClick={() => handleSelectPreset(p)}
                  className={`p-2 rounded-xl text-left border transition-all ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-400 text-white font-bold scale-[1.02]'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-neutral-300'
                  }`}
                >
                  <div className="text-xs font-mono font-bold text-amber-400">{p.label}</div>
                  <div className="text-[9px] text-neutral-400 truncate mt-0.5">{p.sublabel}</div>
                </button>
              );
            })}

            {/* Test Bench Button */}
            <button
              onClick={onOpenTestBench}
              className="p-2 rounded-xl text-left bg-emerald-500/10 border border-emerald-500/30 hover:border-emerald-400 text-emerald-400 transition-all flex flex-col justify-center"
              title="Verify P0 Color Engine"
            >
              <div className="text-xs font-mono font-bold">🧪 VERIFY</div>
              <div className="text-[9px] text-emerald-300/80">Test Engine</div>
            </button>
          </div>
        </div>
      </div>

      {/* Persistent Bottom Order Bar (Price ₹129 per spec) */}
      <div className="p-3.5 bg-neutral-900/80 backdrop-blur-xl border-t border-white/15 flex items-center justify-between gap-3 z-20">
        <div>
          <div className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest">
            PRICE
          </div>
          <div className="text-2xl font-black text-white flex items-baseline gap-1">
            <span>₹129</span>
            <span className="text-[9px] font-mono text-emerald-400 font-normal">All Incl.</span>
          </div>
        </div>

        <button
          onClick={() => { sound.playDrip(); onReviewOrder(); }}
          className="flex-1 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-sm tracking-wide shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 border border-amber-300/40 font-mono"
        >
          <span>ORDER NOW →</span>
        </button>
      </div>
    </div>
  );
}
