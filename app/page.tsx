import Link from "next/link";

const courses = [
  {
  slug: "fashion-merchandise-planning",
  title: "Fashion Merchandise Planning",
    description:
      "Master MFP, WSSI, OTB, assortment planning, WOS, ROS, sell-through and inventory planning.",
    price: "₹9,999",
  },
  {
  slug: "advanced-excel-fashion-retail",
  title: "Advanced Excel for Fashion Retail",
    description: "Build professional retail models using Excel, formulas, dashboards and practical business cases.",
    price: "₹4,999",
  },
  {
  slug: "fashion-retail-buying",
  title: "Fashion Retail Buying",
    description:
      "Learn buying strategy, assortment architecture, option planning, pricing and commercial decision-making.",
    price: "₹7,999",
  },
];

const templates = [
  {
    title: "WSSI Planning Model",
    description: "Professional weekly stock and sales planning template.",
    price: "₹999",
  },
  {
    title: "OTB Calculator",
    description: "Plan inventory commitments using open-to-buy principles.",
    price: "₹999",
  },
  {
    title: "WOS & ROS Calculator",
    description: "Calculate stock cover, rate of sale and inventory requirements.",
    price: "₹499",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* NAVIGATION */}
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>
            <div className="text-xl font-bold tracking-tight">
              FASHION RETAIL
            </div>
            <div className="text-xs font-medium tracking-[0.3em] text-slate-500">
              ACADEMY
            </div>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            <a href="#courses" className="text-sm hover:text-slate-500">
              Courses
            </a>
            <a href="#templates" className="text-sm hover:text-slate-500">
              Templates
            </a>
            <a href="#about" className="text-sm hover:text-slate-500">
              About
            </a>
            <a href="#contact" className="text-sm hover:text-slate-500">
              Contact
            </a>
          </div>

          <div className="flex items-center gap-3">
  <a
    href="/login"
    className="rounded-full border border-slate-300 px-6 py-3 text-sm font-medium text-slate-900 hover:bg-slate-50"
  >
    Login
  </a>

  <a
    href="/Register"
    className="rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white hover:bg-slate-800"
  >
    Register
  </a>
</div>

        </div>
      </nav>


      {/* HERO */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center">

          <div>
            <div className="mb-6 inline-block rounded-full border border-slate-700 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-300">
              Industry-led fashion education
            </div>

            <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight md:text-7xl">
              Master Fashion Retail.
              <br />
              Build Your Career.
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">
              Practical learning in merchandise planning, buying, retail
              finance, Excel and fashion business strategy — built from real
              industry experience.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#courses"
                className="rounded-full bg-white px-7 py-3 font-semibold text-slate-950"
              >
                Explore Courses
              </a>

              <a
                href="#templates"
                className="rounded-full border border-slate-600 px-7 py-3 font-semibold text-white"
              >
                Browse Templates
              </a>
            </div>
          </div>


          <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8">
            <div className="text-sm uppercase tracking-[0.2em] text-slate-400">
              What you will learn
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                "Merchandise Planning",
                "Buying",
                "WSSI",
                "OTB",
                "WOS & ROS",
                "Retail Finance",
                "Advanced Excel",
                "Business Strategy",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-700 p-4 text-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* STATS */}
      <section className="border-b border-slate-200">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-slate-200 md:grid-cols-4">

          <div className="p-8 text-center">
            <div className="text-3xl font-bold">20+</div>
            <div className="mt-2 text-sm text-slate-500">
              Years Industry Experience
            </div>
          </div>

          <div className="p-8 text-center">
            <div className="text-3xl font-bold">100%</div>
            <div className="mt-2 text-sm text-slate-500">
              Practical Learning
            </div>
          </div>

          <div className="p-8 text-center">
            <div className="text-3xl font-bold">50+</div>
            <div className="mt-2 text-sm text-slate-500">
              Retail Concepts
            </div>
          </div>

          <div className="p-8 text-center">
            <div className="text-3xl font-bold">∞</div>
            <div className="mt-2 text-sm text-slate-500">
              Career Possibilities
            </div>
          </div>

        </div>
      </section>


      {/* COURSES */}
      <section id="courses" className="mx-auto max-w-7xl px-6 py-24">

        <div className="max-w-2xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Learn
          </div>

          <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Professional Courses
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            Learn the commercial and analytical skills used by fashion retail
            professionals.
          </p>
        </div>


        <div className="mt-12 grid gap-6 md:grid-cols-3">

          {courses.map((course) => (
            <div
              key={course.title}
              className="flex flex-col rounded-3xl border border-slate-200 p-7 shadow-sm"
            >

              <div className="mb-8 h-36 rounded-2xl bg-slate-100" />

              <h3 className="text-xl font-bold">
                {course.title}
              </h3>

              <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">
                {course.description}
              </p>

              <div className="mt-7 flex items-center justify-between">

                <div className="text-2xl font-bold">
                  {course.price}
                </div>

                <Link
  href={`/courses/${course.slug}`}
  className="rounded-full bg-slate-900 px-5 py-3 font-semibold text-white"
>
  View Course
</Link>

              </div>

            </div>
          ))}

        </div>

      </section>


      {/* TEMPLATES */}
      <section id="templates" className="bg-slate-100">
        <div className="mx-auto max-w-7xl px-6 py-24">

          <div className="max-w-2xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Download
            </div>

            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              Retail Templates
            </h2>

            <p className="mt-5 text-lg text-slate-600">
              Ready-to-use Excel models and retail planning tools designed for
              real-world fashion businesses.
            </p>
          </div>


          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {templates.map((template) => (
              <div
                key={template.title}
                className="rounded-3xl bg-white p-7"
              >

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-2xl text-white">
                  XLS
                </div>

                <h3 className="mt-7 text-xl font-bold">
                  {template.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {template.description}
                </p>

                <div className="mt-7 flex items-center justify-between">

                  <div className="text-2xl font-bold">
                    {template.price}
                  </div>

                  <button className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold">
                    View Template
                  </button>

                </div>

              </div>
            ))}

          </div>

        </div>
      </section>


      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-7xl px-6 py-24">

        <div className="grid gap-12 md:grid-cols-2 md:items-center">

          <div className="h-96 rounded-3xl bg-slate-200" />

          <div>

            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              About the Academy
            </div>

            <h2 className="mt-4 text-4xl font-bold tracking-tight">
              Learn from the industry, not just the classroom.
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              Fashion Retail Academy is designed for students and
              professionals who want to understand how fashion businesses
              actually operate.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              From merchandise planning and buying to retail financial
              modelling and Excel, every course focuses on practical
              application.
            </p>

            <button className="mt-8 rounded-full bg-slate-900 px-7 py-3 font-semibold text-white">
              Learn More
            </button>

          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">

          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Ready to build your fashion retail career?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-slate-300">
            Start with a course, download a professional template, and build
            practical skills you can use immediately.
          </p>

          <a
            href="#courses"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3 font-semibold text-slate-950"
          >
            Start Learning
          </a>

        </div>
      </section>


      {/* FOOTER */}
      <footer id="contact" className="bg-white">

        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between">

          <div>
            <div className="font-bold">FASHION RETAIL ACADEMY</div>
            <div className="mt-1 text-sm text-slate-500">
              Practical education for fashion retail professionals.
            </div>
          </div>

          <div className="flex gap-5 text-sm text-slate-500">
            <a href="#">LinkedIn</a>
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">WhatsApp</a>
          </div>

        </div>

      </footer>

    </main>
  );
}
