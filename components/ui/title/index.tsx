import React from "react";

type Props = {
  text: string;
  subText?: string;
};

const Title = ({ text, subText }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center mb-[10px] gap-2">
      <p className="text-slate-800 -tracking-wide text-2xl  font-bold leading-4">
        {text}
      </p>
      <p className="text-slate-600 -tracking-wide text-lg font-semibold leading-4">
        {subText}
      </p>
    </div>
  );
};

export default Title;
