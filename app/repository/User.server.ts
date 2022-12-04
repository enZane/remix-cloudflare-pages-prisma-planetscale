import prismaClient from "~/services/prisma.server";

export const findOrCreateUser = async ({
  email,
  name,
  password,
}: {
  email: string;
  name: string;
  password: string;
}) => {
  const existingUser = await prismaClient.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    return existingUser;
  }
  return await prismaClient.user.create({
    data: {
      email,
      name,
      password,
    },
  });
};
