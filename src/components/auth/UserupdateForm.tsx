"use client";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";

export default function UserupdateForm() {
  const session = useSession();
  return (
    <div className="py-2 w-full">
      <div className="input my-4">
        <Label htmlFor="name">Name</Label>
        <Input id="name" defaultValue={session?.data?.user.name} />
      </div>
      <div className="input my-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" />
      </div>

      <Button>Save</Button>
    </div>
  );
}
