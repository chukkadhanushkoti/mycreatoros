import { authedRequest } from "@/lib/social-api";

export interface AnalyticsPlatformSummary {
  name: string;
  isConnected: boolean;
  views: string;
  subscribers: string;
  videos: string;
  channelName: string;
  channelAvatar?: string;
}

export interface AnalyticsContentItem {
  id: string;
  title: string;
  thumbnail?: string;
  publishedAt: string;
  views: string;
  viewsNum: number;
  platform: string;
  type: string;
}

export interface AnalyticsOverview {
  totalViews: string;
  totalSubscribers: string;
  totalLikes: string;
  totalWatchTime: string;
  growth: string;
  growthSubs: string;
  growthLikes: string;
  growthWatch: string;
  platforms: AnalyticsPlatformSummary[];
  topContent: AnalyticsContentItem[];
}

export const analyticsApi = {
  /** Aggregate cross-platform overview — real views/subscribers/likes/watch-time and growth. */
  getOverview: (accessToken: string) => authedRequest<AnalyticsOverview>("/api/analytics/overview", accessToken),
};
