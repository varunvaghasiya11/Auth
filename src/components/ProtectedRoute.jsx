import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const { userData } = useSelector((state) => state.login);
  const location = useLocation();

  if (!userData) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const userRole = userData.user?.role || userData.role || 'user';

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
