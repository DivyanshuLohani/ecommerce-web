import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "../ui/table";
import type { Address, Order } from "@prisma/client";
import OrderTableItem from "../orders/OrderTableItem";
import Paginator from "../ui/paginator";

interface IOrder extends Order {
  address: Address | null;
}

export default function OrdersTable({
  orders,
  totalOrders,
}: {
  orders: IOrder[];
  totalOrders: number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders</CardTitle>
        <CardDescription>Manage and view orders.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <OrderTableItem key={order.id} order={order} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Paginator total={totalOrders} perPage={10} />
      </CardFooter>
    </Card>
  );
}
