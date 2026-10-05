import { ReactNode } from "react";
import Link from "next/link";

import { ThemeToggle } from "@/components/theme/theme-toggle";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-white/10 dark:bg-black/80 dark:supports-[backdrop-filter]:bg-black/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex items-center">
            <Link className="mr-8 flex items-center space-x-2" href="/">
              <span className="font-sans text-lg font-extrabold text-neutral-900 dark:text-white">
                Creator<span className="text-orange-500">OS</span>
              </span>
            </Link>
            <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
              <a className="transition-colors hover:text-orange-500 text-neutral-600 dark:text-neutral-400" href="#what-we-do">What we do</a>
              <a className="transition-colors hover:text-orange-500 text-neutral-600 dark:text-neutral-400" href="#services">Services</a>
              <a className="transition-colors hover:text-orange-500 text-neutral-600 dark:text-neutral-400" href="#pricing">Pricing</a>
              <a className="transition-colors hover:text-orange-500 text-neutral-600 dark:text-neutral-400" href="#faqs">FAQs</a>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end gap-3">
            <ThemeToggle />
            <nav className="flex items-center space-x-2">
              <Link href="/login" className="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-orange-500 transition-colors dark:text-neutral-300">Log in</Link>
              <Link href="/login" className="px-4 py-2 text-sm font-semibold bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors">Get Started</Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
