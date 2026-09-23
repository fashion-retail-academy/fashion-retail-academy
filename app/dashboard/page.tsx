"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function DashboardPage() {
  const supabase = createClient();

  const [name, setName] = useState("Student");
  const [loading, setLoading] = useState(true);
const [courseCount, setCourseCount] = useState(0);
const [completedLessons, setCompletedLessons] = useState(0);
const [totalLessons, setTotalLessons] = useState(0);
const courseCompleted = totalLessons > 0 && completedLessons >= totalLessons;
  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }
const { count, error: enrollmentError } = await supabase
  .from("enrollments")
  .select("id", { count: "exact", head: true })
  .eq("user_id", user.id);

if (!enrollmentError) {
  setCourseCount(count || 0);
}
const { data: enrollmentData, error: progressError } = await supabase
  .from("enrollments")
  .select("course_id")
  .eq("user_id", user.id)
  .eq("status", "active");

if (progressError) {
  console.error("ENROLLMENT DATA ERROR:", progressError);
} else if (enrollmentData && enrollmentData.length > 0) {
  const courseIds = enrollmentData.map((item) => item.course_id);

  const { data: lessonData, error: lessonError } = await supabase
    .from("lessons")
    .select("id, course_id")
    .in("course_id", courseIds)
    .eq("published", true);

 const { data: progressData, error: completedError } = await supabase
  .from("lesson_progress")
  .select("lesson_slug")
  .eq("user_id", user.id)
  .eq("completed", true);
  if (lessonError || completedError) {
    console.error("PROGRESS ERROR:", lessonError || completedError);
  } else {
    setTotalLessons(lessonData?.length || 0);
    setCompletedLessons(progressData?.length || 0);
  }
}
      // First get the name from the login user's metadata
      const metadataName = user.user_metadata?.full_name;

      if (metadataName) {
        setName(metadataName);
      }

      // Then try to get the name from the profiles table
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .maybeSingle();

      if (profile?.full_name) {
        setName(profile.full_name);
      }

      setLoading(false);
    }

    loadProfile();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <p>Loading your dashboard...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100">

      <header className="bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">

          <div>
            <p className="text-lg font-bold">
              FASHION RETAIL
            </p>

            <p className="text-xs tracking-[0.3em] text-slate-400">
              ACADEMY
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-full border border-slate-600 px-5 py-2 text-sm hover:bg-white hover:text-slate-950"
          >
            Logout
          </button>

        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="mb-10">

          <p className="text-sm font-semibold tracking-[0.2em] text-slate-500">
            STUDENT DASHBOARD
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-950">
            Welcome, {name}
          </h1>

          <p className="mt-3 text-slate-600">
            Your courses, templates and learning resources will appear here.
          </p>

        </div>

        <section className="grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl bg-white p-7 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">
              MY COURSES
            </p>

            <h2 className="mt-3 text-3xl font-bold">
            {courseCount}
            </h2>

            <p className="mt-2 text-slate-500">
              Courses enrolled
            </p>{totalLessons > 0 && (
  <div className="mt-5">
    <div className="flex items-center justify-between text-sm mb-2">
      <span className="font-semibold text-slate-700">
        Learning Progress
      </span>
      <span className="text-slate-500">
        {completedLessons} / {totalLessons} lessons
      </span>
    </div>

    <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
      <div
        className="h-full rounded-full bg-[#0b1026]"
        style={{
          width: `${Math.min(
            100,
            Math.round((completedLessons / totalLessons) * 100)
          )}%`,
        }}
      />
    </div>

    <p className="mt-2 text-sm text-slate-500">
      {Math.round((completedLessons / totalLessons) * 100)}% completed
    </p>
  </div>
)}
            <Link
  href="/learn/fashion-merchandise-planning"
  className="mt-4 inline-block rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
>
  Open Course
</Link>
          </div>

          <div className="rounded-2xl bg-white p-7 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">
              MY TEMPLATES
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              0
            </h2>

            <p className="mt-2 text-slate-500">
              Templates purchased
            </p>
          </div>

          <div className="rounded-2xl bg-white p-7 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">
              PROGRESS
            </p>

            <h2 className="mt-3 text-3xl font-bold">
{totalLessons > 0
  ? `${Math.round((completedLessons / totalLessons) * 100)}%`
  : "0%"}
            </h2>

            <p className="mt-2 text-slate-500">
              Learning progress
            </p>
          </div>

        </section>

        <section className="mt-10 rounded-2xl bg-white p-8 shadow-sm">

          <h2 className="text-2xl font-bold text-slate-950">
            My Learning
          </h2>

<div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
  <p className="text-sm font-semibold text-slate-500">
    ENROLLED COURSE
  </p>

  <h3 className="mt-2 text-xl font-bold text-slate-900">
    Fashion Merchandise Planning
  </h3>

  <p className="mt-2 text-slate-500">
    Continue your merchandise planning course and complete your remaining lessons.
  </p>

  <div className="mt-4 flex items-center justify-between text-sm">
    <span className="font-semibold text-slate-700">
      Progress
    </span>
    <span className="text-slate-500">
      {completedLessons} / {totalLessons} lessons
    </span>
  </div>

  <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-200">
    <div
      className="h-full rounded-full bg-[#0b1026]"
      style={{
        width: `${
          totalLessons > 0
            ? Math.min(
                100,
                Math.round((completedLessons / totalLessons) * 100)
              )
            : 0
        }%`,
      }}
    />
  </div>

  <a
    href="/learn/fashion-merchandise-planning"
    className="mt-6 inline-block rounded-xl bg-[#0b1026] px-6 py-3 font-semibold text-white"
  >
    Continue Learning
  </a>
</div>
{courseCompleted && (
  <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
    <p className="text-lg font-bold text-emerald-800">
      🎓 Course Completed
    </p>

    <p className="mt-2 text-sm text-emerald-700">
      Congratulations! You have successfully completed all 10 lessons.
    </p>

    <a
      href="/resources/Fashion_Retail_Academy_Certificate_Template.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 inline-block rounded-xl bg-[#0b1026] px-6 py-3 font-semibold text-white"
    >
      Download Certificate
    </a>
  </div>
)}        

        </section>

      </div>

    </main>
  );
}