// routes/PublicRoutes.tsx (Simulasi SELALU LOGOUT)

import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { ROUTE_PATHS } from './routes.config';

// Simulasi Auth: isAuthenticated selalu false (menganggap user belum login)
const useAuth = () => {
  return { isAuthenticated: false }; // 👈 DIUBAH MENJADI FALSE
};

const PublicRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  // Jika isAuthenticated adalah FALSE, kode ini dilewati.
  if (isAuthenticated) {
    return <Navigate to={ROUTE_PATHS.DASHBOARD} replace />;
  }
  
  // Halaman publik akan tampil
  return <Outlet />;
};

export default PublicRoutes;