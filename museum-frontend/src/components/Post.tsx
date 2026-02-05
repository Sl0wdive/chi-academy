import React, { useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { Exhibit } from "../api/exhibitActions";
import { deleteExhibit } from "../api/exhibitActions";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import CommentStripe from "./CommentStripe";

interface Props {
  post: Exhibit;
}

const Post: React.FC<Props> = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const currentUser = useSelector((state: RootState) => state.user.user);

  const isOwner = currentUser?.id === post.user.id;

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;
    await deleteExhibit(post.id);
    window.location.reload();
  };

  return (
    <Box mb={3} p={2} border="1px solid #ddd" borderRadius={2}>
      <img
        src={`https://playground.zenberry.one${post.imageUrl}`}
        alt=""
        style={{ width: "100%", borderRadius: 8 }}
        onError={({ currentTarget }) => {
          currentTarget.src = "/img/DefaultPost.png";
        }}
      />

      <Typography
        mt={1}
        sx={{
          wordBreak: "break-word",
          whiteSpace: "pre-wrap",
        }}
      >
        {post.description}
      </Typography>

      <Typography variant="caption" color="text.secondary">
        @{post.user.username}
      </Typography>

      <Stack direction="row" spacing={2} mt={2}>
        <Button size="small" onClick={() => setShowComments((prev) => !prev)}>
          Comments ({post.commentCount})
        </Button>

        {isOwner && (
          <Button size="small" color="error" onClick={handleDelete}>
            Delete
          </Button>
        )}
      </Stack>

      {showComments && <CommentStripe exhibitId={post.id} />}
    </Box>
  );
};

export default Post;
