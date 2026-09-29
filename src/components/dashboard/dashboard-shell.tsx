"use client";

import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import { isGeneralToolRoute } from "@/config/routes";
import { cn } from "@/lib/utils";

export function DashboardShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const showSidebar = !isGeneralToolRoute(pathname);

  return (
    <div className="min-h-screen bg-background">
      <Topbar collapsed={collapsed} onToggleSidebarAction={() => setCollapsed((v) => !v)} />
      <div className="flex">
        {showSidebar && <Sidebar collapsed={collapsed} />}
        <main className={cn("min-w-0 flex-1 px-6 py-10 lg:px-8")}>{children}</main>
      </div>
    </div>
  );
}
