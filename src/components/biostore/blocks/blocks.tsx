"use client";

import React from 'react';
import { bioTile } from '@/lib/biostore-layout';
import {
  ExternalLink, Download, Play, Link2, Image as ImageIcon,
  Video, ShoppingBag, Layers,
  AlignJustify, Globe, Music
} from 'lucide-react';
import {
  FaInstagram, FaYoutube, FaTwitter, FaLinkedin,
  FaGithub, FaFacebook, FaSpotify, FaTiktok
} from 'react-icons/fa';
import { TextBlock } from './TextBlock';

// ── Platform-specific icon map ───────────────────────────────
const SOCIAL_CONFIG: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
  instagram: { icon: <FaInstagram className="w-5 h-5" />, color: '#E1306C', label: 'Instagram' },
  youtube:   { icon: <FaYoutube className="w-5 h-5" />,   color: '#FF0000', label: 'YouTube' },
  twitter:   { icon: <FaTwitter className="w-5 h-5" />,   color: '#1DA1F2', label: 'Twitter / X' },
  linkedin:  { icon: <FaLinkedin className="w-5 h-5" />,  color: '#0A66C2', label: 'LinkedIn' },
  github:    { icon: <FaGithub className="w-5 h-5" />,    color: '#333',    label: 'GitHub' },
  facebook:  { icon: <FaFacebook className="w-5 h-5" />,  color: '#1877F2', label: 'Facebook' },
  spotify:   { icon: <FaSpotify className="w-5 h-5" />,   color: '#1DB954', label: 'Spotify' },
  tiktok:    { icon: <FaTiktok className="w-5 h-5" />,    color: '#010101', label: 'TikTok' },
  default:   { icon: <Link2 className="w-5 h-5" />,       color: '#3B82F6', label: 'Social' },
};

// ── Helper: resolve button styles from theme ──────────────────────────────────
function isGradient(c?: string) {
  return typeof c === 'string' && c.includes('gradient');
}

function resolveButtonStyle(themeData: any) {
  const styles  = themeData.styles  || {};
  const colors  = themeData.colors  || {};
  const btnStyle = styles.buttonStyle || 'filled';
  const radius   = styles.buttonRadius ?? 16;
  const shadow   = styles.shadowStyle;

  // Colour used for glow / neon halos (a gradient string can't live in box-shadow).
  const glowColor =
    colors.accentColor ||
    (isGradient(colors.buttonColor) ? colors.textColor : colors.buttonColor) ||
    '#000';

  let boxShadow: string;
  switch (shadow) {
    case 'hard':  boxShadow = '4px 4px 0 rgba(0,0,0,1)'; break;
    case 'md':    boxShadow = '0 4px 6px -1px rgba(0,0,0,0.15)'; break;
    case 'sm':    boxShadow = '0 1px 3px rgba(0,0,0,0.12)'; break;
    case 'glass': boxShadow = '0 8px 32px 0 rgba(31,38,135,0.18)'; break;
    case 'glow':  boxShadow = `0 6px 24px -4px ${glowColor}66`; break;
    case 'neon':  boxShadow = `0 0 14px ${glowColor}, 0 0 28px ${glowColor}55`; break;
    case 'none':  boxShadow = 'none'; break;
    case 'soft':
    default:      boxShadow = '0 4px 14px 0 rgba(0,0,0,0.10)';
  }

  const base: any = {
    borderRadius: radius,
    boxShadow,
    border: 'none',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
  };

  let textColor = colors.buttonTextColor || '#fff';

  if (btnStyle === 'outline') {
    base.backgroundColor = 'transparent';
    const borderColor = isGradient(colors.buttonColor)
      ? (colors.accentColor || colors.textColor || '#fff')
      : (colors.buttonColor || '#fff');
    base.border = `2px solid ${borderColor}`;
    textColor = colors.accentColor || (isGradient(colors.buttonColor) ? colors.textColor : colors.buttonColor) || colors.textColor || '#000';
    base.color = textColor;
  } else if (btnStyle === 'glass') {
    base.backgroundColor =
      typeof colors.buttonColor === 'string' && colors.buttonColor.startsWith('rgba')
        ? colors.buttonColor
        : 'rgba(255,255,255,0.12)';
    base.backdropFilter = 'blur(12px)';
    base.WebkitBackdropFilter = 'blur(12px)';
    base.border = '1px solid rgba(255,255,255,0.2)';
    base.color = textColor;
  } else {
    // filled — supports a solid colour OR a linear-gradient() string
    if (isGradient(colors.buttonColor)) {
      base.backgroundImage = colors.buttonColor;
      base.backgroundColor = 'transparent';
    } else {
      base.backgroundColor = colors.buttonColor || '#000';
    }
    base.color = textColor;
  }

  return { containerStyle: base, textColor, btnStyle, shadow };
}

