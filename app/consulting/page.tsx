import Link from "next/link";

const services = [
  {
    title: "Buying & Assortment",
    description:
      "Build the right product mix, option count, depth, pricing architecture and buying strategy.",
  },
  {
    title: "Merchandise Financial Planning (MFP)",
    description:
      "Connect sales, stock, intake, margin, OTB and WSSI into one commercial plan.",
  },
  {
    title: "Inventory & Working Capital",
    description:
      "Improve WOS, ROS, inventory turns, sell-through and cash utilisation.",
  },
  {
    title: "Pricing & Profitability",
    description:
      "Build pricing, margin, contribution and profitability frameworks that support growth.",
  },
  {
    title: "Distribution & Go-to-Market",
    description:
      "Choose the right channels and build a commercially viable route to market.",
  },
  {
    title: "Business & Financial Planning",
    description:
      "Connect revenue, margin, inventory, P&L, cash flow and growth plans.",
  },
  {
    title: "Brand & Product Strategy",
    description:
      "Translate customer opportunity into product, category, brand and commercial strategy.",
  },
  {
    title: "Omnichannel Growth",
    description:
      "Connect stores, D2C, marketplaces and channels into one growth strategy.",
  },
];

const engagements = [
  {
    number: "01",
    title: "Business Diagnostic",
    description:
      "For founders and leadership teams who know the business can perform better but need clarity on what is holding it back.",
    points: "Sales • Margin • Inventory • Pricing • Cash • Channels",
    cta: "Discuss Your Business",
  },
  {
    number: "02",
    title: "Commercial Planning & Financial Model",
    description:
      "Build the commercial operating system that connects MFP, WSSI, OTB, assortment, inventory, P&L and cash flow.",
    points: "MFP • WSSI • OTB • Assortment • Inventory • P&L • Cash Flow",
    cta: "Build My Planning System",
  },
  {
    number: "03",
    title: "Team & Professional Training",
    description:
      "Practical capability building for fashion businesses and professionals who want stronger commercial skills.",
    points: "Buying • Merchandising • Planning • Retail Finance • Excel",
    cta: "Discuss Training",
  },
];

