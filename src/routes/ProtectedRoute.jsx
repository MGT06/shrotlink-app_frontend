import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

function ProtectedRoute({ authOnly = false }) {
  const { token } = useSelector((state) => state.userState);

  if (authOnly) {
    if (token) {
      return <Navigate to="/dashboard" replace />;
    }
    return <Outlet />;
  }

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
