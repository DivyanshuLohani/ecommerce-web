import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Link from "next/link";
import Image from "next/image";
import { TOTAL_CART_VALUE_TO_CHECKOUT } from "./Checkout/CheckoutForm";

export default function Component() {
  return (
    <section className="w-full py-12">
      <div className="container grid gap-8 px-4 md:px-6 mx-auto">
        <div className="grid gap-4">
          <h2 className="text-2xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Find answers to your questions about our products
          </p>
        </div>
        <div className="grid gap-6">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="flex items-center justify-between gap-4 px-6 py-4 bg-muted/40 text-lg font-medium">
                What products do you offer?
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-muted-foreground">
                <p>
                  We offer a wide range of premium quality agarbattis and dhoop
                  products, including traditional and modern fragrances. Our
                  products are made with natural ingredients and are perfect for
                  meditation, yoga, and creating a calming atmosphere in your
                  home.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="flex items-center justify-between gap-4 px-6 py-4 bg-muted/40 text-lg font-medium">
                What is the minimum order value?
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-muted-foreground">
                <p>
                  The minimum order value for our products is Rs.{" "}
                  {Math.round(TOTAL_CART_VALUE_TO_CHECKOUT / 100)}. This ensures
                  that we can provide the best possible shipping rates and
                  customer service for your order.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger className="flex items-center justify-between gap-4 px-6 py-4 bg-muted/40 text-lg font-medium">
                What are the payment methods you accept?
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-muted-foreground">
                <div>
                  We only accept online payments for now. Your payments will be
                  secured with <b>PhonePe.</b>
                  {/* <Image
                    height={50}
                    width={50}
                    src={"/phonepe.svg"}
                    alt="Phonepe Logo"
                  /> */}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="flex items-center justify-between gap-4 px-6 py-4 bg-muted/40 text-lg font-medium">
                Do you offer refunds?
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-muted-foreground">
                <p>
                  We do not offer refunds on our products. We stand behind the
                  quality of our agarbattis and dhoop, and we are confident that
                  you will be satisfied with your purchase. If you have any
                  issues with your order, please contact our customer support
                  team, and we will do our best to assist you.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="flex items-center justify-between gap-4 px-6 py-4 bg-muted/40 text-lg font-medium">
                How long does shipping take?
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-muted-foreground">
                <p>
                  We offer fast and reliable shipping across India. Most orders
                  are delivered within 5-7 business days. However, please note
                  that delivery times may vary depending on your location and
                  the availability of our products.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="flex items-center justify-between gap-4 px-6 py-4 bg-muted/40 text-lg font-medium">
                What if I want to order in Bulk
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-muted-foreground">
                <p>
                  You can contact us directly{" "}
                  <Link
                    className="text-primary hover:text-primary/70"
                    href="/contact"
                  >
                    here
                  </Link>{" "}
                  and register your enquiry to get a quote
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