export default function ConsultingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* NAVIGATION */}
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <Link href="/" className="shrink-0">
            <div className="text-xl font-bold tracking-tight">
              FASHION RETAIL
            </div>
            <div className="text-xs font-medium tracking-[0.3em] text-slate-500">
              ACADEMY
            </div>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link href="/fashion-retail-cycle" className="text-sm hover:text-slate-500">
              How Fashion Retail Works
            </Link>

            <Link href="/about" className="text-sm hover:text-slate-500">
              About Rishi
            </Link>

            <Link href="/consulting" className="font-medium text-sm text-slate-950">
              Consulting
            </Link>

            <Link href="/#courses" className="text-sm hover:text-slate-500">
              Courses
            </Link>

            <Link href="/#templates" className="text-sm hover:text-slate-500">
              Templates
            </Link>

            <Link href="/#contact" className="text-sm hover:text-slate-500">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-medium hover:bg-slate-50"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white hover:bg-slate-800"
            >
              Register
            </Link>
          </div>

        </div>
      </nav>


      {/* HERO */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 md:grid-cols-2 md:items-center">

          <div>

            <div className="mb-7 inline-block rounded-full border border-slate-700 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-300">
              Fashion Retail Consulting
            </div>

            <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
              Build a More
              <br />
              Profitable
              <br />
              Fashion Business.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
              I help fashion businesses make better commercial decisions
              across buying, merchandising, inventory, pricing, distribution,
              cash flow and profitability.
            </p>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
              From product idea to profitable retail, I connect the decisions
              that drive growth, margin and working capital.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                href="/consulting/contact"
                className="rounded-full bg-white px-7 py-3 font-semibold text-slate-950 hover:bg-slate-100"
              >
                Discuss Your Business
              </Link>

              <a
                href="https://calendar.app.google/Fv6tkonCb8jhLRCd9"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-slate-600 px-7 py-3 font-semibold text-white hover:bg-slate-900"
              >
                Book a Consultation
              </a>

            </div>

          </div>


          <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8">

            <div className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Where I Help
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">

              {services.map((service) => (
                <div
                  key={service.title}
                  className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5"
                >
                  <div className="font-semibold">
                    {service.title}
                  </div>

                  <div className="mt-3 text-sm leading-6 text-slate-400">
                    {service.description}
                  </div>
                </div>
              ))}

            </div>

          </div>

        </div>
      </section>


      {/* WHY RISHI */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24">

          <div className="grid gap-14 md:grid-cols-2 md:items-center">

            <div className="rounded-3xl bg-slate-950 p-8 text-white md:p-10">

              <div className="text-sm uppercase tracking-[0.2em] text-slate-400">
                Why Rishi
              </div>

              <h2 className="mt-5 text-3xl font-bold tracking-tight md:text-4xl">
                Built. Scaled. Operated.
              </h2>

              <p className="mt-5 leading-7 text-slate-300">
                23+ years of fashion retail experience across product,
                buying, merchandising, planning, P&amp;L and business
                leadership.
              </p>

              <div className="mt-6 border-t border-slate-800 pt-5">
                <div className="font-semibold text-white">NIFT</div>
                <div className="mt-2 text-sm text-slate-400">
                  Fashion &amp; retail foundation
                </div>
              </div>

              <div className="my-8 border-t border-slate-800" />

              <div className="grid grid-cols-2 gap-7">

                <div>
                  <div className="text-3xl font-bold">₹600+ Cr</div>
                  <div className="mt-2 text-sm text-slate-400">
                    Business scale
                  </div>
                </div>

                <div>
                  <div className="text-3xl font-bold">450+</div>
                  <div className="mt-2 text-sm text-slate-400">
                    Store business experience
                  </div>
                </div>

                <div>
                  <div className="font-semibold">P&amp;L Leadership</div>
                  <div className="mt-2 text-sm text-slate-400">
                    Commercial &amp; financial accountability
                  </div>
                </div>

                <div>
                  <div className="font-semibold">Omnichannel</div>
                  <div className="mt-2 text-sm text-slate-400">
                    Stores + D2C + marketplaces
                  </div>
                </div>

                <div>
                  <div className="font-semibold">Brands Launched</div>
                  <div className="mt-2 text-sm text-slate-400">
                    From concept to market
                  </div>
                </div>

                <div>
                  <div className="font-semibold">
                    International Brand Management
                  </div>
                  <div className="mt-2 text-sm text-slate-400">
                    Experience working across global brand frameworks
                  </div>
                </div>

              </div>

            </div>


            <div>

              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Experience Behind the Advice
              </div>

              <h2 className="mt-5 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
                I've built, scaled and run fashion businesses.
              </h2>

              <p className="mt-7 text-lg leading-8 text-slate-600">
                I don't approach a fashion business as a consultant looking
                at one department. I've worked across the entire commercial
                engine — from product and brand creation to buying,
                merchandising, retail, omnichannel, P&amp;L and business
                growth.
              </p>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                I've been responsible for building and scaling businesses,
                launching brands, managing large retail networks and making
                the commercial decisions that determine whether inventory
                turns into profitable revenue and cash.
              </p>

              <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-7">

                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  The Perspective I Bring
                </div>

                <p className="mt-4 text-lg leading-7 text-slate-700">
                  Practical. Commercial. Grounded in what actually happens
                  inside a fashion business.
                </p>

              </div>

              <Link
                href="/about"
                className="mt-8 inline-block rounded-full bg-slate-950 px-8 py-3 font-semibold text-white hover:bg-slate-800"
              >
                Meet Rishi
              </Link>

            </div>

          </div>

        </div>
      </section>


      {/* HOW I WORK */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-24">

          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              How I Work
            </div>

            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              From business problem to practical solution.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              The objective is not another presentation. It is to create
              clarity, build the right commercial system and help the team
              execute it.
            </p>
          </div>


          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {[
              {
                number: "01",
                title: "Understand",
                text: "Understand the business, customer, product, channels, financials and the commercial problem that needs solving.",
              },
              {
                number: "02",
                title: "Build",
                text: "Build the strategy, MFP, WSSI, OTB, financial models, processes and action plan required to solve it.",
              },
              {
                number: "03",
                title: "Implement",
                text: "Work with leadership and teams to put the system into practice and create measurable commercial improvement.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="rounded-3xl border border-slate-200 bg-white p-8"
              >
                <div className="text-sm font-semibold tracking-[0.2em] text-slate-400">
                  {item.number}
                </div>

                <h3 className="mt-5 text-2xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {item.text}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>


      {/* ENGAGEMENTS */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24">

          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Ways We Can Work Together
            </div>

            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Choose the support your business needs.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Different businesses need different levels of support — from
              identifying the problem to building the complete commercial
              system.
            </p>
          </div>


          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {engagements.map((item) => (
              <div
                key={item.number}
                className="flex flex-col rounded-3xl border border-slate-200 p-8"
              >

                <div className="text-sm font-semibold tracking-[0.2em] text-slate-400">
                  {item.number}
                </div>

                <h3 className="mt-5 text-2xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-5 flex-1 leading-7 text-slate-600">
                  {item.description}
                </p>

                <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm font-medium leading-6 text-slate-700">
                  {item.points}
                </div>

                <Link
                  href="/consulting/contact"
                  className="mt-7 inline-block rounded-full bg-slate-950 px-6 py-3 text-center font-semibold text-white hover:bg-slate-800"
                >
                  {item.cta}
                </Link>

              </div>
            ))}

          </div>

        </div>
      </section>


      {/* FINAL CTA */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">

          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Start With The Business
          </div>

          <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
            Let's understand your business before we decide what it needs.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Tell me where the business is today, what you are trying to
            achieve and where you are getting stuck.
          </p>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-slate-400">
            No fixed package. No one-size-fits-all solution. We start with your
            business, your numbers and your objectives.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <Link
              href="/consulting/contact"
              className="rounded-full bg-white px-8 py-3 font-semibold text-slate-950 hover:bg-slate-100"
            >
              Send an Enquiry
            </Link>

            <a
              href="https://calendar.app.google/Fv6tkonCb8jhLRCd9"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-slate-600 px-8 py-3 font-semibold text-white hover:bg-slate-900"
            >
              Book a 30-Minute Consultation
            </a>

          </div>

          <div className="mt-8 text-sm text-slate-400">
            <a href="tel:+918879284750" className="hover:text-white">
              +91 88792 84750
            </a>
            <span className="mx-3">•</span>
            <a
              href="mailto:rishi@fashionretailacademy.com"
              className="hover:text-white"
            >
              rishi@fashionretailacademy.com
            </a>
          </div>

        </div>
      </section>


      {/* FOOTER */}
      <footer className="bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between">

          <div>
            <div className="font-bold">
              FASHION RETAIL ACADEMY
            </div>

            <div className="mt-1 text-sm text-slate-500">
              Consulting, training and practical commercial education for
              fashion businesses and professionals.
            </div>
          </div>

          <div className="flex flex-wrap gap-5 text-sm text-slate-500">
            <Link href="/about">About Rishi</Link>
            <Link href="/consulting/contact">Enquiry</Link>
            <a href="tel:+918879284750">+91 88792 84750</a>
            <a href="mailto:rishi@fashionretailacademy.com">
              rishi@fashionretailacademy.com
            </a>
          </div>

        </div>

        <div className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
          <Link href="/privacy" className="mx-3 hover:text-slate-900">
            Privacy Policy
          </Link>

          <Link href="/terms" className="mx-3 hover:text-slate-900">
            Terms &amp; Conditions
          </Link>

          <Link href="/refund-policy" className="mx-3 hover:text-slate-900">
            Refund &amp; Cancellation
          </Link>
        </div>
      </footer>

    </main>
  );
}





