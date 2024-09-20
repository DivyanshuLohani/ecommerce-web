"use client";
import { Button } from "../ui/button";
import { File } from "lucide-react";

interface ExportOrdersProps {
  orders: any[];
}

export default function ExportOrders({ orders }: ExportOrdersProps) {
  const handleOrderExport = () => {
    const csvHeaders = [
      "Order ID",
      "Customer Name",
      "Email",
      "Phone Number",
      "Address",
      "City",
      "State",
      "Pincode",
      "Status",
      "Total",
      "Created At",
    ];
    const csvRows = orders.map((order) => {
      const { id, address, status, total, createdAt } = order;
      return [
        id,
        address?.name || "",
        address?.email || "",
        address?.phoneNumber || "",
        address?.address || "",
        address?.city || "",
        address?.state || "",
        address?.pincode || "",
        status,
        total,
        createdAt.toLocaleDateString(),
      ].join(",");
    });
    const csvData = [csvHeaders.join(","), ...csvRows].join("\n");
    // Download the csv file
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Button
      onClick={handleOrderExport}
      size="sm"
      variant="outline"
      className="h-8 gap-1"
    >
      <File className="h-3.5 w-3.5" />
      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
        Export
      </span>
    </Button>
  );
}
