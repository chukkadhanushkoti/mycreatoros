"use client";

import { Check, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { bioStoreThemes } from "@/config/biostore-themes";
import { cn } from "@/lib/utils";

function backgroundStyle(bg: string): React.CSSProperties {
  return bg.startsWith("linear-gradient") ? { backgroundImage: bg } : { backgroundColor: bg };
}

const categories = ["Standard", "Aesthetic", "Bold", "Signature"];

function linkStyle(theme: (typeof bioStoreThemes)[number]): React.CSSProperties {
  const outline = theme.styles.buttonStyle === "outline";
  const color = theme.colors.buttonColor;
  return {
    ...(outline ? {} : backgroundStyle(color)),
    border: outline ? `1.5px solid ${color}` : "1px solid transparent",
    borderRadius: Math.min(theme.styles.buttonRadius, 16),
    color: outline ? theme.colors.accentColor || theme.colors.textColor : theme.colors.buttonTextColor,
  };
}

export function ThemePicker({
  open,
  currentTheme,
  onSelectAction,
  onCloseAction,
}: {
  open: boolean;
  currentTheme: string;
  onSelectAction: (id: string) => void;
  onCloseAction: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
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
            className="max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-white p-5 sm:rounded-3xl dark:bg-neutral-900"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white">Choose a theme</h3>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">20 free styles, designed for readable links.</p>
              </div>
              <button
                onClick={onCloseAction}
                className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100 dark:hover:bg-white/5"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 space-y-6">
              {categories.map((category) => <section key={category} aria-label={`${category} themes`}>
                <div className="mb-3 flex items-baseline justify-between">
                  <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">{category}</h4>
                  <span className="text-xs text-neutral-400">5 styles</span>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
              {bioStoreThemes.filter((theme) => theme.category === category).map((theme) => {
                const active = currentTheme === theme.id;
                return (
                  <button
                    key={theme.id}
                    aria-pressed={active}
                    onClick={() => {
                      onSelectAction(theme.id);
                    }}
                    className={cn(
                      "relative flex aspect-[3/4] flex-col items-center gap-1.5 overflow-hidden rounded-2xl border-2 p-3 pt-5 text-left transition-colors",
                      active ? "border-orange-500" : "border-transparent"
                    )}
                    style={backgroundStyle(theme.colors.backgroundColor)}
                  >
                    <div className="h-8 w-8 rounded-full p-[2px]" style={{ backgroundColor: theme.styles.avatarBorder ? theme.colors.accentColor : "transparent" }}>
                      <div className="h-full w-full rounded-full" style={{ backgroundColor: theme.colors.cardColor }} />
                    </div>
                    <div className="h-1.5 w-10 rounded-full" style={{ backgroundColor: theme.colors.textColor, opacity: 0.5 }} />
                    <div className="mt-1 flex w-full flex-1 flex-col gap-1.5">
                      {[0, 1, 2].map((i) => <div key={i} className="flex h-5 w-full items-center px-2" style={linkStyle(theme)}>
                        <span className="h-1 w-2/3 rounded-full bg-current opacity-70" />
                      </div>)}
                    </div>
                    <span
                      className="absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-medium"
                      style={{ backgroundColor: `${theme.colors.textColor}1A`, color: theme.colors.textColor }}
                    >
                      {theme.name}
                    </span>
                    {active && (
                      <span className="absolute bottom-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white">
                        <Check className="h-3 w-3" />
                      </span>
                    )}
                  </button>
                );
              })}
                </div>
              </section>)}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
