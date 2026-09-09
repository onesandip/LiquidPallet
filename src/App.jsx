import React, { useState, useMemo, useEffect } from 'react';
import { mixCoffeeColor, generateSensibleSurprise, QUICK_ORDER_PRESETS } from './utils/coffeeColorEngine';
import { sound } from './utils/soundEngine';
import { HomeScreen } from './components/HomeScreen';
import { CreatorScreen } from './components/CreatorScreen';
import { SummaryScreen } from './components/SummaryScreen';
import { PaymentScreen } from './components/PaymentScreen';
import { PreparationScreen } from './components/PreparationScreen';
import { ReadyScreen } from './components/ReadyScreen';
import { QuickOrderModal } from './components/QuickOrderModal';
import { SurpriseModal } from './components/SurpriseModal';
import { TestBenchModal } from './components/TestBenchModal';
import { EdgeStatesModal } from './components/EdgeStatesModal';
import { DesignSystemModal } from './components/DesignSystemModal';

export default function App() {
  // Current screen state: 'home', 'creator', 'summary', 'payment', 'prep', 'ready'
  const [currentScreen, setCurrentScreen] = useState('home');

  // Core coffee recipe parameters
  const [coffee, setCoffee] = useState(62);
  const [milk, setMilk] = useState(38);
  const [roast, setRoast] = useState(3);
  const [sweetness, setSweetness] = useState(6);

  // Modals & Display states
  const [showQuickOrderModal, setShowQuickOrderModal] = useState(false);
  const [showSurpriseModal, setShowSurpriseModal] = useState(false);
  const [showTestBenchModal, setShowTestBenchModal] = useState(false);
  const [showEdgeStateModal, setShowEdgeStateModal] = useState(false);
  const [showDesignSystemModal, setShowDesignSystemModal] = useState(false);
  const [showWindowCallout, setShowWindowCallout] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [kioskMode, setKioskMode] = useState('kiosk');
  const [activeEdgeState, setActiveEdgeState] = useState(null);
  const [prepProgress, setPrepProgress] = useState(0);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
    if (next) sound.playTick(550);
  };

  // Pure deterministic color and recipe calculation
  const colorData = useMemo(() => {
    return mixCoffeeColor({ coffee, milk, roast, sweetness });
  }, [coffee, milk, roast, sweetness]);

  // Surprise Me Generator with sensible boundaries
  const [surpriseBlend, setSurpriseBlend] = useState(null);
  const handleTriggerSurprise = () => {
    sound.playDrip();
    const blend = generateSensibleSurprise();
    setSurpriseBlend(blend);
    setShowSurpriseModal(true);
  };

  const handleApplySurprise = () => {
    if (!surpriseBlend) return;
    sound.playSuccess();
    setCoffee(surpriseBlend.coffee);
    setMilk(surpriseBlend.milk);
    setRoast(surpriseBlend.roast);
    setSweetness(surpriseBlend.sweetness);
    setShowSurpriseModal(false);
    setCurrentScreen('creator');
  };

  // Handle Quick Order selection directly to Summary
  const handleSelectQuickPreset = (preset) => {
    sound.playDrip();
    setCoffee(preset.coffee);
    setMilk(preset.milk);
    setRoast(preset.roast);
    setSweetness(preset.sweetness);
    setCurrentScreen('summary');
  };

  // Preparation sequence: 4-stage brewing simulation
  useEffect(() => {
    let interval = null;
    if (currentScreen === 'prep') {
      setPrepProgress(0);
      interval = setInterval(() => {
        setPrepProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            sound.playSuccess();
            setCurrentScreen('ready');
            return 100;
          }
          return prev + 2;
        });
      }, 70);
    }
    return () => clearInterval(interval);
  }, [currentScreen]);

  return (
    <div className="min-h-screen bg-[#070707] text-[#FBF9F5] flex flex-col items-center justify-center p-0 md:p-6 select-none relative">
      
      {/* Top Kiosk Terminal Controls & Debug Bar */}
      <header className="w-full max-w-5xl mb-3 px-4 py-2.5 bg-neutral-900/70 backdrop-blur-xl rounded-2xl border border-white/10 hidden md:flex items-center justify-between text-xs font-mono text-neutral-400 z-50">
        <div className="flex items-center gap-3">
          <span className="font-extrabold text-white tracking-widest uppercase">LIQUIDPALETTE</span>
          <span className="text-white/20">|</span>
          <span className="text-amber-400 font-semibold">YOUR COFFEE. YOUR COLOR.</span>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Screen Quick Jumper */}
          <select
            value={currentScreen}
            onChange={(e) => { sound.playTick(); setCurrentScreen(e.target.value); }}
            className="bg-neutral-800 text-white rounded-lg px-2.5 py-1 text-xs border border-white/10 outline-none"
          >
            <option value="home">1. Home Screen</option>
            <option value="creator">2. Coffee Creator</option>
            <option value="summary">3. Order Summary</option>
            <option value="payment">4. Payment (₹129)</option>
            <option value="prep">5. Creating / Brewing</option>
            <option value="ready">6. Coffee Ready</option>
          </select>

          {/* Test Bench Modal */}
          <button
            onClick={() => setShowTestBenchModal(true)}
            className="px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 transition-all flex items-center gap-1 font-bold"
            title="Run P0 Color Engine Verification"
          >
            <span>🧪</span>
            <span>Test Bench</span>
          </button>

          {/* Kiosk Mode Toggle */}
          <button
            onClick={() => setKioskMode(kioskMode === 'kiosk' ? 'fullscreen' : 'kiosk')}
            className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all"
          >
            {kioskMode === 'kiosk' ? '📺 Kiosk 9:16' : '🖥️ Fullscreen'}
          </button>

          {/* Edge States */}
          <button
            onClick={() => setShowEdgeStateModal(true)}
            className="px-2 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-all text-[11px]"
          >
            ⚠️ Faults
          </button>

          {/* Design System */}
          <button
            onClick={() => setShowDesignSystemModal(true)}
            className="px-2 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 transition-all text-[11px]"
          >
            🎨 50 Shades
          </button>

          {/* Sound Mute */}
          <button
            onClick={toggleSound}
            className="p-1 rounded-lg hover:bg-white/10 text-neutral-300"
            title="Audio Haptics"
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
        </div>
      </header>

      {/* Main Kiosk Chassis (9:16 Portrait Touchscreen Kiosk) */}
      <main
        className={`w-full transition-all duration-300 relative flex flex-col ${
          kioskMode === 'kiosk'
            ? 'max-w-[430px] h-[100vh] sm:h-[880px] rounded-none sm:rounded-[44px] shadow-2xl border-0 sm:border-[8px] sm:border-[#1E1E1E] bg-[#101010] ring-1 ring-white/10 overflow-hidden'
            : 'w-full max-w-2xl h-[100vh] sm:h-[920px] rounded-none sm:rounded-3xl border border-white/10 bg-[#101010] overflow-hidden'
        }`}
      >
        {/* Top Hardware Bezel Status Bar */}
        <div className="w-full bg-[#181818] px-5 py-2 flex items-center justify-between text-[10px] font-mono text-neutral-500 border-b border-white/5 select-none">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/70">LP-KIOSK-04</span>
          </div>
          <div className="w-12 h-1.5 rounded-full bg-neutral-800" />
          <div className="flex items-center gap-2">
            <button onClick={toggleSound} className="hover:text-white">
              {soundEnabled ? '🔊' : '🔇'}
            </button>
            <span>PURE EXTRACTION</span>
          </div>
        </div>

        {/* Active Edge State Banner */}
        {activeEdgeState && (
          <div className="bg-red-500/90 text-white text-xs font-mono px-4 py-2 flex items-center justify-between z-30">
            <div className="flex items-center gap-2">
              <span>⚠️</span>
              <span>{activeEdgeState.message}</span>
            </div>
            <button
              onClick={() => setActiveEdgeState(null)}
              className="underline text-[10px] font-bold"
            >
              DISMISS
            </button>
          </div>
        )}

        {/* Main Viewport Content */}
        <div className="flex-1 overflow-hidden relative">
          {currentScreen === 'home' && (
            <HomeScreen
              colorData={colorData}
              onStartCustomizing={() => setCurrentScreen('creator')}
              onOpenQuickOrder={() => setShowQuickOrderModal(true)}
            />
          )}

          {currentScreen === 'creator' && (
            <CreatorScreen
              coffee={coffee}
              setCoffee={setCoffee}
              milk={milk}
              setMilk={setMilk}
              roast={roast}
              setRoast={setRoast}
              sweetness={sweetness}
              setSweetness={setSweetness}
              colorData={colorData}
              showWindowCallout={showWindowCallout}
              setShowWindowCallout={setShowWindowCallout}
              onBack={() => setCurrentScreen('home')}
              onReviewOrder={() => setCurrentScreen('summary')}
              onSurpriseMe={handleTriggerSurprise}
              onOpenTestBench={() => setShowTestBenchModal(true)}
            />
          )}

          {currentScreen === 'summary' && (
            <SummaryScreen
              colorData={colorData}
              coffee={coffee}
              milk={milk}
              roast={roast}
              sweetness={sweetness}
              onEdit={() => setCurrentScreen('creator')}
              onOrderNow={() => setCurrentScreen('payment')}
            />
          )}

          {currentScreen === 'payment' && (
            <PaymentScreen
              colorData={colorData}
              onCancel={() => setCurrentScreen('summary')}
              onPaymentSuccess={() => setCurrentScreen('prep')}
            />
          )}

          {currentScreen === 'prep' && (
            <PreparationScreen
              colorData={colorData}
              prepProgress={prepProgress}
            />
          )}

          {currentScreen === 'ready' && (
            <ReadyScreen
              colorData={colorData}
              coffee={coffee}
              milk={milk}
              roast={roast}
              sweetness={sweetness}
              onMakeAnother={() => setCurrentScreen('home')}
              onOpenTestBench={() => setShowTestBenchModal(true)}
            />
          )}
        </div>

        {/* Bottom Hardware Bezel (Dispenser Bay) */}
        <div className="w-full bg-[#151515] py-2 px-4 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-neutral-500 select-none">
          <div className="flex items-center gap-1.5">
            <span>⚡ NFC SENSOR</span>
            <span className="text-white/20">|</span>
            <span>📷 OPTICAL SCANNER</span>
          </div>
          <span className="text-amber-500/80 font-bold">DISPENSER BAY 01 ▼</span>
        </div>
      </main>

      {/* MODAL 1: QUICK ORDER (15-second fast checkout) */}
      {showQuickOrderModal && (
        <QuickOrderModal
          onClose={() => setShowQuickOrderModal(false)}
          onSelectPreset={handleSelectQuickPreset}
          onSurpriseMe={handleTriggerSurprise}
        />
      )}

      {/* MODAL 2: SURPRISE ME MODAL */}
      {showSurpriseModal && surpriseBlend && (
        <SurpriseModal
          surpriseBlend={surpriseBlend}
          onTryAgain={handleTriggerSurprise}
          onApply={handleApplySurprise}
        />
      )}

      {/* MODAL 3: P0 COLOR ENGINE TEST BENCH */}
      {showTestBenchModal && (
        <TestBenchModal
          onClose={() => setShowTestBenchModal(false)}
          onLoadRecipe={(r) => {
            setCoffee(r.coffee);
            setMilk(r.milk);
            setRoast(r.roast);
            setSweetness(r.sweetness);
            setCurrentScreen('creator');
          }}
        />
      )}

      {/* MODAL 4: EDGE STATES SIMULATOR */}
      {showEdgeStateModal && (
        <EdgeStatesModal
          onClose={() => setShowEdgeStateModal(false)}
          onSelectEdgeState={(st) => setActiveEdgeState(st)}
        />
      )}

      {/* MODAL 5: 50 SHADES MATRIX & DESIGN SYSTEM */}
      {showDesignSystemModal && (
        <DesignSystemModal
          onClose={() => setShowDesignSystemModal(false)}
          onSelectShade={(s) => {
            setCoffee(s.coffee);
            setMilk(s.milk);
            setRoast(s.roast);
            setSweetness(s.sweetness);
            setCurrentScreen('creator');
          }}
        />
      )}
    </div>
  );
}
