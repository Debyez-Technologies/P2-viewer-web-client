import { useEffect } from 'react';
import DashButtons from "./DashButtons";
import WelcomeBar from "./WelcomeBar";
import { FaUsers, FaFileAlt, FaPenSquare, FaUserCheck, FaCube, FaBoxOpen, FaFileSignature } from 'react-icons/fa';
// import RecentLogins from '../components/app-components/maindash/RecentLogins';

import RoleDistributionChart from '@/components/app-components/maindash/RoleDistributionChart';
import AssignmentDistributionChart from '@/components/app-components/maindash/AssDistributionChart';
import ComparisonTile from '@/components/app-components/maindash/ComparisonTile';
import StatTile from '@/components/app-components/maindash/StatTile';
import RecentPublications from '@/components/app-components/maindash/RecentPubs';

const MainDashboard = () => {
    // const { stats, recentPublications, assDistribution, roleDistribution, isLoading, fetchDashboardData } = useDashboardStore();

    useEffect(() => {
        fetchDashboardData();
    }, []);
    console.log("stats",stats)
    // Calculate derived stats for comparison tiles
    const unassignedUsers = stats.totalUsers - stats.assignedUsers;
    const unassignedPublications = stats.totalPublications - stats.assignedPublications;

    return (
        <div className="flex flex-col flex-grow p-6 gap-6 bg-gray-100">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-2/3">
                    <WelcomeBar />
                </div>
                <div className="w-full md:w-1/3">
                    <DashButtons view={'dashboard'} />
                </div>
            </div>

            <div className='overflow-y-auto'>
                    {/* 
                Main 2x2 Grid Layout for the Dashboard Content.
                On large screens (lg), it's a 2-column grid, which creates the 2x2 structure with four direct children.
                On smaller screens, it collapses to a single column.
                */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
                    
                    {/* === TOP-LEFT CELL: An inner grid for the four Stat Tiles === */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <StatTile 
                            title="Total Users" 
                            value={stats?.totalUsers} 
                            icon={<FaUsers />} 
                            isLoading={isLoading}
                        />
                        <StatTile 
                            title="Total Publications" 
                            value={stats?.totalPublications} 
                            icon={<FaFileAlt />} 
                            isLoading={isLoading}
                        />
                        <StatTile
                            title="Data Modules"
                            value={stats?.totalDataModules}
                            icon={<FaCube />}
                            isLoading={isLoading}
                        />
                        <StatTile
                            title="File Assets"
                            value={stats?.totalAssets}
                            icon={<FaBoxOpen />}
                            isLoading={isLoading}
                        />
                    </div>

                    {/* === TOP-RIGHT CELL: A flex container for the two Comparison Tiles === */}
                    <div className="flex flex-col gap-6">
                        <ComparisonTile
                            title="User Assignments"
                            icon={<FaUserCheck size={20} />}
                            labelA="Assigned"
                            valueA={stats?.assignedUsers}
                            labelB="Unassigned"
                            valueB={unassignedUsers}
                            isLoading={isLoading}
                        />
                        <ComparisonTile
                            title="Publication Status"
                            icon={<FaFileSignature size={20} />}
                            labelA="Assigned"
                            valueA={stats?.assignedPublications}
                            labelB="Unassigned"
                            valueB={unassignedPublications}
                            isLoading={isLoading}
                        />
                    </div>
                    
                    {/* === BOTTOM-LEFT CELL: The Recent Publications component === */}
                    <div className="min-h-[300px]"> {/* Added min-height for better alignment */}
                        <RecentPublications publications={recentPublications} isLoading={isLoading} />
                    </div>

                    {/* === BOTTOM-RIGHT CELL: A flex container for the two Pie Charts === */}
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-1/2">
                            <AssignmentDistributionChart data={assDistribution} isLoading={isLoading} />
                        </div>
                        <div className="w-full md:w-1/2">
                            <RoleDistributionChart data={roleDistribution} isLoading={isLoading} />
                        </div>
                    </div>
                </div>
            </div>

            
        </div>
    );
}

export default MainDashboard;