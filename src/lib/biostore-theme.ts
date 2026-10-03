import { bioStoreThemes, type BioStoreTheme } from "@/config/biostore-themes";
import type { BioStoreThemeOverrides } from "@/lib/biostore-api";

const COLOR_KEYS = ["backgroundColor", "textColor", "cardColor", "buttonColor", "buttonTextColor", "accentColor", "mutedColor"];
const TYPO_KEYS = ["fontFamily", "headingFont"];
const STYLE_KEYS = ["buttonStyle", "spacing", "shadowStyle", "buttonRadius", "cardRadius", "avatarBorder", "iconStyle", "bgEffect"];

/** Resolve the same appearance for the public page and the editor preview. */
export function resolveBioStoreTheme(id?: string, overrides?: BioStoreThemeOverrides | Record<string, unknown>): BioStoreTheme {
  const base = bioStoreThemes.find(theme => theme.id === id) || bioStoreThemes[0];
  const colors: Record<string, unknown> = { ...base.colors };
  const typography: Record<string, unknown> = { ...base.typography };
  const styles: Record<string, unknown> = { ...base.styles };

  if (overrides && typeof overrides === "object") {
    const values = overrides as Record<string, unknown>;
    if (values.colors && typeof values.colors === "object") Object.assign(colors, values.colors);
    if (values.typography && typeof values.typography === "object") Object.assign(typography, values.typography);
    if (values.styles && typeof values.styles === "object") Object.assign(styles, values.styles);
    for (const [key, value] of Object.entries(values)) {
      if (value === undefined || value === null || value === "") continue;
      if (COLOR_KEYS.includes(key)) colors[key] = value;
      else if (TYPO_KEYS.includes(key)) typography[key] = value;
      else if (STYLE_KEYS.includes(key)) styles[key] = value;
    }
  }

  return {
    ...base,
    colors: colors as unknown as BioStoreTheme["colors"],
    typography: typography as unknown as BioStoreTheme["typography"],
    styles: styles as unknown as BioStoreTheme["styles"],
  };
}
