import React, { useState } from 'react';
import { CustomQRCode } from '../utils/qrEngine';
import { sound } from '../utils/soundEngine';

export function PaymentScreen({ colorData, onCancel, onPaymentSuccess }) {
  const [paymentMethod, setPaymentMethod] = useState('upi');

  return (
    <div className="flex flex-col h-full overflow-y-auto px-5 py-5 animate-fadeIn select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <button
          onClick={() => { sound.playTick(); onCancel(); }}
          className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white"
        >
          <span>←</span>
          <span>CANCEL</span>
        </button>
        <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
          PAYMENT
        </span>
      </div>

      <div className="my-auto py-3 space-y-4 max-w-sm mx-auto w-full text-center">
        <div>
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">
            PAYMENT DUE
          </span>
          <div className="text-3xl font-black text-white mt-0.5">
            ₹129
          </div>
          <p className="text-xs text-neutral-400 mt-1 font-mono">
            {colorData.name} · <span className="text-amber-400">{colorData.coffeeId}</span>
          </p>
        </div>

        {/* 3 Payment Options: UPI, CARD, TAP */}
        <div className="grid grid-cols-3 gap-2 p-1 rounded-2xl bg-neutral-900/60 backdrop-blur-xl border border-white/10">
          <button
            onClick={() => { sound.playTick(); setPaymentMethod('upi'); }}
            className={`py-2 px-2 rounded-xl text-xs font-mono font-bold transition-all ${
              paymentMethod === 'upi' ? 'bg-amber-500 text-black shadow-md' : 'text-neutral-400 hover:text-white'
            }`}
          >
            UPI
          </button>
          <button
            onClick={() => { sound.playTick(); setPaymentMethod('card'); }}
            className={`py-2 px-2 rounded-xl text-xs font-mono font-bold transition-all ${
              paymentMethod === 'card' ? 'bg-amber-500 text-black shadow-md' : 'text-neutral-400 hover:text-white'
            }`}
          >
            CARD
          </button>
          <button
            onClick={() => { sound.playTick(); setPaymentMethod('tap'); }}
            className={`py-2 px-2 rounded-xl text-xs font-mono font-bold transition-all ${
              paymentMethod === 'tap' ? 'bg-amber-500 text-black shadow-md' : 'text-neutral-400 hover:text-white'
            }`}
          >
            TAP
          </button>
        </div>

        {/* UPI Mode */}
        {paymentMethod === 'upi' && (
          <div className="bg-neutral-900/75 backdrop-blur-2xl rounded-3xl p-5 border border-white/15 space-y-3 shadow-xl">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
              SCAN WITH ANY UPI APP
            </span>

            <div className="flex justify-center">
              <CustomQRCode payload={`upi://pay?pa=kiosk04@liquidpalette&am=129&cu=INR&shade=${colorData.hex}`} size={160} hex={colorData.hex} />
            </div>

            <div className="flex items-center justify-center gap-3 text-[10px] font-mono text-neutral-400">
              <span>GPay</span>
              <span>•</span>
              <span>PhonePe</span>
              <span>•</span>
              <span>Paytm</span>
            </div>

            <button
              onClick={() => { sound.playSuccess(); onPaymentSuccess(); }}
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs tracking-wider uppercase shadow-lg shadow-emerald-500/20 active:scale-95 transition-all font-mono"
            >
              ✓ SIMULATE SCAN & PAY ₹129
            </button>
          </div>
        )}

        {/* Card Mode */}
        {paymentMethod === 'card' && (
          <div className="bg-neutral-900/75 backdrop-blur-2xl rounded-3xl p-6 border border-white/15 space-y-4 shadow-xl">
            <div className="text-3xl">💳</div>
            <div>
              <h4 className="text-sm font-bold text-white">INSERT OR DIP CARD</h4>
              <p className="text-[11px] text-neutral-400 mt-0.5">Use card slot on the kiosk right bezel.</p>
            </div>
            <button
              onClick={() => { sound.playSuccess(); onPaymentSuccess(); }}
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs tracking-wider uppercase active:scale-95 transition-all font-mono"
            >
              ✓ SIMULATE CARD APPROVED
            </button>
          </div>
        )}

        {/* Tap Mode */}
        {paymentMethod === 'tap' && (
          <div className="bg-neutral-900/75 backdrop-blur-2xl rounded-3xl p-6 border border-white/15 space-y-4 shadow-xl">
            <div className="w-14 h-14 mx-auto rounded-full bg-amber-500/10 border-2 border-dashed border-amber-400 flex items-center justify-center text-xl animate-pulse">
              📡
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">TAP PHONE OR CARD</h4>
              <p className="text-[11px] text-neutral-400 mt-0.5">Hold contactless card or phone over reader.</p>
            </div>
            <button
              onClick={() => { sound.playSuccess(); onPaymentSuccess(); }}
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs tracking-wider uppercase active:scale-95 transition-all font-mono"
            >
              ✓ SIMULATE TAP APPROVED
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
