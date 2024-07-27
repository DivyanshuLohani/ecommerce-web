import CartPageProducts from "@/components/Cart/CartPageProducts";
import CartPageSubtotal from "@/components/Cart/CartPageSubtotal";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  TableHead,
  TableHeader,
  TableRow,
  Table,
  TableBody,
} from "@/components/ui/table";
import React from "react";

export default function page() {
  return (
    <Card>
      <CardHeader>
        <h1 className="text-2xl font-semibold">Cart</h1>
        <h3>The items you added to your cart</h3>
      </CardHeader>
      <CardContent className="relative">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <CartPageProducts />
          </TableBody>
        </Table>

        <CartPageSubtotal />
      </CardContent>
    </Card>
  );
}
