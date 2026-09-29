import {
  AlignJustify,
  Globe,
  Image as ImageIcon,
  Layers,
  Link2,
  Play,
  ShoppingBag,
  Video,
  type LucideIcon,
} from "lucide-react";

import type { BioStoreBlockType } from "@/lib/biostore-api";

export interface BlockTypeMeta {
  type: BioStoreBlockType;
  label: string;
  icon: LucideIcon;
  color: string;
  defaultContent: Record<string, unknown>;
  hasUrl: boolean;
}

export const BLOCK_TYPES: BlockTypeMeta[] = [
  { type: "link", label: "Link", icon: Globe, color: "#64748B", hasUrl: true, defaultContent: { title: "New Link", url: "" } },
  { type: "text", label: "Text", icon: AlignJustify, color: "#475569", hasUrl: false, defaultContent: { text: "" } },
  { type: "button", label: "Button", icon: Layers, color: "#6366F1", hasUrl: true, defaultContent: { title: "New Button", url: "" } },
  { type: "image", label: "Image", icon: ImageIcon, color: "#9CA3AF", hasUrl: false, defaultContent: { title: "", mediaUrl: "" } },
  { type: "video", label: "Video", icon: Video, color: "#9CA3AF", hasUrl: false, defaultContent: { title: "", mediaUrl: "" } },
  { type: "youtube", label: "YouTube", icon: Play, color: "#FF0000", hasUrl: true, defaultContent: { title: "YouTube Video", url: "" } },
  { type: "product", label: "Product", icon: ShoppingBag, color: "#F97316", hasUrl: true, defaultContent: { title: "New Product", url: "", price: "" } },
  { type: "social", label: "Social", icon: Link2, color: "#3B82F6", hasUrl: true, defaultContent: { platform: "instagram", url: "" } },
  { type: "divider", label: "Divider", icon: AlignJustify, color: "#CBD5E1", hasUrl: false, defaultContent: {} },
  { type: "spacer", label: "Spacer", icon: AlignJustify, color: "#CBD5E1", hasUrl: false, defaultContent: {} },
];

export const BLOCK_TYPE_MAP: Record<BioStoreBlockType, BlockTypeMeta> = Object.fromEntries(
  BLOCK_TYPES.map((b) => [b.type, b])
) as Record<BioStoreBlockType, BlockTypeMeta>;
