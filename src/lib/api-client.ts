export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://creatoros-backend-tugu.onrender.com";

const AUTH_BASE = `${API_BASE_URL}/auth/google-signin`;

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  username: string | null;
  email: string;
  profilePicture: string;
  phone: string;
  bio: string;
  creatorScore: number;
  plan: string;
  credits: number;
  authProvider: string;
  linkedProviders: string[];
  isVerified: boolean;
  status: string;
  lastLogin: string | null;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export class ApiError extends Error {
  status: number;
  code?: string;
  userId?: string;

  constructor(message: string, status: number, code?: string, userId?: string) {
    super(message);
    this.status = status;
    this.code = code;
    this.userId = userId;
  }
}

const REQUEST_TIMEOUT_MS = 45_000; // Render free-tier services can take 30-50s to wake from cold start.

async function fetchWithTimeout(url: string, options: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

async function request<T>(path: string, options: RequestInit = {}, attempt = 0): Promise<T> {
  const url = `${AUTH_BASE}${path}`;
  const init: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  let res: Response;
  try {
    res = await fetchWithTimeout(url, init);
  } catch (err) {
    // Cold-start services sometimes refuse/reset the first connection while waking up — retry once.
    if (attempt === 0) {
      await new Promise((resolve) => setTimeout(resolve, 2500));
      return request<T>(path, options, attempt + 1);
    }
    const isAbort = err instanceof DOMException && err.name === "AbortError";
    throw new ApiError(
      isAbort
        ? "The server is taking too long to respond. It may be waking up from sleep — please try again."
        : "Could not reach the server. Check your connection and try again.",
      0,
      "NETWORK_ERROR"
    );
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    if (res.status === 429) {
      throw new ApiError(data.error || "Too many attempts. Please wait a few minutes and try again.", 429, "RATE_LIMITED");
    }
    throw new ApiError(data.error || "Something went wrong. Please try again.", res.status, data.code, data.userId);
  }

  return data as T;
}

export const authApi = {
  checkUsername: (username: string) =>
    request<{ available: boolean; username?: string; error?: string }>("/check-username", {
      method: "POST",
      body: JSON.stringify({ username }),
    }),

  signup: (payload: { firstName: string; lastName?: string; username: string; email: string; password: string }) =>
    request<{ message: string; userId: string }>("/signup", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  signin: (payload: { email: string; password: string }) =>
    request<AuthTokens & { user: AuthUser }>("/signin", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  verifyOtp: (payload: { userId: string; otp: string; type?: "verify_email" | "reset_password" }) =>
    request<(AuthTokens & { user: AuthUser }) | { message: string; resetToken: string }>("/verify-otp", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  resendOtp: (payload: { userId: string; type?: "verify_email" | "reset_password" }) =>
    request<{ message: string }>("/resend-otp", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  forgotPassword: (email: string) =>
    request<{ message: string; userId?: string }>("/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  resetPassword: (payload: { resetToken: string; newPassword: string }) =>
    request<{ message: string }>("/reset-password", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  completeGoogleSetup: (payload: { tempToken: string; username: string }) =>
    request<AuthTokens & { user: AuthUser }>("/google-complete", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  refresh: (refreshToken: string) =>
    request<AuthTokens>("/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    }),

  me: (accessToken: string) =>
    request<{ user: AuthUser }>("/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    }),

  logout: () => request<{ success: boolean }>("/logout", { method: "POST" }),

  googleWebAuthUrl: () => `${AUTH_BASE}/web`,
};
