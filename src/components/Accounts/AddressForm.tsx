"use client";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useFormState } from "react-dom";
import { addAddress } from "@/lib/actions";
import type { Address } from "@prisma/client";

export default function AddressForm({ address }: { address: Address | null }) {
  const session = useSession();
  const [state, dispatch] = useFormState(addAddress, {
    message: "",
    errors: {},
  });

  return (
    <form className="py-2 w-full" action={dispatch}>
      <div className="input my-4">
        <Label htmlFor="name">Billing Name</Label>
        <Input
          id="name"
          defaultValue={session?.data?.user.name || address?.name}
          aria-describedby="name-error"
          name="name"
        />
        {state.errors?.name && (
          <span id="name-error" className="text-red-600">
            {state.errors.name[0]}
          </span>
        )}
      </div>
      <div className="input my-4">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          defaultValue={address?.phoneNumber}
          aria-describedby="phone-error"
          name="phone"
        />
        {state.errors?.phoneNumber && (
          <span id="phone-error" className="text-red-600">
            {state.errors.phoneNumber[0]}
          </span>
        )}
      </div>
      <div className="input my-4">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          defaultValue={session?.data?.user.email || address?.email}
          aria-describedby="email-error"
          name="email"
        />
        {state.errors?.email && (
          <span id="phone-error" className="text-red-600">
            {state.errors.email[0]}
          </span>
        )}
      </div>
      <div className="input my-2">
        <Label htmlFor="address1">Address Line 1</Label>
        <Input
          id="address1"
          aria-describedby="address-error"
          name="address"
          defaultValue={address?.address}
        />
        {state.errors?.address && (
          <span id="address-error" className="text-red-600">
            {state.errors.address[0]}
          </span>
        )}
      </div>
      <div className="input my-2">
        <Label htmlFor="address2">Address Line 2</Label>
        <Input
          id="address2"
          aria-describedby="address-2-error"
          name="address2"
          defaultValue={address?.address2 || ""}
        />
        {state.errors?.address2 && (
          <span id="address-2-error" className="text-red-600">
            {state.errors.address2[0]}
          </span>
        )}
      </div>
      <div className="input my-2">
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          aria-describedby="city-error"
          name="city"
          defaultValue={address?.city}
        />
        {state.errors?.city && (
          <span id="city-error" className="text-red-600">
            {state.errors.city[0]}
          </span>
        )}
      </div>
      <div className="input my-2">
        <Label htmlFor="state">State</Label>
        <Select name="state" defaultValue={address?.state}>
          <SelectTrigger>
            <SelectValue placeholder="Select a state" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AP">Andhra Pradesh</SelectItem>
            <SelectItem value="AR">Arunachal Pradesh</SelectItem>
            <SelectItem value="AS">Assam</SelectItem>
            <SelectItem value="BR">Bihar</SelectItem>
            <SelectItem value="CT">Chhattisgarh</SelectItem>
            <SelectItem value="GJ">Gujarat</SelectItem>
            <SelectItem value="HR">Haryana</SelectItem>
            <SelectItem value="HP">Himachal Pradesh</SelectItem>
            <SelectItem value="JK">Jammu and Kashmir</SelectItem>
            <SelectItem value="GA">Goa</SelectItem>
            <SelectItem value="JH">Jharkhand</SelectItem>
            <SelectItem value="KA">Karnataka</SelectItem>
            <SelectItem value="KL">Kerala</SelectItem>
            <SelectItem value="MP">Madhya Pradesh</SelectItem>
            <SelectItem value="MH">Maharashtra</SelectItem>
            <SelectItem value="MN">Manipur</SelectItem>
            <SelectItem value="ML">Meghalaya</SelectItem>
            <SelectItem value="MZ">Mizoram</SelectItem>
            <SelectItem value="NL">Nagaland</SelectItem>
            <SelectItem value="OR">Odisha</SelectItem>
            <SelectItem value="PB">Punjab</SelectItem>
            <SelectItem value="RJ">Rajasthan</SelectItem>
            <SelectItem value="SK">Sikkim</SelectItem>
            <SelectItem value="TN">Tamil Nadu</SelectItem>
            <SelectItem value="TG">Telangana</SelectItem>
            <SelectItem value="TR">Tripura</SelectItem>
            <SelectItem value="UT">Uttarakhand</SelectItem>
            <SelectItem value="UP">Uttar Pradesh</SelectItem>
            <SelectItem value="WB">West Bengal</SelectItem>
            <SelectItem value="AN">Andaman and Nicobar Islands</SelectItem>
            <SelectItem value="CH">Chandigarh</SelectItem>
            <SelectItem value="DN">Dadra and Nagar Haveli</SelectItem>
            <SelectItem value="DD">Daman and Diu</SelectItem>
            <SelectItem value="DL">Delhi</SelectItem>
            <SelectItem value="LD">Lakshadweep</SelectItem>
            <SelectItem value="PY">Puducherry</SelectItem>
          </SelectContent>
        </Select>
        {state.errors?.state && (
          <span id="state-error" className="text-red-600">
            {state.errors.state[0]}
          </span>
        )}
      </div>
      <div className="input my-2">
        <Label htmlFor="pin">Pincode</Label>
        <Input
          id="pin"
          aria-describedby="pincode-error"
          name="pincode"
          defaultValue={address?.pincode}
        />
        {state.errors?.pincode && (
          <span id="pincode-error" className="text-red-600">
            {state.errors.pincode[0]}
          </span>
        )}
      </div>

      <Button className="mt-5">Proceed to payment</Button>
    </form>
  );
}
