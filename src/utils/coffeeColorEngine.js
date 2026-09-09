/**
 * LiquidPalette - Coffee Color Blending Physics Engine
 * Implements realistic fluid absorption and optical blending models
 * for coffee, milk, roast intensity, and sweetness.
 */

export function blendCoffeePhysics(coffee, milk, roast, sweetness) {
  // coffee: 20 to 100
  // milk: 0 to 90
  // roast: 1 (Light Blonde) to 5 (Dark Italian)
  // sweetness: 0 to 20

  const roastNorm = (roast - 1) / 4; // 0.0 (Light Blonde) to 1.0 (Dark Italian)
  const coffeeNorm = (coffee - 20) / 80; // 0.0 (Light 20%) to 1.0 (Strong 100%)

  // 1. Base espresso pigment colors across roast spectrum:
  // Roast 1 (Blonde): Warm vibrant golden/cinnamon amber
  // Roast 5 (Dark Italian): Deep obsidian black-brown
  const blondeR = 178, blondeG = 104, blondeB = 40;
  const darkR = 24,   darkG = 11,   darkB = 6;

  let baseR = Math.round(blondeR * (1 - roastNorm) + darkR * roastNorm);
  let baseG = Math.round(blondeG * (1 - roastNorm) + darkG * roastNorm);
  let baseB = Math.round(blondeB * (1 - roastNorm) + darkB * roastNorm);

  // 2. Coffee Intensity effect on base coffee:
  // Low intensity (20%) dilutes the pigment, making it lighter and more translucent
  // High intensity (100%) concentrates the pigment, making it dark, rich, and opaque
  const dilution = (1 - coffeeNorm); // 1.0 at 20% coffee, 0.0 at 100% coffee
  baseR = Math.round(baseR + dilution * (224 - baseR) * 0.48);
  baseG = Math.round(baseG + dilution * (172 - baseG) * 0.48);
  baseB = Math.round(baseB + dilution * (116 - baseB) * 0.48);

  // 3. Milk blending with pigment-power weighting:
  const milkNorm = milk / 100;
  const milkR = 248, milkG = 240, milkB = 224;

  // Higher coffee intensity and darker roast resist milk lightening
  const pigmentPower = (0.35 + 0.65 * coffeeNorm) * (0.65 + 0.35 * roastNorm);
  // Milk visual weight curve:
  const visualMilk = Math.pow(milkNorm, 0.58 + 0.48 * pigmentPower);

  let r = Math.round(baseR * (1 - visualMilk) + milkR * visualMilk);
  let g = Math.round(baseG * (1 - visualMilk) + milkG * visualMilk);
  let b = Math.round(baseB * (1 - visualMilk) + milkB * visualMilk);

  // 4. Sweetness glaze (caramel amber tones)
  const sweetWeight = sweetness / 20;
  r = Math.min(255, Math.round(r + sweetWeight * 12));
  g = Math.min(255, Math.round(g + sweetWeight * 6));
  b = Math.max(0, Math.round(b - sweetWeight * 8));

  // Clamp RGB values
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));

  const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;

  // Dynamic poetic descriptor based on exact profile
  let descriptor = "Balanced Caramel";
  let notes = "Toasted Cocoa • Honeyed Crema";

  if (milk <= 8) {
    if (roast >= 4) {
      descriptor = coffee >= 80 ? "Obsidian Dark Espresso" : "Midnight French Roast";
      notes = "Smoky Dark Chocolate • Molasses";
    } else if (roast >= 2) {
      descriptor = coffee >= 80 ? "Intense Ristretto" : "Bold Americano Crema";
      notes = "Toasted Walnut • Cedar";
    } else {
      descriptor = "Golden Blonde Extraction";
      notes = "Meyer Lemon • Floral Honey";
    }
  } else if (milk <= 28) {
    if (roast >= 4) {
      descriptor = "Caramel Bold";
      notes = "Burnt Sugar • Roasted Hazelnut";
    } else if (roast >= 2) {
      descriptor = "Toasted Cortado Hue";
      notes = "Pecan • Dark Cocoa Nibs";
    } else {
      descriptor = "Amber Macchiato";
      notes = "Golden Caramel • Vanilla Pod";
    }
  } else if (milk <= 58) {
    if (roast >= 4) {
      descriptor = "Smoky Mocha Velvet";
      notes = "Bittersweet Cocoa • Velvety Crema";
    } else if (roast >= 2) {
      descriptor = "Balanced Caramel";
      notes = "Buttery Toffee • Warm Cinnamon";
    } else {
      descriptor = "Blonde Silk Flat White";
      notes = "Almond Butter • Sweet Cream";
    }
  } else if (milk <= 78) {
    if (roast >= 4) {
      descriptor = "Hazelnut Café Latte";
      notes = "Milk Chocolate • Roasted Chestnut";
    } else if (roast >= 2) {
      descriptor = "Creamy Honey Latte";
      notes = "Wildflower Honey • Steamed Microfoam";
    } else {
      descriptor = "Silky Vanilla Dawn";
      notes = "Crème Brûlée • Sweet Brioche";
    }
  } else {
    descriptor = roast >= 3 ? "Velvet Cloud au Lait" : "Ivory Silk Crema";
    notes = "Froth Cream • Delicate Espresso Mist";
  }

  // Volumetric breakdown
  const totalParts = coffee + milk;
  const coffeePct = Math.round((coffee / totalParts) * 100);
  const milkPct = 100 - coffeePct;

  const roastNames = ["Light Blonde", "Medium-Light", "Medium Roast", "Medium-Dark", "Dark Italian"];
  const roastLabel = roastNames[roast - 1];

  let sweetLabel = "None";
  if (sweetness >= 15) sweetLabel = "Sweet (15g)";
  else if (sweetness >= 8) sweetLabel = "Medium (10g)";
  else if (sweetness > 0) sweetLabel = "Low (5g)";

  const recipeSummary = `${coffeePct}% Coffee · ${milkPct}% Milk · ${roastLabel} · ${sweetLabel}`;

  return {
    r, g, b, hex, descriptor, notes, coffeePct, milkPct, roastLabel, sweetLabel, recipeSummary
  };
}

