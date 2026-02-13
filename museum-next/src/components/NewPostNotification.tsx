"use client";

import { Snackbar, Alert } from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  username: string;
}

const NewPostNotification: React.FC<Props> = ({
  open,
  onClose,
  username,
}) => (
  <Snackbar
    open={open}
    autoHideDuration={4000}
    onClose={onClose}
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
  >
    <Alert onClose={onClose} severity="info" variant="filled">
      New post from <b>{username}</b>
    </Alert>
  </Snackbar>
);

export default NewPostNotification;
