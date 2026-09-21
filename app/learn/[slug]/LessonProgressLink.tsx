"use client";

import Link from "next/link";

type LessonProgressLinkProps = {
  slug: string;
  lessonNumber: number;
  completed: boolean;
};

export default function LessonProgressLink({
  slug,
  lessonNumber,
  completed,
}: LessonProgressLinkProps) {
  return (
    <Link
      href={`/learn/${slug}/lesson-${lessonNumber}`}
      style={{
        display: "inline-block",
        padding: "11px 22px",
        borderRadius: "8px",
        background: completed ? "#198754" : "#0b1026",
        color: "#fff",
        textDecoration: "none",
        fontWeight: "600",
      }}
    >
      {completed ? "Completed ✓" : "Start"}
    </Link>
  );
}