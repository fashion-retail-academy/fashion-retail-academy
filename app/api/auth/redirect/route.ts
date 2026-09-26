import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ destination: "/login" });
  }

  if (user.id === process.env.ADMIN_USER_ID) {
    return NextResponse.json({ destination: "/admin" });
  }

  return NextResponse.json({ destination: "/dashboard" });
}
