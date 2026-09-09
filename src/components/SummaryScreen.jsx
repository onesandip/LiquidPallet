import React from 'react';
import { CoffeeCupCanvas } from './CoffeeCupCanvas';
import { sound } from '../utils/soundEngine';

export function SummaryScreen({ colorData, coffee, milk, onEdit, onOrderNow }) {
  return (
    <div className="flex flex-col h-full overflow-y-auto px-5 py-5 animate-fadeIn">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <button
          onClick={() => { sound.playTick(); onEdit(); }}
          className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white"
        >
          <span>←</span>
          <span>EDIT RECIPE</span>
        </button>
        <span className="text-xs font-mono text-amber-400 font-bold uppercase">ORDER CONFIRMATION</span>
      </div>

      <div className="my-auto py-4 space-y-4 max-w-md mx-auto w-full">
        <div className="bg-neutral-900/70 backdrop-blur-2xl rounded-3xl p-5 border border-white/15 text-center relative overflow-hidden">
          <div className="w-44 mx-auto -my-4">
            <CoffeeCupCanvas colorData={colorData} />
          </div>

          <div className="mt-3">
            <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase">
              YOUR COFFEE
            </span>
            <h2 className="text-2xl font-extrabold text-white mt-0.5">
              {colorData.descriptor}
            </h2>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 mt-1.5" style={{ backgroundColor: colorData.hex }}>
              <span
                className="text-xs font-mono font-bold"
                style={{
                  color: (colorData.r * 0.299 + colorData.g * 0.587 + colorData.b * 0.114) > 150 ? '#1A0D07' : '#FFFFFF'
                }}
              >
                {colorData.hex}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-left">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <div className="text-[9px] font-mono text-neutral-400 uppercase">Coffee Extraction</div>
              <div className="text-xs font-bold text-white font-mono mt-0.5">{colorData.coffeePct}% · {coffee}% Intensity</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <div className="text-[9px] font-mono text-neutral-400 uppercase">Milk & Foam</div>
              <div className="text-xs font-bold text-white font-mono mt-0.5">{colorData.milkPct}% · {milk}% Ratio</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <div className="text-[9px] font-mono text-neutral-400 uppercase">Roast Profile</div>
              <div className="text-xs font-bold text-white font-mono mt-0.5">{colorData.roastLabel}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <div className="text-[9px] font-mono text-neutral-400 uppercase">Sweetness</div>
              <div className="text-xs font-bold text-white font-mono mt-0.5">{colorData.sweetLabel}</div>
            </div>
          </div>

          <div className="mt-3 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 text-left flex items-start gap-2">
            <span>🔍</span>
            <div className="text-[11px]">
              <span className="font-bold">Transparent Cup Window:</span> Your drink is dispensed into a cup with a viewing window to reveal this exact shade.
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900/60 backdrop-blur-xl border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-neutral-400 font-mono">TOTAL AMOUNT</span>
            <div className="text-2xl font-extrabold text-white">₹149</div>
          </div>
          <div className="text-right text-[10px] font-mono text-neutral-400">
            <span>Cup Size: Regular 250ml</span><br/>
            <span className="text-emerald-400">Free Contactless Dispensing</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-auto pt-3 max-w-md mx-auto w-full">
        <button
          onClick={() => { sound.playTick(); onEdit(); }}
          className="py-3.5 px-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs tracking-wider uppercase border border-white/15"
        >
          ← EDIT
        </button>
        <button
          onClick={() => { sound.playDrip(); onOrderNow(); }}
          className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs tracking-wider uppercase shadow-lg shadow-amber-500/25 border border-amber-300/40"
        >
          ORDER NOW →
        </button>
      </div>
    </div>
  );
}
