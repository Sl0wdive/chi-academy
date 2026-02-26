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
  initialized: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: false,
  initialized: false,
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

export const initializeAuthThunk = createAsyncThunk(
  "user/initialize",
  async (_, { dispatch, getState }) => {
    const { user } = getState() as { user: UserState };

    if (user.token) {
      await dispatch(fetchMeThunk());
    } else {
      dispatch(setInitialized());
    }
  },
);

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
    setInitialized(state) {
      state.initialized = true;
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
        state.user = {
          id: action.payload.userId,
          username: action.payload.userName,
        };
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

      .addCase(fetchMeThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.initialized = true;
      })
      .addCase(fetchMeThunk.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.initialized = true;
        localStorage.removeItem("token");
      });
  },
});

export const { logout, setInitialized } = userSlice.actions;
export default userSlice.reducer;
