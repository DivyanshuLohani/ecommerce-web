import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
export default function notFound() {
  return (
    <div className="grid h-screen place-content-center bg-background px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-muted">404</h1>

        <p className="text-2xl font-bold tracking-tight text-muted-foreground sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-gray-500">We {"can't"} find that page.</p>

        <Button size={"lg"} asChild className="mt-4">
          <Link href="/">Go Back Home</Link>
        </Button>
      </div>
    </div>
  );
}
