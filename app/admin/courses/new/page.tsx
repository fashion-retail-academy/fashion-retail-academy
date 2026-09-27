import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AddCourseForm from "./AddCourseForm";

export default async function NewCoursePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.id !== process.env.ADMIN_USER_ID) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <a
          href="/admin"
          className="mb-6 inline-block text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          ← Back to Admin
        </a>

        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">
            Add New Course
          </h1>

          <p className="mt-2 text-slate-600">
            Create a course directly from your website.
          </p>

          <AddCourseForm />
        </div>
      </div>
    </main>
  );
}

