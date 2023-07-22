"use client";
import Button from "@/components/ui/button";
import DatePicker from "@/components/ui/datepicker";
import Select from "@/components/ui/select";
import { City } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useReducer } from "react";
import { initialState, reducer } from "./reducer";

type Props = {
  cityOptions: City[];
  allFiltersMandatory: boolean;
};

const Search = ({ cityOptions, allFiltersMandatory }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { to, from, date } = state;
  const isButtonDisabled = !from || !to || !date;
  const router = useRouter();

  let url = "/search?";
  !!from ? (url += `from=${from}&`) : null;
  !!to ? (url += `to=${to}&`) : null;
  !!date ? (url += `date=${date}&`) : null;
  url = url.slice(0, -1);

  //once kalkis sehri secilmis ise varis listesinde olmamali
  //once varis sehri secilmis ise kalkis listesinde olmamali
  const departureOptions = !!to
    ? cityOptions.filter((option) => option.name != to)
    : cityOptions;

  const arrivalOptions = !!from
    ? cityOptions.filter((option) => option.name != from)
    : cityOptions;

  const selects = [
    {
      id: 0,
      name: "kalkis",
      placeHolder: "Kalkis",
      options: cityOptions,
      onChange: (e: React.ChangeEvent<HTMLSelectElement>) =>
        dispatch({ type: "SET_FROM", payload: e.target.value }),
    },
    {
      id: 1,
      name: "varis",
      placeHolder: "Varis",
      options: arrivalOptions,
      onChange: (e: React.ChangeEvent<HTMLSelectElement>) =>
        dispatch({ type: "SET_TO", payload: e.target.value }),
    },
  ];

  return (
    <div className="w-full   flex flex-col sm:flex-row items-center justify-center gap-2 p-5 bg-slate-400/70 rounded-md ">
      {selects.map((s) => (
        <Select
          key={s.id}
          placeHolder={s.placeHolder}
          name={s.name}
          options={s.options}
          onChange={s.onChange}
        />
      ))}

      <div className="relative w-full ">
        <DatePicker
          onChange={(value: Date) =>
            dispatch({ type: "SET_DATE", payload: value })
          }
          value={date}
        />
      </div>

      <Button
        className="bg-yellow-500/90 hover:bg-yellow-500 disabled:bg-yellow-700 w-full sm:w-1/2"
        size={"full"}
        disabled={allFiltersMandatory && isButtonDisabled}
        onClick={() => router.push(url)}
      >
        Ara
      </Button>
    </div>
  );
};

export default Search;
