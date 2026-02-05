import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { getMyExhibits } from "../api/exhibitActions";
import { Exhibit } from "../api/exhibitActions";
import Post from "../components/Post";
import Pagination from "../components/Paginaton";
import ControlBar from "../components/ControlBar";

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Exhibit[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const res = await getMyExhibits(page, 10);
        setPosts(res.data);
        setLastPage(res.lastPage);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [page]);

  return (
    <>
      <ControlBar />
      <Box maxWidth="600px" mx="auto" mt={4}>
        {loading && (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        )}

        {!loading && posts.length === 0 && (
          <Box textAlign="center" py={4}>
            <Typography variant="h5" color="textSecondary" gutterBottom>
              No posts found
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Start by creating your first post!
            </Typography>
          </Box>
        )}

        {!loading && posts.length > 0 && (
          <>
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
            {lastPage > 1 && (
              <Pagination page={page} lastPage={lastPage} onChange={setPage} />
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default HomePage;
