import { cn } from "@/lib/utils";

export function Skeleton({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return <div className={cn("skeleton rounded-lg", className)} style={style} />;
}

export function BioStoreDashboardSkeleton() {
  return (
    <div className="mx-auto max-w-5xl">
      <Skeleton className="h-52 rounded-3xl" />

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-neutral-200 p-4 dark:border-white/10">
            <Skeleton className="h-9 w-9 rounded-xl" />
            <Skeleton className="mt-3 h-6 w-10" />
            <Skeleton className="mt-2 h-3 w-14" />
          </div>
        ))}
      </div>

      <Skeleton className="mt-8 h-3 w-24" />
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2 rounded-2xl border border-neutral-200 p-4 dark:border-white/10">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="h-3 w-12" />
          </div>
        ))}
      </div>

      <Skeleton className="mt-8 h-16 rounded-2xl" />
    </div>
  );
}

export function BioStoreEditorSkeleton() {
  return (
    <div className="mx-auto max-w-6xl pb-20">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-8 w-20 rounded-full" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
        <div className="flex min-w-0 flex-col gap-6">
          <div className="rounded-2xl border border-neutral-200 p-5 dark:border-white/10">
            <Skeleton className="h-4 w-16" />
            <div className="mt-4 flex items-center gap-4">
              <Skeleton className="h-16 w-16 shrink-0 rounded-full" />
              <Skeleton className="h-9 flex-1 rounded-xl" />
            </div>
            <Skeleton className="mt-3 h-14 w-full rounded-xl" />
          </div>

          <div className="rounded-2xl border border-neutral-200 p-5 dark:border-white/10">
            <Skeleton className="h-4 w-14" />
            <div className="mt-4 flex gap-2.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-11 w-11 shrink-0 rounded-full" />
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-5 dark:border-white/10">
            <Skeleton className="h-4 w-14" />
            <div className="mt-4 flex flex-col gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-14 w-full rounded-xl" />
              ))}
              <Skeleton className="mt-1 h-12 w-full rounded-xl" />
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-24">
            <div className="relative mx-auto w-full max-w-[320px]">
              <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[2.75rem] border-[10px] border-neutral-900 bg-neutral-900 shadow-2xl dark:border-neutral-700">
                <div className="absolute left-1/2 top-2 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
                <div className="flex h-full w-full flex-col items-center rounded-[2rem] bg-white px-4 pb-10 pt-9">
                  <Skeleton className="h-20 w-20 rounded-full" />
                  <Skeleton className="mt-3 h-4 w-24" />
                  <Skeleton className="mt-2 h-3 w-32" />
                  <div className="mt-5 flex w-full flex-col gap-2.5">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton key={i} className="h-12 w-full rounded-2xl" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BioStoreAnalyticsSkeleton() {
  return (
    <div className="mx-auto max-w-4xl">
      <Skeleton className="h-5 w-16" />
      <Skeleton className="mt-4 h-8 w-40" />

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-neutral-200 p-4 dark:border-white/10">
            <Skeleton className="h-9 w-9 rounded-xl" />
            <Skeleton className="mt-3 h-6 w-10" />
            <Skeleton className="mt-2 h-3 w-14" />
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-neutral-200 p-5 dark:border-white/10">
        <Skeleton className="h-4 w-24" />
        <div className="mt-5 flex h-40 items-end justify-between gap-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="w-full" style={{ height: `${30 + (i % 4) * 15}%` }} />
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-neutral-200 p-5 dark:border-white/10">
        <Skeleton className="h-4 w-32" />
        <div className="mt-4 flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-full rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function BioStoreSettingsSkeleton() {
  return (
    <div className="mx-auto max-w-2xl">
      <Skeleton className="h-5 w-16" />
      <Skeleton className="mt-4 h-8 w-52" />

      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="mt-6 rounded-2xl border border-neutral-200 p-5 dark:border-white/10">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="mt-4 h-10 w-full rounded-xl" />
        </div>
      ))}
    </div>
  );
}
