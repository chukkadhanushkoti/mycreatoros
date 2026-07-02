import React from 'react';
import { LinkBlock } from './LinkBlock';
import { TextBlock } from './TextBlock';
import { DividerBlock, SpacerBlock, ImageBlock, VideoBlock } from './blocks';

// Block Registry
const blockRegistry: Record<string, React.FC<any>> = {};

export function registerBlock(type: string, component: React.FC<any>) {
  blockRegistry[type] = component;
}

export function getBlockComponent(type: string): React.FC<any> | null {
  return blockRegistry[type] || null;
}

// Initial Registration
registerBlock('link', LinkBlock);
registerBlock('button', LinkBlock);
registerBlock('social', LinkBlock);
registerBlock('youtube', LinkBlock);
registerBlock('product', LinkBlock);
registerBlock('text', TextBlock);
registerBlock('divider', DividerBlock);
registerBlock('spacer', SpacerBlock);
registerBlock('image', ImageBlock);
registerBlock('video', VideoBlock);
