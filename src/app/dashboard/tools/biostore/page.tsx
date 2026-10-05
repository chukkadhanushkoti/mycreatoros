"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  Check,
  Copy,
  Eye,
  ExternalLink,
  Link2,
  MousePointerClick,
  Pencil,
  Settings,
  Sparkles,
  Users,
  X,
} from "lucide-react";

import { getAccessToken } from "@/context/auth-context";
import { ApiError } from "@/lib/api-client";
import { biostoreApi, type BioStoreDoc, type DeletedBioStoreInfo, type BioStoreAnalytics } from "@/lib/biostore-api";
import { StatCard } from "@/components/dashboard/biostore/stat-card";
import { BioStoreDashboardSkeleton } from "@/components/dashboard/biostore/skeleton";
import { cn } from "@/lib/utils";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mycreatoros.app";

export default function BioStorePage() {
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState<BioStoreDoc | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [deletedInfo, setDeletedInfo] = useState<DeletedBioStoreInfo | null>(null);

  const load = useCallback(async () => {
    const token = getAccessToken();
    if (!token) return;
    try {
      const doc = await biostoreApi.getMine(token);
      setStore(doc);
      setLoadError(null);
    } catch (err) {
      if (!(err instanceof ApiError) || ![404, 410].includes(err.status)) {
        setLoadError(err instanceof ApiError ? err.message : "Could not load your BioStore. Please try again.");
        return;
      }
      setLoadError(null);
      setStore(null);
      try {
        const info = await biostoreApi.getDeleted(token);
        setDeletedInfo(info.deleted ? info : null);
      } catch {
        setDeletedInfo(null);
      }
    }
  }, []);

  useEffect(() => {
    const initial = setTimeout(() => { void load().finally(() => setLoading(false)); }, 0);
    return () => clearTimeout(initial);
  }, [load]);

  if (loading) {
    return <BioStoreDashboardSkeleton />;
  }

  if (loadError) {
    return <div role="alert" className="mx-auto max-w-lg p-6"><p>{loadError}</p><button className="mt-4 rounded-full bg-orange-500 px-5 py-2 text-white" onClick={() => {setLoading(true); void load().finally(() => setLoading(false));}}>Try again</button></div>;
  }

  if (!store) {
    return <Onboarding deletedInfo={deletedInfo} onCreatedAction={load} onRestoredAction={load} />;
  }

  return <BioStoreDashboard store={store} onChangeAction={setStore} />;
}

function Onboarding({
  deletedInfo,
  onCreatedAction,
  onRestoredAction,
}: {
  deletedInfo: DeletedBioStoreInfo | null;
  onCreatedAction: () => void;
  onRestoredAction: () => void;
}) {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "available" | "unavailable">("idle");
  const [message, setMessage] = useState("");
  const [creating, setCreating] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkedUsername, setCheckedUsername] = useState("");
  const currentStatus = checkedUsername === username.trim().toLowerCase() ? status : "idle";
  useEffect(() => {
    const clean = username.trim().toLowerCase();
    if (!clean) return;
    let cancelled = false;
    const timer = setTimeout(async () => {
      setCheckedUsername(clean);
      setStatus("checking");
      try {
        const result = await biostoreApi.checkUsername(clean);
        if (cancelled) return;
        setStatus(result.available ? "available" : "unavailable");
        setMessage(result.message || "");
      } catch {
        if (!cancelled) {setStatus("unavailable"); setMessage("Could not check this username. Try again.");}
      }
    }, 500);
    return () => {cancelled = true; clearTimeout(timer);};
  }, [username]);

  const handleCreate = async () => {
    const token = getAccessToken();
    if (!token || currentStatus !== "available") return;
    setCreating(true);
    setError(null);
    try {
      await biostoreApi.create(token, { username: username.trim().toLowerCase(), displayName: "My Store" });
      onCreatedAction();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not create your BioStore.");
    } finally {
      setCreating(false);
    }
  };

  const handleRestore = async () => {
    const token = getAccessToken();
    if (!token) return;
    setRestoring(true);
    setError(null);
    try {
      await biostoreApi.restore(token);
      onRestoredAction();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not restore your BioStore.");
    } finally {
      setRestoring(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center pt-6 text-center sm:pt-12">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
        <Link2 className="h-6 w-6" />
      </div>
      <h1 className="mt-5 font-sans text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">
        Welcome to BioStore
      </h1>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        Build a single link-in-bio page for all your content, products and social links.
      </p>

      {deletedInfo?.deleted && (
        <div className="mt-6 w-full rounded-2xl border border-orange-200 bg-orange-50 p-4 text-left dark:border-orange-500/20 dark:bg-orange-500/10">
          <p className="text-sm font-medium text-orange-800 dark:text-orange-300">
            {deletedInfo.daysRemaining} day{deletedInfo.daysRemaining === 1 ? "" : "s"} left to restore
          </p>
          <p className="mt-1 text-xs text-orange-700 dark:text-orange-400">
            You have a deleted store, <strong>{deletedInfo.displayName}</strong> (mycreatoros.app/
            {deletedInfo.username}). Restore it before it&apos;s permanently erased — creating a new one below will
            replace it for good.
          </p>
          <button
            onClick={handleRestore}
            disabled={restoring}
            className="mt-3 w-full rounded-full bg-orange-500 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {restoring ? "Restoring..." : "Restore my BioStore"}
          </button>
        </div>
      )}

      <div className="mt-8 w-full text-left">
        <label className="mb-1.5 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
          Choose your username
        </label>
        <div className="flex items-center rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 dark:border-white/10 dark:bg-neutral-900">
          <span className="shrink-0 text-sm text-neutral-400">mycreatoros.app/</span>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))}
            placeholder="yourname"
            className="w-full bg-transparent text-sm text-neutral-900 outline-none dark:text-white"
          />
          {currentStatus === "available" && <Check className="h-4 w-4 shrink-0 text-emerald-500" />}
          {currentStatus === "unavailable" && <X className="h-4 w-4 shrink-0 text-red-500" />}
        </div>
        {currentStatus === "unavailable" && <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">{message}</p>}
        {error && <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">{error}</p>}
      </div>

      <button
        onClick={handleCreate}
        disabled={currentStatus !== "available" || creating}
        className="mt-5 w-full rounded-full bg-orange-500 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {creating ? "Creating..." : "Create BioStore"}
      </button>
    </div>
  );
}

