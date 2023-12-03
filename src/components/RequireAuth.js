import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export function RequireAuth({ allowedRoles }) {
  const { auth } = useAuth();
  const location = useLocation();

  let authToken = auth ? localStorage.getItem('auth') : auth?.refreshToken;
  if(authToken != null){
    authToken = JSON.parse(authToken);
  }
  
  return (
    allowedRoles?.includes(authToken?.roles)
      ? <Outlet />
      : authToken?.accessToken // changed from user to accessToken to persist login after refresh
        ? <Navigate to="/unauthorized" state={{ from: location }} replace />
        : <Navigate to="/login" state={{ from: location }} replace />
  );
}
