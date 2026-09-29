/**
 * Routes for general creative tools (not tied to a connected platform) — the
 * platform sidebar is hidden on these, replaced by a full-width tool view.
 * Note: /dashboard/tools/biostore and /dashboard/tools/autodm are deliberately
 * excluded — those are platform-specific services (shown under Instagram's
 * sidebar) even though they share the /dashboard/tools/* path prefix.
 */
export const GENERAL_TOOL_PREFIXES = [
  "/dashboard/tools/text",
  "/dashboard/tools/image",
  "/dashboard/tools/audio",
  "/dashboard/tools/video",
  "/dashboard/tools/creator-studio",
];

export function isGeneralToolRoute(pathname: string) {
  return GENERAL_TOOL_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}
