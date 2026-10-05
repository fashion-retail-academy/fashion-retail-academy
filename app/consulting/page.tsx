import Link from "next/link";

const services = [
  {
    title: "Buying & Assortment",
    description:
      "Build the right product range, price architecture and assortment for your target customer.",
    points: [
      "Category architecture",
      "Assortment planning",
      "Option planning",
      "Price architecture",
      "Vendor & product strategy",
    ],
  },
  {
    title: "Merchandise Planning",
    description:
      "Create a practical merchandise planning system to manage sales, stock, margins and inventory.",
    points: [
      "MFP & WSSI",
      "Open-to-Buy",
      "Sales & stock planning",
      "WOS & ROS",
      "Allocation & replenishment",
    ],
  },
  {
    title: "Retail Financial Model",
    description:
      "Understand the numbers behind your fashion business and build a commercially viable model.",
    points: [
      "Revenue & margin model",
      "CM1 / CM2 / CM3",
      "CAC & ROAS",
      "Inventory investment",
      "Working capital & profitability",
    ],
  },
  {
    title: "Excel Retail Systems",
    description:
      "Build professional Excel tools that your buying, planning and management teams can actually use.",
    points: [
      "Buying plan",
      "WSSI",
      "OTB calculator",
      "Assortment planner",
      "Management dashboards",
    ],
  },
  {
    title: "Business & Brand Strategy",
    description:
      "Turn your fashion business idea into a clear commercial strategy for growth.",
    points: [
      "Brand positioning",
      "Category strategy",
      "Channel strategy",
      "Pricing strategy",
      "Store & D2C growth",
    ],
  },
];

