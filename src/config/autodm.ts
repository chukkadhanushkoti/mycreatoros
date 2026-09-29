import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Hourglass,
  MailCheck,
  ShieldAlert,
  SplitSquareVertical,
  XCircle,
  type LucideIcon,
} from "lucide-react";

import type { CampaignStatus, ConfirmationStep } from "@/lib/autodm-api";

export const CAMPAIGN_STATUS_META: Record<CampaignStatus, { label: string; className: string }> = {
  active: {
    label: "Active",
    className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  paused: {
    label: "Paused",
    className: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  draft: {
    label: "Draft",
    className: "bg-neutral-500/10 text-neutral-600 dark:text-neutral-400",
  },
};

interface ActivityStatusMeta {
  label: string;
  icon: LucideIcon;
  color: string;
}

const success: ActivityStatusMeta = { label: "", icon: CheckCircle2, color: "#10B981" };
const waiting: ActivityStatusMeta = { label: "", icon: Hourglass, color: "#F59E0B" };
const failed: ActivityStatusMeta = { label: "", icon: XCircle, color: "#EF4444" };

export const ACTIVITY_STATUS_META: Record<string, ActivityStatusMeta> = {
  processing: { label: "Processing", icon: Clock, color: "#3B82F6" },
  public_reply_sent: { ...success, label: "Public reply sent" },
  opening_dm_sent: { ...success, label: "Opening DM sent" },
  waiting_for_interaction: { ...waiting, label: "Waiting for interaction" },
  button_clicked: { ...success, label: "Button clicked" },
  follow_verified: { ...success, label: "Follow verified" },
  email_collected: { ...success, label: "Email collected" },
  dm_sent: { ...success, label: "DM sent" },
  primary_dm_sent: { ...success, label: "Primary DM sent" },
  primary_dm_failed: { ...failed, label: "Primary DM failed" },
  follow_up_delayed: { ...waiting, label: "Follow-up delayed" },
  follow_up_scheduled: { ...waiting, label: "Follow-up scheduled" },
  follow_up_sent: { ...success, label: "Follow-up sent" },
  follow_up_failed: { ...failed, label: "Follow-up failed" },
  failed: { ...failed, label: "Failed" },
  duplicate_skipped: { label: "Duplicate skipped", icon: SplitSquareVertical, color: "#D97706" },
  waiting_for_quota: { ...waiting, label: "Waiting for quota" },
  privacy_blocked: { label: "Privacy blocked", icon: ShieldAlert, color: "#EF4444" },
  rate_limited_meta: { label: "Rate limited", icon: AlertTriangle, color: "#F59E0B" },
};

export function getActivityStatusMeta(status: string): ActivityStatusMeta {
  return ACTIVITY_STATUS_META[status] || { label: status, icon: MailCheck, color: "#71717A" };
}

/** Common Meta error substrings mapped to a human-readable explanation. */
export function translateAutoDmError(message?: string): string | null {
  if (!message) return null;
  const lower = message.toLowerCase();
  if (lower.includes("disabled access to instagram direct")) return "The user has disabled DMs from strangers.";
  if (lower.includes("instagram_manage_messages")) return "Missing Instagram messaging permission — reconnect Instagram.";
  if (lower.includes("already has a reply")) return "This comment already has an automated reply (duplicate limit).";
  return message;
}

export const CONFIRMATION_STEP_LABELS: Record<ConfirmationStep, string> = {
  none: "No confirmation — send the DM directly",
  button_confirmation: "Button confirmation — send an opening message with a button first",
  follow_check: "Check follower status before sending",
};
