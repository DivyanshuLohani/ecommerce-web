import CustomerInfo from "@/components/Accounts/CustomerInfo";
import OrderItems from "@/components/orders/OrderItems";
import OrderStatus from "@/components/orders/OrderStatus";
import { Button } from "@/components/ui/button";
import { getOrder } from "@/lib/admin";
import { getOrderProducts } from "@/lib/payment";
import { PlusCircle, File, Trash2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const id = parseInt(params.id);
  const order = await getOrder(id);
  const orderProducts = await getOrderProducts(id);
  const customerInfo = {
    name: order?.address?.name ?? "",
    email: order?.address?.email ?? "",
    phone: order?.address?.phoneNumber ?? "",
    address: order?.address?.address ?? "",
    address2: order?.address?.address2,
    city: order?.address?.city ?? "",
    state: order?.address?.state ?? "",
    pincode: order?.address?.pincode ?? "",
  };
  if (!order) notFound();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-xl font-bold">{order.payment?.paymentId}</h3>
        <div>
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button
            size="sm"
            className="h-8 gap-1"
            variant={"destructive"}
            asChild
          >
            <Link href={"/admin/products/create"}>
              <Trash2 className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Delete Order
              </span>
            </Link>
          </Button>
        </div>
      </div>
      <OrderStatus order={order} />
      <OrderItems order={order} products={orderProducts} />
      <CustomerInfo customer={customerInfo} />
    </div>
  );
}
