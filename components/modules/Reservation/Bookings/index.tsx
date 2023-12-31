import Button from "@/components/ui/button";
import Title from "@/components/ui/title";
import { capitalizeFirstLetter } from "@/helpers/capitilize";
import useReservations from "@/hooks/useReservations";
import { IReservation } from "@/types";
import { Service } from "@prisma/client";
import { format, parse } from "date-fns";
import { useRouter } from "next/navigation";
import { PiBusLight } from "react-icons/pi";
type Props = {
  service: Service;
  reservations: IReservation[];
  removeReservation: (r: IReservation) => void;
};

const Bookings = ({ service, removeReservation }: Props) => {
  const parsedDate = parse(service.date, "yyyy-MM-dd", new Date());
  const formattedDate = format(parsedDate, "dd-MM-yyyy");
  const { reservations } = useReservations();
  const totalPrice = reservations.reduce(
    (acc, el) => (acc += el.service.price),
    0
  );
  const router = useRouter();

  const handleCheckoutButtonClick = () => {
    router.push(`/checkout`);
  };
  return (
    <div className="w-full flex flex-col gap-2 ">
      <Title text="Rezervasyonlar" />
      {reservations.length ? (
        <div className="w-full bg-blue-300/50 p-2 ">
          <p className="w-full text-right text-slate-700 font-semibold">
            Toplam : {totalPrice}TL
          </p>
        </div>
      ) : null}
      {reservations?.map((p) => (
        <div className="" key={p.seat}>
          <div className="max-w-full bg-white flex flex-col shadow-md hover:shadow-lg transition">
            <div className="flex items-center justify-between bg-gray-100 p-2">
              <p className="text-sm md:text-md ml-2 font-semibold text-slate-600">
                {formattedDate}
              </p>
              <p className="text-sm md:text-md ml-2 font-semibold text-slate-600">
                {p.name}
              </p>
            </div>

            <div className="flex items-center justify-between mx-4 ">
              <div className="flex flex-row place-items-center p-2 gap-2">
                <PiBusLight
                  size={20}
                  className="font-extralight text-slate-500 "
                />
                <div className="flex flex-col">
                  <p className="text-sm font-bold">{p.service.company}</p>
                  <p className="text-xs text-gray-500">
                    {p.service.serviceCode}
                  </p>
                </div>
              </div>

              <div className="flex flex-col p-2">
                <p className="text-sm  font-bold">{p.service.departure}</p>
                <p className="text-slate-500 font-semibold text-sm ">
                  {capitalizeFirstLetter(service.from)}
                </p>
              </div>
              <div className="flex flex-col p-2">
                <p className="text-sm  font-bold">{p.service.arrival}</p>
                <p className="text-slate-500 font-semibold text-sm ">
                  {capitalizeFirstLetter(service.to)}
                </p>
              </div>
            </div>
            <div className=" bg-gray-100 flex flex-row flex-wrap md:flex-nowrap justify-end items-baseline">
              <div className="flex flex-row items-center gap-2 py-1 mr-4">
                <div className="text-sm mx-2 flex flex-col">
                  <p className="font-bold">{p.service.price}TL</p>
                </div>
                <Button
                  variant={"secondary"}
                  size={"small"}
                  onClick={() => {
                    const r = reservations?.filter((r) => r.seat != p.seat);
                    removeReservation(p);
                  }}
                >
                  Iptal
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
      {reservations.length ? (
        <Button onClick={handleCheckoutButtonClick}>Odeme Sayfasina Git</Button>
      ) : null}
      <Button variant={"secondary"} onClick={() => router.push("/search")}>
        Arama Sayfasina Git
      </Button>
    </div>
  );
};

export default Bookings;