function BioStoreDashboard({
  store,
  onChangeAction,
}: {
  store: BioStoreDoc;
  onChangeAction: (store: BioStoreDoc) => void;
}) {
  const [copied, setCopied] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [overview,setOverview]=useState<BioStoreAnalytics["summary"]|null>(null);
  const [error,setError]=useState("");
  useEffect(()=>{let mounted=true;const token=getAccessToken();if(token)biostoreApi.getAnalytics(token,28).then(data=>{if(mounted)setOverview(data.summary);}).catch(()=>{if(mounted)setError("Unable to load the 28-day overview.");});return()=>{mounted=false;};},[store.username]);

  const publicUrl = `${SITE_URL.replace(/\/$/, "")}/${store.username}`;
  const isLive = store.status === "published";

  const handleCopy = async () => {
    try{await navigator.clipboard.writeText(publicUrl);setCopied(true);setTimeout(() => setCopied(false), 1800);}catch{setError("Could not copy the link. Please try again.");}
  };

  const togglePublish = async () => {
    const token = getAccessToken();
    if (!token) return;
    setPublishing(true);
    try {
      const updated = await biostoreApi.update(token, { status: isLive ? "unpublished" : "published" });
      onChangeAction(updated);
    } catch (err) {
      setError(err instanceof ApiError?err.message:"Could not change publication status.");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div
        className="relative overflow-hidden rounded-3xl p-6 sm:p-8"
        style={{ backgroundImage: "linear-gradient(135deg, #213B45 0%, #365760 100%)" }}
      >
        <div className="flex items-center justify-between">
          <span
            className={cn(
              "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide",
              isLive ? "bg-emerald-400/20 text-emerald-200" : "bg-amber-400/20 text-amber-200"
            )}
          >
            <span className={cn("h-1.5 w-1.5 rounded-full", isLive ? "bg-emerald-300" : "bg-amber-300")} />
            {isLive ? "Live" : "Draft"}
          </span>
          <Sparkles className="h-5 w-5 text-white/40" />
        </div>

        <p className="mt-5 text-xs font-medium uppercase tracking-wide text-white/60">Your BioStore URL</p>
        <p className="mt-1 truncate text-lg font-semibold text-white sm:text-xl">
          mycreatoros.app/{store.username}
        </p>

        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
          <button
            onClick={handleCopy}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white py-2.5 text-sm font-semibold text-neutral-900 transition-opacity hover:opacity-90"
          >
            <Copy className="h-3.5 w-3.5" />
            {copied ? "Copied!" : "Copy link"}
          </button>
          <a
            href={publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/40 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Open
          </a>
        </div>
      </div>

      {error&&<p role="alert" className="mt-4 text-sm text-rose-500">{error}</p>}
      <h2 className="mt-6 text-sm font-semibold">Overview · last 28 days</h2>
      <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard icon={Eye} label="Views" value={overview?.views??"—"} color="#3B82F6" />
        <StatCard icon={MousePointerClick} label="Clicks" value={overview?.clicks??"—"} color="#8B5CF6" />
        <StatCard icon={BarChart3} label="CTR" value={overview?`${overview.ctr}%`:"—"} color="#F97316" />
        <StatCard icon={Users} label="Visitors" value={overview?.uniqueVisitors??"—"} color="#14B8A6" />
      </div>

      <p className="mt-8 text-xs font-semibold uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
        Quick actions
      </p>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <QuickAction href="/dashboard/tools/biostore/editor" icon={Pencil} label="Edit" color="#6366F1" />
        <QuickAction href="/dashboard/tools/biostore/analytics" icon={BarChart3} label="Analytics" color="#3B82F6" />
        <QuickActionButton
          icon={Sparkles}
          label={isLive ? "Unpublish" : "Publish"}
          color={isLive ? "#F59E0B" : "#10B981"}
          onClick={togglePublish}
          disabled={publishing}
        />
        <QuickAction href="/dashboard/tools/biostore/settings" icon={Settings} label="Settings" color="#71717A" />
      </div>

    </div>
  );
}

function QuickAction({
  href,
  icon: Icon,
  label,
  color,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  color: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-2 rounded-2xl border border-neutral-200 p-4 text-center transition-colors hover:border-neutral-300 dark:border-white/10 dark:hover:border-white/20"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: `${color}1F`, color }}>
        <Icon className="h-4 w-4" />
      </div>
      <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">{label}</span>
    </Link>
  );
}

function QuickActionButton({
  icon: Icon,
  label,
  color,
  onClick,
  disabled,
}: {
  icon: React.ElementType;
  label: string;
  color: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex flex-col items-center gap-2 rounded-2xl border border-neutral-200 p-4 text-center transition-colors hover:border-neutral-300 disabled:opacity-60 dark:border-white/10 dark:hover:border-white/20"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: `${color}1F`, color }}>
        <Icon className="h-4 w-4" />
      </div>
      <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">{label}</span>
    </button>
  );
}
