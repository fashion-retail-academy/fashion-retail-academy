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
    .select("id, title, slug, price, published")
    .order("created_at", { ascending: true });

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold tracking-widest text-slate-500">
          FASHION RETAIL ACADEMY
        </p>

        <h1 className="mt-3 text-4xl font-bold text-slate-900">
          Admin Dashboard
        </h1>

        <p className="mt-3 text-slate-600">
          Manage your courses, lessons and learning resources.
        </p>

        <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            Course Management
          </h2>

          {error ? (
            <p className="mt-4 text-red-600">
              Unable to load courses.
            </p>
          ) : (
            <div className="mt-6 space-y-4">
              {courses?.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-5"
                >
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {course.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      ₹{course.price.toLocaleString("en-IN")}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {course.published ? "Published" : "Draft"}
                    </p>
                  </div>
<Link
  href={`/admin/courses/${course.id}`}
  className="rounded-lg bg-[#0b1026] px-5 py-2 font-semibold text-white"
>
  Edit Course
</Link>                
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}