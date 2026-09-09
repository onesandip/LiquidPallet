import React, { useState } from 'react';
import { CoffeeCupCanvas } from './CoffeeCupCanvas';
import { CustomQRCode } from '../utils/qrEngine';
import { sound } from '../utils/soundEngine';

export function ReadyScreen({ colorData, coffee, milk, roast, sweetness, onMakeAnother, onOpenTestBench }) {
  const [matchRating, setMatchRating] = useState(null);

  return (
    <div className="flex flex-col items-center justify-between h-full px-5 py-4 text-center animate-fadeIn select-none overflow-y-auto">
      {/* Top Banner */}
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold uppercase tracking-wider">
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        <span>DISPENSING COMPLETE · STATION 01</span>
      </div>

      <div className="my-auto py-2 space-y-3.5 max-w-sm mx-auto w-full">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            YOUR COFFEE IS READY ☕
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Collect your drink from Station 01
          </p>
        </div>

        {/* Cup Presentation Card */}
        <div className="bg-neutral-900/75 backdrop-blur-2xl rounded-3xl p-4 border border-white/15 relative overflow-hidden text-center shadow-2xl">
          <div className="w-36 mx-auto -my-2">
            <CoffeeCupCanvas colorData={colorData} showWindowCallout={true} fillLevel={1.0} />
          </div>

          <div className="mt-1">
            <h3 className="text-xl font-black text-white">{colorData.name}</h3>
            <div className="text-xs font-mono text-neutral-400 mt-0.5 flex items-center justify-center gap-2">
              <span className="text-amber-400 font-bold">{colorData.hex}</span>
              <span>•</span>
              <span>{colorData.coffeeId}</span>
            </div>
            <p className="text-[11px] font-mono text-neutral-300 mt-1">
              {colorData.descriptors}
            </p>
          </div>

          {/* Section 22: Physical Cup Window & "MATCH YOUR SHADE" */}
          <div className="mt-3 pt-3 border-t border-white/10 text-left bg-amber-500/10 p-3 rounded-2xl border border-amber-500/20">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">
                MATCH YOUR SHADE
              </span>
              <span className="text-[9px] font-mono text-neutral-400">48mm Acrylic Window</span>
            </div>
            <p className="text-[11px] text-neutral-300 mt-1">
              Look through the transparent window on your physical cup: how close does the real beverage match your digital shade?
            </p>

            {/* Quick Feedback Rating */}
            <div className="mt-2 flex items-center justify-between gap-1.5">
              <span className="text-[10px] font-mono text-neutral-400">Rating:</span>
              <div className="flex gap-1">
                {['100% Exact', 'Very Close', 'Slightly Off'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { sound.playTick(); setMatchRating(opt); }}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-mono transition-all ${
                      matchRating === opt
                        ? 'bg-amber-500 text-black font-bold'
                        : 'bg-white/10 text-neutral-300 hover:bg-white/20'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            {matchRating && (
              <div className="text-[10px] font-mono text-emerald-400 text-right mt-1">
                ✓ Recorded. Calibrating kiosk optics.
              </div>
            )}
          </div>

          {/* Section 21 & 23: SAVE YOUR COFFEE (Repeat Purchase Loop) */}
          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-left">
            <div>
              <div className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider">
                SAVE YOUR COFFEE
              </div>
              <div className="text-xs font-bold text-white">Scan pass to phone</div>
              <div className="text-[9px] text-neutral-400 font-mono mt-0.5">
                Instant 1-tap reorder next visit
              </div>
            </div>
            <CustomQRCode
              payload={`https://liquidpalette.coffee/reorder?id=${colorData.coffeeId}&hex=${colorData.hex.replace('#','')}&c=${coffee}&m=${milk}&r=${roast}&s=${sweetness}`}
              size={56}
              hex={colorData.hex}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full max-w-sm space-y-2 pt-1">
        <button
          onClick={() => { sound.playTick(); onMakeAnother(); }}
          className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs tracking-wider uppercase shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all border border-amber-300/40 font-mono"
        >
          MAKE ANOTHER COFFEE ☕
        </button>
      </div>
    </div>
  );
}
