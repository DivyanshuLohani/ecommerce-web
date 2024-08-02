import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { fetchBanners } from "@/lib/data";
import Image from "next/image";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default async function BannersTable() {
  const banners = await fetchBanners();
  return (
    <Card className="mt-5">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Banners
          <Button className="flex gap-2" asChild>
            <Link href={"/admin/banners/"}>
              <PlusCircle /> Add Banner
            </Link>
          </Button>
        </CardTitle>
        <CardDescription>
          Manage Banners that appear on the hompage
        </CardDescription>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4">
            {banners.map((b) => {
              return (
                <Image
                  key={b.id}
                  src={b.imageUrl}
                  alt="banner image"
                  height={200}
                  width={100}
                />
              );
            })}
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
