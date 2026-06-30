import { ReactNode } from "react";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center mx-auto px-4">
          <div className="mr-4 hidden md:flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <span className="hidden font-bold sm:inline-block font-outfit">CreatorOS</span>
            </a>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/features">Features</a>
              <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/pricing">Pricing</a>
              <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/about">About</a>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-2">
              <a href="/login" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">Log in</a>
              <a href="/signup" className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors">Get Started</a>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row mx-auto px-4">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by <a href="#" className="font-medium underline underline-offset-4">CreatorOS Inc</a>. The source code is available on <a href="#" className="font-medium underline underline-offset-4">GitHub</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
