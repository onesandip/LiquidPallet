/**
 * LiquidPalette — Deterministic Physical Coffee Color Mixing Engine
 * Single Source of Truth for Coffee Recipe -> Physics -> Color -> Naming
 * 
 * Implements a Kubelka-Munk inspired optical model for absorbing coffee
 * melanoidin pigments and scattering milk micelles, strictly bounded to
 * the authentic natural coffee color gamut.
 */

// --- 1. NORMALIZATION & BOUNDARIES ---
export function normalizeRecipe(raw = {}) {
  const coffee = Math.max(20, Math.min(100, Number(raw.coffee ?? 62)));
  const milk = Math.max(0, Math.min(90, Number(raw.milk ?? 38)));
  const roast = Math.max(1, Math.min(5, Number(raw.roast ?? 3)));
  const sweetness = Math.max(0, Math.min(20, Number(raw.sweetness ?? 8)));

  return { coffee, milk, roast, sweetness };
}

// --- 2. VOLUMETRIC INGREDIENT RATIOS ---
export function calculateIngredientRatios(recipe) {
  const { coffee, milk, roast, sweetness } = normalizeRecipe(recipe);

  // Volumetric proportions in cup
  const totalFluidParts = coffee + milk;
  const coffeeRatio = coffee / totalFluidParts;
  const milkRatio = milk / totalFluidParts;
  const roastRatio = (roast - 1) / 4; // 0.0 (Blonde) to 1.0 (Dark Italian)
  const sweetRatio = sweetness / 20;  // 0.0 (None) to 1.0 (Sweet)

  return {
    coffee,
    milk,
    roast,
    sweetness,
    coffeeRatio,
    milkRatio,
    roastRatio,
    sweetRatio,
    coffeePercent: Math.round(coffeeRatio * 100),
    milkPercent: Math.round(milkRatio * 100)
  };
}

// --- 3. PHYSICALLY GROUNDED KUBELKA-MUNK MIXING MODEL ---
/**
 * Maps recipe parameters into authentic coffee color space.
 * Mathematical Guarantees:
 * - Increasing Milk monotonically increases luminance (never darkens).
 * - Increasing Coffee intensity monotonically decreases luminance (never lightens).
 * - Increasing Roast monotonically deepens/darkens the tone (never lightens).
 * - Sweetness alters descriptor & subtle sheen without corrupting liquid color.
 */
export function mixCoffeeColor(recipe) {
  const ratios = calculateIngredientRatios(recipe);
  const { coffee, milk, roast, sweetness, coffeeNorm, milkRatio, roastRatio, sweetRatio } = {
    ...ratios,
    coffeeNorm: (ratios.coffee - 20) / 80.0
  };

  // 1. BASE ESPRESSO PIGMENT (Across Roast Spectrum)
  // Roast 1 (Light Blonde): Warm amber/cinnamon [110, 52, 22]
  // Roast 5 (Dark Italian): Dense obsidian [22, 10, 5]
  const baseR = 110 * (1 - roastRatio) + 22 * roastRatio;
  const baseG = 52 * (1 - roastRatio) + 10 * roastRatio;
  const baseB = 22 * (1 - roastRatio) + 5 * roastRatio;

  // 2. COFFEE INTENSITY DILUTION / CONCENTRATION
  // Low coffee intensity (20%) dilutes the pigment into a lighter amber extraction
  // High coffee intensity (100%) concentrates into a dense, opaque extraction
  const dilution = 1.0 - Math.pow(coffeeNorm, 0.9);
  const dilR = baseR + dilution * (175 - baseR) * 0.45;
  const dilG = baseG + dilution * (105 - baseG) * 0.45;
  const dilB = baseB + dilution * (50 - baseB) * 0.45;

  // 3. MILK LIGHT SCATTERING (Kubelka-Munk Model)
  // Higher coffee intensity and darker roast increase pigment resistance to milk whitening
  const pigmentPower = (0.45 + 0.55 * coffeeNorm) * (0.65 + 0.35 * roastRatio);
  const effectiveMilk = Math.pow(milkRatio, 0.70 + 0.40 * pigmentPower);

  // Steamed milk target: creamy off-white [246, 236, 214]
  let r = Math.round(dilR * (1 - effectiveMilk) + 246 * effectiveMilk);
  let g = Math.round(dilG * (1 - effectiveMilk) + 236 * effectiveMilk);
  let b = Math.round(dilB * (1 - effectiveMilk) + 214 * effectiveMilk);

  // 4. SWEETNESS CONTRIBUTION (Subtle luster only, <2% luminance variance)
  r = Math.min(255, Math.round(r + sweetRatio * 4));
  g = Math.min(255, Math.round(g + sweetRatio * 1));
  b = Math.max(0, Math.round(b - sweetRatio * 3));

  // --- 5. CONTROLLED COFFEE GAMUT VALIDATION ---
  const validated = validateCoffeeGamut(r, g, b);
  const hex = `#${((1 << 24) + (validated.r << 16) + (validated.g << 8) + validated.b).toString(16).slice(1).toUpperCase()}`;

  // Generate ID and Name
  const coffeeId = generateCoffeeID(hex, ratios);
  const nameData = generateCoffeeName(ratios, validated);
  const descriptors = generateRecipeDescriptor(ratios);

  return {
    ...ratios,
    r: validated.r,
    g: validated.g,
    b: validated.b,
    hex,
    coffeeId,
    name: nameData.name,
    tagline: nameData.tagline,
    descriptors: descriptors.text,
    asciiBars: descriptors.bars,
    toneCategory: nameData.category
  };
}

