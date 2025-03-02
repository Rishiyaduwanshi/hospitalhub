import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <p className="text-center">Checking authentication...</p>;
  if (!isAuthenticated) return <Navigate to="/signin" replace />; // ✅ Ab bina signin ke dashboard open nahi hoga

  return children;
};

export default ProtectedRoute;
