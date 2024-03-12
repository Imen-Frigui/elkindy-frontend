// PrivateRoute.js
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useRoleValidation from './useAuthValidation';
import { logout } from 'slices/authSlice';

const PrivateRoute = ({ allowedRoles }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const { userRole, isLoading } = useRoleValidation();
const dispatch = useDispatch();
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
