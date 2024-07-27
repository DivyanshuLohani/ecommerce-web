import { toast } from "@/components/ui/use-toast";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    toast({
      title: "Account Required",
      description: "Please create an account to continue purchase",
    });
    redirect("/signup");
  }

  return <div>page</div>;
}
