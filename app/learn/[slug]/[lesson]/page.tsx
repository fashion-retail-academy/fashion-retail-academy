"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Lesson = {
  id: string;
  lesson_number: number;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;
  video_url: string | null;
  resource_url: string | null;
workbook_url: string | null;  
  duration_minutes: number | null;
};

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();

  const courseSlug = params.slug as string;
  const lessonSlug = params.lesson as string;

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    async function loadLesson() {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data: course, error: courseError } = await supabase
        .from("courses")
        .select("id")
        .eq("slug", courseSlug)
        .single();

      if (courseError || !course) {
        console.error("COURSE ERROR:", courseError);
        setLoading(false);
        return;
      }      const { data: enrollment, error: enrollmentError } = await supabase
        .from("enrollments")
        .select("id")
        .eq("user_id", user.id)
        .eq("course_id", course.id)
        .eq("status", "active")
        .maybeSingle();

      if (enrollmentError) {
        console.error("ENROLLMENT ERROR:", enrollmentError);
        setLoading(false);
        return;
      }

      if (!enrollment) {
        router.push(`/courses/${courseSlug}`);
        return;
      }

      const { data: lessonData, error: lessonError } = await supabase
        .from("lessons")
    .select(
  "id, lesson_number, title, slug, description, content, video_url, resource_url, workbook_url, duration_minutes"
)    
    
        .eq("course_id", course.id)
        .eq("slug", lessonSlug)
        .eq("published", true)
        .single();

      if (lessonError || !lessonData) {
        console.error("LESSON ERROR:", lessonError);
        setLoading(false);
        return;
      }

      setLesson(lessonData);

      const { data: progressData } = await supabase
        .from("lesson_progress")
        .select("completed")
        .eq("course_slug", courseSlug)
        .eq("lesson_slug", lessonSlug)
        .eq("completed", true)
        .maybeSingle();

      if (progressData?.completed) {
        setCompleted(true);
      }

      setLoading(false);
    }

    loadLesson();
  }, [courseSlug, lessonSlug, router]);

  async function markComplete() {
    setCompleting(true);

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data: existing } = await supabase
      .from("lesson_progress")
      .select("id")
      .eq("course_slug", courseSlug)
      .eq("lesson_slug", lessonSlug)
      .maybeSingle();

    let error;

    if (existing) {
      const result = await supabase
        .from("lesson_progress")
        .update({
          completed: true,
          completed_at: new Date().toISOString(),
        })
        .eq("id", existing.id);

      error = result.error;
    } else {
const result = await supabase.from("lesson_progress").insert({
  user_id: user.id,
  course_slug: courseSlug,
  lesson_slug: lessonSlug,
  completed: true,
  completed_at: new Date().toISOString(),
});      

      error = result.error;
    }

    if (error) {
      console.error("PROGRESS ERROR:", error);
      alert("Could not mark lesson complete. Please try again.");
    } else {
      setCompleted(true);
      alert("Lesson completed!");
    }

    setCompleting(false);
  }

  if (loading) {
    return (
      <main style={{ padding: "40px", textAlign: "center" }}>
        <h2>Loading lesson...</h2>
      </main>
    );
  }

  if (!lesson) {
    return (
      <main style={{ padding: "40px", textAlign: "center" }}>
        <h2>Lesson not found</h2>

        <Link
          href={`/learn/${courseSlug}`}
          style={{
            display: "inline-block",
            marginTop: "20px",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          ← Back to Course
        </Link>
      </main>
    );
  }

  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "40px 20px 70px",
      }}
    >
      <Link
        href={`/learn/${courseSlug}`}
        style={{
          textDecoration: "none",
          fontWeight: "600",
          color: "#0b1026",
        }}
      >
        ← Back to Course
      </Link>

      <div style={{ marginTop: "35px" }}>
        <div
          style={{
            fontSize: "14px",
            fontWeight: "700",
            color: "#777",
            marginBottom: "8px",
          }}
        >
          LESSON {lesson.lesson_number}
        </div>

        <h1
          style={{
            fontSize: "38px",
            lineHeight: "1.15",
            color: "#0b1026",
            margin: "0 0 15px",
          }}
        >
          {lesson.title}
        </h1>

        {lesson.description && (
          <p
            style={{
              fontSize: "18px",
              lineHeight: "1.6",
              color: "#666",
              marginBottom: "25px",
            }}
          >
            {lesson.description}
          </p>
        )}

        {lesson.duration_minutes && (
          <div
            style={{
              fontSize: "14px",
              color: "#888",
              marginBottom: "30px",
            }}
          >
            Duration: {lesson.duration_minutes} minutes
          </div>
        )}

        {lesson.video_url && (
          <div
            style={{
              marginBottom: "35px",
              borderRadius: "12px",
              overflow: "hidden",
              background: "#0b1026",
              aspectRatio: "16 / 9",
            }}
          >
            <iframe
              src={lesson.video_url}
              title={lesson.title}
              width="100%"
              height="100%"
              style={{ border: "0" }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {lesson.content && (
          <section
            style={{
              background: "#fff",
              border: "1px solid #e2e2e2",
              borderRadius: "12px",
              padding: "30px",
              marginBottom: "35px",
            }}
          >
            <div
              style={{
                whiteSpace: "pre-wrap",
                fontSize: "17px",
                lineHeight: "1.75",
                color: "#222",
              }}
            >
              {lesson.content}
            </div>
          </section>
        )}
{lesson.resource_url && (
  <div style={{ marginBottom: "20px" }}>
    <a
      href={lesson.resource_url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-block",
        padding: "13px 22px",
        borderRadius: "8px",
        background: "#f1f3f5",
        color: "#0b1026",
        textDecoration: "none",
        fontWeight: "600",
      }}
    >
      Download Lesson Notes (PDF)
    </a>
  </div>
)}

{lesson.workbook_url && (
  <div style={{ marginBottom: "35px" }}>
    <a
      href={lesson.workbook_url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-block",
        padding: "13px 22px",
        borderRadius: "8px",
        background: "#f1f3f5",
        color: "#0b1026",
        textDecoration: "none",
        fontWeight: "600",
      }}
    >
      Download Excel Workbook
    </a>
  </div>
)}

        <div
          style={{
            paddingTop: "20px",
            borderTop: "1px solid #e2e2e2",
          }}
        >
          <button
            onClick={markComplete}
            disabled={completed || completing}
            style={{
              padding: "14px 28px",
              borderRadius: "8px",
              border: "none",
              background: completed ? "#198754" : "#0b1026",
              color: "#fff",
              fontWeight: "600",
              fontSize: "16px",
              cursor: completed || completing ? "default" : "pointer",
            }}
          >
            {completed
              ? "Lesson Completed ✓"
              : completing
              ? "Saving..."
              : "Mark Lesson Complete"}
          </button>
        </div>
      </div>
    </main>
  );
}