// ── Unified Button (single source of truth for all link-style blocks) ─────────
interface UnifiedButtonProps {
  url?: string;
  title?: string;
  subtitle?: string;
  /** Pass a React element (Lucide icon) with its own colour */
  iconEl: React.ReactNode;
  /** Circle background colour behind the icon */
  iconBg: string;
  /** Optional image thumbnail to show instead of iconEl */
  imageUrl?: string;
  themeData: any;
  index?: number;
  clicks?: number;
  onClick?: (e: React.MouseEvent) => void;
}

const UnifiedButton = ({ url, title, subtitle, iconEl, iconBg, imageUrl, themeData, onClick, index }: UnifiedButtonProps) => {
  const { containerStyle, textColor } = resolveButtonStyle(themeData);
  const tile = bioTile(themeData.styles?.layout, index);

  return (
    <a
      href={url || '#'}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={`group relative flex w-full px-4 py-3 transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${tile ? 'flex-col items-start justify-between gap-4 min-h-[164px]' : 'min-h-[72px] items-center'}`}
      style={{...containerStyle,minHeight: tile && themeData.styles?.layout === 'spotlight' ? 180 : undefined}}
    >
      {themeData.styles?.layout === 'editorial' && <span className="mr-4 text-xl opacity-40 tabular-nums">{String(index ?? 1).padStart(2,'0')}</span>}
      {/* ── Icon Squircle ── */}
      <div
        className="w-12 h-12 flex-shrink-0 flex items-center justify-center overflow-hidden rounded-[14px] mr-4 ml-1 shadow-sm"
        style={{ backgroundColor: iconBg }}
      >
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <span className="flex items-center justify-center">{iconEl}</span>
        )}
      </div>

      {/* ── Title + Subtitle (left-aligned) ── */}
      <div className={`min-w-0 text-left ${tile ? 'w-full mt-auto' : 'flex-1'}`}>
        <p className={`font-semibold leading-tight ${tile ? 'line-clamp-2 text-base' : 'truncate text-[15px]'}`} style={{ color: textColor }}>
          {title || 'Link'}
        </p>
        {subtitle && (
          <p className="text-xs mt-0.5 truncate" style={{ color: textColor, opacity: 0.65 }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* The public card keeps analytics out of the visitor-facing link. */}
      <div className={`flex-shrink-0 flex items-center justify-end gap-2 ${tile ? 'absolute right-4 top-4' : 'ml-2'}`} style={{ color: textColor, opacity: 0.6 }}>
        <ExternalLink className="w-4 h-4 opacity-75" />
      </div>
    </a>
  );
};

