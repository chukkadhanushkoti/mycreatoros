"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Ban,
  Copy,
  Link2,
  MessageCircle,
  MessagesSquare,
  MoreVertical,
  PenSquare,
  Play,
  Plus,
  Reply,
  Sparkles,
  Target,
  Trash2,
} from "lucide-react";

import { getAccessToken } from "@/context/auth-context";
import { usePlatforms } from "@/context/platforms-context";
import { ApiError } from "@/lib/api-client";
import { autoDmApi, type Campaign, type CampaignStatus, type DashboardOverview } from "@/lib/autodm-api";
import { CAMPAIGN_STATUS_META } from "@/config/autodm";
import { AutoDmStatCard } from "@/components/dashboard/autodm/stat-card";
import { cn } from "@/lib/utils";

const FILTERS: { key: CampaignStatus | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "draft", label: "Draft" },
  { key: "paused", label: "Paused" },
];

export default function AutoDmDashboardPage() {
  const { statuses, isLoading: platformsLoading } = usePlatforms();
  const igStatus = statuses.instagram;
  const connected = !!igStatus?.connected;

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [timeframe, setTimeframe] = useState<"today" | "all_time">("today");
  const [filter, setFilter] = useState<CampaignStatus | "all">("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const load = useCallback(async () => {
    const token = getAccessToken();
    if (!token || !connected) return;
    try {
      const [campaignList, overviewData] = await Promise.all([
        autoDmApi.getCampaigns(token),
        autoDmApi.getDashboardOverview(token, timeframe),
      ]);
      setCampaigns(campaignList);
      setOverview(overviewData);
      setError(null);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't load AutoDM data.");
    } finally {
      setLoading(false);
    }
  }, [connected, timeframe]);

  useEffect(() => {
    if (platformsLoading) return;
    if (!connected) {
      setLoading(false);
      return;
    }
    load();
  }, [platformsLoading, connected, load]);

  const handleAction = async (id: string, action: "pause" | "resume" | "duplicate" | "delete") => {
    const token = getAccessToken();
    if (!token) return;
    setOpenMenu(null);
    try {
      if (action === "pause") await autoDmApi.updateCampaign(token, id, { status: "paused" });
      if (action === "resume") await autoDmApi.updateCampaign(token, id, { status: "active" });
      if (action === "duplicate") await autoDmApi.duplicateCampaign(token, id);
      if (action === "delete") await autoDmApi.deleteCampaign(token, id);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't update the campaign.");
    }
  };

  const filtered = filter === "all" ? campaigns : campaigns.filter((c) => c.status === filter);

  if (platformsLoading || (loading && connected)) {
    return (
      <div className="mx-auto max-w-5xl">
        <div className="skeleton h-8 w-40 rounded-lg" />
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton h-24 rounded-2xl" />
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="skeleton h-28 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!connected) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center pt-6 text-center sm:pt-12">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
          <MessagesSquare className="h-6 w-6" />
        </div>
        <h1 className="mt-5 font-sans text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">
          Auto DM
        </h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Automatically DM anyone who comments a keyword on your Instagram posts. Connect Instagram to get started.
        </p>
        <Link
          href="/dashboard/connections"
          className="mt-6 flex items-center gap-1.5 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          <Link2 className="h-3.5 w-3.5" />
          Connect Instagram
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-sans text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">
            Auto DM
          </h1>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />@{igStatus?.username || igStatus?.name}
          </p>
        </div>
        <Link
          href="/dashboard/tools/autodm/new"
          className="flex items-center gap-1.5 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          New Campaign
        </Link>
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Overview */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Overview</p>
        <div className="flex rounded-full border border-neutral-200 p-0.5 dark:border-white/10">
          {(["today", "all_time"] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                timeframe === tf ? "bg-orange-500 text-white" : "text-neutral-600 dark:text-neutral-400"
              )}
            >
              {tf === "today" ? "Today" : "All time"}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <AutoDmStatCard
          icon={MessagesSquare}
          label="Conversations"
          value={overview?.conversationsStarted ?? 0}
          color="#3B82F6"
        />
        <AutoDmStatCard icon={Sparkles} label="Primary DMs" value={overview?.primaryDmsSent ?? 0} color="#10B981" />
        <AutoDmStatCard icon={Reply} label="Public replies" value={overview?.publicRepliesSent ?? 0} color="#F97316" />
        <AutoDmStatCard
          icon={Target}
          label="Success rate"
          value={`${overview?.successRate ?? 0}%`}
          color="#8B5CF6"
        />
      </div>

      {/* Filters */}
      <div className="mt-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
              filter === f.key
                ? "bg-orange-500 text-white"
                : "border border-neutral-200 text-neutral-600 hover:border-orange-300 dark:border-white/10 dark:text-neutral-400"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Campaign list */}
      <div className="mt-4 flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-neutral-300 bg-white px-6 py-16 text-center dark:border-white/15 dark:bg-neutral-900">
            <MessageCircle className="h-8 w-8 text-neutral-300" />
            <p className="mt-3 text-sm font-medium text-neutral-700 dark:text-neutral-300">No campaigns found</p>
            <p className="mt-1 text-xs text-neutral-400">Tap New Campaign to create your first automation.</p>
          </div>
        ) : (
          filtered.map((c) => {
            const meta = CAMPAIGN_STATUS_META[c.status];
            const stats = c.detailedStats;
            return (
              <div
                key={c._id}
                className="relative rounded-2xl border border-neutral-200 bg-white p-4 dark:border-white/10 dark:bg-neutral-900"
              >
                <div className="flex items-start gap-3">
                  <Link href={`/dashboard/tools/autodm/${c._id}`} className="flex flex-1 items-start gap-3 min-w-0">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-neutral-100 dark:bg-white/5">
                      {c.trigger.mediaUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={c.trigger.mediaUrl} alt={c.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-neutral-300">
                          <MessageCircle className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-semibold text-neutral-900 dark:text-white">{c.name}</p>
                        <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase", meta.className)}>
                          {meta.label}
                        </span>
                      </div>
                      <p className="mt-0.5 truncate text-xs text-neutral-500 dark:text-neutral-400">
                        {c.trigger.mediaCaption || `Trigger: ${c.trigger.type.replace("_", " ")}`}
                      </p>
                    </div>
                  </Link>

                  <div className="relative">
                    <button
                      onClick={() => setOpenMenu(openMenu === c._id ? null : c._id)}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/5"
                      aria-label="Campaign actions"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                    {openMenu === c._id && (
                      <div
                        className="absolute right-0 z-10 mt-1 w-44 overflow-hidden rounded-xl border border-neutral-200 bg-white py-1 shadow-lg dark:border-white/10 dark:bg-neutral-800"
                        onMouseLeave={() => setOpenMenu(null)}
                      >
                        <Link
                          href={`/dashboard/tools/autodm/${c._id}/edit`}
                          className="flex items-center gap-2 px-3.5 py-2 text-sm text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-white/5"
                        >
                          <PenSquare className="h-3.5 w-3.5" />
                          Edit
                        </Link>
                        {c.status === "active" ? (
                          <button
                            onClick={() => handleAction(c._id, "pause")}
                            className="flex w-full items-center gap-2 px-3.5 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-white/5"
                          >
                            <Ban className="h-3.5 w-3.5" />
                            Pause
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAction(c._id, "resume")}
                            className="flex w-full items-center gap-2 px-3.5 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-white/5"
                          >
                            <Play className="h-3.5 w-3.5" />
                            Activate
                          </button>
                        )}
                        <button
                          onClick={() => handleAction(c._id, "duplicate")}
                          className="flex w-full items-center gap-2 px-3.5 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-white/5"
                        >
                          <Copy className="h-3.5 w-3.5" />
                          Duplicate
                        </button>
                        <button
                          onClick={() => handleAction(c._id, "delete")}
                          className="flex w-full items-center gap-2 px-3.5 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {stats && (
                  <div className="mt-3 grid grid-cols-3 gap-2 border-t border-neutral-100 pt-3 dark:border-white/5">
                    <div>
                      <p className="text-sm font-semibold text-neutral-900 dark:text-white">{stats.matched}</p>
                      <p className="text-[11px] text-neutral-400">Matched</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900 dark:text-white">{stats.primaryDms}</p>
                      <p className="text-[11px] text-neutral-400">DMs sent</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900 dark:text-white">{stats.conversionRate}%</p>
                      <p className="text-[11px] text-neutral-400">Conv. rate</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
