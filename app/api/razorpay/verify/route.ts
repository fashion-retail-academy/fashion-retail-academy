import crypto from "crypto";
import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return NextResponse.json(
        { error: "Missing payment details" },
        { status: 400 }
      );
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (!secret) {
      return NextResponse.json(
        { error: "Razorpay secret is not configured" },
        { status: 500 }
      );
    }

    // Verify Razorpay signature
    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: "Payment verification failed" },
        { status: 400 }
      );
    }

    // Supabase server client
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => {
                cookieStore.set(name, value, options);
              });
            } catch {
              // Ignore cookie errors in this route
            }
          },
        },
      }
    );

    // Get logged-in student
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Please log in before completing enrollment" },
        { status: 401 }
      );
    }

    // Get Razorpay order details
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: secret,
    });

    const order = await razorpay.orders.fetch(razorpay_order_id);

    const courseId = order.notes?.course_id;

    if (!courseId) {
      return NextResponse.json(
        { error: "Course information not found in payment order" },
        { status: 400 }
      );
    }

    // Check whether enrollment already exists
    const { data: existingEnrollment, error: enrollmentCheckError } =
      await supabase
        .from("enrollments")
        .select("id")
        .eq("user_id", user.id)
        .eq("course_id", courseId)
        .maybeSingle();

    if (enrollmentCheckError) {
      console.error(
        "ENROLLMENT CHECK ERROR:",
        enrollmentCheckError
      );

      return NextResponse.json(
        { error: "Unable to check enrollment" },
        { status: 500 }
      );
    }

    if (existingEnrollment) {
      const { error: updateError } = await supabase
        .from("enrollments")
        .update({
          status: "active",
        })
        .eq("id", existingEnrollment.id);

      if (updateError) {
        console.error(
          "ENROLLMENT UPDATE ERROR:",
          updateError
        );

        return NextResponse.json(
          { error: "Payment verified but enrollment update failed" },
          { status: 500 }
        );
      }
    } else {
      const { error: insertError } = await supabase
        .from("enrollments")
        .insert({
          user_id: user.id,
          course_id: courseId,
          status: "active",
        });

      if (insertError) {
        console.error(
          "ENROLLMENT INSERT ERROR:",
          insertError
        );

        return NextResponse.json(
          { error: "Payment verified but enrollment creation failed" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified and enrollment activated",
    });
  } catch (error) {
    console.error("RAZORPAY VERIFY ERROR:", error);

    return NextResponse.json(
      { error: "Unable to verify payment" },
      { status: 500 }
    );
  }
}