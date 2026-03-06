import React from "react";
import ProjectItem from "./ProjectItem";

const ProjectsList = ({
    projects,
    onProjectSelect,
    onProjectOpen,
    onDeleteProject,
    selectedProjectId,
}) => {
    return (
        <div className="p-6 h-full">
            <h2 className="text-2xl font-serif font-bold text-black mb-4">
                Publications
            </h2>
            {projects && projects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {projects.map((project) => (
                        <ProjectItem
                            key={project.PublicationID}
                            project={project}
                            onSelect={() => onProjectSelect(project)}
                            onOpen={() => onProjectOpen(project)}
                            onDelete={(e) => {
                                e.stopPropagation(); // Prevent selection/opening when deleting
                                onDeleteProject(project);
                            }}
                            isSelected={
                                project.PublicationID === selectedProjectId
                            }
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center font-serif text-black mt-10">
                    <p>No projects found.</p>
                    <p>Check Server status or Import Project</p>
                </div>
            )}
        </div>
    );
};

export default ProjectsList;
