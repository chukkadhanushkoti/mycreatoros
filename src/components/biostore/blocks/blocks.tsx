import React from 'react';
import { ExternalLink, Download, Play } from 'lucide-react';
import { TextBlock } from './TextBlock';

// ── Divider ───────────────────────────────────────────────────────────────────
export const DividerBlock = ({ themeData }: any) => {
  const colors = themeData.colors || {};
  return (
    <div className="w-full py-6 flex justify-center">
      <div className="w-1/2 h-px" style={{ backgroundColor: colors.textColor, opacity: 0.2 }} />
    </div>
  );
};

// ── Spacer ────────────────────────────────────────────────────────────────────
export const SpacerBlock = () => <div className="w-full h-8" />;

// ── Image Block ───────────────────────────────────────────────────────────────
// Renders an uploaded image from S3/CDN URL stored in block.content.mediaUrl
// Falls back to block.content.url for legacy blocks
export const ImageBlock = ({ block, themeData, onClick }: any) => {
  const styles = themeData.styles || {};
  const colors = themeData.colors || {};
  const imageUrl = block.content?.mediaUrl || block.content?.url;
  const title = block.content?.title;
  const downloadUrl = block.content?.downloadUrl;

  if (!imageUrl) {
    return (
      <div
        className="w-full p-8 flex items-center justify-center opacity-40"
        style={{
          backgroundColor: colors.cardColor || 'rgba(255,255,255,0.05)',
          borderRadius: styles.cardRadius || 16,
          color: colors.textColor || '#fff'
        }}
      >
        No image set
      </div>
    );
  }

  return (
    <div
      className="w-full overflow-hidden group relative"
      style={{ borderRadius: styles.cardRadius || 16 }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt={title || 'BioStore Image'}
        className="w-full h-auto object-cover"
        loading="lazy"
        onClick={onClick}
      />
      {/* Overlay actions */}
      {(downloadUrl || title) && (
        <div className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}>
          <div className="flex items-center justify-between w-full">
            {title && <span className="text-white text-sm font-medium">{title}</span>}
            {downloadUrl && (
              <a href={downloadUrl} download onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition">
                <Download className="w-4 h-4 text-white" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ── Video Block ───────────────────────────────────────────────────────────────
// Renders a video from S3/CDN URL. Uses thumbnail for preview, plays on click.
export const VideoBlock = ({ block, themeData, onClick }: any) => {
  const styles = themeData.styles || {};
  const colors = themeData.colors || {};
  const videoUrl = block.content?.mediaUrl || block.content?.url;
  const thumbnailUrl = block.content?.thumbnailUrl;
  const title = block.content?.title;

  if (!videoUrl) {
    return (
      <div
        className="w-full p-8 flex items-center justify-center opacity-40"
        style={{
          backgroundColor: colors.cardColor || 'rgba(255,255,255,0.05)',
          borderRadius: styles.cardRadius || 16,
          color: colors.textColor || '#fff'
        }}
      >
        No video set
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden" style={{ borderRadius: styles.cardRadius || 16 }}>
      {title && (
        <div className="flex items-center gap-2 px-3 py-2"
          style={{ color: colors.textColor, backgroundColor: colors.cardColor || 'rgba(255,255,255,0.05)' }}>
          <Play className="w-4 h-4" />
          <span className="text-sm font-medium">{title}</span>
        </div>
      )}
      <video
        src={videoUrl}
        poster={thumbnailUrl}
        controls
        playsInline
        preload="metadata"
        className="w-full h-auto"
        onClick={onClick}
        style={{ maxHeight: '480px' }}
      />
    </div>
  );
};

// ── Unified Button Component (Linktree Style) ───────────────────────────────────
const UnifiedButton = ({ url, title, subtitle, icon, imageUrl, themeData, onClick }: any) => {
  const styles = themeData.styles || {};
  const colors = themeData.colors || {};

  const buttonStyle = styles.buttonStyle || 'filled';
  let dynamicStyle: any = {
    borderRadius: styles.buttonRadius || 32,
    boxShadow: styles.shadowStyle === 'sm' ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : (styles.shadowStyle === 'md' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : undefined),
    color: colors.buttonTextColor || '#fff',
    border: 'none',
  };

  if (buttonStyle === 'filled') {
    dynamicStyle.backgroundColor = colors.buttonColor || colors.cardColor || '#000';
  } else if (buttonStyle === 'outline') {
    dynamicStyle.backgroundColor = 'transparent';
    dynamicStyle.border = `2px solid ${colors.buttonColor || colors.cardColor || '#000'}`;
    dynamicStyle.color = colors.buttonColor || colors.textColor || '#000';
  }

  return (
    <a
      href={url || '#'}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="flex items-center w-full p-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] min-h-[64px]"
      style={dynamicStyle}
    >
      {/* Leading Icon/Image */}
      <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center overflow-hidden rounded-full"
        style={{ backgroundColor: 'rgba(0,0,0,0.05)' }}>
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-2xl flex items-center justify-center">{icon}</span>
        )}
      </div>

      {/* Center Content */}
      <div className="flex-1 min-w-0 px-3 text-center flex flex-col justify-center">
        <p className="font-semibold truncate text-[15px]">{title || 'Link'}</p>
        {subtitle && <p className="text-xs opacity-70 mt-0.5 truncate">{subtitle}</p>}
      </div>

      {/* Trailing */}
      <div className="w-12 flex-shrink-0 flex items-center justify-center opacity-60">
        <ExternalLink className="w-4 h-4" />
      </div>
    </a>
  );
};

// ── YouTube Block ─────────────────────────────────────────────────────────────
export const YouTubeBlock = ({ block, themeData, onClick }: any) => {
  return (
    <UnifiedButton
      url={block.content?.url}
      title={block.content?.title || 'YouTube Video'}
      subtitle="Watch on YouTube"
      icon={<Play className="w-6 h-6 text-red-500 fill-red-500" />}
      themeData={themeData}
      onClick={onClick}
    />
  );
};

// ── Product Block ─────────────────────────────────────────────────────────────
export const ProductBlock = ({ block, themeData, onClick }: any) => {
  const { title, url, price, imageUrl } = block.content || {};
  return (
    <UnifiedButton
      url={url}
      title={title || 'Product'}
      subtitle={price}
      icon="🛍️"
      imageUrl={imageUrl}
      themeData={themeData}
      onClick={onClick}
    />
  );
};

// ── Social Block ──────────────────────────────────────────────────────────────
const SOCIAL_ICONS: Record<string, { emoji: string; label: string }> = {
  instagram: { emoji: '📸', label: 'Instagram' },
  youtube: { emoji: '▶️', label: 'YouTube' },
  twitter: { emoji: '🐦', label: 'Twitter / X' },
  tiktok: { emoji: '🎵', label: 'TikTok' },
  linkedin: { emoji: '💼', label: 'LinkedIn' },
  github: { emoji: '💻', label: 'GitHub' },
  facebook: { emoji: '👥', label: 'Facebook' },
  snapchat: { emoji: '👻', label: 'Snapchat' },
  pinterest: { emoji: '📌', label: 'Pinterest' },
  spotify: { emoji: '🎵', label: 'Spotify' },
  default: { emoji: '🔗', label: 'Social' },
};

export const SocialBlock = ({ block, themeData, onClick }: any) => {
  const platform = block.content?.platform?.toLowerCase() || 'default';
  const icon = SOCIAL_ICONS[platform] || SOCIAL_ICONS.default;
  return (
    <UnifiedButton
      url={block.content?.url}
      title={block.content?.title || icon.label}
      subtitle={block.content?.url?.replace('https://', '')?.replace('www.', '')}
      icon={icon.emoji}
      themeData={themeData}
      onClick={onClick}
    />
  );
};

// ── Button Block ──────────────────────────────────────────────────────────────
export const ButtonBlock = ({ block, themeData, onClick }: any) => {
  return (
    <UnifiedButton
      url={block.content?.url}
      title={block.content?.title || 'Button'}
      icon="🔗"
      themeData={themeData}
      onClick={onClick}
    />
  );
};

// ── Link Block ────────────────────────────────────────────────────────────────
export const LinkBlock = ({ block, themeData, onClick }: any) => {
  return (
    <UnifiedButton
      url={block.content?.url}
      title={block.content?.title || 'Link'}
      icon="🔗"
      themeData={themeData}
      onClick={onClick}
    />
  );
};

// ── Re-export existing blocks ─────────────────────────────────────────────────
export { TextBlock };
