"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const supabase = createClient();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    mobile: "",
    whatsapp: "",
    city: "",
    experience: "",
    roleTitle: "",
    company: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

async function handleSubmit(e: FormEvent) {
  e.preventDefault();

  setLoading(true);
  setError("");
  setMessage("");

  const { data, error } = await supabase.auth.signUp({
    email: form.email,
    password: form.password,
    options: {
      emailRedirectTo: "https://www.fashionretailacademy.com",
      data: {
        full_name: form.fullName,
        mobile: form.mobile,
        whatsapp: form.whatsapp,
        city: form.city,
        experience: form.experience,
        role_title: form.roleTitle,
        company: form.company,
      },
    },
  });

  if (error) {
    setError(error.message);
    setLoading(false);
    return;
  }

  if (data.user) {
    setMessage(
      "Account created successfully! Please check your email and click the confirmation link to activate your account."
    );
  }

  setLoading(false);
}  

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center text-white">
          <p className="mb-3 text-sm font-semibold tracking-[0.25em] text-slate-400">
            FASHION RETAIL ACADEMY
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            Create Your Account
          </h1>

          <p className="mt-4 text-slate-400">
            Register to access courses, templates and your student dashboard.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-2xl md:p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Full Name *
              </label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                placeholder="Your full name"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
                placeholder="Minimum 6 characters"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Mobile
                </label>
                <input
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  WhatsApp
                </label>
                <input
                  name="whatsapp"
                  value={form.whatsapp}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                City
              </label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Mumbai, Delhi, Bangalore..."
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Experience
                </label>
                <input
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  placeholder="0-2 years"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Current Role
                </label>
                <input
                  name="roleTitle"
                  value={form.roleTitle}
                  onChange={handleChange}
                  placeholder="Merchandiser, Buyer..."
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Company
              </label>
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Current / Previous Company"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            {message && (
              <div className="rounded-lg bg-green-50 p-4 text-sm text-green-700">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-slate-950 px-6 py-4 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold text-slate-900 hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}