import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminAnalyticsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.id !== process.env.ADMIN_USER_ID) {
    redirect("/login");
  }

  const { data: visits, error } = await supabase
    .from("site_visits")
    .select("visited_at, visitor_id, page, referrer, city, country, device")
    .order("visited_at", { ascending: false })
    .limit(500);

  if (error) {
    return (
      <main className="min-h-screen bg-white p-8">
        <h1 className="text-2xl font-bold text-red-600">Analytics Error</h1>
        <p className="mt-3 text-gray-700">{error.message}</p>
      </main>
    );
  }

  const rows = visits ?? [];

  const uniqueVisitors = new Set(
    rows.map((v) => v.visitor_id).filter(Boolean)
  ).size;

  const pageViews = rows.length;

  const cities = new Map<string, number>();
  const countries = new Map<string, number>();
  const referrers = new Map<string, number>();

  rows.forEach((v) => {
    if (v.city) cities.set(v.city, (cities.get(v.city) ?? 0) + 1);
    if (v.country)
      countries.set(v.country, (countries.get(v.country) ?? 0) + 1);

    const source = v.referrer || "Direct";
    referrers.set(source, (referrers.get(source) ?? 0) + 1);
  });

  const topCities = [...cities.entries()].sort((a, b) => b[1] - a[1]);
  const topCountries = [...countries.entries()].sort((a, b) => b[1] - a[1]);
  const topReferrers = [...referrers.entries()].sort((a, b) => b[1] - a[1]);

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#0b1026]">
              Website Analytics
            </h1>
            <p className="mt-2 text-gray-600">
              Visitor traffic, location and referral data
            </p>
          </div>

          <a
            href="/admin"
            className="rounded-lg bg-[#0b1026] px-5 py-2 font-semibold text-white"
          >
            Home
          </a>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Unique Visitors</p>
            <p className="mt-2 text-3xl font-bold">{uniqueVisitors}</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Page Views</p>
            <p className="mt-2 text-3xl font-bold">{pageViews}</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Cities</p>
            <p className="mt-2 text-3xl font-bold">{cities.size}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <section className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">Cities</h2>
            <div className="mt-4 space-y-3">
              {topCities.length === 0 ? (
                <p className="text-gray-500">No city data yet.</p>
              ) : (
                topCities.map(([city, count]) => (
                  <div key={city} className="flex justify-between">
                    <span>{city}</span>
                    <strong>{count}</strong>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">Countries</h2>
            <div className="mt-4 space-y-3">
              {topCountries.length === 0 ? (
                <p className="text-gray-500">No country data yet.</p>
              ) : (
                topCountries.map(([country, count]) => (
                  <div key={country} className="flex justify-between">
                    <span>{country}</span>
                    <strong>{count}</strong>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">Traffic Sources</h2>
            <div className="mt-4 space-y-3">
              {topReferrers.length === 0 ? (
                <p className="text-gray-500">No referral data yet.</p>
              ) : (
                topReferrers.map(([source, count]) => (
                  <div key={source} className="flex justify-between gap-4">
                    <span className="truncate">{source}</span>
                    <strong>{count}</strong>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        <section className="mt-8 overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="border-b p-6">
            <h2 className="text-xl font-bold">Recent Visitors</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3">Date / Time</th>
                  <th className="px-5 py-3">City</th>
                  <th className="px-5 py-3">Country</th>
                  <th className="px-5 py-3">Page</th>
                  <th className="px-5 py-3">Source</th>
                  <th className="px-5 py-3">Device</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((visit, index) => (
                  <tr key={`${visit.visited_at}-${index}`} className="border-t">
                    <td className="whitespace-nowrap px-5 py-3">
                      {new Date(visit.visited_at).toLocaleString("en-IN")}
                    </td>
                    <td className="px-5 py-3">{visit.city || "-"}</td>
                    <td className="px-5 py-3">{visit.country || "-"}</td>
                    <td className="px-5 py-3">{visit.page || "-"}</td>
                    <td className="max-w-xs truncate px-5 py-3">
                      {visit.referrer || "Direct"}
                    </td>
                    <td className="px-5 py-3">{visit.device || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
