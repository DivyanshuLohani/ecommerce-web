import { Order } from "@prisma/client";
import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { CheckCircleIcon, PackageCheckIcon, Truck } from "lucide-react";

export default function OrderStatus({ order }: { order: Order }) {
  return (
    <Card>
      <CardHeader className="text-xl font-semibold">Order Status</CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Card className="shadow-lg">
            <CardHeader className="flex flex-col gap-2 font-bold">
              <CheckCircleIcon />
              ACCEPTED
            </CardHeader>
            <CardContent
              className={`w-full h-1 ${
                order.status === "ACCEPTED" ||
                order.status === "SHIPPED" ||
                order.status === "DELIVERED"
                  ? " bg-green-500"
                  : "bg-red-500"
              }`}
            ></CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader className="flex flex-col gap-2 font-bold">
              <PackageCheckIcon />
              SHIPPED
            </CardHeader>
            <CardContent
              className={`w-full h-1 ${
                order.status === "SHIPPED" || order.status === "DELIVERED"
                  ? " bg-green-500"
                  : "bg-red-500"
              }`}
            ></CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader className="flex flex-col gap-2 font-bold">
              <Truck />
              DELIVERED
            </CardHeader>
            <CardContent
              className={`w-full h-1 ${
                order.status === "DELIVERED" ? " bg-green-500" : "bg-red-500"
              }`}
            ></CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
