import React from 'react';
import { motion } from 'framer-motion';

export const LinkBlock = ({ block, themeData, onClick }: any) => {
  const colors = themeData.colors || {};
  const styles = themeData.styles || {};
  
  const buttonStyle = styles.buttonStyle || 'filled';
  let dynamicStyle: any = {
    borderRadius: styles.buttonRadius || 12,
    boxShadow: styles.shadowStyle === 'sm' ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : (styles.shadowStyle === 'md' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : undefined),
    color: colors.buttonTextColor,
    border: 'none',
  };

  if (buttonStyle === 'filled') {
    dynamicStyle.backgroundColor = colors.buttonColor;
  } else if (buttonStyle === 'outline') {
    dynamicStyle.backgroundColor = 'transparent';
    dynamicStyle.border = `2px solid ${colors.buttonColor}`;
    dynamicStyle.color = colors.buttonColor;
  }

  return (
    <motion.a
      href={block.content.url || '#'}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="flex items-center justify-center w-full p-4 font-semibold text-center transition-opacity hover:opacity-90 relative"
      style={dynamicStyle}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="z-10">{block.content.title || 'Link'}</span>
    </motion.a>
  );
};
