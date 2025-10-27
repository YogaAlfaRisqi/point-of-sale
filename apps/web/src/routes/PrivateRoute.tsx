// routes/PrivateRoutes.tsx (Simulasi SELALU LOGIN)

import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { ROUTE_PATHS } from './routes.config';

// Simulasi Auth: isAuthenticated selalu true (menganggap user sudah login)
const useAuth = () => {
  return { isAuthenticated: true }; // 👈 DIUBAH MENJADI TRUE
};

const PrivateRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  // Jika isAuthenticated adalah TRUE, kode ini dilewati.
  if (!isAuthenticated) {
    return <Navigate to={ROUTE_PATHS.LOGIN} replace />;
  }

  // Halaman pribadi akan tampil
  return <Outlet />;
};

export default PrivateRoutes;