import prisma from "../config/prisma";

export const createProject = async (
  title: string,
  description: string,
  userId: string,
) => {
  return await prisma.project.create({
    data: {
      title,
      description,
      userId,
    },
  });
};
