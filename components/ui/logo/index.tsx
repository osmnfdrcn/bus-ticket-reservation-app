import logo from "@/public/images/logo.svg";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="w-[180px] md:w-[210px] h-[60px] md:[80px] relative cursor-pointer">
      <Image src={logo} fill alt="Logo" priority />
    </div>
  );
};

export default Logo;
