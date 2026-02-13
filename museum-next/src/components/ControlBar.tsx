'use client';

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import Link from "next/link";
import { useRouter} from "next/navigation";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { logout } from "../store/slices/userSlice";
import { useState } from "react";
import NewPost from "@/src/app/new-post/page";

const ControlBar: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  const currentUser = useSelector((state: RootState) => state.user.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated,
  );

  const OnClickLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      dispatch(logout());
      localStorage.removeItem("token");
      router.push("/login");
    }
  };

  const isHome = location.pathname === "/home";

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        borderBottom: "1px solid #e0e0e0",
        mb: 3,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
        {isAuthenticated ? (
          <>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setModalOpen(true)}
            >
              Add Post
            </Button>

            <Link href={isHome ? "/" : "/home"}>
              <Button variant="outlined">
                {isHome ? "All Posts" : "My Posts"}
              </Button>
            </Link>
          </>
        ) : (
          <Link href="/">
            <Typography variant="h6">Museum App</Typography>
          </Link>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flex: 1,
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        {isAuthenticated && (
          <Typography
            variant="h6"
            sx={{
              color: "#333",
              fontWeight: "bold",
            }}
          >
            {currentUser?.username}
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        {isAuthenticated ? (
          <Button
            onClick={OnClickLogout}
            variant="contained"
            color="secondary"
            sx={{
              backgroundColor: "#dc3545",
              "&:hover": { backgroundColor: "#c82333" },
            }}
          >
            Logout
          </Button>
        ) : (
          <>
            <Link href="/login">
              <Button variant="outlined">Log in</Button>
            </Link>
            <Link href="/register">
              <Button variant="contained">Sign up</Button>
            </Link>
          </>
        )}
      </Box>
      <NewPost open={modalOpen} onClose={() => setModalOpen(false)} />
    </Box>
  );
};

export default ControlBar;
