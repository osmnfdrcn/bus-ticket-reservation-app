import prisma from "@/libs/prismadb";
import { parse, format } from "date-fns";

export interface IServiceParams {
  from?: string;
  to?: string;
  date?: string;
  id?: string;
}

export default async function getServices(params: IServiceParams) {
  const { from, to, date, id } = params;
  console.table(params);

  let formattedDate;
  if (date) {
    const parsedDate = parse(date, "dd/MM/yyyy", new Date());
    formattedDate = format(parsedDate, "yyyy-MM-dd");
  }

  let query: any = {};
  from ? (query.from = from) : null;
  to ? (query.to = to) : null;
  id ? (query.id = id) : null;
  date ? (query.date = formattedDate) : null;

  try {
    const services = await prisma.service.findMany({
      where: query,
    });
    return services;
  } catch (error) {
    console.log(error);
  }
}
