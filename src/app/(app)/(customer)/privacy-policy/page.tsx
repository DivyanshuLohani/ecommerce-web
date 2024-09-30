import ContactDetails from "@/components/ContactDetails";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-7xl mx-auto p-8 text-foreground">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p>
          This Privacy Policy describes how{" "}
          <strong>Maa Kali Griha Udyog</strong> {`("we, our, us")`} collects,
          uses, shares, protects, or otherwise processes your information
          through our website{" "}
          <a href="https://maakalidhoop.in" className="text-blue-500 underline">
            https://maakalidhoop.in
          </a>{" "}
          (hereinafter referred to as the {`"Platform"`}). You may browse
          certain sections of the Platform without registering with us. We do
          not offer any product/service outside India, and your personal data
          will primarily be stored and processed in India. By visiting this
          Platform, providing your information, or availing of any
          product/service offered, you expressly agree to be bound by the terms
          of this Privacy Policy, the Terms of Use, and any applicable
          product/service terms. If you do not agree, please do not use or
          access our Platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Collection</h2>
        <p>
          We collect your personal data when you use our Platform, services, or
          interact with us. This information may include but is not limited to
          your name, date of birth, address, telephone/mobile number, email ID,
          and identity/address proof. Sensitive data, such as your bank account
          or payment information, may also be collected with your consent.
        </p>
        <p>
          You always have the option to not provide information by choosing not
          to use a particular service or feature on the Platform. We may track
          your behavior, preferences, and information that you provide to us on
          the Platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Usage</h2>
        <p>
          We use your personal data to provide services you request, fulfill
          orders, enhance your customer experience, resolve disputes, and for
          marketing purposes, subject to your consent. We may also use this data
          to detect and protect against fraud, troubleshoot problems, and inform
          you of relevant updates.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Sharing</h2>
        <p>
          We may share your personal data with our affiliates, third-party
          service providers, or business partners as necessary for fulfilling
          your orders and for marketing purposes, unless you opt out. Personal
          data may also be disclosed to government agencies if required by law.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Security Precautions</h2>
        <p>
          We adopt reasonable security measures to protect your personal data
          from unauthorized access or disclosure. However, the transmission of
          data over the internet is not completely secure, and users accept the
          risks associated with online data transmission.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Data Deletion and Retention
        </h2>
        <p>
          You can delete your account by visiting your profile on the Platform.
          We retain your personal data for as long as necessary to fulfill the
          purposes for which it was collected, unless a longer retention period
          is required by law.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
        <p>
          You may access, rectify, or update your personal data directly through
          the Platform. You also have the right to withdraw consent for
          processing your data by contacting us.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Consent</h2>
        <p>
          By using our Platform or providing your information, you consent to
          the collection, use, and processing of your information as outlined in
          this Privacy Policy. You may withdraw your consent by writing to us,
          but please note that withdrawal may affect your access to certain
          services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Changes to this Privacy Policy
        </h2>
        <p>
          We may update this Privacy Policy to reflect changes in our practices
          or legal obligations. You are encouraged to review this policy
          periodically for any changes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
        <div>
          If you have any questions about this Privacy Policy, please contact us
          at{" "}
          <div className="flex flex-col-reverse gap-4 mt-2">
            <ContactDetails />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
