import ContactDetails from "@/components/ContactDetails";
import React from "react";

const ReturnsAndRefunds = () => {
  return (
    <div className="bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto bg-accent p-6 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Returns and Refunds Policy
        </h1>

        <h2 className="text-xl font-semibold mb-4">Returns</h2>
        <p className="mb-6">
          We do not accept returns. All sales are final, so please ensure that
          you are completely satisfied with your purchase before completing your
          order.
        </p>

        <h2 className="text-xl font-semibold mb-4">Refunds</h2>
        <p className="mb-6">
          As we do not accept returns, we do not provide refunds for any
          products once they have been purchased. Please contact our customer
          service team for any issues related to your order.
        </p>

        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
        <div className="mb-6">
          If you have any questions or concerns about our Returns and Refunds
          Policy, please contact us at{" "}
          <div className="flex flex-col-reverse gap-4 mt-2">
            <ContactDetails />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnsAndRefunds;
