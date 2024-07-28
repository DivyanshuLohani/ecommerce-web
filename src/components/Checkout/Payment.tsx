"use client";
import { paymentFailure, paymentSuccess } from "@/lib/payment";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useRazorpay from "react-razorpay";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Payment({ paymentDetails }: { paymentDetails: any }) {
  const [Razorpay] = useRazorpay();
  const router = useRouter();
  const options = {
    ...paymentDetails,
    handler: async function (response: any) {
      await paymentSuccess(
        response.razorpay_order_id,
        response.razorpay_payment_id,
        response.razorpay_signature
      );

      router.replace(`/orders/${paymentDetails.order_id}`);
    },
    modal: {
      escape: false,
      ondismiss: function () {
        router.replace("/checkout");
      },
    },
  };
  if (window.Razorpay) {
    const rzp = new Razorpay(options);

    rzp.on("payment.failed", async (response: any) => {
      alert(response.error.description);
      await paymentFailure(
        response.error.metadata.order_id,
        response.error.code
      );
      router.replace("/checkout");
    });

    rzp.open();
  }

  return (
    <>
      <div>Please do not close this window or press back/refresh</div>
    </>
  );
}
