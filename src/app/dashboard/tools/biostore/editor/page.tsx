"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Camera, ChevronDown, ChevronUp, Eye, Image as ImageIcon, Plus, Search, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { getAccessToken } from "@/context/auth-context";
import { ApiError } from "@/lib/api-client";
import {
  biostoreApi,
  type BioStoreBlock,
  type BioStoreBlockType,
  type BioStoreDoc,
} from "@/lib/biostore-api";
import { bioStoreThemes } from "@/config/biostore-themes";
import { buildGoogleFontsHref, themeFontFamilies } from "@/lib/biostore-fonts";
import { BLOCK_TYPE_MAP } from "@/config/biostore-blocks";
import { PhoneFrame } from "@/components/dashboard/biostore/phone-frame";
import { StorePreview } from "@/components/dashboard/biostore/store-preview";
import { ThemeStrip } from "@/components/dashboard/biostore/theme-strip";
import { ThemePicker } from "@/components/dashboard/biostore/theme-picker";
import { AddBlockSheet } from "@/components/dashboard/biostore/add-block-sheet";
import { BlockEditSheet } from "@/components/dashboard/biostore/block-edit-sheet";
import { BioStoreEditorSkeleton } from "@/components/dashboard/biostore/skeleton";
import { cn } from "@/lib/utils";

const MAX_BLOCKS_FREE = 10;

