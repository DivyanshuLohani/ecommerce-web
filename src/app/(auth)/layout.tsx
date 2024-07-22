import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex items-center justify-center w-full h-screen">
      <div className="bg-card p-5 w:3/5 md:w-2/5 rounded-lg">{children}</div>
    </main>
  );
}
