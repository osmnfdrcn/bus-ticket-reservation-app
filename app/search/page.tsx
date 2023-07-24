import NoResult from "@/components/modules/NoResult";
import Search from "@/components/modules/Search";
import ServiceCard from "@/components/modules/ServiceCard";
import Title from "@/components/ui/title";
import { capitalizeFirstLetter } from "@/helpers/capitilize";
import getCities from "@/helpers/getCities";
import getServices from "@/helpers/getServices";
import { Service } from "@prisma/client";
import React from "react";
import Link from "next/link";
type Props = {
  searchParams: any;
};

const SearchPage = async ({ searchParams }: Props) => {
  const properties = await getServices(searchParams);

  const url = createUrl(searchParams);
  const { from, to, date } = searchParams;

  const cities = await getCities();
  const trips = await getServices(searchParams);

  return (
    <div className="flex flex-col gap-6 items-center w-full mt-[100px] lg:mt-[120px]">
      <Title text="Sonuclar" />
      <div className="w-full p-2">
        <Search cityOptions={cities!} allFiltersMandatory={false} />
      </div>

      {!trips?.length ? (
        <NoResult />
      ) : (
        <div className="flex flex-col gap-6 w-full">
          {trips?.map((t: Service) => (
            <Link href={`/services/${t.id}`} key={t.id}>
              <ServiceCard service={t} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;

const createUrl = (searchParams: any) => {
  let url = "http://localhost:3000/api/service?";

  for (const param in searchParams) {
    if (searchParams.hasOwnProperty(param)) {
      url += `${param}=${searchParams[param]}&`;
    }
  }
  return url;
};
