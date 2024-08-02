import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { ChevronUp } from "lucide-react";

export default function TotalOrders({
  norders,
  total,
}: {
  norders: number;
  total: number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Sales</CardTitle>
        <CardDescription>Total sales this month</CardDescription>
      </CardHeader>
      <CardContent>
        <span className="text-2xl">₹{formatCurrency(total)}</span> <br />
        in {norders} orders
        <br />
        {/* <Badge className="mt-2">
          <ChevronUp /> 3.33%
        </Badge> */}
      </CardContent>
    </Card>
  );
}
