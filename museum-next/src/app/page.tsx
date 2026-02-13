import React from "react";
import { Box } from "@mui/material";
import { getAllExhibits, Exhibit } from "../api/exhibitActions";
import Post from "../components/Post";
import Pagination from "../components/Pagination";
import ControlBar from "../components/ControlBar";

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function StripePage({ searchParams }: Props) {
  const params = await searchParams;

  const pageNum =
    parseInt(
      Array.isArray(params?.page)
        ? params.page[0] ?? "1"
        : params?.page ?? "1",
      10,
    ) || 1;

  let posts: Exhibit[] = [];
  let lastPage = 1;

  try {
    const res = await getAllExhibits(pageNum, 10);
    posts = res.data;
    lastPage = res.lastPage;
  } catch {
    posts = [];
    lastPage = 1;
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
