import React, { memo } from "react";
import { BsExclamationOctagon } from "react-icons/bs";

type Props = {};

const Warning = (props: Props) => {
  return (
    <div className="absolute text-sm text-white font-semibold p-1  flex items-center justify-center gap-2  top-[80px] left-0 right-0 bg-rose-600/80">
      <BsExclamationOctagon className="font-extrabold" />
      En fazla rezerve edilebilir koltuk sayisina ulastiniz!
    </div>
  );
};

export default memo(Warning);
