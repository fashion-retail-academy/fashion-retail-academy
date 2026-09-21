"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useParams } from "next/navigation";
import LessonProgressLink from "./LessonProgressLink";
const courses: Record<
  string,
  {
    title: string;
    description: string;
    lessons: string[];
  }
> = {
  "fashion-merchandise-planning": {
    title: "Fashion Merchandise Planning",
    description:
      "Master merchandise planning, MFP, WSSI, OTB, assortment planning, WOS, ROS, sell-through and inventory planning.",
    lessons: [
      "Introduction to Fashion Merchandise Planning",
      "Merchandise Financial Planning (MFP)",
      "WSSI Planning",
      "Open to Buy (OTB)",
      "Assortment Planning",
      "WOS & ROS",
      "Sell-Through Planning",
      "Inventory Planning",
    ],
  },

  "advanced-excel-fashion-retail": {
    title: "Advanced Excel for Fashion Retail",
    description:
      "Build powerful Excel models for fashion retail planning, analysis and decision making.",
    lessons: [
      "Introduction to Excel for Fashion Retail",
      "Retail Math Fundamentals",
      "Sales & Margin Analysis",
      "WSSI in Excel",
      "OTB Calculator",
      "Inventory & WOS Analysis",
    ],
  },

  "fashion-retail-buying": {
    title: "Fashion Retail Buying",
    description:
      "Learn fashion buying, range building, assortment, pricing, vendor management and commercial buying.",
    lessons: [
      "Introduction to Fashion Buying",
      "Market & Trend Analysis",
      "Range Building",
      "Assortment Planning",
      "Pricing & Margin",
      "Vendor Management",
    ],
  },
};

export default function LearnPage() {
  const params = useParams();
  const slug = params.slug as string;

const supabase = createClient();

const [completedLessons, setCompletedLessons] = useState<string[]>([]);

useEffect(() => {
  async function loadProgress() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return;
    }

    const { data } = await supabase
      .from("lesson_progress")
      .select("lesson_slug")
      .eq("user_id", user.id)
      .eq("course_slug", slug)
      .eq("completed", true);

    setCompletedLessons(
      (data || []).map((item) => item.lesson_slug)
    );
  }

  loadProgress();
}, [slug]);

const course = courses[slug];

  if (!course) {
    return (
      <main style={{ padding: "40px" }}>
        <h1>Course not found</h1>

        <Link href="/courses">← Back to Courses</Link>
      </main>
    );
  }

  return (
    <main
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "40px 24px",
      }}
    >
      <Link href="/dashboard">← Back to Dashboard</Link>

      <div style={{ marginTop: "35px" }}>
        <p
          style={{
            letterSpacing: "4px",
            fontWeight: "600",
            fontSize: "13px",
          }}
        >
          MY COURSE
        </p>

        <h1
          style={{
            fontSize: "42px",
            marginTop: "10px",
            marginBottom: "15px",
          }}
        >
          {course.title}
        </h1>

        <p
          style={{
            fontSize: "18px",
            lineHeight: "1.7",
            maxWidth: "850px",
          }}
        >
          {course.description}
        </p>
      </div>

      <section style={{ marginTop: "50px" }}>
        <h2 style={{ fontSize: "28px" }}>Course Lessons</h2>

        <div style={{ marginTop: "25px" }}>
          {course.lessons.map((lesson, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "22px",
                marginBottom: "14px",
                border: "1px solid #ddd",
                borderRadius: "12px",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    marginBottom: "7px",
                    opacity: 0.6,
                  }}
                >
                  LESSON {index + 1}
                </div>

                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                  }}
                >
                  {lesson}
                </div>
              </div>

            <LessonProgressLink
  slug={slug}
  lessonNumber={index + 1}
completed={completedLessons.includes(`lesson-${index + 1}`)}
/>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}