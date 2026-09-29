"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { authApi } from "@/lib/api-client";
import { useAuth } from "@/context/auth-context";

/**
 * The backend's Google web OAuth callback redirects here with tokens (or a
 * google_setup_token for brand-new accounts) in the query string. Pick them
 * up once, persist the session, then strip them from the URL.
 */
export function AuthRedirectHandler() {
  const router = useRouter();
  const { setSession } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authToken = params.get("auth_token");
    const refreshToken = params.get("refresh_token");
    const googleSetupToken = params.get("google_setup_token");
    const authError = params.get("auth_error");

    if (googleSetupToken) {
      sessionStorage.setItem("creatoros_google_setup_token", googleSetupToken);
      router.replace("/login/complete-profile");
      return;
    }

    if (authToken && refreshToken) {
      authApi
        .me(authToken)
        .then(({ user }) => {
          setSession({ accessToken: authToken, refreshToken }, user);
          router.replace("/dashboard");
        })
        .catch(() => {
          router.replace("/login?auth_error=session_failed");
        });
      return;
    }

    if (authError) {
      router.replace(`/login?auth_error=${encodeURIComponent(authError)}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
