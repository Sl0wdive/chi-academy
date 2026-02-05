import React, { useRef, ChangeEvent } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  CircularProgress,
  Alert,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { createExhibit } from "../api/exhibitActions";

interface NewPostProps {
  open: boolean;
  onClose: () => void;
}

interface FormValues {
  description: string;
  image: File | null;
}

const validationSchema = Yup.object({
  description: Yup.string()
    .max(500, "Maximum 500 characters")
    .required("Please enter a description"),
  image: Yup.mixed()
    .test(
      "fileSize",
      "Image size should be less than 6MB",
      (value) =>
        !value || (value instanceof File && value.size <= 6 * 1024 * 1024),
    )
    .test(
      "fileType",
      "Unsupported file type",
      (value) =>
        !value || (value instanceof File && value.type.startsWith("image/")),
    ),
});

const NewPost: React.FC<NewPostProps> = ({ open, onClose }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initialValues: FormValues = {
    description: "",
    image: null,
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<FormValues>,
  ) => {
    try {
      await createExhibit({
        description: values.description,
        image: values.image || undefined,
      });
      resetForm();
      onClose();
    } catch (err: any) {
      setFieldError("description", err.message || "Failed to create post");
    } finally {
      setSubmitting(false);
    }
  };

  const handleTriggerFileInput = (setFieldValue: any) => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    setFieldValue: any,
  ) => {
    const file = event.target.files?.[0] || null;
    setFieldValue("image", file);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: "500px" },
          maxWidth: "500px",
          maxHeight: "90vh",
          overflow: "auto",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h5" component="h2">
            Create New Post
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, isSubmitting, setFieldValue }) => (
            <Form noValidate>
              <Box sx={{ mb: 3 }}>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e, setFieldValue)}
                  disabled={isSubmitting}
                />

                {values.image ? (
                  <Box sx={{ position: "relative" }}>
                    <Avatar
                      src={URL.createObjectURL(values.image)}
                      variant="rounded"
                      sx={{
                        width: "100%",
                        height: 200,
                        objectFit: "cover",
                        mb: 1,
                      }}
                    />
                    <IconButton
                      onClick={() => setFieldValue("image", null)}
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        bgcolor: "rgba(0,0,0,0.5)",
                        color: "white",
                        "&:hover": {
                          bgcolor: "rgba(0,0,0,0.7)",
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ) : (
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => handleTriggerFileInput(setFieldValue)}
                    disabled={isSubmitting}
                    startIcon={<ImageIcon />}
                    sx={{
                      py: 2,
                      height: 200,
                      borderStyle: "dashed",
                      borderWidth: 2,
                      "&:hover": {
                        borderWidth: 2,
                      },
                    }}
                  >
                    Click to upload image
                  </Button>
                )}

                {errors.image && touched.image && (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    {errors.image}
                  </Alert>
                )}
              </Box>

              <Field name="description">
                {({ field }: any) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Post Description"
                    margin="normal"
                    disabled={isSubmitting}
                    multiline
                    rows={3}
                    inputProps={{ maxLength: 500 }}
                    helperText={`${field.value.length}/500 ${
                      errors.description && touched.description
                        ? ` - ${errors.description}`
                        : ""
                    }`}
                    error={Boolean(errors.description && touched.description)}
                  />
                )}
              </Field>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                  mt: 3,
                }}
              >
                <Button
                  onClick={onClose}
                  variant="outlined"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  startIcon={isSubmitting && <CircularProgress size={20} />}
                >
                  {isSubmitting ? "Creating..." : "Create Post"}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default NewPost;