import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "fs";
import path from "path";

const MM = 72 / 25.4;

export async function GET() {
  try {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll() {},
        },
      }
    );

    // Check logged-in student
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 }
      );
    }

// Get student name from Supabase Auth metadata
const studentName =
  user.user_metadata?.full_name?.trim() || "Student";   

    // Get course
    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select("id, slug, title")
      .eq("slug", "fashion-merchandise-planning")
      .maybeSingle();

    if (courseError || !course) {
      return NextResponse.json(
        { error: "Course not found." },
        { status: 404 }
      );
    }

    // Confirm active enrollment
    const { data: enrollment, error: enrollmentError } = await supabase
      .from("enrollments")
      .select("id")
      .eq("user_id", user.id)
      .eq("course_id", course.id)
      .eq("status", "active")
      .maybeSingle();

    if (enrollmentError) {
      console.error(enrollmentError);
      return NextResponse.json(
        { error: "Unable to verify enrollment." },
        { status: 500 }
      );
    }

    if (!enrollment) {
      return NextResponse.json(
        { error: "You are not enrolled in this course." },
        { status: 403 }
      );
    }

    // Count published lessons
    const { data: lessons, error: lessonsError } = await supabase
      .from("lessons")
      .select("slug")
      .eq("course_id", course.id)
      .eq("published", true);

    if (lessonsError) {
      console.error(lessonsError);
      return NextResponse.json(
        { error: "Unable to check course lessons." },
        { status: 500 }
      );
    }

    const totalLessons = lessons?.length ?? 0;

    // Count completed lessons
    const { data: progress, error: progressError } = await supabase
      .from("lesson_progress")
      .select("lesson_slug")
      .eq("user_id", user.id)
      .eq("course_slug", course.slug)
      .eq("completed", true);

    if (progressError) {
      console.error(progressError);
      return NextResponse.json(
        { error: "Unable to check learning progress." },
        { status: 500 }
      );
    }

    const completedLessons = progress?.length ?? 0;

    // Certificate is available only after full completion
    if (totalLessons === 0 || completedLessons < totalLessons) {
      return NextResponse.json(
        {
          error: `Certificate available after completing all ${totalLessons} lessons.`,
        },
        { status: 403 }
      );
    }

    // Load certificate template
    const templatePath = path.join(
      process.cwd(),
      "public",
      "resources",
      "Fashion_Retail_Academy_Certificate_Template.pdf"
    );

    const templateBytes = fs.readFileSync(templatePath);
    const pdfDoc = await PDFDocument.load(templateBytes);
    const page = pdfDoc.getPages()[0];

    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const pageWidth = page.getWidth();
    const pageHeight = page.getHeight();

    const background = rgb(248 / 255, 247 / 255, 242 / 255);
    const navy = rgb(11 / 255, 16 / 255, 38 / 255);
    const gold = rgb(184 / 255, 155 / 255, 94 / 255);
    const darkText = rgb(51 / 255, 51 / 255, 51 / 255);

 

    const completionDate = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    });

    const certificateNumber =
      `FRA-FMP-${user.id.replace(/-/g, "").slice(0, 8).toUpperCase()}`;
const { data: existingCertificate, error: certificateLookupError } =
  await supabase
    .from("certificates")
    .select("id")
    .eq("certificate_number", certificateNumber)
    .maybeSingle();

if (certificateLookupError) {
  console.error(certificateLookupError);
  return NextResponse.json(
    { error: "Unable to verify certificate record." },
    { status: 500 }
  );
}

if (!existingCertificate) {
  const { error: certificateInsertError } = await supabase
    .from("certificates")
    .insert({
      certificate_number: certificateNumber,
      user_id: user.id,
      course_id: course.id,
      student_name: studentName,
      course_title: course.title,
      completed_at: new Date().toISOString(),
    });

  if (certificateInsertError) {
    console.error(certificateInsertError);
    return NextResponse.json(
      { error: "Unable to save certificate record." },
      { status: 500 }
    );
  }
}
    // Cover the template student-name placeholder
page.drawRectangle({
  x: 70 * MM,
  y: pageHeight - 98 * MM,
  width: 160 * MM,
  height: 14 * MM,
  color: background,
});  

    // Draw student name
    const nameSize = 27;
    const nameWidth = boldFont.widthOfTextAtSize(studentName, nameSize);

    page.drawText(studentName, {
      x: (pageWidth - nameWidth) / 2,
      y: pageHeight - 91 * MM,
      size: nameSize,
      font: boldFont,
      color: rgb(17 / 255, 17 / 255, 17 / 255),
    });

    // Restore gold underline
    page.drawLine({
      start: {
        x: pageWidth / 2 - 55 * MM,
        y: pageHeight - 95 * MM,
      },
      end: {
        x: pageWidth / 2 + 55 * MM,
        y: pageHeight - 95 * MM,
      },
      thickness: 0.8,
      color: gold,
    });

    // Cover certificate number placeholder
    page.drawRectangle({
      x: 34 * MM,
      y: 28 * MM,
      width: 65 * MM,
      height: 7 * MM,
      color: background,
    });

    // Cover date placeholder
    page.drawRectangle({
      x: 34 * MM,
      y: 21 * MM,
      width: 70 * MM,
      height: 7 * MM,
      color: background,
    });

    // Draw certificate number
    page.drawText(`Certificate No.: ${certificateNumber}`, {
      x: 35 * MM,
      y: 31 * MM,
      size: 9,
      font: regularFont,
      color: darkText,
    });

    // Draw completion date
    page.drawText(`Date of Completion: ${completionDate}`, {
      x: 35 * MM,
      y: 24 * MM,
      size: 9,
      font: regularFont,
      color: darkText,
    });

   

const pdfBytes = await pdfDoc.save();
const pdfBody = Buffer.from(pdfBytes);

return new NextResponse(pdfBody, {
  status: 200,
  headers: {
    "Content-Type": "application/pdf",
    "Content-Disposition":
      'attachment; filename="Fashion_Retail_Academy_Certificate.pdf"',
    "Cache-Control": "no-store",
  },
});
  } catch (error) {
    console.error("CERTIFICATE ERROR:", error);

    return NextResponse.json(
      { error: "Unable to generate certificate." },
      { status: 500 }
    );
  }
}