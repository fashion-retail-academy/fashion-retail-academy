import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CourseEditForm from "./CourseEditForm";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditCoursePage({ params }: PageProps) {
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

  const { data: course, error } = await supabase
    .from("courses")
    .select("id, title, slug, price, description, published")
    .eq("id", id)
    .single();

  if (error || !course) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold text-slate-900">
            Course not found
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">
<div className="mb-6">
  <Link
    href="/"
    className="inline-block rounded-lg bg-[#0b1026] px-5 py-2 font-semibold text-white"
  >
    ← Home
  </Link>
</div>        
        <p className="text-sm font-semibold tracking-widest text-slate-500">
          FASHION RETAIL ACADEMY
        </p>

        <h1 className="mt-3 text-4xl font-bold text-slate-900">
          Edit Course
        </h1>

        <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
          <CourseEditForm
            course={{
              id: course.id,
              title: course.title,
              price: course.price,
              description: course.description,
              published: course.published,
            }}
          />
        </div>
      </div>
    </main>
  );
}