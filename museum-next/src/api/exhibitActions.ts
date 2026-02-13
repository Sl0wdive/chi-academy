import { apiFetch } from './fetcher';

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

export const createExhibit = async (data: {
  description: string;
  image?: File;
}): Promise<Exhibit> => {
  const formData = new FormData();
  formData.append('description', data.description);

  if (data.image) {
    formData.append('image', data.image);
  }

  return apiFetch('/api/exhibits', {
    method: 'POST',
    body: formData,
  });
};

export const getAllExhibits = (
  page = 1,
  limit = 10,
): Promise<PaginatedExhibitsResponse> =>
  apiFetch(`/api/exhibits?page=${page}&limit=${limit}`, {
    cache: 'no-store',
  });

export const getExhibitById = (id: number): Promise<Exhibit> =>
  apiFetch(`/api/exhibits/post/${id}`);

export const getMyExhibits = (
  page = 1,
  limit = 10,
): Promise<PaginatedExhibitsResponse> =>
  apiFetch(`/api/exhibits/my-posts?page=${page}&limit=${limit}`);

export const deleteExhibit = (id: number): Promise<void> =>
  apiFetch(`/api/exhibits/${id}`, { method: 'DELETE' });
