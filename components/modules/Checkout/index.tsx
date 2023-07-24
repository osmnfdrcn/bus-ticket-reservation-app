"use client";
import React, { useReducer, useState } from "react";
import { toast } from "react-hot-toast";
import { initialState, reducer } from "./reducer";
import Spinner from "@/components/ui/spinner";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Title from "@/components/ui/title";
import { useRouter } from "next/navigation";
type Props = {
  total: string;
};

const Checkout = ({ total }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { name, ccno, ccv, expire, isLoading } = state;
  const router = useRouter();
  const wait = (milliseconds: number) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };
  const handleClick = () => {
    dispatch({ type: "SET_ISLOADING", payload: true });
    wait(1000).then(() => {
      dispatch({ type: "SET_ISLOADING", payload: false });
      toast.success("Odemniz alinmistir. Anasayfaya yonlendiriliyorsunuz!");
    });
    wait(1500).then(() => {
      router.push("/");
    });
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="relative mx-auto w-full bg-white">
      <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
        <div className="mx-auto w-full max-w-lg">
          <Title text="Guvenli Alisveris" />
          <div className="mt-10 flex flex-col space-y-4 ">
            <Input
              type={"text"}
              name={"isim"}
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                dispatch({ type: "SET_ISIM", payload: e.target.value })
              }
              label="Isim"
            />
            <Input
              type={"text"}
              name={"ccno"}
              value={ccno}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                dispatch({ type: "SET_CCNO", payload: e.target.value })
              }
              label="Kart No"
              placeholder="1234-5678-XXXX-XXXX"
            />

            <div className="flex gap-4">
              <Input
                type={"text"}
                name={"ccv"}
                value={ccv}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({ type: "SET_CCV", payload: e.target.value })
                }
                label="CCV"
                placeholder="678"
              />
              <Input
                type={"text"}
                name={"expire"}
                value={expire}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({ type: "SET_EXPIRE", payload: e.target.value })
                }
                label="Gecerlilik Tarihi"
                placeholder="11/2028"
              />
            </div>
            <div className="w-full bg-slate-50 text-sm font-semibold p-2 flex justify-between ">
              <p>Toplam</p>
              <p>{total}TL</p>
            </div>
            <Button
              size={"full"}
              onClick={handleClick}
              disabled={!name || !ccno || !ccv || !expire}
            >
              Satin Al
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
