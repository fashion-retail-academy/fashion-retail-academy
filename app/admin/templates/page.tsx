import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import TemplatesManager from "./TemplatesManager";

export default async function TemplatesAdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.id !== process.env.ADMIN_USER_ID) {
    redirect("/login");
  }

  const { data: templates } = await supabase
    .from("templates")
    .select("*")
    .order("created_at", { ascending: true });

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <a
          href="/admin"
          className="mb-6 inline-block rounded-lg bg-[#0b1026] px-5 py-2 font-semibold text-white"
        >
          ← Back to Admin
        </a>

        <h1 className="text-4xl font-bold text-slate-900">
          Template Management
        </h1>

        <p className="mt-3 text-lg text-slate-600">
          Create templates, upload Excel files and change pricing.
        </p>

        <TemplatesManager initialTemplates={templates || []} />
      </div>
    </main>
  );
}