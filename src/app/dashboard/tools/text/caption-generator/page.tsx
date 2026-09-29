"use client";

import { useMemo, useState } from "react";
import { Copy, Check, Loader2, MessageSquareText, RefreshCw, Sparkles, X } from "lucide-react";

import { getAccessToken } from "@/context/auth-context";
import { ApiError } from "@/lib/api-client";
import { captionApi } from "@/lib/caption-api";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const cardClass = "rounded-2xl border border-neutral-200 bg-white p-5 dark:border-white/10 dark:bg-neutral-900";
const textareaClass =
  "w-full resize-none rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 outline-none transition-colors focus:border-orange-400 dark:border-white/10 dark:bg-neutral-800 dark:text-white";

const PLATFORMS = [
  { key: "instagram", label: "Instagram", limit: 2200 },
  { key: "facebook", label: "Facebook", limit: 2200 },
  { key: "linkedin", label: "LinkedIn", limit: 3000 },
  { key: "youtube", label: "YouTube", limit: 5000 },
] as const;

type PlatformKey = (typeof PLATFORMS)[number]["key"];

export default function CaptionGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState<PlatformKey>("instagram");
  const [caption, setCaption] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const [generatingCaption, setGeneratingCaption] = useState(false);
  const [generatingTags, setGeneratingTags] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<"caption" | "tags" | null>(null);

  const activeLimit = useMemo(() => PLATFORMS.find((p) => p.key === platform)!.limit, [platform]);
  const overLimit = caption.length > activeLimit;

  async function runGeneration(kind: "caption" | "tags") {
    const trimmed = topic.trim();
    if (!trimmed) {
      setError("Add a topic or idea first.");
      return;
    }
    setError(null);
    const token = getAccessToken();
    if (!token) {
      setError("You need to be signed in to generate content.");
      return;
    }

    try {
      if (kind === "caption") {
        setGeneratingCaption(true);
        const result = await captionApi.generateCaption(token, trimmed);
        setCaption(result);
      } else {
        setGeneratingTags(true);
        const tags = await captionApi.generateHashtags(token, trimmed);
        setHashtags(tags);
      }
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Something went wrong. Try again.";
      setError(kind === "caption" ? `Caption generation failed: ${message}` : `Hashtag generation failed: ${message}`);
    } finally {
      if (kind === "caption") setGeneratingCaption(false);
      else setGeneratingTags(false);
    }
  }

  function addTag() {
    const value = tagInput.trim().replace(/^#*/, "#");
    if (value.length > 1 && !hashtags.includes(value)) {
      setHashtags((prev) => [...prev, value]);
    }
    setTagInput("");
  }

  function removeTag(tag: string) {
    setHashtags((prev) => prev.filter((t) => t !== tag));
  }

  async function copyToClipboard(kind: "caption" | "tags") {
    const text = kind === "caption" ? caption : hashtags.join(" ");
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(kind);
    setTimeout(() => setCopied((c) => (c === kind ? null : c)), 1500);
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
          <MessageSquareText className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-sans text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">
            Caption Generator
          </h1>
          <p className="mt-0.5 text-sm text-neutral-600 dark:text-neutral-400">
            Describe your post and get a ready-to-edit caption with hashtags.
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-6 flex items-start justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
          <p>{error}</p>
          <button onClick={() => setError(null)} aria-label="Dismiss error" className="shrink-0">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className={cardClass}>
          <label className="text-sm font-medium text-neutral-900 dark:text-white">Topic or idea</label>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            rows={4}
            placeholder="e.g. Launching my new skincare routine video"
            className={cn(textareaClass, "mt-2")}
          />

          <p className="mt-5 text-sm font-medium text-neutral-900 dark:text-white">Platform</p>
          <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
            Sets the character-limit guide below — doesn&apos;t change what&apos;s generated.
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {PLATFORMS.map((p) => (
              <button
                key={p.key}
                onClick={() => setPlatform(p.key)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                  platform === p.key
                    ? "border-orange-500 bg-orange-500/5 text-orange-600 dark:text-orange-400"
                    : "border-neutral-200 text-neutral-600 hover:border-neutral-300 dark:border-white/10 dark:text-neutral-400"
                )}
              >
                {p.label}
              </button>
            ))}
          </div>

          <Button
            onClick={() => runGeneration("caption")}
            disabled={generatingCaption}
            className="mt-6 h-10 w-full gap-2 px-4"
          >
            {generatingCaption ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : caption ? (
              <RefreshCw className="h-4 w-4" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            {generatingCaption ? "Generating..." : caption ? "Regenerate caption" : "Generate caption"}
          </Button>
          <p className="mt-2 text-xs text-neutral-400 dark:text-neutral-500">
            Same topic returns a cached result for up to 24 hours — tweak the wording for a fresh take.
          </p>
        </div>

        <div className={cardClass}>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-neutral-900 dark:text-white">Caption</label>
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "text-xs",
                  overLimit ? "text-red-500" : "text-neutral-400 dark:text-neutral-500"
                )}
              >
                {caption.length}/{activeLimit}
              </span>
              <button
                onClick={() => copyToClipboard("caption")}
                disabled={!caption}
                aria-label="Copy caption"
                className="text-neutral-400 transition-colors hover:text-orange-500 disabled:opacity-40 dark:text-neutral-500"
              >
                {copied === "caption" ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={7}
            placeholder="Your generated caption will appear here — feel free to edit it."
            className={cn(textareaClass, "mt-2", overLimit && "border-red-300 dark:border-red-500/40")}
          />

          <div className="mt-5 flex items-center justify-between">
            <label className="text-sm font-medium text-neutral-900 dark:text-white">Hashtags</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => runGeneration("tags")}
                disabled={generatingTags}
                className="flex items-center gap-1.5 text-xs font-medium text-orange-600 transition-colors hover:text-orange-700 disabled:opacity-50 dark:text-orange-400"
              >
                {generatingTags ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
                AI Generate
              </button>
              <button
                onClick={() => copyToClipboard("tags")}
                disabled={hashtags.length === 0}
                aria-label="Copy hashtags"
                className="text-neutral-400 transition-colors hover:text-orange-500 disabled:opacity-40 dark:text-neutral-500"
              >
                {copied === "tags" ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="mt-2 flex flex-wrap gap-2 rounded-xl border border-neutral-200 p-2.5 dark:border-white/10">
            {hashtags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1.5 rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700 dark:bg-white/5 dark:text-neutral-300"
              >
                {tag}
                <button onClick={() => removeTag(tag)} aria-label={`Remove ${tag}`}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag();
                }
              }}
              placeholder="Add a tag and press Enter"
              className="min-w-[140px] flex-1 bg-transparent px-1 py-1 text-xs text-neutral-900 outline-none dark:text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
