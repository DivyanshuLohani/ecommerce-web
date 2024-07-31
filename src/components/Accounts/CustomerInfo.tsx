import React from "react";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { User2, MailOpen } from "lucide-react";

interface CustomerInfoProps {
  name: string;
  email: string;
  phone: string;
  address: string;
  address2?: string | null;
  city: string;
  state: string;
  pincode: string;
}

export default function CustomerInfo({
  customer,
}: {
  customer: CustomerInfoProps;
}) {
  return (
    <Card>
      <CardHeader className="font-bold">
        Customer Info
        <CardDescription>Information Detail</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Card>
          <CardHeader className="flex flex-row gap-3 text-xl font-semibold">
            <User2 />
            General Information
          </CardHeader>
          <CardContent>
            <ul>
              <li>{customer.name}</li>
              <li>{customer.email}</li>
              <li>{customer.phone}</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row gap-3 text-xl font-semibold">
            <MailOpen />
            Shipping Address
          </CardHeader>
          <CardContent>
            <ul>
              <li>{customer.name}</li>
              <li>{customer.address}</li>
              {customer.address2 && <li>{customer.address2}</li>}
              <li>
                {customer.city}, {customer.state}
              </li>
              <li>{customer.pincode}</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row gap-3 text-xl font-semibold">
            <MailOpen />
            Billing Address
          </CardHeader>
          <CardContent>
            <ul>
              <li>Same as shipping</li>
            </ul>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
