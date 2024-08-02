import { prisma } from "./prisma";
import { formatCurrency } from "./utils";

export async function getTotalSales(from?: Date, to?: Date) {
  const today = new Date();
  const oneMonthAgo = new Date(today);
  oneMonthAgo.setMonth(today.getMonth() - 1);
  const data = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: from ? from : oneMonthAgo,
        lte: to,
      },
    },
  });

  return [data.length, data.reduce((acc, order) => (acc += order.total), 0)];
}

export async function getTopProducts(from?: Date, to?: Date, take: number = 5) {
  const today = new Date();
  const oneMonthAgo = new Date(today);
  oneMonthAgo.setMonth(today.getMonth() - 1);
  const data = await prisma.product.findMany({
    take,
    orderBy: {
      orders: { _count: "desc" },
    },
  });

  return data;
}

export interface MonthlySales {
  month: string;
  sales: number;
  orders: number;
}

export async function getSellingReport(from?: Date, to?: Date) {
  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear() - 1);
  const data = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: from ? from : oneYearAgo,
        lte: to,
      },
    },
  });

  const salesByMonthMap: { [key: string]: { sales: number; orders: number } } =
    data.reduce((acc, order) => {
      const date = new Date(order.createdAt);
      const monthYear = date.toLocaleString("default", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

      if (!acc[monthYear]) {
        acc[monthYear] = { sales: 0, orders: 0 };
      }
      acc[monthYear].sales += order.total;
      acc[monthYear].orders += 1;

      return acc;
    }, {} as { [key: string]: { sales: number; orders: number } });

  // Construct the MonthlySales array directly
  const monthlySales: MonthlySales[] = Object.entries(salesByMonthMap).map(
    ([month, { sales, orders }]) => {
      return {
        month,
        sales: sales / 100,
        orders,
      };
    }
  );

  return monthlySales;
}

export async function getAverageOrderValue(
  startDate?: Date,
  endDate?: Date
): Promise<number> {
  const today = new Date();
  const oneMonthAgo = new Date(today);
  oneMonthAgo.setMonth(today.getMonth() - 1);

  const start = startDate || oneMonthAgo;
  const end = endDate || today;

  const orders = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: start,
        lte: end,
      },
    },
    select: {
      total: true,
    },
  });

  const totalOrders = orders.length;
  const totalAmount = orders.reduce((acc, order) => acc + order.total, 0);
  const averageOrderValue = totalOrders > 0 ? totalAmount / totalOrders : 0;

  return averageOrderValue;
}
