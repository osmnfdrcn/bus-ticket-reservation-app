import Filter from "@/components/modules/Filter";
import HeadLine from "@/components/ui/headline";
import getCities from "@/helpers/getCities";
import heroImage from "@/public/images/hero.webp";
import Image from "next/image";
type Props = {};

const Home = async (props: Props) => {
  const cities = await getCities();
  return (
    <div className="relative grid grid-cols-1 w-full h-[calc(100vh-60px)] lg:h-[calc(100vh-80px)] py-2 shadow-sm px-2">
      <div className="col-span-1 h-full px-2 bg-cover bg-no-repeat bg-center relative ">
        <Image
          src={heroImage}
          alt="hero"
          fill
          sizes="100vw"
          quality={90}
          placeholder="blur"
          style={{ objectFit: "cover" }}
          className="brightness-50 rounded-xl"
          priority={true}
          loading="eager"
        />
        <div className="absolute top-[40%] lg:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center justify-center px-2">
          <HeadLine text="Yolculugunuzu Bizimle Planlayin" />
          <div className="w-full  bg-yellow-400/70 h-2 my-4 " />
          <div className="w-full lg:w-3/4 xl:w-2/3">
            <Filter cityOptions={cities!} allFiltersMandatory={true} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
