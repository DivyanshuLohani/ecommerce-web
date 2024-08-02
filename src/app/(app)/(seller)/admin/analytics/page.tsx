import AverageOrderValue from "@/components/analytics/AverageOrderValue";
import SellingStats from "@/components/analytics/SellingStats";
import TopProducts from "@/components/analytics/TopProducts";
import TotalOrders from "@/components/analytics/TotalOrders";
import {
  getAverageOrderValue,
  getSellingReport,
  getTopProducts,
  getTotalSales,
} from "@/lib/analytics";
import React from "react";

export default async function page() {
  const average = await getAverageOrderValue();
  const [norders, totalSales] = await getTotalSales();
  const topProducts = await getTopProducts();
  const sellingStats = await getSellingReport();
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5">
        <TotalOrders norders={norders} total={totalSales} />
        <AverageOrderValue average={average} />
      </div>
      <TopProducts products={topProducts} />
      <SellingStats sellingStats={sellingStats} />
    </div>
  );
}
