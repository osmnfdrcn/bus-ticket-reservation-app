"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";
import Title from "@/components/ui/title";
import { capitalizeFirstLetter } from "@/helpers/capitilize";
import useReservations from "@/hooks/useReservations";
import { useRouter } from "next/navigation";
import React, { useReducer } from "react";
import { toast } from "react-hot-toast";
import { v4 as uuid } from "uuid";
import { initialState, reducer } from "./reducer";
const Checkout = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { name, ccno, ccv, expire, isLoading } = state;
  const router = useRouter();
  const { reservations, removeReservation, reset } = useReservations();

  const total = reservations.reduce((acc, el) => (acc += el.service.price), 0);
  const wait = (milliseconds: number) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };
  const handleClick = () => {
    dispatch({ type: "SET_ISLOADING", payload: true });
    wait(1500).then(() => {
      dispatch({ type: "SET_ISLOADING", payload: false });
      toast.success("Odemeniz alinmistir.");
      router.push("/");
      reset();
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="relative mx-auto w-full bg-white">
      <div className="grid grid-cols-2 gap-8 py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
        <div className="mx-auto w-full max-w-lg  col-span-2 lg:col-span-1">
          <Title text="Guvenli Alisveris" />
          <div className="lg:mt-10 flex flex-col space-y-4 ">
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
        <div className="mx-auto w-full max-w-lg  col-span-2 lg:col-span-1  flex flex-col gap-2 ">
          <Title text="Reservasyonlar" />
          <div className="flex flex-col gap-2 lg:mt-10">
            {reservations.map((r) => (
              <div
                className="w-full grid grid-cols-6 gap-2 lg:gap-4 p-2  items-center bg-slate-50  "
                key={uuid()}
              >
                <p className="text-xs text-slate-700 font-bold ">{r.name}</p>
                <div className="flex flex-col items-center">
                  <p className="text-xs text-slate-700 font-bold">
                    {capitalizeFirstLetter(r.service.from)}
                  </p>
                  <p className="text-xs text-slate-700 font-bold">
                    {capitalizeFirstLetter(r.service.to)}
                  </p>
                </div>

                <p className="text-xs text-slate-700 font-bold text-center">
                  {r.seat}
                </p>
                <p className="text-xs text-slate-700 font-bold text-cente">
                  {r.service.price}TL
                </p>
                <p className="text-xs text-slate-700 font-bold text-cente">
                  {capitalizeFirstLetter(r.service.company)}
                </p>
                <Button
                  className="font-bold"
                  size={"small"}
                  variant={"link"}
                  onClick={() => removeReservation(r)}
                >
                  {" "}
                  Sil{" "}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
