import React from 'react';
import { CoffeeCupCanvas } from './CoffeeCupCanvas';
import { sound } from '../utils/soundEngine';

export function SummaryScreen({ colorData, coffee, milk, roast, sweetness, onEdit, onOrderNow }) {
  return (
    <div className="flex flex-col h-full overflow-y-auto px-5 py-5 animate-fadeIn select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <button
          onClick={() => { sound.playTick(); onEdit(); }}
          className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white"
        >
          <span>←</span>
          <span>CHANGE</span>
        </button>
        <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
          ORDER SUMMARY
        </span>
      </div>

      {/* Main Container */}
      <div className="my-auto py-3 space-y-4 max-w-md mx-auto w-full">
        <div className="bg-neutral-900/75 backdrop-blur-2xl rounded-3xl p-5 border border-white/15 text-center relative overflow-hidden shadow-2xl">
          <div className="w-40 mx-auto -my-3">
            <CoffeeCupCanvas colorData={colorData} showWindowCallout={true} />
          </div>

          <div className="mt-2">
            <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase font-semibold">
              YOUR COFFEE
            </span>
            <h2 className="text-2xl font-black text-white mt-0.5 tracking-tight">
              {colorData.name}
            </h2>

            {/* Color Swatch & Color ID */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/20 mt-1.5 shadow-md"
              style={{ backgroundColor: colorData.hex }}
            >
              <span
                className="text-xs font-mono font-extrabold"
                style={{
                  color: (colorData.r * 0.299 + colorData.g * 0.587 + colorData.b * 0.114) > 150 ? '#1A0D07' : '#FFFFFF'
                }}
              >
                {colorData.hex}
              </span>
              <span className="text-[10px] font-mono opacity-80">
                {colorData.coffeeId}
              </span>
            </div>

            <p className="text-xs font-medium text-amber-400/90 mt-2 font-mono">
              {colorData.descriptors}
            </p>
          </div>

          {/* Recipe Breakdown & Proportion Bars */}
          <div className="mt-4 pt-3 border-t border-white/10 space-y-2 text-left">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-neutral-400">Coffee:</span>
                <span className="text-white font-bold">{colorData.coffeePercent}% ({coffee}% Extraction)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Milk:</span>
                <span className="text-white font-bold">{colorData.milkPercent}% ({milk}% Ratio)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Roast Profile:</span>
                <span className="text-white font-bold">{roast === 1 ? 'Blonde' : roast === 3 ? 'Medium' : roast === 5 ? 'Dark Italian' : `Roast ${roast}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Sweetness:</span>
                <span className="text-white font-bold">{sweetness === 0 ? 'None' : `${sweetness}g`}</span>
              </div>
            </div>

            {/* Physical Cup Notice */}
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2">
              <span className="text-sm">🔍</span>
              <div className="text-[11px] leading-snug">
                <span className="font-bold">Transparent Viewing Window:</span> Dispensed into a branded cup with a center square window so you can verify your exact crafted shade.
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Card (₹129 per spec) */}
        <div className="p-4 rounded-2xl bg-neutral-900/60 backdrop-blur-xl border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[9px] text-neutral-400 font-mono uppercase tracking-wider">TOTAL AMOUNT</span>
            <div className="text-3xl font-black text-white">₹129</div>
          </div>
          <div className="text-right text-[10px] font-mono text-neutral-400">
            <span>Size: Regular 250ml</span><br/>
            <span className="text-emerald-400 font-bold">Station 01 Dispense</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mt-auto pt-2 max-w-md mx-auto w-full">
        <button
          onClick={() => { sound.playTick(); onEdit(); }}
          className="py-3.5 px-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs tracking-wider uppercase border border-white/15 active:scale-95 transition-all font-mono"
        >
          ← CHANGE
        </button>
        <button
          onClick={() => { sound.playDrip(); onOrderNow(); }}
          className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs tracking-wider uppercase shadow-lg shadow-amber-500/25 border border-amber-300/40 active:scale-95 transition-all font-mono"
        >
          ORDER NOW →
        </button>
      </div>
    </div>
  );
}
