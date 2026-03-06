import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

const UserListItem = ({ user, onAssign, expanded, onToggle }) => {
    const username = user.Profile ? user.Profile.full_name : user.email;

    return (
        <div className="border-b last:border-b-0 py-2">
            <div className="flex items-center justify-between">
                <span className="font-medium">{username}</span>
                <div>
                    {onToggle && (
                        <button
                            onClick={onToggle}
                            className="p-2 text-gray-500"
                        >
                            {expanded ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                    )}
                    <button
                        onClick={() => onAssign(user)}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                    >
                        Assign
                    </button>
                </div>
            </div>
            {expanded && (
                <div className="p-2 mt-2 bg-gray-50 rounded text-sm">
                    <p>
                        <strong>Full Name:</strong> {user.full_name}
                    </p>
                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>
                </div>
            )}
        </div>
    );
};

export default UserListItem;
