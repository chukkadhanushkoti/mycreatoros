"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BarChart3, Eye, MousePointerClick, Users } from "lucide-react";

import { getAccessToken } from "@/context/auth-context";
import { biostoreApi, type BioStoreAnalytics } from "@/lib/biostore-api";
import { StatCard } from "@/components/dashboard/biostore/stat-card";
import { BioStoreAnalyticsSkeleton } from "@/components/dashboard/biostore/skeleton";

export default function BioStoreAnalyticsPage() {
  const [data, setData] = useState<BioStoreAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;
    biostoreApi
      .getAnalytics(token)
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <BioStoreAnalyticsSkeleton />;
  }

  if (error || !data) {
    return (
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">Couldn&apos;t load analytics.</p>
      </div>
    );
  }

  const maxDaily = Math.max(1, ...data.chart.views, ...data.chart.clicks);
  const topClicks = Math.max(1, ...data.blocks.map((b) => b.clicks));

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/dashboard/tools/biostore"
        className="flex items-center gap-1.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      <h1 className="mt-4 font-sans text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">
        Analytics
      </h1>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard icon={Eye} label="Total views" value={data.summary.views} color="#3B82F6" />
        <StatCard icon={MousePointerClick} label="Link clicks" value={data.summary.clicks} color="#8B5CF6" />
        <StatCard icon={BarChart3} label="CTR" value={`${data.summary.ctr}%`} color="#F97316" />
        <StatCard icon={Users} label="Unique visitors" value={data.summary.uniqueVisitors} color="#14B8A6" />
      </div>

      <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-5 dark:border-white/10 dark:bg-neutral-900">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-neutral-900 dark:text-white">Last 7 days</h2>
          <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-500" /> Views
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-purple-500" /> Clicks
            </span>
          </div>
        </div>
        <div className="mt-5 flex h-40 items-end justify-between gap-2">
          {data.chart.labels.map((label, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="flex h-32 w-full items-end justify-center gap-1">
                <div
                  className="w-2.5 rounded-t-sm bg-blue-500"
                  style={{ height: `${(data.chart.views[i] / maxDaily) * 100}%` }}
                />
                <div
                  className="w-2.5 rounded-t-sm bg-purple-500"
                  style={{ height: `${(data.chart.clicks[i] / maxDaily) * 100}%` }}
                />
              </div>
              <span className="text-[11px] text-neutral-400">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5 dark:border-white/10 dark:bg-neutral-900">
        <h2 className="text-sm font-semibold text-neutral-900 dark:text-white">Top links by clicks</h2>
        {data.blocks.length === 0 ? (
          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
            No click data yet. Share your BioStore link to start tracking!
          </p>
        ) : (
          <div className="mt-4 flex flex-col gap-4">
            {data.blocks.map((block, i) => (
              <div key={block._id}>
                <div className="flex items-center justify-between text-sm">
                  <span className="truncate font-medium text-neutral-800 dark:text-neutral-200">{block.title}</span>
                  <span className="shrink-0 text-neutral-500 dark:text-neutral-400">{block.clicks} clicks</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-white/10">
                  <div
                    className={["bg-blue-500", "bg-purple-500", "bg-teal-500"][i % 3]}
                    style={{ width: `${(block.clicks / topClicks) * 100}%`, height: "100%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