export default function ConsultingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">

      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <Link href="/" className="block">
            <div className="text-xl font-bold tracking-tight">
              FASHION RETAIL
            </div>
            <div className="text-xs font-medium tracking-[0.3em] text-slate-500">
              ACADEMY
            </div>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link href="/" className="text-sm hover:text-slate-500">
              Home
            </Link>
            <Link href="/#courses" className="text-sm hover:text-slate-500">
              Courses
            </Link>
            <Link href="/#templates" className="text-sm hover:text-slate-500">
              Templates
            </Link>
            <Link href="/consulting/contact" className="text-sm font-semibold">Consulting</Link>
            <Link href="/#about" className="text-sm hover:text-slate-500">
              About
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium hover:bg-slate-50"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
            >
              Register
            </Link>
          </div>

        </div>
      </nav>

      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-24">

          <div className="max-w-4xl">

            <div className="mb-6 inline-block rounded-full border border-slate-700 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-300">
              Fashion Retail Consulting
            </div>

            <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-7xl">
              Build a Better
              <br />
              Fashion Business.
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
              Practical consulting for fashion brands, retailers and
              entrepreneurs who need help with buying, merchandise planning,
              retail finance, Excel systems and business strategy.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="#services"
                className="rounded-full bg-white px-7 py-3 font-semibold text-slate-950"
              >
                Explore Consulting
              </Link>

              <Link
                href="/#contact"
                className="rounded-full border border-slate-600 px-7 py-3 font-semibold text-white"
              >
                Start a Conversation
              </Link>
            </div>

          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-12 md:grid-cols-2 md:items-center">

          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Practical. Commercial. Industry-led.
            </div>

            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Don't just learn retail.
              <br />
              Build your retail business.
            </h2>
          </div>

          <div>
            <p className="leading-8 text-slate-600">
              Every fashion business has different products, customers,
              channels and financial realities. We work with you to
              understand the business and identify the commercial opportunity.
            </p>

            <p className="mt-5 leading-8 text-slate-600">
              We then build practical strategies, planning models and
              business systems that your team can actually implement.
            </p>
          </div>

        </div>

      </section>

      <section id="services" className="bg-slate-50 px-6 py-24">

        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              What We Can Help With
            </div>

            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              Consulting Services
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Practical consulting tailored to your business.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {services.map((service) => (
              <div
                key={service.title}
                className="flex flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
              >

                <h3 className="text-xl font-bold">
                  {service.title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {service.description}
                </p>

                <ul className="mt-6 space-y-3 text-sm text-slate-700">
                  {service.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="font-bold">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

              </div>
            ))}

          </div>

        </div>

      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">

        <div className="grid gap-12 md:grid-cols-2">

          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Who We Help
            </div>

            <h2 className="mt-4 text-4xl font-bold tracking-tight">
              Built for fashion businesses at different stages.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">

            {[
              "Fashion Startups",
              "D2C Brands",
              "Growing Fashion Brands",
              "Multi-Brand Retailers",
              "Fashion Entrepreneurs",
              "Buying & Planning Teams",
              "Investors & New Ventures",
              "Established Retailers",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 p-5 text-sm font-medium"
              >
                {item}
              </div>
            ))}

          </div>
        </div>

      </section>

      <section className="bg-slate-950 text-white">

        <div className="mx-auto max-w-7xl px-6 py-24">

          <div className="max-w-2xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              How It Works
            </div>

            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              From problem to practical solution.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-4">

            {[
              ["01", "Understand", "Understand your business, customer, products, channels and challenges."],
              ["02", "Analyse", "Analyse sales, stock, margins, assortment and commercial opportunities."],
              ["03", "Build", "Build the strategy, planning model, Excel system or business solution."],
              ["04", "Implement", "Help your team understand and implement the solution."],
            ].map(([number, title, text]) => (
              <div
                key={number}
                className="rounded-3xl border border-slate-700 p-7"
              >
                <div className="text-sm font-semibold text-slate-400">
                  {number}
                </div>

                <h3 className="mt-6 text-xl font-bold">
                  {title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-slate-400">
                  {text}
                </p>
              </div>
            ))}

          </div>

        </div>

      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 md:p-12">

          <div className="grid gap-10 md:grid-cols-3 md:items-center">

            <div>
              <div className="text-5xl font-bold">
                20+
              </div>

              <div className="mt-2 text-sm text-slate-500">
                Years of Fashion Retail Experience
              </div>
            </div>

            <div className="md:col-span-2">

              <h2 className="text-3xl font-bold">
                Industry experience translated into practical business
                solutions.
              </h2>

              <p className="mt-5 leading-7 text-slate-600">
                The same commercial thinking used in professional fashion
                retail can be applied to your brand, your product range,
                your inventory and your financial model.
              </p>

            </div>

          </div>

        </div>

      </section>

      <section className="bg-slate-950 text-white">

        <div className="mx-auto max-w-4xl px-6 py-24 text-center">

          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Have a fashion business problem?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-300">
            Tell us what you are trying to build, improve or solve.
            We can determine the right consulting approach for your business.
          </p>

          <Link
            href="/#contact"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3 font-semibold text-slate-950"
          >
            Start a Conversation
          </Link>

        </div>

      </section>

      <footer className="bg-white">

        <div className="mx-auto max-w-7xl px-6 py-10">

          <div className="font-bold">
            FASHION RETAIL ACADEMY
          </div>

          <div className="mt-2 text-sm text-slate-500">
            Practical education and consulting for fashion retail.
          </div>

          <div className="mt-6 flex flex-wrap gap-5 text-sm text-slate-500">

            <Link href="/">
              Home
            </Link>

            <Link href="/#courses">
              Courses
            </Link>

            <Link href="/#templates">
              Templates
            </Link>

            <Link href="/consulting/contact">
              Consulting
            </Link>

            <Link href="/#about">
              About
            </Link>

          </div>

          <div className="mt-8 border-t border-slate-200 pt-6 text-sm text-slate-500">

            <Link href="/privacy" className="mr-5">
              Privacy Policy
            </Link>

            <Link href="/terms" className="mr-5">
              Terms & Conditions
            </Link>

            <Link href="/refund-policy">
              Refund & Cancellation
            </Link>

          </div>

        </div>

      </footer>

    </main>
  );
}


