import AddressForm from "@/components/Accounts/AddressForm";
import OrderCard from "@/components/orders/OrderCard";
import React from "react";

export default function page() {
  return (
    <div className="py-10 w-full">
      <h1 className="text-2xl font-semibold">Orders</h1>

      <div className="grid grid-cols-1">
        {Array.from({ length: 3 }).map((_, index) => (
          <OrderCard key={index} />
        ))}
      </div>
    </div>
  );
}
