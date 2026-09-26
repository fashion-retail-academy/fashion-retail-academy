import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const city =
      request.headers.get("x-vercel-ip-city") ||
      request.headers.get("x-vercel-ip-city-name") ||
      null;

    const country =
      request.headers.get("x-vercel-ip-country") ||
      null;

    const supabase = await createClient();

    const { error } = await supabase.from("site_visits").insert({
      visitor_id: body.visitorId ?? null,
      page: body.page ?? null,
      referrer: body.referrer ?? null,
      device: body.device ?? null,
      city,
      country,
    });

    if (error) {
      console.error("Visitor tracking error:", error);
      return Response.json({ ok: false }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Visitor tracking error:", error);
    return Response.json({ ok: false }, { status: 500 });
  }
}
