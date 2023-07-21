import prisma from "@/libs/prismadb";

export default async function getGenres() {
  try {
    const cities = await prisma.city.findMany();
    return cities;
  } catch (error: any) {
    // throw new Error(error);
  }
}
