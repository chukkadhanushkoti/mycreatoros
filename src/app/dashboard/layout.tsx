"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { useAuth } from "@/context/auth-context";
import { PlatformsProvider } from "@/context/platforms-context";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <PlatformsProvider>
      <DashboardShell>{children}</DashboardShell>
    </PlatformsProvider>
  );
}
