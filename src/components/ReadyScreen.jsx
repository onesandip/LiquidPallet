import React from 'react';
import { CoffeeCupCanvas } from './CoffeeCupCanvas';
import { CustomQRCode } from '../utils/qrEngine';
import { sound } from '../utils/soundEngine';

export function ReadyScreen({ colorData, coffee, milk, roast, sweetness, onMakeAnother, onOpenDesignSystem }) {
  return (
    <div className="flex flex-col items-center justify-between h-full px-5 py-6 text-center animate-fadeIn">
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold uppercase tracking-wider">
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        <span>DISPENSING COMPLETE</span>
      </div>

      <div className="my-auto py-2 space-y-4 max-w-sm mx-auto w-full">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight">
            YOUR COFFEE IS READY ☕
          </h1>
          <div className="mt-2 inline-block px-4 py-1.5 rounded-xl bg-amber-500 text-black font-extrabold text-sm tracking-wider font-mono shadow-xl shadow-amber-500/25">
            COLLECT FROM STATION 01
          </div>
        </div>

        <div className="bg-neutral-900/70 backdrop-blur-2xl rounded-3xl p-4 border border-white/15 relative overflow-hidden text-center">
          <span className="text-[9px] font-mono tracking-widest text-amber-400 uppercase font-bold block mb-1">
            PHYSICAL CUP VERIFICATION
          </span>

          <div className="w-44 mx-auto -my-2">
            <CoffeeCupCanvas colorData={colorData} showWindowCallout={true} fillLevel={1.0} />
          </div>

          <div className="mt-1">
            <h3 className="text-base font-bold text-white">{colorData.descriptor}</h3>
            <div className="text-xs font-mono text-neutral-400">
              Color ID: <span className="text-amber-400 font-bold">{colorData.hex}</span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-left">
            <div>
              <div className="text-[9px] font-mono text-neutral-400 uppercase">SAVE THIS COLOR</div>
              <div className="text-xs font-bold text-white">Scan pass to phone</div>
              <div className="text-[9px] text-neutral-400 font-mono mt-0.5">Reorder with 1 tap anytime</div>
            </div>
            <CustomQRCode payload={`https://liquidpalette.coffee/reorder?hex=${colorData.hex.replace('#','')}&c=${coffee}&m=${milk}&r=${roast}&s=${sweetness}`} size={60} hex={colorData.hex} />
          </div>
        </div>

        <p className="text-xs text-neutral-400 font-mono">
          "SEE YOUR COLOR COME TO LIFE."
        </p>
      </div>

      <div className="w-full max-w-sm space-y-2">
        <button
          onClick={() => { sound.playTick(); onMakeAnother(); }}
          className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs tracking-wider uppercase shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all border border-amber-300/40"
        >
          CREATE ANOTHER COFFEE ☕
        </button>
        <button
          onClick={() => { sound.playTick(); onOpenDesignSystem(); }}
          className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 font-mono text-xs hover:text-white transition-colors border border-white/10"
        >
          VIEW DESIGN SYSTEM & 50 SHADES →
        </button>
      </div>
    </div>
  );
}
