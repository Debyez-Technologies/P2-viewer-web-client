import { AnnotationProvider } from "../providers/AnnotationProvider";
import RenderView from "./RenderView";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./login/Login";
import { AppLayout } from "./layout/AppLayout";
// import Settings from "./dashboards/Settings";
import Help from "./dashboards/Help";
import BookmarkManager from "./components/app-components/Bookmark/BookmarkManager";
import ProjectAssignmentPage from "./dashboards/admin/ProjectAssignment";
import UserManagement from "./pages/user-management";
import RoleManagement from "./pages/role-management";
import PublicationManagement from "./pages/publication-management";
import { PublicationSettings } from "./pages/publication-settings";
import PublicationHome from "./pages/publication-home";
import PublicationDashboard from "./dashboards/publication-dashboard";
import { useAuthStore } from "./store/auth";
import { useEffect, useState } from "react";
import AnnotationManagerNew from "./components/app-components/annotation/AnnotationManagerNew";
import AdminDashboard from "./pages/admin-dashboard";
import { Navigate, Outlet } from "react-router";
import RestrictedPage from "./pages/restricted-page";
import Settings from "./pages/settings";

const RequireAuth = () => {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const AdminRoutes = () => {
    return (
        <>
            <Route path="/" element={<AppLayout />}>
                <Route element={<AdminDashboard />} index={true} />
                <Route path="roles" element={<RoleManagement />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="settings" element={<Settings />} />
                <Route path="manage" element={<PublicationManagement />} />
                <Route path="assign" element={<ProjectAssignmentPage />} />
                <Route path="manage/:id" element={<PublicationSettings />} />
                <Route path="help" element={<Help />} />
            </Route>
            <Route path="/publications" element={<AppLayout />}>
                <Route index element={<PublicationHome />} />
                <Route path="catalog" element={<PublicationDashboard />} />
                <Route path="annotations" element={<AnnotationManagerNew />} />
                <Route path="bookmarks" element={<BookmarkManager />} />
                {/* <Route path="help" element={<>Help me</>} /> */}
            </Route>
            <Route path="ietm/view" element={<RenderView />} />
        </>
    );
};

const UserRoutes = () => {
    return (
        <>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<PublicationHome />} />
                <Route
                    path="/publications/catalog"
                    element={<PublicationDashboard />}
                />
                <Route
                    path="/publications/annotations"
                    element={<AnnotationManagerNew />}
                />
                <Route
                    path="/publications/bookmarks"
                    element={<BookmarkManager />}
                />
                <Route path="/publications/settings" element={<Settings />} />
                {/* <Route path="/publications/help" element={<>Help me</>} /> */}
            </Route>
            <Route path="ietm/view" element={<RenderView />} />
        </>
    );
};

function App() {
    const { currentUser } = useAuthStore();
    const [isAdmin, setIsAdmin] = useState<Boolean>(false);

    useEffect(() => {
        setIsAdmin(
            currentUser?.roles?.some((role) => role.isAdmin === true) || false,
        );
    }, [currentUser]);

    return (
        <AnnotationProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route element={<RequireAuth />}>
                        {isAdmin ? AdminRoutes() : UserRoutes()}
                    </Route>
                    <Route element={<RestrictedPage />} path="*" />
                </Routes>
            </BrowserRouter>
        </AnnotationProvider>
    );
}

export default App;
