"use client";
import { usePathname, useRouter } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "../ui/breadcrumb";
import Link from "next/link";
import { useMemo } from "react";

export default function DashboardBreadcrumb() {
  const router = useRouter();
  const pathname = usePathname();
  const breadcrumbs = useMemo(
    function generateBreadcrumbs() {
      const asPathNestedRoutes = pathname
        .split("/")
        .filter((v) => v.length > 0);

      const crumblist = asPathNestedRoutes.map((subpath, idx) => {
        const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
        return { href, text: subpath };
      });

      return [...crumblist];
    },
    [pathname]
  );

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList className="capitalize">
        {breadcrumbs.map((e, i) => {
          if (i === breadcrumbs.length - 1) {
            return (
              <BreadcrumbItem key={i}>
                <BreadcrumbPage>{e.text}</BreadcrumbPage>
              </BreadcrumbItem>
            );
          }
          return (
            <>
              <BreadcrumbItem key={i}>
                <BreadcrumbLink asChild>
                  <Link href={e.href}>{e.text}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
