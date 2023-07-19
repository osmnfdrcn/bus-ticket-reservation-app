import React from "react";

type WrapperProps = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <div className="max-w-[1280px] mx-auto mt-[60px] lg:mt-[80px] px-[10px]">
      {children}
    </div>
  );
};

export default Wrapper;
