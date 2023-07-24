import Checkout from "@/components/modules/Checkout";
import getCurrentUser from "@/helpers/getCurrentUser";
import { redirect } from "next/navigation";

type Props = {
  searchParams: {
    total: string;
  };
};

const CheckoutPage = async ({ searchParams }: Props) => {
  const { total } = searchParams;
  const user = await getCurrentUser();
  if (!user) redirect("/auth");

  return <Checkout total={total} />;
};

export default CheckoutPage;
