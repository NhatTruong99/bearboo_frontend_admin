import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import AuthService from "../services/authService";

const ProtectedRoute = ({ children }) => {
  const admin = useSelector((state) => state.admin.adminInfo);
  let location = useLocation();

  if (admin == null || Object.keys(admin).length == 0) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
