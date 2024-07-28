import React from "react";
import type { Address } from "@prisma/client";

const AddressDisplay = ({ address }: { address: Address }) => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <h2 className="text-xl font-semibold mb-2">{address.name}</h2>
      <p className="mb-1">{address.address}</p>
      {address.address2 && <p className="mb-1">{address.address2}</p>}
      <p className="mb-1">
        {address.city}, {address.state}, {address.pincode}
      </p>
    </div>
  );
};

export default AddressDisplay;
