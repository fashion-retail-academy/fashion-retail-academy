import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  try {
    const certificateNumber = request.nextUrl.searchParams.get(
      "certificate_number"
    );

    if (!certificateNumber) {
      return NextResponse.json(
        { valid: false, error: "Certificate number is required." },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    );

    const { data: certificate, error } = await supabase
      .from("certificates")
      .select(
        "certificate_number, student_name, course_title, completed_at"
      )
      .eq("certificate_number", certificateNumber.trim().toUpperCase())
      .maybeSingle();

    if (error) {
      console.error("CERTIFICATE VERIFICATION ERROR:", error);

      return NextResponse.json(
        { valid: false, error: "Unable to verify certificate." },
        { status: 500 }
      );
    }

    if (!certificate) {
      return NextResponse.json({
        valid: false,
      });
    }

    return NextResponse.json({
      valid: true,
      certificate,
    });
  } catch (error) {
    console.error("VERIFY CERTIFICATE ERROR:", error);

    return NextResponse.json(
      { valid: false, error: "Unable to verify certificate." },
      { status: 500 }
    );
  }
}