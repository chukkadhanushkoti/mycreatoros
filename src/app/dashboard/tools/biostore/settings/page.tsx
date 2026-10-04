"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AlertTriangle, ArrowLeft } from "lucide-react";

import { getAccessToken } from "@/context/auth-context";
import { changeUsername } from "@/lib/access-api";
import { ApiError } from "@/lib/api-client";
import { biostoreApi, type BioStoreDoc } from "@/lib/biostore-api";
import { BioStoreSettingsSkeleton } from "@/components/dashboard/biostore/skeleton";

const inputClass =
  "w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 outline-none transition-colors focus:border-orange-400 dark:border-white/10 dark:bg-neutral-800 dark:text-white";
const labelClass = "mb-1.5 block text-xs font-medium text-neutral-600 dark:text-neutral-400";

interface SeoDesign {
  seo?: { metaTitle?: string; metaDescription?: string };
}

export default function BioStoreSettingsPage() {
  const router = useRouter();
  const [store, setStore] = useState<BioStoreDoc | null>(null);
  const [username,setUsername]=useState("");
  const [changingUsername,setChangingUsername]=useState(false);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;
    biostoreApi
      .getMine(token)
      .then((doc) => {
        setStore(doc);setUsername(doc?.username||"");
        const seo = (doc.design as SeoDesign | undefined)?.seo;
        setMetaTitle(seo?.metaTitle || "");
        setMetaDescription(seo?.metaDescription || "");
      })
      .catch(() => setLoadError(true));
  }, []);

  const handleSaveSeo = async () => {
    const token = getAccessToken();
    if (!token || !store) return;
    setSaving(true);
    setError(null);
    try {
      const updated = await biostoreApi.update(token, {
        design: { ...(store.design || {}), seo: { metaTitle, metaDescription } },
      });
      setStore(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't save — check your connection.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const token = getAccessToken();
    if (!token) return;
    setDeleting(true);
    setError(null);
    try {
      await biostoreApi.remove(token);
      router.replace("/dashboard/tools/biostore");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't delete — check your connection.");
      setConfirmingDelete(false);
    } finally {
      setDeleting(false);
    }
  };

  if (loadError) {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">Couldn&apos;t load settings.</p>
      </div>
    );
  }

  if (!store) {
    return <BioStoreSettingsSkeleton />;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/dashboard/tools/biostore"
        className="flex items-center gap-1.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      <h1 className="mt-4 font-sans text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">
        BioStore Settings
      </h1>

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5 dark:border-white/10 dark:bg-neutral-900">
        <h2 className="text-sm font-semibold text-neutral-900 dark:text-white">Account</h2>
        <div className="mt-3">
          <label className={labelClass}>Username</label>
          <input value={username} onChange={e=>setUsername(e.target.value.toLowerCase())} maxLength={30} className={inputClass} />
          <p className="mt-2 text-xs text-neutral-500">Change once every 15 days. Your previous link stops working.</p>
          <button type="button" disabled={changingUsername||username===store.username} className="mt-3 rounded-xl border px-4 py-2 text-sm disabled:opacity-50" onClick={async()=>{const token=getAccessToken();if(!token)return;setChangingUsername(true);setError(null);try{const updated=await changeUsername(token,username.trim());setStore(updated);setUsername(updated.username);}catch(e){setError(e instanceof Error?e.message:"Unable to change username.");}finally{setChangingUsername(false);}}}>{changingUsername?"Updating…":"Update username"}</button>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5 dark:border-white/10 dark:bg-neutral-900">
        <h2 className="text-sm font-semibold text-neutral-900 dark:text-white">SEO settings</h2>
        <div className="mt-3 flex flex-col gap-3.5">
          <div>
            <label className={labelClass}>Meta title</label>
            <input
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className={inputClass}
              placeholder={store.displayName || store.username}
            />
          </div>
          <div>
            <label className={labelClass}>Meta description</label>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              rows={3}
              className={inputClass}
              placeholder="A short description shown in search results and link previews."
            />
          </div>
        </div>
        <button
          onClick={handleSaveSeo}
          disabled={saving}
          className="mt-4 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {saving ? "Saving..." : saved ? "Saved" : "Save settings"}
        </button>
      </div>

      <div className="mt-6 rounded-2xl border border-red-200 bg-red-50/50 p-5 dark:border-red-500/20 dark:bg-red-500/5">
        <h2 className="text-sm font-semibold text-red-700 dark:text-red-400">Danger zone</h2>
        <p className="mt-2 text-xs text-red-700/80 dark:text-red-400/80">
          Deleting your BioStore hides it immediately. You&apos;ll have 15 days to restore it before it&apos;s
          permanently erased.
        </p>
        <button
          onClick={() => setConfirmingDelete(true)}
          className="mt-4 rounded-full border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100 dark:border-red-500/30 dark:text-red-400 dark:hover:bg-red-500/10"
        >
          Delete BioStore
        </button>
      </div>

      {confirmingDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-5 dark:bg-neutral-900">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h3 className="mt-3 text-base font-semibold text-neutral-900 dark:text-white">Delete BioStore?</h3>
            <p className="mt-1.5 text-sm text-neutral-600 dark:text-neutral-400">
              Your page will be hidden immediately and become inaccessible to visitors.
            </p>
            <div className="mt-3 rounded-xl bg-blue-50 p-3 text-xs text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
              You can restore it from onboarding within 15 days. After that, it&apos;s permanently deleted.
            </div>
            <div className="mt-5 flex gap-3">
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-full border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60 dark:border-red-500/30 dark:text-red-400 dark:hover:bg-red-500/10"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
              <button
                onClick={() => setConfirmingDelete(false)}
                className="ml-auto rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-neutral-900"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
