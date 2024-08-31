import React from "react";
export default function notFound() {
  return (
    <main className="p-4 md:p-6">
      <div className="mb-8 space-y-4">
        <h1 className="font-semibold text-lg md:text-2xl">Page not found</h1>
        <p>The requested resource cannot be found on the server</p>
      </div>
    </main>
  );
}
