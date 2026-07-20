import { z } from "zod";

export const createProjectSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100),

  description: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .max(1000),
});

export const updateProjectSchema = z.object({
  title: z.string().min(3).max(100).optional(),

  description: z
    .string()
    .min(5)
    .max(1000)
    .optional(),
});