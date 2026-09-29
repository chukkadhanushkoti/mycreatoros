import { Check } from "lucide-react";

import { bioStoreThemes } from "@/config/biostore-themes";
import { cn } from "@/lib/utils";

const PREVIEW_COUNT = 6;

function backgroundStyle(bg: string): React.CSSProperties {
  return bg.startsWith("linear-gradient") ? { backgroundImage: bg } : { backgroundColor: bg };
}

export function ThemeStrip({
  currentTheme,
  onSelectAction,
  onSeeAllAction,
}: {
  currentTheme: string;
  onSelectAction: (id: string) => void;
  onSeeAllAction: () => void;
}) {
  const selected = bioStoreThemes.find((t) => t.id === currentTheme);
  const preview = bioStoreThemes.slice(0, PREVIEW_COUNT);
  const visible = selected && !preview.some((t) => t.id === selected.id) ? [selected, ...preview.slice(0, -1)] : preview;

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {visible.map((theme) => {
        const active = currentTheme === theme.id;
        return (
          <button
            key={theme.id}
            onClick={() => onSelectAction(theme.id)}
            title={theme.name}
            className={cn(
              "relative h-11 w-11 shrink-0 rounded-full border-2 transition-transform",
              active ? "border-orange-500" : "border-neutral-200 dark:border-white/10"
            )}
            style={backgroundStyle(theme.colors.backgroundColor)}
          >
            {active && (
              <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-white">
                <Check className="h-2.5 w-2.5" />
              </span>
            )}
          </button>
        );
      })}
      <button
        onClick={onSeeAllAction}
        className="flex h-11 shrink-0 items-center rounded-full border border-neutral-200 px-3.5 text-xs font-medium text-neutral-600 transition-colors hover:border-orange-300 dark:border-white/10 dark:text-neutral-300"
      >
        See more ({bioStoreThemes.length})
      </button>
    </div>
  );
}
