import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectList from "./pages/Dashboard/ProjectList";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/home-page";
import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/Signup/SignupPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import ProjectDetails from "./pages/Dashboard/ProjectDetails.tsx";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <ProjectList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/:id"
          element={
            <ProtectedRoute>
              <ProjectDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
