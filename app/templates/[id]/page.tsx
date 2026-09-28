import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TemplatePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: template } = await supabase
    .from("templates")
    .select("id,title,description,price,file_name,file_path,published")
    .eq("id", id)
    .eq("published", true)
    .single();

  if (!template) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/#templates"
          className="text-sm font-semibold text-slate-600"
        >
          ← Back to Templates
        </Link>

        <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-900 text-2xl text-white">
            XLS
          </div>

          <h1 className="mt-7 text-4xl font-bold">
            {template.title}
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            {template.description}
          </p>

          <div className="mt-8 text-3xl font-bold">
            ₹{Number(template.price).toLocaleString("en-IN")}
          </div>

          {template.file_path ? (
            <a
              href={`/api/templates/download?id=${template.id}`}
              className="mt-8 inline-block rounded-full bg-slate-900 px-7 py-3 font-semibold text-white"
            >
              Download Template
            </a>
          ) : (
            <p className="mt-8 text-slate-500">
              Template file will be available soon.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}