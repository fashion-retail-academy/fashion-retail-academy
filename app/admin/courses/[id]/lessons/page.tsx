import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function LessonsAdminPage({ params }: PageProps) {
  const supabase = await createClient();
  const { id } = await params;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  if (user.id !== process.env.ADMIN_USER_ID) {
    redirect("/dashboard");
  }

  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select("id, title")
    .eq("id", id)
    .single();

  if (courseError || !course) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold text-slate-900">
            Course not found
          </h1>
        </div>
      </main>
    );
  }

  const { data: lessons, error: lessonsError } = await supabase
    .from("lessons")
    .select(
      "id, lesson_number, title, slug, description, video_url, duration_minutes, published, resource_url, workbook_url"
    )
    .eq("course_id", id)
    .order("lesson_number", { ascending: true });

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-lg bg-[#0b1026] px-5 py-2 font-semibold text-white"
          >
            ← Home
          </Link>

          <Link
            href={`/admin/courses/${course.id}`}
            className="rounded-lg border border-slate-300 bg-white px-5 py-2 font-semibold text-slate-700"
          >
            ← Edit Course
          </Link>
        </div>

        <p className="text-sm font-semibold tracking-widest text-slate-500">
          FASHION RETAIL ACADEMY
        </p>

        <h1 className="mt-3 text-4xl font-bold text-slate-900">
          Lesson Manager
        </h1>

        <p className="mt-2 text-lg text-slate-600">
          {course.title}
        </p>

        <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            Course Lessons
          </h2>

          {lessonsError ? (
            <p className="mt-4 text-red-600">
              Unable to load lessons.
            </p>
          ) : lessons && lessons.length > 0 ? (
            <div className="mt-6 space-y-4">
              {lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="rounded-xl border border-slate-200 p-5"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-500">
                        Lesson {lesson.lesson_number}
                      </p>

                      <h3 className="mt-1 text-lg font-bold text-slate-900">
                        {lesson.title}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {lesson.published ? "Published" : "Draft"}
                        {lesson.duration_minutes
                          ? ` • ${lesson.duration_minutes} minutes`
                          : ""}
                      </p>
                    </div>

                    <Link
                      href={`/admin/courses/${course.id}/lessons/${lesson.id}`}
                      className="inline-block rounded-lg bg-[#0b1026] px-5 py-2 font-semibold text-white"
                    >
                      Edit Lesson
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-slate-600">
              No lessons found for this course.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}