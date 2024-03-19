/**
 * React Packages
 */
import { useEffect, useLayoutEffect, useState } from "react";
import {
    useNavigate,
    Route,
    Routes,
    useLocation,
    Navigate,
} from "react-router-dom";

/**
 * Core-lib
 */
import { RequireAuth, useAuthContext } from "@aabdelmonaem/core-lib";

/**
 * Pages
 */
import ParentLayout from "./components/common/parentLayout/ParentLayout";
import Home from "./components/pages/home/HomeView";
import LoginView from "./components/pages/login/LoginView";
import NoPageView from "./components/common/noPage/NoPageView";

// List of all pages and the role keys
const routes = [
    {
        path: "/home",
        component: Home,
        requiredPermission: ["HOME_KEY"],
    },
];

interface IsAuthProps {
    children: React.ReactNode;
}

const IsAuth: React.FC<IsAuthProps> = (props) => {
    const auth = useAuthContext();
    const location = useLocation();

    return !auth.user ? (
       <>{props.children}</> 
    ) : (
        <Navigate to="/" state={{ from: location }} replace />
    );
};

function AppRoutes() {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuthContext();
    const [filteredRoutes, setFilteredRoutes] = useState<any[]>([]);
    const [firstRoute, setFirstRoute] = useState({
        path: "/",
        component: Home,
        requiredPermission: [],
    });

    useLayoutEffect(() => {
        async function initializeRouters() {
            if (auth.user) {
                try {
                    setFilteredRoutes(
                        routes.filter((route) =>
                            auth.checkPermission(route.requiredPermission)
                        )
                    );
                    console.log(filteredRoutes);
                } catch (error) {
                    console.error("Error fetching routes configurations:", error);
                }
            }
        }

        initializeRouters();
    }, [auth]);

    useLayoutEffect(() => {
        if (filteredRoutes && filteredRoutes.length > 0)
            setFirstRoute(filteredRoutes[0]);
    }, [filteredRoutes]);

    useEffect(() => {
        if (location.pathname !== "/login" && !auth.user) {
          navigate("/login", { replace: true });
        }
      }, [location, auth, navigate]);

    return (
        <Routes>
            <Route
                path="/"
                element={<ParentLayout />}>
                <Route
                    index
                    path="/"
                    element={
                        <RequireAuth permissions={firstRoute.requiredPermission}>
                            {<firstRoute.component />}
                        </RequireAuth>
                    }
                />
                {filteredRoutes.map((route, index) => (
                    <Route
                        key={index + 1}
                        path={route.path}
                        element={
                            <RequireAuth permissions={route.requiredPermission}>
                                {<route.component />}
                            </RequireAuth>
                        }
                    />
                ))}

                <Route
                    path="*"
                    element={<NoPageView />}
                />
                <Route
                    path="login"
                    element={
                        <IsAuth>
                            <LoginView />
                        </IsAuth>
                    }
                />
            </Route>
        </Routes>
    );
}

export default AppRoutes;
