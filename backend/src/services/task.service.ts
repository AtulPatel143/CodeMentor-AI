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
  page: number = 1,
  limit: number = 10,
) => {
  const skip = (page - 1) * limit;
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
    skip,
    take: limit,

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const updateTask = async (
  taskId: string,
  userId: string,
  title: string,
  description: string,
  status: string,
) => {
  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
    include: {
      project: true,
    },
  });

  if (!task || task.project.userId !== userId) {
    return null;
  }

  return await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      title,
      description,
      status,
    },
  });
};

export const deleteTask = async (taskId: string, userId: string) => {
  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
    include: {
      project: true,
    },
  });

  if (!task || task.project.userId !== userId) {
    return null;
  }

  await prisma.task.delete({
    where: {
      id: taskId,
    },
  });

  return true;
};
