import { notFound } from "next/navigation";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { BlockRenderer } from "@/components/biostore/BlockRenderer";

// Mock fetching function until the backend is fully connected
async function getBioStoreData(username: string) {
  // Try to fetch from backend if API URL is set, otherwise return mock data
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'}/biostore/${username}`, { next: { revalidate: 60 } });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch data');
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching BioStore data:", error);
    return null;
  }
}

// Reserved system routes that should never be treated as usernames
const RESERVED_USERNAMES = [
  "admin", "login", "signup", "dashboard", "pricing", "blog", "about", 
  "contact", "privacy", "terms", "support", "settings", "api", "search", 
  "features", "careers", "jobs", "status", "docs"
];

export default async function BioStorePage({ params }: { params: Promise<{ username: string }> }) {
  // Since Next 15, params is a Promise
  const resolvedParams = await params;
  const username = resolvedParams.username.toLowerCase();

  if (RESERVED_USERNAMES.includes(username)) {
    notFound();
  }

  const bioStore = await getBioStoreData(username);

  // If not found or not published, return 404
  if (!bioStore || bioStore.published === false) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-2xl mx-auto space-y-8">
        
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-border">
            <Image 
              src={bioStore.profileImage || "/placeholder-avatar.png"} 
              alt={bioStore.displayName}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
          
          <div>
            <h1 className="text-2xl font-bold font-outfit flex items-center justify-center gap-2">
              {bioStore.displayName}
              {bioStore.isVerified && (
                <CheckCircle2 className="w-5 h-5 text-blue-500" />
              )}
            </h1>
            <p className="text-muted-foreground mt-2">{bioStore.bio}</p>
          </div>
        </div>

        {/* Blocks Section */}
        <div className="flex flex-col space-y-4 w-full pt-4">
          {bioStore.blocks.sort((a: any, b: any) => a.order - b.order).map((block: any, idx: number) => (
            <BlockRenderer key={block._id || idx} block={block} username={bioStore.username} />
          ))}
        </div>
      </div>
      
      {/* Branding Footer */}
      {!bioStore.isPremium && (
        <div className="mt-16 pb-8">
          <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium flex items-center gap-2">
            Powered by <span className="font-outfit font-bold">CreatorOS</span>
          </a>
        </div>
      )}
    </div>
  );
}
