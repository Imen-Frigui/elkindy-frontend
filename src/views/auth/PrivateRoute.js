// PrivateRoute.js
import { Navigate, Outlet } from 'react-router-dom';
import useRoleValidation from './useAuthValidation';

const PrivateRoute = ({ allowedRoles }) => {
  const { userRole, isLoading } = useRoleValidation();
  if (isLoading) {
    return <div>Loading...</div>; 
  }
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/auth/sign-in" replace />;
  }
  const isAuthorized = allowedRoles.includes(userRole);

  
  return isAuthorized ? <Outlet /> : <Navigate to="/auth/unauthorized" replace />;
};

export default PrivateRoute;
