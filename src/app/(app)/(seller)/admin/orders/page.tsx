import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { File } from "lucide-react";
import OrdersTable from "@/components/orders/OrdersTable";
import { getOrders } from "@/lib/admin";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const { orders: activeOrders, totalOrders: totalActiveOrders } =
    await getOrders(parseInt(searchParams.page ?? "1"));
  const { orders: shippedOrders, totalOrders: totalshipppedOrders } =
    await getOrders(parseInt(searchParams.page ?? "1"), "SHIPPED");
  const { orders: deliveredOrders, totalOrders: totalDeliveredOrders } =
    await getOrders(parseInt(searchParams.page ?? "1"), "DELIVERED");

  return (
    <Tabs defaultValue="accepted">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="accepted">Incoming</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
          <TabsTrigger value="canceled" className="hidden sm:flex">
            Canceled
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>View all orders.</CardDescription>
        </CardHeader>
        <CardContent>
          <TabsContent value="accepted">
            <OrdersTable
              totalOrders={totalActiveOrders}
              orders={activeOrders}
            />
          </TabsContent>
          <TabsContent value="shipped">
            <OrdersTable
              totalOrders={totalshipppedOrders}
              orders={shippedOrders}
            />
          </TabsContent>
          <TabsContent value="delivered">
            <OrdersTable
              totalOrders={totalDeliveredOrders}
              orders={deliveredOrders}
            />
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
}
