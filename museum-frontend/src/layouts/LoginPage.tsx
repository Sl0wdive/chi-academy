import React from "react";
import { Box, Paper } from "@mui/material";
import LoginForm from "../components/LoginForm";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Navigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
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