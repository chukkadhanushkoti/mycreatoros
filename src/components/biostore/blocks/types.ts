import type { BioStoreBlock } from '@/lib/biostore-api';
import type { BioStoreTheme } from '@/config/biostore-themes';
import type { MouseEvent } from 'react';
export interface PublicBlockProps {block: BioStoreBlock; themeData: BioStoreTheme; index?: number; onClick?: (e: MouseEvent) => void;}
