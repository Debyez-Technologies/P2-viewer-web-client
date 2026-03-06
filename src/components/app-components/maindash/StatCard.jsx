import { FaSpinner } from 'react-icons/fa';

const StatCard = ({ icon, title, value, isLoading }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
            <div className="bg-blue-100 text-blue-500 p-3 rounded-full">
                {icon}
            </div>
            <div>
                <p className="text-sm text-gray-500 font-medium">{title}</p>
                {isLoading ? (
                    <FaSpinner className="animate-spin text-2xl text-gray-400" />
                ) : (
                    <p className="text-3xl font-bold text-gray-800">{value}</p>
                )}
            </div>
        </div>
    );
};

export default StatCard;