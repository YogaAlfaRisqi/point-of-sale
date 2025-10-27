// src/pages/public/HomePage.tsx

import React, { useEffect } from 'react';


interface LoginPageProps {
  branchName?: string; 
}

const HomePage: React.FC<LoginPageProps> = () => {
  const pageTitle = "Login | POS System";

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
    <div style={{ padding: '20px' }}>
      <h1 className='text-black text-3xl'>Login Page (Public)</h1>
      <p>Konten ini hanya tampil jika user BELUM login atau jika user diizinkan melihatnya.</p>
    </div>
  );
};

export default HomePage;