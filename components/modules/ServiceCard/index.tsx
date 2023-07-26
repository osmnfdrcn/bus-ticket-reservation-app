import { Service } from "@prisma/client";
import React from "react";
import { parse, format } from "date-fns";
import { capitalizeFirstLetter } from "@/helpers/capitilize";
import { PiBusLight } from "react-icons/pi";
import Button from "@/components/ui/button";
type Props = {
  service: Service;
};

const ServiceCard = ({ service }: Props) => {
  const parsedDate = parse(service.date, "yyyy-MM-dd", new Date());
  const formattedDate = format(parsedDate, "dd-MM-yyyy");
  return (
    <div className="px-2">
      <div className="max-w-full bg-white flex flex-col overflow-hidden shadow-md hover:shadow-lg transition">
        <div className="flex items-baseline bg-gray-100 p-2">
          <p className="text-sm md:text-md ml-2 font-semibold text-slate-600">
            {formattedDate}
          </p>
        </div>

        <div className="flex items-center justify-between mx-4">
          <div className="flex flex-row place-items-center p-2 gap-2">
            <PiBusLight size={30} className="font-extralight text-slate-500 " />
            <div className="flex flex-col">
              <p className="text-sm sm:text-lg font-bold">{service.company}</p>
              <p className="text-xs text-gray-500">{service.serviceCode}</p>
            </div>
          </div>

          <div className="flex flex-col p-2">
            <p className="text-sm sm:text-lg font-bold">{service.departure}</p>
            <p className="text-slate-500 font-semibold text-sm md:text-lg">
              {capitalizeFirstLetter(service.from)}
            </p>
          </div>

          <div className="flex flex-col p-2">
            <p className="text-sm sm:text-lg font-bold">{service.arrival}</p>
            <p className="text-slate-500 font-semibold text-sm md:text-lg">
              {capitalizeFirstLetter(service.to)}
            </p>
          </div>
        </div>
        <div className="mt-4 bg-gray-100 flex flex-row flex-wrap md:flex-nowrap justify-end items-baseline">
          <div className="flex flex-row items-center gap-2 py-4 mr-4">
            <div className="text-sm mx-2 flex flex-col">
              <p className="font-bold">{service.price}TL</p>
              <p className="text-xs text-gray-500">Kisi basi</p>
            </div>
            <Button className="bg-green-800/80 hover:bg-green-800">
              Satin Al
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
