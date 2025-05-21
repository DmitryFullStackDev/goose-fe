import { Navigate, Outlet } from 'react-router-dom';
import {useTypedSelector} from "../store/hooks";

export const ProtectedRoute = () => {
  const { user } = useTypedSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
