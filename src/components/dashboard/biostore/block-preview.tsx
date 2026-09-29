import { ExternalLink, Image as ImageIcon, ShoppingBag, Play, Layers, Globe, Link2 } from "lucide-react";
import { FaInstagram, FaYoutube, FaXTwitter, FaLinkedin, FaGithub, FaFacebook, FaSpotify, FaTiktok } from "react-icons/fa6";

import type { BioStoreBlock } from "@/lib/biostore-api";
import type { BioStoreTheme } from "@/config/biostore-themes";

const SOCIAL_CONFIG: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
  instagram: { icon: <FaInstagram className="h-4 w-4" />, color: "#E1306C", label: "Instagram" },
  youtube: { icon: <FaYoutube className="h-4 w-4" />, color: "#FF0000", label: "YouTube" },
  twitter: { icon: <FaXTwitter className="h-4 w-4" />, color: "#000000", label: "Twitter / X" },
  linkedin: { icon: <FaLinkedin className="h-4 w-4" />, color: "#0A66C2", label: "LinkedIn" },
  github: { icon: <FaGithub className="h-4 w-4" />, color: "#333333", label: "GitHub" },
  facebook: { icon: <FaFacebook className="h-4 w-4" />, color: "#1877F2", label: "Facebook" },
  spotify: { icon: <FaSpotify className="h-4 w-4" />, color: "#1DB954", label: "Spotify" },
  tiktok: { icon: <FaTiktok className="h-4 w-4" />, color: "#010101", label: "TikTok" },
  default: { icon: <Link2 className="h-4 w-4" />, color: "#3B82F6", label: "Social" },
};

function resolveButtonStyle(theme: BioStoreTheme) {
  const { styles, colors } = theme;
  const radius = styles.buttonRadius ?? 16;
  let boxShadow = "0 2px 8px 0 rgba(0,0,0,0.08)";
  if (styles.shadowStyle === "hard") boxShadow = "3px 3px 0 rgba(0,0,0,1)";
  else if (styles.shadowStyle === "md") boxShadow = "0 4px 6px -1px rgba(0,0,0,0.15)";
  else if (styles.shadowStyle === "glass") boxShadow = "0 8px 32px 0 rgba(31,38,135,0.18)";

  const base: React.CSSProperties = { borderRadius: radius, boxShadow, border: "none" };
  let textColor = colors.buttonTextColor || "#fff";

  if (styles.buttonStyle === "outline") {
    base.backgroundColor = "transparent";
    base.border = `2px solid ${colors.buttonColor || "#fff"}`;
    textColor = colors.buttonColor || colors.textColor || "#000";
  } else if (styles.buttonStyle === "glass") {
    base.backgroundColor = "rgba(255,255,255,0.12)";
    base.border = "1px solid rgba(255,255,255,0.2)";
  } else {
    base.backgroundColor = colors.buttonColor || "#000";
  }
  base.color = textColor;
  return { containerStyle: base, textColor };
}

function UnifiedRow({
  title,
  subtitle,
  iconEl,
  iconBg,
  imageUrl,
  theme,
  index,
  clicks,
}: {
  title?: string;
  subtitle?: string;
  iconEl: React.ReactNode;
  iconBg: string;
  imageUrl?: string;
  theme: BioStoreTheme;
  index: number;
  clicks?: number;
}) {
  const { containerStyle, textColor } = resolveButtonStyle(theme);
  return (
    <div className="flex w-full items-center px-3 py-3" style={containerStyle}>
      <div
        className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl"
        style={{ backgroundColor: iconBg }}
      >
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
        ) : (
          iconEl
        )}
      </div>
      <div className="min-w-0 flex-1 text-left">
        <p className="truncate text-sm font-medium leading-tight" style={{ color: textColor }}>
          {index}. {title || "Untitled"}
        </p>
        {subtitle && (
          <p className="truncate text-xs" style={{ color: textColor, opacity: 0.65 }}>
            {subtitle}
          </p>
        )}
      </div>
      <div className="ml-2 flex shrink-0 items-center gap-2" style={{ color: textColor, opacity: 0.6 }}>
        {!!clicks && <span className="text-xs font-medium">{clicks} clicks</span>}
        <ExternalLink className="h-3.5 w-3.5" />
      </div>
    </div>
  );
}

