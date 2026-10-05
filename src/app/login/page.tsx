"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, Sparkles, User, AtSign } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { cn } from "@/lib/utils";
import { authApi, ApiError } from "@/lib/api-client";
import { useAuth } from "@/context/auth-context";

type View = "login" | "signup" | "verify-otp" | "forgot-password" | "reset-password";

export default function LoginPage() {
  const router = useRouter();
  const { setSession } = useAuth();

  const [view, setView] = useState<View>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [slowNotice, setSlowNotice] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => setSlowNotice(true), 4000);
    return () => clearTimeout(timer);
  }, [loading]);

  // Shared form fields
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Carried between steps
  const [pendingUserId, setPendingUserId] = useState<string | null>(null);
  const [resetToken, setResetToken] = useState<string | null>(null);

  const mode: "login" | "signup" = view === "signup" ? "signup" : "login";

  const resetMessages = () => {
    setError(null);
    setInfo(null);
  };

  const handleLogin = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetMessages();
    setSlowNotice(false);
    setLoading(true);
    try {
      const { accessToken, refreshToken, user } = await authApi.signin({ email, password });
      setSession({ accessToken, refreshToken }, user);
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof ApiError && err.code === "EMAIL_NOT_VERIFIED" && err.userId) {
        setPendingUserId(err.userId);
        setInfo("We sent a fresh verification code to your email.");
        setView("verify-otp");
      } else if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Sign in failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetMessages();
    setSlowNotice(false);
    setLoading(true);
    try {
      const [firstName, ...rest] = fullName.trim().split(/\s+/);
      const lastName = rest.join(" ");
      const { userId } = await authApi.signup({ firstName, lastName, username, email, password });
      setPendingUserId(userId);
      setInfo("We sent a 6-digit code to your email.");
      setView("verify-otp");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetMessages();
    if (!pendingUserId) return;
    setSlowNotice(false);
    setLoading(true);
    try {
      const result = await authApi.verifyOtp({ userId: pendingUserId, otp, type: "verify_email" });
      if ("accessToken" in result) {
        setSession({ accessToken: result.accessToken, refreshToken: result.refreshToken }, result.user);
        router.push("/dashboard");
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!pendingUserId) return;
    resetMessages();
    try {
      await authApi.resendOtp({
        userId: pendingUserId,
        type: isVerifyingSignup ? "verify_email" : "reset_password",
      });
      setInfo("A new code is on its way.");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not resend code.");
    }
  };

  const handleForgotPassword = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetMessages();
    setSlowNotice(false);
    setLoading(true);
    try {
      const { userId } = await authApi.forgotPassword(email);
      setPendingUserId(userId ?? null);
      setInfo("If that email is registered, a reset code has been sent.");
      if (userId) setView("verify-otp");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyResetOtp = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetMessages();
    if (!pendingUserId) return;
    setSlowNotice(false);
    setLoading(true);
    try {
      const result = await authApi.verifyOtp({ userId: pendingUserId, otp, type: "reset_password" });
      if ("resetToken" in result) {
        setResetToken(result.resetToken);
        setView("reset-password");
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetMessages();
    if (!resetToken) return;
    setSlowNotice(false);
    setLoading(true);
    try {
      await authApi.resetPassword({ resetToken, newPassword });
      setInfo("Password updated. You can now log in.");
      setPassword("");
      setView("login");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not reset password.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    window.location.href = authApi.googleWebAuthUrl();
  };

  const isVerifyingSignup = view === "verify-otp" && !resetToken;

  return (
    <div className="relative flex min-h-screen w-full overflow-hidden bg-background [perspective:1600px]">
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-6 lg:px-10">
        <Link
          href="/"
          className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm transition-colors hover:text-orange-500 dark:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
        <ThemeToggle />
      </div>

      {/* Brand panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-orange-500 p-14 lg:flex">
        <div
          className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:26px_26px]"
          aria-hidden="true"
        />

        <div className="relative flex items-center gap-2 pt-10">
          <span className="font-sans text-xl font-extrabold text-white">
            Creator<span className="text-neutral-900">OS</span>
          </span>
        </div>

        <div className="relative max-w-md">
          <h2 className="font-sans text-4xl font-extrabold leading-tight text-white">
            Everything you need to run your creator business, in one place.
          </h2>
          <p className="mt-4 text-white/85">
            Join thousands of creators using CreatorOS to script content,
            host their BioStore and turn followers into revenue.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ transformPerspective: 1200 }}
          className="glass relative max-w-sm rounded-3xl p-6 shadow-2xl"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white">
              AB
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Amara Bello</p>
              <p className="text-xs text-white/70">@amara.creates</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/90">
            “CreatorOS cut my content planning time in half. The AI scripts
            actually sound like me.”
          </p>
        </motion.div>
      </div>

      {/* Form panel */}
      <div className="flex w-full items-center justify-center px-6 py-28 lg:w-1/2 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ transformPerspective: 1200 }}
          className="w-full max-w-sm"
        >
          <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-orange-600 dark:text-orange-400">
            <Sparkles className="h-3.5 w-3.5" />
            {view === "login" && "Welcome back"}
            {view === "signup" && "Start free today"}
            {view === "verify-otp" && "Almost there"}
            {view === "forgot-password" && "Reset password"}
            {view === "reset-password" && "Choose a new password"}
          </div>

          <h1 className="mt-6 font-sans text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            {view === "login" && "Log in to CreatorOS"}
            {view === "signup" && "Create your account"}
            {view === "verify-otp" && "Enter verification code"}
            {view === "forgot-password" && "Forgot your password?"}
            {view === "reset-password" && "Set a new password"}
          </h1>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            {view === "login" && "Enter your details to access your dashboard."}
            {view === "signup" && "Set up your creator dashboard in under a minute."}
            {view === "verify-otp" && `We sent a 6-digit code to ${email || "your email"}.`}
            {view === "forgot-password" && "Enter your email and we'll send you a reset code."}
            {view === "reset-password" && "Your new password must meet the strength requirements below."}
          </p>

          {(view === "login" || view === "signup") && (
            <>
              {/* Mode switch */}
              <div className="glass mt-6 flex items-center gap-1 rounded-full p-1.5">
                <button
                  type="button"
                  onClick={() => {
                    resetMessages();
                    setView("login");
                  }}
                  className={cn(
                    "flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    mode === "login" ? "bg-orange-500 text-white" : "text-neutral-500 dark:text-neutral-400"
                  )}
                >
                  Log in
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetMessages();
                    setView("signup");
                  }}
                  className={cn(
                    "flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    mode === "signup" ? "bg-orange-500 text-white" : "text-neutral-500 dark:text-neutral-400"
                  )}
                >
                  Sign up
                </button>
              </div>

              <button
                type="button"
                onClick={handleGoogle}
                className="mt-6 flex h-12 w-full items-center justify-center gap-3 rounded-full border border-neutral-200 bg-white text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-50 dark:border-white/10 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
              >
                <FcGoogle className="h-5 w-5" />
                Continue with Google
              </button>

              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-neutral-200 dark:bg-white/10" />
                <span className="text-xs font-medium uppercase tracking-wide text-neutral-400">
                  or continue with email
                </span>
                <div className="h-px flex-1 bg-neutral-200 dark:bg-white/10" />
              </div>
            </>
          )}

          {error && (
            <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
              {error}
            </div>
          )}
          {info && !error && (
            <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
              {info}
            </div>
          )}
          {loading && slowNotice && !error && (
            <div className="mb-4 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-400">
              Still working — our server may be waking up from sleep. This can take up to 30 seconds.
            </div>
          )}

          {view === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="h-12 w-full rounded-2xl border border-neutral-200 bg-transparent pl-11 pr-4 text-sm text-neutral-900 outline-none transition-colors focus:border-orange-500 dark:border-white/10 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="h-12 w-full rounded-2xl border border-neutral-200 bg-transparent pl-11 pr-11 text-sm text-neutral-900 outline-none transition-colors focus:border-orange-500 dark:border-white/10 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 transition-colors hover:text-neutral-600 dark:hover:text-neutral-200"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end text-sm">
                <button
                  type="button"
                  onClick={() => {
                    resetMessages();
                    setView("forgot-password");
                  }}
                  className="font-medium text-orange-600 hover:underline dark:text-orange-400"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-orange-500 text-sm font-semibold text-white transition-colors hover:bg-orange-600 disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </form>
          )}

          {view === "signup" && (
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Full name
                </label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jordan Rivera"
                    className="h-12 w-full rounded-2xl border border-neutral-200 bg-transparent pl-11 pr-4 text-sm text-neutral-900 outline-none transition-colors focus:border-orange-500 dark:border-white/10 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Username
                </label>
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
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="h-12 w-full rounded-2xl border border-neutral-200 bg-transparent pl-11 pr-4 text-sm text-neutral-900 outline-none transition-colors focus:border-orange-500 dark:border-white/10 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="h-12 w-full rounded-2xl border border-neutral-200 bg-transparent pl-11 pr-11 text-sm text-neutral-900 outline-none transition-colors focus:border-orange-500 dark:border-white/10 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 transition-colors hover:text-neutral-600 dark:hover:text-neutral-200"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                  At least 8 characters, with uppercase, lowercase, a number and a symbol.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-orange-500 text-sm font-semibold text-white transition-colors hover:bg-orange-600 disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </form>
          )}

          {view === "verify-otp" && (
            <form onSubmit={isVerifyingSignup ? handleVerifyOtp : handleVerifyResetOtp} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Verification code
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="123456"
                  className="h-12 w-full rounded-2xl border border-neutral-200 bg-transparent px-4 text-center text-lg tracking-[0.5em] text-neutral-900 outline-none transition-colors focus:border-orange-500 dark:border-white/10 dark:text-white"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-orange-500 text-sm font-semibold text-white transition-colors hover:bg-orange-600 disabled:opacity-60"
              >
                {loading ? "Verifying..." : "Verify"}
              </button>

              <button
                type="button"
                onClick={handleResendOtp}
                className="w-full text-center text-sm font-medium text-orange-600 hover:underline dark:text-orange-400"
              >
                Resend code
              </button>
            </form>
          )}

          {view === "forgot-password" && (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="h-12 w-full rounded-2xl border border-neutral-200 bg-transparent pl-11 pr-4 text-sm text-neutral-900 outline-none transition-colors focus:border-orange-500 dark:border-white/10 dark:text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-orange-500 text-sm font-semibold text-white transition-colors hover:bg-orange-600 disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send reset code"}
              </button>
            </form>
          )}

          {view === "reset-password" && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  New password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="h-12 w-full rounded-2xl border border-neutral-200 bg-transparent pl-11 pr-11 text-sm text-neutral-900 outline-none transition-colors focus:border-orange-500 dark:border-white/10 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 transition-colors hover:text-neutral-600 dark:hover:text-neutral-200"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-orange-500 text-sm font-semibold text-white transition-colors hover:bg-orange-600 disabled:opacity-60"
              >
                {loading ? "Saving..." : "Set new password"}
              </button>
            </form>
          )}

          {(view === "login" || view === "signup") && (
            <p className="mt-8 text-center text-sm text-neutral-600 dark:text-neutral-400">
              {mode === "login" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <button
                    onClick={() => {
                      resetMessages();
                      setView("signup");
                    }}
                    className="font-semibold text-orange-600 hover:underline dark:text-orange-400"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => {
                      resetMessages();
                      setView("login");
                    }}
                    className="font-semibold text-orange-600 hover:underline dark:text-orange-400"
                  >
                    Log in
                  </button>
                </>
              )}
            </p>
          )}

          {(view === "verify-otp" || view === "forgot-password" || view === "reset-password") && (
            <button
              type="button"
              onClick={() => {
                resetMessages();
                setView("login");
              }}
              className="mt-8 flex w-full items-center justify-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-orange-500 dark:text-neutral-400"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to log in
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
