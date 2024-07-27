import SidebarLinks from "@/components/Accounts/SidebarLinks";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return redirect("/login/");
  return (
    <div className="flex gap-10 md:pr-10">
      <aside className=" border-r">
        <SidebarLinks />
      </aside>
      <article className="min-h-screen w-full">{children}</article>
    </div>
  );
}
