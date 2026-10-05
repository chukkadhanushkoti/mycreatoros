import { API_BASE_URL, ApiError, authApi, fetchWithTimeout } from "@/lib/api-client";

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

let refreshInFlight: {refresh: string; promise: ReturnType<typeof authApi.refresh>} | null = null;
const ACCESS = "creatoros_access_token";
const REFRESH = "creatoros_refresh_token";
function stored(key: string) { return typeof window === "undefined" ? null : localStorage.getItem(key); }

function accountKey(token: string | null) {
  if (!token) return null;
  try { return JSON.parse(atob(token.split('.')[1].replace(/-/g,'+').replace(/_/g,'/'))).id || token; } catch { return token; }
}

export async function authedRequest<T>(path: string, accessToken: string, options: RequestInit = {}): Promise<T> {
  const sessionAtStart = stored(REFRESH);
  const send = async (token: string) => {
    try {
      return await fetchWithTimeout(`${API_BASE_URL}${path}`, {...options, headers:{"Content-Type":"application/json",...options.headers,Authorization:`Bearer ${token}`}});
    } catch {
      throw new ApiError("Could not reach the server. Check your connection and try again.",0,"NETWORK_ERROR");
    }
  };
  let res = await send(accessToken);
  if (res.status === 401 && sessionAtStart) {
    if (stored(REFRESH) !== sessionAtStart) throw new ApiError("Account changed. Please try again.",401,"SESSION_CHANGED");
    const newerToken = stored(ACCESS);
    if (newerToken && newerToken !== accessToken) {
      res = await send(newerToken);
    } else {
      if (!refreshInFlight || refreshInFlight.refresh !== sessionAtStart) {
        const pending = authApi.refresh(sessionAtStart);
        refreshInFlight = {refresh:sessionAtStart,promise:pending};
        void pending.finally(() => {if(refreshInFlight?.promise === pending) refreshInFlight=null;}).catch(() => {});
      }
      const tokens = await refreshInFlight.promise;
      // Another concurrent request may already have saved these refreshed tokens.
      const current = stored(REFRESH);
      if (current !== sessionAtStart && !(current === tokens.refreshToken && stored(ACCESS) === tokens.accessToken)) {
        throw new ApiError("Account changed. Please try again.",401,"SESSION_CHANGED");
      }
      localStorage.setItem(ACCESS,tokens.accessToken);
      localStorage.setItem(REFRESH,tokens.refreshToken);
      res = await send(tokens.accessToken);
    }
  }
  const data = await res.json().catch(() => ({}));
  if (sessionAtStart && accountKey(stored(ACCESS)) !== accountKey(accessToken)) throw new ApiError("Account changed. Please try again.",401,"SESSION_CHANGED");
  if (!res.ok) throw new ApiError(data.error || "Request failed.",res.status,data.code);
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
