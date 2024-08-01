import { Order, OrderProduct, Product } from "@prisma/client";
import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";

interface IOP extends OrderProduct {
  product: Product;
}

export default function OrderItems({
  products,
  order,
}: {
  order: Order;
  products: IOP[];
}) {
  return (
    <Card>
      <CardHeader className="text-xl font-semibold">Products</CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((e) => {
              return (
                <TableRow key={e.id}>
                  <TableCell className="flex gap-2 items-center font-semibold">
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={e.product.imageUrl || "Placeholder"}
                      width="64"
                    />
                    <span className="hidden md:block">{e.product.name}</span>
                  </TableCell>
                  <TableCell>₹ {formatCurrency(e.price)}</TableCell>
                  <TableCell>{e.quantity}</TableCell>
                  <TableCell className="text-left">
                    ₹ {formatCurrency(e.price * e.quantity)}
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className="font-bold ">
                <span>Subtotal:</span>
              </TableCell>
              <TableCell className="font-bold ">
                ₹{formatCurrency(order.total)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
