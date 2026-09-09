import React from 'react';
import { CoffeeCupCanvas } from './CoffeeCupCanvas';

export function SurpriseModal({ surpriseBlend, onTryAgain, onApply }) {
  if (!surpriseBlend) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="w-full max-w-sm bg-neutral-900/80 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 text-center space-y-4 shadow-2xl">
        <div className="text-4xl animate-bounce">🎲</div>
        <div>
          <span className="text-xs font-mono tracking-widest text-amber-400 font-bold uppercase">
            YOUR RANDOM SHADE
          </span>
          <h3 className="text-2xl font-black text-white mt-1">
            {surpriseBlend.descriptor}
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">{surpriseBlend.notes}</p>
        </div>

        <div className="w-40 mx-auto -my-4">
          <CoffeeCupCanvas colorData={surpriseBlend} />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20" style={{ backgroundColor: surpriseBlend.hex }}>
          <span
            className="text-xs font-mono font-bold"
            style={{
              color: (surpriseBlend.r * 0.299 + surpriseBlend.g * 0.587 + surpriseBlend.b * 0.114) > 150 ? '#1A0D07' : '#FFFFFF'
            }}
          >
            {surpriseBlend.hex}
          </span>
        </div>

        <p className="text-[11px] font-mono text-neutral-300">
          {surpriseBlend.recipeSummary}
        </p>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={onTryAgain}
            className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-xs font-bold uppercase border border-white/10"
          >
            TRY AGAIN 🎲
          </button>
          <button
            onClick={onApply}
            className="py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase shadow-lg shadow-amber-500/20"
          >
            I LIKE IT →
          </button>
        </div>
      </div>
    </div>
  );
}
