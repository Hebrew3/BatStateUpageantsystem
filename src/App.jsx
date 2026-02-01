import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "@/pages/HomePage";
import { AdminDashboardPage } from "@/pages/AdminDashboardPage";

function PrivateRoute({ children, isAuthenticated }) {
  return isAuthenticated ? children : <Navigate to="/" replace />;
}

function AppRoutes({ isAdmin, onAdminLogin, onLogout }) {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage onLogin={onAdminLogin} />}
      />
      <Route
        path="/admin/*"
        element={
          <PrivateRoute isAuthenticated={isAdmin}>
            <AdminDashboardPage onLogout={onLogout} />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  function handleAdminLogin() {
    setIsAdmin(true);
  }

  function handleLogout() {
    setIsAdmin(false);
  }

  return (
    <BrowserRouter>
      <AppRoutes
        isAdmin={isAdmin}
        onAdminLogin={handleAdminLogin}
        onLogout={handleLogout}
      />
    </BrowserRouter>
  );
}

