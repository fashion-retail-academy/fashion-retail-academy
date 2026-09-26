import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function PATCH(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Not logged in" },
      { status: 401 }
    );
  }

  if (user.id !== process.env.ADMIN_USER_ID) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 403 }
    );
  }

  const body = await request.json();

  const {
    id,
    lesson_number,
    title,
    description,
    duration_minutes,
    video_url,
    resource_url,
    workbook_url,
    published,
  } = body;

  if (!id || !title) {
    return NextResponse.json(
      { error: "Lesson ID and title are required." },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("lessons")
    .update({
      lesson_number: Number(lesson_number),
      title,
      description: description || null,
      duration_minutes: duration_minutes
        ? Number(duration_minutes)
        : null,
      video_url: video_url || null,
      resource_url: resource_url || null,
      workbook_url: workbook_url || null,
      published: Boolean(published),
    })
    .eq("id", id);

  if (error) {
    console.error(error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Lesson updated successfully.",
  });
}
