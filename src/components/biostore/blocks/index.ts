import React from 'react';
import { LinkBlock } from './LinkBlock';
import { TextBlock } from './TextBlock';
import {
  DividerBlock,
  SpacerBlock,
  ImageBlock,
  VideoBlock,
  YouTubeBlock,
  ProductBlock,
  SocialBlock,
  ButtonBlock,
} from './blocks';

// Block Registry — add new block types here without touching other files
const blockRegistry: Record<string, React.FC<any>> = {};

export function registerBlock(type: string, component: React.FC<any>) {
  blockRegistry[type] = component;
}

export function getBlockComponent(type: string): React.FC<any> | null {
  return blockRegistry[type] || null;
}

// Core Block Registration
registerBlock('link', LinkBlock);
registerBlock('button', ButtonBlock);
registerBlock('social', SocialBlock);
registerBlock('youtube', YouTubeBlock);
registerBlock('product', ProductBlock);
registerBlock('text', TextBlock);
registerBlock('divider', DividerBlock);
registerBlock('spacer', SpacerBlock);
registerBlock('image', ImageBlock);
registerBlock('video', VideoBlock);
