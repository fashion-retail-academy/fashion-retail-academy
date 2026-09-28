import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function TemplateSection({
  usdInrRate,
}: {
  usdInrRate: number;
}) {
  const supabase = await createClient();

  const { data: templates } = await supabase
    .from("templates")
    .select("id,title,description,price")
    .eq("published", true)
    .order("created_at", { ascending: true });

  return (
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
          {(templates || []).map((template) => (
            <div
              key={template.id}
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

              <div className="mt-7 flex items-center justify-between gap-4">
                <div>
                  <div className="text-2xl font-bold">
                    {String.fromCharCode(8377)}
                    {Number(template.price).toLocaleString("en-IN")}
                  </div>

                  <div className="mt-1 text-xs text-slate-500">
                    ${Math.round(Number(template.price) / usdInrRate).toLocaleString("en-US")} USD
                  </div>
                </div>

                <Link
                  href={`/templates/${template.id}`}
                  className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold"
                >
                  View Template
                </Link>
              </div>
            </div>
          ))}

          {(!templates || templates.length === 0) && (
            <p className="text-slate-500">
              Templates will appear here soon.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}