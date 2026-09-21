"use client";

import { useState } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

type CheckoutButtonProps = {
  courseSlug: string;
};

export default function CheckoutButton({
  courseSlug,
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  async function loadRazorpayScript() {
    return new Promise<boolean>((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  }

  async function handlePayment() {
    try {
      setLoading(true);

      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded) {
        alert("Unable to load Razorpay. Please check your internet connection.");
        return;
      }

      const orderResponse = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseSlug,
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        alert(orderData.error || "Unable to create payment order.");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Fashion Retail Academy",
        description: orderData.courseTitle,
        order_id: orderData.orderId,

        handler: async function (response: any) {
          const verifyResponse = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(response),
          });

          const verifyData = await verifyResponse.json();

          if (verifyResponse.ok && verifyData.success) {
            alert("Payment successful!");
          } else {
            alert(verifyData.error || "Payment verification failed.");
          }
        },

        theme: {
          color: "#0a0d1f",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function () {
        alert("Payment failed. Please try again.");
      });

      razorpay.open();
    } catch (error) {
      console.error("PAYMENT ERROR:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="rounded-xl bg-[#050816] px-8 py-4 text-lg font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "Please wait..." : "Enroll Now"}
    </button>
  );
}