"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setMessage("Login successful! Welcome to Fashion Retail Academy.");

    setTimeout(() => {
      fetch("/api/auth/redirect").then(r => r.json()).then(d => window.location.href = d.destination);
    }, 700);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-lg">

        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold tracking-[0.25em] text-slate-400">
            FASHION RETAIL ACADEMY
          </p>

          <h1 className="text-4xl font-bold">
            Welcome Back
          </h1>

          <p className="mt-4 text-slate-400">
            Login to access your courses and student dashboard.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-8 text-slate-950 shadow-2xl">

          <form onSubmit={handleLogin}>

            <div className="mb-6">
              <label className="mb-2 block font-semibold">
                Email *
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none focus:border-slate-950"
              />
            </div>

            <div className="mb-6">
              <label className="mb-2 block font-semibold">
                Password *
              </label>

              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none focus:border-slate-950"
              />
            </div>

            {error && (
              <div className="mb-5 rounded-xl bg-red-50 p-4 text-red-700">
                {error}
              </div>
            )}

            {message && (
              <div className="mb-5 rounded-xl bg-green-50 p-4 text-green-700">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-slate-950 px-6 py-4 font-bold text-white hover:bg-slate-800 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <p className="mt-6 text-center text-slate-500">
            Don't have an account?{" "}
            <a
              href="/Register"
              className="font-bold text-slate-950"
            >
              Register
            </a>
          </p>

        </div>
      </div>
    </main>
  );
}
