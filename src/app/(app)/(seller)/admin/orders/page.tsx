import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import OrdersTable from "@/components/orders/OrdersTable";
import { getOrders } from "@/lib/actions/admin";
import ExportOrders from "@/components/orders/ExportOrders";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const { orders: pendingOrders, totalOrders: totalPendingOrders } =
    await getOrders(parseInt(searchParams.page ?? "1"));
  const { orders: activeOrders, totalOrders: totalActiveOrders } =
    await getOrders(parseInt(searchParams.page ?? "1"), "ACCEPTED");
  const { orders: shippedOrders, totalOrders: totalshipppedOrders } =
    await getOrders(parseInt(searchParams.page ?? "1"), "SHIPPED");
  const { orders: deliveredOrders, totalOrders: totalDeliveredOrders } =
    await getOrders(parseInt(searchParams.page ?? "1"), "DELIVERED");

  return (
    <Tabs defaultValue="pending">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="pending">Incoming</TabsTrigger>
          <TabsTrigger value="accepted">Accepted</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
          <TabsTrigger value="canceled" className="hidden sm:flex">
            Canceled
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <ExportOrders
            orders={[
              ...pendingOrders,
              ...activeOrders,
              ...shippedOrders,
              ...deliveredOrders,
            ]}
          />
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>View all orders.</CardDescription>
        </CardHeader>
        <CardContent>
          <TabsContent value="pending">
            <OrdersTable
              totalOrders={totalPendingOrders}
              orders={pendingOrders}
            />
          </TabsContent>
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
