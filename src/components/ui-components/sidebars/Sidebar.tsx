import { LogOut } from "lucide-react";
import { SidebarButtons } from "../../../config/settings";
import { useLocation, useNavigate } from "react-router";
import { useAuthStore } from "@/store/auth";
import { useAnnotationStore } from "@/store/annotation-store";
import { useAppStore } from "@/store/app-store";
import { useAssignmentStore } from "@/store/assignment-store";
import { useBookmarkStore } from "@/store/bookmark-store";
import { useImportStore } from "@/store/import-store";
import { usePublicationStore } from "@/store/publication-store";
import { useRoleStore } from "@/store/role-store";
import { useUIStore } from "@/store/ui-store";
import { useUserStore } from "@/store/user-store";

interface SidebarProps {
    sidebarBtns: SidebarButtons[]
}

export default function Sidebar({ sidebarBtns }: SidebarProps) {

    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuthStore();

    const resetAnnotations = useAnnotationStore(s => s.resetStore)
    const resetAppStore = useAppStore(s => s.resetStore)
    const resetAssignmentStore = useAssignmentStore(s => s.resetStore)
    const resetBookmarkStore = useBookmarkStore(s => s.resetStore)
    const resetImportStore = useImportStore(s => s.resetStore)
    const resetPublicationStore = usePublicationStore(s => s.resetStore)
    const resetRoleStore = useRoleStore(s => s.resetStore)
    const resetUiStore = useUIStore(s => s.resetStore)
    const resetUserStore = useUserStore(s => s.resetStore)

    const handleButtonClick = (path: string) => {
        navigate(path);
    };

    const handleLogout = () => {
        logout()
        resetAnnotations()
        resetAppStore()
        resetAssignmentStore()
        resetBookmarkStore()
        resetImportStore()
        resetPublicationStore()
        resetRoleStore()
        resetUiStore()
        resetUserStore()

    }

    if (sidebarBtns.length <= 0)
        return <div className="h-screen min-w-15 flex flex-col border-r-2 bg-gray-100">
            <footer className="fixed bottom-5 left-0 w-16 flex justify-center">
                <button className="rounded-full m-2 p-3 hover:bg-red-500 hover:text-white transition-colors" onClick={logout}>
                    <LogOut size={25} />
                </button>
            </footer>
        </div>


    return (
        <div className="h-screen min-w-15 flex flex-col border-r-2 bg-gray-100">
            {sidebarBtns.map((sidebarBtn, index) => {
                const Icon = sidebarBtn.icon;
                if (!Icon) {
                    console.error(`Icon missing for button: ${sidebarBtn.path}`);
                    return null;
                }
                const isActive = location.pathname === sidebarBtn.path;
                const selectedClass = isActive ? "bg-viewer-core text-white" : "hover:bg-gray-300";

                return (
                    <button
                        key={index} // React needs a key
                        onClick={() => handleButtonClick(sidebarBtn.path)}
                        className={`rounded-full m-2 p-3 transition-colors ${selectedClass}`}
                        title={sidebarBtn.toolTipText}
                    >
                        <Icon size={25} />
                    </button>
                );
            })}

            {/* 5. CSS Fix: Removed w-0, added w-full or fixed width handling */}
            <footer className="fixed bottom-5 left-0 w-16 flex justify-center">
                <button className="rounded-full m-2 p-3 hover:bg-red-500 hover:text-white transition-colors" onClick={handleLogout}>
                    <LogOut size={25} />
                </button>
            </footer>
        </div>
    );
}