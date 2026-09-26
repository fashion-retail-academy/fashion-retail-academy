import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LessonEditForm from "./LessonEditForm";

type PageProps = {
  params: Promise<{
    id: string;
    lessonId: string;
  }>;
};

export default async function EditLessonPage({ params }: PageProps) {
  const supabase = await createClient();

  const { id, lessonId } = await params;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  if (user.id !== process.env.ADMIN_USER_ID) {
    redirect("/dashboard");
  }

  const { data: lesson, error } = await supabase
    .from("lessons")
    .select(
      "id, course_id, lesson_number, title, slug, description, video_url, duration_minutes, published, resource_url, workbook_url"
    )
    .eq("id", lessonId)
    .eq("course_id", id)
    .single();

  if (error || !lesson) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold text-slate-900">
            Lesson not found
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="flex gap-3">
          <a
            href={`/admin/courses/${id}/lessons`}
            className="rounded-lg bg-[#0b1026] px-5 py-3 font-semibold text-white"
          >
            ? Lessons
          </a>

          <a
            href={`/admin/courses/${id}`}
            className="rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700"
          >
            ? Edit Course
          </a>
        </div>

        <p className="mt-8 text-sm font-semibold tracking-widest text-slate-500">
          FASHION RETAIL ACADEMY
        </p>

        <h1 className="mt-3 text-4xl font-bold text-slate-900">
          Edit Lesson
        </h1>

        <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
          <LessonEditForm lesson={lesson} />
        </div>
      </div>
    </main>
  );
}
