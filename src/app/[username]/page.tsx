import { notFound } from "next/navigation";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { BlockRenderer } from "@/components/biostore/BlockRenderer";
import { BackgroundEffects } from "@/components/biostore/BackgroundEffects";
import { bioStoreThemes } from "@/config/biostore-themes";

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

// Mock fetching function until the backend is fully connected
async function getBioStoreData(username: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://creatoros-backend-rb5b.onrender.com/api';
    const res = await fetch(`${apiUrl}/biostore/${username}`, { cache: 'no-store' });
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

const RESERVED_USERNAMES = [
  "admin", "login", "signup", "dashboard", "pricing", "blog", "about", 
  "contact", "privacy", "terms", "support", "settings", "api", "search", 
  "features", "careers", "jobs", "status", "docs"
];

export default async function BioStorePage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  const username = resolvedParams.username.toLowerCase();

  if (RESERVED_USERNAMES.includes(username)) {
    notFound();
  }

  const bioStore = await getBioStoreData(username);

  if (!bioStore || bioStore.status !== 'published') {
    notFound();
  }

  // Determine theme
  const baseTheme = bioStoreThemes.find(t => t.id === bioStore.theme) || bioStoreThemes[0];
  
  // Apply overrides if any
  const themeData = { ...baseTheme };
  if (bioStore.themeOverrides) {
    Object.assign(themeData, bioStore.themeOverrides);
  }

  // Parse background
  let bgStyle: any = { backgroundColor: '#000000' };
  const colors = themeData.colors || {};
  const styles = themeData.styles || {};
  const background = colors.backgroundColor || '#000000';
  
  if (background.startsWith('linear-gradient')) {
    bgStyle.backgroundImage = background;
  } else {
    bgStyle.backgroundColor = background;
  }

  const bgEffect: string = (styles as any).bgEffect || 'none';
  const themeColorForMeta = background.startsWith('linear-gradient') ? '#000000' : background;

  return (
    <>
      <meta name="theme-color" content={themeColorForMeta} />
      <div 
        className="min-h-screen w-full flex flex-col items-center py-12 px-4 sm:px-6 transition-all duration-500 relative" 
        style={{ ...bgStyle, fontFamily: themeData.typography?.fontFamily }}
      >
      <BackgroundEffects effect={bgEffect} themeData={themeData} />
      
      <div className="w-full max-w-2xl mx-auto space-y-8 relative z-10 pt-8">
        
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div 
             className="relative h-28 w-28 overflow-hidden shadow-lg"
             style={{ 
               borderRadius: '9999px',
               borderColor: colors.textColor,
               borderWidth: '3px',
               borderStyle: 'solid'
             }}
          >
            <Image 
              src={bioStore.profileImage || "/placeholder-avatar.png"} 
              alt={bioStore.displayName}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
          
          <div>
            <h1 
              className="text-2xl font-bold flex items-center justify-center gap-2"
              style={{ color: colors.textColor }}
            >
              {bioStore.displayName}
              {bioStore.isVerified && (
                <CheckCircle2 className="w-5 h-5 text-blue-500" />
              )}
            </h1>
            <p className="mt-2 opacity-80" style={{ color: colors.textColor }}>{bioStore.bio}</p>
          </div>
        </div>

        {/* Blocks Section */}
        <div className="flex flex-col gap-3 w-full pt-4">
          {bioStore.blocks.sort((a: any, b: any) => a.order - b.order).map((block: any, idx: number) => (
            <BlockRenderer key={block._id || idx} block={block} username={bioStore.username} themeData={themeData} index={idx + 1} />
          ))}
        </div>
      </div>
      
      {/* Branding Footer */}
      {!bioStore.isPremium && (
        <div className="mt-16 pb-8">
          <a href="/" className="text-sm opacity-60 hover:opacity-100 transition-opacity font-medium flex items-center gap-2" style={{ color: colors.textColor }}>
            Powered by <span className="font-bold">CreatorOS</span>
          </a>
        </div>
      )}
    </div>
    </>
  );
}
