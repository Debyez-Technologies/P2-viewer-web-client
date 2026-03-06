import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { usePublicationStore } from "../../../store/publication-store";
import GroupCard from "../../ui-components/GroupCard";
// import { projects } from "../../../config/projectGroups";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useUIStore } from "../../../store/ui-store";

const ProjectCatalog = ({ projectPath }) => {
    const navigate = useNavigate();
    const {
        getPublicationData,
        setCurrentKey,
        setChapterFilter,
        setProjectGroup,
        status: pubStatus,
        groups,
    } = usePublicationStore();
    const { setIsOpenRelatedSection } = useUIStore();

    useEffect(() => {
        getPublicationData(projectPath);
    }, [getPublicationData, projectPath]);

    const handleGroupClick = (group) => {
        setChapterFilter(group);
        setProjectGroup(group.name);
        setCurrentKey(group.firstDmKey);
        navigate(`/ietm/view`);
        setIsOpenRelatedSection(false);
    };

    if (pubStatus === "loading" || pubStatus === "idle") {
        return (
            <div className="flex items-center justify-center h-screen">
                Loading Publication...
            </div>
        );
    }

    if (pubStatus === "succeeded" && (!groups || groups.length === 0)) {
        useEffect(() => {
            navigate(`/ietm/view`);
        }, [navigate]);
        return null;
    }
    console.log("group in related ection", groups);
    return (
        <div className="w-full border rounded-lg">
            {groups.map((group) => (
                <GroupCard
                    key={group.id}
                    name={group.name}
                    onClick={() => handleGroupClick(group)}
                />
            ))}
        </div>
    );
};

const RelatedSections = ({ projectPath }) => {
    const { setIsOpenRelatedSection, isOpenRelatedSection } = useUIStore();

    return (
        <>
            {/* Related Sections Pop-up */}
            <div
                className={`
        fixed right-0
        top-1/4 h-2/4
        w-80 md:w-96 lg:w-1/4 xl:w-1/5
        rounded-lg
        mx-5
        bg-white border border-gray-400
        shadow-lg overflow-hidden z-40
        transform transition-all duration-200 ease-out
        ${isOpenRelatedSection ? "translate-x-0" : "translate-x-full"}
      `}
            >
                {/* Header - Clean and minimal */}
                <div className="border-b border-gray-400 px-6 py-4 ">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">
                            Related Sections
                        </h3>
                        <button
                            onClick={() => setIsOpenRelatedSection(false)}
                            className="p-1.5 rounded-md transition-colors duration-150"
                        >
                            <IoMdCloseCircleOutline className="w-5 h-5 text-gray-700 hover:text-gray-700" />
                        </button>
                    </div>
                </div>

                {/* Content area */}
                <div className="p-6 h-full overflow-y-auto">
                    {/* Info message - Enterprise style */}
                    <div className="border border-gray-200 rounded-sm p-4 mb-6 bg-gray-50">
                        <p className="text-sm text-gray-700 leading-5">
                            You have reached the end of this section. Select a new section below to
                            continue.
                        </p>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                        <ProjectCatalog projectPath={projectPath} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default RelatedSections;
