"use client";

import { useState } from "react";
import LessonProgressLink from "./LessonProgressLink";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
const lessons: Record<string, string> = {
  "lesson-1": "Introduction to Fashion Merchandise Planning",
  "lesson-2": "Merchandise Financial Planning (MFP)",
  "lesson-3": "WSSI Planning",
  "lesson-4": "Open to Buy (OTB)",
  "lesson-5": "Assortment Planning",
  "lesson-6": "WOS & ROS",
  "lesson-7": "Sell-Through Planning",
  "lesson-8": "Inventory Planning",
};

export default function LessonPage() {
  const params = useParams();

  const slug = params.slug as string;
  const lesson = params.lesson as string;

  const [completed, setCompleted] = useState(false);
  const [saving, setSaving] = useState(false);

  const lessonTitle = lessons[lesson];

  async function markComplete() {
    try {
      setSaving(true);

      const supabase = createClient();

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        alert("Please log in to save your progress.");
        return;
      }

      const { error } = await supabase
        .from("lesson_progress")
        .upsert(
          {
            user_id: user.id,
            course_slug: slug,
            lesson_slug: lesson,
            completed: true,
            completed_at: new Date().toISOString(),
          },
          {
            onConflict: "user_id,course_slug,lesson_slug",
          }
        );

      if (error) {
        console.error("PROGRESS ERROR:", error);
        alert("Unable to save progress. Please try again.");
        return;
      }

      setCompleted(true);
      alert("Lesson completed!");
    } catch (error) {
      console.error("PROGRESS ERROR:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (!lessonTitle) {
    return (
      <main style={{ padding: "40px" }}>
        <h1>Lesson not found</h1>

        <Link href={`/learn/${slug}`}>
          ← Back to Course
        </Link>
      </main>
    );
  }

  return (
    <main
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "50px 24px",
      }}
    >
      <Link href={`/learn/${slug}`}>
        ← Back to Course
      </Link>

      <div
        style={{
          marginTop: "40px",
          background: "#ffffff",
          padding: "40px",
          borderRadius: "16px",
          border: "1px solid #ddd",
        }}
      >
        <p
          style={{
            letterSpacing: "3px",
            fontSize: "13px",
            fontWeight: "600",
          }}
        >
          {lesson.replace("lesson-", "LESSON ")}
        </p>

        <h1
          style={{
            fontSize: "40px",
            marginTop: "12px",
          }}
        >
          {lessonTitle}
        </h1>

        <p
          style={{
            fontSize: "18px",
            lineHeight: "1.8",
            marginTop: "25px",
          }}
        >
          Welcome to the Fashion Retail Academy.
        </p>

        <p
          style={{
            fontSize: "18px",
            lineHeight: "1.8",
            marginTop: "15px",
          }}
        >
          In this lesson, you will learn the fundamentals of fashion
          merchandise planning and understand how planning supports sales,
          inventory and profitability.
        </p>

        <div
          style={{
            marginTop: "35px",
            padding: "25px",
            background: "#f5f7fa",
            borderRadius: "12px",
          }}
        >
          <h2>Lesson Content</h2>

          <p style={{ marginTop: "15px", lineHeight: "1.8" }}>
            Video lecture and downloadable learning materials will appear
            here.
          </p>
        </div>

        <button
          onClick={markComplete}
          disabled={saving || completed}
          style={{
            marginTop: "30px",
            padding: "13px 24px",
            background: completed ? "#16834b" : "#0b1026",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: completed ? "default" : "pointer",
          }}
        >
          {saving
            ? "Saving..."
            : completed
              ? "Lesson Completed ✓"
              : "Mark Lesson Complete"}
        </button>
      </div>
    </main>
  );
}