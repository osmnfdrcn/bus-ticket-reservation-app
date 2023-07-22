import prisma from "@/libs/prismadb";
import { Service } from "@prisma/client";

export default async function getServices(url: string) {
  try {
    const data = await fetch(url);
    const trips: Service[] = await data.json();
    return trips;
  } catch (error: any) {
    // throw new Error(error);
  }
}
