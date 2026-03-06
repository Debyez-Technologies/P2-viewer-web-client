import { FaSpinner } from 'react-icons/fa';

const StatTile = ({ icon, title, value, className = '', isLoading }) => {
    return (
        <div className={`bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg flex flex-col justify-between ${className}`}>
            <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold">{title}</h3>
                <div className="text-3xl opacity-80">{icon}</div>
            </div>
            <div className="text-right mt-4">
                {isLoading ? (
                    <FaSpinner className="animate-spin text-4xl" />
                ) : (
                    <p className="text-5xl font-bold">{value}</p>
                )}
            </div>
        </div>
    );
};

export default StatTile;