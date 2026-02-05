import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { getAllExhibits } from "../api/exhibitActions";
import { Exhibit } from "../api/exhibitActions";
import Post from "../components/Post";
import Pagination from "../components/Paginaton";
import ControlBar from "../components/ControlBar";

const StripePage: React.FC = () => {
  const [posts, setPosts] = useState<Exhibit[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const res = await getAllExhibits(page, 10);
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
        {loading && <CircularProgress />}

        {!loading && posts.map((post) => <Post key={post.id} post={post} />)}

        <Pagination page={page} lastPage={lastPage} onChange={setPage} />
      </Box>
    </>
  );
};

export default StripePage;
