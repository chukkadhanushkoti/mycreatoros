"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import type { BioStoreBlock } from "@/lib/biostore-api";
import { BLOCK_TYPE_MAP } from "@/config/biostore-blocks";

const inputClass =
  "w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 outline-none transition-colors focus:border-orange-400 dark:border-white/10 dark:bg-neutral-800 dark:text-white";
const labelClass = "mb-1.5 block text-xs font-medium text-neutral-600 dark:text-neutral-400";

const SOCIAL_PLATFORMS = ["instagram", "youtube", "twitter", "linkedin", "github", "facebook", "spotify", "tiktok"];

function BlockEditor({
  block,
  onSaveAction,
  onCloseAction,
}: {
  block: BioStoreBlock;
  onSaveAction: (content: Record<string, unknown>) => void;
  onCloseAction: () => void;
}) {
  const [content, setContent] = useState<Record<string, unknown>>(() => ({ ...block.content }));
  const meta = BLOCK_TYPE_MAP[block.type];
  const set = (key: string, value: string) => setContent((c) => ({ ...c, [key]: value }));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 sm:items-center"
        onClick={onCloseAction}
      >
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md rounded-t-3xl bg-white p-5 sm:rounded-3xl dark:bg-neutral-900"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-neutral-900 dark:text-white">Edit {meta.label}</h3>
            <button
              onClick={onCloseAction}
              className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100 dark:hover:bg-white/5"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-3.5">
            {block.type === "text" && (
              <div>
                <label className={labelClass}>Text</label>
                <textarea
                  className={inputClass}
                  rows={4}
                  value={(content.text as string) || ""}
                  onChange={(e) => set("text", e.target.value)}
                />
              </div>
            )}

            {block.type === "social" && (
              <div>
                <label className={labelClass}>Platform</label>
                <select
                  className={inputClass}
                  value={(content.platform as string) || "instagram"}
                  onChange={(e) => set("platform", e.target.value)}
                >
                  {SOCIAL_PLATFORMS.map((p) => (
                    <option key={p} value={p}>
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {(block.type === "image" || block.type === "video") && (
              <div>
                <label className={labelClass}>{block.type === "image" ? "Image" : "Video"} URL</label>
                <input
                  className={inputClass}
                  value={(content.mediaUrl as string) || ""}
                  onChange={(e) => set("mediaUrl", e.target.value)}
                  placeholder="https://"
                />
              </div>
            )}

            {block.type !== "text" && block.type !== "divider" && block.type !== "spacer" && (
              <div>
                <label className={labelClass}>Title</label>
                <input
                  className={inputClass}
                  value={(content.title as string) || ""}
                  onChange={(e) => set("title", e.target.value)}
                  placeholder="Title"
                />
              </div>
            )}

            {(block.type === "link" || block.type === "button") && (
              <div>
                <label className={labelClass}>Subtitle (optional)</label>
                <input
                  className={inputClass}
                  value={(content.subtitle as string) || ""}
                  onChange={(e) => set("subtitle", e.target.value)}
                  placeholder="Optional subtitle"
                />
              </div>
            )}

            {meta.hasUrl && (
              <div>
                <label className={labelClass}>URL</label>
                <input
                  className={inputClass}
                  value={(content.url as string) || ""}
                  onChange={(e) => set("url", e.target.value)}
                  placeholder="https://"
                />
              </div>
            )}

            {block.type === "product" && (
              <div>
                <label className={labelClass}>Price (optional)</label>
                <input
                  className={inputClass}
                  value={(content.price as string) || ""}
                  onChange={(e) => set("price", e.target.value)}
                  placeholder="$19.99"
                />
              </div>
            )}

            {(block.type === "divider" || block.type === "spacer") && (
              <p className="text-sm text-neutral-500 dark:text-neutral-400">This block has no settings.</p>
            )}
          </div>

          <button
            onClick={() => onSaveAction(content)}
            className="mt-5 w-full rounded-full bg-orange-500 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Save changes
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function BlockEditSheet(props: {block: BioStoreBlock | null; onSaveAction: (content: Record<string, unknown>) => void; onCloseAction: () => void}) {
  if (!props.block) return null;
  return <BlockEditor key={props.block._id ?? props.block.order} {...props} block={props.block} />;
}
