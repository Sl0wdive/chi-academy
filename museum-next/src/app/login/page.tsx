"use client";

import React, { useEffect } from "react";
import { Box, Paper } from "@mui/material";
import LoginForm from "@/src/components/LoginForm";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper sx={{ p: 4 }}>
        <LoginForm />
      </Paper>
    </Box>
  );
};

export default LoginPage;
