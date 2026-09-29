"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { getAccessToken } from "@/context/auth-context";
import { socialApi, type PlatformStatusMap } from "@/lib/social-api";

interface PlatformsContextValue {
  statuses: PlatformStatusMap;
  isLoading: boolean;
  hasAnyConnected: boolean;
  refresh: () => Promise<void>;
}

const PlatformsContext = createContext<PlatformsContextValue | undefined>(undefined);

export function PlatformsProvider({ children }: { children: ReactNode }) {
  const [statuses, setStatuses] = useState<PlatformStatusMap>({});
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    const token = getAccessToken();
    if (!token) {
      setStatuses({});
      setIsLoading(false);
      return;
    }
    try {
      const result = await socialApi.getAllStatuses(token);
      setStatuses(result);
    } catch {
      // If the status check fails, treat as "nothing connected" rather than blocking the dashboard.
      setStatuses({});
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
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
