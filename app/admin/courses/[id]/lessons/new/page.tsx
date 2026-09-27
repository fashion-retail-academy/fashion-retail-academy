import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AddLessonForm from "./AddLessonForm";

export default async function NewLessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.id !== process.env.ADMIN_USER_ID) {
    redirect("/login");
  }

  const { data: course } = await supabase
    .from("courses")
    .select("id, title")
    .eq("id", id)
    .single();

  if (!course) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <a
          href={`/admin/courses/${id}/lessons`}
          className="mb-6 inline-block text-sm font-semibold text-slate-600"
        >
          ← Back to Lessons
        </a>

        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">
            Add New Lesson
          </h1>

          <p className="mt-2 text-slate-600">
            Course: {course.title}
          </p>

          <AddLessonForm courseId={course.id} />
        </div>
      </div>
    </main>
  );
}