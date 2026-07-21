import prisma from "../config/prisma";

export const createTask = async (
  title: string,
  description: string | undefined,
  projectId: string,
) => {
  return await prisma.task.create({
    data: {
      title,
      description,
      projectId,
    },
  });
};

export const getTasksByProject = async (
  projectId: string,
  status?: string,
  search?: string,
) => {
  return await prisma.task.findMany({
    where: {
      projectId,

      ...(status && { status }),

      ...(search && {
        title: {
          contains: search,
          mode: "insensitive",
        },
      }),
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};
