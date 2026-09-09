# LiquidPalette — 50 Shades of Coffee
### Automated Coffee Kiosk Touchscreen User Interface

**Campaign:** 50 Shades of Coffee  
**Tagline:** YOUR COFFEE. YOUR COLOR.  
**Hardware Profile:** 9:16 Portrait Touchscreen Kiosk (1080 × 1920)

---

## 🌟 Executive Overview
LiquidPalette transforms coffee customization from an opaque static menu into a tactile, visual **color-mixing experience**. Rather than ordering a pre-defined drink ("Latte", "Cappuccino", "Cortado"), customers craft their coffee by balancing four fundamental parameters:
1. **Coffee / Espresso Intensity** (Light to Intense)
2. **Milk Level** (Black to Creamy)
3. **Roast Profile** (Light Blonde to Dark Italian)
4. **Sweetness** (None to Sweet)

As sliders adjust, the transparent visual cup dynamically morphs color in real time via a Kubelka-Munk fluid optical absorption engine, calculating an exact **Hex Code** (e.g., `#A96F42`), a poetic descriptor (e.g., *"Balanced Caramel"*), and a volumetric ratio breakdown.

---

## 🚀 How to Launch and Experience

### Option 1: Instant Zero-Dependency Mode (Recommended for Immediate Testing)
Open `index.html` directly in any modern desktop or mobile browser (Chrome, Edge, Safari, Firefox).
- No Node.js or npm installation required.
- Everything is bundled and ready to run with 60fps canvas fluid dynamics, audio haptics, and scannable QR generation.

### Option 2: Vite + React Modern Development
If Node.js is installed on your system:
```bash
npm install
npm run dev
```

---

## 📱 Flow & Screens Included

1. **Home Screen (`home`)**:
   - LiquidPalette animated branding with pulsing orbital status ring (`Station #04 · Online`).
   - Headline: `MAKE YOUR COFFEE` | Subheadline: `Mix it. See it. Taste it.`
   - Animated continuous gradient spectrum (`#1A0D07` → `#582B1B` → `#A96F42` → `#D7A981` → `#FFF8EE`).
   - Primary CTA: `CREATE MY COFFEE →` | Quick Order: `QUICK ORDER (BALANCED)`.

2. **Coffee Creator Screen (`creator`)**:
   - **Hero Cup Visualization**: Photorealistic transparent glass coffee cup with dynamic wave oscillations, crema foam microbubbles, and milk swirls.
   - **Coffee Color ID Swatch**: Live dynamic Hex code (`#A96F42`), poetic descriptor (`Balanced Caramel`), and volumetric ratios.
   - **Physical Cup Feature**: Central 48mm × 48mm transparent square window preview callout.
   - **4 Tactile Sliders**: Coffee (20%–100%), Milk (0%–90%), Roast (1–5), Sweetness (0–20g) with Web Audio tactile tick haptics.
   - **Quick Picks (Presets)**: `BLACK`, `BALANCED`, `CREAMY`, `BOLD`, `SWEET`.
   - **🎲 Surprise Me**: Alchemist randomizer with playful color generation.
   - Persistent bottom bar with live pricing (`₹149`) and `REVIEW ORDER →`.

3. **Order Summary Screen (`summary`)**:
   - Large custom shade cup rendering.
   - Volumetric recipe breakdown: Coffee %, Milk %, Roast label, Sweetness.
   - Transparent Cup Window physical verification notice.
   - Price breakdown: `₹149` (Regular 250ml).
   - CTAs: `← EDIT` and `ORDER NOW →`.

4. **Payment Screen (`payment`)**:
   - Tabbed checkout:
     - **UPI QR**: Live SVG QR code with simulated phone scan payment trigger.
     - **NFC Tap**: Contactless tap simulation.
     - **Card**: Chip card reader simulation.

5. **Preparation Screen (`prep`)**:
   - Automated 4-stage dispensing sequence:
     `BREWING (0–35%)` → `MIXING (35–70%)` → `POURING (70–95%)` → `READY (100%)`.
   - Dynamic cup filling animation with rising liquid level, steam, and progress percentages.

6. **Ready Screen (`ready`)**:
   - `YOUR COFFEE IS READY ☕`
   - `COLLECT FROM STATION 01` badge.
   - Physical cup reveal showcasing the liquid visible through the transparent square window.
   - Scannable Digital Coffee Passport QR to save recipe to customer's phone for 1-tap reordering.

7. **Edge & Error States Simulator (`⚠️ Edge States`)**:
   - Testable via the top navigation bar:
     1. *Ingredient Unavailable*: Oat Milk depleted, automatic fallback prompt.
     2. *Payment / Network Failure*: Gateway timeout with retry.
     3. *Maintenance Mode*: Cleaning flush cycle in progress.

8. **Embedded Design System (`🎨 Design System`)**:
   - **50 Shades of Coffee Swatch Matrix**: 18+ signature blends (e.g., *Obsidian Espresso #160B06*, *Caramel Bold #8E593B*, *Balanced Caramel #A96F42*, *Silk Flat White #C28B5E*, *Ivory Silk Crema #F4E4D3*) with 1-click loading into the mixer.
   - Design tokens: Typography scale, color tokens, and physical cup engineering blueprint.

---

## ☕ Physical Cup Integration Spec
- **Vessel**: Double-walled matte obsidian charcoal composite cup.
- **Viewing Window**: Center 48mm × 48mm crystal-clear optical acrylic square.
- **Brand Purpose**: "SEE YOUR COLOR COME TO LIFE." Translates digital color choice directly into physical beverage satisfaction.
