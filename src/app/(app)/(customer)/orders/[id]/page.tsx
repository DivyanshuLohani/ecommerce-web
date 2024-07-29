import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getOrder, getOrderProducts } from "@/lib/payment";
import { formatCurrency } from "@/lib/utils";
import { notFound } from "next/navigation";
import React from "react";

export default async function page({ params }: { params: { id: string } }) {
  const order = await getOrder(params.id);
  if (!order) notFound();
  const orderProducts = await getOrderProducts(order.id);
  return (
    <Card className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <CardHeader className="text-3xl font-bold mb-6 border-b pb-3">
        Order Details
      </CardHeader>

      <CardContent>
        <h2 className="text-2xl font-semibold mb-2">Order Information</h2>
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="mb-2">
            <strong>Date:</strong>{" "}
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Shipping Address</h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <strong>{order.address?.name}</strong>
            <p>{order.address?.address}</p>
            {order.address?.address2 && <p>{order.address?.address2}</p>}
            <p>
              {order.address?.city}, {order.address?.state},{" "}
              {order.address?.pincode}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Items</h2>
          <ul className="bg-gray-100 p-4 rounded-md">
            {orderProducts.map((item) => (
              <li key={item.id} className="flex justify-between py-3 border-b">
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-600">
                    {item.quantity} x ₹ {formatCurrency(item.product.price)}
                  </p>
                </div>
                <p className="font-semibold">
                  ₹{formatCurrency(item.quantity * item.product.price)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="text-right w-full flex justify-end">
        <p className="text-xl font-bold">
          Total: ₹{formatCurrency(order.total)}
        </p>
      </CardFooter>
    </Card>
  );
}
