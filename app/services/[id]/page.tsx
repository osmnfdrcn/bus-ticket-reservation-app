import NoResult from "@/components/modules/NoResult";
import Reservation from "@/components/modules/Reservation";
import getCurrentUser from "@/helpers/getCurrentUser";
import getServices from "@/helpers/getServices";
import { redirect } from "next/navigation";
import prisma from "@/libs/prismadb";

type Props = {
  params: {
    id: string;
  };
};

export async function generateStaticParams() {
  const services = await prisma.service.findMany();
  return services.map((s) => ({ id: s.id }));
}

async function Service({ params: { id } }: Props) {
  const user = await getCurrentUser();
  if (!user) redirect("/auth");

  const data = await getServices({ id });
  if (!data?.length) {
    return (
      <div className="mt-[20%]">
        <NoResult title="Aradiginiz kayit bulunamadi!" />
      </div>
    );
  }
  const service = data?.[0];

  return <Reservation service={service} user={user!} />;
}

export default Service;
