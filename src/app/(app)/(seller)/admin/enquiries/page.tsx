import { Card } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { getEnquiries } from "@/lib/actions/admin";
import Paginator from "@/components/ui/paginator";

export default async function Page({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const { enquiries, totalEnquiries } = await getEnquiries(
    parseInt(searchParams.page ?? "1")
  );
  return (
    <div className="flex flex-col gap-6 p-6 md:p-10">
      <div className="flex items-center justify-between">
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold">Customer Inquiries</h1>
          <p className="text-muted-foreground">
            Manage and respond to customer inquiries.
          </p>
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Inquiry</TableHead>
              <TableHead>Product</TableHead>
              {/* <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {enquiries.map((e) => {
              return (
                <TableRow key={e.id}>
                  <TableCell className="font-medium">{e.name}</TableCell>
                  <TableCell>{e.email}</TableCell>
                  <TableCell>{e.phone}</TableCell>
                  <TableCell>{e.message}</TableCell>
                  <TableCell>{e.product?.name}</TableCell>
                  {/* <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <div className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Respond</DropdownMenuItem>
                    <DropdownMenuItem>Close</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Paginator perPage={10} total={totalEnquiries} />
      </Card>
    </div>
  );
}
