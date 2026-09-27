import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  if (user.id !== process.env.ADMIN_USER_ID) {
    redirect("/dashboard");
  }

  const { data: courses, error } = await supabase
    .from("courses")
    .select("id, title, price, published")
    .order("title", { ascending: true });

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold tracking-widest text-slate-500">
          FASHION RETAIL ACADEMY
        </p>

        <h1 className="mt-3 text-4xl font-bold text-slate-900">
          Admin Dashboard
        </h1>

        <p className="mt-3 text-lg text-slate-600">
          Manage your courses, lessons and learning resources.
        </p>

        <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
          <div className="mb-8">
            <Link
              href="/admin/students"
              className="inline-block rounded-lg bg-[#0b1026] px-6 py-3 font-semibold text-white"
            >
              Students
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            Course Management
          </h2>

          {error ? (
            <p className="mt-6 text-red-600">
              Unable to load courses.
            </p>
          ) : courses && courses.length > 0 ? (
            <div className="mt-6 space-y-4">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="flex flex-col gap-4 rounded-xl border border-slate-200 p-6 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {course.title}
                    </h3>

                    <p className="mt-2 text-slate-600">
                      ₹{Number(course.price).toLocaleString("en-IN")}
                    </p>

                    <p className="mt-1 text-slate-500">
                      {course.published ? "Published" : "Draft"}
                    </p>
                  </div>

                  <Link
                    href={`/admin/courses/${course.id}`}
                    className="inline-block rounded-lg bg-[#0b1026] px-5 py-3 font-semibold text-white"
                  >
                    Edit Course
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-slate-600">
              No courses found.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
