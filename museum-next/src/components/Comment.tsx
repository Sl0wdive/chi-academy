import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Comment: React.FC<{
  comment: {
    id: number;
    text: string;
    createdAt: string;
    user: { username: string; id: number };
  };
  onDelete: (commentId: number) => void;
}> = ({ comment, onDelete }) => {
  const currentUser = useSelector((state: RootState) => state.user.user);

  const isAuthor = currentUser?.id === comment.user.id;
  return (
    <Box
      sx={{
        p: 1,
        mb: 1,
        borderBottom: "1px solid #eee",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography variant="subtitle2">
          {comment.user.username} {" "}
          {new Date(comment.createdAt).toLocaleString()}
        </Typography>
        <Typography variant="body2">{comment.text}</Typography>
      </Box>

      {isAuthor && (
        <IconButton
          size="small"
          color="error"
          onClick={() => onDelete(comment.id)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
};

export default Comment;
