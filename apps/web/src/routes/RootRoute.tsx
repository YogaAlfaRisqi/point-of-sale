
import React from 'react';
import { Outlet} from 'react-router';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const RootLayout: React.FC = () => {
    return (

        <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            
            <Header />

            {/* 2. Main Content Wrapper */}
            <main style={{ flexGrow: 1, padding: '0px' }}>
                <Outlet />
            </main>

            <Footer/>
        </div>
    );
};

export default RootLayout;