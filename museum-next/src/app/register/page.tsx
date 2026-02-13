"use client";

import React from "react";
import { Box, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { useRouter } from "next/navigation";
import RegisterForm from "@/src/components/RegisterForm";

const RegisterPage: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  React.useEffect(() => {
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
        <RegisterForm />
      </Paper>
    </Box>
  );
};

export default RegisterPage;
