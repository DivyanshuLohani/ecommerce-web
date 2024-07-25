import UserupdateForm from "@/components/auth/UserupdateForm";
import React from "react";

export default function page() {
  return (
    <div className="py-10">
      <h1 className="text-2xl font-semibold">Account Details</h1>
      <h4 className="text-sm">Manage your profile</h4>

      <UserupdateForm />
    </div>
  );
}
