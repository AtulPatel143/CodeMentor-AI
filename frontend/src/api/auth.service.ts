import api from "./client";

import type { LoginFormData } from "../schemas/login.schema";
import type { SignupFormData } from "../schemas/signup.schema";

export const loginUser = async (data: LoginFormData) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const signupUser = async (data: SignupFormData) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};
