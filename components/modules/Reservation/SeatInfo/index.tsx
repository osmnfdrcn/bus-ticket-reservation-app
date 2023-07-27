import React, { memo } from "react";

type Props = {};

const SeatInfo = (props: Props) => {
  return (
    <div className="grid grid-cols-4 p-2 gap-2">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="p-2 border-2 rounded-full  bg-blue-400 text-black" />
        <p className="text-xs font-light">Erkek Yolcu</p>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="p-2 border-2 rounded-full  bg-rose-400 text-black" />
        <p className="text-xs font-light">Kadin Yolcu</p>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="p-2 border-2 rounded-full text-xs font-light bg-white text-black" />
        <p className="text-xs font-light">Uygun</p>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="p-2 border-2 rounded-full text-xs font-light bg-black text-white" />
        <p className="text-xs font-light">Alinamaz</p>
      </div>
    </div>
  );
};

export default memo(SeatInfo);
