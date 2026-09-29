import { MessageCircle } from "lucide-react";

import type { CampaignPayload } from "@/lib/autodm-api";

function Highlight({ children }: { children: React.ReactNode }) {
  return <span className="font-medium text-orange-600 dark:text-orange-400">{children}</span>;
}

/** Plain-English narrative summary of a campaign's configured automation flow. */
export function CampaignSummary({ campaign }: { campaign: CampaignPayload }) {
  const { trigger, confirmationStep, openingDm, primaryDm, publicReply, followUp } = campaign;

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-white/10 dark:bg-neutral-900">
      <div className="flex items-center gap-2 text-neutral-900 dark:text-white">
        <MessageCircle className="h-4 w-4 text-orange-500" />
        <h3 className="text-sm font-semibold">How this automation works</h3>
      </div>

      <ol className="mt-4 flex flex-col gap-3 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
        <li>
          When someone comments on{" "}
          <Highlight>
            {trigger?.targetType === "specific"
              ? trigger.mediaCaption
                ? `"${trigger.mediaCaption.slice(0, 60)}"`
                : "this post"
              : trigger?.targetType === "next"
                ? "your next post"
                : "any of your posts"}
          </Highlight>
        </li>
        <li>
          and the comment{" "}
          <Highlight>
            {trigger?.keywordMode === "specific" && trigger.keywords?.length
              ? `contains: ${trigger.keywords.join(", ")}`
              : "is anything"}
          </Highlight>
        </li>
        {publicReply?.enabled && publicReply.templates?.[0] && (
          <li>
            then CreatorOS publicly replies: <Highlight>&ldquo;{publicReply.templates[0]}&rdquo;</Highlight>
          </li>
        )}
        {confirmationStep !== "none" && openingDm?.templates?.[0]?.content && (
          <li>
            then sends an opening DM: <Highlight>&ldquo;{openingDm.templates[0].content}&rdquo;</Highlight>
            {openingDm.templates[0].buttons?.[0]?.text && (
              <> with a button labeled <Highlight>{openingDm.templates[0].buttons[0].text}</Highlight></>
            )}
          </li>
        )}
        {confirmationStep === "follow_check" && openingDm?.followCheckMessage?.content && (
          <li>
            if they don&apos;t follow you, sends instead:{" "}
            <Highlight>&ldquo;{openingDm.followCheckMessage.content}&rdquo;</Highlight>
          </li>
        )}
        <li>
          {confirmationStep === "none" ? "then sends the DM: " : "once confirmed, sends the primary DM: "}
          <Highlight>&ldquo;{primaryDm?.templates?.[0]?.content || "(not set)"}&rdquo;</Highlight>
        </li>
        {followUp?.enabled && followUp.templates?.[0]?.content && (
          <li>
            and waits <Highlight>{followUp.delayMinutes} minutes</Highlight>, then sends a follow-up:{" "}
            <Highlight>&ldquo;{followUp.templates[0].content}&rdquo;</Highlight>
          </li>
        )}
      </ol>
    </div>
  );
}
