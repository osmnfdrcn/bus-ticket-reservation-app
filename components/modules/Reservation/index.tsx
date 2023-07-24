"use client";
import Input from "@/components/ui/input";
import Radio from "@/components/ui/radio";
import Title from "@/components/ui/title";
import { IUser } from "@/types";
import { Service } from "@prisma/client";
import { useState } from "react";
import Seat from "./Seat";
import Bookings from "./Bookings";

type Props = {
  service: Service;
  user: IUser;
};

function Reservation({ service, user }: Props) {
  const [currentPassenger, setCurrentPassenger] = useState<{
    name: string;
    gender: string;
  }>({ name: user.name!, gender: user.gender });
  const [reservations, setReservations] = useState<
    { name: string; gender: string; seat: number }[]
  >([]);

  //otobusun koltuk duzeni
  // 5li grid, 3n+3 nolu elemanin value'su yok, sadece value'su olan elemanlar ekrana yazdirilacak
  //1 2   3 4
  //5 6   7 8
  const specialIds = [3, 8, 13, 18, 23, 28, 33, 38, 43, 48]; //3n+3 nolu koltukar
  const busSeats: { id: number; value: number | null }[] = [];
  let valueToAdd = 1;
  for (let i = 1; i <= 50; i++) {
    if (specialIds.includes(i)) {
      busSeats.push({
        id: i,
        value: null,
      });
    } else {
      busSeats.push({
        id: i,
        value: valueToAdd,
      });
      valueToAdd++;
    }
  }

  // koltukta oturan varsa ve karsi cins ise oturdugu koltuk numarasini al, once 4'e sonra tkrar 2'ye gore moduna al sonuc tek ise koltuk numarasinin + 1'ine, cift ise -1'ine oturulamaz.
  const notBookableSeats: number[] = [];
  busSeats.map((s) => {
    const isSeatFree = findSeatGender(service?.fixedSeats!, +s.value!);
    if (isSeatFree && currentPassenger.gender !== isSeatFree.gender) {
      notBookableSeats.push(isSeatFree.seat);
      const mod = (isSeatFree.seat % 4) % 2;
      if (mod) {
        notBookableSeats.push(isSeatFree.seat + 1);
      } else {
        notBookableSeats.push(isSeatFree.seat - 1);
      }
    }
    if (isSeatFree) {
      notBookableSeats.push(isSeatFree.seat);
    }
  });
  reservations.map((r) => notBookableSeats.push(r.seat));

  // isCancelable: secilen koltuk tekrar tiklanirsa secim kaldirir.
  // kullanici en fazla 6 rezervasyon yapabilir.
  const handleSeatClick = (
    seatNumber: number,
    isCancelable: { name: string; gender: string; seat: number } | undefined
  ) => {
    if (reservations.length < 5) {
      if (isCancelable) {
        setReservations(reservations.filter((r) => r.seat !== seatNumber));
        return;
      }
      setReservations([
        ...reservations,
        {
          name: currentPassenger.name!,
          gender: currentPassenger.gender,
          seat: seatNumber,
        },
      ]);
      notBookableSeats.push(seatNumber);
      setCurrentPassenger({ name: "", gender: "" });
    }
  };

  return (
    <div className="w-3/4 md:w-2/3 mx-auto flex flex-col-reverse lg:flex-row-reverse justify-center  mt-[100px] lg:mt-[120px] py-2 lg:gap-6">
      <div className="w-full ">
        <Bookings
          reservations={reservations}
          setReservations={setReservations}
          service={service}
        />
      </div>

      <div className="w-full flex flex-col col-span-2 items-center justify-start gap-4 ">
        <div className="w-full  mb-[40px] lg:mb-[20px]">
          {reservations.length > 0 && reservations.length < 5 ? (
            //Yolcu Bilgleri
            <>
              <Title text="Yolcu Bilgileri" />
              <div className="flex flex-col justify-start items-center gap-2 ">
                <Input
                  type="text"
                  label="Isim Soyisim"
                  name={"name"}
                  value={currentPassenger.name}
                  onChange={(e) =>
                    setCurrentPassenger({
                      ...currentPassenger,
                      name: e.target.value,
                    })
                  }
                />
                <Radio
                  options={[
                    { label: "Erkek", value: "erkek", name: "erkek" },
                    { label: "Kadin", value: "kadin", name: "kadin" },
                  ]}
                  currentPassengerGender={currentPassenger.gender}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setCurrentPassenger({
                      ...currentPassenger,
                      gender: e.target.value,
                    });
                  }}
                />
              </div>
            </>
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
                const isCancelable = reservations.find(
                  (r) => r.seat === +seat?.value!
                );

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
                          !notBookable
                            ? handleSeatClick(+seat.value!, isCancelable)
                            : {};
                        }}
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>
            <div className="grid grid-cols-4 p-2 gap-2">
              <div className="flex flex-col items-center justify-center w-full">
                <div className="p-2 border-2 rounded-full  bg-blue-400 text-black" />
                <p className="text-xs font-light">Erkek Yolcu</p>
              </div>
              <div className="flex flex-col items-center justify-center w-full">
                <div className="p-2 border-2 rounded-full  bg-rose-400 text-black" />
                <p className="text-xs font-light">Kadin Yolcu</p>
              </div>
              <div className="flex flex-col items-center justify-center w-full">
                <div className="p-2 border-2 rounded-full text-xs font-light bg-white text-black" />
                <p className="text-xs font-light">Uygun</p>
              </div>
              <div className="flex flex-col items-center justify-center w-full">
                <div className="p-2 border-2 rounded-full text-xs font-light bg-black text-white" />
                <p className="text-xs font-light">Alinamaz</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Reservation;

function findSeatGender(array: string[], value: number) {
  if (!Array.isArray(array)) {
    return null;
  }
  for (const element of array) {
    const [seatNumber, gender] = element.split("-");
    const seat = parseInt(seatNumber);
    if (seat === value) {
      return {
        seat: seat,
        gender: gender,
      };
    }
  }
  return null;
}
