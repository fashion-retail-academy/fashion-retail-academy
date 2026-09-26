"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Course = {
  id: string;
  title: string;
  price: number;
  description: string | null;
  published: boolean;
};

type CourseEditFormProps = {
  course: Course;
};

export default function CourseEditForm({
  course,
}: CourseEditFormProps) {
  const supabase = createClient();

  const [title, setTitle] = useState(course.title);
  const [price, setPrice] = useState(String(course.price));
  const [description, setDescription] = useState(
    course.description || ""
  );
  const [published, setPublished] = useState(course.published);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSave() {
    setSaving(true);
    setMessage("");
    setError("");

    const { error } = await supabase
      .from("courses")
      .update({
        title,
        price: Number(price),
        description,
        published,
      })
      .eq("id", course.id);

    if (error) {
      setError(error.message);
      setSaving(false);
      return;
    }

    setMessage("Course updated successfully.");
    setSaving(false);
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-slate-700">
          Course Name
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700">
          Price (₹)
        </label>

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
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
          Published
        </span>
      </label>

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="rounded-lg bg-[#0b1026] px-6 py-3 font-semibold text-white"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>

      {message && (
        <p className="font-semibold text-green-600">
          {message}
        </p>
      )}

      {error && (
        <p className="font-semibold text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}