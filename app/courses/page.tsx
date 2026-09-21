"use client";
import Link from "next/link";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Course = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  thumbnail_url?: string | null;
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourses() {
      const supabase = createClient();

      const { data, error } = await supabase
  .from("courses")
  .select("id, title, slug, description, price, thumbnail_url")
  .eq("published", true)
  .order("created_at", { ascending: false });

     if (error) {
  console.error("COURSE ERROR MESSAGE:", error.message);
  console.error("COURSE ERROR DETAILS:", error.details);
  console.error("COURSE ERROR HINT:", error.hint);
  console.error("COURSE ERROR CODE:", error.code);
}
       else {
        setCourses(data || []);
      }

      setLoading(false);
    }

    loadCourses();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" className="font-bold tracking-tight">
            <div className="text-xl">FASHION RETAIL</div>
            <div className="text-xs tracking-[0.35em] text-slate-400">
              ACADEMY
            </div>
          </a>

          <nav className="flex items-center gap-8 text-sm">
            <a href="/" className="text-slate-300 hover:text-white">
              Home
            </a>

            <a href="/courses" className="font-semibold text-white">
              Courses
            </a>

            <a href="/Register" className="text-slate-300 hover:text-white">
              Register
            </a>

            <a
              href="/login"
              className="rounded-full border border-slate-600 px-5 py-2 hover:bg-white hover:text-slate-950"
            >
              Login
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-20">
        <p className="mb-4 text-sm font-semibold tracking-[0.3em] text-slate-400">
          FASHION RETAIL EDUCATION
        </p>

        <h1 className="text-5xl font-bold tracking-tight">
          Our Courses
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
          Practical courses designed to build real-world skills in fashion
          merchandise planning, buying, Excel and retail business strategy.
        </p>
      </section>

      {/* Courses */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        {loading ? (
          <div className="py-20 text-center text-slate-400">
            Loading courses...
          </div>
        ) : courses.length === 0 ? (
          <div className="rounded-2xl border border-slate-700 p-12 text-center">
            <h2 className="text-2xl font-semibold">
              No courses available
            </h2>
            <p className="mt-3 text-slate-400">
              Please check back soon.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <article
                key={course.id}
                className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"
              >
                {/* Thumbnail */}
                <div className="flex h-52 items-center justify-center bg-slate-800">
                  {course.thumbnail_url ? (
                    <img
                      src={course.thumbnail_url}
                      alt={course.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-sm tracking-[0.25em] text-slate-500">
                      FASHION RETAIL ACADEMY
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-7">
                  <h2 className="text-2xl font-semibold">
                    {course.title}
                  </h2>

                  <p className="mt-4 min-h-20 leading-7 text-slate-400">
                    {course.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-slate-500">
                        Course Fee
                      </p>

                      <p className="mt-1 text-2xl font-bold">
                        ₹{course.price.toLocaleString("en-IN")}
                      </p>
                    </div>

                   <Link
  href={`/courses/${course.slug}`}
  className="rounded-full bg-slate-950 px-6 py-3 font-semibold text-white"
>
  View Course
</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}