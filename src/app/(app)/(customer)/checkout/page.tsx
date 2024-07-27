import CartSummary from "@/components/Checkout/CartSummary";
import CheckoutForm from "@/components/Checkout/CheckoutForm";
import { toast } from "@/components/ui/use-toast";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signup");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>
        <div className="flex flex-col md:flex-row justify-between">
          <CartSummary />
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
}
