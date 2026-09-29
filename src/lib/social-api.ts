import { API_BASE_URL, ApiError } from "@/lib/api-client";

export type SocialPlatform = "youtube" | "instagram" | "facebook" | "linkedin";

export interface PlatformStatus {
  connected: boolean;
  name?: string;
  username?: string;
  avatar?: string;
  channelId?: string;
  pageId?: string;
  urn?: string;
  autoDmEnabled?: boolean;
  allPages?: unknown[];
}

export type PlatformStatusMap = Partial<Record<SocialPlatform, PlatformStatus>>;

export async function authedRequest<T>(path: string, accessToken: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      ...options.headers,
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new ApiError(data.error || "Request failed.", res.status, data.code);
  }

  return data as T;
}

// Maps our platform key to the backend's connect/disconnect route prefix.
// Instagram + Facebook share the same "meta" OAuth connection.
const CONNECT_PREFIX: Record<SocialPlatform, string> = {
  youtube: "/auth/youtube",
  instagram: "/auth/meta",
  facebook: "/auth/meta",
  linkedin: "/auth/linkedin",
};

export const socialApi = {
  /** Fetches the OAuth URL to open for connecting a given platform. */
  getConnectUrl: (platform: SocialPlatform, accessToken: string) =>
    authedRequest<{ url: string }>(`${CONNECT_PREFIX[platform]}/connect`, accessToken),

  /** Aggregate status for youtube, instagram, linkedin. */
  getPlatformStatuses: (accessToken: string) =>
    authedRequest<PlatformStatusMap>("/api/analytics/platforms/status", accessToken),

  /** Facebook status isn't included in the aggregate endpoint — fetch separately. */
  getFacebookStatus: (accessToken: string) =>
    authedRequest<PlatformStatus>("/auth/meta/facebook/status", accessToken),

  /** Fetches all four platform statuses and merges them into one map. */
  getAllStatuses: async (accessToken: string): Promise<PlatformStatusMap> => {
    const [statuses, facebook] = await Promise.all([
      socialApi.getPlatformStatuses(accessToken),
      socialApi.getFacebookStatus(accessToken).catch(() => ({ connected: false }) as PlatformStatus),
    ]);
    return { ...statuses, facebook };
  },

  disconnect: (platform: SocialPlatform, accessToken: string) =>
    authedRequest<{ success: boolean }>(`${CONNECT_PREFIX[platform]}/disconnect`, accessToken, {
      method: "POST",
    }),
};
