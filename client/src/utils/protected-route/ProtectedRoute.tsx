import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const token = auth.token;
  if (!token) {
    return <Navigate to="/welcome" />;
  }
  return children;
};

export default ProtectedRoute;
