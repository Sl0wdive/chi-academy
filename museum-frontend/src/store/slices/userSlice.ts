import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser, getMyProfile } from "../../api/userActions";

export interface User {
  id: number;
  username: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  userName: string;
  userId: number;
}

interface UserState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
};

export const loginThunk = createAsyncThunk<
  LoginResponse,
  { username: string; password: string }
>("user/login", async (data) => {
  return await loginUser(data);
});

export const registerThunk = createAsyncThunk<
  User,
  { username: string; password: string }
>("user/register", async (data) => {
  return await registerUser(data);
});

export const fetchMeThunk = createAsyncThunk<User>("user/me", async () => {
  return await getMyProfile();
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.access_token;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.access_token);
      })
      .addCase(loginThunk.rejected, (state) => {
        state.loading = false;
        state.error = "Login failed";
      })

      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerThunk.rejected, (state) => {
        state.loading = false;
        state.error = "Registration failed";
      })

      .addCase(fetchMeThunk.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
