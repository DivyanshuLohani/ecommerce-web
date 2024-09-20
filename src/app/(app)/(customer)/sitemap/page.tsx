import Link from "next/link";

const Sitemap: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-6 text-center">Sitemap</h1>
      <ul className="space-y-4">
        <li>
          <Link
            href="/accounts"
            className="text-lg font-semibold hover:text-accent-foreground"
          >
            Accounts
          </Link>
          <ul className="ml-6 mt-2 space-y-2 text-muted-foreground">
            <li>
              <Link
                href="/accounts/addresses"
                className="hover:text-accent-foreground"
              >
                Addresses
              </Link>
            </li>
            <li>
              <Link
                href="/accounts/orders"
                className="hover:text-accent-foreground"
              >
                Orders
              </Link>
            </li>
            <li>
              <Link
                href="/accounts/profile"
                className="hover:text-accent-foreground"
              >
                Profile
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link
            href="/cart"
            className="text-lg font-semibold hover:text-accent-foreground"
          >
            Cart
          </Link>
        </li>
        <li>
          <Link
            href="/category"
            className="text-lg font-semibold hover:text-accent-foreground"
          >
            Category
          </Link>
        </li>
        <li>
          <Link
            href="/checkout"
            className="text-lg font-semibold hover:text-accent-foreground"
          >
            Checkout
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="text-lg font-semibold hover:text-accent-foreground"
          >
            Contact
          </Link>
        </li>
        <li>
          <Link
            href="/orders"
            className="text-lg font-semibold hover:text-accent-foreground"
          >
            Orders
          </Link>
        </li>
        <li>
          <Link
            href="/privacy-policy"
            className="text-lg font-semibold hover:text-accent-foreground"
          >
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link
            href="/products"
            className="text-lg font-semibold hover:text-accent-foreground"
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            href="/returns-refunds"
            className="text-lg font-semibold hover:text-accent-foreground"
          >
            Returns & Refunds
          </Link>
        </li>
        <li>
          <Link
            href="/search"
            className="text-lg font-semibold hover:text-accent-foreground"
          >
            Search
          </Link>
        </li>
        <li>
          <Link
            href="/sitemap"
            className="text-lg font-semibold hover:text-accent-foreground"
          >
            Sitemap
          </Link>
        </li>
        <li>
          <Link
            href="/terms-conditions"
            className="text-lg font-semibold hover:text-accent-foreground"
          >
            Terms & Conditions
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sitemap;
