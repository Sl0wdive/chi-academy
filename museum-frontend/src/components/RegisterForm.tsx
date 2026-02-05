import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { registerThunk } from "../store/slices/userSlice";
import { useNavigate, Link } from "react-router-dom";

interface RegisterValues {
  username: string;
  password: string;
}

const RegisterSchema = Yup.object({
  username: Yup.string()
    .min(4, "Minimum 4 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(4, "Minimum 4 characters")
    .required("Password is required"),
});

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.user);

  const handleSubmit = async (values: RegisterValues) => {
    try {
      await dispatch(registerThunk(values)).unwrap();
      navigate("/login");
    } catch (e) {
      console.error("Register failed", e);
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 400 }}>
      <Typography variant="h5" mb={3} textAlign="center">
        Register
      </Typography>

      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={RegisterSchema}
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
              Register
            </Button>

            <Typography variant="body2" mt={2} textAlign="center">
              Already have an account? <Link to="/login">Login</Link>
            </Typography>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default RegisterForm;
