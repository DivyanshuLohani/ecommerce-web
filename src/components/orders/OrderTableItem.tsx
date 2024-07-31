import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import type { Address, Order } from "@prisma/client";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

interface IOrder extends Order {
  address: Address | null;
}

export default function OrterTableItem({ order }: { order: IOrder }) {
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Link href={`/admin/orders/${order.id}/`}>{order.address?.name}</Link>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {order.status}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {order.createdAt.toLocaleDateString()}
      </TableCell>
      <TableCell className="hidden md:table-cell">{`₹${formatCurrency(
        order.total
      )}`}</TableCell>

      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={`/admin/orders/${order.id}/`}>Edit</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
