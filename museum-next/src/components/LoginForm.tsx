"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { loginThunk, fetchMeThunk } from "../store/slices/userSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface LoginValues {
  username: string;
  password: string;
}

const LoginSchema = Yup.object({
  username: Yup.string().min(4).required("Username is required"),
  password: Yup.string().min(4).required("Password is required"),
});

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading } = useSelector((state: RootState) => state.user);

  const handleSubmit = async (values: LoginValues) => {
    try {
      await dispatch(loginThunk(values)).unwrap();
      await dispatch(fetchMeThunk());
      router.push("/");
    } catch (e) {
      console.error("Login failed", e);
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 400 }}>
      <Typography variant="h5" mb={3} textAlign="center">
        Login
      </Typography>

      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              name="username"
              as={TextField}
              label="Username"
              fullWidth
              margin="normal"
              error={touched.username && !!errors.username}
              helperText={<ErrorMessage name="username" />}
            />

            <Field
              name="password"
              as={TextField}
              type="password"
              label="Password"
              fullWidth
              margin="normal"
              error={touched.password && !!errors.password}
              helperText={<ErrorMessage name="password" />}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
            >
              Login
            </Button>

            <Typography variant="body2" mt={2} textAlign="center">
              Don&apos;t have an account?{" "}
              <Link href="/register">Register</Link>
            </Typography>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default LoginForm;
