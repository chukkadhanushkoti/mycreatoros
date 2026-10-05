"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AtSign, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { authApi, ApiError } from "@/lib/api-client";
import { useAuth } from "@/context/auth-context";

export default function CompleteProfilePage() {
  const router = useRouter();
  const { setSession } = useAuth();

  const [tempToken, setTempToken] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("creatoros_google_setup_token");
    if (!token) {
      router.replace("/login");
      return;
    }
    const initial = setTimeout(() => setTempToken(token), 0);
    return () => clearTimeout(initial);
  }, [router]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!tempToken) return;
    setError(null);
    setLoading(true);
    try {
      const { accessToken, refreshToken, user } = await authApi.completeGoogleSetup({ tempToken, username });
      sessionStorage.removeItem("creatoros_google_setup_token");
      setSession({ accessToken, refreshToken }, user);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not complete setup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background px-6">
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-end px-6 py-6 lg:px-10">
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-sm"
      >
        <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-orange-600 dark:text-orange-400">
          <Sparkles className="h-3.5 w-3.5" />
          One last step
        </div>

        <h1 className="mt-6 font-sans text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          Choose your username
        </h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          This is how creators and fans will find you on CreatorOS.
        </p>

        {error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="relative">
            <AtSign className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="jordan_rivera"
              className="h-12 w-full rounded-2xl border border-neutral-200 bg-transparent pl-11 pr-4 text-sm text-neutral-900 outline-none transition-colors focus:border-orange-500 dark:border-white/10 dark:text-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !tempToken}
            className="flex h-12 w-full items-center justify-center rounded-full bg-orange-500 text-sm font-semibold text-white transition-colors hover:bg-orange-600 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Continue to dashboard"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
