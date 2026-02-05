import React, { useEffect, useState } from "react";
import { Box, CircularProgress, TextField, Button } from "@mui/material";
import {
  addComment,
  deleteComment,
  getCommentsByExhibit,
} from "../api/commentActions";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface CommentType {
  id: number;
  text: string;
  createdAt: string;
  user: {
    id: number;
    username: string;
  };
}

const CommentStripe: React.FC<{ exhibitId: number }> = ({ exhibitId }) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated,
  );

  useEffect(() => {
    const loadComments = async () => {
      setLoading(true);
      const res = await getCommentsByExhibit(exhibitId);
      setComments(res);
      setLoading(false);
    };

    loadComments();
  }, [exhibitId]);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    const newComment = await addComment(exhibitId, text);
    setComments((prev) => [...prev, newComment]);
    setText("");
  };

  const handleDelete = async (commentId: number) => {
    await deleteComment(exhibitId, commentId);
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  };

  if (loading) return <CircularProgress size={20} />;

  return (
    <Box mt={2} pl={2} borderLeft="2px solid #eee">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} onDelete={handleDelete} />
      ))}

      {isAuthenticated && (
        <Box mt={2}>
          <TextField
            fullWidth
            size="small"
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <Button
            size="small"
            sx={{ mt: 1 }}
            variant="contained"
            onClick={handleSubmit}
          >
            Send
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CommentStripe;
