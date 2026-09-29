import { Construction, type LucideIcon } from "lucide-react";

export function PlaceholderPage({
  title,
  description,
  icon: Icon = Construction,
}: {
  title: string;
  description: string;
  icon?: LucideIcon;
}) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col">
      <div>
        <h1 className="font-sans text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl dark:text-white">
          {title}
        </h1>
        <p className="mt-1.5 text-sm text-neutral-600 dark:text-neutral-400">{description}</p>
      </div>

      <div className="mt-10 flex flex-col items-center justify-center rounded-3xl border border-dashed border-neutral-300 bg-white px-6 py-24 text-center dark:border-white/15 dark:bg-neutral-900">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
          <Icon className="h-6 w-6" />
        </div>
        <h2 className="mt-5 font-sans text-lg font-semibold text-neutral-900 dark:text-white">
          {title} is coming soon
        </h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-400">
          We&apos;re still building this part of CreatorOS. Check back soon.
        </p>
      </div>
    </div>
  );
}
