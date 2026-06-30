"use client";

import React from "react";

interface BlockProps {
  block: any;
  username: string;
  theme?: string;
}

export function BlockRenderer({ block, username, theme = 'classic' }: BlockProps) {
  const handleBlockClick = async () => {
    // Only track clicks for interactive blocks like link or youtube
    if (!['link', 'social', 'youtube', 'product', 'contact'].includes(block.type)) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://creatoros-backend-rb5b.onrender.com/api';
      // Send click analytics
      await fetch(`${apiUrl}/biostore/${username}/click`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          blockId: block._id,
          blockType: block.type,
          device: typeof window !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
          referrer: document.referrer || 'Direct'
        })
      });
    } catch (e) {
      console.error("Failed to track click", e);
    }
  };

  const isDarkTheme = theme === 'dark' || theme === 'minimal';
  const blockClass = `w-full p-4 rounded-xl border transition-all flex items-center justify-center font-medium shadow-sm hover:scale-[1.02] ${
    isDarkTheme 
      ? 'bg-white/10 border-white/20 hover:bg-white/20 text-white' 
      : 'bg-black/5 border-black/10 hover:bg-black/10 text-black'
  }`;

  if (block.type === 'link') {
    return (
      <a 
        href={block.content.url || '#'} 
        target="_blank" 
        rel="noopener noreferrer"
        onClick={handleBlockClick}
        className={blockClass}
      >
        {block.content.title || 'Link'}
      </a>
    );
  }
  
  if (block.type === 'text') {
    return (
      <div className="w-full py-4 text-center">
        <p>{block.content.title || block.content.text}</p>
      </div>
    );
  }

  // Add more block renderers here
  return (
    <a 
      href={block.content.url || '#'} 
      target="_blank" 
      rel="noopener noreferrer"
      onClick={handleBlockClick}
      className={blockClass}
    >
      {block.content.title || `${block.type.toUpperCase()} Block Placeholder`}
    </a>
  );
}
