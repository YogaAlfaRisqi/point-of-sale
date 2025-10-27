import { createBrowserRouter } from "react-router";
import { ROUTE_PATHS } from "./routes.config";
import PublicRoute from "./PublicRoutes";
import PrivateRoute from "./PrivateRoute";
import RootLayout from "./RootRoute";
import NotFoundPage from "../pages/NotFoundPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";


    const router = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout />, // Layout induk utama, tidak ada logic auth
            errorElement: <NotFoundPage />, // HANDLING NOT FOUND PAGE
            children: [
                // 1. PUBLIC ROUTES GROUP (Menggunakan PublicLayout sebagai pelindung)
                {
                element: <PublicRoute />, 
                children: [
                    {
                    index: true,
                    element: <HomePage />,
                    },
                    {
                    path: ROUTE_PATHS.LOGIN,
                    element: <LoginPage />,
                    // Di sini Anda bisa menambahkan action: loginAction,
                    },
                ],
                },

                // 2. PRIVATE ROUTES GROUP (Menggunakan PrivateLayout sebagai pelindung)
                {
                element: <PrivateRoute />,
                children: [
                    {
                    path: ROUTE_PATHS.DASHBOARD,
                    element: <DashboardPage />,
                    // Di sini Anda bisa menambahkan loader: dashboardLoader,
                    },
                    // Tambahkan rute pribadi lainnya di sini
                    // { path: ROUTE_PATHS.SETTINGS, element: <SettingsPage /> },
                ],
                },

        // 3. FALLBACK/NOT FOUND DITANGANI OLEH errorElement DI RUTE INDUK
        // Jika tidak ada rute di atas yang cocok, errorElement (NotFoundPage) akan tampil
      ],
    },
    ]);


export default router;