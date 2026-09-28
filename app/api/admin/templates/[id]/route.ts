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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { supabase, user } = await getAdmin();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const form = await request.formData();

  const title = String(form.get("title") || "").trim();
  const description = String(form.get("description") || "").trim();
  const price = Number(form.get("price") || 0);
  const file = form.get("file");

  const { data: existing, error: existingError } = await supabase
    .from("templates")
    .select("*")
    .eq("id", id)
    .eq("created_by", user.id)
    .single();

  if (existingError || !existing) {
    return NextResponse.json(
      { error: "Template not found" },
      { status: 404 }
    );
  }

  let filePath = existing.file_path;
  let fileName = existing.file_name;

  if (file instanceof File && file.size > 0) {
    const newPath = `${user.id}/${crypto.randomUUID()}-${file.name}`;
    const bytes = await file.arrayBuffer();

    const { error: uploadError } = await supabase.storage
      .from("templates")
      .upload(newPath, bytes, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json(
        { error: uploadError.message },
        { status: 500 }
      );
    }

    if (existing.file_path) {
      await supabase.storage
        .from("templates")
        .remove([existing.file_path]);
    }

    filePath = newPath;
    fileName = file.name;
  }

  const { data, error } = await supabase
    .from("templates")
    .update({
      title,
      description,
      price,
      file_path: filePath,
      file_name: fileName,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("created_by", user.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { supabase, user } = await getAdmin();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const { data: existing } = await supabase
    .from("templates")
    .select("file_path")
    .eq("id", id)
    .eq("created_by", user.id)
    .single();

  if (existing?.file_path) {
    await supabase.storage
      .from("templates")
      .remove([existing.file_path]);
  }

  const { error } = await supabase
    .from("templates")
    .delete()
    .eq("id", id)
    .eq("created_by", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}