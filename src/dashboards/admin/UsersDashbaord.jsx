import { useEffect, useState } from "react";
import { useUserStore } from "../../store/user-store";
import { useRoleStore } from "../../store/role-store";


const UsersDashboard = () => {
    const [formData, setFormData] = useState({
        username: "",
        full_name: "",
        email: "",
        password_hash: "",
        role_id: ""
    });
    const [showForm, setShowForm] = useState(false);

    const { usersList, getUsersList, createUser, deleteUser } = useUserStore();
    const { getRoles, roles } = useRoleStore()

    useEffect(() => {

        const fetchData = async () => {
            await getUsersList();
            await getRoles();
        }
        fetchData()
    }, []);

    const handleCreateClick = () => {
        setShowForm(!showForm);
        setFormData({ username: "", full_name: "", email: "", password_hash: "", role_id: "" });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username.trim()) return;
        await createUser(formData);
        await getUsersList();

        setShowForm(false);
    };

    const handleDelete = async (id) => {
        try {
            await deleteUser(id)
            await getUsersList()
        } catch (error) {
            console.error(error, "Error deleting user")
        }
    };

    useEffect(() => {
        console.log("users list", usersList)
    }, [usersList])

    return (
        <div className="flex flex-col flex-grow p-6 gap-6 overflow-hidden">
            <div className="flex flex-col gap-4">
                <div className="bg-white border rounded-lg p-4 shadow-sm">
                    {/* Users Table */}
                    {(!usersList || usersList.length === 0) ? (
                        <div className="flex justify-center items-center h-40 text-gray-500">
                            No users found.
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead>
                                <tr className="text-left border-b">
                                    <th className="p-3">Username</th>
                                    <th className="p-3">Full Name</th>
                                    <th className="p-3">Email</th>
                                    <th className="p-3">Role</th>
                                    <th className="p-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersList?.map((user, index) =>
                                    user ? (
                                        <tr
                                            key={index}
                                            className="border-b hover:bg-gray-50 transition"
                                        >
                                            <td className="p-3">{user.username}</td>
                                            <td className="p-3">{user.full_name}</td>
                                            <td className="p-3">{user.email}</td>
                                            <td className="p-3">{user?.role ? user.role.role_name : "—"}</td>
                                            <td className="p-3 flex gap-2">
                                                <button
                                                    onClick={() => handleDelete(user.user_id)}
                                                    className="px-3 py-1 text-sm bg-red-500 disabled:bg-red-300 text-white rounded hover:bg-red-600"
                                                    disabled={user.user_id === 1 ? true : false}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ) : null
                                )}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Header with Create Button */}
                <div className="flex justify-end mb-4">
                    <button
                        onClick={handleCreateClick}
                        className="px-6 py-3 text-lg font-medium bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                    >
                        + Create User
                    </button>
                </div>

                {/* ✅ Create User Form */}
                {showForm && (
                    <div className="bg-white rounded-lg p-4 shadow-md">
                        <form
                            onSubmit={handleFormSubmit}
                            className="p-4 space-y-3 border-t"
                        >
                            <h2 className="text-lg font-semibold">Create User</h2>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Username</label>
                                    <input
                                        type="text"
                                        value={formData.username}
                                        onChange={(e) =>
                                            setFormData({ ...formData, username: e.target.value })
                                        }
                                        className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        value={formData.full_name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, full_name: e.target.value })
                                        }
                                        className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
                                        className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Password</label>
                                    <input
                                        type="password"
                                        value={formData.password_hash}
                                        onChange={(e) =>
                                            setFormData({ ...formData, password_hash: e.target.value })
                                        }
                                        className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                                    />
                                </div>

                                {/* ✅ Roles Dropdown */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Role</label>
                                    <select
                                        value={formData.role_id}
                                        onChange={(e) =>
                                            setFormData({ ...formData, role_id: Number(e.target.value) })
                                        }
                                        className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                                        required
                                    >
                                        <option value="">Select a role</option>
                                        {roles?.map((role) => (
                                            <option key={role.role_id} value={role.role_id}>
                                                {role.role_name} (ID: {role.role_id})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 mt-3">
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
                                    Save User
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UsersDashboard;
