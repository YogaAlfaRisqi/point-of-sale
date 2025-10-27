import { ROUTE_PATHS } from "../../routes/routes.config";
import { Link } from "react-router";

const Header: React.FC = () => (
    <header style={{ 
        padding: '15px 30px', 
        backgroundColor: 'white', 
        color: 'white', 
        borderBottom: '1px solid #eee',
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
    }}>
        <Link 
            to={ROUTE_PATHS.HOME || '/'} // Fallback ke '/'
            style={{ color: 'black', textDecoration: 'none', fontSize: '1.5em', fontWeight: 'bold' }}
        >
            POS SaaS
        </Link>
        {/* Navigasi global (misalnya tombol Logout atau Login) */}
        <nav>
            <Link to={ROUTE_PATHS.LOGIN || '/login'} style={{ color: 'black', marginLeft: '15px', textDecoration: 'none' }}>
                Login
            </Link>
        </nav>
    </header>
);

export default Header;