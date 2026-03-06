
// src/components/assignments/AssignedRolesPanel.jsx
const AssignedRolesPanel = ({ roles, isLoading }) => (
    <div>
        <h3 className="font-semibold text-gray-700 mb-4">Assigned Roles</h3>
        <div className="h-48 overflow-y-auto pr-2 space-y-2">
             {isLoading ? (
                <p className="text-gray-500">Loading roles...</p>
            ) : roles.length === 0 ? (
                <p className="text-gray-500">No roles represented.</p>
            ) : (
                roles.map(role => (
                    <div key={role.RoleID} className="bg-green-50 text-green-800 p-2 rounded-md">
                        <p className="font-medium">{role.role_name}</p>
                        <p className="text-xs">{role.description}</p>
                    </div>
                ))
            )}
        </div>
    </div>
);

export default AssignedRolesPanel;