// --- 4. STRICT COFFEE GAMUT ENFORCEMENT ---
export function validateCoffeeGamut(r, g, b) {
  // Ensure warm coffee chrominance: Red >= Green >= Blue
  r = Math.max(16, Math.min(252, Math.round(r)));
  g = Math.max(8, Math.min(r - 4, Math.round(g)));
  b = Math.max(4, Math.min(g - 4, Math.round(b)));

  // Prevent unnatural desaturation / graying
  const minRedSurplus = Math.max(8, Math.round(r * 0.12));
  if (r - g < minRedSurplus) {
    g = r - minRedSurplus;
  }
  const minGreenSurplus = Math.max(6, Math.round(g * 0.14));
  if (g - b < minGreenSurplus) {
    b = g - minGreenSurplus;
  }

  return {
    r: Math.max(12, Math.min(252, r)),
    g: Math.max(6, Math.min(244, g)),
    b: Math.max(4, Math.min(235, b))
  };
}

// --- 5. COFFEE COLOR ID GENERATION ---
export function generateCoffeeID(hex, ratios) {
  // Generate structured ID like LP-7F42
  const hexClean = hex.replace('#', '');
  const code = hexClean.length >= 4 ? hexClean.slice(0, 4) : '7F42';
  return `LP-${code}`;
}

// --- 6. SOPHISTICATED COFFEE NAME GENERATION ---
export function generateCoffeeName(ratios, rgb) {
  const { milk, roast, coffee, sweetness } = ratios;
  const luminance = (rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114);

  // Controlled categories matching the specification
  if (milk <= 8) {
    if (roast >= 4) {
      return {
        name: coffee >= 80 ? "Midnight Roast" : "Dark Velvet",
        tagline: "Dense Obsidian • Smoky Cocoa Nibs",
        category: "Near-black espresso"
      };
    } else if (roast >= 2) {
      return {
        name: "Obsidian Flame",
        tagline: "Toasted Walnut • Cedar Extraction",
        category: "Dark brown"
      };
    } else {
      return {
        name: "Amber Extraction",
        tagline: "Meyer Lemon • Honeyed Crema",
        category: "Blonde espresso"
      };
    }
  } else if (milk <= 28) {
    if (roast >= 4) {
      return {
        name: "Caramel Ember",
        tagline: "Burnt Sugar • Roasted Hazelnut",
        category: "Deep mocha"
      };
    } else if (roast >= 2) {
      return {
        name: "Cocoa Mist",
        tagline: "Pecan Bark • Semi-sweet Cocoa",
        category: "Deep mocha"
      };
    } else {
      return {
        name: "Amber Crema",
        tagline: "Warm Honey • Golden Crema",
        category: "Medium coffee brown"
      };
    }
  } else if (milk <= 58) {
    if (roast >= 4) {
      return {
        name: "Golden Mocha",
        tagline: "Bittersweet Truffle • Silky Crema",
        category: "Medium coffee brown"
      };
    } else if (roast >= 2) {
      return {
        name: sweetness >= 12 ? "Brown Sugar Cloud" : "Caramel Ember",
        tagline: "Toasted Toffee • Warm Cinnamon",
        category: "Caramel"
      };
    } else {
      return {
        name: "Cream Drift",
        tagline: "Almond Butter • Sweet Cream",
        category: "Light caramel"
      };
    }
  } else if (milk <= 78) {
    if (roast >= 4) {
      return {
        name: "Toasted Pecan",
        tagline: "Roasted Chestnut • Creamy Microfoam",
        category: "Cream coffee"
      };
    } else if (roast >= 2) {
      return {
        name: "Dawn Silk",
        tagline: "Silky Vanilla • Steamed Cream",
        category: "Cream coffee"
      };
    } else {
      return {
        name: "Blonde Silk",
        tagline: "Sweet Brioche • Delicate Foam",
        category: "Latte"
      };
    }
  } else {
    return {
      name: "Ivory Cloud",
      tagline: "Velvet Cream • Subtle Espresso Mist",
      category: "Latte"
    };
  }
}

