"use client";
import DatePicker from "@/components/ui/datepicker";
import Button from "@/components/ui/button";
import Select from "@/components/ui/select";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { City } from "@prisma/client";

type Props = {
  cityOptions: City[];
};

const Search = ({ cityOptions }: Props) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(new Date());
  const isButtonDisabled = !from || !to || !date;
  const router = useRouter();

  let url = "/search?";
  !!from ? (url += `kalkis=${from}&`) : null;
  !!to ? (url += `varis=${to}&`) : null;
  !!date ? (url += `tarih=${date}&`) : null;
  url = url.slice(0, -1);

  //once kalkis sehri secilmis ise varis listesinde olmamali
  //once varis sehri secilmis ise kalkis listesinde olmamali
  const departureOptions = !!to
    ? cityOptions.filter((option) => option.name != to)
    : cityOptions;

  const arrivalOptions = !!from
    ? cityOptions.filter((option) => option.name != from)
    : cityOptions;

  return (
    <div className="w-full lg:w-3/4 xl:w-2/3  flex flex-col sm:flex-row items-center justify-center gap-2 p-5 bg-slate-400/70 rounded-md ">
      <Select
        placeHolder="Kalkis"
        name="kalkis"
        options={departureOptions}
        onChange={(e) => setFrom(e.target.value)}
      />
      <Select
        placeHolder="Varis"
        name="kalkis"
        options={arrivalOptions}
        onChange={(e) => setTo(e.target.value)}
      />

      <div className="relative w-full ">
        <DatePicker onChange={setDate} value={date} />
      </div>
      <Button
        className="bg-yellow-500/90 hover:bg-yellow-500 disabled:bg-yellow-700 w-full sm:w-1/2"
        size={"full"}
        disabled={isButtonDisabled}
        onClick={() => router.push(url)}
      >
        Ara
      </Button>
    </div>
  );
};

export default Search;
