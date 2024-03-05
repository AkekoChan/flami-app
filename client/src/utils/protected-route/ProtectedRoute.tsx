import React from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = true;
  if (!token) {
    return <Navigate to="/welcome" />;
  }
  return children;
};

export default ProtectedRoute;