// --- 7. RECIPE DESCRIPTORS & ASCII BARS ---
export function generateRecipeDescriptor(ratios) {
  const { coffee, milk, roast, sweetness } = ratios;

  let body = "Balanced";
  if (coffee >= 75) body = "Bold";
  else if (coffee <= 35) body = "Light";

  let dairy = "Balanced Milk";
  if (milk === 0) dairy = "Black";
  else if (milk <= 25) dairy = "Splash";
  else if (milk >= 65) dairy = "Very Creamy";
  else if (milk >= 40) dairy = "Creamy";

  let sweet = "No Sweetness";
  if (sweetness >= 15) sweet = "Sweet";
  else if (sweetness >= 8) sweet = "Medium Sweet";
  else if (sweetness > 0) sweet = "Low Sweetness";

  const text = `${body} · ${dairy} · ${sweet}`;

  // Unicode bar visualization
  const makeBar = (val, max = 100, len = 10) => {
    const filled = Math.min(len, Math.max(0, Math.round((val / max) * len)));
    return "█".repeat(filled) + "░".repeat(len - filled);
  };

  const bars = {
    coffee: makeBar(coffee, 100, 8),
    milk: makeBar(milk, 90, 8),
    roast: makeBar(roast, 5, 8),
    sweetness: makeBar(sweetness, 20, 8)
  };

  return { text, bars };
}

// --- 8. PRESETS FOR QUICK ORDER ---
export const QUICK_ORDER_PRESETS = [
  {
    id: 'black',
    label: 'BLACK',
    sublabel: 'Bold & intense',
    coffee: 90,
    milk: 0,
    roast: 4,
    sweetness: 0
  },
  {
    id: 'balanced',
    label: 'BALANCED',
    sublabel: 'Classic everyday coffee',
    coffee: 62,
    milk: 38,
    roast: 3,
    sweetness: 6
  },
  {
    id: 'creamy',
    label: 'CREAMY',
    sublabel: 'Smooth & milky',
    coffee: 35,
    milk: 75,
    roast: 2,
    sweetness: 8
  },
  {
    id: 'bold',
    label: 'BOLD',
    sublabel: 'Strong & dark',
    coffee: 85,
    milk: 18,
    roast: 4,
    sweetness: 0
  },
  {
    id: 'sweet',
    label: 'SWEET',
    sublabel: 'Dessert-like',
    coffee: 50,
    milk: 55,
    roast: 3,
    sweetness: 18
  }
];

// --- 9. REALISTIC SURPRISE ME GENERATOR ---
// Constrained to sensible boundaries so coffee is always delicious
export function generateSensibleSurprise() {
  const coffee = Math.floor(Math.random() * (90 - 30 + 1)) + 30; // 30% to 90%
  const milk = Math.floor(Math.random() * (70 - 10 + 1)) + 10;     // 10% to 70%
  const roast = Math.floor(Math.random() * (5 - 2 + 1)) + 2;      // Roast 2 to 5
  const sweetness = Math.floor(Math.random() * 16);               // 0 to 15g

  return {
    coffee,
    milk,
    roast,
    sweetness,
    ...mixCoffeeColor({ coffee, milk, roast, sweetness })
  };
}

// --- 10. COLOR ENGINE VERIFICATION & REGRESSION BENCHMARK ---
export function runColorRegressionTests() {
  const tests = [
    {
      id: 'test-1',
      name: '100% Black Coffee',
      expectedTone: 'Very dark brown / near-black',
      recipe: { coffee: 90, milk: 0, roast: 4, sweetness: 0 }
    },
    {
      id: 'test-2',
      name: '80% Coffee + 20% Milk',
      expectedTone: 'Dark brown',
      recipe: { coffee: 80, milk: 20, roast: 3, sweetness: 0 }
    },
    {
      id: 'test-3',
      name: '60% Coffee + 40% Milk',
      expectedTone: 'Medium brown / mocha',
      recipe: { coffee: 60, milk: 40, roast: 3, sweetness: 0 }
    },
    {
      id: 'test-4',
      name: '40% Coffee + 60% Milk',
      expectedTone: 'Light caramel / latte',
      recipe: { coffee: 40, milk: 60, roast: 3, sweetness: 0 }
    },
    {
      id: 'test-5',
      name: '20% Coffee + 80% Milk',
      expectedTone: 'Very light coffee / cream',
      recipe: { coffee: 20, milk: 80, roast: 3, sweetness: 0 }
    }
  ];

  const results = tests.map(t => {
    const mixed = mixCoffeeColor(t.recipe);
    const lum = (mixed.r * 0.299 + mixed.g * 0.587 + mixed.b * 0.114);
    return {
      ...t,
      hex: mixed.hex,
      rgb: `rgb(${mixed.r}, ${mixed.g}, ${mixed.b})`,
      luminance: Math.round(lum),
      name: mixed.name,
      category: mixed.toneCategory
    };
  });

  // Verify strict monotonic lightness progression:
  // Each step with more milk MUST be strictly lighter than previous step
  let monotonicPassed = true;
  for (let i = 1; i < results.length; i++) {
    if (results[i].luminance <= results[i - 1].luminance) {
      monotonicPassed = false;
    }
  }

  return {
    allPassed: monotonicPassed,
    results
  };
}
