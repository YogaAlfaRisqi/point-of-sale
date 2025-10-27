// src/pages/shared/NotFoundPage.tsx

import React, { useEffect } from 'react';
import { useRouteError, isRouteErrorResponse} from 'react-router';

interface NotFoundPageProps {
  branchName?: string; 
}

const NotFoundPage: React.FC<NotFoundPageProps> = () => {
  const pageTitle = "Not Found | POS System";

  const error = useRouteError();
  let errorMessage: string;
  let errorDetail: string;

  // 2. Type Checking untuk error (Penting di TypeScript)
  if (isRouteErrorResponse(error)) {
    // Jika error datang dari respons rute (misalnya 404, 401)
    errorMessage = `${error.status} | ${error.statusText}`;
    errorDetail = error.data?.message || 'Maaf, halaman yang Anda cari tidak dapat ditemukan.';
  } else if (error instanceof Error) {
    // Jika error adalah instance dari Error (misalnya runtime error)
    errorMessage = 'Terjadi Kesalahan Aplikasi';
    errorDetail = error.message;
  } else if (typeof error === 'string') {
    // Jika error adalah string
    errorMessage = 'Terjadi Kesalahan Tak Terduga';
    errorDetail = error;
  } else {
    // Fallback untuk tipe error lainnya
    errorMessage = 'Kesalahan Umum';
    errorDetail = 'Terjadi kesalahan yang tidak diketahui saat memuat halaman.';
  }

  // Menggunakan useEffect untuk memperbarui document.title
    useEffect(() => {
      // 1. Simpan title asli untuk dikembalikan nanti
      const originalTitle = document.title; 
      
      // 2. Set title baru
      document.title = pageTitle;
  
      // 3. Cleanup function: Kembalikan title lama saat komponen meninggalkan DOM
      return () => {
        document.title = originalTitle;
      };
    }, [pageTitle]); // Dependency array memastikan efek hanya dijalankan saat pageTitle berubah
  

  return (
    <div 
      id="error-page" 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f8f9fa'
      }}
    >
      <h1 style={{ fontSize: '3em', color: '#dc3545' }}>{errorMessage}</h1>
      <p style={{ margin: '20px 0', fontSize: '1.2em' }}>{errorDetail}</p>
      
      Tampilkan detail error (hanya untuk debugging)
      
    </div>
  );
};

export default NotFoundPage;