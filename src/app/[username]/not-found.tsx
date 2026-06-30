import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4 text-center">
      <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mb-6">
        <SearchX className="h-10 w-10 text-muted-foreground" />
      </div>
      <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-outfit mb-4">
        Creator Not Found
      </h1>
      <p className="text-muted-foreground max-w-[500px] mb-8 text-lg">
        We couldn't find a BioStore for this username. They might have changed their username or the account doesn't exist yet.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          Return Home
        </Link>
        <Link 
          href="/signup"
          className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          Claim this Username
        </Link>
      </div>
    </div>
  );
}
