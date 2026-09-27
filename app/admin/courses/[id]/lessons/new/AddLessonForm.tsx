"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddLessonForm({ courseId }: { courseId: string }) {
  const router = useRouter();

  const [lessonNumber, setLessonNumber] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [excelUrl, setExcelUrl] = useState("");
  const [published, setPublished] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/admin/lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId,
          lessonNumber: Number(lessonNumber),
          title,
          description,
          durationMinutes: duration ? Number(duration) : null,
          videoUrl,
          pdfUrl,
          excelUrl,
          published,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to create lesson.");
        setSaving(false);
        return;
      }

      router.push(`/admin/courses/${courseId}/lessons`);
      router.refresh();
    } catch {
      setError("Unable to create lesson.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div>
        <label className="block text-sm font-semibold text-slate-700">Lesson Number</label>
        <input required type="number" min="1" value={lessonNumber}
          onChange={(e) => setLessonNumber(e.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
          placeholder="11" />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700">Lesson Title</label>
        <input required value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
          placeholder="Advanced Markdown Planning" />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700">Description</label>
        <textarea value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
          placeholder="Describe this lesson..." />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700">Duration (minutes)</label>
        <input type="number" min="0" value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
          placeholder="30" />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700">Video URL</label>
        <input type="url" value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
          placeholder="https://..." />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700">PDF / Notes URL</label>
        <input type="url" value={pdfUrl}
          onChange={(e) => setPdfUrl(e.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
          placeholder="https://..." />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700">Excel Workbook URL</label>
        <input type="url" value={excelUrl}
          onChange={(e) => setExcelUrl(e.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
          placeholder="https://..." />
      </div>

      <label className="flex items-center gap-3">
        <input type="checkbox" checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="h-5 w-5" />
        <span className="font-semibold text-slate-700">Publish lesson immediately</span>
      </label>

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</div>
      )}

      <button type="submit" disabled={saving}
        className="rounded-lg bg-[#0b1026] px-6 py-3 font-semibold text-white disabled:opacity-50">
        {saving ? "Saving..." : "Save Lesson"}
      </button>
    </form>
  );
}