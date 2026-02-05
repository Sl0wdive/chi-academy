import axiosInstance from "./axiosInstance";

export interface CommentUser {
  id: number;
  username: string;
}

export interface Comment {
  id: number;
  text: string;
  user: CommentUser;
  createdAt: string;
}

export const addComment = async (
  exhibitId: number,
  text: string,
): Promise<Comment> => {
  const res = await axiosInstance.post(`/api/exhibits/${exhibitId}/comments`, {
    text,
  });

  return res.data;
};

export const getCommentsByExhibit = async (
  exhibitId: number,
): Promise<Comment[]> => {
  const res = await axiosInstance.get(`/api/exhibits/${exhibitId}/comments`);

  return res.data;
};

export const deleteComment = async (
  exhibitId: number,
  commentId: number,
): Promise<void> => {
  await axiosInstance.delete(
    `/api/exhibits/${exhibitId}/comments/${commentId}`,
  );
};
