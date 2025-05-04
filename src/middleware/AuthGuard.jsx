import { Navigate } from "react-router-dom";

export default function AuthGuard({ children }) {
  const isAuthenticated = localStorage.getItem("token"); // Or check from Context/Redux

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// If no token, it redirects to /login.
// If has token, it allows access to the requested page.
