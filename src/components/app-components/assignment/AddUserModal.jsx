// src/components/assignments/AddUserModal.jsx
// This is the most complex component, handling the user/role selection.
import { useState, useMemo } from "react";
import axios from "axios";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import UserListItem from "./UserListItem";
import { useAssignmentStore } from "../../../store/assignment-store";
import { useUserStore } from "../../../store/user-store";
import { API_BASE_URL } from "@/config/settings";


const AddUserModal = () => {
    const {
        isAddUserModalOpen,
        activeProjectId,
        allUsers,
        allRoles,
        closeAddUserModal,
        triggerRefresh,
        assignedUserIdsForActiveProject,
    } = useAssignmentStore();

    const token = useUserStore((state) => state.token);
    const [view, setView] = useState("users"); // 'users' or 'roles'
    const [expandedItems, setExpandedItems] = useState({}); // { 'user-1': true, 'role-2': true }

    // This is temporary state for the confirmation step
    const [confirm, setConfirm] = useState({
        isOpen: false,
        user: null,
        action: null,
    });

    const availableUsers = useMemo(() => {
        const assignedIds = new Set(assignedUserIdsForActiveProject);
        return allUsers.filter((user) => !assignedIds.has(user.id));
    }, [allUsers, assignedUserIdsForActiveProject]);

    const handleAssign = (user) => {
        setConfirm({
            isOpen: true,
            user: user,
            action: async () => {
                try {
                    await axios.post(
                        `${API_BASE_URL}/api/v1/publications/${activeProjectId}/users`,
                        {
                            user_id: user.id,
                        },
                        {
                            headers: {
                                "X-Auth-Token": token,
                            },
                        },
                    );
                    // Here we can't directly call refreshUsers, so we can close the modal
                    // and maybe rely on a global state change or a small delay for the user to see the update.
                    // For now, closing the modal is the simplest approach.
                    console.log("User assigned successfully!");
                    triggerRefresh();
                } catch (error) {
                    console.error("Failed to assign user:", error);
                } finally {
                    setConfirm({ isOpen: false, user: null, action: null });
                    closeAddUserModal();
                }
            },
        });
    };

    const toggleExpand = (id) => {
        setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const usersByRole = useMemo(() => {
        const map = new Map();
        allRoles.forEach((role) => map.set(role.id, []));
        availableUsers.forEach((user) => {
            if (map.has(user.role_id)) {
                map.get(user.role_id).push(user);
            }
        });
        return map;
    }, [availableUsers, allRoles]);

    if (!isAddUserModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[80vh] flex flex-col">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold">
                        Assign User to Project
                    </h2>
                    <p className="text-sm text-gray-500">
                        Project ID: {activeProjectId}
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex p-2 bg-gray-100">
                    <button
                        onClick={() => setView("users")}
                        className={`flex-1 p-2 rounded ${view === "users" ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
                    >
                        All Users
                    </button>
                    <button
                        onClick={() => setView("roles")}
                        className={`flex-1 p-2 rounded ${view === "roles" ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
                    >
                        By Role
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 overflow-y-auto">
                    {view === "users" &&
                        allUsers.map((user) => (
                            <UserListItem
                                key={`user-${user.id}`}
                                user={user}
                                onAssign={(user) => handleAssign(user)}
                                expanded={expandedItems[`user-${user.id}`]}
                                onToggle={() => toggleExpand(`user-${user.id}`)}
                            />
                        ))}

                    {view === "roles" &&
                        allRoles.map((role) => (
                            <div key={`role-${role.id}`} className="mb-4">
                                <button
                                    onClick={() =>
                                        toggleExpand(`role-${role.id}`)
                                    }
                                    className="w-full flex justify-between items-center p-2 bg-gray-100 rounded-t-md"
                                >
                                    <span className="font-semibold">
                                        {role.role_name}
                                    </span>
                                    {expandedItems[`role-${role.id}`] ? (
                                        <FaChevronUp />
                                    ) : (
                                        <FaChevronDown />
                                    )}
                                </button>
                                {expandedItems[`role-${role.id}`] && (
                                    <div className="border border-t-0 p-2 rounded-b-md">
                                        {usersByRole
                                            .get(role.id)
                                            ?.map((user) => (
                                                <UserListItem
                                                    key={`user-role-${user.id}`}
                                                    user={user}
                                                    onAssign={handleAssign}
                                                />
                                            ))}
                                    </div>
                                )}
                            </div>
                        ))}
                </div>

                <div className="p-4 border-t mt-auto">
                    <button
                        onClick={closeAddUserModal}
                        className="w-full p-2 bg-gray-200 hover:bg-gray-300 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>

            {/* Inline Confirmation Modal */}
            {confirm.isOpen && (
                <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-2xl border">
                        <h3 className="text-lg font-bold">
                            Confirm Assignment
                        </h3>
                        <p className="my-4">
                            Are you sure you want to assign{" "}
                            {confirm.user.Profile
                                ? confirm.user.Profile.full_name
                                : confirm.user.email}
                            ?
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() =>
                                    setConfirm({
                                        isOpen: false,
                                        user: null,
                                        action: null,
                                    })
                                }
                                className="px-4 py-2 rounded bg-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirm.action}
                                className="px-4 py-2 rounded bg-blue-500 text-white"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddUserModal;
