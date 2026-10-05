import type { PublicBlockProps } from './types';
import React from 'react';

export const TextBlock = ({ block, themeData }: PublicBlockProps) => {
  const colors = themeData.colors || {};
  return (
    <div className="w-full py-4 text-center">
      <p style={{ color: colors.textColor }}>{block.content.text || block.content.title}</p>
    </div>
  );
};
