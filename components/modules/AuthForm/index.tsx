"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import Title from "@/components/ui/title";
import { useFormik } from "formik";
import { useState } from "react";
import LoginSchema from "./LoginSchema";
import RegisterSchema from "./RegisterSchema";

type Props = {};

const AuthForm = (props: Props) => {
  const [isMember, setIsMember] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "erkek",
    },
    validationSchema: isMember ? LoginSchema : RegisterSchema,
    onSubmit: async () => {
      setIsLoading(true);
      console.log("submitted");

      const { name, email, password, gender } = formik.values;

      try {
        const data = {
          name,
          email,
          password,
          gender,
        };
        const requestOptions: RequestInit = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        };

        isMember
          ? // login api request
            console.log(data)
          : // register api request
            console.log(data);
        // setIsLoading(false);
        formik.resetForm();
      } catch (error) {
        // toast error
        console.log(error);
      }
    },
  });

  const inputs = [
    {
      id: 0,
      label: "Ad Soyad",
      type: "text",
      name: "name",
      isError: formik.errors.name && formik.touched.name,
      errorMessage: formik?.errors?.name,
      value: formik?.values.name,
      handleChange: formik.handleChange,
      login: false,
    },
    {
      id: 1,
      label: "Email",
      type: "text",
      name: "email",
      isError: formik.errors.email && formik.touched.email,
      errorMessage: formik?.errors.email,
      value: formik?.values.email,
      handleChange: formik.handleChange,
      login: true,
    },
    {
      id: 2,
      label: "Password",
      type: "password",
      name: "password",
      isError: formik.errors.password && formik.touched.password,
      errorMessage: formik?.errors?.password,
      value: formik?.values.password,
      handleChange: formik.handleChange,
      login: true,
    },
    {
      id: 3,
      label: "Password Tekrar Giriniz",
      type: "password",
      name: "confirmPassword",
      isError: formik.errors.confirmPassword && formik.touched.confirmPassword,
      errorMessage: formik?.errors?.confirmPassword,
      value: formik?.values.confirmPassword,
      handleChange: formik.handleChange,
      login: false,
    },
  ];

  const isButtonDisabled = () => {
    const { name, email, password, confirmPassword } = formik.values;
    return isMember
      ? !email || !password || isLoading
      : !name || !email || !password || !confirmPassword || isLoading;
  };

  return (
    <div className="w-full col-span-2 lg:col-span-1 flex flex-col justify-center items-center bg-zinc-200/25 ">
      <div className="w-4/5 sm:w-1/2 lg:w-3/5 flex flex-col justify-center items-center gap-4 ">
        <Title text={isMember ? "Giris" : "Kayit"} />
        <form onSubmit={formik.handleSubmit} className="w-full ">
          {isMember
            ? inputs
                .filter((i) => i.login)
                .map((i) => (
                  <Input
                    key={i.id}
                    label={i.label}
                    type={i.type}
                    name={i.name}
                    errorMessage={i.errorMessage}
                    value={i.value}
                    onChange={i.handleChange}
                    isError={i.isError as string}
                  />
                ))
            : inputs.map((i) => (
                <Input
                  key={i.id}
                  label={i.label}
                  type={i.type}
                  name={i.name}
                  errorMessage={i.errorMessage}
                  value={i.value}
                  onChange={i.handleChange}
                  isError={i.isError as string}
                />
              ))}

          {!isMember ? (
            <Select
              label={"Cinsiyet"}
              options={[
                { id: "erkek", name: "Erkek" },
                { id: "kadin", name: "Kadin" },
              ]}
              onChange={formik.handleChange}
              name={"gender"}
              isError={!(formik.errors.gender && formik.touched.gender)}
              errorMessage={formik?.errors?.gender}
              placeHolder="Cinsiyet"
            />
          ) : null}

          <Button
            variant={"secondary"}
            size="full"
            type="submit"
            disabled={isButtonDisabled()}
            loading={isLoading}
          >
            {isMember ? "Giris" : "Kayit Ol"}
          </Button>
        </form>
        <div className="flex justify-center items-center gap-2">
          <p className="text-xs text-slate-700">
            {isMember ? "Henuz uye olmadiniz mi?" : "Zaten uye misiniz?"}
          </p>
          <p
            className="text-xs text-slate-700 font-bold cursor-pointer"
            onClick={() => (isMember ? setIsMember(false) : setIsMember(true))}
          >
            {isMember ? "Kayit ol" : "Giris"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;