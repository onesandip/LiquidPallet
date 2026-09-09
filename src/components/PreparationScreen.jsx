import React from 'react';
import { CoffeeCupCanvas } from './CoffeeCupCanvas';

export function PreparationScreen({ colorData, prepProgress }) {
  // Determine 4-stage active index per Section 20
  // 01 — BREWING, 02 — MIXING, 03 — POURING, 04 — READY
  let stageIndex = 0;
  if (prepProgress >= 90) stageIndex = 3;
  else if (prepProgress >= 60) stageIndex = 2;
  else if (prepProgress >= 30) stageIndex = 1;

  const stages = [
    { num: '01', name: 'BREWING', desc: 'Extracting espresso roast pigments' },
    { num: '02', name: 'MIXING', desc: 'Turbulent milk & emulsion synthesis' },
    { num: '03', name: 'POURING', desc: 'Filling cup to exact shade ratio' },
    { num: '04', name: 'READY', desc: 'Finalizing golden crema layer' },
  ];

  return (
    <div className="flex flex-col items-center justify-between h-full px-5 py-5 text-center animate-fadeIn select-none">
      
      {/* 4-Stage Progress Header (Section 20 Spec) */}
      <div className="w-full max-w-sm grid grid-cols-4 gap-1.5 p-2 rounded-2xl bg-neutral-900/60 backdrop-blur-xl border border-white/10 text-[9px] font-mono">
        {stages.map((st, i) => {
          const isDone = i < stageIndex;
          const isCurrent = i === stageIndex;
          return (
            <div
              key={st.num}
              className={`p-1.5 rounded-xl flex flex-col items-center justify-center transition-all ${
                isCurrent
                  ? 'bg-amber-500/20 text-amber-400 font-bold border border-amber-500/40'
                  : isDone
                  ? 'text-emerald-400 font-medium'
                  : 'text-neutral-600'
              }`}
            >
              <div className="flex items-center gap-1">
                <span>{st.num}</span>
                <span>{isDone ? '✓' : isCurrent ? '●' : '○'}</span>
              </div>
              <span className="text-[8px] mt-0.5">{st.name}</span>
            </div>
          );
        })}
      </div>

      {/* Main Filling Cup Animation */}
      <div className="my-auto flex flex-col items-center w-full max-w-sm">
        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
          CREATING YOUR COFFEE
        </span>
        <h2 className="text-2xl font-black text-white mt-0.5 tracking-tight">
          {colorData.name}
        </h2>
        <p className="text-xs font-mono text-amber-400 font-bold mt-1">
          {prepProgress}% · {stages[stageIndex].desc}
        </p>

        {/* Cup with rising fill level */}
        <div className="w-48 mt-2 -my-2">
          <CoffeeCupCanvas
            colorData={colorData}
            fillLevel={Math.max(0.12, prepProgress / 100)}
            isBrewing={true}
            showWindowCallout={true}
          />
        </div>

        {/* Progress Bar */}
        <div className="w-60 h-2 rounded-full bg-neutral-800 border border-white/10 mt-4 overflow-hidden p-0.5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-100"
            style={{ width: `${prepProgress}%` }}
          />
        </div>

        <div className="mt-3 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-neutral-400 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          <span>Dispenser Head #02 Active</span>
        </div>
      </div>

      {/* Kiosk Safety Footer */}
      <div className="text-[10px] text-neutral-500 font-mono">
        Cup in dispensing chamber · Please wait
      </div>
    </div>
  );
}
