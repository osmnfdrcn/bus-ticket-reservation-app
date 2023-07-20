import prisma from "@/libs/prismadb";

export const isEmailExists = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return !!user?.email;
};