// ── Shared card/media container style ────────────────────────────────────────
function mediaContainerStyle(themeData: any, extra: any = {}): any {
  const styles = themeData.styles || {};
  const colors = themeData.colors || {};
  const btnStyle = styles.buttonStyle || 'filled';
  const base: any = {
    borderRadius: styles.buttonRadius ?? 16,
    overflow: 'hidden',
    position: 'relative',
    ...extra,
  };
  if (btnStyle === 'filled') {
    if (isGradient(colors.buttonColor)) {
      base.backgroundImage = colors.buttonColor;
      base.backgroundColor = '#000';
    } else {
      base.backgroundColor = colors.buttonColor || '#000';
    }
  } else if (btnStyle === 'outline') {
    base.backgroundColor = 'transparent';
    const borderColor = isGradient(colors.buttonColor)
      ? (colors.accentColor || colors.textColor || '#fff')
      : (colors.buttonColor || '#fff');
    base.border = `2px solid ${borderColor}`;
  } else if (btnStyle === 'glass') {
    base.backgroundColor = 'rgba(255,255,255,0.12)';
    base.backdropFilter = 'blur(12px)';
    base.WebkitBackdropFilter = 'blur(12px)';
    base.border = '1px solid rgba(255,255,255,0.2)';
  }
  return base;
}

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
export const ImageBlock = ({ block, themeData, index, onClick }: any) => {
  const colors  = themeData.colors || {};
  const styles  = themeData.styles || {};
  const imageUrl   = block.content?.mediaUrl || block.content?.url;
  const title      = block.content?.title;
  const downloadUrl = block.content?.downloadUrl;

  if (!imageUrl) {
    return (
      <UnifiedButton
        url={undefined}
        title={block.content?.title || 'Image'}
        subtitle="No image set — tap to upload"
        iconEl={<ImageIcon className="w-5 h-5 text-gray-400" />}
        iconBg="rgba(156,163,175,0.2)"
        themeData={themeData}
        index={index}
        onClick={onClick}
      />
    );

  }

  return (
    <div className="w-full group" style={mediaContainerStyle(themeData)}>
      {title && (
        <div className="w-full text-center p-3 font-semibold"
          style={{ color: colors.buttonTextColor || colors.textColor || '#000' }}>
          {title}
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageUrl} alt={title || 'BioStore Image'} className="w-full h-auto object-cover" loading="lazy" onClick={onClick} />
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
export const VideoBlock = ({ block, themeData, index, onClick }: any) => {
  const videoUrl = block.content?.mediaUrl || block.content?.url;
  const thumbnail = block.content?.thumbnailUrl;
  const title = block.content?.title;

  if (!videoUrl) {
    return (
      <UnifiedButton
        url={undefined}
        title={block.content?.title || 'Video'}
        subtitle="No video set — tap to upload"
        iconEl={<Video className="w-5 h-5 text-gray-400" />}
        iconBg="rgba(156,163,175,0.2)"
        themeData={themeData}
        index={index}
        onClick={onClick}
      />
    );
  }

  return (
    <div className="w-full" style={mediaContainerStyle(themeData)}>
      {title && (
        <div className="w-full text-center p-3 font-semibold"
          style={{ color: (themeData.colors || {}).buttonTextColor || '#fff' }}>
          {title}
        </div>
      )}
      <video src={videoUrl} poster={thumbnail} controls playsInline preload="metadata"
        className="w-full h-auto" onClick={onClick} style={{ maxHeight: 480 }} />
    </div>
  );
};

// ── YouTube Block ─────────────────────────────────────────────────────────────
export const YouTubeBlock = ({ block, themeData, index, onClick }: any) => (
  <UnifiedButton
    url={block.content?.url}
    title={block.content?.title || 'YouTube Video'}
    subtitle={block.content?.subtitle || 'Watch on YouTube'}
    iconEl={<Play className="w-5 h-5 text-white fill-white" />}
    iconBg="#FF0000"
    themeData={themeData}
    index={index}
    clicks={block.clicks}
    onClick={onClick}
  />
);

// ── Product Block ─────────────────────────────────────────────────────────────
export const ProductBlock = ({ block, themeData, index, onClick }: any) => {
  const { title, url, price, imageUrl } = block.content || {};
  return (
    <UnifiedButton
      url={url}
      title={title || 'Product'}
      subtitle={price}
      iconEl={<ShoppingBag className="w-5 h-5 text-white" />}
      iconBg="#F97316"
      imageUrl={imageUrl}
      themeData={themeData}
      index={index}
      clicks={block.clicks}
      onClick={onClick}
    />
  );
};

// ── Social Block ──────────────────────────────────────────────────────────────
export const SocialBlock = ({ block, themeData, index, onClick }: any) => {
  const platform = (block.content?.platform || 'default').toLowerCase();
  const cfg = SOCIAL_CONFIG[platform] || SOCIAL_CONFIG.default;
  const subtitle = block.content?.url?.replace('https://', '').replace('www.', '');
  return (
    <UnifiedButton
      url={block.content?.url}
      title={block.content?.title || cfg.label}
      subtitle={subtitle}
      iconEl={<span style={{ color: '#fff' }}>{cfg.icon}</span>}
      iconBg={cfg.color}
      themeData={themeData}
      index={index}
      clicks={block.clicks}
      onClick={onClick}
    />
  );
};

// ── Button Block ──────────────────────────────────────────────────────────────
export const ButtonBlock = ({ block, themeData, index, onClick }: any) => (
  <UnifiedButton
    url={block.content?.url}
    title={block.content?.title || 'Button'}
    subtitle={block.content?.subtitle}
    iconEl={<Layers className="w-5 h-5 text-white" />}
    iconBg="#6366F1"
    themeData={themeData}
    index={index}
    clicks={block.clicks}
    onClick={onClick}
  />
);

// ── Link Block ────────────────────────────────────────────────────────────────
export const LinkBlock = ({ block, themeData, index, onClick }: any) => (
  <UnifiedButton
    url={block.content?.url}
    title={block.content?.title || 'Link'}
    subtitle={block.content?.subtitle || block.content?.url?.replace('https://', '').replace('www.', '')}
    iconEl={<Globe className="w-5 h-5 text-white" />}
    iconBg="#64748B"
    themeData={themeData}
    index={index}
    clicks={block.clicks}
    onClick={onClick}
  />
);

// ── Re-export existing blocks ─────────────────────────────────────────────────
export { TextBlock };
