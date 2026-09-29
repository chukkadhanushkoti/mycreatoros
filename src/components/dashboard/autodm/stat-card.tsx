import type { LucideIcon } from "lucide-react";

export function AutoDmStatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4 dark:border-white/10 dark:bg-neutral-900">
      <div className="flex items-center gap-2 text-neutral-400">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: `${color}1F`, color }}>
          <Icon className="h-4 w-4" />
        </div>
        <p className="text-xs font-medium">{label}</p>
      </div>
      <p className="mt-3 text-2xl font-semibold text-neutral-900 dark:text-white">{value}</p>
    </div>
  );
}
