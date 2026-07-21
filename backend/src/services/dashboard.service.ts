import prisma from "../config/prisma";

export const getDashboardStats = async (userId: string) => {
  const totalProjects = await prisma.project.count({
    where: {
      userId,
    },
  });

  const totalTasks = await prisma.task.count({
    where: {
      project: {
        userId,
      },
    },
  });

  const todoTasks = await prisma.task.count({
    where: {
      status: "TODO",
      project: {
        userId,
      },
    },
  });

  const inProgressTasks = await prisma.task.count({
    where: {
      status: "IN_PROGRESS",
      project: {
        userId,
      },
    },
  });

  const completedTasks = await prisma.task.count({
    where: {
      status: "DONE",
      project: {
        userId,
      },
    },
  });

  const pendingTasks = todoTasks + inProgressTasks;

  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return {
    totalProjects,
    totalTasks,
    todoTasks,
    inProgressTasks,
    completedTasks,
    pendingTasks,
    progress,
  };
};
