import { FaSpinner } from 'react-icons/fa';

const ComparisonTile = ({ icon, title, valueA, labelA, valueB, labelB, className = '', isLoading }) => {
    return (
        <div className={`bg-white p-6 rounded-lg shadow-md flex flex-col ${className}`}>
            <div className="flex items-center gap-3 text-gray-700">
                {icon}
                <h3 className="font-semibold text-lg">{title}</h3>
            </div>
            <div className="flex-grow grid grid-cols-2 gap-4 items-center mt-4">
                <div className="text-center">
                    <p className="text-sm text-green-600 font-bold">{labelA}</p>
                    {isLoading ? <FaSpinner className="animate-spin text-3xl mx-auto mt-1" /> : <p className="text-4xl font-bold text-gray-800">{valueA}</p>}
                </div>
                <div className="text-center">
                    <p className="text-sm text-red-600 font-bold">{labelB}</p>
                    {isLoading ? <FaSpinner className="animate-spin text-3xl mx-auto mt-1" /> : <p className="text-4xl font-bold text-gray-800">{valueB}</p>}
                </div>
            </div>
        </div>
    );
};

export default ComparisonTile;