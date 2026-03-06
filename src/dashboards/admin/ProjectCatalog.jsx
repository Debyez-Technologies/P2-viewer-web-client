import { useNavigate } from "react-router";
import { usePublicationStore } from "../store/publication-store";
import { projects } from "../config/projectGroups";
import { useEffect } from "react";
import GroupCard from "../components/ui-components/GroupCard";
import SearchBar from "../components/app-components/topbar/SearchBar";

const ProjectCatalog = ({ projectPath }) => {
    const navigate = useNavigate();
    const {
        getPublicationData,
        setCurrentKey,
        setChapterFilter,
        setProjectGroup,
        status: pubStatus,
    } = usePublicationStore();

    useEffect(() => {
        getPublicationData(projectPath);
    }, [getPublicationData]);

    const handleGroupClick = (group) => {
        setChapterFilter(group);
        setProjectGroup(group.title);
        setCurrentKey(group.firstDmKey);
        navigate(`/ietm/view`);
    };

    if (pubStatus === "loading" || pubStatus === "idle") {
        return (
            <div className="flex items-center justify-center h-screen">
                Loading Publication...
            </div>
        );
    }

    // If parsing succeeded and there are no groups, go directly to the viewer
    if (
        pubStatus === "succeeded" &&
        (!projects[0].groups || projects[0].groups.length === 0)
    ) {
        useEffect(() => {
            navigate(`/ietm/view`);
        }, [navigate]);
        return null;
    }

    return (
        <div className="flex flex-col space-y-4">
            <SearchBar type={"global"} />
            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-3 gap-8">
                {projects.map((proj) =>
                    proj.groups.map((group) => (
                        <GroupCard
                            key={group.id}
                            {...group}
                            onClick={() => handleGroupClick(group)}
                        />
                    )),
                )}
            </div>
        </div>
    );
};

export default ProjectCatalog;
