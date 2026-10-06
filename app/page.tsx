import Link from "next/link";
import TemplateSection from "@/components/TemplateSection";

async function getUsdInrRate() {
  try {
    const response = await fetch("https://open.er-api.com/v6/latest/USD", { next: { revalidate: 3600 } });
    const data = await response.json();
    return Number(data?.rates?.INR) || 95.78;
  } catch {
    return 95.78;
  }
}

const courses = [
  {
  slug: "fashion-merchandise-planning",
  title: "Fashion Merchandise Planning",
    description:
      "Master MFP, WSSI, OTB, assortment planning, WOS, ROS, sell-through and inventory planning.",
    price: 19999,
  },
  {
  slug: "advanced-excel-fashion-retail",
  title: "Advanced Excel for Fashion Retail",
    description: "Build professional retail models using Excel, formulas, dashboards and practical business cases.",
    price: 14999,
  },
  {
  slug: "fashion-retail-buying",
  title: "Fashion Retail Buying",
    description:
      "Learn buying strategy, assortment architecture, option planning, pricing and commercial decision-making.",
    price: 17999,
  },
];

const templates = [
  {
    title: "WSSI Planning Model",
    description: "Professional weekly stock and sales planning template.",
    price: 9999,
  },
  {
    title: "OTB Calculator",
    description: "Plan inventory commitments using open-to-buy principles.",
    price: 1999,
  },
  {
    title: "WOS & ROS Calculator",
    description: "Calculate stock cover, rate of sale and inventory requirements.",
    price: 4499,
  },
];

export default async function Home() {
  const usdInrRate = await getUsdInrRate();
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
            <a href="/fashion-retail-cycle" className="text-sm hover:text-slate-500">How Fashion Retail Works</a>
<a href="/about" className="text-sm hover:text-slate-500">About Rishi</a>
<a href="/consulting/contact" className="text-sm hover:text-slate-500">
              Consulting
            </a>
<a href="#courses" className="text-sm hover:text-slate-500">
              Courses
            </a>
<a href="#templates" className="text-sm hover:text-slate-500">
              Templates
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
    href="/register"
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
        Fashion Retail Consulting
      </div>

      <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight md:text-7xl">
        Build a More
        <br />
        Profitable Fashion Business.
      </h1>

      <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">
        I help fashion brands make better commercial decisions across
        buying, merchandising, inventory, pricing, distribution,
        cash flow and profitability.
      </p>

      <p className="mt-5 max-w-xl text-base leading-7 text-slate-400">
        From product idea to profitable retail, we connect the decisions
        that drive growth, margin and working capital.
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <a
          href="/consulting/contact"
          className="rounded-full bg-white px-7 py-3 font-semibold text-slate-950"
        >
          Work With Me
        </a>

        <a
          href="/fashion-retail-cycle"
          className="rounded-full border border-slate-600 px-7 py-3 font-semibold text-white"
        >
          How Fashion Retail Works
        </a>
      </div>

      <div className="mt-8 text-sm text-slate-400">
        23+ years of fashion retail experience · NIFT · Domestic & International Brands
      </div>
    </div>

    <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8">

      <div className="text-sm uppercase tracking-[0.2em] text-slate-400">
        Where I Help
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">

        {[
          {
            title: "Buying & Assortment",
            description: "Build the right product mix, options, depth and price architecture."
          },
          {
            title: "Merchandise Planning",
            description: "Connect sales, stock, intake, OTB and WSSI into one plan."
          },
          {
            title: "Inventory & Working Capital",
            description: "Improve WOS, ROS, turns, sell-through and cash utilisation."
          },
          {
            title: "Pricing & Profitability",
            description: "Build pricing, margin and contribution frameworks."
          },
          {
            title: "Distribution & Go-to-Market",
            description: "Choose the right channels and route to market."
          },
          {
            title: "Business & Financial Planning",
            description: "Connect revenue, margin, inventory, cash flow and growth."
          }
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-700 p-4"
          >
            <div className="font-medium text-white">
              {item.title}
            </div>

            <div className="mt-2 text-xs leading-5 text-slate-400">
              {item.description}
            </div>
          </div>
        ))}

      </div>
    </div>

  </div>
