import Image, { StaticImageData } from "next/image";

import React from "react";
type Props = {
  children: React.ReactNode;
  image: StaticImageData;
  text: string;
};

const ComponentWithInputLayout = ({ children, image, text }: Props) => {
  return (
    <div className="grid grid-cols-1  sm:grid-cols-2 w-full h-[calc(100vh-60px)] lg:h-[calc(100vh-80px)] pb-2 shadow-sm ">
      <div className="col-span-1 h-full hidden lg:block bg-cover bg-no-repeat bg-center relative ">
        <Image
          src={image!}
          alt="hero"
          fill
          quality={100}
          style={{ objectFit: "cover" }}
          className="brightness-50 rounded-xl"
          priority={true}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
          <p className="text-white font-bold -tracking-wide leading-12 text-5xl inset-0 w-full text-center">
            {text}
          </p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default ComponentWithInputLayout;
