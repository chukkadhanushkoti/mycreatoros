import type { Metadata } from "next";
import { Outfit, Poppins } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { AuthProvider } from "@/context/auth-context";
import { AuthRedirectHandler } from "@/components/auth/auth-redirect-handler";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CreatorOS | Build, Grow and Monetize your Creator Business",
    template: "%s | CreatorOS",
  },
  description: "The ultimate platform for creators to build, grow, and monetize their business with AI.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://mycreatoros.app"),
};

const noFlashScript = `
  try {
    const stored = localStorage.getItem('theme');
    const theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${outfit.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider>
          <AuthProvider>
            <AuthRedirectHandler />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
