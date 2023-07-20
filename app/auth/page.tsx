import ComponentWithInputLayout from "@/components/layout/ComponentWithInputLayout";
import AuthForm from "@/components/modules/AuthForm";
import getCurrentUser from "@/helpers/getCurrentUser";
import loginImage from "@/public/images/login.webp";
import { redirect } from "next/navigation";

type Props = {};

const Auth = async (props: Props) => {
  const user = await getCurrentUser();

  if (!!user) redirect("/");
  return (
    <ComponentWithInputLayout
      image={loginImage}
      text="Cok Avantajli Firsatlardan Yararlanmak icin Gec Kalmayin"
    >
      <AuthForm />
    </ComponentWithInputLayout>
  );
};

export default Auth;
