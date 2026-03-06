import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import ProjectInfoPanel from "./ProjectInfoPanel";
import AssignedUsersPanel from "./AssignedUsersPanel";
import AssignedRolesPanel from "./AssignedRolesPanel";
import ConfirmationModal from "../../ui-components/ConfirmationModal";
import { useUserStore } from "../../../store/user-store";
import { useAssignmentStore } from "../../../store/assignment-store";
import { API_BASE_URL } from "@/config/settings";


const ProjectCard = ({ project }) => {

    const [assignedUsers, setAssignedUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [confirmation, setConfirmation] = useState({
        isOpen: false,
        action: null,
        title: "",
        message: "",
    });

    const token = localStorage.getItem('token')
    const refreshKey = useAssignmentStore((state) => state.refreshKey);

    // --- Data Fetching ---
    const fetchAssignedUsers = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `${API_BASE_URL}/api/v1/publications/${project.id}/users`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );
            console.log("ass users: ", response.data);
            setAssignedUsers(response.data || []); // Ensure it's always an array
        } catch (error) {
            console.error(
                `Failed to fetch users for project ${project.PmID}:`,
                error,
            );
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAssignedUsers();
    }, [project.id, refreshKey]);

    // --- Actions ---
    const handleUnassignUser = (user) => {
        setConfirmation({
            isOpen: true,
            title: `Unassign ${user.Profile ? user.Profile.full_name : user.email
                }`,
            message: `Are you sure you want to remove ${user.Profile ? user.Profile.full_name : user.email
                } from this project?`,
            onConfirm: async () => {
                try {
                    await axios.delete(
                        `${API_BASE_URL}/api/v1/publications/${project.id}/users/${user.id}`,
                        {
                            headers: {
                                "Authorization": token
                            },
                        },
                    );
                    fetchAssignedUsers(); // Refresh the list on success
                } catch (error) {
                    console.error("Failed to unassign user:", error);
                    // Add user feedback here (e.g., a toast notification)
                } finally {
                    closeConfirmation();
                }
            },
        });
    };

    const closeConfirmation = () =>
        setConfirmation({
            isOpen: false,
            action: null,
            title: "",
            message: "",
        });

    // Memoize derived roles to prevent recalculation on every render
    const assignedRoles = useMemo(() => {
        console.log("assignedusers: ", assignedUsers);
        if (!assignedUsers || assignedUsers.length === 0) return [];
        // Creates a map of unique roles from the list of assigned users
        const rolesMap = new Map();
        assignedUsers.forEach((user) => {
            if (user.role && !rolesMap.has(user.role.role_id)) {
                rolesMap.set(user.role.role_id, user.role);
            }
        });
        return Array.from(rolesMap.values());
    }, [assignedUsers]);

    const isDisabled = project.IsConfigured === false;
    return (
        <div className="relative">
            {isDisabled && (
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-400 bg-opacity-50 z-10 rounded-lg flex items-center justify-center">
                    <div className="text-center p-4 bg-gray-700 bg-opacity-75 rounded-md">
                        <p className="text-white font-semibold">
                            This project is not yet configured.
                        </p>
                    </div>
                </div>
            )}
            <div
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white shadow-md rounded-lg p-4 ${isDisabled ? "pointer-events-none" : ""
                    }`}
            >
                {/* --- MODIFIED LINE --- */}
                <div className="md:col-span-2 lg:col-span-1">
                    <ProjectInfoPanel project={project} />
                </div>
                <AssignedUsersPanel
                    projectId={project.PublicationID}
                    users={assignedUsers}
                    onUnassign={handleUnassignUser}
                    isLoading={isLoading}
                    refreshUsers={fetchAssignedUsers}
                />
                <AssignedRolesPanel
                    roles={assignedRoles}
                    isLoading={isLoading}
                />
            </div>
            {confirmation.isOpen && (
                <ConfirmationModal
                    {...confirmation}
                    onCancel={closeConfirmation}
                />
            )}
        </div>
    );
};

export default ProjectCard;
