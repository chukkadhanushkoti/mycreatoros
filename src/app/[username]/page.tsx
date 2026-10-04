import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { BadgeCheck } from "lucide-react";
import { BlockRenderer } from "@/components/biostore/BlockRenderer";
import { BioLinkSearch } from "@/components/biostore/BioLinkSearch";
import { BackgroundEffects } from "@/components/biostore/BackgroundEffects";
import { resolveBioStoreTheme } from "@/lib/biostore-theme";
import { bioBlockLayout, bioBlockSpan } from "@/lib/biostore-layout";
import { buildGoogleFontsHref, cssFontStack, themeFontFamilies } from "@/lib/biostore-fonts";
import { API_BASE_URL } from "@/lib/api-client";
import type { BioStoreDoc } from "@/lib/biostore-api";

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

async function getBioStoreData(username: string): Promise<BioStoreDoc | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/biostore/${username}`, { cache: 'no-store' });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch data');
    }
    return await res.json() as BioStoreDoc;
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
  const themeData = resolveBioStoreTheme(bioStore.theme, bioStore.themeOverrides, bioStore.themeConfig);

  // Parse background
  const bgStyle: CSSProperties = {};
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
  }

  // Load the theme's fonts (body + heading) for this page only.
  const fontsHref = buildGoogleFontsHref(themeFontFamilies(themeData));
  const bodyFont = cssFontStack(typography.fontFamily);
  const headingFont = cssFontStack(typography.headingFont || typography.fontFamily);
  const avatarBorder = typeof styles.avatarBorder === 'number'
    ? Math.max(0, Math.min(styles.avatarBorder, 8)) : 0;
  const avatarBorderColor = colors.accentColor || colors.textColor;

  const bgEffect = styles.bgEffect || 'none';
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
        className="relative isolate flex min-h-screen w-full flex-col items-center px-4 py-12 sm:px-6"
        style={{ fontFamily: bodyFont }}
      >
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-0 w-full"
        style={{ ...bgStyle, height: '100lvh' }}
      />
      <BackgroundEffects effect={bgEffect} themeData={themeData} animationsEnabled={animationsEnabled} />
      
      <div className="w-full max-w-2xl mx-auto space-y-8 relative z-10 pt-8">
        
        {/* Profile Header */}
        <div className={`flex flex-col space-y-4 ${styles.layout === 'editorial' ? 'items-start text-left' : 'items-center text-center'}`}>
          <div
             className="h-28 w-28 shrink-0 rounded-full shadow-lg"
             style={{
               padding: avatarBorder,
               backgroundColor: avatarBorder ? avatarBorderColor : 'transparent',
             }}
          >
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full" style={{ backgroundColor: colors.cardColor }}>
              {bioStore.profileImage ? (
                <Image
                  src={bioStore.profileImage}
                  alt={bioStore.displayName || bioStore.username}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              ) : (
                <span className="text-4xl font-semibold" style={{ color: colors.textColor }}>
                  {(bioStore.displayName || bioStore.username).charAt(0).toUpperCase()}
                </span>
              )}
            </div>
          </div>
          
          <div>
            <h1
              className={`text-2xl font-bold flex items-center gap-2 ${styles.layout === 'editorial' ? '' : 'justify-center'}`}
              style={{ color: colors.textColor, fontFamily: headingFont, letterSpacing: '-0.01em' }}
            >
              {bioStore.displayName}
              {bioStore.isVerified && <BadgeCheck className="w-6 h-6" style={{ color: colors.accentColor || colors.textColor }} />}
            </h1>
            <p className="mt-2 opacity-80" style={{ color: colors.mutedColor || colors.textColor }}>{bioStore.bio}</p>
          </div>
        </div>

        {/* Blocks Section */}
        <div className="flex flex-col gap-3 w-full pt-4 pb-8">
          {(() => {
            const sortedBlocks = [...bioStore.blocks].sort((a, b) => a.order - b.order);
            if (bioStore.settings?.showSearch) {
              return (
                <BioLinkSearch
                  blocks={sortedBlocks}
                  username={bioStore.username}
                  themeData={themeData}
                />
              );
            }
            return <div className={bioBlockLayout(styles.layout)}>{sortedBlocks.map((block, idx: number) => (
              <div key={block._id || idx} className={bioBlockSpan(styles.layout,block.type)}><BlockRenderer block={block} username={bioStore.username} themeData={themeData} index={idx + 1} /></div>
            ))}</div>;
          })()}
        </div>
      </div>
      
      {/* Branding Footer */}
      {!bioStore.isPremium && (
        <div className="relative z-10 mt-8 flex w-full max-w-sm items-center justify-center gap-4 pb-12">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-current opacity-30" style={{ color: colors.textColor }}></div>
          <Link href="/" className="text-sm font-medium flex items-center gap-2 opacity-90 hover:opacity-100 transition-opacity" style={{ color: colors.textColor }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="CreatorOS Logo" className="w-6 h-6 object-contain" style={{ filter: 'brightness(1.2)' }} />
            <span style={{ fontWeight: 400 }}>Powered by <span className="font-bold">CreatorOS</span></span>
          </Link>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-current opacity-30" style={{ color: colors.textColor }}></div>
        </div>
      )}
    </div>
    </>
  );
}
