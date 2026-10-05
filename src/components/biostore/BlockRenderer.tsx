"use client";

import { createElement } from "react";
import type { BioStoreBlock } from "@/lib/biostore-api";
import type { BioStoreTheme } from "@/config/biostore-themes";
import { getBlockComponent } from "./blocks";
import { motion } from "framer-motion";
import { API_BASE_URL } from "@/lib/api-client";

interface BlockProps {
  block: BioStoreBlock;
  username: string;
  themeData: BioStoreTheme;
  index?: number;
}

export function BlockRenderer({ block, username, themeData, index }: BlockProps) {
  const handleBlockClick = async () => {
    if (!['link', 'social', 'youtube', 'product', 'contact'].includes(block.type)) return;

    try {
      await fetch(`${API_BASE_URL}/api/biostore/${username}/click`, {
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
      {createElement(Component, {block, themeData, index, onClick: handleBlockClick})}
    </motion.div>
  );
}
