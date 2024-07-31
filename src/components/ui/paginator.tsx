"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Button } from "./button";

export default function Paginator({
  perPage = 10,
  total,
}: {
  perPage: number;
  total: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = parseInt((searchParams.get("page") as string) ?? "1");

  function prevPage() {
    router.push(`${pathname}?page=${currentPage - 1}`, { scroll: false });
  }

  function nextPage() {
    router.push(`${pathname}?page=${currentPage + 1}`, { scroll: false });
  }
  return (
    <form className="flex items-center w-full justify-between">
      <div className="text-xs text-muted-foreground">
        Showing{" "}
        <strong>
          {Math.min((currentPage - 1) * perPage, total) + 1}-
          {Math.min(currentPage * perPage, total)}
        </strong>{" "}
        of <strong>{total}</strong> products
      </div>
      <div className="flex">
        <Button
          formAction={prevPage}
          variant="ghost"
          size="sm"
          type="submit"
          disabled={currentPage === 1}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Prev
        </Button>
        <Button
          formAction={nextPage}
          variant="ghost"
          size="sm"
          type="submit"
          disabled={(currentPage - 1) * perPage + perPage > total}
        >
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
