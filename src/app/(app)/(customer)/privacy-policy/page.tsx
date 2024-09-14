import ContactDetails from "@/components/ContactDetails";

const PrivacyPolicy = () => {
  return (
    <div className="bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto bg-accent p-6 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Privacy Policy for Maa Kali Griha Udyog
        </h1>
        <p className="text-gray-600 mb-4">
          Last updated:{" "}
          <span className="font-semibold">
            10<sup>th</sup> September 2024
          </span>
        </p>

        <p className="mb-6">
          Maa Kali Griha Udyog operates the website{" "}
          <a
            href="https://maakalidhoop.in"
            className="text-blue-600 hover:underline"
          >
            https://maakalidhoop.in
          </a>{" "}
          {`(the "Site")`}. This page informs you of our policies regarding the
          collection, use, and disclosure of personal information when you use
          our Site and the choices you have associated with that information.
        </p>

        <p className="mb-6">
          We respect your privacy and are committed to protecting your personal
          information. By using our Site, you agree to the collection and use of
          information in accordance with this policy.
        </p>

        <h2 className="text-xl font-semibold mb-4">
          1. Information Collection and Use
        </h2>
        <p className="mb-4">
          We collect several types of information to provide and improve our
          services to you. The types of information we collect include:
        </p>

        <h3 className="font-semibold mb-2">a. Personal Information</h3>
        <p className="mb-4">
          While using our Site, we may ask you to provide certain personally
          identifiable information, which may include, but is not limited to:
        </p>
        <ul className="list-disc list-inside mb-6">
          <li>Name</li>
          <li>Email Address</li>
          <li>Phone Number</li>
          <li>Billing and Shipping Address</li>
          <li>Payment Information (e.g., credit/debit card details)</li>
        </ul>

        <p className="mb-6">We use this information to:</p>
        <ul className="list-disc list-inside mb-6">
          <li>Process and fulfill your orders</li>
          <li>Contact you for customer support</li>
          <li>
            Send you information about our products, promotions, and updates
            (you can opt-out at any time)
          </li>
        </ul>

        <h3 className="font-semibold mb-2">b. Log Data</h3>
        <p className="mb-6">
          When you visit our Site, we may automatically collect information sent
          by your browser, which is called Log Data. This may include:
        </p>
        <ul className="list-disc list-inside mb-6">
          <li>Your {`computer's`} IP address</li>
          <li>Browser type and version</li>
          <li>The pages you visit on our Site</li>
        </ul>

        <h3 className="font-semibold mb-2">c. Cookies</h3>
        <p className="mb-6">
          We use cookies to collect information, remember your preferences, and
          improve the overall experience on our Site. You can instruct your
          browser to refuse all cookies, but certain features of our Site may
          not function as expected.
        </p>

        <h2 className="text-xl font-semibold mb-4">
          2. Use of Your Information
        </h2>
        <p className="mb-6">
          We may use the personal information we collect from you to:
        </p>
        <ul className="list-disc list-inside mb-6">
          <li>Fulfill your orders and provide customer service</li>
          <li>Send marketing communications (with your consent)</li>
          <li>Improve our products and services based on customer feedback</li>
          <li>Comply with legal obligations</li>
        </ul>

        <p className="mb-6">
          We will not share your personal information with third parties except:
        </p>
        <ul className="list-disc list-inside mb-6">
          <li>To comply with legal requirements</li>
          <li>To protect our rights and prevent fraud</li>
          <li>
            With service providers who assist in fulfilling orders, payment
            processing, or website maintenance
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-4">3. Data Security</h2>
        <p className="mb-6">
          We take appropriate security measures to protect your personal
          information from unauthorized access. However, no method of
          transmission over the internet is 100% secure, and we cannot guarantee
          absolute security.
        </p>

        <h2 className="text-xl font-semibold mb-4">4. Your Rights</h2>
        <p className="mb-6">
          You have the following rights regarding your personal information:
        </p>
        <ul className="list-disc list-inside mb-6">
          <li>
            <strong>Access</strong>: You can request access to the personal
            information we hold about you.
          </li>
          <li>
            <strong>Correction</strong>: You can request corrections to any
            incorrect or incomplete information.
          </li>
          <li>
            <strong>Deletion</strong>: You can request the deletion of your
            personal data, subject to legal exceptions.
          </li>
          <li>
            <strong>Opt-out</strong>: You can opt-out of marketing
            communications at any time.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-4">5. Third-Party Links</h2>
        <p className="mb-6">
          Our Site may contain links to third-party websites that are not
          operated by us. We advise you to review their privacy policies as we
          have no control over their content.
        </p>

        <p className="mb-6">
          We may update this Privacy Policy from time to time. You are advised
          to review it periodically for any changes.
        </p>

        <h2 className="text-xl font-semibold mb-4">8. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at:
        </p>
        <div className="mt-4 flex flex-col-reverse gap-5 justify-center">
          <ContactDetails />
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
