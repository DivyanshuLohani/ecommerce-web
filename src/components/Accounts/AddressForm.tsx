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

export default function AddressForm() {
  const session = useSession();
  return (
    <div className="py-2 w-full">
      <div className="input my-4">
        <Label htmlFor="name">Billing Name</Label>
        <Input id="name" defaultValue={session?.data?.user.name} required />
      </div>
      <div className="input my-2">
        <Label htmlFor="address1">Address Line 1</Label>
        <Input id="address1" required />
      </div>
      <div className="input my-2">
        <Label htmlFor="address2">Address Line 2</Label>
        <Input id="address2" />
      </div>
      <div className="input my-2">
        <Label htmlFor="city">City</Label>
        <Input id="city" required />
      </div>
      <div className="input my-2">
        <Label htmlFor="state">State</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a state" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AP">Andhra Pradesh</SelectItem>
            <SelectItem value="AR">Arunachal Pradesh</SelectItem>
            <SelectItem value="AS">Assam</SelectItem>
            <SelectItem value="BR">Bihar</SelectItem>
            <SelectItem value="CT">Chhattisgarh</SelectItem>
            <SelectItem value="GA">Gujarat</SelectItem>
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
      </div>
      <div className="input my-2">
        <Label htmlFor="pin">Pincode</Label>
        <Input id="pin" required />
      </div>

      <Button>Add</Button>
    </div>
  );
}
