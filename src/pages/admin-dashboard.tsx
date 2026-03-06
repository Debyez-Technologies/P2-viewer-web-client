import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ExternalLink, NotepadText, Settings2, User2Icon, Users2 } from "lucide-react";
import { IconType } from "react-icons";
import { Link, useNavigate } from "react-router";

interface CountCardProps {
    title: string;
    count: number;
    icon?: IconType;
}

type ComparisonItem = {
    text: string;
    count: number;
};

type PublicationInfo = {
    id: string;
    PublicationName: string;
    CreatedAt: string;
}

interface ComparisonCardProps {
    title: string;
    items: ComparisonItem[];
}

const CountCard = ({ title, count, icon: Icon }: CountCardProps) => {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>
                    <div className="flex items-center space-x-3">
                        {Icon && (
                            <Icon className="border size-8 p-1 border-viewer-core rounded-md text-viewer-core" />
                        )}
                        <span className="font-normal">{title}</span>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <span className="font-semibold text-2xl">{count}</span>
            </CardContent>
        </Card>
    );
};
const ComparisonCard = ({ title, items }: ComparisonCardProps) => {
    const totalCount = items.reduce((acc, item) => acc + item.count, 0);
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>
                    <div className="flex items-center justify-between space-x-3">
                        <span className="font-semibold">{title}</span>
                        <span className="font-normal">
                            {`Total ` + totalCount}
                        </span>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {items.map((item) => (
                    <div className="flex bg-slate-100 rounded-md items-center m-2 p-2 justify-between w-full min-h-0">
                        <span>{item.text}</span>
                        <span>{item.count}</span>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

const RecentPublications = () => {
    const [recentPublications, setRecentPublications] = useState<PublicationInfo[]>([])
    const navigate = useNavigate()

    const fetchRecentPublications = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/api/v1/dashboard/recent-pubs`)
            const data = Array.isArray(res.data) ? res.data : []
            setRecentPublications(
                data.map(d => ({
                    id: d?.id,
                    PublicationName: d?.publication_name,
                    CreatedAt: d?.created_at,
                }))
            )
        } catch (error) {
            console.error("error logging in", error)
        }
    }

    useEffect(() => {
        fetchRecentPublications()
    }, [])
    return (
        <Card className="w-full min-h-72">
            <CardHeader className="flex  flex-row justify-between">
                <CardTitle>Recent Publications</CardTitle>
                <Button
                variant="ghost"
                className="text-viewer-core font-semibold hover:text-violet-900"
                onClick={()=>navigate(`/manage`)}>
                    View all
                </Button>

            </CardHeader>
            <CardContent className="flex flex-1 flex-col items-center justify-center">
                {recentPublications.length <= 0 ? <>
                    <BookOpen className="size-14 p-3 rounded-sm bg-gray-200" />
                    <span className="font-semibold">No recent publication</span>
                </> : recentPublications.map(pub => (<div className="w-full border-b p-3 hover:cursor-pointer flex justify-between">
                    <div>
                        <span>
                            {pub.PublicationName}
                        </span>
                    </div>
                    <div className="flex gap-1 justify-end flex-1">
                        <Button variant="ghost" onClick={() => navigate(`/manage/${pub.id}`)}>
                            <Settings2 />
                        </Button>
                    </div>
                </div>))

                }
            </CardContent>
        </Card>
    );
};

import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/config/settings";
import { PublicationMeta } from "@/types/publication";
import { Button } from "@/components/ui/button";

interface RoleData {
    name: string;
    count: number;
    color: string;
}

interface RoleDistributionChartProps {
    roles: RoleData[];
    title?: string;
    showPercentages?: boolean;
}

function RoleDistributionChart({
    roles,
    title = "Role Distribution",
    showPercentages = true,
}: RoleDistributionChartProps) {
    const totalUsers = roles.reduce((sum, role) => sum + role.count, 0);

    const rolesWithPercentage = roles.map((role) => ({
        ...role,
        percentage: (role.count / totalUsers) * 100,
    }));

    const radius = 80;
    const strokeWidth = 40;
    const center = 100;
    const circumference = 2 * Math.PI * radius;

    let currentOffset = 0;

    const arcs = rolesWithPercentage.map((role) => {
        const dashArray = (role.percentage / 100) * circumference;
        const offset = currentOffset;
        currentOffset += dashArray;

        return {
            dashArray,
            offset,
            color: role.color,
        };
    });

    return (
        <div className="bg-white rounded-xl shadow-lg p-8 w-full border border-gray-200">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                <span className="text-sm text-gray-500">
                    {totalUsers} Users
                </span>
            </div>

            <div className="flex items-center gap-8">
                <div className="relative">
                    <svg
                        width="200"
                        height="200"
                        viewBox="0 0 200 200"
                        className="transform -rotate-90"
                    >
                        <circle
                            cx={center}
                            cy={center}
                            r={radius}
                            fill="none"
                            stroke="#f3f4f6"
                            strokeWidth={strokeWidth}
                        />

                        {arcs.map((arc, index) => (
                            <circle
                                key={index}
                                cx={center}
                                cy={center}
                                r={radius}
                                fill="none"
                                stroke={arc.color}
                                strokeWidth={strokeWidth}
                                strokeDasharray={`${arc.dashArray} ${circumference}`}
                                strokeDashoffset={-arc.offset}
                            />
                        ))}
                    </svg>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-800">
                                {totalUsers}
                            </div>
                            <div className="text-xs text-gray-400 uppercase tracking-wider">
                                Total
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 space-y-4">
                    {rolesWithPercentage.map((role) => (
                        <div
                            key={role.name}
                            className="flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: role.color }}
                                />
                                <span className="text-sm font-medium text-gray-700">
                                    {role.name}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-gray-800">
                                    {role.count}
                                </span>
                                {showPercentages && (
                                    <span className="text-xs text-gray-400 w-8 text-right">
                                        {Math.round(role.percentage)}%
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


const colors = [
    "#7C3AED", "#A78BFA", "#DDD6FE"
]

const createColorGenerator = (colorArray: string[]) => {
    let lastIndex = -1;

    return () => {
        // If there is only 1 color, we must return it
        if (colorArray.length <= 1) return colorArray[0];

        let newIndex;
        // Keep generating a random index until it is different from the last one
        do {
            newIndex = Math.floor(Math.random() * colorArray.length);
        } while (newIndex === lastIndex);

        lastIndex = newIndex;
        return colorArray[newIndex];
    };
};

export default function AdminDashboard() {

    const [rolesDistribution, setRolesDistribution] = useState<RoleData[]>([])
    const [stats, setStats] = useState<CountCardProps[]>([])
    const [comparisonData, setComparisonData] = useState<ComparisonCardProps[]>([])

    const fetchRolesDistribution = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/api/v1/dashboard/role-distribution`);
            const data = Array.isArray(res.data) ? res.data : []
            const getNextColor = createColorGenerator(colors);

            setRolesDistribution(
                data.map((d) => ({
                    name: d.label,
                    count: d.value,
                    // 3. Call the generator
                    color: getNextColor(),
                }))
            );
        } catch (error) {
            console.error("Error loading data!!", error)
        }
    }



    const fetchDashboardStats = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/api/v1/dashboard/stats`);
            const data = res.data
            setStats(
                [
                    {
                        title: "Users",
                        count: data?.totalUsers,
                        icon: Users2
                    },
                    {
                        title: "Datamodules",
                        count: data?.totalDataModules,
                        icon: NotepadText
                    },
                    {
                        title: "Publications",
                        count: data?.totalPublications,
                        icon: BookOpen
                    },
                    {
                        title: "Assigned Publication",
                        count: data.assignedPublications,
                        icon: Users2
                    },
                ]
            )

            setComparisonData(
                [
                    {
                        title: "User assignments",
                        items: [
                            {
                                text: "Assigned",
                                count: data?.assignedUsers,
                            },
                            {
                                text: "Unassigned",
                                count: data?.totalUsers - data?.assignedUsers,
                            },
                        ]
                    },
                    {
                        title: "Configured Publications",
                        items: [
                            {
                                text: "Configured",
                                count: data?.configuredPublication,
                            },
                            {
                                text: "Not Configured",
                                count: data?.totalPublications - data?.configuredPublication,
                            },
                        ]
                    }
                ]
            )
        } catch (error) {
            console.error("Error loading data!!", error)
        }
    }


    useEffect(() => {
        fetchRolesDistribution()
        fetchDashboardStats()
    }, [])

    return (
        <div className="w-full h-full flex flex-col space-y-4 p-3">
            <div className="flex flex-row gap-3 min-h-32 w-full justify-center">
                {stats.map((count) => (
                    <CountCard
                        title={count.title}
                        count={count.count}
                        icon={count?.icon}
                    />
                ))}
            </div>
            <div className="flex h-full w-full gap-3 min-h-0 justify-center">
                {comparisonData.map((comp) => (
                    <ComparisonCard title={comp.title} items={comp.items} />
                ))}
            </div>
            <div className="flex w-full gap-3 justify-center">
                <RecentPublications />
                <RoleDistributionChart
                    roles={rolesDistribution}
                    title="Role Distribution"
                    showPercentages={true}
                />
            </div>
        </div>
    );
}
