import React from 'react';
import { CoffeeCupCanvas } from './CoffeeCupCanvas';

export function PreparationScreen({ colorData, prepProgress }) {
  let stepText = "Brewing your shade...";
  let activeIndex = 0;
  if (prepProgress >= 70) {
    stepText = "Pouring your custom blend...";
    activeIndex = 2;
  } else if (prepProgress >= 35) {
    stepText = "Mixing your palette...";
    activeIndex = 1;
  }

  const stages = ["BREWING", "MIXING", "POURING", "READY"];

  return (
    <div className="flex flex-col items-center justify-between h-full px-5 py-6 text-center animate-fadeIn">
      <div className="w-full max-w-sm flex items-center justify-between px-3 py-2 rounded-2xl bg-neutral-900/60 backdrop-blur-xl border border-white/10 text-[9px] font-mono">
        {stages.map((st, i) => (
          <div key={st} className="flex items-center gap-1">
            <span className={`w-1.5 h-1.5 rounded-full ${i <= activeIndex ? 'bg-amber-400' : 'bg-neutral-700'}`} />
            <span className={i === activeIndex ? 'text-amber-400 font-bold' : i < activeIndex ? 'text-neutral-300' : 'text-neutral-600'}>
              {st}
            </span>
            {i < stages.length - 1 && <span className="text-neutral-600 mx-1">→</span>}
          </div>
        ))}
      </div>

      <div className="my-auto flex flex-col items-center">
        <h2 className="text-2xl font-extrabold text-white mb-0.5">
          YOUR COFFEE IS BEING MADE
        </h2>
        <p className="text-xs font-mono text-amber-400 font-bold">
          {prepProgress}% · {stepText}
        </p>

        <div className="w-52 mt-3">
          <CoffeeCupCanvas
            colorData={colorData}
            fillLevel={Math.max(0.08, prepProgress / 100)}
            isBrewing={true}
            showWindowCallout={true}
          />
        </div>

        <div className="w-60 h-2.5 rounded-full bg-neutral-800 border border-white/10 mt-5 overflow-hidden p-0.5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-100"
            style={{ width: `${prepProgress}%` }}
          />
        </div>

        <p className="text-[10px] font-mono text-neutral-400 mt-2.5">
          Precision Dispenser Head #02 Active
        </p>
      </div>

      <div className="text-[10px] text-neutral-500 font-mono">
        Please do not insert hand into dispensing chamber.
      </div>
    </div>
  );
}
