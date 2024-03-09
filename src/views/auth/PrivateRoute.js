// PrivateRoute.js
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useRoleValidation from './useAuthValidation';

const PrivateRoute = ({ allowedRoles }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const { userRole, isLoading } = useRoleValidation();

  if (isLoading) {
    return <div>Loading...</div>; // Show loading while the role is being validated
  }
  const token = localStorage.getItem('token');
  if (!userInfo || token=="") {
    // Redirect to sign-in if no userInfo or token; redirect to sign-up if you prefer that
    return <Navigate to="/auth/sign-in" replace />;
  }
  const isAuthorized = allowedRoles.includes(userRole);

  return isAuthorized ? <Outlet /> : <Navigate to="/unauthorized" replace />;
};

export default PrivateRoute;
