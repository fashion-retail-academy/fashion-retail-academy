"use client";

import { useState } from "react";

export default function VerifyCertificatePage() {
  const [certificateNumber, setCertificateNumber] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function verifyCertificate(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setResult(null);

    const response = await fetch(
      `/api/razorpay/verify-certificate?certificate_number=${encodeURIComponent(
        certificateNumber.trim()
      )}`
    );

    const data = await response.json();

    setResult(data);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold tracking-widest text-slate-500">
            FASHION RETAIL ACADEMY
          </p>

          <h1 className="mt-3 text-4xl font-bold text-slate-900">
            Certificate Verification
          </h1>

          <p className="mt-3 text-slate-600">
            Enter a Fashion Retail Academy certificate number to verify its
            authenticity.
          </p>

          <form onSubmit={verifyCertificate} className="mt-8">
            <label className="block text-sm font-semibold text-slate-700">
              Certificate Number
            </label>

            <input
              type="text"
              value={certificateNumber}
              onChange={(e) => setCertificateNumber(e.target.value)}
              placeholder="Example: FRA-FMP-FCD68EB9"
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-4 rounded-xl bg-[#0b1026] px-6 py-3 font-semibold text-white"
            >
              {loading ? "Verifying..." : "Verify Certificate"}
            </button>
          </form>

          {result?.valid && (
            <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-6">
              <p className="text-lg font-bold text-emerald-800">
                ✓ Certificate Valid
              </p>

              <div className="mt-4 space-y-2 text-slate-700">
                <p>
                  <strong>Student:</strong> {result.certificate.student_name}
                </p>

                <p>
                  <strong>Course:</strong> {result.certificate.course_title}
                </p>

                <p>
                  <strong>Certificate No.:</strong>{" "}
                  {result.certificate.certificate_number}
                </p>

                <p>
                  <strong>Completed:</strong>{" "}
                  {new Date(
                    result.certificate.completed_at
                  ).toLocaleDateString("en-IN")}
                </p>
              </div>
            </div>
          )}

          {result && !result.valid && (
            <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6">
              <p className="font-semibold text-red-800">
                Certificate Not Found
              </p>

              <p className="mt-2 text-sm text-red-700">
                Please check the certificate number and try again.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}