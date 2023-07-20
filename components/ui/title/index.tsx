import React from "react";

type Props = {
  text: string;
};

const Title = ({ text }: Props) => {
  return (
    <p className="text-slate-800 -tracking-wide text-2xl mb-[20px] font-bold leading-4">
      {text}
    </p>
  );
};

export default Title;
