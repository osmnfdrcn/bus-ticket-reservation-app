import Checkout from "@/components/modules/Checkout";
import getCurrentUser from "@/helpers/getCurrentUser";
import { redirect } from "next/navigation";

const CheckoutPage = async () => {
  const user = await getCurrentUser();
  if (!user) redirect("/auth");

  return <Checkout />;
};

export default CheckoutPage;