export const SIGNATURE_50_SHADES = [
  { hex: '#160B06', name: 'Obsidian Espresso', coffee: 100, milk: 0, roast: 5, sweetness: 0 },
  { hex: '#23110A', name: 'Midnight French', coffee: 90, milk: 0, roast: 4, sweetness: 0 },
  { hex: '#31180E', name: 'Double Shot Ristretto', coffee: 95, milk: 5, roast: 4, sweetness: 0 },
  { hex: '#422013', name: 'Smoky Dark Roast', coffee: 85, milk: 10, roast: 4, sweetness: 5 },
  { hex: '#582B1B', name: 'Toasted Chestnut', coffee: 80, milk: 15, roast: 3, sweetness: 5 },
  { hex: '#6E3722', name: 'Cortado Bold', coffee: 75, milk: 20, roast: 4, sweetness: 5 },
  { hex: '#7D3F28', name: 'Pecan Macchiato', coffee: 70, milk: 25, roast: 3, sweetness: 10 },
  { hex: '#8E593B', name: 'Caramel Bold', coffee: 72, milk: 28, roast: 4, sweetness: 5 },
  { hex: '#9E6543', name: 'Cinnamon Bark', coffee: 65, milk: 32, roast: 3, sweetness: 5 },
  { hex: '#A96F42', name: 'Balanced Caramel', coffee: 62, milk: 38, roast: 3, sweetness: 8 },
  { hex: '#B57C4F', name: 'Warm Toffee Crema', coffee: 58, milk: 42, roast: 3, sweetness: 10 },
  { hex: '#C28B5E', name: 'Silk Flat White', coffee: 52, milk: 48, roast: 3, sweetness: 5 },
  { hex: '#CD9A6F', name: 'Golden Honey Latte', coffee: 46, milk: 54, roast: 2, sweetness: 10 },
  { hex: '#D7A981', name: 'Hazelnut au Lait', coffee: 40, milk: 60, roast: 3, sweetness: 10 },
  { hex: '#DFB794', name: 'Blonde Velvet', coffee: 35, milk: 65, roast: 1, sweetness: 8 },
  { hex: '#E7C6A8', name: 'Vanilla Steamer', coffee: 28, milk: 72, roast: 2, sweetness: 15 },
  { hex: '#EED5BD', name: 'Dawn Mist Cream', coffee: 22, milk: 78, roast: 2, sweetness: 5 },
  { hex: '#F4E4D3', name: 'Ivory Silk Crema', coffee: 15, milk: 85, roast: 1, sweetness: 0 }
];

export const PRESETS = [
  { id: 'black', label: 'BLACK', desc: 'Strong · No milk', coffee: 90, milk: 0, roast: 4, sweetness: 0 },
  { id: 'balanced', label: 'BALANCED', desc: 'Medium coffee · Medium milk', coffee: 62, milk: 38, roast: 3, sweetness: 5 },
  { id: 'creamy', label: 'CREAMY', desc: 'Light coffee · High milk', coffee: 30, milk: 75, roast: 2, sweetness: 8 },
  { id: 'bold', label: 'BOLD', desc: 'High coffee · Low milk', coffee: 80, milk: 18, roast: 4, sweetness: 0 },
  { id: 'sweet', label: 'SWEET', desc: 'Balanced coffee · Creamy · Sweet', coffee: 50, milk: 55, roast: 3, sweetness: 18 },
];
