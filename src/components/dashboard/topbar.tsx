"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutGrid, LogOut, PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useAuth } from "@/context/auth-context";
import { TOOL_MENUS } from "@/config/tool-menus";
import { isGeneralToolRoute } from "@/config/routes";

export function Topbar({
  collapsed,
  onToggleSidebarAction,
}: {
  collapsed: boolean;
  onToggleSidebarAction: () => void;
}) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openTool, setOpenTool] = useState<string | null>(null);
  const router = useRouter();

  const initial = user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || "?";
  const isPlatformsActive = !isGeneralToolRoute(pathname);

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:border-white/10 dark:bg-black/90 dark:supports-[backdrop-filter]:bg-black/70">
      <div className="flex h-16 items-center px-6 lg:px-8">
        <div className="mr-4 flex items-center">
          <button
            onClick={onToggleSidebarAction}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="mr-3 flex h-9 w-9 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/5 dark:hover:text-white"
          >
            {collapsed ? <PanelLeftOpen className="h-[18px] w-[18px]" /> : <PanelLeftClose className="h-[18px] w-[18px]" />}
          </button>
          <Link href="/dashboard" className="mr-8 flex items-center space-x-2">
            <span className="font-sans text-lg font-semibold text-neutral-900 dark:text-white">
              Creator<span className="text-orange-500">OS</span>
            </span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end gap-6">
          <nav className="hidden items-center gap-1 text-sm font-medium md:flex">
            <Link
              href="/dashboard"
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors",
                isPlatformsActive
                  ? "text-orange-600 dark:text-orange-400"
                  : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              )}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              Platforms
            </Link>

            {TOOL_MENUS.map((menu) => {
              const active = pathname.startsWith(menu.href);
              const open = openTool === menu.key;
              return (
                <div
                  key={menu.key}
                  className="relative"
                  onMouseEnter={() => setOpenTool(menu.key)}
                  onMouseLeave={() => setOpenTool((k) => (k === menu.key ? null : k))}
                >
                  <Link
                    href={menu.href}
                    className={cn(
                      "flex items-center rounded-full px-3 py-1.5 transition-colors",
                      active
                        ? "text-orange-600 dark:text-orange-400"
                        : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                    )}
                  >
                    {menu.label}
                  </Link>

                  <AnimatePresence>
                    {open && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute left-1/2 top-full w-80 -translate-x-1/2 pt-3"
                      >
                        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white p-2 shadow-lg dark:border-white/10 dark:bg-neutral-900">
                          {menu.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setOpenTool(null)}
                              className="flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-neutral-100 dark:hover:bg-white/5"
                            >
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
                                <item.icon className="h-4 w-4" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-neutral-900 dark:text-white">{item.label}</p>
                                <p className="mt-0.5 text-xs leading-snug text-neutral-500 dark:text-neutral-400">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            <Link
              href="/dashboard/tools/creator-studio"
              className={cn(
                "rounded-full px-3 py-1.5 transition-colors",
                pathname.startsWith("/dashboard/tools/creator-studio")
                  ? "text-orange-600 dark:text-orange-400"
                  : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              )}
            >
              Creator Studio
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Profile"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-sm font-semibold text-white"
              >
                {initial}
              </button>
              {menuOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 overflow-hidden rounded-2xl border border-neutral-200 bg-white py-1 shadow-md dark:border-white/10 dark:bg-neutral-900"
                  onMouseLeave={() => setMenuOpen(false)}
                >
                  <div className="border-b border-neutral-200 px-4 py-2.5 dark:border-white/10">
                    <p className="truncate text-sm font-medium text-neutral-900 dark:text-white">
                      {user?.name || "Account"}
                    </p>
                    <p className="truncate text-xs text-neutral-500 dark:text-neutral-400">{user?.email}</p>
                  </div>
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-white/5"
                  >
                    Settings
                  </Link>
                  <Link
                    href="/dashboard/connections"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-white/5"
                  >
                    Connected accounts
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-neutral-100 dark:text-red-400 dark:hover:bg-white/5"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
