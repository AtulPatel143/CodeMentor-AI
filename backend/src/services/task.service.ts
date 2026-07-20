// import prisma from "../prisma/prisma";
// import prisma from "../config/prisma";

// export const createTask = async (
//   title: string,
//   description: string | undefined,
//   projectId: string,
// ) => {
//   return await prisma.task.create({
//     data: {
//       title,
//       description,
//       projectId,
//     },
//   });
// };

// export const createTask = async (
//   title: string,
//   description: string,
//   projectId: string,
//   userId: string,
// ) => {
//   return {
//     success: true,
//     message:
//       "Task creation is wired up and ready once Prisma client generation succeeds",
//     data: {
//       title,
//       description,
//       projectId,
//       userId,
//     },
//   };
// };

// export const getTasks = async (userId: string) => {
//   return {
//     success: true,
//     message:
//       "Task listing is wired up and ready once Prisma client generation succeeds",
//     data: [],
//     userId,
//   };
// };

import prisma from "../config/prisma";

export const createTask = async (
  title: string,
  description: string | undefined,
  projectId: string
) => {
  return await prisma.task.create({
    data: {
      title,
      description,
      projectId,
    },
  });
};