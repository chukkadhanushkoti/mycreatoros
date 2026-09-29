"use client";

import { Plus, Trash2 } from "lucide-react";

const textareaClass =
  "w-full resize-none rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 outline-none transition-colors focus:border-orange-400 dark:border-white/10 dark:bg-neutral-800 dark:text-white";

/** Editor for a list of plain-string message variations (e.g. public reply templates). */
export function StringTemplateList({
  values,
  onChangeAction,
  placeholder,
  max = 5,
  maxLength = 500,
}: {
  values: string[];
  onChangeAction: (next: string[]) => void;
  placeholder: string;
  max?: number;
  maxLength?: number;
}) {
  const list = values.length > 0 ? values : [""];

  const update = (i: number, val: string) => {
    const next = [...list];
    next[i] = val;
    onChangeAction(next);
  };

  const remove = (i: number) => onChangeAction(list.filter((_, idx) => idx !== i));

  return (
    <div className="flex flex-col gap-3">
      {list.map((val, i) => (
        <div key={i}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Variation {i + 1}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-400">
                {val.length}/{maxLength}
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
            value={val}
            onChange={(e) => update(i, e.target.value.slice(0, maxLength))}
            placeholder={placeholder}
            rows={3}
            className={`${textareaClass} mt-1`}
          />
        </div>
      ))}
      {list.length < max && (
        <button
          onClick={() => onChangeAction([...list, ""])}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-neutral-300 py-2.5 text-sm font-medium text-neutral-600 transition-colors hover:border-orange-300 hover:text-orange-600 dark:border-white/15 dark:text-neutral-400"
        >
          <Plus className="h-3.5 w-3.5" />
          Add variation ({list.length}/{max})
        </button>
      )}
    </div>
  );
}
