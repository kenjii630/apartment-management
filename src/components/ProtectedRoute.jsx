// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserStore } from "@/stores/userStore/userInfoStore";

export default function ProtectedRoute({ children, roles = [] }) {
  const user = useUserStore((s) => s.userInfo);
  const location = useLocation();

  // 1) Not logged in → send to /login (with redirect back)
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // 2) Logged in but role not allowed → /unauthorized
  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 3) Authorized → render child
  return children;
}
