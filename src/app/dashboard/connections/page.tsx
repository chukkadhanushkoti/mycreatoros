"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CheckCircle2, Link as LinkIcon, Loader2, Unlink } from "lucide-react";

import { cn } from "@/lib/utils";
import { getAccessToken } from "@/context/auth-context";
import { ApiError } from "@/lib/api-client";
import { socialApi, type PlatformStatus, type PlatformStatusMap, type SocialPlatform } from "@/lib/social-api";
import { PLATFORM_META, PLATFORM_ORDER } from "@/config/platforms";

interface PlatformConfig {
  key: SocialPlatform;
  label: string;
  description: string;
  color: string;
  icon: React.ElementType;
  disabled?: boolean;
}

const DESCRIPTIONS: Record<SocialPlatform, string> = {
  youtube: "Connect your Google account to fetch video stats and get AI-powered content coaching.",
  instagram: "Track reel performance, followers and engagement right from your dashboard.",
  facebook: "Publish posts, videos and Reels straight to your connected Facebook Page.",
  linkedin: "Coming soon — LinkedIn connections aren't available yet.",
};

const PLATFORMS: PlatformConfig[] = PLATFORM_ORDER.map((key) => ({
  key,
  label: PLATFORM_META[key].label,
  description: DESCRIPTIONS[key],
  color: PLATFORM_META[key].color,
  icon: PLATFORM_META[key].icon,
  disabled: key === "linkedin",
}));

export default function ConnectionsPage() {
  const [statuses, setStatuses] = useState<PlatformStatusMap>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connectingPlatform, setConnectingPlatform] = useState<SocialPlatform | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchStatuses = useCallback(async () => {
    const token = getAccessToken();
    if (!token) return;
    try {
      const result = await socialApi.getAllStatuses(token);
      setStatuses(result);
      setError(null);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not load connection status.");
    }
  }, []);

  useEffect(() => {
    fetchStatuses().finally(() => setLoading(false));
  }, [fetchStatuses]);

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  const stopPolling = () => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
    setConnectingPlatform(null);
  };

  const handleConnect = async (platform: SocialPlatform) => {
    const token = getAccessToken();
    if (!token) return;
    setError(null);
    try {
      const { url } = await socialApi.getConnectUrl(platform, token);
      const popup = window.open(url, "creatoros-oauth", "width=560,height=680");
      if (!popup) {
        setError("Please allow popups for this site to connect your account.");
        return;
      }

      setConnectingPlatform(platform);
      if (pollRef.current) clearInterval(pollRef.current);

      pollRef.current = setInterval(async () => {
        if (popup.closed) {
          await fetchStatuses();
          stopPolling();
          return;
        }
        const result = await socialApi.getAllStatuses(token).catch(() => null);
        if (result && result[platform]?.connected) {
          setStatuses(result);
          popup.close();
          stopPolling();
        }
      }, 2500);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not start the connection.");
    }
  };

  const handleDisconnect = async (platform: SocialPlatform) => {
    const token = getAccessToken();
    if (!token) return;
    setError(null);
    try {
      await socialApi.disconnect(platform, token);
      await fetchStatuses();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not disconnect this platform.");
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
          <LinkIcon className="h-6 w-6" />
        </div>
        <h1 className="mt-4 font-sans text-2xl font-semibold text-neutral-900 dark:text-white">
          Connect &amp; Sync
        </h1>
        <p className="mt-2 max-w-md text-sm text-neutral-600 dark:text-neutral-400">
          Link your accounts to unlock AI-powered insights, growth tracking and one-click publishing.
        </p>
      </div>

      {error && (
        <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {loading
          ? PLATFORMS.map((p) => (
              <div
                key={p.key}
                className="glass h-44 animate-pulse rounded-3xl border border-neutral-200 dark:border-white/10"
              />
            ))
          : PLATFORMS.map((platform) => (
              <PlatformCard
                key={platform.key}
                platform={platform}
                status={statuses[platform.key]}
                isConnecting={connectingPlatform === platform.key}
                onConnect={() => handleConnect(platform.key)}
                onDisconnect={() => handleDisconnect(platform.key)}
              />
            ))}
      </div>

      <div className="mx-auto mt-6 flex max-w-xl items-start gap-2 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-300">
        <span className="mt-0.5">ℹ️</span>
        <span>Instagram and Facebook use the same Meta login. Connecting either one enables both.</span>
      </div>
    </div>
  );
}

function PlatformCard({
  platform,
  status,
  isConnecting,
  onConnect,
  onDisconnect,
}: {
  platform: PlatformConfig;
  status?: PlatformStatus;
  isConnecting: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}) {
  const Icon = platform.icon;
  const connected = !!status?.connected;
  const displayName = status?.username || status?.name;

  return (
    <div
      className={cn(
        "rounded-3xl border p-5 shadow-sm transition-colors",
        connected ? "bg-white dark:bg-white/[0.03]" : "border-neutral-200 bg-white dark:border-white/10 dark:bg-white/[0.02]"
      )}
      style={connected ? { borderColor: `${platform.color}66`, boxShadow: `0 0 0 1px ${platform.color}22` } : undefined}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {connected && status?.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={status.avatar} alt={platform.label} className="h-11 w-11 rounded-full object-cover" />
          ) : (
            <div
              className="flex h-11 w-11 items-center justify-center rounded-2xl"
              style={{ backgroundColor: `${platform.color}1F`, color: platform.color }}
            >
              <Icon className="h-5 w-5" />
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-neutral-900 dark:text-white">{platform.label}</p>
            {connected && displayName && (
              <p className="text-xs font-medium" style={{ color: platform.color }}>
                {displayName}
              </p>
            )}
          </div>
        </div>

        {connected && (
          <span className="flex items-center gap-1 rounded-full border border-emerald-500/50 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-3 w-3" />
            Connected
          </span>
        )}
      </div>

      <p className="mt-3 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">{platform.description}</p>

      {connected ? (
        <button
          onClick={onDisconnect}
          className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-full border border-red-200 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 dark:border-red-500/30 dark:text-red-400 dark:hover:bg-red-500/10"
        >
          <Unlink className="h-3.5 w-3.5" />
          Disconnect
        </button>
      ) : (
        <button
          onClick={onConnect}
          disabled={isConnecting || platform.disabled}
          className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ backgroundColor: platform.color }}
        >
          {isConnecting ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Waiting for confirmation...
            </>
          ) : platform.disabled ? (
            "Coming soon"
          ) : (
            <>
              <Icon className="h-3.5 w-3.5" />
              Connect {platform.label}
            </>
          )}
        </button>
      )}
    </div>
  );
}
