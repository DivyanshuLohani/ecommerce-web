"use client";
import { Order } from "@prisma/client";
import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  CheckCircleIcon,
  PackageCheckIcon,
  TimerIcon,
  Truck,
} from "lucide-react";
import { updateOrderStatus } from "@/lib/actions/admin";

export default function OrderStatus({ order }: { order: Order }) {
  return (
    <Card>
      <CardHeader className="text-xl font-semibold">Order Status</CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Card className="shadow-lg">
            <CardHeader className="flex flex-col gap-2 font-bold">
              <TimerIcon />
              PENDING
            </CardHeader>
            <CardContent
              className={`w-full h-1 ${
                order.status === "PENDING" ||
                order.status === "ACCEPTED" ||
                order.status === "SHIPPED" ||
                order.status === "DELIVERED"
                  ? " bg-green-500"
                  : "bg-red-500"
              }`}
            ></CardContent>
          </Card>
          <Card
            className="shadow-lg cursor-pointer"
            onClick={async () => {
              if (
                !(
                  order.status != "ACCEPTED" &&
                  order.status != "SHIPPED" &&
                  order.status != "DELIVERED"
                )
              )
                return;
              if (
                !confirm(
                  "Are you sure you want to change the order status?\nThis cannot be undone."
                )
              )
                return;
              await updateOrderStatus(order.id, "ACCEPTED");
            }}
          >
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
          <Card
            className="shadow-lg cursor-pointer"
            onClick={async () => {
              if (
                !confirm(
                  "Are you sure you want to change the order status?\nThis cannot be undone."
                )
              )
                return;
              if (order.status != "SHIPPED" && order.status != "DELIVERED")
                await updateOrderStatus(order.id, "SHIPPED");
            }}
          >
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
          <Card
            className="shadow-lg cursor-pointer"
            onClick={async () => {
              if (
                !confirm(
                  "Are you sure you want to change the order status?\nThis cannot be undone."
                )
              )
                return;
              if (order.status != "DELIVERED")
                await updateOrderStatus(order.id, "DELIVERED");
            }}
          >
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
