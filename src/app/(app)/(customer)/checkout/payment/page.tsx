import CartSummary from "@/components/Checkout/CartSummary";
import { Button } from "@/components/ui/button";
import AddressDisplay from "@/components/Checkout/AddressDisplay";
import { redirect } from "next/navigation";
import { placeOrder } from "@/lib/payment";
import { getAddressFromCookie } from "@/lib/actions/addresses";

export default async function page() {
  const address = await getAddressFromCookie();
  if (!address) redirect("/checkout");
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>
        <div className="flex flex-col md:flex-row justify-between">
          <CartSummary />
          <div className="md:w-1/2">
            <h2 className="text-xl font-semibold mb-4">
              Billing Information & Shipping Address
            </h2>
            <AddressDisplay address={address} />
          </div>
        </div>
        <form action={placeOrder}>
          <Button className="w-full mt-5">Place Order</Button>
        </form>
      </div>
    </div>
  );
}
