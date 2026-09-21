import Link from "next/link";
import CheckoutButton from "./CheckoutButton";

const courseData: Record<
  string,
  {
    title: string;
    price: string;
    description: string;
    topics: string[];
  }
> = {
  "fashion-merchandise-planning": {
    title: "Fashion Merchandise Planning",
    price: "₹9,999",
    description:
      "Master merchandise planning, MFP, WSSI, OTB, assortment planning, WOS, ROS, sell-through and inventory planning.",
    topics: [
      "Merchandise Financial Planning (MFP)",
      "WSSI Planning",
      "Open to Buy (OTB)",
      "Assortment Planning",
      "WOS & ROS",
      "Sell-through Analysis",
      "Inventory Planning",
      "Retail KPIs",
    ],
  },

  "advanced-excel-fashion-retail": {
    title: "Advanced Excel for Fashion Retail",
    price: "₹4,999",
    description:
      "Build professional fashion retail models using Excel, formulas, dashboards and practical business cases.",
    topics: [
      "Advanced Excel Formulas",
      "Retail Mathematics",
      "Merchandise Planning Models",
      "WSSI & OTB Models",
      "Retail Dashboards",
      "Business Case Analysis",
    ],
  },

  "fashion-retail-buying": {
    title: "Fashion Retail Buying",
    price: "₹7,999",
    description:
      "Learn buying strategy, assortment architecture, option planning, pricing and commercial decision-making.",
    topics: [
      "Buying Strategy",
      "Assortment Architecture",
      "Option Planning",
      "Pricing Strategy",
      "Vendor Management",
      "Commercial Decision Making",
    ],
  },
};

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const course = courseData[slug];

  if (!course) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-slate-900">
            Course not found
          </h1>

          <p className="mt-4 text-slate-600">
            Sorry, this course does not exist.
          </p>

          <Link
            href="/courses"
            className="mt-8 inline-block rounded-xl bg-slate-950 px-6 py-3 font-semibold text-white"
          >
            Back to Courses
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/courses"
            className="text-sm font-semibold text-slate-500 hover:text-slate-900"
          >
            ← Back to Courses
          </Link>

          <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm md:p-12">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-500">
                Fashion Retail Academy
              </p>

              <h1 className="mt-4 text-4xl font-bold text-slate-950 md:text-5xl">
                {course.title}
              </h1>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                {course.description}
              </p>

              <div className="mt-8">
                <span className="text-3xl font-bold text-slate-950">
                  {course.price}
                </span>
              </div>

             <CheckoutButton courseSlug={slug} />
            </div>

            <div className="mt-12 border-t border-slate-200 pt-10">
              <h2 className="text-2xl font-bold text-slate-950">
                What You Will Learn
              </h2>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {course.topics.map((topic) => (
                  <div
                    key={topic}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <span className="font-semibold text-slate-800">
                      ✓ {topic}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}