import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Fashion Retail Consulting | Buying, Merchandising & Planning",
  description: "Expert fashion retail consulting for brands and retailers across buying, merchandising, merchandise planning, assortment, inventory, pricing, and business strategy.",
};

export default function ConsultingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}