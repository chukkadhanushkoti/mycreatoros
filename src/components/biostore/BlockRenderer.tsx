"use client";

import React from "react";

interface BlockProps {
  block: any;
  username: string;
}

export function BlockRenderer({ block, username }: BlockProps) {
  const handleBlockClick = async () => {
    // Only track clicks for interactive blocks like link or youtube
    if (!['link', 'social', 'youtube', 'product', 'contact'].includes(block.type)) return;

    try {
      // Send click analytics
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'}/biostore/${username}/click`, {
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

  if (block.type === 'link') {
    return (
      <a 
        href={block.content.url} 
        target="_blank" 
        rel="noopener noreferrer"
        onClick={handleBlockClick}
        className="w-full p-4 rounded-xl border bg-card hover:bg-accent hover:text-accent-foreground transition-all flex items-center justify-center font-medium shadow-sm"
      >
        {block.content.title}
      </a>
    );
  }
  
  if (block.type === 'text') {
    return (
      <div className="w-full py-4 text-center">
        <p>{block.content.text}</p>
      </div>
    );
  }

  // Add more block renderers here
  return (
    <div className="w-full p-4 rounded-xl border bg-card flex flex-col items-center justify-center text-muted-foreground shadow-sm">
      {block.type.toUpperCase()} Block Placeholder
    </div>
  );
}
