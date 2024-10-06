import CartSummary from "@/components/Checkout/CartSummary";
import AddressDisplay from "@/components/Checkout/AddressDisplay";
import { redirect } from "next/navigation";
import { getAddressFromCookie } from "@/lib/actions/addresses";
import PlaceOrderButton from "./place-order";
import Image from "next/image";
import ProgressIndicator from "@/components/ui/progress-indicator";
import Link from "next/link";

export default async function page() {
  const address = await getAddressFromCookie();
  if (!address) redirect("/checkout");
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>
        <ProgressIndicator currentIndex={3} />
        <div className="flex flex-col md:flex-row justify-between mt-3">
          <CartSummary />
          <div className="md:w-1/2">
            <h2 className="text-xl font-semibold mb-4">
              Billing Information & Shipping Address
            </h2>
            <AddressDisplay address={address} />
          </div>
        </div>
        <PlaceOrderButton />
        <div className="mt-5">
          By placing an order you agree to our{" "}
          <Link
            className="text-primary hover:text-primary/75"
            href={"/terms-conditions"}
          >
            Terms and Conditions
          </Link>{" "}
          and{" "}
          <Link
            className="text-primary hover:text-primary/75"
            href="/privacy-policy"
          >
            Privacy Policy
          </Link>
        </div>
        <div className="flex w-full items-center gap-2 justify-center mt-6">
          <span>Secured Payments with </span>
          <Image
            height={50}
            width={120}
            src={"/phonepe.svg"}
            alt="Phonepe Logo"
          />
        </div>
      </div>
    </div>
  );
}
