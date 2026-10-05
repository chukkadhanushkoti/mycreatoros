"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { ApiError, authApi, type AuthTokens, type AuthUser } from "@/lib/api-client";

const ACCESS_TOKEN_KEY = "creatoros_access_token";
const REFRESH_TOKEN_KEY = "creatoros_refresh_token";

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setSession: (tokens: AuthTokens, user: AuthUser) => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function getAccessToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setSession = useCallback((tokens: AuthTokens, nextUser: AuthUser) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
    setUser(nextUser);
  }, []);

  const clearSession = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();
    if (!accessToken || !refreshToken) {
      clearSession();
      return;
    }

    try {
      const { user: freshUser } = await authApi.me(accessToken);
      if (getAccessToken() === accessToken) setUser(freshUser);
    } catch (error) {
      if (!(error instanceof ApiError) || error.status !== 401) return;
      try {
        const tokens = await authApi.refresh(refreshToken);
        if (getRefreshToken() !== refreshToken) return;
        localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
        const { user: freshUser } = await authApi.me(tokens.accessToken);
        if (getAccessToken() === tokens.accessToken) setUser(freshUser);
      } catch (error) {
        if (error instanceof ApiError && error.status === 401 && getRefreshToken() === refreshToken) clearSession();
      }
    }
  }, [clearSession]);

  useEffect(() => {
    const task = setTimeout(() => { void refreshUser().finally(() => setIsLoading(false)); }, 0);
    const retry = () => { void refreshUser(); };
    window.addEventListener("online", retry);
    window.addEventListener("focus", retry);
    return () => { clearTimeout(task); window.removeEventListener("online", retry); window.removeEventListener("focus", retry); };
  }, [refreshUser]);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // ignore network errors on logout
    }
    clearSession();
  }, [clearSession]);

  const value = useMemo(
    () => ({ user, isLoading, isAuthenticated: !!user, setSession, logout, refreshUser }),
    [user, isLoading, setSession, logout, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
