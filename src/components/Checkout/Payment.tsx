"use client";
import { useCart } from "@/context/CartProvider";
import { paymentFailure, paymentSuccess } from "@/lib/payment";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import useRazorpay from "react-razorpay";
import { Spinner } from "../ui/spinner";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Payment({ paymentDetails }: { paymentDetails: any }) {
  const [Razorpay] = useRazorpay();
  const router = useRouter();
  const { clear } = useCart();
  const [razorPayopen, setRzpOpen] = useState(false);
  const options = {
    ...paymentDetails,
    handler: async function (response: any) {
      clear();
      router.replace(`/orders/${paymentDetails.order_id}`);
    },
    modal: {
      escape: false,
      ondismiss: function () {
        router.replace("/checkout/payment/");
        paymentFailure(paymentDetails.order_id, "PAYMENT_CANCELED");
      },
    },
  };
  useEffect(() => {
    if (window.Razorpay && !razorPayopen) {
      const rzp = new Razorpay(options);

      rzp.on("payment.failed", async (response: any) => {
        alert(response.error.description);
        await paymentFailure(
          response.error.metadata.order_id,
          response.error.code
        );
        // router.replace("/checkout");
      });

      rzp.open();
      setRzpOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Razorpay, options, router]);

  return (
    <>
      <div>Please do not close this window or press back/refresh</div>
      <Spinner />
    </>
  );
}
