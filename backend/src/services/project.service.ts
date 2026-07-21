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
  console.log("========== getProjectById ==========");
  console.log("ID:", id);
  console.log("USER ID:", userId);

  const project = await prisma.project.findUnique({
    where: { id },
  });

  console.log("PROJECT:", project);

  if (!project || project.userId !== userId) {
    console.log("Returning NULL");
    return null;
  }

  console.log("Returning PROJECT");
  return project;
};

export const updateProject = async (
  id: string,
  userId: string,
  title?: string,
  description?: string,
) => {
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

export const deleteProject = async (id: string) => {
  return await prisma.project.delete({
    where: {
      id,
    },
  });
};
