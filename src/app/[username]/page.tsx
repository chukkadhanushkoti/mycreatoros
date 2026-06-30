import { notFound } from "next/navigation";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { BlockRenderer } from "@/components/biostore/BlockRenderer";

// Mock fetching function until the backend is fully connected
async function getBioStoreData(username: string) {
  // Try to fetch from backend if API URL is set, otherwise use the live backend
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://creatoros-backend-rb5b.onrender.com/api';
    const res = await fetch(`${apiUrl}/biostore/${username}`, { next: { revalidate: 10 } });
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

// Map themes to CSS classes
const themeStyles: Record<string, string> = {
  classic: "bg-white text-black",
  dark: "bg-black text-white",
  minimal: "bg-neutral-50 text-neutral-900",
  glass: "bg-blue-50 text-blue-900",
  gradient: "bg-gradient-to-br from-purple-500 to-indigo-600 text-white",
};

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

  const themeClass = themeStyles[bioStore.theme] || themeStyles.classic;

  return (
    <div className={`min-h-screen flex flex-col items-center py-12 px-4 sm:px-6 transition-colors duration-300 ${themeClass}`}>
      <div className="w-full max-w-2xl mx-auto space-y-8">
        
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-white/20 shadow-md bg-black/5">
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
            <p className="mt-2 opacity-80">{bioStore.bio}</p>
          </div>
        </div>

        {/* Blocks Section */}
        <div className="flex flex-col space-y-4 w-full pt-4">
          {bioStore.blocks.sort((a: any, b: any) => a.order - b.order).map((block: any, idx: number) => (
            <BlockRenderer key={block._id || idx} block={block} username={bioStore.username} theme={bioStore.theme} />
          ))}
        </div>
      </div>
      
      {/* Branding Footer */}
      {!bioStore.isPremium && (
        <div className="mt-16 pb-8">
          <a href="/" className="text-sm opacity-60 hover:opacity-100 transition-opacity font-medium flex items-center gap-2">
            Powered by <span className="font-outfit font-bold">CreatorOS</span>
          </a>
        </div>
      )}
    </div>
  );
}