</section>
{/* CONSULTING EXPERTISE */}
<section className="bg-white">
  <div className="mx-auto max-w-7xl px-6 py-24">

    <div className="max-w-3xl">
      <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
        Commercial Expertise
      </div>

      <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
        Where Fashion Retail Decisions Become Commercial Results
      </h2>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
        Fashion businesses rarely have one problem. Buying affects inventory.
        Inventory affects cash. Pricing affects margin. Distribution affects
        growth. I help connect these decisions into one commercial system.
      </p>
    </div>

    <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

      {[
        {
          number: "01",
          title: "Buying & Assortment",
          description: "Build the right product mix, options, depth, size curves and price architecture."
        },
        {
          number: "02",
          title: "Merchandise Planning",
          description: "Connect MFP, WSSI, OTB, sales planning and inventory targets."
        },
        {
          number: "03",
          title: "Pricing & Margin",
          description: "Build price architecture, markdown strategy, gross margin and contribution."
        },
        {
          number: "04",
          title: "Inventory Productivity",
          description: "Improve WOS, ROS, sell-through, stock turns and replenishment."
        },
        {
          number: "05",
          title: "Distribution & Go-to-Market",
          description: "Evaluate stores, D2C, marketplaces, wholesale and channel expansion."
        },
        {
          number: "06",
          title: "Cash Flow & Working Capital",
          description: "Connect inventory commitments, supplier terms, receivables and cash."
        },
        {
          number: "07",
          title: "Retail Financial Model",
          description: "Connect revenue, COGS, margins, operating costs, contribution and profit."
        },
        {
          number: "08",
          title: "Business & Brand Strategy",
          description: "Clarify positioning, customer, category architecture and commercial growth."
        }
      ].map((item) => (
        <div
          key={item.number}
          className="group rounded-3xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="text-xs font-semibold tracking-[0.2em] text-slate-400">
            {item.number}
          </div>

          <h3 className="mt-5 text-lg font-bold">
            {item.title}
          </h3>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            {item.description}
          </p>

          <div className="mt-6 h-px w-10 bg-slate-900 transition-all group-hover:w-16" />
        </div>
      ))}

    </div>

    <div className="mt-16 rounded-3xl bg-slate-950 px-8 py-12 text-white md:px-12">

      <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">

        <div>
          <div className="text-sm uppercase tracking-[0.2em] text-slate-400">
            The Commercial Mindset
          </div>

          <h3 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">
            The objective is not to sell more at any cost.
            It is to build a business that grows profitably.
          </h3>

          <p className="mt-5 max-w-2xl leading-7 text-slate-400">
            Better products. Better buying decisions. Better inventory.
            Better cash utilisation. Better returns on the capital invested
            in the business.
          </p>
        </div>

        <a
          href="/consulting/contact"
          className="inline-flex whitespace-nowrap rounded-full bg-white px-7 py-3 font-semibold text-slate-950"
        >
          Discuss Your Business
        </a>

      </div>

    </div>

  </div>
