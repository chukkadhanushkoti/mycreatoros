import { API_BASE_URL, ApiError } from "@/lib/api-client";

export type BioStoreBlockType =
  | "link"
  | "text"
  | "button"
  | "image"
  | "video"
  | "youtube"
  | "product"
  | "divider"
  | "spacer"
  | "social";

export interface BioStoreBlock {
  _id?: string;
  type: BioStoreBlockType;
  content: Record<string, unknown>;
  order: number;
  isVisible?: boolean;
  clicks?: number;
}

export interface BioStoreThemeOverrides {
  backgroundColor?: string;
  textColor?: string;
  cardColor?: string;
  buttonColor?: string;
  buttonTextColor?: string;
  fontFamily?: string;
  buttonStyle?: "filled" | "outline" | "glass";
  spacing?: string;
  shadowStyle?: string;
  buttonRadius?: number;
  cardRadius?: number;
  avatarBorder?: number;
  iconStyle?: string;
}

export interface BioStoreDoc {
  _id: string;
  user: string;
  username: string;
  displayName?: string;
  bio?: string;
  profileImage?: string;
  bannerImage?: string;
  theme: string;
  themeOverrides?: BioStoreThemeOverrides;
  design?: Record<string, unknown>;
  settings?: {
    animationsEnabled?: boolean;
    showBranding?: boolean;
    openLinksInNewTab?: boolean;
  };
  isPremium?: boolean;
  isVerified?: boolean;
  blocks: BioStoreBlock[];
  status: "draft" | "published" | "unpublished";
  storageUsed?: number;
  analytics: {
    views: number;
    uniqueVisitors: number;
    clicks: number;
    ctr?: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface DeletedBioStoreInfo {
  deleted: boolean;
  username?: string;
  displayName?: string;
  deletedAt?: string;
  expiresAt?: string;
  daysRemaining?: number;
}

export interface BioStoreAnalytics {
  summary: { views: number; clicks: number; ctr: number; uniqueVisitors: number };
  blocks: { _id: string; type: string; title: string; clicks: number }[];
  chart: { labels: string[]; views: number[]; clicks: number[] };
}

export interface StorageUsage {
  used: number;
  usedMB: number;
  quota: number;
  quotaLabel: string;
  percent: number;
  isPremium: boolean;
}

async function request<T>(path: string, accessToken: string, options: RequestInit = {}): Promise<T> {
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

export interface BioStoreUpdatePayload {
  displayName?: string;
  bio?: string;
  profileImage?: string;
  bannerImage?: string;
  theme?: string;
  themeOverrides?: BioStoreThemeOverrides;
  design?: Record<string, unknown>;
  settings?: BioStoreDoc["settings"];
  blocks?: BioStoreBlock[];
  status?: BioStoreDoc["status"];
}

export const biostoreApi = {
  checkUsername: (username: string) =>
    fetch(`${API_BASE_URL}/api/biostore/check/${encodeURIComponent(username)}`)
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) return { available: false, message: data.error || "Not available" };
        return { available: true, message: data.message as string | undefined };
      }),

  getMine: (accessToken: string) => request<BioStoreDoc>("/api/biostore/me", accessToken),

  getDeleted: (accessToken: string) => request<DeletedBioStoreInfo>("/api/biostore/me/deleted", accessToken),

  restore: (accessToken: string) =>
    request<{ success: boolean; message: string }>("/api/biostore/me/restore", accessToken, { method: "POST" }),

  create: (
    accessToken: string,
    payload: { username: string; displayName?: string; bio?: string }
  ) =>
    request<BioStoreDoc>("/api/biostore", accessToken, {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  update: (accessToken: string, payload: BioStoreUpdatePayload) =>
    request<BioStoreDoc>("/api/biostore", accessToken, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),

  // Routed through the PUT endpoint rather than `PATCH /api/biostore/autosave`: the deployed
  // backend's CORS config doesn't currently allow the PATCH method from the browser, which made
  // every autosave fail with "Failed to fetch". PUT is CORS-safe and accepts the same payload.
  autosave: (accessToken: string, payload: BioStoreUpdatePayload) => biostoreApi.update(accessToken, payload),

  remove: (accessToken: string) =>
    request<{ success: boolean; message: string; deletedAt: string; expiresAt: string }>(
      "/api/biostore",
      accessToken,
      { method: "DELETE" }
    ),

  getAnalytics: (accessToken: string) => request<BioStoreAnalytics>("/api/biostore/me/analytics", accessToken),

  getStorage: (accessToken: string) => request<StorageUsage>("/api/biostore/storage", accessToken),

  presignMedia: (
    accessToken: string,
    payload: { type: "profile" | "banner" | "image" | "video" | "document"; mimeType: string; fileName: string; fileSize: number }
  ) =>
    request<{ uploadUrl: string; s3Key: string; mediaId: string; url: string }>(
      "/api/biostore/media/presign",
      accessToken,
      { method: "POST", body: JSON.stringify(payload) }
    ),

  confirmMedia: (
    accessToken: string,
    payload: { mediaId: string; size: number; width?: number; height?: number; duration?: number }
  ) =>
    request<{ mediaId: string; url: string; thumbnailUrl: string; status: string }>(
      "/api/biostore/media/confirm",
      accessToken,
      { method: "POST", body: JSON.stringify(payload) }
    ),

  /** Uploads a file end-to-end: presign -> PUT to S3 -> confirm. Returns the public URL. */
  uploadFile: async (
    accessToken: string,
    file: File,
    type: "profile" | "banner" | "image" | "video" | "document"
  ): Promise<string> => {
    const { uploadUrl, mediaId } = await biostoreApi.presignMedia(accessToken, {
      type,
      mimeType: file.type,
      fileName: file.name,
      fileSize: file.size,
    });

    const putRes = await fetch(uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    });
    if (!putRes.ok) throw new ApiError("Failed to upload file to storage.", putRes.status);

    const confirmed = await biostoreApi.confirmMedia(accessToken, { mediaId, size: file.size });
    return confirmed.url;
  },
};