export default function BioStoreEditorPage() {
  const [store, setStore] = useState<BioStoreDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [themeOpen, setThemeOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editingBlock, setEditingBlock] = useState<BioStoreBlock | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingBg, setUploadingBg] = useState(false);
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const bgFileRef = useRef<HTMLInputElement>(null);
  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;
    biostoreApi
      .getMine(token)
      .then(setStore)
      .finally(() => setLoading(false));
  }, []);

  const theme = useMemo(
    () => bioStoreThemes.find((t) => t.id === store?.theme) || bioStoreThemes[0],
    [store?.theme]
  );

  // Load the selected theme's fonts so the live preview renders real typography
  // (React 19 hoists this <link> into <head> and dedupes it).
  const fontsHref = useMemo(() => buildGoogleFontsHref(themeFontFamilies(theme)), [theme]);

  const scheduleAutosave = useCallback((next: BioStoreDoc) => {
    setStore(next);
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    autosaveTimer.current = setTimeout(async () => {
      const token = getAccessToken();
      if (!token) return;
      setSaving(true);
      try {
        await biostoreApi.autosave(token, {
          displayName: next.displayName,
          bio: next.bio,
          profileImage: next.profileImage,
          backgroundImage: next.backgroundImage,
          theme: next.theme,
          blocks: next.blocks,
          settings: next.settings,
        });
        setSaveError(null);
      } catch (err) {
        setSaveError(err instanceof ApiError ? err.message : "Couldn't save — check your connection.");
      } finally {
        setSaving(false);
      }
    }, 1200);
  }, []);

  const handlePublish = async () => {
    const token = getAccessToken();
    if (!token || !store) return;
    setSaving(true);
    try {
      const updated = await biostoreApi.update(token, {
        displayName: store.displayName,
        bio: store.bio,
        profileImage: store.profileImage,
        backgroundImage: store.backgroundImage,
        theme: store.theme,
        blocks: store.blocks,
        settings: store.settings,
        status: "published",
      });
      setStore(updated);
      setSaveError(null);
    } catch (err) {
      setSaveError(err instanceof ApiError ? err.message : "Couldn't publish — check your connection.");
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarPick = async (file: File) => {
    const token = getAccessToken();
    if (!token || !store) return;
    setUploadingAvatar(true);
    try {
      const url = await biostoreApi.uploadFile(token, file, "profile");
      scheduleAutosave({ ...store, profileImage: url });
    } catch (err) {
      setSaveError(err instanceof ApiError ? err.message : "Couldn't upload photo — check your connection.");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleBackgroundPick = async (file: File) => {
    const token = getAccessToken();
    if (!token || !store) return;
    setUploadingBg(true);
    try {
      // Reuse the existing 'banner' presign path; the URL is stored in the
      // new backgroundImage field and rendered full-page on web + app.
      const url = await biostoreApi.uploadFile(token, file, "banner");
      scheduleAutosave({ ...store, backgroundImage: url });
    } catch (err) {
      setSaveError(err instanceof ApiError ? err.message : "Couldn't upload background — check your connection.");
    } finally {
      setUploadingBg(false);
    }
  };

  const removeBackground = () => {
    if (!store) return;
    scheduleAutosave({ ...store, backgroundImage: "" });
  };

  const toggleSearch = () => {
    if (!store) return;
    scheduleAutosave({
      ...store,
      settings: { ...store.settings, showSearch: !store.settings?.showSearch },
    });
  };

  const addBlock = (type: BioStoreBlockType) => {
    if (!store) return;
    setAddOpen(false);
    const meta = BLOCK_TYPE_MAP[type];
    const newBlock: BioStoreBlock = {
      type,
      content: { ...meta.defaultContent },
      order: store.blocks.length,
      isVisible: true,
    };
    scheduleAutosave({ ...store, blocks: [...store.blocks, newBlock] });
  };

  const removeBlock = (index: number) => {
    if (!store) return;
    const blocks = store.blocks.filter((_, i) => i !== index).map((b, i) => ({ ...b, order: i }));
    scheduleAutosave({ ...store, blocks });
  };

  const moveBlock = (index: number, dir: -1 | 1) => {
    if (!store) return;
    const target = index + dir;
    if (target < 0 || target >= store.blocks.length) return;
    const blocks = [...store.blocks];
    [blocks[index], blocks[target]] = [blocks[target], blocks[index]];
    blocks.forEach((b, i) => (b.order = i));
    scheduleAutosave({ ...store, blocks });
  };

  const saveBlockContent = (content: Record<string, unknown>) => {
    if (!store || !editingBlock) return;
    const blocks = store.blocks.map((b) => (b === editingBlock ? { ...b, content } : b));
    scheduleAutosave({ ...store, blocks });
    setEditingBlock(null);
  };

  const maxBlocks = store?.isPremium ? 40 : MAX_BLOCKS_FREE;
  const sortedBlocks = store?.blocks.slice().sort((a, b) => a.order - b.order) || [];

  if (loading || !store) {
    return <BioStoreEditorSkeleton />;
  }

  return (
    <div className="mx-auto max-w-6xl pb-20">
      {fontsHref && <link rel="stylesheet" href={fontsHref} />}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/tools/biostore"
          className="flex items-center gap-1.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        <div className="flex items-center gap-3">
          {saveError ? (
            <span className="text-xs text-red-500">{saveError}</span>
          ) : (
            saving && <span className="text-xs text-neutral-400">Saving...</span>
          )}
          <button
            onClick={() => setMobilePreviewOpen(true)}
            className="flex items-center gap-1.5 rounded-full border border-neutral-200 px-3.5 py-1.5 text-sm font-medium text-neutral-700 lg:hidden dark:border-white/10 dark:text-neutral-300"
          >
            <Eye className="h-3.5 w-3.5" />
            Preview
          </button>
          <button
            onClick={handlePublish}
            className="rounded-full bg-orange-500 px-4 py-1.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Publish
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
        {/* Left: editing panel */}
        <div className="flex min-w-0 flex-col gap-6">
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-white/10 dark:bg-neutral-900">
            <h2 className="text-sm font-semibold text-neutral-900 dark:text-white">Profile</h2>
            <div className="mt-4 flex items-center gap-4">
              <div className="relative shrink-0">
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-neutral-100 dark:bg-white/5">
                  {store.profileImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={store.profileImage} alt={store.displayName} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-lg font-semibold text-neutral-500 dark:text-neutral-400">
                      {(store.displayName || store.username).charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => fileRef.current?.click()}
                  disabled={uploadingAvatar}
                  className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-white shadow-md"
                  aria-label="Change photo"
                >
                  <Camera className="h-3 w-3" />
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleAvatarPick(file);
                  }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <input
                  value={store.displayName || ""}
                  onChange={(e) => scheduleAutosave({ ...store, displayName: e.target.value })}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-900 outline-none focus:border-orange-400 dark:border-white/10 dark:bg-neutral-800 dark:text-white"
                />
              </div>
            </div>
            <textarea
              value={store.bio || ""}
              onChange={(e) => scheduleAutosave({ ...store, bio: e.target.value })}
              placeholder="Add a short bio"
              rows={2}
              className="mt-3 w-full resize-none rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 outline-none focus:border-orange-400 dark:border-white/10 dark:bg-neutral-800 dark:text-neutral-300"
            />
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-white/10 dark:bg-neutral-900">
            <h2 className="text-sm font-semibold text-neutral-900 dark:text-white">Theme</h2>
            <div className="mt-4">
              <ThemeStrip
                currentTheme={store.theme}
                onSelectAction={(id) => scheduleAutosave({ ...store, theme: id })}
                onSeeAllAction={() => setThemeOpen(true)}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-white/10 dark:bg-neutral-900">
            <h2 className="text-sm font-semibold text-neutral-900 dark:text-white">Background</h2>
            <p className="mt-1 text-xs text-neutral-400">
              Add a full-page image behind your page. A legibility overlay keeps text readable.
            </p>
            <div className="mt-4">
              {store.backgroundImage ? (
                <div className="relative overflow-hidden rounded-xl border border-neutral-200 dark:border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={store.backgroundImage} alt="Background" className="h-28 w-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 flex justify-end gap-2 bg-gradient-to-t from-black/60 to-transparent p-2">
                    <button
                      onClick={() => bgFileRef.current?.click()}
                      disabled={uploadingBg}
                      className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-neutral-900 disabled:opacity-50"
                    >
                      {uploadingBg ? "Uploading…" : "Replace"}
                    </button>
                    <button
                      onClick={removeBackground}
                      className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => bgFileRef.current?.click()}
                  disabled={uploadingBg}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-neutral-300 py-6 text-sm font-medium text-neutral-600 transition-colors hover:border-orange-300 hover:text-orange-600 disabled:opacity-50 dark:border-white/15 dark:text-neutral-400"
                >
                  <ImageIcon className="h-4 w-4" />
                  {uploadingBg ? "Uploading…" : "Upload background image"}
                </button>
              )}
              <input
                ref={bgFileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleBackgroundPick(file);
                  e.target.value = "";
                }}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-white/10 dark:bg-neutral-900">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-neutral-900 dark:text-white">Blocks</h2>
              <span
                className={cn(
                  "text-xs font-medium",
                  sortedBlocks.length >= maxBlocks ? "text-red-500" : "text-neutral-400"
                )}
              >
                {sortedBlocks.length}/{maxBlocks}
              </span>
            </div>

            <button
              onClick={toggleSearch}
              className="mt-4 flex w-full items-center justify-between rounded-xl border border-neutral-200 px-3 py-2.5 text-left transition-colors hover:border-neutral-300 dark:border-white/10 dark:hover:border-white/20"
              aria-pressed={store.settings?.showSearch === true}
            >
              <span className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                <Search className="h-4 w-4" />
                Link search
                <span className="text-xs text-neutral-400">— let visitors filter your links</span>
              </span>
              <span
                className={cn(
                  "relative h-5 w-9 shrink-0 rounded-full transition-colors",
                  store.settings?.showSearch ? "bg-orange-500" : "bg-neutral-300 dark:bg-white/15"
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all",
                    store.settings?.showSearch ? "left-4" : "left-0.5"
                  )}
                />
              </span>
            </button>

            <div className="mt-4 flex flex-col gap-2">
              {sortedBlocks.map((block, index) => {
                const meta = BLOCK_TYPE_MAP[block.type];
                const title = (block.content?.title as string) || (block.content?.text as string) || meta.label;
                return (
                  <div
                    key={block._id || index}
                    className="group flex items-center gap-3 rounded-xl border border-neutral-200 p-2.5 dark:border-white/10"
                  >
                    <div className="flex shrink-0 flex-col">
                      <button
                        onClick={() => moveBlock(index, -1)}
                        disabled={index === 0}
                        className="text-neutral-300 hover:text-neutral-600 disabled:opacity-30"
                        aria-label="Move up"
                      >
                        <ChevronUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => moveBlock(index, 1)}
                        disabled={index === sortedBlocks.length - 1}
                        className="text-neutral-300 hover:text-neutral-600 disabled:opacity-30"
                        aria-label="Move down"
                      >
                        <ChevronDown className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${meta.color}1F`, color: meta.color }}
                    >
                      <meta.icon className="h-4 w-4" />
                    </div>
                    <button onClick={() => setEditingBlock(block)} className="min-w-0 flex-1 text-left">
                      <p className="truncate text-sm font-medium text-neutral-900 dark:text-white">
                        {index + 1}. {title}
                      </p>
                      <p className="truncate text-xs text-neutral-400">{meta.label}</p>
                    </button>
                    <button
                      onClick={() => removeBlock(index)}
                      className="shrink-0 rounded-full p-2 text-neutral-400 hover:text-red-500"
                      aria-label="Delete block"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}

              <button
                onClick={() => setAddOpen(true)}
                disabled={sortedBlocks.length >= maxBlocks}
                className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-neutral-300 py-3 text-sm font-medium text-neutral-600 transition-colors hover:border-orange-300 hover:text-orange-600 disabled:opacity-50 dark:border-white/15 dark:text-neutral-400"
              >
                <Plus className="h-4 w-4" />
                {sortedBlocks.length >= maxBlocks ? "Block limit reached" : "Add block"}
              </button>
            </div>
          </div>
        </div>

        {/* Right: sticky iPhone live preview (desktop/tablet+) */}
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <PhoneFrame>
              <StorePreview store={store} theme={theme} />
            </PhoneFrame>
          </div>
        </div>
      </div>

      {/* Mobile/tablet preview modal */}
      <AnimatePresence>
        {mobilePreviewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-6 lg:hidden"
            onClick={() => setMobilePreviewOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[300px]"
            >
              <button
                onClick={() => setMobilePreviewOpen(false)}
                className="absolute -top-10 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white"
                aria-label="Close preview"
              >
                <X className="h-4 w-4" />
              </button>
              <PhoneFrame>
                <StorePreview store={store} theme={theme} />
              </PhoneFrame>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ThemePicker
        open={themeOpen}
        currentTheme={store.theme}
        onSelectAction={(id) => scheduleAutosave({ ...store, theme: id })}
        onCloseAction={() => setThemeOpen(false)}
      />
      <AddBlockSheet open={addOpen} onSelectAction={addBlock} onCloseAction={() => setAddOpen(false)} />
      <BlockEditSheet block={editingBlock} onSaveAction={saveBlockContent} onCloseAction={() => setEditingBlock(null)} />
    </div>
  );
}
