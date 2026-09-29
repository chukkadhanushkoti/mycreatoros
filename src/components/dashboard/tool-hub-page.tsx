import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

import { PlaceholderPage } from "@/components/dashboard/placeholder-page";
import { TOOL_MENUS, type ToolMenuItem } from "@/config/tool-menus";

/** Renders the "coming soon" placeholder for a single sub-tool, looked up by its href. */
export function ToolItemPage({ href }: { href: string }) {
  const item = TOOL_MENUS.flatMap((menu) => menu.items).find((i) => i.href === href);
  if (!item) return null;
  return <PlaceholderPage title={item.label} description={item.description} icon={item.icon} />;
}

export function ToolHubPage({
  title,
  description,
  icon: Icon,
  items,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  items: ToolMenuItem[];
}) {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-sans text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">
            {title}
          </h1>
          <p className="mt-0.5 text-sm text-neutral-600 dark:text-neutral-400">{description}</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-start gap-4 rounded-2xl border border-neutral-200 bg-white p-5 transition-colors hover:border-orange-300 dark:border-white/10 dark:bg-neutral-900 dark:hover:border-orange-500/40"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600 dark:bg-white/5 dark:text-neutral-300">
              <item.icon className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-neutral-900 dark:text-white">{item.label}</p>
              <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">{item.description}</p>
            </div>
            <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-neutral-300 transition-transform group-hover:translate-x-0.5 group-hover:text-orange-500 dark:text-neutral-600" />
          </Link>
        ))}
      </div>
    </div>
  );
}
