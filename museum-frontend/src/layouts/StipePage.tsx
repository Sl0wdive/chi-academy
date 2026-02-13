import React, { useEffect, useState, useRef, useCallback } from "react";
import { Alert, Box, CircularProgress, Snackbar } from "@mui/material";
import { getAllExhibits } from "../api/exhibitActions";
import { Exhibit } from "../api/exhibitActions";
import Post from "../components/Post";
import Pagination from "../components/Pagination";
import ControlBar from "../components/ControlBar";
import { io, Socket } from "socket.io-client";

interface NewPostNotification {
  id: number;
  user: string;
  message: string;
}

const SOCKET_SERVER_URL = "https://playground.zenberry.one/notifications";
const PAGINATION_AMOUNT = 10;

const StripePage: React.FC = () => {
  const [posts, setPosts] = useState<Exhibit[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [notifyOpen, setNotifyOpen] = useState(false);
  const [notifyText, setNotifyText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionDelay: 1000,
    });

    const socket = socketRef.current;

    if (process.env.NODE_ENV === "development") {
      socket.on("connect", () => {
        console.log("Socket connected");
      });
    }

    const handleNewPost = (
      payload: NewPostNotification | NewPostNotification[],
    ) => {
      const item = Array.isArray(payload) ? payload[0] : payload;
      setNotifyText(`New post from ${item.user}`);
      setNotifyOpen(true);
    };

    socket.on("newPost", handleNewPost);

    return () => {
      socketRef.current?.off("newPost", handleNewPost);
      socketRef.current?.disconnect();
    };
  }, []);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await getAllExhibits(page, PAGINATION_AMOUNT);
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
        {loading && <CircularProgress />}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {!loading &&
          !error &&
          posts.map((post) => <Post key={post.id} post={post} />)}

        {!loading && !error && (
          <Pagination page={page} lastPage={lastPage} onChange={setPage} />
        )}
      </Box>

      <Snackbar
        open={notifyOpen}
        autoHideDuration={4000}
        onClose={() => setNotifyOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity="info"
          variant="filled"
          onClose={() => setNotifyOpen(false)}
        >
          🆕 {notifyText}
        </Alert>
      </Snackbar>
    </>
  );
};

export default StripePage;
