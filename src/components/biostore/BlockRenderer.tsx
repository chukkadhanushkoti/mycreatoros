"use client";

import React from "react";
import { getBlockComponent } from "./blocks";
import { motion } from "framer-motion";

interface BlockProps {
  block: any;
  username: string;
  themeData: any;
  index?: number;
}

export function BlockRenderer({ block, username, themeData, index }: BlockProps) {
  const handleBlockClick = async () => {
    if (!['link', 'social', 'youtube', 'product', 'contact'].includes(block.type)) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://creatoros-backend-tugu.onrender.com/api';
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

  const Component = getBlockComponent(block.type);

  if (!Component) {
    return (
      <div className="w-full p-4 border border-dashed border-red-500 text-red-500 rounded-xl text-center">
        Unsupported Block: {block.type}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: block.order * 0.1 }}
      className="w-full"
    >
      <Component block={block} themeData={themeData} index={index} onClick={handleBlockClick} />
    </motion.div>
  );
}
