"use client";

import { useState } from "react";

type Lesson = {
  id: string;
  course_id: string;
  lesson_number: number;
  title: string;
  slug: string;
  description: string | null;
  video_url: string | null;
  duration_minutes: number | null;
  published: boolean;
  resource_url: string | null;
  workbook_url: string | null;
};

type Props = {
  lesson: Lesson;
};

export default function LessonEditForm({ lesson }: Props) {
  const [lessonNumber, setLessonNumber] = useState(String(lesson.lesson_number));
  const [title, setTitle] = useState(lesson.title);
  const [description, setDescription] = useState(lesson.description || "");
  const [duration, setDuration] = useState(
    lesson.duration_minutes ? String(lesson.duration_minutes) : ""
  );
  const [videoUrl, setVideoUrl] = useState(lesson.video_url || "");
  const [resourceUrl, setResourceUrl] = useState(lesson.resource_url || "");
  const [workbookUrl, setWorkbookUrl] = useState(lesson.workbook_url || "");
  const [published, setPublished] = useState(lesson.published);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSave() {
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/admin/lessons", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: lesson.id,
          lesson_number: lessonNumber,
          title,
          description,
          duration_minutes: duration,
          video_url: videoUrl,
          resource_url: resourceUrl,
          workbook_url: workbookUrl,
          published,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Unable to save lesson.");
        setSaving(false);
        return;
      }

      setMessage("Lesson updated successfully.");
    } catch {
      setError("Something went wrong while saving.");
    }

    setSaving(false);
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-slate-700">
          Lesson Number
        </label>
        <input
          type="number"
          value={lessonNumber}
          onChange={(e) => setLessonNumber(e.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700">
          Lesson Title
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
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700">
          Duration (minutes)
        </label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700">
          Video URL
        </label>
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="https://..."
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700">
          PDF / Notes URL
        </label>
        <input
          type="text"
          value={resourceUrl}
          onChange={(e) => setResourceUrl(e.target.value)}
          placeholder="/resources/lesson-notes.pdf"
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700">
          Excel Workbook URL
        </label>
        <input
          type="text"
          value={workbookUrl}
          onChange={(e) => setWorkbookUrl(e.target.value)}
          placeholder="/resources/lesson-workbook.xlsx"
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
        className="rounded-lg bg-[#0b1026] px-6 py-3 font-semibold text-white disabled:opacity-50"
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
