import { notFound } from "next/navigation";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { BlockRenderer } from "@/components/biostore/BlockRenderer";
import { BioLinkSearch } from "@/components/biostore/BioLinkSearch";
import { BackgroundEffects } from "@/components/biostore/BackgroundEffects";
import { bioStoreThemes } from "@/config/biostore-themes";
import { buildGoogleFontsHref, cssFontStack, themeFontFamilies } from "@/lib/biostore-fonts";
import { API_BASE_URL } from "@/lib/api-client";

const COLOR_KEYS = ["backgroundColor", "textColor", "cardColor", "buttonColor", "buttonTextColor", "accentColor", "mutedColor"];
const TYPO_KEYS = ["fontFamily", "headingFont"];
const STYLE_KEYS = ["buttonStyle", "spacing", "shadowStyle", "buttonRadius", "cardRadius", "avatarBorder", "iconStyle", "bgEffect"];

// Merge per-store overrides onto a base theme. Overrides may arrive either
// nested ({ colors, typography, styles }) or flat ({ backgroundColor, ... });
// each flat key is routed into its correct nested bucket so customization
// actually reaches the render (the old Object.assign spread it at the top
// level, where nothing read it).
function mergeThemeOverrides(base: any, overrides: any) {
  const merged = {
    ...base,
    colors: { ...(base.colors || {}) },
    typography: { ...(base.typography || {}) },
    styles: { ...(base.styles || {}) },
  };
  if (!overrides || typeof overrides !== "object") return merged;

  if (overrides.colors) Object.assign(merged.colors, overrides.colors);
  if (overrides.typography) Object.assign(merged.typography, overrides.typography);
  if (overrides.styles) Object.assign(merged.styles, overrides.styles);

  for (const [k, v] of Object.entries(overrides)) {
    if (v === undefined || v === null || v === "") continue;
    if (k === "colors" || k === "typography" || k === "styles") continue;
    if (COLOR_KEYS.includes(k)) merged.colors[k] = v;
    else if (TYPO_KEYS.includes(k)) merged.typography[k] = v;
    else if (STYLE_KEYS.includes(k)) merged.styles[k] = v;
  }
  return merged;
}

