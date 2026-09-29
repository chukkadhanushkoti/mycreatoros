import {
  BarChart3,
  DollarSign,
  FileText,
  LayoutDashboard,
  Link2,
  MessageCircle,
  Users,
  type LucideIcon,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa6";
import type { IconType } from "react-icons";

import type { SocialPlatform } from "@/lib/social-api";

export const PLATFORM_ORDER: SocialPlatform[] = ["youtube", "instagram", "facebook", "linkedin"];

export const PLATFORM_META: Record<SocialPlatform, { label: string; icon: IconType; color: string }> = {
  youtube: { label: "YouTube", icon: FaYoutube, color: "#FF0000" },
  instagram: { label: "Instagram", icon: FaInstagram, color: "#E1306C" },
  facebook: { label: "Facebook", icon: FaFacebook, color: "#1877F2" },
  linkedin: { label: "LinkedIn", icon: FaLinkedin, color: "#0A66C2" },
};

export interface PlatformNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

/** Sidebar "Services" nav shown for each platform once it's connected. */
export const PLATFORM_NAV: Record<SocialPlatform, PlatformNavItem[]> = {
  youtube: [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { label: "Content", href: "/dashboard/content", icon: FileText },
    { label: "Community", href: "/dashboard/community", icon: Users },
    { label: "Earnings", href: "/dashboard/earn", icon: DollarSign },
  ],
  instagram: [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { label: "Content", href: "/dashboard/content", icon: FileText },
    { label: "Community", href: "/dashboard/community", icon: Users },
    { label: "BioStore", href: "/dashboard/tools/biostore", icon: Link2 },
    { label: "Auto DM", href: "/dashboard/tools/autodm", icon: MessageCircle },
  ],
  facebook: [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { label: "Content", href: "/dashboard/content", icon: FileText },
    { label: "Community", href: "/dashboard/community", icon: Users },
  ],
  linkedin: [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { label: "Content", href: "/dashboard/content", icon: FileText },
    { label: "Community", href: "/dashboard/community", icon: Users },
  ],
};
