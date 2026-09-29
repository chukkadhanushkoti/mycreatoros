import type { ReactNode } from "react";

/** A responsive iPhone-style device frame. Sizes itself via aspect-ratio so it scales cleanly across mobile, tablet and desktop. */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[320px]">
      {/* Side buttons */}
      <div className="absolute -left-[3px] top-24 h-8 w-[3px] rounded-l-sm bg-neutral-800 dark:bg-neutral-700" />
      <div className="absolute -left-[3px] top-36 h-12 w-[3px] rounded-l-sm bg-neutral-800 dark:bg-neutral-700" />
      <div className="absolute -left-[3px] top-52 h-12 w-[3px] rounded-l-sm bg-neutral-800 dark:bg-neutral-700" />
      <div className="absolute -right-[3px] top-32 h-16 w-[3px] rounded-r-sm bg-neutral-800 dark:bg-neutral-700" />

      {/* Chassis */}
      <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[2.75rem] border-[10px] border-neutral-900 bg-neutral-900 shadow-2xl dark:border-neutral-700">
        {/* Dynamic island */}
        <div className="absolute left-1/2 top-2 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />

        {/* Screen */}
        <div className="relative h-full w-full overflow-y-auto overflow-x-hidden rounded-[2rem] bg-white [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
