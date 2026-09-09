import React, { useState } from 'react';
import { CustomQRCode } from '../utils/qrEngine';
import { sound } from '../utils/soundEngine';

export function PaymentScreen({ colorData, onCancel, onPaymentSuccess }) {
  const [paymentMethod, setPaymentMethod] = useState('upi');

  return (
    <div className="flex flex-col h-full overflow-y-auto px-5 py-5 animate-fadeIn">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <button
          onClick={() => { sound.playTick(); onCancel(); }}
          className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white"
        >
          <span>←</span>
          <span>CANCEL</span>
        </button>
        <span className="text-xs font-mono text-amber-400 font-bold uppercase">CHECKOUT</span>
      </div>

      <div className="my-auto py-4 space-y-4 max-w-sm mx-auto w-full text-center">
        <div>
          <h2 className="text-2xl font-extrabold text-white">
            ALMOST THERE ☕
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            {colorData.descriptor} · <span className="font-mono text-amber-400 font-bold">₹149</span>
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 p-1 rounded-2xl bg-neutral-900/60 backdrop-blur-xl border border-white/10">
          <button
            onClick={() => { sound.playTick(); setPaymentMethod('upi'); }}
            className={`py-2 px-2 rounded-xl text-xs font-mono font-bold transition-all ${
              paymentMethod === 'upi' ? 'bg-amber-500 text-black shadow-md' : 'text-neutral-400 hover:text-white'
            }`}
          >
            UPI QR
          </button>
          <button
            onClick={() => { sound.playTick(); setPaymentMethod('nfc'); }}
            className={`py-2 px-2 rounded-xl text-xs font-mono font-bold transition-all ${
              paymentMethod === 'nfc' ? 'bg-amber-500 text-black shadow-md' : 'text-neutral-400 hover:text-white'
            }`}
          >
            NFC TAP
          </button>
          <button
            onClick={() => { sound.playTick(); setPaymentMethod('card'); }}
            className={`py-2 px-2 rounded-xl text-xs font-mono font-bold transition-all ${
              paymentMethod === 'card' ? 'bg-amber-500 text-black shadow-md' : 'text-neutral-400 hover:text-white'
            }`}
          >
            CARD
          </button>
        </div>

        {paymentMethod === 'upi' && (
          <div className="bg-neutral-900/70 backdrop-blur-2xl rounded-3xl p-5 border border-white/15 space-y-3">
            <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
              SCAN WITH ANY UPI APP
            </span>

            <div className="flex justify-center">
              <CustomQRCode payload={`upi://pay?pa=kiosk04@liquidpalette&am=149&cu=INR&shade=${colorData.hex}`} size={160} hex={colorData.hex} />
            </div>

            <div className="flex items-center justify-center gap-3 text-[11px] font-mono text-neutral-400">
              <span>📱 GPay</span>
              <span>⚡ PhonePe</span>
              <span>🔷 Paytm</span>
            </div>

            <button
              onClick={() => { sound.playSuccess(); onPaymentSuccess(); }}
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs tracking-wider uppercase shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
            >
              ✓ SIMULATE PHONE SCAN (PAY ₹149)
            </button>
          </div>
        )}

        {paymentMethod === 'nfc' && (
          <div className="bg-neutral-900/70 backdrop-blur-2xl rounded-3xl p-6 border border-white/15 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/10 border-2 border-dashed border-amber-400 flex items-center justify-center text-2xl animate-pulse">
              📡
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">TAP CARD OR PHONE</h4>
              <p className="text-[11px] text-neutral-400 mt-0.5">Hold your Apple Pay, Google Wallet, or contactless card near the sensor.</p>
            </div>
            <button
              onClick={() => { sound.playSuccess(); onPaymentSuccess(); }}
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs tracking-wider uppercase active:scale-95 transition-all"
            >
              ✓ SIMULATE NFC TAP
            </button>
          </div>
        )}

        {paymentMethod === 'card' && (
          <div className="bg-neutral-900/70 backdrop-blur-2xl rounded-3xl p-6 border border-white/15 space-y-4">
            <div className="text-3xl">💳</div>
            <div>
              <h4 className="text-sm font-bold text-white">INSERT OR SWIPE CARD</h4>
              <p className="text-[11px] text-neutral-400 mt-0.5">Insert chip card into reader slot on right side.</p>
            </div>
            <button
              onClick={() => { sound.playSuccess(); onPaymentSuccess(); }}
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs tracking-wider uppercase active:scale-95 transition-all"
            >
              ✓ SIMULATE CARD AUTHORIZED
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
