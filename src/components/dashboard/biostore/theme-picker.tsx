"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { bioStoreThemes } from "@/config/biostore-themes";
import { cn } from "@/lib/utils";

function backgroundStyle(bg: string): React.CSSProperties {
  return bg.startsWith("linear-gradient") ? { backgroundImage: bg } : { backgroundColor: bg };
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
  const [preview, setPreview] = useState(currentTheme);

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
              <h3 className="text-base font-semibold text-neutral-900 dark:text-white">Choose a theme</h3>
              <button
                onClick={onCloseAction}
                className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100 dark:hover:bg-white/5"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {bioStoreThemes.map((theme) => {
                const active = preview === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => {
                      setPreview(theme.id);
                      onSelectAction(theme.id);
                    }}
                    className={cn(
                      "relative flex aspect-[3/4] flex-col items-center gap-1.5 overflow-hidden rounded-2xl border-2 p-3 pt-5 transition-colors",
                      active ? "border-orange-500" : "border-transparent"
                    )}
                    style={backgroundStyle(theme.colors.backgroundColor)}
                  >
                    <div
                      className="h-8 w-8 rounded-full"
                      style={{ backgroundColor: theme.colors.cardColor, border: `1px solid ${theme.colors.textColor}33` }}
                    />
                    <div className="h-1.5 w-10 rounded-full" style={{ backgroundColor: theme.colors.textColor, opacity: 0.5 }} />
                    <div className="mt-1 flex w-full flex-1 flex-col gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="h-4 w-full"
                          style={{
                            backgroundColor: theme.colors.cardColor,
                            borderRadius: Math.min(theme.styles.cardRadius, 10),
                          }}
                        />
                      ))}
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
