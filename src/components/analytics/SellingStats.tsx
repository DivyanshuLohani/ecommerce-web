"use client";
import { MonthlySales } from "@/lib/analytics";
import React from "react";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import {
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import { Bar } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function SellingStats({
  sellingStats,
}: {
  sellingStats: MonthlySales[];
}) {
  const chartConfig = {
    sales: {
      label: "Sales",
      color: "#2563eb",
    },
    orders: {
      label: "Orders",
      color: "#60a5fa",
    },
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales</CardTitle>
        <CardDescription>Sales and orders by month this year</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[50px] w-full">
          <BarChart accessibilityLayer data={sellingStats}>
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />

            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <CartesianGrid />
            <Bar
              yAxisId={"left"}
              dataKey="sales"
              fill="var(--color-sales)"
              radius={4}
            />
            <Bar
              yAxisId={"right"}
              dataKey="orders"
              fill="var(--color-orders)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
