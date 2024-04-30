// PrivateRoute.js
import { Navigate, Outlet } from 'react-router-dom';
import useRoleValidation from './useAuthValidation';
import Loader from "components/button/Loader";

const PrivateRoute = ({ allowedRoles }) => {
  const { userRole, isLoading } = useRoleValidation();
  if (isLoading ) {
    return <div
    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><Loader/></div>; 
  }
  const token = localStorage.getItem('token');
  if (!token && isLoading) {
    return <Navigate to="/auth/sign-in" replace />;
  }
  const isAuthorized = allowedRoles.includes(userRole);

  
  return isAuthorized ? <Outlet /> : <Navigate to="/auth/unauthorized" replace />;
};

export default PrivateRoute;
