import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@arcana/auth-react";

const ProtectedRoutes = () => {
  const { isLoggedIn } = useAuth();
  return <div>{!isLoggedIn ? <Navigate to="/" /> : <Outlet />}</div>;
};

export default ProtectedRoutes;
