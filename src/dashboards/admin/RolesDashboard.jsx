import { useEffect, useState } from "react";
import { useRoleStore } from "../../store/role-store";


const RolesDashboard = () => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ role_name: "", description: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const { getRoles, createRole, deleteRole, roles } = useRoleStore();

    // Fetch roles on mount
    const fetchRoles = async () => {
        try {
            setIsLoading(true);
            setError("");
            await getRoles();
        } catch (err) {
            console.error("Error fetching roles:", err);
            setError("Failed to fetch roles. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const handleCreateClick = () => {
        setShowForm(!showForm);
        setFormData({ role_name: "", description: "" });
    };

    const handleDelete = async (id) => {
        try {
            await deleteRole(id);
            await fetchRoles(); // Refresh after deletion
        } catch (err) {
            console.error("Error deleting role:", err);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!formData.role_name.trim()) return;

        try {
            await createRole(formData);
            setFormData({ role_name: "", description: "" });
            setShowForm(false);
            await fetchRoles(); // Refresh after creation
        } catch (err) {
            console.error("Error creating role:", err);
            setError("Failed to create role.");
        }
    };

    return (
        <div className="flex flex-col flex-grow p-6 gap-6 overflow-hidden">
            <div className="flex flex-col gap-4">
                {/* Table Section */}
                <div className="bg-white border rounded-lg p-4 shadow-sm">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-40 text-gray-500">
                            Loading roles...
                        </div>
                    ) : error ? (
                        <div className="flex justify-center items-center h-40 text-red-500">
                            {error}
                        </div>
                    ) : !Array.isArray(roles) || roles.length === 0 ? (
                        <div className="flex justify-center items-center h-40 text-gray-500">
                            No roles created yet.
                        </div>
                    ) : (
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="text-left border-b">
                                    <th className="p-3">Role Name</th>
                                    <th className="p-3">Description</th>
                                    <th className="p-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roles.map((role, index) => (
                                    <tr
                                        key={index}
                                        className="border-b hover:bg-gray-50 transition"
                                    >
                                        <td className="p-3">{role.role_name}</td>
                                        <td className="p-3">{role.description}</td>
                                        <td className="p-3 flex gap-2">
                                            <button
                                                onClick={() => handleDelete(role.role_id)}
                                                className="px-3 py-1 text-sm bg-red-500 disabled:bg-red-300 text-white rounded hover:bg-red-600"
                                                disabled={role.role_id === 1 ? true : false}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Header with Create Button */}
                <div className="flex justify-end">
                    <button
                        onClick={handleCreateClick}
                        className="px-6 py-3 text-lg font-medium bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                    >
                        + Create Role
                    </button>
                </div>

                {/* Form Section */}
                {showForm && (
                    <div className="bg-white border rounded-lg p-4 shadow-md">
                        <h2 className="text-lg font-semibold mb-4">Create Role</h2>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Role Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.role_name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, role_name: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Role Description
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Save Role
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RolesDashboard;
