import ComponentWithInputLayout from "@/components/layout/ComponentWithInputLayout";
import AuthForm from "@/components/modules/AuthForm";
import loginImage from "@/public/images/login.webp";

type Props = {};

const Auth = (props: Props) => {
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
