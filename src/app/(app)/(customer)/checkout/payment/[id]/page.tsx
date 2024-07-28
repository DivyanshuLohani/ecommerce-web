import Payment from "@/components/Checkout/Payment";
import { getPaymentDetails } from "@/lib/payment";

export default async function Page({ params }: { params: { id: string } }) {
  const paymentDetails = await getPaymentDetails(params.id);
  //   if (paymentDetails.status != "PENDING") redirect("/checkout");
  return (
    <>
      <Payment paymentDetails={paymentDetails} />;
    </>
  );
}
