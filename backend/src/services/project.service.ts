import prisma from "../prisma/prisma";

export const createProject = async (
  userId: string,
  title: string,
  description: string,
) => {
  return await prisma.project.create({
    data: {
      title,
      description,
      userId,
    },
  });
};

export const createProjectWithId = async (
  id: string,
  userId: string,
  title: string,
  description: string,
) => {
  return await prisma.project.create({
    data: {
      id,
      title,
      description,
      userId,
    },
  });
};

export const getProjects = async (userId: string) => {
  return await prisma.project.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getProjectById = async (id: string, userId: string) => {
  return await prisma.project.findFirst({
    where: {
      id,
      userId,
    },
  });
};

export const updateProject = async (
  id: string,
  userId: string,
  title?: string,
  description?: string,
) => {
  const existingProject = await prisma.project.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!existingProject) {
    return null;
  }

  return await prisma.project.update({
    where: {
      id,
    },
    data: {
      title,
      description,
    },
  });
};

export const deleteProject = async (id: string, userId: string) => {
  const existingProject = await prisma.project.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!existingProject) {
    return false;
  }

  await prisma.project.delete({
    where: {
      id,
    },
  });

  return true;
};
