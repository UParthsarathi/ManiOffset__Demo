"use client";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/";
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const message = error ?? searchParams.get("message");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Already signed in → skip the login page.
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.replace(nextPath);
    });
  }, [router, nextPath]);

  const finishLogin = () => {
    router.replace(nextPath);
    router.refresh();
  };

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    const supabase = createClient();

    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      finishLogin();
      return;
    }

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    // With email confirmation ON there is no session yet — tell them to check mail.
    if (data.session) {
      finishLogin();
    } else {
      setInfo("Account created. Check your email for a confirmation link, then sign in.");
      setMode("signin");
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full min-h-screen items-center justify-center bg-[#0d1430] relative overflow-hidden px-4">
      {/* Background ambient light */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#005fb3] rounded-full blur-[128px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-slate-500 rounded-full blur-[128px] opacity-10 pointer-events-none" />

      <div className="relative flex flex-col w-full max-w-md bg-[#020513]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 sm:p-10 z-10">
        <div className="flex justify-center mb-8">
          <div className="relative h-12 w-48">
            <Image
              src="/logo.png"
              alt="Mani Offset Logo"
              fill
              sizes="192px"
              className="object-contain"
              priority
            />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2 text-center text-white">Welcome to Mani Offset</h1>
        <p className="text-slate-400 text-center mb-8 text-sm">
          Sign in to track your quotes and orders.
        </p>

        {message && (
          <div className="mb-6 p-4 text-sm bg-red-500/10 border border-red-500/20 text-red-400 text-center rounded-lg">
            {message}
          </div>
        )}
        {info && (
          <div className="mb-6 p-4 text-sm bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-center rounded-lg">
            {info}
          </div>
        )}

        <form onSubmit={handleEmail} className="space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            autoComplete="email"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-white/30"
          />
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={mode === "signup" ? "Password (min 6 characters)" : "Password"}
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-white/30"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#005fb3] hover:bg-[#0070d1] text-white font-medium rounded-lg px-4 py-3 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Please wait…" : mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <button
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setError(null);
            setInfo(null);
          }}
          className="mt-3 text-sm text-slate-400 hover:text-white transition-colors"
        >
          {mode === "signin" ? "New here? Create an account" : "Already have an account? Sign in"}
        </button>

        <p className="text-center text-xs text-slate-500 mt-5">
          You can browse products and get quotes without an account.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to site
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  );
}
