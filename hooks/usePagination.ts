import { Service } from "@prisma/client";
import { useCallback, useMemo, useState } from "react";

type Props = {
  data: Service[];
  itemsPerPage: number;
};

const usePagination = ({ data, itemsPerPage }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data?.length / itemsPerPage);

  const currentData = () => {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data?.slice(begin, end);
  };

  const next = () =>
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  const resetPage = () => setCurrentPage(1);

  const prev = () =>
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));

  const jump = useCallback((page: number) => {
    const pageNumber = Math.max(1, page);
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
  }, []);

  return { next, prev, jump, currentData, currentPage, maxPage, resetPage };
};

export default usePagination;
