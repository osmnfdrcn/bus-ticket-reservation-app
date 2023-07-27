import { Service } from "@prisma/client";
import { findSeatGender } from "./findSeatGender";

export const createNotBookableSeats = (
  busSeats: any,
  fixedSeats: any,
  currentPassenger: any
) => {
  const notBookableSeats: number[] = [];
  busSeats.map((s: any) => {
    const isSeatFree = findSeatGender(fixedSeats!, +s.value!);
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
    return notBookableSeats;
  });
};
