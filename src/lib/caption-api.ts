import { authedRequest } from "@/lib/social-api";

// The backend has no dedicated caption endpoint yet — captions are generated
// via the script endpoint (structured hook / body / CTA) and hashtags via the
// metadata endpoint, the same two calls the mobile app uses for this feature.

export interface ScriptResult {
  hook?: string;
  mainContent?: string[];
  callToAction?: string;
}

interface ScriptResponse {
  data?: ScriptResult | string;
  script?: ScriptResult | string;
}

interface MetadataResponse {
  hashtags?: string;
  data?: { title?: string; description?: string; hashtags?: string };
}

function parseMaybeJson<T>(value: T | string | undefined): T | string | undefined {
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value) as T;
  } catch {
    return value;
  }
}

// The prompt behind /api/ai/script is written for a video script (a "hook",
// numbered script beats, a closing CTA), so its raw shape reads like an
// outline rather than a caption. Strip the script formatting and fold it into
// a short flowing paragraph + CTA line, the shape an actual social caption
// takes.
function cleanLine(value?: string): string {
  if (!value) return "";
  return value
    .replace(/^\s*(?:[-•*]|\d+[.)])\s*/, "")
    .replace(/^\s*(hook|main content|call to action|cta)\s*:\s*/i, "")
    .trim();
}

/** Reshapes the script's hook/body/CTA outline into a single ready-to-post caption. */
export function scriptToCaption(result: ScriptResult | string | undefined): string {
  if (!result) return "";
  if (typeof result === "string") return cleanLine(result);

  const hook = cleanLine(result.hook);
  // Only the first couple of script beats read like caption-length copy —
  // later points tend to be full spoken-video sections, not caption text.
  const body = (result.mainContent || [])
    .slice(0, 2)
    .map(cleanLine)
    .filter(Boolean)
    .join(" ");
  const cta = cleanLine(result.callToAction);

  const paragraph = [hook, body].filter(Boolean).join(" ");
  return [paragraph, cta].filter(Boolean).join("\n\n");
}

/** Splits the AI-suggested tag string into individual #hashtags. */
export function parseHashtags(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.startsWith("#"));
}

export const captionApi = {
  generateCaption: async (token: string, topic: string): Promise<string> => {
    const res = await authedRequest<ScriptResponse>("/api/ai/script", token, {
      method: "POST",
      body: JSON.stringify({ topic }),
    });
    const result = parseMaybeJson<ScriptResult>(res.data ?? res.script);
    return scriptToCaption(result);
  },

  generateHashtags: async (token: string, topic: string): Promise<string[]> => {
    const res = await authedRequest<MetadataResponse>("/api/ai/metadata", token, {
      method: "POST",
      body: JSON.stringify({ topic }),
    });
    return parseHashtags(res.hashtags || res.data?.hashtags);
  },
};
