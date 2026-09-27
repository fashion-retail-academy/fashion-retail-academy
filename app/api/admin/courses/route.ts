import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function makeSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || user.id !== process.env.ADMIN_USER_ID) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const title = String(body.title || "").trim();
    const description = String(body.description || "").trim();
    const price = Number(body.price);
    const published = Boolean(body.published);

    if (!title) {
      return NextResponse.json(
        { error: "Course name is required." },
        { status: 400 }
      );
    }

    if (!Number.isFinite(price) || price < 0) {
      return NextResponse.json(
        { error: "Enter a valid price." },
        { status: 400 }
      );
    }

    const slug = makeSlug(title);

    const { data: existing } = await supabase
      .from("courses")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: "A course with this name already exists." },
        { status: 409 }
      );
    }

    const { data, error } = await supabase
      .from("courses")
      .insert({
        title,
        slug,
        description: description || null,
        price,
        published,
      })
      .select("id, title, slug, price, published")
      .single();

    if (error) {
      console.error("CREATE COURSE ERROR:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ course: data });
  } catch (error) {
    console.error("CREATE COURSE ERROR:", error);
    return NextResponse.json(
      { error: "Unable to create course." },
      { status: 500 }
    );
  }
}
