import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';

const ProtectedRoutes = () => {
  if (localStorage.getItem("currentUserID")) {
    return <Outlet />
  }
  return <Navigate to="/login" />;
};

export default ProtectedRoutes;