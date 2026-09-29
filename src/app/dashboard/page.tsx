"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Eye, Heart, Link2, Users, Clock } from "lucide-react";

import { getAccessToken } from "@/context/auth-context";
import { usePlatforms } from "@/context/platforms-context";
import { PLATFORM_META, PLATFORM_ORDER } from "@/config/platforms";
import { analyticsApi, type AnalyticsOverview } from "@/lib/analytics-api";
import { cn } from "@/lib/utils";

export default function DashboardOverviewPage() {
  const { statuses, isLoading, hasAnyConnected } = usePlatforms();
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    if (isLoading || !hasAnyConnected) {
      setStatsLoading(false);
      return;
    }
    const token = getAccessToken();
    if (!token) return;
    analyticsApi
      .getOverview(token)
      .then(setOverview)
      .catch(() => setOverview(null))
      .finally(() => setStatsLoading(false));
  }, [isLoading, hasAnyConnected]);

  const stats = overview
    ? [
        { label: "Total views", value: overview.totalViews, change: overview.growth, icon: Eye },
        { label: "Subscribers / followers", value: overview.totalSubscribers, change: overview.growthSubs, icon: Users },
        { label: "Total likes", value: overview.totalLikes, change: overview.growthLikes, icon: Heart },
        { label: "Watch time", value: overview.totalWatchTime, change: overview.growthWatch, icon: Clock },
      ]
    : [];

  return (
    <div className="mx-auto max-w-6xl">
      <div>
        <h1 className="font-sans text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl dark:text-white">
          Overview
        </h1>
        <p className="mt-1.5 text-sm text-neutral-600 dark:text-neutral-400">
          All connected platforms in one place — latest posts, comments and updates.
        </p>
      </div>

      {!isLoading && !hasAnyConnected && (
        <div className="mt-8 flex flex-col items-start gap-4 rounded-3xl border border-neutral-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:bg-neutral-900">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
              <Link2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-900 dark:text-white">Connect your accounts</p>
              <p className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">
                Link YouTube, Instagram, Facebook or LinkedIn to see analytics and publish from CreatorOS.
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/connections"
            className="flex h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-orange-500 px-4 text-sm font-medium text-white transition-colors hover:bg-orange-600"
          >
            Connect accounts
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}

      {/* Quick stats — real cross-platform analytics */}
      {hasAnyConnected && (
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {statsLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="skeleton h-24 rounded-3xl" />
              ))
            : stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-neutral-900"
                >
                  <div className="flex items-center gap-1.5 text-neutral-400">
                    <stat.icon className="h-3.5 w-3.5" />
                    <p className="text-xs font-medium">{stat.label}</p>
                  </div>
                  <div className="mt-2 flex items-baseline justify-between">
                    <span className="font-sans text-2xl font-semibold text-neutral-900 dark:text-white">
                      {stat.value}
                    </span>
                    <span
                      className={cn(
                        "text-xs font-medium",
                        stat.change?.startsWith("-") ? "text-red-500" : "text-emerald-600 dark:text-emerald-400"
                      )}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
        </div>
      )}

      {/* Connected platforms */}
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-sans text-lg font-semibold text-neutral-900 dark:text-white">
            Connected platforms
          </h2>
          <Link
            href="/dashboard/connections"
            className="flex items-center gap-1 text-sm font-medium text-orange-600 hover:underline dark:text-orange-400"
          >
            Manage
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {PLATFORM_ORDER.filter((key) => statuses[key]?.connected).map((key) => {
            const meta = PLATFORM_META[key];
            const status = statuses[key];
            return (
              <div
                key={key}
                className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-neutral-900"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 shrink-0">
                    {status?.avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={status.avatar} alt={meta.label} className="h-10 w-10 rounded-full object-cover" />
                    ) : (
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${meta.color}1F`, color: meta.color }}
                      >
                        <meta.icon className="h-5 w-5" />
                      </div>
                    )}
                    {status?.avatar && (
                      <span
                        className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-background bg-white dark:border-neutral-900"
                        style={{ color: meta.color }}
                      >
                        <meta.icon className="h-2.5 w-2.5" />
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">{meta.label}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {status?.username || status?.name || "Connected"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent content — pulled from analytics overview */}
      {!statsLoading && overview && overview.topContent.length > 0 && (
        <div className="mt-10">
          <h2 className="font-sans text-lg font-semibold text-neutral-900 dark:text-white">Recent content</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {overview.topContent.slice(0, 6).map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-white/10 dark:bg-neutral-900"
              >
                {item.thumbnail && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.thumbnail} alt={item.title} className="aspect-video w-full object-cover" />
                )}
                <div className="p-3">
                  <p className="truncate text-sm font-medium text-neutral-900 dark:text-white">{item.title}</p>
                  <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                    {item.platform} · {item.views} views
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
