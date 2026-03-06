import { FaClock } from 'react-icons/fa';

const RecentLogins = ({ logins, isLoading }) => {
    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleString();
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md h-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul className="space-y-4">
                    {logins?.map((login, index) => (
                        <li key={index} className="flex items-center gap-4">
                            <FaClock className="text-gray-400" />
                            <div>
                                <p className="font-medium text-gray-700">{login.username}</p>
                                <p className="text-xs text-gray-500">{formatTime(login.loginTimestamp)}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RecentLogins;