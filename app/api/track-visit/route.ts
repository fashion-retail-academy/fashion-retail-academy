import { geolocation } from "@vercel/functions";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const geo = geolocation(request);

    const supabase = await createClient();

    const { error } = await supabase.from("site_visits").insert({
      visitor_id: body.visitorId ?? null,
      page: body.page ?? null,
      referrer: body.referrer ?? null,
      device: body.device ?? null,
      city: geo.city ?? null,
      country: geo.country ?? null,
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
