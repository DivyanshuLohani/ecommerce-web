"use client";

import React from "react";
import { SessionProvider as SP } from "next-auth/react";

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SP>{children}</SP>;
}
