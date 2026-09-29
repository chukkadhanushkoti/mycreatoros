"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Plus, Settings } from "lucide-react";

import { cn } from "@/lib/utils";
import { usePlatforms } from "@/context/platforms-context";
import { PLATFORM_META, PLATFORM_NAV, PLATFORM_ORDER } from "@/config/platforms";
import type { SocialPlatform } from "@/lib/social-api";

function NavLink({
  href,
  label,
  icon: Icon,
  active,
  collapsed,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  active: boolean;
  collapsed: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-4 rounded-full py-3 text-base font-medium transition-colors",
        collapsed ? "justify-center px-0" : "px-4",
        active
          ? "bg-orange-500/10 text-orange-600 dark:text-orange-400"
          : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/5 dark:hover:text-white"
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      {!collapsed && label}
    </Link>
  );
}

export function Sidebar({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const { statuses } = usePlatforms();
  const [activeIndex, setActiveIndex] = useState(0);

  const connectedPlatforms = PLATFORM_ORDER.filter((key) => statuses[key]?.connected);

  useEffect(() => {
    if (activeIndex >= connectedPlatforms.length) setActiveIndex(0);
  }, [activeIndex, connectedPlatforms.length]);

  const isActive = (href: string) => (href === "/dashboard" ? pathname === href : pathname.startsWith(href));

  const activeKey: SocialPlatform | undefined = connectedPlatforms[activeIndex];
  const activeStatus = activeKey ? statuses[activeKey] : undefined;
  const activeMeta = activeKey ? PLATFORM_META[activeKey] : undefined;
  const navItems = activeKey ? PLATFORM_NAV[activeKey] : [];

  const cyclePlatform = (dir: 1 | -1) => {
    if (connectedPlatforms.length === 0) return;
    const nextIndex = (activeIndex + dir + connectedPlatforms.length) % connectedPlatforms.length;
    setActiveIndex(nextIndex);

    // If the current page isn't part of the newly-selected platform's services
    // (e.g. BioStore is Instagram-only), jump to that platform's own default page.
    const nextNav = PLATFORM_NAV[connectedPlatforms[nextIndex]];
    const stillValid = nextNav.some((item) =>
      item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href)
    );
    if (!stillValid && nextNav.length > 0) {
      router.push(nextNav[0].href);
    }
  };

  return (
    <aside
      className={cn(
        "sticky top-16 hidden h-[calc(100vh-4rem)] shrink-0 flex-col overflow-y-auto border-r border-neutral-200 bg-background py-6 transition-[width] duration-300 md:flex",
        collapsed ? "w-24 px-4" : "w-72 px-6 lg:px-8",
        "dark:border-white/10"
      )}
    >
      {/* Platform switcher */}
      <div className="flex flex-col items-center pb-8">
        <div className="flex items-center gap-2">
          {!collapsed && connectedPlatforms.length > 0 && (
            <button
              onClick={() => cyclePlatform(-1)}
              disabled={connectedPlatforms.length < 2}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition-colors hover:border-orange-300 hover:text-orange-600 disabled:opacity-40 disabled:hover:border-neutral-200 disabled:hover:text-neutral-500 dark:border-white/10 dark:text-neutral-400 dark:hover:border-orange-500/40 dark:hover:text-orange-400"
              aria-label="Previous platform"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}

          {activeKey && activeMeta ? (
            <div className="relative shrink-0">
              <div
                className={cn(
                  "flex items-center justify-center overflow-hidden rounded-full border border-neutral-200 bg-neutral-100 font-semibold text-neutral-700 dark:border-white/10 dark:bg-white/5 dark:text-neutral-200",
                  collapsed ? "h-14 w-14 text-base" : "h-24 w-24 text-xl"
                )}
              >
                {activeStatus?.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={activeStatus.avatar} alt={activeMeta.label} className="h-full w-full object-cover" />
                ) : (
                  <activeMeta.icon className={collapsed ? "h-6 w-6" : "h-9 w-9"} style={{ color: activeMeta.color }} />
                )}
              </div>
              <span
                className={cn(
                  "absolute bottom-0 right-0 flex items-center justify-center rounded-full border-2 border-background bg-white dark:border-neutral-950",
                  collapsed ? "h-6 w-6" : "h-8 w-8"
                )}
                style={{ color: activeMeta.color }}
              >
                <activeMeta.icon className={collapsed ? "h-3.5 w-3.5" : "h-4 w-4"} />
              </span>
            </div>
          ) : (
            <Link
              href="/dashboard/connections"
              className={cn(
                "flex shrink-0 items-center justify-center rounded-full border border-dashed border-neutral-300 text-neutral-400 transition-colors hover:border-orange-400 hover:text-orange-500 dark:border-white/15",
                collapsed ? "h-14 w-14" : "h-24 w-24"
              )}
              aria-label="Connect a platform"
            >
              <Plus className="h-6 w-6" />
            </Link>
          )}

          {!collapsed && connectedPlatforms.length > 0 && (
            <button
              onClick={() => cyclePlatform(1)}
              disabled={connectedPlatforms.length < 2}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition-colors hover:border-orange-300 hover:text-orange-600 disabled:opacity-40 disabled:hover:border-neutral-200 disabled:hover:text-neutral-500 dark:border-white/10 dark:text-neutral-400 dark:hover:border-orange-500/40 dark:hover:text-orange-400"
              aria-label="Next platform"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
        {!collapsed && (
          <p className="mt-4 text-base font-medium text-neutral-700 dark:text-neutral-300">
            {activeMeta ? activeMeta.label : "No account connected"}
          </p>
        )}
      </div>

      {/* Platform-specific services */}
      {!collapsed && (
        <span className="px-2 text-xs font-semibold uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
          Services
        </span>
      )}
      <nav className="mt-3 flex flex-col gap-1.5">
        {navItems.length > 0 ? (
          navItems.map((item) => (
            <NavLink key={item.href + item.label} {...item} active={isActive(item.href)} collapsed={collapsed} />
          ))
        ) : !collapsed ? (
          <p className="px-3 text-xs text-neutral-400 dark:text-neutral-500">
            Connect a platform to see tools for it here.
          </p>
        ) : null}
      </nav>

      {/* Settings pinned to bottom */}
      <div className="mt-auto pt-6">
        <Link
          href="/dashboard/settings"
          className={cn(
            "flex items-center gap-3 rounded-full border border-neutral-200 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:border-orange-300 hover:text-orange-600 dark:border-white/10 dark:text-neutral-300",
            collapsed ? "h-10 w-10 justify-center p-0" : "px-4"
          )}
        >
          <Settings className="h-4 w-4 shrink-0" />
          {!collapsed && "Settings"}
        </Link>
      </div>
    </aside>
  );
}
