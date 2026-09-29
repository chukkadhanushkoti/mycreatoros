import { authedRequest } from "@/lib/social-api";

export type CampaignStatus = "draft" | "active" | "paused";
export type TargetType = "specific" | "any" | "next";
export type KeywordMode = "specific" | "any";
export type ConfirmationStep = "none" | "button_confirmation" | "follow_check";

export interface DmButton {
  text: string;
  url?: string;
  payload?: string;
}

export interface DmTemplate {
  content: string;
  messageType?: "text" | "image" | "video" | "card" | "voice";
  weight?: number;
  buttons?: DmButton[];
}

export interface CampaignTrigger {
  type: "post_comment" | "story_reply" | "dm" | "live_comment";
  targetType: TargetType;
  mediaId?: string;
  mediaUrl?: string;
  mediaCaption?: string;
  keywordMode: KeywordMode;
  keywords: string[];
  excludedKeywords: string[];
}

export interface Campaign {
  _id: string;
  userId: string;
  socialAccountId: string;
  name: string;
  status: CampaignStatus;
  trigger: CampaignTrigger;
  confirmationStep: ConfirmationStep;
  openingDm?: {
    templates: DmTemplate[];
    followCheckMessage?: { content: string };
  };
  primaryDm: {
    templates: DmTemplate[];
  };
  publicReply: {
    enabled: boolean;
    templates: string[];
  };
  followUp: {
    enabled: boolean;
    delayMinutes: number;
    templates: DmTemplate[];
  };
  hourlyLimit?: number;
  dailyLimit?: number;
  lastTriggeredAt?: string;
  createdAt: string;
  updatedAt: string;
  detailedStats?: DetailedStats;
  detailedStatsToday?: DetailedStats;
}

export interface DetailedStats {
  matched: number;
  openingDms: number;
  primaryDms: number;
  waiting: number;
  failed: number;
  conversionRate: number;
}

export type CampaignPayload = Partial<
  Pick<
    Campaign,
    | "socialAccountId"
    | "name"
    | "trigger"
    | "confirmationStep"
    | "openingDm"
    | "primaryDm"
    | "publicReply"
    | "followUp"
    | "status"
  >
>;

export interface ActivityRecord {
  _id: string;
  campaignId: string;
  instagramUserId: string;
  instagramUsername: string;
  commentText?: string;
  status: string;
  failReason?: string;
  lastError?: string;
  timeline: { event: string; timestamp: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsBucket {
  matched: number;
  sent: number;
  waiting: number;
  failed: number;
  duplicate_skipped: number;
  privacy_blocked: number;
  rate_limited_meta: number;
  conversionRate: number;
}

export interface CampaignAnalytics {
  today: AnalyticsBucket;
  yesterday: AnalyticsBucket;
  last7Days: AnalyticsBucket;
  last30Days: AnalyticsBucket;
  lifetime: AnalyticsBucket;
}

export interface DashboardOverview {
  conversationsStarted: number;
  primaryDmsSent: number;
  publicRepliesSent: number;
  followUpsSent: number;
  successRate: number;
  activeCampaigns: number;
}

export interface ChartPoint {
  _id: string;
  commentsTriggered: number;
  openingDms: number;
  buttonClicks: number;
  primaryDms: number;
  followUps: number;
}

export interface InstagramPost {
  id: string;
  title?: string;
  thumbnail?: string;
}

export const autoDmApi = {
  getCampaigns: (token: string) => authedRequest<Campaign[]>("/api/auto-dm/campaigns", token),

  getCampaign: (token: string, id: string) => authedRequest<Campaign>(`/api/auto-dm/campaigns/${id}`, token),

  createCampaign: (token: string, payload: CampaignPayload) =>
    authedRequest<Campaign>("/api/auto-dm/campaigns", token, {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  updateCampaign: (token: string, id: string, payload: CampaignPayload) =>
    authedRequest<Campaign>(`/api/auto-dm/campaigns/${id}`, token, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),

  deleteCampaign: (token: string, id: string) =>
    authedRequest<{ message: string }>(`/api/auto-dm/campaigns/${id}`, token, { method: "DELETE" }),

  duplicateCampaign: (token: string, id: string) =>
    authedRequest<Campaign>(`/api/auto-dm/campaigns/${id}/duplicate`, token, { method: "POST" }),

  getActivity: (token: string, params: { campaignId?: string; limit?: number; skip?: number } = {}) => {
    const qs = new URLSearchParams();
    if (params.campaignId) qs.set("campaignId", params.campaignId);
    if (params.limit) qs.set("limit", String(params.limit));
    if (params.skip) qs.set("skip", String(params.skip));
    const query = qs.toString();
    return authedRequest<ActivityRecord[]>(`/api/auto-dm/activity${query ? `?${query}` : ""}`, token);
  },

  getAnalytics: (token: string, campaignId: string) =>
    authedRequest<CampaignAnalytics>(`/api/auto-dm/analytics?campaignId=${campaignId}`, token),

  getDashboardOverview: (token: string, timeframe: "today" | "all_time") =>
    authedRequest<DashboardOverview>(`/api/auto-dm/analytics/dashboard/overview?timeframe=${timeframe}`, token),

  getDashboardCharts: (token: string, days = 7) =>
    authedRequest<ChartPoint[]>(`/api/auto-dm/analytics/dashboard/charts?days=${days}`, token),

  /** Recent Instagram posts, for the "choose a post" step of the wizard. */
  getInstagramPosts: async (token: string): Promise<InstagramPost[]> => {
    const data = await authedRequest<{ topContent?: InstagramPost[]; videos?: InstagramPost[] }>(
      "/api/analytics/instagram",
      token
    );
    return data.topContent || data.videos || [];
  },
};
