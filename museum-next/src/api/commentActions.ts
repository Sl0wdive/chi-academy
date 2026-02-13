import { apiFetch } from './fetcher';

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

export const getCommentsByExhibit = (
  exhibitId: number,
): Promise<Comment[]> =>
  apiFetch(`/api/exhibits/${exhibitId}/comments`);

export const addComment = (
  exhibitId: number,
  text: string,
): Promise<Comment> =>
  apiFetch(`/api/exhibits/${exhibitId}/comments`, {
    method: 'POST',
    body: JSON.stringify({ text }),
  });

export const deleteComment = (
  exhibitId: number,
  commentId: number,
): Promise<void> =>
  apiFetch(`/api/exhibits/${exhibitId}/comments/${commentId}`, {
    method: 'DELETE',
  });
