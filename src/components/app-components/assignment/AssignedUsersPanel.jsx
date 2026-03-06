// src/components/assignments/AssignedUsersPanel.jsx
import { FaPlus, FaUserMinus } from "react-icons/fa";
import { useAssignmentStore } from "../../../store/assignment-store";
import { useUserStore } from "../../../store/user-store";

const AssignedUsersPanel = ({
    projectId,
    users,
    onUnassign,
    isLoading,
    refreshUsers,
}) => {
    const openAddUserModal = useAssignmentStore(
        (state) => state.openAddUserModal,
    );
    const token = useUserStore((state) => state.token);
    console.log("users n panel:", users);

    const handleOpenModal = () => {
        // Get the list of IDs from the users prop
        const assignedUserIds = users.map((user) => user.user_id);
        // Call the modified store action
        openAddUserModal(projectId, token, assignedUserIds);
    };

    return (
        <div className="border-r-0 lg:border-r border-gray-200 pr-0 lg:pr-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-700">Assigned Users</h3>
                <button
                    onClick={handleOpenModal}
                    className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                    title="Assign New User"
                >
                    <FaPlus size={13} />
                </button>
            </div>
            <div className="h-48 overflow-y-auto pr-2 space-y-2">
                {isLoading ? (
                    <p className="text-gray-500">Loading users...</p>
                ) : users.length === 0 ? (
                    <p className="text-gray-500">No users assigned.</p>
                ) : (
                    users.map((user) => (
                        <div
                            key={user.id}
                            className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
                        >
                            <div>
                                <p className="font-medium text-gray-800">
                                    {user.Profile
                                        ? user.Profile.full_name
                                        : user.email}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {user.email}
                                </p>
                            </div>
                            <button
                                onClick={() => onUnassign(user)}
                                className="p-2 text-red-500 hover:text-red-700"
                                title={`Unassign ${
                                    user.Profile
                                        ? user.Profile.full_name
                                        : user.email
                                }`}
                            >
                                <FaUserMinus />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AssignedUsersPanel;
