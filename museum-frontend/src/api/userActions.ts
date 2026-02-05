import axiosInstance from "./axiosInstance";

export interface LoginDTO {
  username: string;
  password: string;
}

export interface CreateUserDto {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
}

export const loginUser = async (data: LoginDTO): Promise<any> => {
  const res = await axiosInstance.post("/api/auth/login", data);
  return res.data;
};

export const registerUser = async (data: CreateUserDto): Promise<User> => {
  const res = await axiosInstance.post("/users/register", data);
  return res.data;
};

export const getUser = async (params: {
  id?: number;
  username?: string;
}): Promise<User> => {
  const res = await axiosInstance.get("/users", { params });
  return res.data;
};

export const getMyProfile = async (): Promise<User> => {
  const res = await axiosInstance.get("/users/my-profile");
  return res.data;
};
