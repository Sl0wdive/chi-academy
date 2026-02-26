import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./routes/ProtectedRoute";
import LoginPage from "./layouts/LoginPage";
import RegisterPage from "./layouts/RegisterPage";
import StripePage from "./layouts/StipePage";
import { useEffect } from "react";
import { AppDispatch, RootState } from "./store/store";
import HomePage from "./layouts/HomePage";

import { initializeAuthThunk } from "./store/slices/userSlice";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated, initialized } = useSelector(
    (state: RootState) => state.user,
  );

  useEffect(() => {
    dispatch(initializeAuthThunk());
  }, [dispatch]);

  if (!initialized) {
    return <div>Loading...</div>;
  }

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
