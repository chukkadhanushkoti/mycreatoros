import {
  AudioLines,
  Captions,
  Disc3,
  Image as ImageIcon,
  Images,
  MessageSquareText,
  Mic2,
  Shapes,
  Sparkles,
  Type,
  UserCircle,
  Video,
  Wand2,
  type LucideIcon,
} from "lucide-react";

export interface ToolMenuItem {
  label: string;
  href: string;
  description: string;
  icon: LucideIcon;
}

export interface ToolMenu {
  key: string;
  label: string;
  href: string;
  icon: LucideIcon;
  items: ToolMenuItem[];
}

export const TOOL_MENUS: ToolMenu[] = [
  {
    key: "text",
    label: "Text",
    href: "/dashboard/tools/text",
    icon: MessageSquareText,
    items: [
      {
        label: "Caption Generator",
        href: "/dashboard/tools/text/caption-generator",
        description: "Generate on-brand captions and hashtags from a topic.",
        icon: MessageSquareText,
      },
    ],
  },
  {
    key: "image",
    label: "Image",
    href: "/dashboard/tools/image",
    icon: ImageIcon,
    items: [
      {
        label: "Text to Image",
        href: "/dashboard/tools/image/text-to-image",
        description: "Generate original images from a text prompt.",
        icon: Type,
      },
      {
        label: "Image to Image",
        href: "/dashboard/tools/image/image-to-image",
        description: "Transform or restyle an existing image.",
        icon: Images,
      },
      {
        label: "Logo Creator",
        href: "/dashboard/tools/image/logo-creator",
        description: "Design a logo for your brand.",
        icon: Shapes,
      },
      {
        label: "Avatar Creator",
        href: "/dashboard/tools/image/avatar-creator",
        description: "Create a custom avatar for your profile.",
        icon: UserCircle,
      },
    ],
  },
  {
    key: "video",
    label: "Video",
    href: "/dashboard/tools/video",
    icon: Video,
    items: [
      {
        label: "Text to Video",
        href: "/dashboard/tools/video/text-to-video",
        description: "Turn a script or prompt into a short video.",
        icon: Type,
      },
      {
        label: "Video Editor",
        href: "/dashboard/tools/video/editor",
        description: "Trim, caption and repurpose your footage.",
        icon: Wand2,
      },
      {
        label: "Auto Captions",
        href: "/dashboard/tools/video/auto-captions",
        description: "Generate accurate captions automatically.",
        icon: Captions,
      },
      {
        label: "Thumbnail Maker",
        href: "/dashboard/tools/video/thumbnail-maker",
        description: "Design eye-catching thumbnails in seconds.",
        icon: Sparkles,
      },
    ],
  },
  {
    key: "audio",
    label: "Audio",
    href: "/dashboard/tools/audio",
    icon: AudioLines,
    items: [
      {
        label: "Text to Speech",
        href: "/dashboard/tools/audio/text-to-speech",
        description: "Convert scripts into natural voiceovers.",
        icon: Mic2,
      },
      {
        label: "Voice Cleanup",
        href: "/dashboard/tools/audio/voice-cleanup",
        description: "Remove noise and polish your recordings.",
        icon: AudioLines,
      },
      {
        label: "Voice Cloning",
        href: "/dashboard/tools/audio/voice-cloning",
        description: "Create a reusable AI version of your voice.",
        icon: Disc3,
      },
      {
        label: "Music Generator",
        href: "/dashboard/tools/audio/music-generator",
        description: "Generate royalty-free background music.",
        icon: Disc3,
      },
    ],
  },
];
