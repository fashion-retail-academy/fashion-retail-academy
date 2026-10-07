import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Fashion Merchandise Planning Course | Fashion Retail Academy",
  description: "Learn fashion merchandise planning, OTB, WSSI, assortment planning, inventory management, sell-through and retail financial planning with practical Excel templates and real-world fashion retail examples.",
};

export default function CourseLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
