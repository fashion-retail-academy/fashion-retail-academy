"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import LessonProgressLink from "./LessonProgressLink";
import { createClient } from "@/lib/supabase/client";

type Lesson = {
  id: string;
  lesson_number: number;
  title: string;
  slug: string;
  description: string | null;
  duration_minutes: number | null;
};

export default function LearnPage() {
  const params = useParams();
  const router = useRouter();

  const slug = params.slug as string;

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [courseTitle, setCourseTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourse() {
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
        .select("id, title")
        .eq("slug", slug)
        .single();

      if (courseError || !course) {
        console.error("COURSE ERROR:", courseError);
        setLoading(false);
        return;
      }

      setCourseTitle(course.title);

      const { data: lessonData, error: lessonError } = await supabase
        .from("lessons")
        .select(
          "id, lesson_number, title, slug, description, duration_minutes"
        )
        .eq("course_id", course.id)
        .eq("published", true)
        .order("lesson_number", { ascending: true });

      if (lessonError) {
        console.error("LESSON ERROR:", lessonError);
      } else {
        setLessons(lessonData || []);
      }

      const { data: progressData, error: progressError } = await supabase
        .from("lesson_progress")
        .select("lesson_slug, completed")
        .eq("course_slug", slug)
        .eq("completed", true);

      if (progressError) {
        console.error("PROGRESS ERROR:", progressError);
      } else {
        setCompletedLessons(
          (progressData || []).map((item) => item.lesson_slug)
        );
      }

      setLoading(false);
    }

    loadCourse();
  }, [slug, router]);

  if (loading) {
    return (
      <main style={{ padding: "40px", textAlign: "center" }}>
        <h2>Loading your course...</h2>
      </main>
    );
  }

  return (
    <main
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "40px 20px",
      }}
    >
      <Link
        href="/dashboard"
        style={{
          textDecoration: "none",
          fontWeight: "600",
          color: "#0b1026",
        }}
      >
        ← Back to Dashboard
      </Link>

      <div style={{ marginTop: "30px" }}>
        <h1
          style={{
            fontSize: "36px",
            marginBottom: "10px",
            color: "#0b1026",
          }}
        >
          {courseTitle}
        </h1>

        <p style={{ color: "#666", marginBottom: "30px" }}>
          Your lessons
        </p>

        {lessons.length === 0 ? (
          <div
            style={{
              padding: "30px",
              border: "1px solid #ddd",
              borderRadius: "12px",
            }}
          >
            No lessons are available yet.
          </div>
        ) : (
          <div style={{ display: "grid", gap: "15px" }}>
            {lessons.map((lesson) => {
              const completed = completedLessons.includes(lesson.slug);

              return (
                <div
                  key={lesson.id}
                  style={{
                    padding: "22px",
                    border: "1px solid #e2e2e2",
                    borderRadius: "12px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "20px",
                    background: "#fff",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#777",
                        marginBottom: "5px",
                      }}
                    >
                      LESSON {lesson.lesson_number}
                    </div>

                    <h2
                      style={{
                        margin: "0 0 7px",
                        fontSize: "20px",
                        color: "#0b1026",
                      }}
                    >
                      {lesson.title}
                    </h2>

                    {lesson.description && (
                      <p
                        style={{
                          margin: "0",
                          color: "#666",
                          lineHeight: "1.5",
                        }}
                      >
                        {lesson.description}
                      </p>
                    )}

                    {lesson.duration_minutes && (
                      <div
                        style={{
                          marginTop: "8px",
                          fontSize: "13px",
                          color: "#888",
                        }}
                      >
                        {lesson.duration_minutes} minutes
                      </div>
                    )}
                  </div>

                  <LessonProgressLink
                    slug={slug}
                    lessonNumber={lesson.lesson_number}
                    completed={completed}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}