export function BlockPreview({ block, theme, index }: { block: BioStoreBlock; theme: BioStoreTheme; index: number }) {
  const content = block.content || {};

  switch (block.type) {
    case "divider":
      return (
        <div className="flex w-full justify-center py-4">
          <div className="h-px w-1/2" style={{ backgroundColor: theme.colors.textColor, opacity: 0.2 }} />
        </div>
      );
    case "spacer":
      return <div className="h-6 w-full" />;
    case "text":
      return (
        <p className="w-full py-2 text-center text-sm" style={{ color: theme.colors.textColor }}>
          {(content.text as string) || "Text block"}
        </p>
      );
    case "image": {
      const imageUrl = content.mediaUrl as string;
      if (!imageUrl) {
        return (
          <UnifiedRow
            title={(content.title as string) || "Image"}
            subtitle="No image set"
            iconEl={<ImageIcon className="h-4 w-4 text-neutral-400" />}
            iconBg="rgba(156,163,175,0.2)"
            theme={theme}
            index={index}
          />
        );
      }
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt={(content.title as string) || "Image"} className="w-full rounded-2xl object-cover" />
      );
    }
    case "video": {
      const videoUrl = content.mediaUrl as string;
      if (!videoUrl) {
        return (
          <UnifiedRow
            title={(content.title as string) || "Video"}
            subtitle="No video set"
            iconEl={<ImageIcon className="h-4 w-4 text-neutral-400" />}
            iconBg="rgba(156,163,175,0.2)"
            theme={theme}
            index={index}
          />
        );
      }
      return <video src={videoUrl} controls className="w-full rounded-2xl" style={{ maxHeight: 240 }} />;
    }
    case "youtube":
      return (
        <UnifiedRow
          title={(content.title as string) || "YouTube Video"}
          subtitle="Watch on YouTube"
          iconEl={<Play className="h-4 w-4 fill-white text-white" />}
          iconBg="#FF0000"
          theme={theme}
          index={index}
          clicks={block.clicks}
        />
      );
    case "product":
      return (
        <UnifiedRow
          title={(content.title as string) || "Product"}
          subtitle={content.price as string}
          iconEl={<ShoppingBag className="h-4 w-4 text-white" />}
          iconBg="#F97316"
          imageUrl={content.imageUrl as string}
          theme={theme}
          index={index}
          clicks={block.clicks}
        />
      );
    case "social": {
      const platform = ((content.platform as string) || "default").toLowerCase();
      const cfg = SOCIAL_CONFIG[platform] || SOCIAL_CONFIG.default;
      return (
        <UnifiedRow
          title={(content.title as string) || cfg.label}
          subtitle={(content.url as string)?.replace("https://", "")}
          iconEl={<span className="text-white">{cfg.icon}</span>}
          iconBg={cfg.color}
          theme={theme}
          index={index}
          clicks={block.clicks}
        />
      );
    }
    case "button":
      return (
        <UnifiedRow
          title={(content.title as string) || "Button"}
          subtitle={content.subtitle as string}
          iconEl={<Layers className="h-4 w-4 text-white" />}
          iconBg="#6366F1"
          theme={theme}
          index={index}
          clicks={block.clicks}
        />
      );
    case "link":
    default:
      return (
        <UnifiedRow
          title={(content.title as string) || "Link"}
          subtitle={(content.subtitle as string) || (content.url as string)?.replace("https://", "")}
          iconEl={<Globe className="h-4 w-4 text-white" />}
          iconBg="#64748B"
          theme={theme}
          index={index}
          clicks={block.clicks}
        />
      );
  }
}
