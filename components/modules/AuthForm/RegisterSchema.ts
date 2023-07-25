import {
  doesNotStartWithWhitespaceRegex,
  emailRegex,
  passwordWithOneUppercaseOneLowerCaseOneNumberMin8Chars,
} from "@/utils/regex";
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .required("gerekli")
    .min(1)
    .max(40)
    .matches(doesNotStartWithWhitespaceRegex, "bosluk birakmayin"),

  email: Yup.string()
    .required("gerekli")
    .matches(
      emailRegex,
      "sadece kucur harf ile gecerli bir email adresi giriniz"
    ),

  password: Yup.string()
    .required("gerekli")
    .matches(
      passwordWithOneUppercaseOneLowerCaseOneNumberMin8Chars,
      "1 kucuk, 1 buyuk harf, 1 rakam, min 8 karakter"
    ),

  confirmPassword: Yup.string()
    .required("gerekli")
    .oneOf([Yup.ref("password")], "Paralolar eslesmeli"),

  gender: Yup.string().required("gerekli"),
});

export default RegisterSchema;
