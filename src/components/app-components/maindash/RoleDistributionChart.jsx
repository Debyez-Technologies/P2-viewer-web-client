import { FaChartPie } from 'react-icons/fa';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RoleDistributionChart = ({ data, isLoading }) => {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    if (isLoading) {
        return <div className="bg-white p-6 rounded-lg shadow-md h-[312px] flex justify-center items-center">Loading...</div>;
    }

    // Placeholder for when there is no data
    if (!data || data.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md h-[312px]">
                <h3 className="text-xl font-semibold mb-4">Roles Distribution</h3>
                <div className="flex flex-col justify-center items-center h-full text-gray-400">
                    <FaChartPie size={40} className="mb-2" />
                    <p>No role data available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Roles Distribution</h3>
            <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={69}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="label"
                    >
                        {/* data is guaranteed to be an array here, so no need for optional chaining */}
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RoleDistributionChart;