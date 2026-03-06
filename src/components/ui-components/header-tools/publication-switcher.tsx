import React, { useEffect, useState } from "react";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useLocation, useNavigate } from "react-router";
import { useAppStore } from "@/store/app-store";
import { usePublicationStore } from "@/store/publication-store";

// 1. Updated ListItem to accept 'isSelected'
interface ListItemProps extends React.ComponentPropsWithoutRef<"li"> {
    title: string;
    handleAction: () => void;
    isSelected: boolean;
}

function ListItem({
    title,
    handleAction,
    isSelected,
    ...props
}: ListItemProps) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <div
                    onClick={handleAction}
                    className={`
            block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors cursor-pointer
            hover:bg-accent hover:text-accent-foreground
            ${isSelected ? "bg-viewer-core text-gray-100" : ""}
          `}
                >
                    <div className="text-sm leading-none">{title}</div>
                </div>
            </NavigationMenuLink>
        </li>
    );
}

export default function PublicationSwitcher({ currentUserId }: { currentUserId: string }) {
    const navigate = useNavigate();
    const location = useLocation();
    // Zustand Store
    const fetchUserProjects = useAppStore((state) => state.fetchUserProjects);
    const assignedProjects = useAppStore((state) => state.assignedProjects);
    const getPublicationData = usePublicationStore((state) => state.getPublicationData)
    const setPublicationIDinPublicationStore = usePublicationStore(
        (state) => state.setPublicationIDinPublicationStore,
    );
    const setCurrentProjectInfo = useAppStore(
        (state) => state.setCurrentProjectInfo,
    );
    const currentProjectInfo = useAppStore((state) => state.currentProjectInfo); // Get current project from store

    // Local state for the dropdown label (optional, if you want it to show the name)
    const [activePubId, setActivePubId] = useState<string>("");

    const handleProjectOpen = async (project: any) => {

        localStorage.setItem(`publication-${currentUserId}`, JSON.stringify(project));

        // fetch config and groups:
        await getPublicationData(project.id)
        // Update Store
        setPublicationIDinPublicationStore(project.PublicationID);
        setCurrentProjectInfo(project);
        setActivePubId(project.PublicationID);

        if (location.pathname !== "/publications/chat") {
            navigate("/publications/catalog");
        }
    };

    // 2. Initialize Data on Mount
    useEffect(() => {
        fetchUserProjects(currentUserId);

        // Safely read localStorage only once on mount
        try {
            const storedPub = localStorage.getItem(`publication-${currentUserId}`);
            if (storedPub) {
                const pub = JSON.parse(storedPub);
                if (pub && pub.PublicationID) {
                    setPublicationIDinPublicationStore(pub.PublicationID);
                    setCurrentProjectInfo(pub);
                    setActivePubId(pub.PublicationID);
                }
            }
        } catch (error) {
            console.error("Error parsing stored publication", error);
        }
    }, []);
    // Sync state if store updates from elsewhere
    useEffect(() => {
        if (currentProjectInfo?.id) {
            setActivePubId(currentProjectInfo.id);
        }
    }, [currentProjectInfo]);

    useEffect(() => {
        if (!assignedProjects) return;

        // If no projects exist
        if (assignedProjects.length === 0) {
            setActivePubId("");
            setCurrentProjectInfo(undefined);
            localStorage.removeItem("publication");
            return;
        }

        // If there is a current selection, check if it still exists
        if (currentProjectInfo?.id) {
            const stillExists = assignedProjects.some(
                (p) => p.id === currentProjectInfo.id
            );

            // Selected project was deleted → clear selection (NO fallback)
            if (!stillExists) {
                setActivePubId("");
                setCurrentProjectInfo(undefined);
                localStorage.removeItem("publication");
            }
        }

        // Do NOTHING otherwise

        // if (!stillExists) {
        //     // Pick first project as default (or choose your own rule)
        //     const next = assignedProjects[0];

        //     setActivePubId(next.PublicationID);
        //     setPublicationID(next.PublicationID);
        //     setPublicationIDinPublicationStore(next.PublicationID);
        //     setCurrentProjectInfo(next);
        //     localStorage.setItem("publication", JSON.stringify(next));
        // }
    }, [assignedProjects]);

    return (
        <NavigationMenu className="list-none">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="w-full border rounded-2xl min-w-[150px]">
                        {/* Show selected name or default text */}
                        <div>
                            {currentProjectInfo?.name ||
                                "Publications"}
                        </div>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        {!assignedProjects ? (
                            // Optional loading state
                            <div className="w-64 p-4 text-center text-sm text-gray-400">
                                Loading projects…
                            </div>
                        ) : assignedProjects.length === 0 ? (
                            // Empty list state
                            <div className="w-48 p-6 flex flex-col items-center justify-center gap-3 text-gray-500">
                                {/* <BookText className="size-8 opacity-40" /> */}
                                <span className="text-xs font-medium">
                                    No assigned publications
                                </span>
                                {/* <span className="text-xs text-gray-400 text-center">
                                    You don’t have access to any publications yet
                                </span> */}
                            </div>
                        ) : (
                            // Normal list
                            <ul className="w-64 flex flex-col p-2 gap-1">
                                {assignedProjects.map((pub) => {
                                    const isSelected =
                                        activePubId === pub.id;

                                    return (
                                        <ListItem
                                            key={pub.id}
                                            title={pub.name}
                                            handleAction={() => handleProjectOpen(pub)}
                                            isSelected={isSelected}
                                        />
                                    );
                                })}
                            </ul>
                        )}
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}