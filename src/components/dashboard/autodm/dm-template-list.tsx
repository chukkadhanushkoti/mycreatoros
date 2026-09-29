"use client";

import { Link as LinkIcon, Plus, Trash2 } from "lucide-react";

import type { DmButton, DmTemplate } from "@/lib/autodm-api";

const inputClass =
  "w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 outline-none transition-colors focus:border-orange-400 dark:border-white/10 dark:bg-neutral-800 dark:text-white";
const textareaClass = `${inputClass} resize-none`;

/** Editor for DM message variations, each optionally with up to `maxButtons` link buttons. */
export function DmTemplateList({
  values,
  onChangeAction,
  placeholder,
  max = 3,
  maxLength = 1000,
  maxButtons = 0,
}: {
  values: DmTemplate[];
  onChangeAction: (next: DmTemplate[]) => void;
  placeholder: string;
  max?: number;
  maxLength?: number;
  maxButtons?: number;
}) {
  const list = values.length > 0 ? values : [{ content: "" }];

  const update = (i: number, patch: Partial<DmTemplate>) => {
    const next = [...list];
    next[i] = { ...next[i], ...patch };
    onChangeAction(next);
  };

  const remove = (i: number) => onChangeAction(list.filter((_, idx) => idx !== i));

  const updateButton = (i: number, btnIndex: number, patch: Partial<DmButton>) => {
    const buttons = [...(list[i].buttons || [])];
    buttons[btnIndex] = { ...buttons[btnIndex], ...patch };
    update(i, { buttons });
  };

  const addButton = (i: number) => {
    const buttons = [...(list[i].buttons || []), { text: "", url: "" }];
    update(i, { buttons });
  };

  const removeButton = (i: number, btnIndex: number) => {
    const buttons = (list[i].buttons || []).filter((_, idx) => idx !== btnIndex);
    update(i, { buttons });
  };

  return (
    <div className="flex flex-col gap-4">
      {list.map((tpl, i) => (
        <div key={i} className="rounded-xl border border-neutral-200 p-3.5 dark:border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Variation {i + 1}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-400">
                {tpl.content.length}/{maxLength}
              </span>
              {list.length > 1 && (
                <button
                  onClick={() => remove(i)}
                  className="text-neutral-400 hover:text-red-500"
                  aria-label="Remove variation"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
          <textarea
            value={tpl.content}
            onChange={(e) => update(i, { content: e.target.value.slice(0, maxLength) })}
            placeholder={placeholder}
            rows={3}
            className={`${textareaClass} mt-1.5`}
          />

          {maxButtons > 0 && (
            <div className="mt-3 flex flex-col gap-2">
              <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                Buttons ({(tpl.buttons || []).length}/{maxButtons})
              </span>
              {(tpl.buttons || []).map((btn, bIdx) => (
                <div key={bIdx} className="flex items-center gap-2">
                  <input
                    value={btn.text}
                    onChange={(e) => updateButton(i, bIdx, { text: e.target.value })}
                    placeholder="Button text"
                    className={`${inputClass} flex-1`}
                  />
                  <div className="relative flex-1">
                    <LinkIcon className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
                    <input
                      value={btn.url || ""}
                      onChange={(e) => updateButton(i, bIdx, { url: e.target.value })}
                      placeholder="https://"
                      className={`${inputClass} pl-8`}
                    />
                  </div>
                  <button
                    onClick={() => removeButton(i, bIdx)}
                    className="shrink-0 text-neutral-400 hover:text-red-500"
                    aria-label="Remove button"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
              {(tpl.buttons || []).length < maxButtons && (
                <button
                  onClick={() => addButton(i)}
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-neutral-300 py-2 text-xs font-medium text-neutral-600 transition-colors hover:border-orange-300 hover:text-orange-600 dark:border-white/15 dark:text-neutral-400"
                >
                  <Plus className="h-3 w-3" />
                  Add button
                </button>
              )}
            </div>
          )}
        </div>
      ))}
      {list.length < max && (
        <button
          onClick={() => onChangeAction([...list, { content: "" }])}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-neutral-300 py-2.5 text-sm font-medium text-neutral-600 transition-colors hover:border-orange-300 hover:text-orange-600 dark:border-white/15 dark:text-neutral-400"
        >
          <Plus className="h-3.5 w-3.5" />
          Add variation ({list.length}/{max})
        </button>
      )}
    </div>
  );
}