</section>
{/* FASHION RETAIL COMMERCIAL CYCLE */}
<section className="bg-slate-950 text-white">
  <div className="mx-auto max-w-7xl px-6 py-24">

    <div className="grid gap-12 md:grid-cols-[1fr_0.8fr] md:items-end">

      <div>
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
          The Fashion Retail Commercial Cycle
        </div>

        <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
          From Idea to Profitable Retail
        </h2>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Understand how a product moves from idea to concept, assortment,
          buying, inventory, sales and finally profitability.
        </p>
      </div>

      <div className="md:text-right">
        <p className="text-sm leading-6 text-slate-400">
          Every decision affects the next one.
          <br />
          The commercial system has to work as a whole.
        </p>
      </div>

    </div>

    <div className="mt-16 grid gap-4 md:grid-cols-7">

      {[
        {
          number: "01",
          title: "Idea",
          text: "Customer need, trend, opportunity and business idea."
        },
        {
          number: "02",
          title: "Concept",
          text: "Product direction, category, price and customer proposition."
        },
        {
          number: "03",
          title: "MFP",
          text: "Set sales, margin, stock investment and commercial targets before building the assortment."
        },
        {
          number: "04",
          title: "Assortment",
          text: "Options, colours, sizes, depth, price architecture and mix."
        },
        {
          number: "05",
          title: "Buying",
          text: "Quantity, vendor, costing, OTB, commitments and delivery."
        },
        {
          number: "06",
          title: "Inventory",
          text: "Allocation, WOS, ROS, replenishment and stock productivity."
        },
        {
          number: "07",
          title: "Sales",
          text: "Rate of sale, sell-through, conversion, AOV and markdown."
        },
        {
          number: "08",
          title: "Profitability",
          text: "Margin, contribution, GMROI, cash and return on inventory."
        }
      ].map((item) => (
        <div
          key={item.number}
          className="relative rounded-3xl border border-slate-700 bg-slate-900 p-5"
        >

          <div className="text-xs font-semibold tracking-[0.2em] text-slate-500">
            {item.number}
          </div>

          <h3 className="mt-4 text-lg font-bold">
            {item.title}
          </h3>

          <p className="mt-3 text-xs leading-5 text-slate-400">
            {item.text}
          </p>

          {item.number !== "08" && (
            <div className="absolute -right-3 top-1/2 hidden h-px w-2 bg-slate-600 md:block" />
          )}

        </div>
      ))}

    </div>

    <div className="mt-14 flex flex-col gap-6 border-t border-slate-800 pt-10 md:flex-row md:items-center md:justify-between">

      <div>
        <div className="text-xl font-semibold">
          Creative thinking + commercial discipline
        </div>

        <div className="mt-2 text-sm text-slate-400">
          That is how fashion businesses create profitable growth.
        </div>
      </div>

      <a
        href="/fashion-retail-cycle"
        className="inline-flex rounded-full border border-slate-600 px-7 py-3 font-semibold text-white hover:bg-slate-800"
      >
        Explore the Full Retail Cycle
      </a>

    </div>

  </div>
