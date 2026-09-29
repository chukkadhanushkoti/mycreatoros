"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Rocket, X } from "lucide-react";

import { getAccessToken } from "@/context/auth-context";
import { ApiError } from "@/lib/api-client";
import { autoDmApi, type CampaignPayload, type InstagramPost, type TargetType } from "@/lib/autodm-api";
import { CONFIRMATION_STEP_LABELS } from "@/config/autodm";
import { cn } from "@/lib/utils";
import { PostGrid } from "@/components/dashboard/autodm/post-grid";
import { StringTemplateList } from "@/components/dashboard/autodm/template-list";
import { DmTemplateList } from "@/components/dashboard/autodm/dm-template-list";
import { CampaignSummary } from "@/components/dashboard/autodm/campaign-summary";

const STEPS = ["Target", "Keywords", "Confirmation", "Primary DM", "Extras", "Review"];

const inputClass =
  "w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 outline-none transition-colors focus:border-orange-400 dark:border-white/10 dark:bg-neutral-800 dark:text-white";
const textareaClass = `${inputClass} resize-none`;
const cardClass = "rounded-2xl border border-neutral-200 bg-white p-5 dark:border-white/10 dark:bg-neutral-900";

function defaultPayload(): CampaignPayload {
  return {
    name: "",
    trigger: {
      type: "post_comment",
      targetType: "specific",
      keywordMode: "specific",
      keywords: [],
      excludedKeywords: [],
    },
    confirmationStep: "none",
    openingDm: { templates: [{ content: "" }], followCheckMessage: { content: "" } },
    primaryDm: { templates: [{ content: "" }] },
    publicReply: { enabled: false, templates: [""] },
    followUp: { enabled: false, delayMinutes: 30, templates: [{ content: "" }] },
  };
}

function RadioCard({
  active,
  onClick,
  title,
  description,
  disabled,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  description: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex w-full items-start gap-3 rounded-xl border-2 p-3.5 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        active ? "border-orange-500 bg-orange-500/5" : "border-neutral-200 dark:border-white/10"
      )}
    >
      <span
        className={cn(
          "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2",
          active ? "border-orange-500 bg-orange-500" : "border-neutral-300 dark:border-white/20"
        )}
      >
        {active && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
      </span>
      <span>
        <p className="text-sm font-medium text-neutral-900 dark:text-white">{title}</p>
        <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">{description}</p>
      </span>
      {disabled && (
        <span className="ml-auto shrink-0 rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-neutral-400 dark:bg-white/10">
          Soon
        </span>
      )}
    </button>
  );
}

