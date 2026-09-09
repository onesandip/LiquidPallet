import React from 'react';

export function EdgeStatesModal({ onClose, onSelectEdgeState }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-neutral-900/80 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-bold">
            <span>⚠️</span>
            <span>EDGE & ERROR STATE SIMULATOR</span>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white text-sm"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-neutral-300">
          Select an operational error condition to simulate how the LiquidPalette kiosk gracefully handles faults:
        </p>

        <div className="space-y-2">
          <button
            onClick={() => {
              onSelectEdgeState({ type: 'low_milk', message: 'Oat Milk Hopper Depleted. Whole & Almond available.' });
              onClose();
            }}
            className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left text-xs"
          >
            <div className="font-bold text-amber-400">1. Ingredient Unavailable</div>
            <div className="text-neutral-400 text-[11px]">Simulates milk hopper depleted; offers automatic swap.</div>
          </button>

          <button
            onClick={() => {
              onSelectEdgeState({ type: 'pay_fail', message: 'UPI Payment Gateway Timeout. Please re-scan QR.' });
              onClose();
            }}
            className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left text-xs"
          >
            <div className="font-bold text-red-400">2. Payment / Network Failure</div>
            <div className="text-neutral-400 text-[11px]">Simulates network drop during UPI transaction with retry.</div>
          </button>

          <button
            onClick={() => {
              onSelectEdgeState({ type: 'maintenance', message: 'Machine Cleaning Cycle in progress (Ready in 3 min).' });
              onClose();
            }}
            className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left text-xs"
          >
            <div className="font-bold text-neutral-300">3. Scheduled Maintenance Mode</div>
            <div className="text-neutral-400 text-[11px]">Kiosk automated flush & boiler descaling active.</div>
          </button>
        </div>
      </div>
    </div>
  );
}
