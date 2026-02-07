import React, { useEffect, useState } from "react";
import { Alert, Box, CircularProgress, Snackbar } from "@mui/material";
import { getAllExhibits } from "../api/exhibitActions";
import { Exhibit } from "../api/exhibitActions";
import Post from "../components/Post";
import Pagination from "../components/Paginaton";
import ControlBar from "../components/ControlBar";
import { io, Socket } from "socket.io-client";

const StripePage: React.FC = () => {
  const [posts, setPosts] = useState<Exhibit[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [notifyOpen, setNotifyOpen] = useState(false);
  const [notifyText, setNotifyText] = useState("");

  const SOCKET_SERVER_URL = "https://playground.zenberry.one/notifications";

  useEffect(() => {
  const socket: Socket = io(
    SOCKET_SERVER_URL,
    {
      transports: ["websocket"],
      reconnection: true,
      reconnectionDelay: 1000,
    }
  );

  socket.on("connect", () => {
    console.log("Socket connected");
  });

  socket.on("newPost", (payload) => {
    const item = Array.isArray(payload) ? payload[0] : payload;

    setNotifyText(`New post from ${item.user}`);
    setNotifyOpen(true);
  });

  return () => {
    socket.disconnect();
  };
}, []);

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
