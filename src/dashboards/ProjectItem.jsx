import { FaBook, FaCloud, FaTrash } from "react-icons/fa6";
import { MdOutlineOpenInBrowser } from "react-icons/md";
const ProjectItem = ({ project, onSelect, onOpen, onDelete, isSelected }) => {
    const selectedClasses = isSelected
        ? "ring-5 border-slate-500 ring-black/2"
        : "hover:bg-slate-200";
    console.log(project, "project data");
    return (
        <div
            onClick={onSelect}
            onDoubleClick={onOpen}
            className={`group relative p-4 rounded-sm bg-white/0 shadow-lg backdrop-blur-3xl  cursor-pointer transition-all ${selectedClasses}`}
        >
            <div className="flex items-center text-black">
                <FaBook className="text-black mr-3 flex-shrink-0" />

                <span
                    className="font-semibold truncate"
                    title={project.PublicationName}
                >
                    {project.PublicationName}
                </span>
            </div>
            <button
                onClick={onOpen}
                className="absolute top-2 right-2 p-2 text-emerald-950 rounded-full opacity-0 group-hover:opacity-100 hover:text-blue-500 transition-opacity"
                title="Open Publication"
            >
                <MdOutlineOpenInBrowser size={20} />
            </button>
        </div>
    );
};

export default ProjectItem;
