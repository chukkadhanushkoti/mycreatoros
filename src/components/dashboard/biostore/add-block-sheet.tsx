"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { BLOCK_TYPES } from "@/config/biostore-blocks";
import type { BioStoreBlockType } from "@/lib/biostore-api";

export function AddBlockSheet({
  open,
  onSelectAction,
  onCloseAction,
}: {
  open: boolean;
  onSelectAction: (type: BioStoreBlockType) => void;
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
            className="w-full max-w-md rounded-t-3xl bg-white p-5 sm:rounded-3xl dark:bg-neutral-900"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-neutral-900 dark:text-white">Add a block</h3>
              <button
                onClick={onCloseAction}
                className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100 dark:hover:bg-white/5"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {BLOCK_TYPES.map((b) => (
                <button
                  key={b.type}
                  onClick={() => onSelectAction(b.type)}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-neutral-200 p-4 transition-colors hover:border-orange-300 dark:border-white/10 dark:hover:border-orange-500/40"
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${b.color}1F`, color: b.color }}
                  >
                    <b.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">{b.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
