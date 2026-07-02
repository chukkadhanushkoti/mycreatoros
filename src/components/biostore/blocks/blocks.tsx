import React from 'react';
import { ExternalLink, Download, Play } from 'lucide-react';
import { LinkBlock } from './LinkBlock';
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

// ── YouTube Block ─────────────────────────────────────────────────────────────
export const YouTubeBlock = ({ block, themeData, onClick }: any) => {
  const styles = themeData.styles || {};
  const colors = themeData.colors || {};
  const url = block.content?.url || '';

  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYouTubeId(url);

  if (!videoId) {
    return (
      <a
        href={url || '#'}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className="flex items-center gap-3 w-full p-4 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        style={{
          backgroundColor: colors.cardColor || 'rgba(255,255,255,0.05)',
          borderRadius: styles.cardRadius || 16,
          color: colors.textColor || '#fff'
        }}
      >
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-600">
          <Play className="w-5 h-5 text-white fill-white" />
        </div>
        <div>
          <p className="font-semibold">{block.content?.title || 'YouTube Video'}</p>
          <p className="text-xs opacity-60">{url || 'No URL set'}</p>
        </div>
        <ExternalLink className="w-4 h-4 ml-auto opacity-60" />
      </a>
    );
  }

  return (
    <div className="w-full overflow-hidden" style={{ borderRadius: styles.cardRadius || 16 }}>
      {block.content?.title && (
        <div className="flex items-center gap-2 px-3 py-2"
          style={{ color: colors.textColor, backgroundColor: colors.cardColor || 'rgba(255,255,255,0.05)' }}>
          <div className="w-4 h-4 bg-red-600 rounded-sm flex items-center justify-center">
            <Play className="w-2.5 h-2.5 text-white fill-white" />
          </div>
          <span className="text-sm font-medium">{block.content.title}</span>
        </div>
      )}
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={block.content?.title || 'YouTube Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

// ── Product Block ─────────────────────────────────────────────────────────────
export const ProductBlock = ({ block, themeData, onClick }: any) => {
  const styles = themeData.styles || {};
  const colors = themeData.colors || {};
  const { title, url, price, imageUrl } = block.content || {};

  return (
    <a
      href={url || '#'}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="flex items-center gap-4 w-full p-4 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
      style={{
        backgroundColor: colors.cardColor || 'rgba(255,255,255,0.05)',
        borderRadius: styles.cardRadius || 16,
        color: colors.textColor || '#fff'
      }}
    >
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt={title} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
      ) : (
        <div className="w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center"
          style={{ backgroundColor: colors.buttonColor || '#6366f1' }}>
          <span className="text-2xl">🛍️</span>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="font-semibold truncate">{title || 'Product'}</p>
        {price && <p className="text-sm opacity-80 mt-0.5">{price}</p>}
      </div>
      <ExternalLink className="w-4 h-4 opacity-60 flex-shrink-0" />
    </a>
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
  const styles = themeData.styles || {};
  const colors = themeData.colors || {};
  const platform = block.content?.platform?.toLowerCase() || 'default';
  const icon = SOCIAL_ICONS[platform] || SOCIAL_ICONS.default;
  const url = block.content?.url || '#';

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="flex items-center gap-3 w-full p-4 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
      style={{
        backgroundColor: colors.cardColor || 'rgba(255,255,255,0.05)',
        borderRadius: styles.cardRadius || 16,
        color: colors.textColor || '#fff'
      }}
    >
      <span className="text-2xl">{icon.emoji}</span>
      <span className="font-semibold">{block.content?.title || icon.label}</span>
      <ExternalLink className="w-4 h-4 ml-auto opacity-60" />
    </a>
  );
};

// ── Button Block ──────────────────────────────────────────────────────────────
export const ButtonBlock = ({ block, themeData, onClick }: any) => {
  const styles = themeData.styles || {};
  const colors = themeData.colors || {};

  return (
    <a
      href={block.content?.url || '#'}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="flex items-center justify-center gap-2 w-full p-4 font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
      style={{
        backgroundColor: colors.buttonColor || '#6366f1',
        color: colors.buttonTextColor || '#fff',
        borderRadius: styles.buttonRadius || 32,
      }}
    >
      {block.content?.title || 'Button'}
      <ExternalLink className="w-4 h-4" />
    </a>
  );
};

// ── Re-export existing blocks ─────────────────────────────────────────────────
export { LinkBlock, TextBlock };
