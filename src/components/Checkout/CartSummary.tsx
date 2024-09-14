"use client";
import { useCart } from "@/context/CartProvider";
import { formatCurrency } from "@/lib/utils";
import { TOTAL_CART_VALUE_TO_CHECKOUT } from "./CheckoutForm";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const CartSummary = () => {
  const { products, cartTotal, setCartOpen } = useCart();
  const router = useRouter();

  return (
    <div className="mb-6 md:mb-0 md:w-1/2">
      <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
      <ul className="space-y-4">
        {products.map((item) => (
          <li
            key={item.product.id}
            className="flex justify-between"
            suppressHydrationWarning
          >
            {item.product.name} - ₹{" "}
            {formatCurrency(
              item.product.discountedPrice
                ? item.product.discountedPrice
                : item.product.price
            )}{" "}
            x {item.quantity}
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <h3 className="text-lg font-bold">
          Total: ₹ {formatCurrency(cartTotal)}
          <br />
          {cartTotal < TOTAL_CART_VALUE_TO_CHECKOUT && (
            <>
              <span className="text-sm text-red-500">
                Cart value must be greater than Rs.{" "}
                {formatCurrency(TOTAL_CART_VALUE_TO_CHECKOUT)}
              </span>
              <br />
              <span className="text-sm text-red-500">
                Add items worth Rs.{" "}
                {formatCurrency(TOTAL_CART_VALUE_TO_CHECKOUT - cartTotal)} to
                poceed to checkout
              </span>
              <br />
              <Button
                onClick={() => {
                  setCartOpen(false);
                  router.push("/");
                }}
              >
                Browse Products
              </Button>
            </>
          )}
        </h3>
      </div>
    </div>
  );
};

export default CartSummary;
