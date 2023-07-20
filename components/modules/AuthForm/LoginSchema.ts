import { emailRegex } from "@/utils/regex";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required("gerekli")
    .matches(emailRegex, "gecerli bir email adreesi giriniz"),
  password: Yup.string().required("gerekli"),
});

export default LoginSchema;
