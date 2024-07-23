import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";

export default function ProductCard() {
  return (
    <Card>
      <CardHeader className="p-0">
        <Image
          width={200}
          height={200}
          className="rounded-t-lg w-full"
          src="/banner.jpg"
          alt=""
        />
      </CardHeader>
      <CardContent className="mt-5">
        <div className="title">
          <span className="font-semibold">
            Product Name here with a long name
          </span>
        </div>
        <br />
        <div className="price">
          <span className="">Rs. 201</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" size={"lg"}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
