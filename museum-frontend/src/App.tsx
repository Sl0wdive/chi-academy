import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./routes/ProtectedRoute";
import LoginPage from "./layouts/LoginPage";
import RegisterPage from "./layouts/RegisterPage";
import StripePage from "./layouts/StipePage";
import { fetchMeThunk } from "./store/slices/userSlice";
import { useEffect } from "react";
import { AppDispatch } from "./store/store";
import HomePage from "./layouts/HomePage";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  const isAuthenticated = useSelector(
    (state: any) => state.user.isAuthenticated,
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchMeThunk());
    }
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<StripePage />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute isAllowed={isAuthenticated}>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />}
        />

        <Route
          path="/register"
          element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;
