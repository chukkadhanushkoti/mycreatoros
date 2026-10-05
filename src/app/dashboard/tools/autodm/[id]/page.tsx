"use client";

import { use, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Ban, PenSquare, Play } from "lucide-react";

import { getAccessToken } from "@/context/auth-context";
import { ApiError } from "@/lib/api-client";
import { autoDmApi, type ActivityRecord, type Campaign } from "@/lib/autodm-api";
import { CAMPAIGN_STATUS_META, getActivityStatusMeta, translateAutoDmError } from "@/config/autodm";
import { CampaignSummary } from "@/components/dashboard/autodm/campaign-summary";
import { cn } from "@/lib/utils";

const FUNNEL_STEPS: { key: keyof NonNullable<Campaign["detailedStats"]>; label: string }[] = [
  { key: "matched", label: "Comments matched" },
  { key: "openingDms", label: "Opening DMs sent" },
  { key: "waiting", label: "Waiting for interaction" },
  { key: "primaryDms", label: "Primary DMs sent" },
];

export default function AutoDmCampaignDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [activity, setActivity] = useState<ActivityRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  const load = useCallback(async () => {
    const token = getAccessToken();
    if (!token) return;
    try {
      const [c, a] = await Promise.all([
        autoDmApi.getCampaign(token, id),
        autoDmApi.getActivity(token, { campaignId: id, limit: 20 }),
      ]);
      setCampaign(c);
      setActivity(a);
      setError(null);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't load this campaign.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const initial = setTimeout(() => { void load(); }, 0);
    const interval = setInterval(load, 15000);
    return () => { clearTimeout(initial); clearInterval(interval); };
  }, [load]);

  const toggleStatus = async () => {
    const token = getAccessToken();
    if (!token || !campaign) return;
    setUpdating(true);
    try {
      const updated = await autoDmApi.updateCampaign(token, id, {
        status: campaign.status === "active" ? "paused" : "active",
      });
      setCampaign(updated);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't update the campaign.");
    } finally {
      setUpdating(false);
    }
  };

  if (!loading && !campaign) {
    return <div role="alert" className="mx-auto max-w-3xl p-6"><p>{error || "Campaign not found."}</p><button onClick={() => void load()} className="mt-4 rounded-full bg-orange-500 px-5 py-2 text-white">Try again</button></div>;
  }

  if (loading || !campaign) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="skeleton h-8 w-40 rounded-lg" />
        <div className="skeleton mt-6 h-40 rounded-2xl" />
        <div className="skeleton mt-4 h-56 rounded-2xl" />
      </div>
    );
  }

  const meta = CAMPAIGN_STATUS_META[campaign.status];
  const stats = campaign.detailedStats;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/tools/autodm"
          className="flex items-center gap-1.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleStatus}
            disabled={updating}
            className="flex items-center gap-1.5 rounded-full border border-neutral-200 px-3.5 py-1.5 text-sm font-medium text-neutral-700 disabled:opacity-60 dark:border-white/10 dark:text-neutral-300"
          >
            {campaign.status === "active" ? (
              <>
                <Ban className="h-3.5 w-3.5" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5" />
                Activate
              </>
            )}
          </button>
          <Link
            href={`/dashboard/tools/autodm/${id}/edit`}
            className="flex items-center gap-1.5 rounded-full bg-orange-500 px-3.5 py-1.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <PenSquare className="h-3.5 w-3.5" />
            Edit
          </Link>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2.5">
        <h1 className="font-sans text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">
          {campaign.name}
        </h1>
        <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-bold uppercase", meta.className)}>
          {meta.label}
        </span>
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="mt-6">
        <CampaignSummary campaign={campaign} />
      </div>

      {/* Funnel */}
      {stats && (
        <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5 dark:border-white/10 dark:bg-neutral-900">
          <h2 className="text-sm font-semibold text-neutral-900 dark:text-white">Conversation funnel</h2>
          <div className="mt-4 flex flex-col">
            {FUNNEL_STEPS.map((step, i) => (
              <div key={step.key} className="relative flex items-center gap-3 pb-5 last:pb-0">
                {i < FUNNEL_STEPS.length - 1 && (
                  <span className="absolute left-[7px] top-4 h-full w-px bg-neutral-200 dark:bg-white/10" />
                )}
                <span className="z-10 h-4 w-4 shrink-0 rounded-full border-2 border-orange-500 bg-white dark:bg-neutral-900" />
                <div className="flex flex-1 items-center justify-between">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">{step.label}</span>
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                    {stats[step.key]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent activity */}
      <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5 dark:border-white/10 dark:bg-neutral-900">
        <h2 className="text-sm font-semibold text-neutral-900 dark:text-white">Recent activity</h2>
        {activity.length === 0 ? (
          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">No activity yet.</p>
        ) : (
          <div className="mt-4 flex flex-col gap-4">
            {activity.map((item) => {
              const sMeta = getActivityStatusMeta(item.status);
              const failMsg = translateAutoDmError(item.failReason || item.lastError);
              return (
                <div key={item._id} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${sMeta.color}1F`, color: sMeta.color }}
                  >
                    <sMeta.icon className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">
                      @{item.instagramUsername || "unknown"}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Status: {sMeta.label}</p>
                    {failMsg && <p className="mt-0.5 text-xs text-red-500">{failMsg}</p>}
                  </div>
                  <span className="shrink-0 text-xs text-neutral-400">
                    {new Date(item.updatedAt).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
