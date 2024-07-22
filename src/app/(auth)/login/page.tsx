import LoginForm from "@/components/auth/LoginForm";
import React from "react";

export default function page() {
  return (
    <div>
      <h1 className="text-2xl mb-5">Login</h1>
      <LoginForm />;
    </div>
  );
}
