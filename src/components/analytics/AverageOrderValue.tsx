import { formatCurrency } from "@/lib/utils";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";

export default function AverageOrderValue({ average }: { average: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Average order value</CardTitle>
        <CardDescription>Average order value this month</CardDescription>
      </CardHeader>
      <CardContent>
        <span className="text-2xl">₹{formatCurrency(average)}</span> <br />
        {/* <Badge className="mt-2">
          <ChevronUp /> 3.33%
        </Badge> */}
      </CardContent>
    </Card>
  );
}
