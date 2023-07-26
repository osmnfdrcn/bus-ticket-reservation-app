import { IReservation } from "@/types";
import { create } from "zustand";

interface ReservationStore {
  reservations: IReservation[];
  addReservation: (reservation: IReservation) => void;
  removeReservation: (reservation: IReservation) => void;
  reset: () => void;
}

const useReservations = create<ReservationStore>((set) => ({
  reservations: [],
  addReservation: (reservation: IReservation) =>
    set((state) => ({ reservations: [...state.reservations, reservation] })),
  removeReservation: (reservation: IReservation) =>
    set((state) => ({
      reservations: state.reservations.filter((r) => r !== reservation),
    })),
  reset: () => set({ reservations: [] }), // Reset the reservations to an empty array
}));

export default useReservations;
