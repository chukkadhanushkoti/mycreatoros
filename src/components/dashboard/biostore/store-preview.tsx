import { BadgeCheck } from "lucide-react";

import type { BioStoreDoc } from "@/lib/biostore-api";
import type { BioStoreTheme } from "@/config/biostore-themes";
import { BlockPreview } from "@/components/dashboard/biostore/block-preview";
import { cssFontStack } from "@/lib/biostore-fonts";

/** Read-only render of a BioStore page — used for live preview panels (e.g. inside a phone frame). */
export function StorePreview({ store, theme }: { store: BioStoreDoc; theme: BioStoreTheme }) {
  const bodyFont = cssFontStack(theme.typography.fontFamily);
  const headingFont = cssFontStack(theme.typography.headingFont || theme.typography.fontFamily);
  const accentColor = theme.colors.accentColor || theme.colors.textColor;
  const mutedColor = theme.colors.mutedColor || theme.colors.textColor;
  return (
    <div
      className="flex min-h-full w-full flex-col items-center px-4 pb-10 pt-9"
      style={
        theme.colors.backgroundColor.startsWith("linear-gradient")
          ? { backgroundImage: theme.colors.backgroundColor, fontFamily: bodyFont }
          : { backgroundColor: theme.colors.backgroundColor, fontFamily: bodyFont }
      }
    >
      <div
        className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-black/10"
        style={{ border: `${theme.styles.avatarBorder}px solid ${theme.colors.textColor}` }}
      >
        {store.profileImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={store.profileImage} alt={store.displayName} className="h-full w-full object-cover" />
        ) : (
          <span className="text-xl font-semibold" style={{ color: theme.colors.textColor }}>
            {(store.displayName || store.username).charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      <p
        className="mt-3 flex items-center gap-1 text-center text-base font-semibold"
        style={{ color: theme.colors.textColor, fontFamily: headingFont, letterSpacing: "-0.01em" }}
      >
        {store.displayName || store.username}
        {store.isVerified && <BadgeCheck className="h-4 w-4" style={{ color: accentColor }} />}
      </p>
      {store.bio && (
        <p className="mt-1 max-w-[85%] text-center text-xs" style={{ color: mutedColor, opacity: 0.9 }}>
          {store.bio}
        </p>
      )}

      <div className="mt-5 flex w-full flex-col gap-2.5">
        {store.blocks
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((block, index) => (
            <BlockPreview key={block._id || index} block={block} theme={theme} index={index + 1} />
          ))}
      </div>

      {!store.isPremium && (
        <div className="mt-6 flex w-full items-center justify-center gap-2 opacity-70">
          <span className="text-[11px] font-medium" style={{ color: theme.colors.textColor }}>
            Powered by <strong>CreatorOS</strong>
          </span>
        </div>
      )}
    </div>
  );
}
