import React from 'react';
import type { PublicBlockProps } from './types';
import { TextBlock } from './TextBlock';
import {
  LinkBlock,
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
const blockRegistry: Record<string, React.FC<PublicBlockProps>> = {};

export function registerBlock(type: string, component: React.FC<PublicBlockProps>) {
  blockRegistry[type] = component;
}

export function getBlockComponent(type: string): React.FC<PublicBlockProps> | null {
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
