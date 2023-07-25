import { emailRegex } from "@/utils/regex";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required("gerekli")
    .matches(
      emailRegex,
      "sadece kucur harf ile gecerli bir email adresi giriniz"
    ),
  password: Yup.string().required("gerekli"),
});

export default LoginSchema;
