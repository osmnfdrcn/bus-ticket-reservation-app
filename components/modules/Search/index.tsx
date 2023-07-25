"use client";

import Title from "@/components/ui/title";
import NoResult from "@/components/modules/NoResult";
import Filter from "@/components/modules/Filter";
import ServiceCard from "@/components/modules/ServiceCard";
import { City, Service } from "@prisma/client";
import Link from "next/link";
import usePagination from "@/hooks/usePagination";
import { useState } from "react";
import Pagination from "../Pagination";
type Props = {
  cities: City[];
  trips: Service[];
};

const Search = ({ cities, trips }: Props) => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const { next, prev, currentData, currentPage, maxPage } = usePagination({
    data: trips,
    itemsPerPage,
  });
  const data = currentData();
  console.log(data);

  return (
    <div className="flex flex-col gap-6 items-center w-full mt-[100px] lg:mt-[120px]">
      <Title text="Sonuclar" />
      <div className="w-full p-2">
        <Filter cityOptions={cities!} allFiltersMandatory={false} />

        <Pagination
          maxPage={maxPage}
          next={next}
          prev={prev}
          currentPage={currentPage}
          numberOfResult={trips.length}
        />
      </div>

      {!trips?.length ? (
        <NoResult />
      ) : (
        <div className="flex flex-col gap-6 w-full">
          {data?.map((t: Service) => (
            <Link href={`/services/${t.id}`} key={t.id}>
              <ServiceCard service={t} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
