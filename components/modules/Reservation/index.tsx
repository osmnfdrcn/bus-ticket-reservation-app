"use client";
import Title from "@/components/ui/title";
import { createBusSeats } from "@/helpers/createBusSeats";
import { findSeatGender } from "@/helpers/findSeatGender";
import useReservations from "@/hooks/useReservations";
import { IUser } from "@/types";
import { Service } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";
import Bookings from "./Bookings";
import PassengerInfo from "./PassengerInfo";
import Seat from "./Seat";
import SeatInfo from "./SeatInfo";
import Warning from "./Warning";

type Props = {
  service: Service;
  user: IUser;
};

function Reservation({ service, user }: Props) {
  const { reservations, addReservation, removeReservation } = useReservations();
  const [notBookableSeats, setNotBookableSeats] = useState<number[]>([]);
  const [currentPassenger, setCurrentPassenger] = useState<{
    name: string;
    gender: string;
  }>({ name: user?.name!, gender: user?.gender });

  // koltukta oturan varsa ve karsi cins ise oturdugu koltuk numarasini al, once 4'e sonra tekrar 2'ye gore moduna al sonuc tek ise koltuk numarasinin + 1'ine, cift ise -1'ine oturulamaz.
  //burasi daha sonra performans nedeni ile duzenlenmeli.
  const busSeats = useMemo(() => createBusSeats(), []);
  useEffect(() => {
    const newNotBookableSeats: number[] = [];
    busSeats.forEach((s) => {
      const isSeatFree = findSeatGender(service?.fixedSeats!, +s.value!);
      if (isSeatFree && currentPassenger.gender !== isSeatFree.gender) {
        newNotBookableSeats.push(isSeatFree.seat);
        const mod = (isSeatFree.seat % 4) % 2;
        mod
          ? newNotBookableSeats.push(isSeatFree.seat + 1)
          : newNotBookableSeats.push(isSeatFree.seat - 1);
      }
      isSeatFree ? newNotBookableSeats.push(isSeatFree.seat) : null;
    });
    reservations.forEach((r) => newNotBookableSeats.push(r.seat));
    setNotBookableSeats(newNotBookableSeats);
  }, [currentPassenger, reservations]);

  const handleSeatClick = (seatNumber: number) => {
    if (reservations.length < 5) {
      addReservation({
        name: currentPassenger.name!,
        gender: currentPassenger.gender,
        seat: seatNumber,
        service,
      });
      notBookableSeats.push(seatNumber);
      setCurrentPassenger({ name: "", gender: "" });
    }
  };

  return (
    <>
      {reservations.length === 5 ? <Warning /> : null}

      <div className="w-3/4 md:w-2/3 mx-auto flex flex-col-reverse lg:flex-row-reverse justify-center  mt-[100px] lg:mt-[120px] py-2 lg:gap-6">
        <div className="w-full ">
          <Bookings
            reservations={reservations}
            removeReservation={removeReservation}
            service={service}
          />
        </div>

        <div className="w-full flex flex-col col-span-2 items-center justify-start gap-4 ">
          {/* Yolcu Bilgleri */}
          <div className="w-full  mb-[40px] lg:mb-[20px]">
            {reservations.length > 0 && reservations.length < 5 ? (
              <PassengerInfo
                currentPassenger={currentPassenger}
                setCurrentPassenger={setCurrentPassenger}
              />
            ) : null}
          </div>

          {/* Koltuk secimi */}
          {reservations.length < 5 &&
          currentPassenger.gender &&
          currentPassenger.name ? (
            <div className="w-full flex flex-col items-center justify-center gap-6 bg-white mr-2 mb-[40px]">
              <Title text="Koltuk Secimi" />

              <div className="mx-auto p-6 grid grid-cols-5 gap-2 justify-center text-center w-full -m-[30px]">
                {busSeats.map((seat) => {
                  const isInFixedSeats = findSeatGender(
                    service?.fixedSeats!,
                    +seat.value!
                  ); //{seat:23, gender:"kadin"}
                  // on tanimli olarak oturulamaz durumdaki koltiklardan ise koltuk numarasi ve oturan kisinin cinsiyeti
                  const notBookable = notBookableSeats.includes(+seat.value!);

                  return (
                    <div key={seat.id}>
                      {(seat.value &&
                        currentPassenger.gender &&
                        currentPassenger.name) ||
                      !reservations.length ? ( //
                        <Seat
                          isInFixedSeats={isInFixedSeats!} //on tanimli dolu koltuklardan mi
                          value={seat.value!} // koltuk no
                          isBookable={!notBookable}
                          onClick={() => {
                            !notBookable ? handleSeatClick(+seat.value!) : {};
                          }}
                        />
                      ) : null}
                    </div>
                  );
                })}
              </div>
              <SeatInfo />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Reservation;
