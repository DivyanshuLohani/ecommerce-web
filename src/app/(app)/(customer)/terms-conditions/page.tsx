import ContactDetails from "@/components/ContactDetails";
import { Phone } from "lucide-react";
import Link from "next/link";
import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto bg-accent p-6 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Terms and Conditions
        </h1>

        <h2 className="text-xl font-semibold mb-4">Minimum Order Value</h2>
        <p className="mb-6">
          Orders must meet a minimum value of ₹499/- to be processed.
        </p>
        <h2 className="text-xl font-semibold mb-4">
          Order Acceptance and Rejection
        </h2>
        <p className="mb-6">
          When you place an order, it may not be accepted instantly. In some
          cases, we may reject an order due to stock issues, payment problems,
          or other reasons. If your order is rejected, you will be notified, and
          any payment made will be refunded within 7 business days.
        </p>
        <h2 className="text-xl font-semibold mb-4">
          Order Processing and Delivery
        </h2>
        <p className="mb-6">
          Orders are processed within 2-3 business days. Delivery times vary
          depending on the location.
        </p>

        <h2 className="text-xl font-semibold mb-4">Returns</h2>
        <p className="mb-6">
          We do not accept returns. Please ensure that you are certain of your
          purchase before completing the transaction.
        </p>

        <h2 className="text-xl font-semibold mb-4">Wholesale Orders</h2>
        <p className="mb-6">
          For bulk or B2B orders, please contact us directly at{" "}
          <Link
            href={"tel:+919431997397"}
            referrerPolicy="no-referrer"
            className=" text-primary transition-colors inline-block"
          >
            +91 94319 97397
          </Link>{" "}
          for special terms and pricing.
        </p>

        <h2 className="text-xl font-semibold mb-4">Pricing and Availability</h2>
        <p className="mb-6">
          Prices may change without prior notice. Product availability may vary
          and is subject to change without notice.
        </p>

        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
        <div className="mb-6">
          For queries or support, reach out to us at{" "}
          <div className="flex flex-col-reverse gap-4 mt-2">
            <ContactDetails />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
