import { API_BASE_URL } from "@/config/settings";
import { FaImage } from "react-icons/fa6";

// The base URL of your server

const ProjectPreview = ({ project }) => {
    // These will be either a full URL to the image endpoint, or null if no image exists.
    const logoUrl = project?.companyLogoMimeType
        ? `${API_BASE_URL}/api/v1/projects/${project.publicationId}/logo`
        : null;

    const productUrl = project?.productImageMimeType
        ? `${API_BASE_URL}/api/v1/projects/${project.publicationId}/product-image`
        : null;

    return (
        <div className="p-4 h-full flex flex-col">
            {project ? (
                <div className="flex flex-col gap-6 h-full">
                    {/* Project Image */}
                    <div className="flex justify-center items-center h-48 bg-gray-200 rounded-lg shadow-md overflow-hidden">
                        {productUrl ? (
                            <img
                                src={productUrl}
                                alt={project.projectName}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <FaImage className="text-4xl text-gray-400" />
                        )}
                    </div>

                    {/* Project Details */}
                    <div className="font-serif flex-shrink-0 space-y-3">
                        <p className="text-lg font-semibold border-b border-gray-300 pb-1">
                            Publication Info
                        </p>

                        <div className="space-y-1 text-sm text-gray-700">
                            <p>
                                <span className="font-medium">Product:</span>{" "}
                                {project.PublicationName}
                            </p>

                            <div className="flex items-center gap-2">
                                <span className="font-medium">
                                    Manufacturer:
                                </span>{" "}
                                {logoUrl && (
                                    <img
                                        src={logoUrl}
                                        alt="Company Logo"
                                        className="w-6 h-6 rounded-full object-cover bg-white"
                                    />
                                )}
                                <p>
                                    {project.CompanyDetails || "Not specified"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center font-serif h-full text-gray-500">
                    <p>Select a project to see details</p>
                </div>
            )}
        </div>
    );
};

export default ProjectPreview;
