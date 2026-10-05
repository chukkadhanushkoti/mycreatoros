"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { getAccessToken, useAuth } from "@/context/auth-context";
import { socialApi, type PlatformStatusMap } from "@/lib/social-api";

interface PlatformsContextValue {
  statuses: PlatformStatusMap;
  isLoading: boolean;
  hasAnyConnected: boolean;
  refresh: () => Promise<void>;
}

const PlatformsContext = createContext<PlatformsContextValue | undefined>(undefined);

export function PlatformsProvider({ children }: { children: ReactNode }) {
  const { user, isLoading: authLoading } = useAuth();
  const userId = user?.id;
  const [snapshot, setSnapshot] = useState<{userId?: string; statuses: PlatformStatusMap}>({statuses: {}});
  const [loadedUser, setLoadedUser] = useState<string>();
  const statuses = useMemo(() => snapshot.userId === userId ? snapshot.statuses : {}, [snapshot, userId]);
  const isLoading = authLoading || (!!userId && loadedUser !== userId);

  const refresh = useCallback(async () => {
    const token = getAccessToken();
    if (!token || !userId) return;
    try {
      const result = await socialApi.getAllStatuses(token);
      setSnapshot({userId, statuses: result});
    } catch {
      // A network failure does not disconnect previously confirmed accounts.
    } finally {
      setLoadedUser(userId);
    }
  }, [userId]);

  useEffect(() => {
    const initial = setTimeout(() => { void refresh(); }, 0);
    const retry = () => { void refresh(); };
    window.addEventListener("online", retry);
    window.addEventListener("focus", retry);
    return () => { clearTimeout(initial); window.removeEventListener("online", retry); window.removeEventListener("focus", retry); };
  }, [refresh]);

  const hasAnyConnected = useMemo(() => Object.values(statuses).some((s) => s?.connected), [statuses]);

  const value = useMemo(
    () => ({ statuses, isLoading, hasAnyConnected, refresh }),
    [statuses, isLoading, hasAnyConnected, refresh]
  );

  return <PlatformsContext.Provider value={value}>{children}</PlatformsContext.Provider>;
}

export function usePlatforms() {
  const ctx = useContext(PlatformsContext);
  if (!ctx) throw new Error("usePlatforms must be used within a PlatformsProvider");
  return ctx;
}
