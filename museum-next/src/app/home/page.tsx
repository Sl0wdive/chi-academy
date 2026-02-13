"use client";

import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { getMyExhibits, Exhibit } from "@/src/api/exhibitActions";
import Post from "@/src/components/Post";
import Pagination from "@/src/components/Paginaton";
import ControlBar from "@/src/components/ControlBar";
import { useSearchParams } from "next/navigation";

export default function HomePage() {
  const searchParams = useSearchParams();
  const pageNum = parseInt(searchParams.get("page") ?? "1", 10) || 1;

  const [posts, setPosts] = useState<Exhibit[]>([]);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getMyExhibits(pageNum, 10);
        setPosts(res.data);
        setLastPage(res.lastPage);
      } catch {
        setPosts([]);
        setLastPage(1);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [pageNum]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <ControlBar />
      <Box maxWidth="600px" mx="auto" mt={4}>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
        <Pagination page={pageNum} lastPage={lastPage} />
      </Box>
    </>
  );
}
