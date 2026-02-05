import axiosInstance from "./axiosInstance";

export interface ExhibitUser {
  id: number;
  username: string;
}

export interface Exhibit {
  id: number;
  imageUrl: string;
  description: string;
  user: ExhibitUser;
  commentCount: number;
  createdAt: string;
}

export interface PaginatedExhibitsResponse {
  data: Exhibit[];
  total: number;
  page: number;
  lastPage: number;
}

export const getAllExhibits = async (
  page = 1,
  limit = 10,
): Promise<PaginatedExhibitsResponse> => {
  const res = await axiosInstance.get("/api/exhibits", {
    params: { page, limit },
  });

  return {
    ...res.data,
    page: Number(res.data.page),
  };
};

export const getExhibitById = async (id: number): Promise<Exhibit> => {
  const res = await axiosInstance.get(`/api/exhibits/post/${id}`);
  return res.data;
};

export const getMyExhibits = async (
  page = 1,
  limit = 10,
): Promise<PaginatedExhibitsResponse> => {
  const res = await axiosInstance.get("/api/exhibits/my-posts", {
    params: { page, limit },
  });

  return {
    ...res.data,
    page: Number(res.data.page),
  };
};

export const createExhibit = async (data: {
  description: string;
  image?: File;
}): Promise<Exhibit> => {
  const formData = new FormData();
  formData.append("description", data.description);

  if (data.image) {
    formData.append("image", data.image);
  }

  const res = await axiosInstance.post("/api/exhibits", formData);
  return res.data;
};

export const deleteExhibit = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/api/exhibits/${id}`);
};
