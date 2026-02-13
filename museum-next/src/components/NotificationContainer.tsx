"use client";

import { useEffect, useState } from "react";
import { useSocket } from "@/src/providers/SocketProvider";
import NewPostNotification from "./NewPostNotification";

export default function PostNotificationsContainer() {
  const socket = useSocket();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!socket) return;

    const handleNewPost = (data: { message: string; user: string }) => {
      setUsername(data.user);
      setOpen(true);
    };

    socket.on("newPost", handleNewPost);

    return () => {
      socket.off("newPost", handleNewPost);
    };
  }, [socket]);

  const handleClose = () => setOpen(false);

  return <NewPostNotification open={open} onClose={handleClose} username={username} />;
}
