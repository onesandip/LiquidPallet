import React from 'react';
import { QUICK_ORDER_PRESETS, generateSensibleSurprise, mixCoffeeColor } from '../utils/coffeeColorEngine';
import { sound } from '../utils/soundEngine';

export function QuickOrderModal({ onClose, onSelectPreset, onSurpriseMe }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="w-full max-w-md bg-neutral-900/90 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 space-y-5 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-amber-400 font-bold uppercase">
              EXPRESS ORDER
            </span>
            <h3 className="text-xl font-extrabold text-white">
              QUICK ORDER
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Pick a benchmark blend and order in under 15 seconds.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* 5 Presets List */}
        <div className="space-y-2.5">
          {QUICK_ORDER_PRESETS.map((p) => {
            const preview = mixCoffeeColor(p);
            return (
              <button
                key={p.id}
                onClick={() => {
                  sound.playDrip();
                  onSelectPreset(p);
                  onClose();
                }}
                className="w-full p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/50 transition-all text-left flex items-center justify-between group active:scale-[0.98]"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-10 h-10 rounded-xl shadow-md border border-white/20 flex-shrink-0 group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: preview.hex }}
                  />
                  <div>
                    <div className="text-sm font-bold text-white font-mono flex items-center gap-2">
                      <span>{p.label}</span>
                      <span className="text-[10px] font-normal text-amber-400">
                        {preview.hex}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-400 mt-0.5">
                      {p.sublabel}
                    </div>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="text-xs font-bold text-white">₹129</span>
                  <div className="text-[10px] text-amber-400 mt-0.5">SELECT →</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Surprise Me option */}
        <button
          onClick={() => {
            sound.playDrip();
            onSurpriseMe();
            onClose();
          }}
          className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 border border-amber-500/40 text-left flex items-center justify-between transition-all"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl animate-bounce">🎲</span>
            <div>
              <div className="text-xs font-mono font-bold text-amber-400">
                SURPRISE ME
              </div>
              <div className="text-[11px] text-neutral-300">
                Let the Alchemist mix a balanced unique shade
              </div>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-amber-400">TRY →</span>
        </button>
      </div>
    </div>
  );
}
