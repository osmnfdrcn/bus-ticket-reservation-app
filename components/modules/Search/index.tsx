"use client";

import Filter from "@/components/modules/Filter";
import NoResult from "@/components/modules/NoResult";
import ServiceCard from "@/components/modules/ServiceCard";
import Title from "@/components/ui/title";
import usePagination from "@/hooks/usePagination";
import { City, Service } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Pagination from "../Pagination";

type Props = {
  cities: City[];
  trips: Service[];
  searchParams: { from: string; to: string; date: string };
};

const Search = ({ cities, trips, searchParams }: Props) => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const { from, to, date } = searchParams;

  const { next, prev, currentData, currentPage, maxPage, resetPage } =
    usePagination({
      data: trips,
      itemsPerPage,
    });
  const data = currentData();
  useEffect(() => {
    resetPage();
  }, [from, to, date]);

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
