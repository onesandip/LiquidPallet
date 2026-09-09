import React from 'react';
import { SIGNATURE_50_SHADES } from '../utils/coffeeColorEngine';
import { sound } from '../utils/soundEngine';

export function DesignSystemModal({ onClose, onSelectShade }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-2xl my-auto bg-neutral-900/80 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <h3 className="text-lg font-black text-white uppercase tracking-wider">
              LiquidPalette Design System
            </h3>
            <p className="text-xs font-mono text-amber-400">
              Campaign: 50 Shades of Coffee · Brand Guidelines
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white"
          >
            ✕
          </button>
        </div>

        {/* Section A: 50 Shades Palette Matrix */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-neutral-300">
              1. "50 Shades of Coffee" Swatch Matrix
            </span>
            <span className="text-[10px] font-mono text-amber-400">
              Tap Any Shade to Mix Instantly
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {SIGNATURE_50_SHADES.map((s) => (
              <button
                key={s.hex}
                onClick={() => {
                  sound.playDrip();
                  onSelectShade(s);
                  onClose();
                }}
                className="p-2.5 rounded-xl border border-white/10 hover:border-amber-400 transition-all text-left flex items-center gap-2.5 bg-neutral-900/80 group"
              >
                <div
                  className="w-7 h-7 rounded-lg shadow border border-white/20 flex-shrink-0 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: s.hex }}
                />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate group-hover:text-amber-400 transition-colors">
                    {s.name}
                  </div>
                  <div className="text-[10px] font-mono text-neutral-400">
                    {s.hex}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Section B: Design Tokens */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <span className="text-xs font-mono font-bold uppercase text-neutral-300 block">
            2. Core Design Tokens & Visual Hierarchy
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="font-bold text-white">Typography: Geometric Sans</div>
              <p className="text-neutral-400 text-[11px] mt-1">
                Primary: Outfit (clean, futuristic, high legibility from 1 meter distance). Monospace: JetBrains Mono for hex codes, ratios, telemetry.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="font-bold text-white">Restrained Premium Palette</div>
              <p className="text-neutral-400 text-[11px] mt-1">
                Obsidian Black (#121212), Espresso Brown (#1A0D07), Warm Cream (#FFF8EE), Caramel (#C87D38). The coffee color provides the primary visual vibrancy.
              </p>
            </div>
          </div>
        </div>

        {/* Section C: Physical Cup Integration Blueprint */}
        <div className="space-y-2 pt-4 border-t border-white/10">
          <span className="text-xs font-mono font-bold uppercase text-neutral-300 block">
            3. Physical Cup Specification
          </span>
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-neutral-300 space-y-1">
            <div className="font-bold text-amber-400">Transparent Center Square Window:</div>
            <p className="text-[11px]">
              48mm × 48mm optical acrylic window bonded directly to the double-walled matte charcoal vessel. Provides immediate physical verification of the digital Hex code shade.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
