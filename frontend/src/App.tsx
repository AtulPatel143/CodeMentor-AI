import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import WorkspaceLayout from "./layouts/WorkspaceLayout";

import HomePage from "./pages/home-page";
import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/Signup/SignupPage";
import WorkspacePage from "./pages/Workspace/WorkspacePage";

import ProtectedRoute from "./components/auth/ProtectedRoute";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />

      <Routes>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Workspace */}
        <Route
          element={
            <ProtectedRoute>
              <WorkspaceLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/workspace" element={<WorkspacePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
