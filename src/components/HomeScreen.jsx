import React from 'react';
import { sound } from '../utils/soundEngine';
import { PRESETS } from '../utils/coffeeColorEngine';

export function HomeScreen({ colorData, onStartCustomizing, onQuickOrder }) {
  return (
    <div className="flex flex-col items-center justify-between h-full px-6 py-8 text-center animate-fadeIn">
      {/* Top Station Indicator */}
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/15">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="text-[11px] font-mono tracking-widest text-white/80 uppercase">Station #04 · Online</span>
      </div>

      {/* Hero Branding */}
      <div className="flex flex-col items-center my-auto">
        <div className="relative mb-5">
          <div
            className="w-20 h-20 rounded-3xl p-0.5 shadow-2xl transition-colors duration-1000"
            style={{
              background: `linear-gradient(135deg, ${colorData.hex}, #C87D38, #1A0D07)`
            }}
          >
            <div className="w-full h-full bg-[#121212] rounded-[22px] flex items-center justify-center">
              <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                <line x1="6" y1="2" x2="6" y2="4" />
                <line x1="10" y1="2" x2="10" y2="4" />
                <line x1="14" y1="2" x2="14" y2="4" />
              </svg>
            </div>
          </div>
          <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-md bg-amber-500 text-[9px] font-mono font-bold text-black uppercase">
            50 Shades
          </span>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-1 uppercase">
          LiquidPalette
        </h1>
        <p className="text-xs font-mono tracking-widest text-amber-400 uppercase font-semibold mb-5">
          YOUR COFFEE · YOUR COLOR.
        </p>

        <div className="max-w-xs space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-100">
            MAKE YOUR COFFEE
          </h2>
          <p className="text-sm text-neutral-400">
            Mix it. See it. Taste it.
          </p>
        </div>

        <div className="w-60 h-2.5 rounded-full mt-6 p-0.5 bg-neutral-800/80 border border-white/10 overflow-hidden">
          <div
            className="w-full h-full rounded-full animate-pulse"
            style={{
              background: 'linear-gradient(90deg, #1A0D07, #582B1B, #A96F42, #D7A981, #FFF8EE)'
            }}
          />
        </div>
        <p className="text-[10px] font-mono text-neutral-500 mt-2">
          50 shades. Infinite possibilities.
        </p>
      </div>

      {/* Action CTAs */}
      <div className="w-full max-w-sm space-y-2.5">
        <button
          onClick={() => {
            sound.playDrip();
            onStartCustomizing();
          }}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-base tracking-wide shadow-lg shadow-amber-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-3 border border-amber-300/40"
        >
          <span>CREATE MY COFFEE</span>
          <span className="text-xl">→</span>
        </button>

        <button
          onClick={() => {
            sound.playTick();
            onQuickOrder(PRESETS[1]);
          }}
          className="w-full py-3.5 px-6 rounded-2xl bg-white/5 hover:bg-white/10 text-white/90 font-medium text-xs tracking-wider uppercase active:scale-[0.98] transition-all border border-white/10"
        >
          QUICK ORDER (BALANCED)
        </button>
      </div>
    </div>
  );
}