export function CampaignWizard({
  campaignId,
  initial,
}: {
  campaignId?: string;
  initial?: CampaignPayload;
}) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [payload, setPayload] = useState<CampaignPayload>(() => ({ ...defaultPayload(), ...initial }));
  const [keywordInput, setKeywordInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const patch = (p: Partial<CampaignPayload>) => setPayload((prev) => ({ ...prev, ...p }));
  const patchTrigger = (p: Partial<NonNullable<CampaignPayload["trigger"]>>) =>
    setPayload((prev) => ({ ...prev, trigger: { ...prev.trigger!, ...p } }));

  const isEdit = !!campaignId;

  const validate = (): string | null => {
    const t = payload.trigger!;
    if (t.targetType === "specific" && !t.mediaId) return "Select a post to target.";
    if (t.keywordMode === "specific" && (!t.keywords || t.keywords.length === 0))
      return "Add at least one keyword.";
    if (payload.confirmationStep !== "none") {
      if (!payload.openingDm?.templates?.[0]?.content?.trim()) return "Add an opening message.";
      if (payload.confirmationStep === "button_confirmation" && !payload.openingDm?.templates?.[0]?.buttons?.[0]?.text?.trim())
        return "Add a button label for the opening message.";
    }
    if (!payload.primaryDm?.templates?.some((t) => t.content.trim()))
      return "Add at least one primary DM message.";
    for (const tpl of payload.primaryDm?.templates || []) {
      for (const btn of tpl.buttons || []) {
        if (!btn.text.trim() || !/^https?:\/\//.test(btn.url || "")) return "Every button needs a label and a valid https:// URL.";
      }
    }
    if (payload.publicReply?.enabled && !payload.publicReply.templates.some((t) => t.trim()))
      return "Add at least one public reply message, or turn it off.";
    if (payload.followUp?.enabled && !payload.followUp.templates.some((t) => t.content.trim()))
      return "Add at least one follow-up message, or turn it off.";
    return null;
  };

  const canGoNext = useMemo(() => {
    if (step === 0) return payload.trigger!.targetType !== "specific" || !!payload.trigger!.mediaId;
    if (step === 1) return payload.trigger!.keywordMode !== "specific" || (payload.trigger!.keywords?.length || 0) > 0;
    return true;
  }, [step, payload]);

  const goNext = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleSelectPost = (post: InstagramPost) => {
    patchTrigger({ mediaId: post.id, mediaUrl: post.thumbnail, mediaCaption: post.title });
  };

  const addKeyword = () => {
    const clean = keywordInput.trim();
    if (clean.length < 2) return;
    const existing = payload.trigger!.keywords || [];
    if (existing.includes(clean)) return;
    patchTrigger({ keywords: [...existing, clean] });
    setKeywordInput("");
  };

  const removeKeyword = (kw: string) => {
    patchTrigger({ keywords: (payload.trigger!.keywords || []).filter((k) => k !== kw) });
  };

  const handleLaunch = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    const token = getAccessToken();
    if (!token) return;
    setSubmitting(true);
    setError(null);

    const finalPayload: CampaignPayload = {
      ...payload,
      status: "active",
      name:
        payload.name?.trim() ||
        (payload.trigger?.mediaCaption ? `${payload.trigger.mediaCaption.slice(0, 30)}...` : `Campaign ${Date.now()}`),
      openingDm: payload.confirmationStep === "none" ? undefined : payload.openingDm,
    };

    try {
      if (isEdit) {
        await autoDmApi.updateCampaign(token, campaignId!, finalPayload);
        router.push(`/dashboard/tools/autodm/${campaignId}`);
      } else {
        const created = await autoDmApi.createCampaign(token, finalPayload);
        router.push(`/dashboard/tools/autodm/${created._id}`);
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't save the campaign — check your connection.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl pb-28">
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push("/dashboard/tools/autodm")}
          className="flex items-center gap-1.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          <X className="h-4 w-4" />
          Cancel
        </button>
        <span className="text-xs font-medium text-neutral-400">
          Step {step + 1} of {STEPS.length} — {STEPS[step]}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mt-4 flex gap-1.5">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={cn("h-1 flex-1 rounded-full", i <= step ? "bg-orange-500" : "bg-neutral-200 dark:bg-white/10")}
          />
        ))}
      </div>

      <h1 className="mt-6 font-sans text-xl font-semibold text-neutral-900 dark:text-white">
        {isEdit ? "Edit automation" : "New automation"}
      </h1>

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="mt-5 flex flex-col gap-5">
        {/* Step 0: Target content */}
        {step === 0 && (
          <div className={cardClass}>
            <p className="text-sm font-semibold text-neutral-900 dark:text-white">Which post should trigger this?</p>
            <div className="mt-4 flex flex-col gap-2.5">
              <RadioCard
                active={payload.trigger!.targetType === "specific"}
                onClick={() => patchTrigger({ targetType: "specific" as TargetType })}
                title="Specific post or reel"
                description="Only comments on one post you choose trigger this automation."
              />
              <RadioCard
                active={payload.trigger!.targetType === "next"}
                onClick={() => patchTrigger({ targetType: "next" as TargetType })}
                title="Next post or reel"
                description="Triggers on whatever you post next."
              />
              <RadioCard
                active={payload.trigger!.targetType === "any"}
                onClick={() => patchTrigger({ targetType: "any" as TargetType })}
                title="Any post or reel"
                description="Triggers on comments across your entire account."
              />
            </div>
            {payload.trigger!.targetType === "specific" && (
              <div className="mt-4">
                <p className="mb-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">Select a recent post:</p>
                <PostGrid selectedId={payload.trigger!.mediaId} onSelectAction={handleSelectPost} />
              </div>
            )}
          </div>
        )}

        {/* Step 1: Keywords */}
        {step === 1 && (
          <div className={cardClass}>
            <p className="text-sm font-semibold text-neutral-900 dark:text-white">What should the comment say?</p>
            <div className="mt-4 flex rounded-xl border border-neutral-200 p-1 dark:border-white/10">
              {(["specific", "any"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => patchTrigger({ keywordMode: mode })}
                  className={cn(
                    "flex-1 rounded-lg py-2 text-sm font-medium transition-colors",
                    payload.trigger!.keywordMode === mode
                      ? "bg-orange-500 text-white"
                      : "text-neutral-600 dark:text-neutral-400"
                  )}
                >
                  {mode === "specific" ? "Specific keyword" : "Any comment"}
                </button>
              ))}
            </div>

            {payload.trigger!.keywordMode === "specific" && (
              <div className="mt-4">
                <div className="flex gap-2">
                  <input
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addKeyword())}
                    placeholder="e.g. price, info, link"
                    className={inputClass}
                  />
                  <button
                    onClick={addKeyword}
                    className="shrink-0 rounded-xl bg-orange-500 px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(payload.trigger!.keywords || []).map((kw) => (
                    <span
                      key={kw}
                      className="flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 dark:bg-white/10 dark:text-neutral-300"
                    >
                      {kw}
                      <button onClick={() => removeKeyword(kw)} aria-label={`Remove ${kw}`}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-xs text-neutral-400">
                  Matching is case-insensitive and looks for the keyword anywhere in the comment.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Confirmation / opening DM */}
        {step === 2 && (
          <div className={cardClass}>
            <p className="text-sm font-semibold text-neutral-900 dark:text-white">Confirmation step</p>
            <div className="mt-4 flex flex-col gap-2.5">
              {(["none", "button_confirmation", "follow_check"] as const).map((cs) => (
                <RadioCard
                  key={cs}
                  active={payload.confirmationStep === cs}
                  onClick={() => patch({ confirmationStep: cs })}
                  title={cs === "none" ? "No confirmation" : cs === "button_confirmation" ? "Button confirmation" : "Check follower status"}
                  description={CONFIRMATION_STEP_LABELS[cs]}
                />
              ))}
            </div>

            {payload.confirmationStep !== "none" && (
              <div className="mt-4 flex flex-col gap-3">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-neutral-500 dark:text-neutral-400">
                    Opening message
                  </label>
                  <textarea
                    value={payload.openingDm?.templates?.[0]?.content || ""}
                    onChange={(e) =>
                      patch({
                        openingDm: {
                          ...payload.openingDm!,
                          templates: [{ ...payload.openingDm?.templates?.[0], content: e.target.value }],
                        },
                      })
                    }
                    rows={3}
                    className={textareaClass}
                    placeholder="Hey! Tap below to get the link 👇"
                  />
                </div>
                {payload.confirmationStep === "button_confirmation" && (
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-neutral-500 dark:text-neutral-400">
                      Button label
                    </label>
                    <input
                      value={payload.openingDm?.templates?.[0]?.buttons?.[0]?.text || ""}
                      onChange={(e) =>
                        patch({
                          openingDm: {
                            ...payload.openingDm!,
                            templates: [
                              {
                                ...payload.openingDm?.templates?.[0],
                                content: payload.openingDm?.templates?.[0]?.content || "",
                                buttons: [{ text: e.target.value, payload: "START_PRIMARY_DM" }],
                              },
                            ],
                          },
                        })
                      }
                      className={inputClass}
                      placeholder="Send me the link"
                    />
                  </div>
                )}
                {payload.confirmationStep === "follow_check" && (
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-neutral-500 dark:text-neutral-400">
                      Message if they don&apos;t follow you
                    </label>
                    <textarea
                      value={payload.openingDm?.followCheckMessage?.content || ""}
                      onChange={(e) =>
                        patch({
                          openingDm: { ...payload.openingDm!, followCheckMessage: { content: e.target.value } },
                        })
                      }
                      rows={2}
                      className={textareaClass}
                      placeholder="Follow me first and comment again to get the link!"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Step 3: Primary DM */}
        {step === 3 && (
          <div className={cardClass}>
            <p className="text-sm font-semibold text-neutral-900 dark:text-white">Primary DM</p>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              The main message with your content or link. Add multiple variations to randomize.
            </p>
            <div className="mt-4">
              <DmTemplateList
                values={payload.primaryDm?.templates || [{ content: "" }]}
                onChangeAction={(templates) => patch({ primaryDm: { templates } })}
                placeholder="Here's the link you asked for: https://..."
                max={3}
                maxButtons={3}
              />
            </div>
          </div>
        )}

        {/* Step 4: Public reply + follow-up */}
        {step === 4 && (
          <div className="flex flex-col gap-5">
            <div className={cardClass}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-neutral-900 dark:text-white">Public reply</p>
                  <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                    Also reply publicly to the comment — boosts engagement signals.
                  </p>
                </div>
                <Toggle
                  checked={!!payload.publicReply?.enabled}
                  onChange={(v) => patch({ publicReply: { ...payload.publicReply!, enabled: v } })}
                />
              </div>
              {payload.publicReply?.enabled && (
                <div className="mt-4">
                  <StringTemplateList
                    values={payload.publicReply.templates}
                    onChangeAction={(templates) => patch({ publicReply: { ...payload.publicReply!, templates } })}
                    placeholder="Just sent it to your DMs! 📩"
                    max={5}
                    maxLength={280}
                  />
                </div>
              )}
            </div>

            <div className={cardClass}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-neutral-900 dark:text-white">Follow-up message</p>
                  <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                    Re-engage if they haven&apos;t responded after a delay.
                  </p>
                </div>
                <Toggle
                  checked={!!payload.followUp?.enabled}
                  onChange={(v) => patch({ followUp: { ...payload.followUp!, enabled: v } })}
                />
              </div>
              {payload.followUp?.enabled && (
                <div className="mt-4 flex flex-col gap-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-neutral-500 dark:text-neutral-400">
                      Delay before sending
                    </label>
                    <select
                      value={payload.followUp.delayMinutes}
                      onChange={(e) => patch({ followUp: { ...payload.followUp!, delayMinutes: Number(e.target.value) } })}
                      className={inputClass}
                    >
                      <option value={30}>30 minutes</option>
                      <option value={60}>1 hour</option>
                      <option value={360}>6 hours</option>
                      <option value={1440}>24 hours</option>
                    </select>
                  </div>
                  <DmTemplateList
                    values={payload.followUp.templates}
                    onChangeAction={(templates) => patch({ followUp: { ...payload.followUp!, templates } })}
                    placeholder="Still there? Let me know if you have questions!"
                    max={3}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 5: Review */}
        {step === 5 && (
          <div className="flex flex-col gap-5">
            <div className={cardClass}>
              <label className="mb-1.5 block text-xs font-medium text-neutral-500 dark:text-neutral-400">
                Campaign name (optional)
              </label>
              <input
                value={payload.name || ""}
                onChange={(e) => patch({ name: e.target.value })}
                placeholder="Auto-generated from the post if left blank"
                className={inputClass}
              />
            </div>
            <CampaignSummary campaign={payload} />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 px-6 py-3 backdrop-blur md:left-72 dark:border-white/10 dark:bg-neutral-950/95">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3">
          <button
            onClick={goBack}
            disabled={step === 0}
            className="flex items-center gap-1.5 rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors disabled:opacity-40 dark:border-white/10 dark:text-neutral-300"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </button>
          {step < STEPS.length - 1 ? (
            <button
              onClick={goNext}
              disabled={!canGoNext}
              className="flex items-center gap-1.5 rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              Next
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          ) : (
            <button
              onClick={handleLaunch}
              disabled={submitting}
              className="flex items-center gap-1.5 rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {isEdit ? <Check className="h-3.5 w-3.5" /> : <Rocket className="h-3.5 w-3.5" />}
              {submitting ? "Saving..." : isEdit ? "Save changes" : "Launch automation"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={cn(
        "flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors",
        checked ? "bg-orange-500" : "bg-neutral-200 dark:bg-white/10"
      )}
      aria-pressed={checked}
    >
      <span
        className={cn("h-5 w-5 rounded-full bg-white shadow-sm transition-transform", checked && "translate-x-5")}
      />
    </button>
  );
}
