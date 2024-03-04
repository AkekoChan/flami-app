import React from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const currentUser = false;
  if (!currentUser) {
    return <Navigate to="/welcome" />;
  }
  return children;
};

export default ProtectedRoute;
