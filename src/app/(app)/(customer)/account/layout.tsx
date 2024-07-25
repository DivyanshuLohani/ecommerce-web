import SidebarLinks from "@/components/Accounts/SidebarLinks";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-10 md:pr-10">
      <aside className=" border-r">
        <SidebarLinks />
      </aside>
      <article className="min-h-screen w-full">{children}</article>
    </div>
  );
}
