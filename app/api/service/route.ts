import prisma from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { parse, format } from "date-fns";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const date = searchParams.get("date");

  let formattedDate;
  if (date) {
    const parsedDate = parse(date, "dd/MM/yyyy", new Date());
    formattedDate = format(parsedDate, "yyyy-MM-dd");
  }

  let query: any = {};
  from ? (query.from = from) : null;
  to ? (query.to = to) : null;
  date ? (query.date = formattedDate) : null;
  console.log({ query });

  try {
    const services = await prisma.service.findMany({
      where: query,
    });
    return NextResponse.json(services);
  } catch (error) {
    console.log(error);
  }
}
