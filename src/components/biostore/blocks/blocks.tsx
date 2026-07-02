import React from 'react';
import { motion } from 'framer-motion';
import { LinkBlock } from './LinkBlock';
import { TextBlock } from './TextBlock';

export const DividerBlock = ({ themeData }: any) => {
  const colors = themeData.colors || {};
  return (
    <div className="w-full py-8 flex justify-center">
      <div className="w-1/2 h-px" style={{ backgroundColor: colors.textColor, opacity: 0.2 }} />
    </div>
  );
};

export const SpacerBlock = () => {
  return <div className="w-full h-8" />;
};

export const ImageBlock = ({ block, themeData }: any) => {
  const styles = themeData.styles || {};
  return (
    <div className="w-full overflow-hidden" style={{ borderRadius: styles.cardRadius || 16 }}>
      <img src={block.content.url || '/placeholder-image.jpg'} alt="Image Block" className="w-full h-auto object-cover" />
    </div>
  );
};

export const VideoBlock = ({ block, themeData }: any) => {
  const styles = themeData.styles || {};
  return (
    <div className="w-full overflow-hidden" style={{ borderRadius: styles.cardRadius || 16 }}>
      <video src={block.content.url} controls className="w-full h-auto" />
    </div>
  );
};
