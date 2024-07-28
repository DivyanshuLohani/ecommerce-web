import AddressForm from "@/components/Accounts/AddressForm";
import CartSummary from "@/components/Checkout/CartSummary";

export default async function page() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>
        <div className="flex flex-col md:flex-row justify-between">
          <CartSummary />
          <div className="md:w-1/2">
            <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
            <AddressForm />
          </div>
        </div>
      </div>
    </div>
  );
}