</section>
{/* WHY RISHI */}
<section className="bg-white">
  <div className="mx-auto max-w-7xl px-6 py-24">

    <div className="grid gap-14 md:grid-cols-[0.8fr_1.2fr] md:items-center">

      <div>
        <div className="rounded-3xl bg-slate-950 p-8 text-white md:p-10">

          <div className="text-sm uppercase tracking-[0.2em] text-slate-400">
            Why Rishi
          </div>

          <h3 className="mt-6 text-4xl font-bold tracking-tight">
            Built. Scaled. Operated.
          </h3>

          <p className="mt-4 text-sm leading-6 text-slate-400">
            23+ years of fashion retail experience across product,
            buying, merchandising, P&amp;L and business leadership.
          </p>

          <div className="mt-5 inline-flex items-center rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-white">
            NIFT
            <span className="ml-2 font-normal text-slate-400">
              Fashion &amp; Retail Foundation
            </span>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-slate-800 pt-7">

            <div>
              <div className="text-3xl font-bold">₹600+ Cr</div>
              <div className="mt-1 text-xs text-slate-500">
                Business Scale
              </div>
            </div>

            <div>
              <div className="text-3xl font-bold">450+</div>
              <div className="mt-1 text-xs text-slate-500">
                Store Business Experience
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold">
                P&amp;L Leadership
              </div>
              <div className="mt-1 text-xs text-slate-500">
                Commercial &amp; financial accountability
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold">
                Omnichannel
              </div>
              <div className="mt-1 text-xs text-slate-500">
                Stores + D2C + Marketplace
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold">
                Brands Launched
              </div>
              <div className="mt-1 text-xs text-slate-500">
                From concept to market
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold">
                International Brand Management
              </div>
              <div className="mt-1 text-xs text-slate-500">
                Global brand strategy, product, merchandising and commercial execution
              </div>
            </div>

          </div>

        </div>
      </div>

      <div>

        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Experience Behind the Advice
        </div>

        <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
          I've built, scaled and run fashion businesses.
        </h2>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          I don't approach a fashion business as a consultant looking at
          one department. I've worked across the entire commercial engine —
          from product and brand creation to buying, merchandising, retail,
          omnichannel, P&amp;L and business growth.
        </p>

        <p className="mt-5 max-w-2xl leading-7 text-slate-600">
          I've been responsible for building and scaling businesses,
          launching brands, managing large retail networks and making the
          commercial decisions that determine whether inventory turns into
          profitable revenue and cash.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">

          <div className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">
            The Perspective I Bring
          </div>

          <p className="mt-3 leading-7 text-slate-700">
            Practical. Commercial. Grounded in what actually happens
            inside a fashion business.
          </p>

        </div>

        <div className="mt-9">

          <a
            href="/about"
            className="inline-flex rounded-full bg-slate-950 px-7 py-3 font-semibold text-white"
          >
            Meet Rishi
          </a>

        </div>

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
Build practical skills in merchandise planning, buying, retail finance, Excel and fashion business strategy.
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
          <div><div className="text-2xl font-bold">{String.fromCharCode(8377)}{Number(course.price).toLocaleString("en-IN")}</div><div className="mt-1 text-xs text-slate-500">${Math.round(Number(course.price) / usdInrRate).toLocaleString("en-US")} USD</div></div>
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


      <TemplateSection usdInrRate={usdInrRate} />

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-7xl px-6 py-24">

        <div className="grid gap-12 md:grid-cols-2 md:items-center">

          <div className="h-96 rounded-3xl overflow-hidden"><img src="/images/academy-about-clean.png" alt="Fashion Retail Academy" className="w-full h-full object-cover" /></div>

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
      <footer id="contact" className="bg-slate-950 text-white">

  <div className="mx-auto max-w-7xl px-6 py-14">

    <div className="grid gap-10 md:grid-cols-2 md:items-center">

      <div>

        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
          Let's Talk
        </div>

        <div className="mt-4 text-2xl font-bold">
          Fashion Retail Consulting &amp; Training
        </div>

        <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
          Consulting for fashion businesses.
          <br />
          Training for fashion professionals.
        </p>

      </div>

      <div className="md:text-right">

        <div>
          <a
            href="tel:+918879284750"
            className="text-xl font-semibold hover:text-slate-300"
          >
            +91 88792 84750
          </a>
        </div>

        <div className="mt-3">
          <a
            href="mailto:rishi@fashionretailacademy.com"
            className="text-lg font-medium hover:text-slate-300"
          >
            rishi@fashionretailacademy.com
          </a>
        </div>

        <div className="mt-6 flex justify-start gap-5 text-sm text-slate-400 md:justify-end">
          <a href="#" className="hover:text-white">LinkedIn</a>
          <a href="#" className="hover:text-white">Instagram</a>
          <a href="#" className="hover:text-white">Facebook</a>
          <a
            href="https://wa.me/918879284750"
            className="hover:text-white"
          >
            WhatsApp
          </a>
        </div>

      </div>

    </div>

    <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">

      <a href="/privacy" className="mx-3 hover:text-white">
        Privacy Policy
      </a>

      <a href="/terms" className="mx-3 hover:text-white">
        Terms &amp; Conditions
      </a>

      <a href="/refund-policy" className="mx-3 hover:text-white">
        Refund &amp; Cancellation
      </a>

    </div>

  </div>

</footer>

    </main>
  );
}


























