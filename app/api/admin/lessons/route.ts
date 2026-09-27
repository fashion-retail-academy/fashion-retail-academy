export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || user.id !== process.env.ADMIN_USER_ID) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const course_id = String(body.courseId || "").trim();
    const lesson_number = Number(body.lessonNumber);
    const title = String(body.title || "").trim();
    const description = String(body.description || "").trim();
    const duration_minutes =
      body.durationMinutes === null || body.durationMinutes === ""
        ? null
        : Number(body.durationMinutes);
    const video_url = String(body.videoUrl || "").trim();
    const resource_url = String(body.pdfUrl || body.resourceUrl || "").trim();
    const workbook_url = String(body.excelUrl || body.workbookUrl || "").trim();
    const published = Boolean(body.published);

    if (!course_id || !title || !Number.isFinite(lesson_number)) {
      return NextResponse.json(
        { error: "Course, lesson number and title are required." },
        { status: 400 }
      );
    }

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const { data, error } = await supabase
      .from("lessons")
      .insert({
        course_id,
        lesson_number,
        title,
        slug,
        description: description || null,
        duration_minutes,
        video_url: video_url || null,
        resource_url: resource_url || null,
        workbook_url: workbook_url || null,
        published,
      })
      .select("id, course_id, lesson_number, title, slug")
      .single();

    if (error) {
      console.error("CREATE LESSON ERROR:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      lesson: data,
    });
  } catch (error) {
    console.error("CREATE LESSON ERROR:", error);

    return NextResponse.json(
      { error: "Unable to create lesson." },
      { status: 500 }
    );
  }
}
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
