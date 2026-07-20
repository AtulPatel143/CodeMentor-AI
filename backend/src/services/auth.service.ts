import prisma from "../prisma/prisma";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";
import { User } from "@prisma/client";
import { AppError } from "../utils/AppError";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

// Helper Function (DRY Principle)
const safeUser = (user: User) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  createdAt: user.createdAt,
});

export const register = async ({
  name,
  email,
  password,
}: RegisterData) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new AppError("Email already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return {
    success: true,
    message: "User registered successfully",
    user: safeUser(user),
  };
};

export const login = async ({
  email,
  password,
}: LoginData) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = generateToken(user.id);

  return {
    success: true,
    message: "Login successful",
    token,
    user: safeUser(user),
  };
};

export const getProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
  throw new AppError("User not found", 404);
}

  return {
    success: true,
    user: safeUser(user),
  };
};