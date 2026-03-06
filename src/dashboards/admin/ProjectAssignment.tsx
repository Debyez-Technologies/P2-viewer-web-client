import { useEffect, useState } from "react";

import ProjectCard from "../../components/app-components/assignment/ProjectCard";
import AddUserModal from "../../components/app-components/assignment/AddUserModal";
import { useAppStore } from "../../store/app-store";
import { useUserStore } from "../../store/user-store";
import { useRoleStore } from "../../store/role-store";
import { useAssignmentStore } from "../../store/assignment-store";

const ProjectAssignmentPage = () => {
    
    const projects = useAppStore((state) => state.projects);
    const currentProject = useAppStore((state) => state.currentProject);
    const fetchProjects = useAppStore((state) => state.fetchProjects);
    const getRoles = useRoleStore((state) => state.getRoles);
    const getUsersList = useUserStore((state) => state.getUsersList);
    const fetchAllUsersAndRoles = useAssignmentStore(
        (state) => state.fetchAllUsersAndRoles,
    );

    useEffect(() => {
        const fetchProjectUsersRoles = async () => {
            try {
                await fetchProjects();
                await getRoles();
                await getUsersList();
                await fetchAllUsersAndRoles();
            } catch (err) {
                console.error("error fetch data: ", err);
            }
        };

        // Fetch projects when the component mounts
        fetchProjectUsersRoles();
    }, []);

    console.log(currentProject)
    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Project Assignments
            </h1>
            <div className="space-y-8">
                <ProjectCard project={currentProject} />
            </div>
            {/* The modal is placed here to be accessible globally on the page */}
            <AddUserModal />
        </div>
    );
};

export default ProjectAssignmentPage;
