"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin") || pathname.startsWith("/api")) return;

    let visitorId = localStorage.getItem("fra_visitor_id");

    if (!visitorId) {
      visitorId = crypto.randomUUID();
      localStorage.setItem("fra_visitor_id", visitorId);
    }

    fetch("/api/track-visit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        visitorId,
        page: pathname,
        referrer: document.referrer || null,
        device: /Mobi|Android/i.test(navigator.userAgent)
          ? "Mobile"
          : "Desktop",
      }),
    }).catch(() => {});
  }, [pathname]);

  return null;
}


