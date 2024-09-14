import CartSummary from "@/components/Checkout/CartSummary";
import CheckoutForm from "@/components/Checkout/CheckoutForm";
import { getAddressFromCookie } from "@/lib/actions/addresses";
import { getAddresses } from "@/lib/data";

export default async function page() {
  const address = await getAddressFromCookie();
  const addresses = await getAddresses();
  if (address) {
    addresses.push(address);
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>
        <div className="flex flex-col md:flex-row justify-between md:gap-5">
          <div className="md:w-1/2">
            <h2 className="text-xl font-semibold mb-4">
              Billing Information & Shipping Address
            </h2>
            <CheckoutForm addresses={addresses} />
          </div>
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
