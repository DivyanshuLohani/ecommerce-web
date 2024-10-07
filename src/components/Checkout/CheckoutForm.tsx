"use client";
import React, { useState } from "react";
import AddressDisplay from "./AddressDisplay";
import type { Address } from "@prisma/client";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import AddressForm from "../Accounts/AddressForm";
import { Button } from "../ui/button";
import { selectedAddressCheckout } from "@/lib/actions/addresses";
import { useCart } from "@/context/CartProvider";

export const TOTAL_CART_VALUE_TO_CHECKOUT =
  Number(process.env.MIN_ORDER_VALUE as string) || 49900;

interface CheckoutFormProps {
  addresses: Address[];
}

export default function CheckoutForm({ addresses }: CheckoutFormProps) {
  const [selectedAddress, setSelectedAddress] = React.useState<string | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const { cartTotal } = useCart();

  return (
    <div className="flex flex-col space-y-4">
      <h3 className="text-xl font-semibold">Saved Addresses</h3>
      <RadioGroup
        onValueChange={setSelectedAddress}
        value={selectedAddress ?? undefined}
      >
        {addresses.map((address) => (
          <div key={address.id} className="flex items-center gap-2">
            <RadioGroupItem
              value={address.id.toString()}
              id={address.id.toString()}
              disabled={cartTotal < TOTAL_CART_VALUE_TO_CHECKOUT}
            />
            <Label htmlFor={address.id.toString()}>
              <AddressDisplay address={address} />
            </Label>
          </div>
        ))}
        <div className="space-x-2 mt-4">
          <RadioGroupItem
            value={"new"}
            id={"new"}
            disabled={cartTotal < TOTAL_CART_VALUE_TO_CHECKOUT}
          />
          <Label htmlFor={"new"} className=" border p-4">
            Add a new Address
          </Label>
        </div>
      </RadioGroup>
      {selectedAddress === "new" ? (
        <div>
          <AddressForm />
        </div>
      ) : (
        <Button
          onClick={async () => {
            if (selectedAddress && selectedAddress !== "new") {
              setLoading(true);
              await selectedAddressCheckout(parseInt(selectedAddress));
            }
            setLoading(false);
          }}
          disabled={
            cartTotal < TOTAL_CART_VALUE_TO_CHECKOUT ||
            loading ||
            !selectedAddress
          }
        >
          Proceed
        </Button>
      )}
    </div>
  );
}
