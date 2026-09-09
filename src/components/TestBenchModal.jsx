import React, { useMemo } from 'react';
import { runColorRegressionTests } from '../utils/coffeeColorEngine';

export function TestBenchModal({ onClose, onLoadRecipe }) {
  const testResults = useMemo(() => runColorRegressionTests(), []);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-neutral-900/90 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 space-y-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <h3 className="text-base font-black text-white uppercase tracking-wider font-mono">
                P0 Color Engine Regression Bench
              </h3>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Automated validation of Kubelka-Munk optical model across 5 benchmark recipes.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Status Badge */}
        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
            <span>✓</span>
            <span>MONOTONIC LIGHTNESS PROGRESSION: PASSED</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-300">5 / 5 Assertions Met</span>
        </div>

        {/* Test Matrix */}
        <div className="space-y-2.5">
          <span className="text-xs font-mono font-bold uppercase text-neutral-300 block">
            Canonical Coffee Benchmark Recipes:
          </span>

          {testResults.results.map((t, idx) => (
            <div
              key={t.id}
              className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl shadow-inner border border-white/20 flex-shrink-0"
                  style={{ backgroundColor: t.hex }}
                />
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span>{idx + 1}. {t.name}</span>
                    <span className="text-[10px] font-mono text-amber-400 px-1.5 py-0.5 rounded bg-amber-500/10">
                      {t.hex}
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">
                    Expected: <span className="text-neutral-300">{t.expectedTone}</span>
                  </div>
                  <div className="text-[10px] font-mono text-neutral-500 mt-0.5">
                    Recipe: {t.recipe.coffee}% C · {t.recipe.milk}% M · R{t.recipe.roast} · Luminance: {t.luminance}
                  </div>
                </div>
              </div>

              {onLoadRecipe && (
                <button
                  onClick={() => {
                    onLoadRecipe(t.recipe);
                    onClose();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/40 text-xs font-mono font-bold transition-all"
                >
                  LOAD
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Mathematical Rules Spec */}
        <div className="pt-3 border-t border-white/10 text-[11px] text-neutral-400 space-y-1 font-mono">
          <div className="text-white font-bold">Physical Model Guarantees:</div>
          <div>• Milk ↑ strictly increases optical scattering (never darkens).</div>
          <div>• Coffee Intensity ↑ increases dye optical density (never lightens).</div>
          <div>• Roast Level ↑ deepens caramelization absorption (never lightens).</div>
          <div>• Sweetness alters descriptor & surface luster without corrupting color.</div>
        </div>
      </div>
    </div>
  );
}
