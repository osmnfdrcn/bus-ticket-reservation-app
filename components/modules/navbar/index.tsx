import React from "react";
import Logo from "@/components/ui/logo";
import Button from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full h-[60px] lg:h-[80px]  bg-white fixed top-0 left-0 right-0 z-50 px-[10px] ">
      <div className="max-w-[1280px] h-full mx-auto flex justify-between items-center">
        <Link href="/">
          <Logo />
        </Link>
        <Button
          className="justify-self-center"
          variant={"primary"}
          size="default"
        >
          Giris
        </Button>
      </div>
    </div>
  );
};

export default React.memo(Navbar);
