import { PublicationMeta } from "@/types/publication";
import { BookText } from "lucide-react";

interface PublicationTileProps {
    projects: PublicationMeta[]
    handleOpen: (project: PublicationMeta) => void
}

export default function PublicationTile({ projects, handleOpen }: PublicationTileProps) {

      // Null / undefined
  if (!projects) {
    return (
      <div className="w-full text-center py-10 text-gray-500">
        Loading publications…
      </div>
    );
  }

  // Empty array
  if (projects.length === 0) {
    return (
      <div className="w-full text-center py-10 text-gray-500">
        No publications Assigned
      </div>
    );
  }

    const isSingleProject = projects.length === 1;

    return <div className="w-full flex flex-wrap justify-center gap-6 px-10">
        {projects.map(project => (
            <div
                key={project.id || project.name} // Always add a key
                className={`
                            border border-viewer-core p-5 rounded-xl cursor-pointer hover:bg-cyan-900/10 transition-all
                            flex flex-row  justify-start items-center text-center
                            ${isSingleProject
                        ? "w-full max-w-64 min-h-20 text-md" // Styles if only one (Expanded)
                        : "w-64 min-h-20"                      // Styles if multiple (Standard)
                    }
                        `}
                onClick={() => handleOpen(project)}
            >
                <BookText className="size-7 mr-3" />
                {project.name}
            </div>
        ))}
    </div>
}