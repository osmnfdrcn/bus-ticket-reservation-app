import React from "react";

type Props = {
  text: string;
};

function HeadLine({ text }: Props) {
  return (
    <p className="text-white font-bold -tracking-wide leading-10 sm:leading-12 text-4xl sm:text-5xl inset-0 w-full text-center">
      {text}
    </p>
  );
}

export default HeadLine;
