"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCourseForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/admin/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          price: Number(price),
          description,
          published,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to create course.");
        setSaving(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Unable to create course.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div>
        <label className="block text-sm font-semibold text-slate-700">
          Course Name
        </label>
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
          placeholder="e.g. Fashion Retail Business Management"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700">
          Price (₹)
        </label>
        <input
          required
          type="number"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
          placeholder="9999"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
          placeholder="Describe the course..."
        />
      </div>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="h-5 w-5"
        />
        <span className="font-semibold text-slate-700">
          Publish course immediately
        </span>
      </label>

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={saving}
        className="rounded-lg bg-[#0b1026] px-6 py-3 font-semibold text-white disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Course"}
      </button>
    </form>
  );
}
