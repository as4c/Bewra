import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'

const ProtectedRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const userToken = localStorage.getItem('access');
  const location = useLocation();
  if (!isAuthenticated || userToken === undefined) {
    return <Navigate to="/signin" state={{ preUrl: location.pathname }} />
  }
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default ProtectedRoutes;