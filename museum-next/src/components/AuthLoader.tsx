"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/src/store/hooks";
import { setToken, fetchMeThunk } from "@/src/store/slices/userSlice";

export default function AuthLoader() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(setToken(token));
      dispatch(fetchMeThunk());
    }
  }, [dispatch]);

  return null;
}