import React from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

type Props = {
  maxPage: number;
  next: () => void;
  prev: () => void;
  currentPage: number;
  numberOfResult: number;
};

const Pagination = ({
  maxPage,
  next,
  prev,
  currentPage,
  numberOfResult,
}: Props) => {
  // dogrusu pagination islemi db'den gelken data uzerinde API ya da action function uzrinde yapmak fakat bu case'de data sinirli oldugu ucun ve bu ozelligi sonradan ekledigim icin bu sekilde sabit data uzerinde yapiyorum.

  const isNextButtonDisabled = currentPage === maxPage;
  const isPrevButtonDisabled = currentPage === 1;

  return (
    <>
      {!!maxPage ? (
        <div className="w-full relative bottom left-0 bg-slate-100 text-slate-800 flex items-center justify-between gap-6 p-2 rounded-md">
          <p className="font-semibold">
            Toplam {numberOfResult} sefer bulunmustur
          </p>
          <div className="flex items-center justify-center gap-6 text-sm ">
            <AiOutlineArrowLeft
              className={`${
                isPrevButtonDisabled ? "cursor-not-allowed" : "cursor-pointer "
              } text-lg text-slate-800 font-extrabold`}
              onClick={prev}
            />
            <p className="text-sm font-semibold">
              {currentPage} / {maxPage}
            </p>
            <AiOutlineArrowRight
              className={`${
                isNextButtonDisabled ? "cursor-not-allowed" : "cursor-pointer "
              } text-lg text-slate-800 font-extrabold`}
              onClick={next}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Pagination;
