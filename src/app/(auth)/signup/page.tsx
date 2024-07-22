import RegisterForm from "@/components/auth/SignupForm";
import React from "react";

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl mb-5">Sign up</h1>
      <RegisterForm />;
    </div>
  );
}
