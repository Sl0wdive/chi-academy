import { apiFetch } from './fetcher';

export interface LoginDTO {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    username: string;
  };
}

export interface LoginResponse {
  access_token: string;
  userId: number;
  userName: string;
}

export const loginUser = async (
  data: LoginDTO
): Promise<AuthResponse> => {
  const json = await apiFetch<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return {
    token: json.access_token,
    user: {
      id: json.userId,
      username: json.userName,
    },
  };
};

export const registerUser = (
  data: LoginDTO,
): Promise<User> =>
  apiFetch('/users/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const getMyProfile = (): Promise<User> =>
  apiFetch('/users/my-profile');
