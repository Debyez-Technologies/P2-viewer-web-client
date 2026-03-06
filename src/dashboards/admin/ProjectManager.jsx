import { useEffect, useState } from 'react';
import { useAppStore } from '../../store/app-store';
import AppSidebar from './AppSidebar';
import ProjectsList from './ProjectsList';
import WelcomeBar from '../WelcomeBar';
import ImportWizard from '../../components/app-components/import/ImportWizard';
import ConfirmationModal from '../../components/ui-components/ConfirmationModal';
import DashButtons from '../DashButtons';

const ProjectManager = () => {
    const projects = useAppStore((state) => state.projects)
    const fetchProjects = useAppStore((state) => state.fetchProjects)
    const isDeleteModalOpen = useAppStore((state) => state.isDeleteModalOpen)
    const projectToDelete = useAppStore((state) => state.projectToDelete)
    const closeDeleteConfirmation = useAppStore((state) => state.closeDeleteConfirmation)
    const confirmDeleteProject = useAppStore((state) => state.confirmDeleteProject)
    const setCurrentProject = useAppStore((state) => state.setCurrentProject)

    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    useEffect(() => {
        if (!projects || projects.length === 0) {
            setSelectedProject(null);
            return;
        }

        // If something is selected, find the latest version of it in the projects array.
        if (selectedProject) {
            const updatedSelectedProject = projects.find(p => p.publicationId === selectedProject.publicationId);
            setSelectedProject(updatedSelectedProject || projects[0]); // Fallback to first project
        } else {
            // If nothing is selected, select the first project by default.
            setSelectedProject(projects[0]);
        }
    }, [projects]); // This effect ONLY runs when the main `projects` list changes.

    const handleProjectSelect = (project) => {
        setSelectedProject(project);
        setCurrentProject(project)
        console.log("setting current project", project)

    };

    const handleProjectOpen = (project) => {
        // if (project.type === 'local') {
        //     const projectPath = project.storagePath;
        //     console.log("Navigating to local project:", projectPath);
        //     setProjectPath(projectPath);
        //     navigate('/dashboard');
        // } else {
        //     console.log("This is a CSDB project, navigation not implemented:", project.storagePath);
        //     // Handle CSDB project opening logic here
        // }
        console.log("proejct open")
    };

    const handleDeleteProject = (project) => {
        useAppStore.getState().openDeleteConfirmation(project);
    };


    return (
        // CHANGE 1: The outermost container is now the main flex column, filling the screen height.
        // CHANGE 2: This container now grows to fill remaining space and handles its own layout. 
        <div className="flex flex-col flex-grow p-6 gap-6 overflow-hidden">
            {/* Top Row: Welcome and Buttons */}
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-2/3">
                    <WelcomeBar />
                </div>
                <div className="w-full md:w-1/3">
                    <DashButtons view={'projects'} />
                </div>
            </div>

            <ImportWizard />

            {/* Bottom Row: Projects and Sidebar */}
            {/* CHANGE 3: This row now also needs to grow to fill the remaining space in its parent. */}
            <div className="flex flex-col md:flex-row flex-grow gap-6 overflow-hidden">
                <div className="w-full md:w-2/3">
                    <ProjectsList
                        projects={projects}
                        onProjectSelect={handleProjectSelect}
                        onProjectOpen={handleProjectOpen}
                        onDeleteProject={handleDeleteProject} // This now opens the modal
                        selectedProjectId={selectedProject?.publicationId}
                    />
                </div>
                <div className="w-full md:w-1/3">
                    <AppSidebar project={selectedProject} />
                </div>
            </div>
            {isDeleteModalOpen ?
                <ConfirmationModal
                    isOpen={isDeleteModalOpen}
                    title={"Delete Publication"}
                    message={`Are you sure you want to delete ${projectToDelete.projectName}`}
                    onConfirm={confirmDeleteProject}
                    onCancel={closeDeleteConfirmation}
                />
                : null
            }

        </div>);
};

export default ProjectManager;