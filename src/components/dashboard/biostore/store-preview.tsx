"use client";

import { useMemo, useState } from "react";
import { BadgeCheck, Search, X } from "lucide-react";

import type { BioStoreDoc } from "@/lib/biostore-api";
import type { BioStoreTheme } from "@/config/biostore-themes";
import { BlockPreview } from "@/components/dashboard/biostore/block-preview";
import { cssFontStack } from "@/lib/biostore-fonts";

// Perceived-luminance of a #hex color (0..1). Mirrors the public page's scrim
// rule so the editor preview and the live site pick the same legibility overlay.
function textLuminance(hex: string): number {
  const c = (hex || "").trim().replace("#", "");
  const full = c.length === 3 ? c.split("").map((x) => x + x).join("") : c;
  if (full.length < 6 || /[^0-9a-f]/i.test(full.slice(0, 6))) return 1;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

/** Read-only render of a BioStore page — used for live preview panels (e.g. inside a phone frame). */
export function StorePreview({ store, theme }: { store: BioStoreDoc; theme: BioStoreTheme }) {
  const [query, setQuery] = useState("");
  const bodyFont = cssFontStack(theme.typography.fontFamily);
  const headingFont = cssFontStack(theme.typography.headingFont || theme.typography.fontFamily);
  const accentColor = theme.colors.accentColor || theme.colors.textColor;
  const mutedColor = theme.colors.mutedColor || theme.colors.textColor;
  const textColor = theme.colors.textColor;

  // Background: a per-store image (https only) overrides the theme bg, with a
  // luminance scrim matching [username]/page.tsx; otherwise theme flat/gradient.
  const rawBgImage = typeof store.backgroundImage === "string" ? store.backgroundImage.trim() : "";
  const hasBgImage = /^https:\/\//i.test(rawBgImage);
  const containerStyle: React.CSSProperties = { fontFamily: bodyFont };
  if (hasBgImage) {
    const scrim = textLuminance(textColor) > 0.5 ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.42)";
    const safeUrl = rawBgImage.replace(/["\\]/g, "");
    containerStyle.backgroundImage = `linear-gradient(${scrim}, ${scrim}), url("${safeUrl}")`;
    containerStyle.backgroundSize = "cover";
    containerStyle.backgroundPosition = "center";
    containerStyle.backgroundRepeat = "no-repeat";
  } else if (theme.colors.backgroundColor.startsWith("linear-gradient")) {
    containerStyle.backgroundImage = theme.colors.backgroundColor;
  } else {
    containerStyle.backgroundColor = theme.colors.backgroundColor;
  }

  const showSearch = store.settings?.showSearch === true;
  const sortedBlocks = useMemo(
    () => store.blocks.slice().sort((a, b) => a.order - b.order),
    [store.blocks]
  );
  const q = query.trim().toLowerCase();
  const visibleBlocks = useMemo(() => {
    if (!showSearch || !q) return sortedBlocks;
    return sortedBlocks.filter((b) => {
      const c = (b.content || {}) as Record<string, unknown>;
      const hay = [c.title, c.subtitle, c.label, c.text, c.url, b.type]
        .filter(Boolean)
        .map((x) => String(x).toLowerCase())
        .join(" ");
      return hay.includes(q);
    });
  }, [showSearch, q, sortedBlocks]);

  const cardRadius = typeof theme.styles.cardRadius === "number" ? theme.styles.cardRadius : 12;
  const searchBg = theme.colors.cardColor || "rgba(255,255,255,0.08)";
  const searchBorder = `color-mix(in srgb, ${textColor} 16%, transparent)`;

  return (
    <div
      className="flex min-h-full w-full flex-col items-center px-4 pb-10 pt-9"
      style={containerStyle}
    >
      <div
        className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-black/10"
        style={{ border: `${theme.styles.avatarBorder}px solid ${textColor}` }}
      >
        {store.profileImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={store.profileImage} alt={store.displayName} className="h-full w-full object-cover" />
        ) : (
          <span className="text-xl font-semibold" style={{ color: textColor }}>
            {(store.displayName || store.username).charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      <p
        className="mt-3 flex items-center gap-1 text-center text-base font-semibold"
        style={{ color: textColor, fontFamily: headingFont, letterSpacing: "-0.01em" }}
      >
        {store.displayName || store.username}
        {store.isVerified && <BadgeCheck className="h-4 w-4" style={{ color: accentColor }} />}
      </p>
      {store.bio && (
        <p className="mt-1 max-w-[85%] text-center text-xs" style={{ color: mutedColor, opacity: 0.9 }}>
          {store.bio}
        </p>
      )}

      {showSearch && (
        <div
          className="mt-5 flex w-full items-center gap-2 px-3 py-2"
          style={{
            backgroundColor: searchBg,
            color: textColor,
            borderRadius: `${cardRadius}px`,
            border: `1px solid ${searchBorder}`,
          }}
        >
          <Search className="h-3.5 w-3.5 shrink-0 opacity-70" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search links..."
            aria-label="Search links"
            className="min-w-0 flex-1 border-none bg-transparent text-xs outline-none placeholder:opacity-50"
            style={{ color: textColor }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="shrink-0 opacity-70 transition-opacity hover:opacity-100"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      )}

      <div className={`${showSearch ? "mt-3" : "mt-5"} flex w-full flex-col gap-2.5`}>
        {visibleBlocks.length === 0 && showSearch && q ? (
          <p className="py-5 text-center text-xs" style={{ color: mutedColor, opacity: 0.85 }}>
            No links match &ldquo;{query}&rdquo;.
          </p>
        ) : (
          visibleBlocks.map((block, index) => (
            <BlockPreview key={block._id || index} block={block} theme={theme} index={index + 1} />
          ))
        )}
      </div>

      {!store.isPremium && (
        <div className="mt-6 flex w-full items-center justify-center gap-2 opacity-70">
          <span className="text-[11px] font-medium" style={{ color: textColor }}>
            Powered by <strong>CreatorOS</strong>
          </span>
        </div>
      )}
    </div>
  );
}
