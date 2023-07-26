import { Service, User } from "@prisma/client";

export type IUser = Omit<User, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

export interface IReservation {
  name: string;
  gender: string;
  seat: number;
  price: number;
  from: string;
  to: string;
  company: string;
}
