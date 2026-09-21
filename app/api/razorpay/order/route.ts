import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const { courseSlug } = await request.json();

    if (!courseSlug) {
      return NextResponse.json(
        { error: "Course slug is required" },
        { status: 400 }
      );
    }

    // Server-side Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    );

    // Get the course and its actual price from Supabase
    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select("id, title, price")
      .eq("slug", courseSlug)
      .eq("published", true)
      .single();

    if (courseError || !course) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    // Razorpay server-side client
  console.log(
  "RAZORPAY ENV CHECK:",
  "KEY_ID starts rzp_test =",
  process.env.RAZORPAY_KEY_ID?.startsWith("rzp_test_"),
  "KEY_ID exists =",
  !!process.env.RAZORPAY_KEY_ID,
  "SECRET exists =",
  !!process.env.RAZORPAY_KEY_SECRET
);
    const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    // Razorpay expects the amount in paise
    const amountInPaise = Math.round(Number(course.price) * 100);

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `fra_${Date.now()}`,
      notes: {
        course_id: course.id,
        course_title: course.title,
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      courseId: course.id,
      courseTitle: course.title,
    });
  } catch (error) {
    console.error("RAZORPAY ORDER ERROR:", error);

    return NextResponse.json(
      { error: "Unable to create Razorpay order" },
      { status: 500 }
    );
  }
}