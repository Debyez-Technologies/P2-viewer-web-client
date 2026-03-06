import { useAppStore } from "../store/app-store";
import {useImportStore} from "../store/import-store";
import { useUserStore } from "../store/user-store";
import { useNavigate } from "react-router"; 

// --- ICONS ---
import { TbServer2, TbServerOff } from "react-icons/tb";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { GrChapterAdd } from "react-icons/gr";
import { useEffect } from "react";
// New icons for other views

const DashButtons = ({ view }) => {
    // --- HOOKS ---
    // Hooks for state and navigation are still needed for the button actions
    const server = useAppStore((state) => state.server);
    const getServerStatus = useAppStore((state) => state.getServerStatus)
    const startImport = useImportStore((state) => state.startImport);
    const logout = useUserStore(state => state.logout);
    const navigate = useNavigate();

    useEffect(() => {
        getServerStatus()
    }, [])
    // --- HANDLERS ---
    const handleLogout = async () => {
        await logout();
        navigate("/");
    };


    // --- BUTTON CONFIGURATION ---
    // This object acts as a switch case. It maps the 'view' prop to a specific array of button objects.
    const buttonConfigurations = {
        'dashboard': [
            {
                key: 'logout',
                title: 'Logout',
                onClick: handleLogout,
                icon: <LuSquareArrowOutUpRight size={20} className="text-black/90" />
            },
            {
                key: 'status',
                title: server?.connected ? "Server Connected" : "Server Disconnected",
                disabled: !server?.connected,
                icon: server.connected 
                    ? <TbServer2 className="h-5 w-5 text-green-500" /> 
                    : <TbServerOff className="h-5 w-5 text-red-300" />
            },
            
        ],
        'projects': [
            {
                key: 'import',
                title: 'Import',
                onClick: startImport,
                icon: <GrChapterAdd size={20} className="text-black/90" />
            },
            {
                key: 'status',
                title: server.connected ? "Server Connected" : "Server Disconnected",
                disabled: !server.connected,
                icon: server.connected 
                    ? <TbServer2 className="h-5 w-5 text-green-500" /> 
                    : <TbServerOff className="h-5 w-5 text-red-300" />
            },
        ],
        'userproject':[
            {
                key: 'status',
                title: server.connected ? "Server Connected" : "Server Disconnected",
                disabled: !server.connected,
                icon: server.connected 
                    ? <TbServer2 className="h-5 w-5 text-green-500" /> 
                    : <TbServerOff className="h-5 w-5 text-red-300" />
            },
        ]
        
    };

    // Select the correct set of buttons based on the view prop.
    // Fallback to an empty array if the view is not found.
    const buttonsToDisplay = buttonConfigurations[view] || [];

    return (
        // Flex container to push the content to the right and center it vertically
        <div className="flex items-center justify-end">
            {/* The "glass" container with rounded edges and backdrop blur */}
            <div className="flex items-center gap-x-2 p-2 backdrop-blur-sm">
                {/* Dynamically render buttons from the selected configuration */}
                {buttonsToDisplay?.map((button) => (
                    <button
                        key={button.key}
                        className="relative w-9 h-9 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-lg font-semibold transition-all duration-300 shadow-md hover:shadow-[0_0_12px_4px_rgba(255,255,255,0.5)] hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                        title={button.title}
                        onClick={button.onClick}
                        disabled={button.disabled || false}
                    >
                        {button.icon}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DashButtons;