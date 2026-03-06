import { Children, useCallback, useEffect, useState } from "react";
import { usePublicationStore } from "../../store/publication-store";
import HotspotWrapper from "../app-components/hotspot/HotspotWrapper";
import Overlay from "../ui-components/Overlay";
import ImageViewer from "../app-components/image-viewer/ImageViewer";
import { useAppStore } from "../../store/app-store";
import axios from "axios";
import { API_BASE_URL } from "@/config/settings";

const FALLBACK_IMAGE =
    "https://freesvg.org/img/Simple-Image-Not-Found-Icon.png?w=150&h=150&fit=fill&fm=png";

function Graphic({ children, infoEntityIdent, ...props }) {
    // Renders a graphic or image.
    // Based on the schema, it can contain <Hotspot> components as children for interactivity.
    const { resourceList } = usePublicationStore();
    const currentProjectInfo = useAppStore((state) => state.currentProjectInfo);

    const [loading, setLoading] = useState(true);
    const [img, setImg] = useState("");
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    // Find the full filename (with extension) from the resourceList.
    const fullFilename = resourceList.find((resource) =>
        resource.startsWith(infoEntityIdent),
    );
    const extension = fullFilename?.split(".").pop()?.toLowerCase();

    useEffect(() => {
        // We define the async logic inside the effect
        const getUrl = async () => {
            // 1. Reset loading state when id changes
            setLoading(true);

            try {
                const res = await axios.get(
                    `${API_BASE_URL}/api/v1/datamodule/icn/${infoEntityIdent}`,
                );
                // 2. Check if data exists before setting
                if (res.data && res.data.url) {
                    setImg(res.data);
                    setImg(res.data.url);
                } else {
                    console.warn("No URL found in response");
                }
            } catch (error) {
                console.error("Error fetching url:", error);
                // Optional: Set a fallback image on error
                setImg(FALLBACK_IMAGE);
            } finally {
                // 3. Always turn off loading when done (success or fail)
                setLoading(false);
            }
        };

        if (infoEntityIdent) {
            getUrl();
        }
    }, [infoEntityIdent]); // Only re-run if the ID changes

    // If the resource doesn't exist or we don't have the necessary info, render a placeholder.
    if (!fullFilename || !currentProjectInfo.id) {
        return (
            <div className="p-4 bg-gray-200 text-red-600">
                Media not found: {infoEntityIdent}
            </div>
        );
    }

    const openModal = () => setIsViewerOpen(true);
    const closeModal = () => setIsViewerOpen(false);

    // const mediaUrl = `${API_BASE_URL}/api/v1/publications/${publicationID}/media/${fullFilename}`;

    // // 1. Construct the full, absolute path to the file using forward slashes.
    // const fullFilePath = `${projectPath}/${filename}`;
    //     // 2. Create the special URL for our backend handler, encoding the path.
    // const imageSrc = `/localfile/${encodeURIComponent(fullFilePath)}`;

    // console.log("Constructed image src:", imageSrc);
    const imgProps = {
        src: img,
        alt: infoEntityIdent,
    };

    if (["png", "jpg", "jpeg"].includes(extension)) {
        const containerClasses =
            "relative group w-full max-w-xs overflow-hidden rounded-md shadow-md";

        return (
            <div className={containerClasses} {...props}>
                <img
                    {...imgProps}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {children}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Overlay opacity={70} bgColor="black">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center">
                            <button
                                className="pointer-events-auto border-white border p-3 rounded-md"
                                onClick={openModal}
                            >
                                Open
                            </button>
                        </div>
                    </Overlay>
                </div>
                {isViewerOpen && (
                    <ImageViewer close={closeModal} img={imgProps} />
                )}
            </div>
        );
    }

    if (extension === "svg")
        return (
            <>
                <HotspotWrapper url={img} filename={infoEntityIdent} />
                {children}
            </>
        );
}

export default Graphic;
