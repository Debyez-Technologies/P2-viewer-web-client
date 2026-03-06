import { Outlet, useLocation } from "react-router";

import Sidebar from "../components/ui-components/sidebars/Sidebar";
import { useAuthStore } from "@/store/auth";
import { AdminSidebarbuttons, publicationViewSidebar, publicationViewSidebarNormal } from "@/config/settings";
import AppHeader from "@/components/ui-components/app-header";
import ManagerTool from "@/components/ui-components/header-tools/manager-tools";
// import AppHeader from "@/dashboards/admin/AppHeader";

export function AppLayout() {

    const pubregx = /\bpublications\b/;
    const currentUser = useAuthStore(s => s.currentUser)
    const location = useLocation();

    const isAdmin = currentUser.roles.some(r => r.isAdmin === true) || false


    // The sidebar is rendered in the following conditions:
    // 1. When user is admin
    // 2. When admin is in publication section path : '/publications/*""
    // 3. when user is a normal user

    if (location.pathname.match(pubregx))
        return (
            <div className="h-screen flex flex-col overflow-hidden">
                <AppHeader tools={<ManagerTool />} />
                <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
                    {
                        isAdmin ? <Sidebar sidebarBtns={publicationViewSidebar} /> : <Sidebar sidebarBtns={publicationViewSidebarNormal} />
                    }
                    <div className="flex flex-col flex-grow p-6 gap-6 overflow-auto">
                        <Outlet />
                    </div>
                </div>
            </div>
        );

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <AppHeader tools={<></>} />
            <div className="flex flex-col md:flex-row  overflow-hidden">
                {
                    isAdmin ? <Sidebar sidebarBtns={AdminSidebarbuttons} /> : <Sidebar sidebarBtns={[]} />
                }
                <div className="flex flex-col flex-grow p-6 gap-6 overflow-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
