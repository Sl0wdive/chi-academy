import React, { useCallback, useEffect, useState } from "react";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import { getMyExhibits } from "../api/exhibitActions";
import { Exhibit } from "../api/exhibitActions";
import Post from "../components/Post";
import Pagination from "../components/Pagination";
import ControlBar from "../components/ControlBar";

const PAGINATION_AMOUNT = 10;

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Exhibit[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await getMyExhibits(page, PAGINATION_AMOUNT);
      setPosts(res.data);
      setLastPage(res.lastPage);
    } catch (err: any) {
      setError(err?.message || "Failed to load posts");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return (
    <>
      <ControlBar />
      <Box maxWidth="600px" mx="auto" mt={4}>
        {loading && (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Box mb={2}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}

        {!loading && !error && posts.length === 0 && (
          <Box textAlign="center" py={4}>
            <Typography variant="h5" color="textSecondary" gutterBottom>
              No posts found
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Start by creating your first post!
            </Typography>
          </Box>
        )}

        {!loading && !error && posts.length > 0 && (
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