// Rough perceived-luminance of a #hex color (0..1). Used to pick a legibility
// scrim over a per-store background image: light text ⇒ dark scrim, and vice
// versa. Mirrors the Flutter editor's computeLuminance() > 0.5 branch.
function textLuminance(hex: string): number {
  const c = (hex || "").trim().replace("#", "");
  const full = c.length === 3 ? c.split("").map((x) => x + x).join("") : c;
  if (full.length < 6 || /[^0-9a-f]/i.test(full.slice(0, 6))) return 1; // default: treat as light text
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

// Mock fetching function until the backend is fully connected
async function getBioStoreData(username: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/biostore/${username}`, { cache: 'no-store' });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch data');
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching BioStore data:", error);
    return null;
  }
}

const RESERVED_USERNAMES = [
  "admin", "login", "signup", "dashboard", "pricing", "blog", "about", 
  "contact", "privacy", "terms", "support", "settings", "api", "search", 
  "features", "careers", "jobs", "status", "docs"
];

export default async function BioStorePage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  const username = resolvedParams.username.toLowerCase();

  if (RESERVED_USERNAMES.includes(username)) {
    notFound();
  }

  const bioStore = await getBioStoreData(username);

  if (!bioStore || bioStore.status !== 'published') {
    notFound();
  }

  // Determine theme
  const baseTheme = bioStoreThemes.find(t => t.id === bioStore.theme) || bioStoreThemes[0];
  
  // Apply per-store overrides (nested-aware merge)
  const themeData = mergeThemeOverrides(baseTheme, bioStore.themeOverrides);

  // Parse background
  const bgStyle: any = {};
  const colors = themeData.colors || {};
  const styles = themeData.styles || {};
  const typography = themeData.typography || {};
  const background = colors.backgroundColor || '#000000';

  if (background.startsWith('linear-gradient')) {
    bgStyle.backgroundImage = background;
    bgStyle.backgroundColor = '#000000';
  } else {
    bgStyle.backgroundColor = background;
  }

  // Per-store background image (Phase 2). A chosen image replaces the theme's
  // flat/gradient background; a luminance scrim keeps the theme text legible.
  // Only https URLs are honoured (the backend already enforces this on write).
  const rawBgImage = typeof bioStore.backgroundImage === 'string' ? bioStore.backgroundImage.trim() : '';
  const hasBgImage = /^https:\/\//i.test(rawBgImage);
  if (hasBgImage) {
    const scrim = textLuminance(colors.textColor) > 0.5 ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.42)';
    const safeUrl = rawBgImage.replace(/["\\]/g, '');
    bgStyle.backgroundImage = `linear-gradient(${scrim}, ${scrim}), url("${safeUrl}")`;
    bgStyle.backgroundSize = 'cover';
    bgStyle.backgroundPosition = 'center';
    bgStyle.backgroundRepeat = 'no-repeat';
    bgStyle.backgroundAttachment = 'fixed';
  }

  // Load the theme's fonts (body + heading) for this page only.
  const fontsHref = buildGoogleFontsHref(themeFontFamilies(themeData));
  const bodyFont = cssFontStack(typography.fontFamily);
  const headingFont = cssFontStack(typography.headingFont || typography.fontFamily);
  const avatarBorder = typeof styles.avatarBorder === 'number' ? styles.avatarBorder : 3;

  const bgEffect: string = (styles as any).bgEffect || 'none';
  const animationsEnabled = bioStore.settings?.animationsEnabled !== false;
  const themeColorForMeta = background.startsWith('linear-gradient') ? '#000000' : background;

  return (
    <>
      <meta name="theme-color" content={themeColorForMeta} />
      {fontsHref && (
        <>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="stylesheet" href={fontsHref} />
        </>
      )}
      <div
        className="min-h-screen w-full flex flex-col items-center py-12 px-4 sm:px-6 transition-all duration-500 relative"
        style={{ ...bgStyle, fontFamily: bodyFont }}
      >
      <BackgroundEffects effect={bgEffect} themeData={themeData} animationsEnabled={animationsEnabled} />
      
      <div className="w-full max-w-2xl mx-auto space-y-8 relative z-10 pt-8">
        
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div
             className="relative h-28 w-28 overflow-hidden shadow-lg"
             style={{
               borderRadius: '9999px',
               borderColor: colors.textColor,
               borderWidth: `${avatarBorder}px`,
               borderStyle: 'solid'
             }}
          >
            <Image 
              src={bioStore.profileImage || "/placeholder-avatar.png"} 
              alt={bioStore.displayName}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
          
          <div>
            <h1
              className="text-2xl font-bold flex items-center justify-center gap-2"
              style={{ color: colors.textColor, fontFamily: headingFont, letterSpacing: '-0.01em' }}
            >
              {bioStore.displayName}
              <BadgeCheck className="w-6 h-6" style={{ color: colors.accentColor || colors.textColor, fill: 'currentColor', stroke: themeColorForMeta }} />
            </h1>
            <p className="mt-2 opacity-80" style={{ color: colors.mutedColor || colors.textColor }}>{bioStore.bio}</p>
          </div>
        </div>

        {/* Blocks Section */}
        <div className="flex flex-col gap-3 w-full pt-4 pb-8">
          {(() => {
            const sortedBlocks = [...bioStore.blocks].sort((a: any, b: any) => a.order - b.order);
            if (bioStore.settings?.showSearch) {
              return (
                <BioLinkSearch
                  blocks={sortedBlocks}
                  username={bioStore.username}
                  themeData={themeData}
                />
              );
            }
            return sortedBlocks.map((block: any, idx: number) => (
              <BlockRenderer key={block._id || idx} block={block} username={bioStore.username} themeData={themeData} index={idx + 1} />
            ));
          })()}
        </div>
      </div>
      
      {/* Branding Footer */}
      {!bioStore.isPremium && (
        <div className="mt-8 pb-12 w-full max-w-sm mx-auto flex items-center justify-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-current opacity-30" style={{ color: colors.textColor }}></div>
          <a href="/" className="text-sm font-medium flex items-center gap-2 opacity-90 hover:opacity-100 transition-opacity" style={{ color: colors.textColor }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="CreatorOS Logo" className="w-6 h-6 object-contain" style={{ filter: 'brightness(1.2)' }} />
            <span style={{ fontWeight: 400 }}>Powered by <span className="font-bold">CreatorOS</span></span>
          </a>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-current opacity-30" style={{ color: colors.textColor }}></div>
        </div>
      )}
    </div>
    </>
  );
}
