"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { placeOrder } from "@/lib/payment";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";

export default function PlaceOrderButton() {
  const [state, dispatch] = useFormState(placeOrder, null);
  const router = useRouter();
  useEffect(() => {
    if (!state) return;
    if (state.success) router.push(state.url);
    else {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [router, state]);
  return (
    <form action={dispatch}>
      <Button className="w-full mt-5">Place Order</Button>
    </form>
  );
}
