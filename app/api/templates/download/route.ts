import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const supabase = await createClient();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing template id" }, { status: 400 });
  }

  const { data: template, error } = await supabase
    .from("templates")
    .select("id,title,file_path,file_name,published")
    .eq("id", id)
    .eq("published", true)
    .single();

  if (error || !template || !template.file_path) {
    return NextResponse.json(
      { error: "Template file not available" },
      { status: 404 }
    );
  }

  const { data, error: signedError } = await supabase.storage
    .from("templates")
    .createSignedUrl(template.file_path, 300);

  if (signedError || !data?.signedUrl) {
    return NextResponse.json(
      { error: "Unable to create download link" },
      { status: 500 }
    );
  }

  return NextResponse.redirect(data.signedUrl);
}