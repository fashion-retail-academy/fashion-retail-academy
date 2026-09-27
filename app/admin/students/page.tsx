import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function StudentManagementPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  if (user.id !== process.env.ADMIN_USER_ID) {
    redirect("/dashboard");
  }

  const [
    { data: profiles },
    { data: enrollments },
    { data: courses },
    { data: lessons },
    { data: progress },
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select("id, full_name, mobile, whatsapp, city, first_login_at, last_login_at"),

    supabase
      .from("enrollments")
      .select(
        "id, user_id, course_id, status, enrolled_at, paid_amount, paid_at, razorpay_payment_id"
      )
      .order("enrolled_at", { ascending: false }),

    supabase
      .from("courses")
      .select("id, title, slug, price"),

    supabase
      .from("lessons")
      .select("id, course_id, slug"),

    supabase
      .from("lesson_progress")
      .select("user_id, course_slug, lesson_slug, completed"),
  ]);

  const profileMap = new Map(
    (profiles || []).map((profile) => [profile.id, profile])
  );

  const courseMap = new Map(
    (courses || []).map((course) => [course.id, course])
  );

  const lessonCountMap = new Map<string, number>();

  (lessons || []).forEach((lesson) => {
    lessonCountMap.set(
      lesson.course_id,
      (lessonCountMap.get(lesson.course_id) || 0) + 1
    );
  });

  const progressMap = new Map<string, number>();

  (progress || []).forEach((item) => {
    if (!item.completed) return;

    const key = `${item.user_id}|${item.course_slug}`;

    progressMap.set(key, (progressMap.get(key) || 0) + 1);
  });

  const rows = (enrollments || []).map((enrollment) => {
    const profile = profileMap.get(enrollment.user_id);
    const course = courseMap.get(enrollment.course_id);

    const courseSlug = course?.slug || "";
    const key = `${enrollment.user_id}|${courseSlug}`;

    const completedLessons = progressMap.get(key) || 0;
    const totalLessons = course
      ? lessonCountMap.get(course.id) || 0
      : 0;

    const percentage =
      totalLessons > 0
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0;

    return {
      enrollment,
      profile,
      course,
      completedLessons,
      totalLessons,
      percentage,
    };
  });

  const totalStudents = profiles?.length || 0;
  const totalEnrollments = enrollments?.length || 0;
  const activeEnrollments =
    enrollments?.filter((item) => item.status === "active").length || 0;
  const completedEnrollments = rows.filter(
    (row) => row.totalLessons > 0 && row.completedLessons >= row.totalLessons
  ).length;

  function formatDate(value: string | null) {
    if (!value) return "-";

    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  }

  function formatMoney(value: number | null) {
    if (value === null || value === undefined) return "-";

    return `₹${Number(value).toLocaleString("en-IN")}`;
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex flex-wrap gap-3">
          <Link
            href="/admin"
            className="rounded-lg bg-[#0b1026] px-6 py-3 font-semibold text-white"
          >
            Admin Dashboard
          </Link>

          <Link
            href="/"
            className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700"
          >
            Home
          </Link>
        </div>

        <p className="text-sm font-semibold tracking-widest text-slate-500">
          FASHION RETAIL ACADEMY
        </p>

        <h1 className="mt-3 text-4xl font-bold text-slate-900">
          Student Management
        </h1>

        <p className="mt-2 text-lg text-slate-600">
          Students, enrollments, payments, progress and login activity.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-4">

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">
              TOTAL STUDENTS
            </p>
            <p className="mt-3 text-4xl font-bold text-slate-900">
              {totalStudents}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">
              TOTAL ENROLLMENTS
            </p>
            <p className="mt-3 text-4xl font-bold text-slate-900">
              {totalEnrollments}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">
              ACTIVE ENROLLMENTS
            </p>
            <p className="mt-3 text-4xl font-bold text-slate-900">
              {activeEnrollments}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">
              COMPLETED
            </p>
            <p className="mt-3 text-4xl font-bold text-slate-900">
              {completedEnrollments}
            </p>
          </div>

        </div>

        <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1400px] border-collapse">

              <thead>
                <tr className="bg-slate-100 text-left text-sm text-slate-700">

                  <th className="px-5 py-4 font-bold">
                    Student
                  </th>

                  <th className="px-5 py-4 font-bold">
                    Mobile
                  </th>

                  <th className="px-5 py-4 font-bold">
                    Course
                  </th>

                  <th className="px-5 py-4 font-bold">
                    Fee Paid
                  </th>

                  <th className="px-5 py-4 font-bold">
                    Payment Date
                  </th>

                  <th className="px-5 py-4 font-bold">
                    Enrolled
                  </th>

                  <th className="px-5 py-4 font-bold">
                    Progress
                  </th>

                  <th className="px-5 py-4 font-bold">
                    Status
                  </th>

                  <th className="px-5 py-4 font-bold">
                    First Login
                  </th>

                  <th className="px-5 py-4 font-bold">
                    Last Login
                  </th>

                </tr>
              </thead>

              <tbody>

                {rows.length > 0 ? (
                  rows.map((row) => (
                    <tr
                      key={row.enrollment.id}
                      className="border-t border-slate-200"
                    >

                      <td className="px-5 py-5">
                        <p className="font-bold text-slate-900">
                          {row.profile?.full_name || "Unnamed Student"}
                        </p>

                        {row.profile?.city && (
                          <p className="mt-1 text-sm text-slate-500">
                            {row.profile.city}
                          </p>
                        )}
                      </td>

                      <td className="px-5 py-5 text-slate-700">
                        {row.profile?.mobile || "-"}
                      </td>

                      <td className="px-5 py-5">
                        <p className="font-semibold text-slate-900">
                          {row.course?.title || "Unknown Course"}
                        </p>
                      </td>

                      <td className="px-5 py-5 font-semibold text-slate-900">
                        {formatMoney(row.enrollment.paid_amount)}
                      </td>

                      <td className="px-5 py-5 text-sm text-slate-600">
                        {formatDate(row.enrollment.paid_at)}
                      </td>

                      <td className="px-5 py-5 text-sm text-slate-600">
                        {formatDate(row.enrollment.enrolled_at)}
                      </td>

                      <td className="px-5 py-5">
                        <p className="font-bold text-slate-900">
                          {row.completedLessons} / {row.totalLessons}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          {row.percentage}%
                        </p>
                      </td>

                      <td className="px-5 py-5">
                        <span
                          className={
                            row.enrollment.status === "active"
                              ? "font-bold text-blue-600"
                              : "font-semibold text-slate-600"
                          }
                        >
                          {row.enrollment.status}
                        </span>
                      </td>

                      <td className="px-5 py-5 text-sm text-slate-600">
                        {formatDate(row.profile?.first_login_at || null)}
                      </td>

                      <td className="px-5 py-5 text-sm text-slate-600">
                        {formatDate(row.profile?.last_login_at || null)}
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={10}
                      className="px-5 py-12 text-center text-slate-500"
                    >
                      No enrollments found.
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </main>
  );
}

