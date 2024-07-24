import SidebarLinks from "@/components/Accounts/SidebarLinks";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-10 pr-5 md:pr-10">
      <aside className=" border-r">
        <SidebarLinks />
      </aside>
      <article className="min-h-screen">{children}</article>
    </div>
  );
}
