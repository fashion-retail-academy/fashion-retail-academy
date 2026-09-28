import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

async function getAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.id !== process.env.ADMIN_USER_ID) {
    return { supabase, user: null };
  }

  return { supabase, user };
}

export async function GET() {
  const { supabase, user } = await getAdmin();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("templates")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data || []);
}

export async function POST(request: Request) {
  const { supabase, user } = await getAdmin();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();

  const title = String(form.get("title") || "").trim();
  const description = String(form.get("description") || "").trim();
  const price = Number(form.get("price") || 0);
  const file = form.get("file");

  if (!title) {
    return NextResponse.json({ error: "Template name is required" }, { status: 400 });
  }

  let filePath: string | null = null;
  let fileName: string | null = null;

  if (file instanceof File && file.size > 0) {
    fileName = file.name;
    filePath = `${user.id}/${crypto.randomUUID()}-${file.name}`;

    const bytes = await file.arrayBuffer();

    const { error: uploadError } = await supabase.storage
      .from("templates")
      .upload(filePath, bytes, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json(
        { error: uploadError.message },
        { status: 500 }
      );
    }
  }

  const { data, error } = await supabase
    .from("templates")
    .insert({
      title,
      description,
      price,
      file_path: filePath,
      file_name: fileName,
      published: true,
      created_by: user.id,
    })
    .select()
    .single();

  if (error) {
    if (filePath) {
      await supabase.storage.from("templates").remove([filePath]);
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}