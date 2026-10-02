"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { BlockRenderer } from "./BlockRenderer";

interface BioLinkSearchProps {
  blocks: any[];
  username: string;
  themeData: any;
}

// Client-side link search for the public bio page. Filters the creator's OWN
// blocks by title/subtitle/label/url/type — no network call, no new endpoint.
export function BioLinkSearch({ blocks, username, themeData }: BioLinkSearchProps) {
  const [query, setQuery] = useState("");
  const colors = themeData?.colors || {};
  const styles = themeData?.styles || {};
  const q = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!q) return blocks;
    return blocks.filter((b) => {
      const c = b?.content || {};
      const hay = [c.title, c.subtitle, c.label, c.text, c.url, b?.type]
        .filter(Boolean)
        .map((x: unknown) => String(x).toLowerCase())
        .join(" ");
      return hay.includes(q);
    });
  }, [q, blocks]);

  const radius = typeof styles.cardRadius === "number" ? styles.cardRadius : 14;
  const textColor = colors.textColor || "#ffffff";
  const borderColor = `color-mix(in srgb, ${textColor} 16%, transparent)`;

  return (
    <div className="w-full">
      <div
        className="flex items-center gap-2 w-full mb-5 px-4 py-3 transition-all"
        style={{
          backgroundColor: colors.cardColor || "rgba(255,255,255,0.08)",
          color: textColor,
          borderRadius: `${radius}px`,
          border: `1px solid ${borderColor}`,
        }}
      >
        <Search className="w-5 h-5 shrink-0 opacity-70" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search links..."
          aria-label="Search links"
          className="flex-1 bg-transparent outline-none border-none text-sm placeholder:opacity-50"
          style={{ color: textColor }}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="shrink-0 opacity-70 hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3 w-full">
        {filtered.length === 0 ? (
          <p
            className="text-center text-sm py-6 opacity-80"
            style={{ color: colors.mutedColor || textColor }}
          >
            No links match &ldquo;{query}&rdquo;.
          </p>
        ) : (
          filtered.map((block, idx) => (
            <BlockRenderer
              key={block._id || idx}
              block={block}
              username={username}
              themeData={themeData}
              index={idx + 1}
            />
          ))
        )}
      </div>
    </div>
  );
}
