import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, registerUser, getMyProfile, AuthResponse } from "../../api/userActions";

export interface User {
  id: number;
  username: string;
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
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const loginThunk = createAsyncThunk<
  AuthResponse,
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
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
      if (action.payload) localStorage.setItem('token', action.payload);
      else localStorage.removeItem('token');
    },
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
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token);
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

export const { logout, setToken } = userSlice.actions;
export default userSlice.reducer;
