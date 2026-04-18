import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = true; // TEMP (we’ll replace later)

  return isLoggedIn ? children : <Navigate to="/login" />;
}
