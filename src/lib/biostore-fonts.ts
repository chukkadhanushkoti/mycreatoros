// Google Fonts loader for BioStore themes.
// Each theme declares a body font (typography.fontFamily) and an optional
// heading font (typography.headingFont). The public bio page and the editor
// preview load exactly those families at runtime via a Google Fonts <link>,
// so new/renamed theme fonts resolve without touching the global next/font
// setup (which only drives the marketing + dashboard chrome).

// Families that should fall back to a serif stack rather than sans-serif.
const SERIF_FONTS = new Set<string>([
  "Playfair Display",
  "Fraunces",
  "DM Serif Display",
]);

// Weight axis to request per family (keeps the stylesheet lean).
const FONT_WEIGHTS: Record<string, string> = {
  Inter: "400;500;600;700",
  "Space Grotesk": "400;500;600;700",
  Sora: "400;500;600;700",
  Syne: "400;600;700;800",
  Outfit: "400;500;600;700",
  Figtree: "400;500;600;700",
  Fraunces: "400;500;600;700",
  "Playfair Display": "400;500;600;700",
  "Plus Jakarta Sans": "400;500;600;700",
  Unbounded: "400;600;700;800",
  "DM Sans": "400;500;600;700",
  "DM Serif Display": "400",
};

const DEFAULT_WEIGHTS = "400;500;600;700";

/** The unique font families a theme needs (body + heading). */
export function themeFontFamilies(theme: {
  typography?: { fontFamily?: string; headingFont?: string };
} | null | undefined): string[] {
  const body = theme?.typography?.fontFamily;
  const heading = theme?.typography?.headingFont;
  return Array.from(new Set([body, heading].filter(Boolean) as string[]));
}

/** Build a Google Fonts css2 stylesheet URL for the given families. */
export function buildGoogleFontsHref(families: string[]): string | null {
  const unique = Array.from(new Set(families.filter(Boolean)));
  if (unique.length === 0) return null;
  const params = unique
    .map((f) => {
      const name = f.trim().replace(/\s+/g, "+");
      const weights = FONT_WEIGHTS[f] || DEFAULT_WEIGHTS;
      return `family=${name}:wght@${weights}`;
    })
    .join("&");
  return `https://fonts.googleapis.com/css2?${params}&display=swap`;
}

/** A quoted CSS font-family value with an appropriate generic fallback. */
export function cssFontStack(family?: string): string | undefined {
  if (!family) return undefined;
  const fallback = SERIF_FONTS.has(family) ? "serif" : "sans-serif";
  return `'${family}', ${fallback}`;
}
