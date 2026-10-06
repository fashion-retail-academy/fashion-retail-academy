export default function FashionRetailCycle() {
  const stages = [
    {
      number: "01",
      title: "Idea & Concept",
      subtitle: "Start with an idea worth building.",
      text: "Every successful fashion product starts with an idea. Understand the customer, market opportunity, trend, need or business problem that can become a commercial product.",
      points: [
        "Customer and market understanding",
        "Trend and opportunity identification",
        "Brand and product direction",
        "Target customer definition",
        "Concept development",
      ],
    },
    {
      number: "02",
      title: "Product & Collection Planning",
      subtitle: "Turn the idea into a product.",
      text: "Translate the concept into a collection with the right categories, products, colours, sizes, price points and architecture.",
      points: [
        "Category and collection planning",
        "Option and SKU planning",
        "Colour and size architecture",
        "Price architecture",
        "Product mix and assortment",
      ],
    },
    {
      number: "03",
      title: "Assortment & Buying",
      subtitle: "Buy the right product, in the right quantity, at the right price.",
      text: "Convert the assortment into a commercial buying plan that balances customer demand, margins, inventory investment and channel requirements.",
      points: [
        "Assortment planning",
        "Option planning",
        "Buy quantity planning",
        "Costing and margin management",
        "Vendor and channel planning",
      ],
    },
    {
      number: "04",
      title: "Merchandise Planning",
      subtitle: "Turn products into a financial plan.",
      text: "Connect sales, stock, margin and inventory into one commercial plan.",
      points: [
        "Sales planning",
        "WSSI",
        "Open-to-Buy",
        "WOS & ROS",
        "Sell-through planning",
        "Intake planning",
        "Markdown planning",
        "Size curve planning",
      ],
    },
    {
      number: "05",
      title: "Inventory & Supply Chain",
      subtitle: "Get the right stock to the right place at the right time.",
      text: "Manage the flow of inventory from vendor to warehouse, store, D2C and marketplace while protecting availability and working capital.",
      points: [
        "Intake planning",
        "Vendor delivery planning",
        "Stock allocation",
        "Store-wise distribution",
        "Replenishment",
        "Inventory ageing",
        "RTV and liquidation",
      ],
    },
    {
      number: "06",
      title: "Sales & In-Season Management",
      subtitle: "Read the business and react quickly.",
      text: "Once the product reaches the customer, actual performance tells you what to do next.",
      points: [
        "Actual vs target sales",
        "Sell-through analysis",
        "ROS and WOS",
        "Stock productivity",
        "Store and channel performance",
        "Size performance",
        "Replenishment decisions",
        "Markdown decisions",
      ],
    },
    {
      number: "07",
      title: "Retail Finance & Profitability",
      subtitle: "Because sales alone do not make a successful business.",
      text: "Understand how every merchandising and buying decision ultimately affects margin, cash and profit.",
      points: [
        "Revenue",
        "Gross margin",
        "Markdown impact",
        "COGS",
        "Contribution margin",
        "CAC and ROAS",
        "Working capital",
        "Cash flow",
        "Profitability",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <a href="/" className="text-xl font-bold tracking-tight">
            FASHION RETAIL
            <span className="block text-xs font-normal tracking-[0.35em] text-slate-500">
              ACADEMY
            </span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            <a href="/#courses" className="text-sm hover:text-slate-500">Courses</a>
            <a href="/#templates" className="text-sm hover:text-slate-500">Templates</a>
            <a href="/consulting/contact" className="text-sm hover:text-slate-500">Consulting</a>
            <a href="/about" className="text-sm hover:text-slate-500">About Rishi</a>
            <a href="/#contact" className="text-sm hover:text-slate-500">Contact</a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-medium"
            >
              Login
            </a>
            <a
              href="/register"
              className="rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white"
            >
              Register
            </a>
          </div>
        </div>
      </nav>

      <section className="bg-slate-950 px-6 py-24 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
            THE FASHION RETAIL COMMERCIAL CYCLE
          </p>

          <h1 className="max-w-5xl text-5xl font-bold leading-tight md:text-7xl">
            From idea to
            <br />
            profitable retail.
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300">
            Understand how a fashion product moves from{" "}
            <strong className="text-white">
              idea → concept → assortment → buying → inventory → sales → profitability.
            </strong>
          </p>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
            Fashion retail is not a collection of disconnected departments.
            Every decision affects the next one — and ultimately determines
            whether a product becomes a commercial success.
          </p>
          <section className="bg-white py-24">
            <div className="mx-auto max-w-7xl px-6">
              <div className="mx-auto mb-20 max-w-7xl">
                <div className="overflow-hidden rounded-[2rem] bg-slate-950 p-6 shadow-2xl md:p-10">

                  <div className="mb-10 text-center">
                    <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                      The commercial journey
                    </div>
                    <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
                      From idea to profitability.
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 md:text-base">
                      Every stage creates the conditions for the next commercial decision.
                    </p>
                  </div>

                  <div className="grid gap-3 md:grid-cols-7">

                    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
                      <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-slate-950">01</div>
                      <div className="text-lg font-bold text-white">Idea</div>
                      <div className="mt-3 text-sm leading-6 text-slate-400">
                        Customer need, trend, opportunity and business idea.
                      </div>
                    </div>

                    <div className="flex items-center justify-center text-2xl text-slate-600 md:hidden">↓</div>
                    <div className="hidden items-center justify-center text-2xl text-slate-600 md:flex">→</div>

                    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
                      <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-slate-950">02</div>
                      <div className="text-lg font-bold text-white">Concept</div>
                      <div className="mt-3 text-sm leading-6 text-slate-400">
                        Product direction, category, price and customer proposition.
                      </div>
                    </div>

                    <div className="flex items-center justify-center text-2xl text-slate-600 md:hidden">↓</div>
                    <div className="hidden items-center justify-center text-2xl text-slate-600 md:flex">→</div>

                    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
                      <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-slate-950">03</div>
                      <div className="text-lg font-bold text-white">Assortment</div>
                      <div className="mt-3 text-sm leading-6 text-slate-400">
                        Options, colours, sizes, depth, price architecture and mix.
                      </div>
                    </div>

                    <div className="flex items-center justify-center text-2xl text-slate-600 md:hidden">↓</div>
                    <div className="hidden items-center justify-center text-2xl text-slate-600 md:flex">→</div>

                    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
                      <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-slate-950">04</div>
                      <div className="text-lg font-bold text-white">Buying</div>
                      <div className="mt-3 text-sm leading-6 text-slate-400">
                        Quantity, vendor, costing, OTB, commitments and delivery.
                      </div>
                    </div>

                    <div className="flex items-center justify-center text-2xl text-slate-600 md:hidden">↓</div>
                    <div className="hidden items-center justify-center text-2xl text-slate-600 md:flex">→</div>

                    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
                      <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-slate-950">05</div>
                      <div className="text-lg font-bold text-white">Inventory</div>
                      <div className="mt-3 text-sm leading-6 text-slate-400">
                        Allocation, WOS, ROS, replenishment and stock productivity.
                      </div>
                    </div>

                    <div className="flex items-center justify-center text-2xl text-slate-600 md:hidden">↓</div>
                    <div className="hidden items-center justify-center text-2xl text-slate-600 md:flex">→</div>

                    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
                      <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-slate-950">06</div>
                      <div className="text-lg font-bold text-white">Sales</div>
                      <div className="mt-3 text-sm leading-6 text-slate-400">
                        Rate of sale, sell-through, conversion, AOV and markdown.
                      </div>
                    </div>

                    <div className="flex items-center justify-center text-2xl text-slate-600 md:hidden">↓</div>
                    <div className="hidden items-center justify-center text-2xl text-slate-600 md:flex">→</div>

                    <div className="rounded-2xl border border-white/20 bg-white p-5">
                      <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">07</div>
                      <div className="text-lg font-bold text-slate-950">Profitability</div>
                      <div className="mt-3 text-sm leading-6 text-slate-600">
                        Margin, contribution, GMROI, cash and return on inventory.
                      </div>
                    </div>

                  </div>

                  <div className="mt-8 border-t border-slate-800 pt-7 text-center">
                    <p className="text-sm font-medium text-slate-300">
                      <span className="text-white">Creative thinking</span>
                      <span className="mx-2 text-slate-600">+</span>
                      <span className="text-white">commercial discipline</span>
                      <span className="mx-2 text-slate-600">=</span>
                      <span className="text-white">profitable fashion retail</span>
                    </p>
                  </div>

                </div>
              </div>
              <div className="mb-12 text-center">
                <div className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                  The commercial flow
                </div>
                <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
                  Every decision connects to the next.
                </h2>
                <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                  A successful fashion product is not created by one department.
                  It moves through a connected commercial system where every decision
                  influences demand, inventory, sales and profit.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-7">

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center shadow-sm">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-lg font-bold text-white">1</div>
                  <h3 className="text-lg font-bold text-slate-950">Idea</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Customer need, trend, opportunity and business idea.
                  </p>
                </div>

                <div className="hidden items-center justify-center md:flex">
                  <span className="text-3xl text-slate-300">→</span>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center shadow-sm">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-lg font-bold text-white">2</div>
                  <h3 className="text-lg font-bold text-slate-950">Concept</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Product direction, category, price and customer proposition.
                  </p>
                </div>

                <div className="hidden items-center justify-center md:flex">
                  <span className="text-3xl text-slate-300">→</span>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center shadow-sm">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-lg font-bold text-white">3</div>
                  <h3 className="text-lg font-bold text-slate-950">Assortment</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Options, colours, sizes, depth, price architecture and mix.
                  </p>
                </div>

                <div className="hidden items-center justify-center md:flex">
                  <span className="text-3xl text-slate-300">→</span>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center shadow-sm">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-lg font-bold text-white">4</div>
                  <h3 className="text-lg font-bold text-slate-950">Buying</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Quantity, vendor, costing, OTB, commitments and delivery.
                  </p>
                </div>

                <div className="hidden items-center justify-center md:flex">
                  <span className="text-3xl text-slate-300">→</span>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center shadow-sm">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-lg font-bold text-white">5</div>
                  <h3 className="text-lg font-bold text-slate-950">Inventory</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Allocation, WOS, ROS, replenishment and stock productivity.
                  </p>
                </div>

                <div className="hidden items-center justify-center md:flex">
                  <span className="text-3xl text-slate-300">→</span>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center shadow-sm">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-lg font-bold text-white">6</div>
                  <h3 className="text-lg font-bold text-slate-950">Sales</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Rate of sale, sell-through, conversion, AOV and markdown.
                  </p>
                </div>

                <div className="hidden items-center justify-center md:flex">
                  <span className="text-3xl text-slate-300">→</span>
                </div>

                <div className="rounded-2xl border-2 border-slate-950 bg-slate-950 p-6 text-center shadow-sm">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-lg font-bold text-slate-950">7</div>
                  <h3 className="text-lg font-bold text-white">Profitability</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    Margin, contribution, GMROI, cash and return on inventory.
                  </p>
                </div>

              </div>

              <div className="mt-12 rounded-3xl bg-slate-950 p-8 text-center text-white">
                <div className="text-sm uppercase tracking-[0.25em] text-slate-400">
                  The key principle
                </div>
                <p className="mx-auto mt-4 max-w-4xl text-xl leading-8 md:text-2xl">
                  <strong>Good fashion retail connects creativity with commercial discipline.</strong>
                  The right product idea must become the right assortment, the right buy,
                  the right inventory and ultimately the right profit.
                </p>
              </div>

            </div>
          </section>

        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 grid gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                THE BIG PICTURE
              </p>
              <h2 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">
                Every stage feeds the next.
              </h2>
            </div>

            <p className="text-lg leading-8 text-slate-600">
              From the first product idea through collection planning, buying,
              inventory and sales, commercial decisions need to work together.
              The goal is not simply to sell more — it is to build a healthy,
              profitable and sustainable fashion business.
            </p>
          </div>

          <div className="mb-20 grid gap-4 md:grid-cols-7">
            {[
              "IDEA",
              "CONCEPT",
              "ASSORTMENT",
              "BUYING",
              "INVENTORY",
              "SALES",
              "PROFIT",
            ].map((item, index) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center"
              >
                <div className="text-xs font-semibold tracking-[0.2em] text-slate-400">
                  0{index + 1}
                </div>
                <div className="mt-2 font-bold">{item}</div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {stages.map((stage) => (
              <article
                key={stage.number}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10"
              >
                <div className="grid gap-8 md:grid-cols-[100px_1fr_1fr]">
                  <div className="text-4xl font-bold text-slate-200">
                    {stage.number}
                  </div>

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {stage.title}
                    </p>
                    <h3 className="mt-3 text-2xl font-bold md:text-3xl">
                      {stage.subtitle}
                    </h3>
                  </div>

                  <div>
                    <p className="leading-7 text-slate-600">
                      {stage.text}
                    </p>

                    <div className="mt-6 grid gap-2 sm:grid-cols-2">
                      {stage.points.map((point) => (
                        <div
                          key={point}
                          className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700"
                        >
                          ✓ {point}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-24 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
            THE COMPLETE CYCLE
          </p>

          <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-tight md:text-5xl">
            Learn the system. Build the model. Run the business.
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-300">
            Whether you are a fashion student, merchandise professional,
            buyer, entrepreneur, brand owner or retail leader, understand
            how the decisions connect — and how to turn those decisions into
            commercial results.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="/#courses"
              className="rounded-full bg-white px-8 py-4 font-semibold text-slate-950"
            >
              Explore Courses
            </a>

            <a
              href="/#templates"
              className="rounded-full border border-slate-600 px-8 py-4 font-semibold text-white"
            >
              Explore Templates
            </a>

            <a
              href="/consulting/contact"
              className="rounded-full border border-slate-600 px-8 py-4 font-semibold text-white"
            >
              Work With Rishi
            </a>
          </div>
        </div>
      </section>


          <section className="bg-slate-100 px-6 py-24">
            <div className="mx-auto max-w-6xl text-center">

              <div className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                Take the next step
              </div>

              <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
                Ready to apply this thinking to your fashion business?
              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                Learn the fundamentals, build the models and understand the
                commercial decisions that drive a profitable fashion business.
                Choose the path that fits where you are today.
              </p>

              <div className="mt-10 grid gap-5 md:grid-cols-3">

                <a
                  href="/#courses"
                  className="group rounded-3xl border border-slate-200 bg-white p-8 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Learn
                  </div>

                  <h3 className="mt-4 text-2xl font-bold text-slate-950">
                    Explore Courses
                  </h3>

                  <p className="mt-4 leading-7 text-slate-600">
                    Build practical skills in buying, merchandising, planning,
                    Excel and fashion retail strategy.
                  </p>

                  <div className="mt-6 font-semibold text-slate-950">
                    Explore courses →
                  </div>
                </a>

                <a
                  href="/#templates"
                  className="group rounded-3xl border border-slate-200 bg-white p-8 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Build
                  </div>

                  <h3 className="mt-4 text-2xl font-bold text-slate-950">
                    Use Retail Templates
                  </h3>

                  <p className="mt-4 leading-7 text-slate-600">
                    Work with practical Excel models for WSSI, OTB, WOS,
                    inventory, profitability and retail planning.
                  </p>

                  <div className="mt-6 font-semibold text-slate-950">
                    View templates →
                  </div>
                </a>

                <a
                  href="/consulting/contact"
                  className="group rounded-3xl bg-slate-950 p-8 text-left text-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Work together
                  </div>

                  <h3 className="mt-4 text-2xl font-bold">
                    Fashion Retail Consulting
                  </h3>

                  <p className="mt-4 leading-7 text-slate-300">
                    Get practical help with buying, planning, sourcing,
                    pricing, distribution, go-to-market and profitability.
                  </p>

                  <div className="mt-6 font-semibold text-white">
                    Book a consultation →
                  </div>
                </a>

              </div>

              <div className="mx-auto mt-14 max-w-3xl border-t border-slate-300 pt-10">
                <p className="text-xl font-semibold text-slate-950">
                  Learn the system. Build the model. Run the business.
                </p>

                <p className="mt-3 text-slate-500">
                  Fashion Retail Academy — practical education and consulting
                  for fashion retail professionals and business owners.
                </p>
              </div>

            </div>
          </section>
      <footer className="border-t border-slate-200 bg-white px-6 py-10">
        <div className="mx-auto max-w-6xl text-sm text-slate-500">
          © {new Date().getFullYear()} Fashion Retail Academy. Practical
          education and consulting for fashion retail professionals.
        </div>
      </footer>
    </main>
  );
}




